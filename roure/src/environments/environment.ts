/**
 * Local dev (`ng serve`): same-origin via `proxy.conf.json` → PHP backend (`/content.json`, `/form.php`, …).
 * Production bundle replaces this file with `environment.prod.ts` (API on api subdomain).
 */
export const environment = {
  apiPublicOrigin: '',
};
