FROM jdxcode/mise:2025.12 AS base
WORKDIR /app
COPY mise.toml ./
RUN mise trust && mise install


FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build


FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod


FROM gcr.io/distroless/nodejs24:nonroot
ENV NODE_ENV=production
USER 1000
WORKDIR /app
COPY --from=build /app/dist/ .
COPY --from=deps /app/node_modules/ ./node_modules
EXPOSE 3000
CMD ["main.js"]
