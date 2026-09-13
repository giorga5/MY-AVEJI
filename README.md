# MY AVEJI — Website + Admin Panel

This project has two parts:
- **The public website** (`/`) — your furniture catalogue, exactly as before.
- **The admin panel** (`/admin`) — a private dashboard where you manage products, categories, and site text. Changes you make there show up on the public website immediately, with no need to edit code or redeploy.

Everything is stored in a free **Supabase** project (database + login + image storage) and the site itself runs on **Vercel** (free hosting). This document walks you through setting both up from scratch.

---

## 1. Accounts you need to create

1. **Supabase** — [supabase.com](https://supabase.com) — free account, used for the database, admin login, and image storage.
2. **GitHub** — [github.com](https://github.com) — free account, used to hold your project's code so Vercel can deploy it.
3. **Vercel** — [vercel.com](https://vercel.com) — free account, used to host the live website. You can sign up directly with your GitHub account.

None of these require a credit card for this project's usage level.

---

## 2. Create your Supabase project

1. Go to [supabase.com](https://supabase.com), sign up/log in, and click **New Project**.
2. Give it any name (e.g. "my-aveji"), set a database password (save it somewhere safe — you likely won't need it again), pick a region close to Georgia (e.g. Frankfurt), and create the project. Wait ~1-2 minutes for it to finish provisioning.
3. In the left sidebar, go to **Project Settings → API**. You'll need two values from this page later:
   - **Project URL** (looks like `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** key (a long string under "Project API keys")
4. Go to **SQL Editor** (left sidebar) → **New query**. Open the file `supabase-setup.sql` in this project, copy its entire contents, paste into the SQL editor, and click **Run**. This creates all the tables, security rules, and a few sample categories/products so the site isn't empty.
5. Go to **Storage** (left sidebar) → **New bucket**. Name it exactly `product-images`, toggle **Public bucket** ON, and create it. (The storage security rules for this bucket were already created by the SQL script in step 4.)
6. Go to **Authentication → Users** → **Add user** → **Create new user**:
   - Email: `<your-username>@admin.myaveji.local` (this exact fake-looking email format is intentional — see note below)
   - Password: choose your own strong password here
   - Toggle **Auto Confirm User** ON
   - Click **Create user**
7. Go to **Authentication → Settings** (sometimes called "Sign In / Providers") and make sure **"Allow new users to sign up"** is turned OFF. The app itself has no sign-up page anywhere, but this is a good extra safety net.

> **Why the odd email?** You log into `/admin` with a plain **username** (whatever you chose above), not an email. Behind the scenes, Supabase's login system requires an email format, so the app quietly maps your username to `<username>@admin.myaveji.local` — a fake, non-existent address that's never emailed to anyone. You never see or type it; you just use your username and password on the login screen. If you ever want to change the username, create a new user in this same Supabase screen with the new `<newusername>@admin.myaveji.local` email, then delete the old one.

---

## 3. Environment variables

The app needs exactly two values — both from Supabase Project Settings → API (step 3 above). Both are meant to be public (your data is protected by the security rules from the SQL script, not by hiding these):

| Variable | Where it goes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public key |

**Locally** (for testing on your own computer): copy `.env.example` to a new file named `.env.local` in the project folder, and fill in the two values.

**On Vercel** (for the live site): Project → Settings → Environment Variables → add both, for all three environments (Production, Preview, Development).

---

## 4. Run it locally (optional, to test before deploying)

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin panel (log in with the username/password you chose in step 6 above).

---

## 5. Deploy to Vercel

You'll need **Git** installed on your computer for this step — if `git` isn't recognized when you try the commands below, install it from [git-scm.com/downloads](https://git-scm.com/downloads) first (or use the GitHub Desktop app instead, which does the same thing with a UI, no commands needed).

1. Push this project to a new GitHub repository (if it isn't already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
   Then create a new empty repository on GitHub and follow its instructions to push this code to it.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the GitHub repository you just created.
3. Vercel will auto-detect it as a Next.js project — you don't need to change any build settings.
4. Before clicking Deploy, add the two environment variables from section 3 under **Environment Variables**.
5. Click **Deploy**. After a minute or two, Vercel gives you a live URL like `https://my-aveji.vercel.app`.

### Using your own domain (e.g. mywebsite.ge)

In your Vercel project, go to **Settings → Domains**, add `mywebsite.ge`, and follow the DNS instructions shown (you'll add a couple of DNS records at wherever you registered the domain). This works whether or not you have other hosting for that domain today — Vercel just needs the domain pointed at it.

---

## 6. Using the admin panel

Once deployed, go to `https://<your-domain>/admin`, log in with your username and password, and you'll land on the dashboard. From there:
- **Products** — add/edit/delete/duplicate products, upload photos, mark items as featured, show/hide them, and reorder them.
- **Categories** — add/rename/delete/reorder categories and pick an icon for each.
- **საიტის კონტენტი (Website Content)** — edit the store name, hero text, about-us text, phone, WhatsApp, Facebook/Instagram, address, hours, and the map link. Changes here (and to products/categories) appear on the public site immediately — no redeploy needed.
- **პარამეტრები (Settings)** — change your admin password.

Log out any time with the **გასვლა** button in the sidebar.

---

## Project structure notes (for future reference)

- `app/page.tsx` — the public homepage, fetches everything from Supabase on each request.
- `app/admin/**` — the admin panel. `middleware.ts` blocks any `/admin/*` page from unauthenticated visitors.
- `css/styles.css` — the original public-site styling, unchanged.
- `css/admin.css` — styling for the admin dashboard only.
- `lib/actions/*` — all the server-side logic for creating/editing/deleting data (Server Actions). These run only on the server and are the only way the app writes to the database.
- `supabase-setup.sql` — the full database schema + security rules; safe to re-run (it won't duplicate anything).
