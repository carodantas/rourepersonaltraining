/**
 * Local dev (`ng serve`): same-origin via `proxy.conf.json` → PHP backend (`/content.json`, `/form.php`, …).
 * Production replaces this file with `environment.prod.ts` (CMS paths under `/api/*`).
 */
export const environment = {
  apiPublicOrigin: '',
  cmsPathPrefix: '',
};
