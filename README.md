# analytics

Hono API with [Better Auth](https://www.better-auth.com/) and [Drizzle ORM](https://orm.drizzle.team/), running on Bun.

## Setup

1. Copy environment variables:

```sh
cp .env.example .env
```

2. Update `.env` with your PostgreSQL connection string and a secure `BETTER_AUTH_SECRET` (at least 32 characters). Generate one with:

```sh
openssl rand -base64 32
```

3. Install dependencies:

```sh
bun install
```

4. Push the schema to your database:

```sh
bun run db:push
```

Or apply migrations:

```sh
bun run db:migrate
```

## Development

```sh
bun run dev
```

The API listens on `http://localhost:3000` by default.

- `GET /health` — health check
- `GET|POST /api/auth/*` — Better Auth routes (sign up, sign in, session, etc.)

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server with hot reload |
| `bun run start` | Start production server |
| `bun run db:generate` | Generate Drizzle migrations from schema |
| `bun run db:migrate` | Apply migrations |
| `bun run db:push` | Push schema directly to the database |
| `bun run db:studio` | Open Drizzle Studio |
| `bun run auth:generate` | Regenerate Better Auth Drizzle schema |

## Project structure

```
src/
  index.ts          # Hono app entry
  lib/auth.ts       # Better Auth configuration
  db/
    index.ts        # Drizzle database client
    schema.ts       # Schema exports
    auth-schema.ts  # Better Auth tables (generated)
drizzle/            # SQL migrations
```

Add your own tables in `src/db/schema.ts` alongside the auth schema exports.
