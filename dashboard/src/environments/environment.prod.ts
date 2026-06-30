export const environment = {
  production: true,
  /**
   * Dashboard on dashboard.* must call the CMS over HTTPS so the session cookie is stored
   * (Secure + SameSite=None). HTTP api.* login returns 200 but the browser drops the cookie.
   */
  apiBaseUrl: 'https://rourepersonaltraining.nl/api',
  sitePublicOrigin: 'https://rourepersonaltraining.nl',
  /** Uploads and public URLs live on the main site under /api/uploads/ */
  mediaPublicOrigin: 'https://rourepersonaltraining.nl',
};
