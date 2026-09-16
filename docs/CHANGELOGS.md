# Changelog

All notable changes to Diawur Link will be documented in this file.

## [0.3.0] - 2026-09-16

### Vercel Deployment Fixes

- Pinned Vercel function runtime to `nodejs22.x` via `nitro.vercel.functions.runtime` (previously Vercel rejected the generated `nodejs26.x`, which came from the local Node version)
- Removed committed `.vercel/` build output from git and added `.vercel` to `.gitignore` — Vercel now builds from source instead of using prebuilt artifacts
- Removed the hardcoded `nitro.preset` — local builds use `node-server` (enables `nuxt preview`), Vercel auto-detects the `vercel` preset in its environment

### Local Build Improvements

- Disabled Nuxt telemetry (`telemetry: false`) which blocked non-interactive builds with an EPIPE prompt error
- `bun run preview` now works locally after `bun run build`

### Tooling

- Added `typecheck`, `lint`, and `check` scripts to `package.json`
- Added dev dependencies: `typescript@5`, `vue-tsc`, `@nuxtjs/eslint-config-typescript`
- Added `.eslintrc.cjs` and `.eslintignore` (excludes Deno edge functions)
- Fixed type errors: `robots` config `rules` wrapper, `import type` for Supabase `Database`, excluded `supabase/functions/**` from `tsconfig.json`
- Fixed lint issues across `pages/`, `server/`, and `composables/`; removed stray `console.log` from `server/api/new.post.ts`

### Documentation

- Added `docs/TO-DO.md` — upcoming and planned changes tracker
- Added `docs/TESTING.md` — safe local testing workflow (lint → typecheck → build → preview)
- Added testing/quality-gate sections to `AGENTS.md` and `.ai/AGENTS.md`
- `docs/CHANGELOGS.md` and `docs/TO-DO.md` referenced from both agent guides

## [0.2.0] - 2026-09-16

### Rebranding

- Renamed project from **yumi.to** to **Diawur Link**
- Updated all references from `yumi.to` to `diawur.biz.id`
- Updated `pages/dashboard.vue` OAuth redirect to use `diawur.biz.id`
- Updated `composables/useExternalRedirect.ts` default URL to `https://www.dhiar.my.id/`
- Renamed `package.json` name from `nuxt-app` to `diawur-link`
- Updated README with new branding and deployment instructions

### Deployment Migration

- Changed deployment target from **Cloudflare Pages** to **Vercel**
- Updated `nuxt.config.ts` Nitro preset from `cloudflare-pages` to `vercel`
- Updated README deployment section with Vercel-specific instructions

### Documentation

- Created `docs/` folder with `CHANGELOGS.md` and `tech-stack.md`
- Created `.ai/AGENTS.md` for AI agent onboarding
- Created `.env.example` for environment variable reference
- Added development section to README

## [0.1.0] - 2026-09-16

### Forked from yumi.to

- Initial fork of [yumi.to](https://github.com/nicehash/yumi.to) by Yumi Izumi
- Full Nuxt 3 + Supabase URL shortener application
- Dashboard with GitHub OAuth authentication
- Multi-depth shortlink routing (`/abc`, `/a/bc`, `/a/b/c`)
- API endpoint for programmatic shortlink creation via API key
- Supabase Edge Functions for API key validation
- QR code generation for shortlinks
- Expiration support with automated cleanup cron job
- iOS Shortcuts integration
- JSON-based dictionary redirects (blog, GitHub)
- TailwindCSS styling with dark theme
