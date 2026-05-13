export const environment = {
  production: true,
  /**
   * Production CMS host (subdomain docroot, same pattern as staging-api).
   * Paths are /admin/..., /content.json, etc. (no extra /api prefix in the URL).
   */
  apiBaseUrl: 'https://api.rourepersonaltraining.nl',
  sitePublicOrigin: 'https://rourepersonaltraining.nl',
  /** Uploads and public URLs live on the main site under /api/uploads/ */
  mediaPublicOrigin: 'https://rourepersonaltraining.nl',
};

