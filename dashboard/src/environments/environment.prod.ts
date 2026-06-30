export const environment = {
  production: true,
  /**
   * CMS API on the same HTTPS origin as the dashboard (/api/... rewrites to api/index.php).
   * Avoids mixed-content blocks (HTTPS dashboard → HTTP api.*) and matches production Apache layout.
   */
  apiBaseUrl: '/api',
  sitePublicOrigin: 'https://rourepersonaltraining.nl',
  /** Uploads and public URLs live on the main site under /api/uploads/ */
  mediaPublicOrigin: 'https://rourepersonaltraining.nl',
};

