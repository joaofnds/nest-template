FROM node:25-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@10.27.0


FROM base AS build
RUN pnpm install
COPY . .
RUN pnpm run build


FROM base AS deps
RUN pnpm install --prod


FROM gcr.io/distroless/nodejs25:nonroot

ENV NODE_ENV=production
USER 1000
WORKDIR /app
COPY --from=build /app/dist/ .
COPY --from=deps /app/node_modules/ ./node_modules

EXPOSE 3000
CMD ["main.js"]
