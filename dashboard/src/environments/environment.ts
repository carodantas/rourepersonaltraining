export const environment = {
  production: false,
  /**
   * Base URL for the backend API (e.g. public site origin if the CMS is mounted there).
   * In dev, keep empty — proxy forwards `/admin`, `/content.json`, `/preview`, `/uploads` to PHP.
   */
  apiBaseUrl: '',
  /**
   * Public site origin for dashboard "open preview" links. Empty = same host as the dashboard.
   */
  sitePublicOrigin: '',
};

