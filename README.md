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

### 3. Dashboard (`dashboard/`)

A third terminal (different port so it does not clash with the site):

```bash
cd dashboard
npm install
npm start -- --port 4201
```

Open **http://localhost:4201/** (`baseHref` is `/`; the proxy forwards `/admin` and related paths to PHP on port 8000).

### Hosting layout (staging / production)

- **Marketing / public Angular** stays on the usual `public_html/…` path (staging build under `/staging/` on the staging host).
- **CMS handlers** ship as **`public_html/api/index.php`**; Apache rewrites **`/admin/*`**, **`/content.json`**, **`/preview/*`**, **`/uploads/*`** into that folder. Legacy **`/api/*`** is still rewritten for compatibility.
- **Dashboard SPA** expects its own subdomain or sibling docroot (**`dashboard/`**, **`staging-dashboard/`** next to `public_html`) with `base-href=/` so hashed bundles do not clash with the public site.
- If the dashboard runs on a **different hostname** than the CMS, set `dashboard` production `environment` `apiBaseUrl` **and** `sitePublicOrigin` to the HTTPS origin where the CMS is mounted (matching `environment.staging.ts`).

### Summary

| Service   | Folder       | Typical command                         | URLs (examples)                                                                      |
| --------- | ------------ | --------------------------------------- | ------------------------------------------------------------------------------------ |
| PHP CMS   | `backend/`   | `php -S localhost:8000 router.php`      | `/content.json`, `/admin/login`, `/uploads/…’, `/preview/post`; legacy `/api/…’      |
| Site      | `roure/`     | `npm start`                             | `http://localhost:4200/`                                                             |
| Dashboard | `dashboard/` | `npm start -- --port 4201`              | `http://localhost:4201/`                                                             |

Recommended order: start PHP (8000) first, then the site and/or dashboard.
