export const environment = {
  production: true,
  /**
   * Production CMS host (subdomain docroot, same pattern as staging-api).
   * Paths are /admin/..., /content.json, etc. (no extra /api prefix in the URL).
   * Use http:// until TLS is enabled on this host; if the dashboard is HTTPS-only,
   * browsers block active mixed content — then enable HTTPS on the API or serve the dashboard over HTTP.
   */
  apiBaseUrl: 'http://api.rourepersonaltraining.nl',
  sitePublicOrigin: 'https://rourepersonaltraining.nl',
  /** Uploads and public URLs live on the main site under /api/uploads/ */
  mediaPublicOrigin: 'https://rourepersonaltraining.nl',
};

