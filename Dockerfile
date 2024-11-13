FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.14.0 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./


FROM base AS build
RUN pnpm install
COPY . .
RUN pnpm run build


FROM base AS deps
RUN pnpm install --prod


FROM gcr.io/distroless/nodejs22:nonroot

ENV NODE_ENV=production
USER 1000
WORKDIR /app
COPY --from=build /app/dist/ .
COPY --from=deps /app/node_modules/ ./node_modules

EXPOSE 3000
CMD ["main.js"]
