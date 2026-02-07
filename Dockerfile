FROM jdxcode/mise:2025.12 AS base
WORKDIR /app
COPY mise.toml ./
RUN mise trust && mise install


FROM base AS build
COPY . .
RUN bun install --production
RUN bun run build


FROM oven/bun:1.3-distroless
ENV NODE_ENV=production
USER 1000
WORKDIR /app
COPY --from=build /app/dist/ .
EXPOSE 3000
CMD ["main.js"]
