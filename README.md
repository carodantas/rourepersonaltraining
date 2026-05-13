# Rourepersonaltraining

## Local development

This repo has three parts: **public site** (`roure/`), **admin dashboard** (`dashboard/`), and **PHP CMS** (`backend/`). Angular dev-servers proxy CMS paths (`/admin`, `/content.json`, `/uploads`, `/preview`, `/form.php`) plus legacy `/api` to PHP at `http://localhost:8000` (see `proxy.conf.json` in each app).

### Prerequisites

- Node.js and npm (match the versions implied by each `package.json`)
- PHP CLI (to serve `backend/`)

### 1. API (`backend/`)

In a terminal, from the backend folder:

```bash
cd backend
php -S localhost:8000 router.php
```

The `router.php` script does what Apache `.htaccess` does inside `backend/`: route non-static requests to PHP. Published JSON lives in `backend/content.json`; admin users under `backend/private/security/` (see `users.local.json` for `php -S` only).

Quick check (browser or curl): `http://localhost:8000/content.json`

Admin login (JSON POST): `http://localhost:8000/admin/login`

Free intake submissions in dev: `backend/form.php` includes `roure/public/form.php`, reached at `http://localhost:8000/form.php`.

### 2. Public site (`roure/`)

Another terminal:

```bash
cd roure
npm install
npm start
```

Open **http://localhost:4200/**. The SPA requests **same-origin** CMS URLs (`/content.json`, `/preview/post?…`, `/form.php`).

#### Sitemap (`sitemap.xml`)

The marketing site ships **`roure/public/sitemap.xml`** at **`/sitemap.xml`**. It is generated from fixed routes plus **published** blog posts in **`backend/content.json`**.

- **Automatic:** `npm run build` and `npm run build:staging` in `roure/` run **`prebuild`** / **`prebuild:staging`**, which call `generate:sitemap` before `ng build`, so the next deploy already refreshes the file when `content.json` is present in the repo checkout.
- **Manual (only regenerate the XML):** from `roure/`:

```bash
cd roure
npm run generate:sitemap
```

- **Canonical site URL:** URLs default to `https://rourepersonaltraining.nl`. To override (e.g. `www` or another host):

```bash
SITEMAP_BASE_URL=https://rourepersonaltraining.nl npm run generate:sitemap
```

### 3. Dashboard (`dashboard/`)

A third terminal (different port so it does not clash with the site):

```bash
cd dashboard
npm install
npm start -- --port 4201
```

Open **http://localhost:4201/** (`baseHref` is `/`; the proxy forwards `/admin` and related paths to PHP on port 8000).

### Hosting layout (staging / production)

- **Marketing / public Angular** stays on the usual `public_html/…` path (staging build under `/staging/`). Production ships **API** under **`public_html/api/`** (staging: `staging-api/`) and **dashboard** under **`public_html/dashboard/`** (staging: `staging-dashboard/`) — all of them subfolders of `SSH_PATH` (`REMOTE_ROOT`).
- **CMS handlers** ship as **`public_html/api/index.php`**; Apache rewrites **`/admin/*`**, **`/content.json`**, **`/preview/*`**, **`/uploads/*`** into that folder. Legacy **`/api/*`** is still rewritten for compatibility.
- **Dashboard SPA** uses `base-href=/`; point the dashboard vhost or URL path at **`…/public_html/dashboard/`** in hosting (production) or **`…/public_html/staging-dashboard/`** (staging).
- If the dashboard runs on a **different hostname** than the CMS, set `dashboard` production `environment` `apiBaseUrl` **and** `sitePublicOrigin` to the HTTPS origin where the CMS is mounted (matching `environment.staging.ts`).

### Deploy paths (GitHub Actions)

#### Production

| What | Remote path |
| --- | --- |
| **Public site** (`roure` browser build) | `$REMOTE_ROOT/` (contents of `dist/…/browser/*` go **here**, not into a subfolder) |
| **Dashboard** (`dashboard` browser build) | `$REMOTE_ROOT/dashboard/` (same pattern as staging: `$REMOTE_ROOT/staging-dashboard/`) |
| **PHP API** | `$REMOTE_ROOT/api/` (`index.php`, `.htaccess`; same idea as staging `$REMOTE_ROOT/staging-api/`) |
| **Seeded CMS data** (only if missing; existing files kept) | `$REMOTE_ROOT/../_private/content.json`, `users.json` (also mirrored under `$REMOTE_ROOT/_private/` in the same job) |

#### Staging

| What | Remote path |
| --- | --- |
| **Public site** (staging build) | `$REMOTE_ROOT/staging/` |
| **Dashboard** (staging build) | `$REMOTE_ROOT/staging-dashboard/` |
| **PHP API** | `$REMOTE_ROOT/staging-api/` (`index.php`, `.htaccess`; `router.php` / `content.json` uploaded only if absent) |


### Summary

| Service   | Folder       | Typical command                         | URLs (examples)                                                                      |
| --------- | ------------ | --------------------------------------- | ------------------------------------------------------------------------------------ |
| PHP CMS   | `backend/`   | `php -S localhost:8000 router.php`      | `/content.json`, `/admin/login`, `/uploads/…’, `/preview/post`; legacy `/api/…’      |
| Site      | `roure/`     | `npm start`                             | `http://localhost:4200/`                                                             |
| Dashboard | `dashboard/` | `npm start -- --port 4201`              | `http://localhost:4201/`                                                             |

Recommended order: start PHP (8000) first, then the site and/or dashboard.
