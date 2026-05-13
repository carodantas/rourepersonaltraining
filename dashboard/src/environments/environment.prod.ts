export const environment = {
  production: true,
  /**
   * PHP CMS origin + mount path. Production deploy uses `public_html/api/index.php`, i.e.
   * `https://rourepersonaltraining.nl/api` so credentialed calls from the dashboard host work.
   */
  apiBaseUrl: 'https://rourepersonaltraining.nl/api',
  /** Main site origin for preview links from the dashboard */
  sitePublicOrigin: 'https://rourepersonaltraining.nl',
  /**
   * When the API is still reached on another hostname (e.g. `api.*`) but uploads are public on
   * the main site under `/api/uploads/`, set this to the main HTTPS origin. Empty = no rewrite.
   */
  mediaPublicOrigin: '',
};

