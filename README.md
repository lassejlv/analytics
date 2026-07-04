# Analytics

TanStack Start app with Better Auth, Drizzle ORM, and TanStack Query.

## Setup

```sh
cp .env.example .env.local
bun install
bun run db:push
```

Generate a secret:

```sh
bunx @better-auth/cli secret
```

## Development

```sh
bun run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Production build |
| `bun run db:generate` | Generate Drizzle migrations |
| `bun run db:migrate` | Run migrations |
| `bun run db:push` | Push schema to database |
| `bun run auth:generate` | Regenerate Better Auth schema |

## Structure

```
src/
  components/       # UI components
  db/               # Drizzle schema + client
  integrations/     # TanStack Query, Better Auth wiring
  lib/              # Auth, env, query options
  routes/           # File-based routes
  server/           # Server functions (RPC)
```
