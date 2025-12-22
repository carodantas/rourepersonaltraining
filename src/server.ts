import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const imagesDistFolder = join(browserDistFolder, 'images');

const app = express();
const angularApp = new AngularNodeAppEngine();

function normalizeBasePath(input: string | undefined): string {
  const raw = (input ?? '').trim();
  if (!raw || raw === '/' || raw === '\\') return '';
  let p = raw.replace(/\\/g, '/');
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/\/+$/g, '');
  return p === '/' ? '' : p;
}

/**
 * Base path where this app is mounted (e.g. "/staging").
 * When set, the server:
 * - serves static assets from `${BASE_PATH}/...`
 * - only SSR-renders requests under `${BASE_PATH}`
 */
const BASE_PATH = normalizeBasePath(process.env['BASE_PATH']);

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
// Always expose `/images/*` at the domain root. This prevents broken absolute URLs like `/images/logo.png`
// when the app is hosted under a sub-path (e.g. `/staging`).
app.use(
  '/images',
  express.static(imagesDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

if (BASE_PATH) {
  // Ensure canonical trailing slash for the mount root (matches <base href="/staging/">)
  app.get(BASE_PATH, (req, res) => res.redirect(301, `${BASE_PATH}/`));

  app.use(
    BASE_PATH,
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
      redirect: false,
    }),
  );
} else {
  app.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
      redirect: false,
    }),
  );
}

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  if (BASE_PATH && !req.url.startsWith(BASE_PATH)) {
    return next();
  }
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// If the app is mounted under a base path, anything outside it is not handled here.
if (BASE_PATH) {
  app.use((req, res) => {
    res.status(404).send('Not Found');
  });
}

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
