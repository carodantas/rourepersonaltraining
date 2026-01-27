export const environment = {
  production: true,
  /**
   * Staging is hosted under /staging/dashboard and must call the API under /staging/api.
   * We keep API paths as "/api/..." in code and prefix them here.
   */
  apiBaseUrl: '/staging',
};

