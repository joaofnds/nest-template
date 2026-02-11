FROM oven/bun:1.3 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production
COPY . .
RUN bun run build


FROM oven/bun:1.3-distroless
ENV NODE_ENV=production
USER 1000
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist/main.js ./main.js
EXPOSE 3000
CMD ["main.js"]
