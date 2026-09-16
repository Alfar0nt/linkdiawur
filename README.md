# Diawur Link

Your personal URL shortener built with Nuxt 3, Supabase, Vercel, and TailwindCSS.

![Diawur Link Dashboard](./readme/dashboard.png)

## Features

- 100% free (can be hosted completely free with Vercel, Supabase, and GitHub)
  and open-source
- Create shortlinks via dashboard or an API call
- Shortlinks can be manually created or automatically generated
- Use your own domain name
- Authentication with GitHub or API key
- Support for various short-link dictionary
  - From Supabase Database
  - From JSON-based dictionary
- Preconfigured iOS Shortcuts

## Tech Stack

- **Framework:** Nuxt 3 + Vue 3 + TypeScript
- **Styling:** TailwindCSS + SCSS
- **Database & Auth:** Supabase (PostgreSQL + GitHub OAuth)
- **Edge Functions:** Supabase Edge Functions (Deno)
- **Deployment:** Vercel
- **Validation:** Zod
- **Short Code Generation:** nanoid

See [docs/tech-stack.md](./docs/tech-stack.md) for full details.

## Installation

### Requirements

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- A [Supabase](https://supabase.com/) project
- A [Vercel](https://vercel.com/) account
- Domain name (e.g. `diawur.biz.id`)

### Creating Supabase Project

1. Create a new Supabase project
2. Add a new table called `shortlinks` with the following columns:
   - `id` (type: `uuid`, primary key)
   - `created_at` (type: `timestamptz`, default: `now()`)
   - `short` (type: `text`, unique)
   - `link` (type: `text`)
   - `expire` (type: `timestamptz`, default: `NULL`)

Or use the following SQL query:

```sql
create table public.shortlinks (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  short text not null default ''::text,
  link text not null default ''::text,
  expire timestamp with time zone null,
  constraint shortlinks_pkey primary key (id),
  constraint shortlinks_short_key unique (short)
)
```

### Deploying to Vercel

1. Fork this repository
2. Import the project on [Vercel](https://vercel.com/new)
3. Vercel will auto-detect the Nuxt framework
4. Add the following environment variables:
   - `SUPABASE_URL` — your Supabase URL (e.g. `https://<your-project>.supabase.co`)
   - `SUPABASE_KEY` — your Supabase public anon key
   - `BASE_URL` — your domain name (e.g. `https://diawur.biz.id`)
5. Deploy
6. Configure your custom domain in Vercel project settings

### Authentication with GitHub

By default, this project uses GitHub as the authentication provider. You can
change this by editing `pages/dashboard.vue` and Supabase authentication
provider settings.

To continue with GitHub, follow the instructions
[here](https://supabase.com/docs/guides/auth/social-login/auth-github)

### Row-Level Security for Supabase

After setting up authentication, you can add row-level security to your Supabase
table to prevent unauthorized users from modifying your shortlinks.

1. Create an account for yourself in the dashboard of your fork of this project
   (e.g. `https://diawur.biz.id/dashboard`)
2. Copy your user ID from the `users` table in Supabase
3. Add the following row-level security policies to your `shortlinks` table
   (replace `<your-user-id>` with your user ID from step 2):

```sql
-- Allow anyone to read shortlinks
create policy "Allow anyone to read shortlinks" on public.shortlinks for select using (true);

-- Allow yourself to create shortlinks
create policy "Allow yourself to create shortlinks" on public.shortlinks for insert with check (auth.uid() = '<your-user-id>');

-- Allow yourself to update shortlinks
create policy "Allow yourself to update shortlinks" on public.shortlinks for update using (auth.uid() = '<your-user-id>') with check (auth.uid() = '<your-user-id>');

-- Allow yourself to delete shortlinks
create policy "Allow yourself to delete shortlinks" on public.shortlinks for delete using (auth.uid() = '<your-user-id>');
```

4. Go into Auth Settings in Project Settings on Supabase dashboard to disable
   new user signups.

### Setting up Cron Job for Expiring Shortlinks

In Supabase SQL Editor, run the following query to set up a cron job to delete expired shortlinks every week on Sunday at 02:00 (for customizing cron, see [crontab.guru](https://crontab.guru/#0_2_*_*_0)):

```sql
select cron.schedule(
  'weekly-cleanup-of-expired-shortlinks',
  '0 2 * * 0', -- At 02:00 on Sunday.
  $$ delete from shortlinks where expire < now() - interval '1 week' $$
)
```

### Customizing

- Change `url` in `composables/useExternalRedirect.ts` to whatever you want
  default redirect to be (e.g. `https://diawur.biz.id`)
- Add every deployed URL that should support GitHub sign-in to the allowed
  redirect URLs in Supabase Auth settings.
- Change the `pages/blog` directory to whatever you want for specific directory
  name shortlinks (e.g. `pages/blog` -> `pages/abc` to support links like
  `diawur.biz.id/abc/xyz`)
- This project uses TailwindCSS for styling, so you can customize the styles by
  editing the component classes

### Using with iOS Shortcuts

You can use this project with iOS Shortcuts to create a custom URL shortener. To
do this, you can use the following shortcut:

1. Create an API key
   1. Create a random string as the API key
   2. Take the MD5 hash of the API key
   3. Store the MD5 hash of the API key as `API_KEY_HASH` in your Supabase Edge
      Function Secrets Management settings
2. Get the iOS shortcut [here](https://diawur.biz.id/aa)
3. First time you run the shortcut, you will be prompted to enter your domain
   name (e.g. `diawur.biz.id`) and the API key you created in step 1
4. You are now ready to use the shortcut!

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Acknowledgements

- [Supabase](https://supabase.io)
- [Vercel](https://vercel.com)
- [Nuxt](https://nuxtjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [yumi.to](https://github.com/nicehash/yumi.to) — original project by Yumi Izumi
