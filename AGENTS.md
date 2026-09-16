# AGENTS.md

## Project

**Diawur Link** — a personal URL shortener built with Nuxt 3 + Supabase, deployed on Vercel.

**URL:** https://diawur.biz.id

## Quick Start

```bash
bun install
bun run dev
```

Requires a `.env` file with `SUPABASE_URL`, `SUPABASE_KEY`, and `BASE_URL`. See `.env.example`.

## Commands

| Command | Description |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Production build |
| `bun run preview` | Preview production build |

## Architecture

- **Pages** (`pages/`) — Nuxt file-based routing. `[short].vue` handles redirect lookups.
- **Components** (`components/`) — `RedirectView.vue` is the core redirect engine. `ShortlinkList.vue` is the dashboard CRUD.
- **Server API** (`server/api/new.post.ts`) — POST endpoint for programmatic shortlink creation.
- **Supabase Edge Functions** (`supabase/functions/`) — Validates API keys, inserts shortlinks.
- **Composables** (`composables/`) — `useExternalRedirect.ts` handles SSR-safe redirects.
- **Types** (`types/`) — `supabase.ts` defines the `shortlinks` table schema.

## Key Facts

- Templates use **Pug** (not HTML)
- Styling uses **SCSS** + **TailwindCSS**
- Only one database table: `shortlinks`
- Short codes are 2-char nanoid strings
- Auth is GitHub OAuth via Supabase
- Deploy target is **Vercel** (Nitro preset)
- No test framework configured

## Files to Read

- `.ai/AGENTS.md` — Full AI agent onboarding guide
- `docs/tech-stack.md` — Detailed technology breakdown
- `docs/CHANGELOGS.md` — Version history
- `nuxt.config.ts` — Framework configuration
- `pages/dashboard.vue` — Auth and dashboard entry point
- `components/RedirectView.vue` — Core redirect logic
