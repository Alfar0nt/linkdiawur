# Tech Stack

Detailed technology breakdown for Diawur Link.

## Core Framework

| Technology | Version | Purpose |
|---|---|---|
| [Nuxt 3](https://nuxt.com) | ^3.7.4 | Vue meta-framework (SSR, routing, build) |
| [Vue 3](https://vuejs.org) | ^3.3.4 | Reactive UI framework |
| [TypeScript](https://www.typescriptlang.org/) | — | Type safety |
| [Vue Router](https://router.vuejs.org/) | ^4.2.5 | Client-side routing |

## Styling

| Technology | Purpose |
|---|---|
| [TailwindCSS](https://tailwindcss.com) via `@nuxtjs/tailwindcss` | Utility-first CSS framework |
| [SCSS/Sass](https://sass-lang.com) | Component-level styles (`assets/dashboard.scss`) |
| [Pug](https://pugjs.org) | Template syntax in Vue SFCs |
| [PrimeVue](https://primevue.org) | Calendar component for expiration picker |

## Backend & Database

| Technology | Purpose |
|---|---|
| [Supabase](https://supabase.com) | PostgreSQL database, auth, edge functions |
| `@nuxtjs/supabase` ^1.1.3 | Nuxt module for Supabase integration |
| Supabase Edge Functions | Deno-based serverless functions for API key validation |
| GitHub OAuth | Authentication provider via Supabase Auth |

### Database Schema

Single table: `shortlinks`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key, auto-generated |
| `created_at` | `timestamptz` | Default: `now()` |
| `short` | `text` | Unique, 2-char nanoid |
| `link` | `text` | Destination URL |
| `expire` | `timestamptz` | Nullable, optional expiration |

## Deployment

| Technology | Purpose |
|---|---|
| [Vercel](https://vercel.com) | Hosting and serverless deployment |
| Nitro `vercel` preset | Nuxt server engine configured for Vercel |

## Libraries

| Library | Version | Purpose |
|---|---|---|
| [nanoid](https://github.com/ai/nanoid) | ^5.0.1 | Short code generation (2-char) |
| [Zod](https://zod.dev) | ^3.22.4 | Runtime schema validation |
| [qrcode](https://github.com/soldair/node-qrcode) | ^1.5.3 | QR code generation for shortlinks |
| [nuxt-headlessui](https://headlessui.com) | ^1.1.4 | Accessible UI components (dialogs) |

## Dev Tools

| Tool | Purpose |
|---|---|
| [Bun](https://bun.sh) | Package manager and runtime |
| [ESLint](https://eslint.org) | Code linting |
| [Nuxt DevTools](https://devtools.nuxt.com) | Development debugging |

## Architecture Diagram

```
User Browser
    │
    ├── GET /{short} ──────────► Nuxt SSR (Vercel)
    │                              │
    │                              ├── Supabase Client ──► PostgreSQL (shortlinks table)
    │                              │
    │                              └── 302 Redirect ──► Destination URL
    │
    ├── GET /dashboard ────────► Nuxt SSR (Vercel)
    │                              │
    │                              └── Supabase Auth ──► GitHub OAuth
    │
    └── POST /api/new ─────────► Nuxt Server API (Vercel)
                                   │
                                   ├── Generate nanoid(2)
                                   │
                                   └── Invoke Supabase Edge Function
                                         │
                                         └── Verify API key hash ──► Insert into PostgreSQL
```
