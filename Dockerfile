FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY drizzle.config.ts ./
COPY drizzle ./drizzle
COPY src ./src

EXPOSE 3000

CMD ["bun", "run", "start"]
