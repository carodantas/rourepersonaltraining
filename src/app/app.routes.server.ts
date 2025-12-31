import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic route (param) should not be prerendered unless getPrerenderParams is provided.
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
