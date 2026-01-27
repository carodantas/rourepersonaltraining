import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Blog list is content-driven, so do not prerender it.
  {
    path: 'blog',
    renderMode: RenderMode.Server
  },
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
