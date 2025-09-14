FROM node:24-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack install


FROM base AS build
RUN pnpm install
COPY . .
RUN pnpm run build


FROM base AS deps
RUN pnpm install --prod


FROM gcr.io/distroless/nodejs24:nonroot

ENV NODE_ENV=production
USER 1000
WORKDIR /app
COPY --from=build /app/dist/ .
COPY --from=deps /app/node_modules/ ./node_modules

EXPOSE 3000
CMD ["main.js"]
