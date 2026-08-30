# AI Chat

Production-oriented Next.js app for multi-model chat and image generation via OpenRouter.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- PostgreSQL + Drizzle ORM
- Better Auth
- OpenRouter (server-side only)
- Cloudflare R2 for generated images

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Fill in `DATABASE_URL`, `OPENROUTER_API_KEY`, Better Auth, and R2 values. Never commit `.env`.

3. Install and run:

```bash
pnpm install
pnpm db:push
pnpm dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Next.js development server |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Apply migrations |
| `pnpm db:push` | Push schema to Postgres (local/dev) |
| `pnpm db:studio` | Open Drizzle Studio |

AI calls and storage run only on the server. `OPENROUTER_API_KEY` must never be sent to the browser.
