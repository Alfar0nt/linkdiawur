# Diawur Link — AI Agent Guide

## Project Overview

Diawur Link is a personal URL shortener web application. It allows users to create short links via a dashboard or API, with support for expiration dates, QR codes, and multi-depth URL routing (e.g., `/abc`, `/a/bc`, `/a/b/c`).

**Live URL:** https://diawur.biz.id

This project is a fork of [yumi.to](https://github.com/nicehash/yumi.to) by Yumi Izumi, rebranded and deployed on Vercel + Supabase.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3 (Vue 3, TypeScript) |
| Styling | TailwindCSS, SCSS, Pug templates |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase GitHub OAuth |
| Edge Functions | Supabase Edge Functions (Deno) |
| Deployment | Vercel (Nitro preset) |
| Package Manager | Bun |
| Validation | Zod |
| Short Code Gen | nanoid (2-char codes) |

See `docs/tech-stack.md` for full details.

## Project Structure

```
├── pages/                  # Nuxt routes
│   ├── index.vue           # Root redirect view
│   ├── [short].vue         # Depth-1 shortlink
│   ├── [first]/[short].vue # Depth-2 shortlink
│   ├── [first]/[second]/[short].vue # Depth-3 shortlink
│   ├── blog/[short].vue    # JSON-dictionary redirect
│   ├── gh/[short].vue      # GitHub username redirect
│   └── dashboard.vue       # Auth + shortlink management
├── components/
│   ├── RedirectView.vue    # Core redirect logic (Supabase lookup)
│   ├── ShortlinkList.vue   # Dashboard CRUD + search + QR
│   └── LinkItem.vue        # Single link row component
├── composables/
│   └── useExternalRedirect.ts  # SSR/client redirect helper
├── server/api/
│   └── new.post.ts         # API endpoint for creating shortlinks
├── supabase/functions/
│   ├── _shared/cors.ts     # CORS + admin Supabase client
│   └── newShortlink/index.ts  # Edge function for API key validation
├── types/
│   ├── env.d.ts            # Shortlink interface
│   └── supabase.ts         # Supabase Database types (shortlinks table)
├── nuxt.config.ts          # Nuxt config (Vercel preset, modules)
└── package.json
```

## Key Files to Understand

### Redirect Flow
1. User visits `/{short}` → `pages/[short].vue` renders `RedirectView`
2. `components/RedirectView.vue` queries Supabase `shortlinks` table
3. Exact match first, then prefix (`startsWith`) fallback
4. Checks expiration date; redirects to default if expired or not found
5. Uses `composables/useExternalRedirect.ts` for SSR-safe redirects

### API Flow
1. POST to `/api/new?link=<url>` with `apikey` header
2. `server/api/new.post.ts` validates input, generates 2-char nanoid
3. Invokes Supabase Edge Function `newShortlink` which validates API key hash
4. Returns short URL using `BASE_URL` env var

### Dashboard
1. `pages/dashboard.vue` handles GitHub OAuth via Supabase
2. `components/ShortlinkList.vue` provides full CRUD, search, QR codes
3. Row-level security enforced via Supabase RLS policies

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_KEY` | Supabase public anon key | `eyJhb...` |
| `BASE_URL` | Production domain | `https://diawur.biz.id` |

Edge Function secrets (set in Supabase dashboard):
- `API_KEY_HASH` — MD5 hash of the API key for programmatic shortlink creation

## Common Tasks

### Adding a new page route
Create a new `.vue` file in `pages/`. Use `RedirectView` component for standard redirect behavior.

### Modifying the redirect logic
Edit `components/RedirectView.vue`. The lookup order is: exact match → prefix match → default redirect.

### Changing the default redirect
Edit the default URL in `composables/useExternalRedirect.ts`.

### Updating Supabase schema
Edit `types/supabase.ts` to match any schema changes. The only table is `shortlinks`.

## Conventions

- Templates use **Pug** syntax (not HTML)
- Styling uses **SCSS** + **TailwindCSS** utility classes
- Components use Vue 3 `<script setup>` with TypeScript
- Server code uses Nuxt 3 event handlers (`defineEventHandler`)
- No test framework is currently configured

## Testing & Quality Gates

Run these before any commit or push (details in `docs/TESTING.md`):

```bash
bun run lint        # style + code quality
bun run typecheck   # type safety
bun run build       # full production build (what Vercel runs)
bun run check       # typecheck + build in one command
```

- The `supabase/functions/` Deno edge functions are **excluded** from typecheck and lint via `tsconfig.json` and `.eslintignore`.
- No Nitro preset is hardcoded in `nuxt.config.ts`. Local builds use `node-server` (so `nuxt preview` works); Vercel auto-detects the `vercel` preset in its environment.
- The Vercel function runtime is pinned to **`nodejs22.x`** via `nitro.vercel.functions.runtime` — do not change unless Vercel adds new runtimes.

## Roadmap

Planned and upcoming changes are tracked in `docs/TO-DO.md`. Check it before starting new work and move completed items to `docs/CHANGELOGS.md`.

## Important Notes

- The `robots` config in `nuxt.config.ts` disallows all crawling (`Disallow: /`)
- Supabase redirect is set to `false` — auth redirects are handled manually
- Short codes are 2 characters generated via `nanoid(2)`, with collision retry loop
- The `pages/blog` and `pages/gh` routes are hardcoded dictionary redirects — customize or remove as needed
