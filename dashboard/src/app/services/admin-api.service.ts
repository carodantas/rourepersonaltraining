import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ContentModel } from '../models/content.model';
import { environment } from '../../environments/environment';

export interface AdminUser {
  id: string;
  username: string;
  name?: string;
  role?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PreviewTokenResponse {
  ok: boolean;
  token: string;
  expiresAt: string;
  postId: string;
  slug?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly http = inject(HttpClient);

  private url(path: string) {
    // path should start with "/"
    return `${environment.apiBaseUrl}${path}`;
  }

  private absoluteMaybe(pathOrUrl: string) {
    if (typeof pathOrUrl !== 'string') return pathOrUrl as unknown as string;
    const trimmed = pathOrUrl.trim();
    if (trimmed === '') return '';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed.startsWith('/')) {
      const base = environment.apiBaseUrl.replace(/\/$/, '');
      if (!base) return trimmed;
      try {
        return new URL(trimmed, `${base}/`).href;
      } catch {
        return `${base}${trimmed}`;
      }
    }
    return trimmed;
  }

  /**
   * Absolute URL for display/API: same as {@link absoluteMaybe}, then optional origin swap so
   * uploads match the public site (e.g. `api.*` → `rourepersonaltraining.nl`) when `mediaPublicOrigin` is set.
   */
  normalizeMediaUrl(pathOrUrl: string): string {
    const abs = this.absoluteMaybe(pathOrUrl);
    const mediaOrigin = (environment.mediaPublicOrigin ?? '').replace(/\/$/, '');
    if (!mediaOrigin || abs === '') return abs;
    const isUploadPath = (path: string) => path.includes('/api/uploads/') || path.includes('/uploads/');
    if (!isUploadPath(abs)) return abs;
    try {
      if (abs.startsWith('http://') || abs.startsWith('https://')) {
        const u = new URL(abs);
        if (isUploadPath(u.pathname)) {
          return `${mediaOrigin}${u.pathname}${u.search}${u.hash}`;
        }
        return abs;
      }
      if (abs.startsWith('/')) return `${mediaOrigin}${abs}`;
    } catch {
      /* ignore malformed URLs */
    }
    return abs;
  }

  login(username: string, password: string) {
    return this.http.post<{ ok: boolean; username?: string }>(
      this.url('/admin/login'),
      { username, password },
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post<{ ok: boolean }>(this.url('/admin/logout'), {}, { withCredentials: true });
  }

  getContent() {
    return this.http.get<ContentModel>(this.url('/admin/content'), { withCredentials: true });
  }

  saveContent(content: unknown) {
    return this.http.put<{ ok: boolean }>(this.url('/admin/content'), content, { withCredentials: true });
  }

  createPreviewToken(postId: string) {
    return this.http.post<PreviewTokenResponse>(
      this.url('/admin/preview-token'),
      { postId },
      { withCredentials: true }
    );
  }

  upload(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http
      .post<{ ok: boolean; url: string }>(this.url('/admin/upload'), form, { withCredentials: true })
      .pipe(map(res => ({ ...res, url: this.normalizeMediaUrl(res.url) })));
  }

  deleteUpload(url: string) {
    return this.http.post<{ ok: boolean }>(
      this.url('/admin/delete-upload'),
      { url },
      { withCredentials: true }
    );
  }

  getUsers() {
    return this.http.get<{ users: AdminUser[] }>(this.url('/admin/users'), { withCredentials: true });
  }

  createUser(payload: { username: string; password: string; name?: string; active?: boolean }) {
    return this.http.post<{ ok: boolean; user: AdminUser }>(this.url('/admin/users'), payload, {
      withCredentials: true
    });
  }

  updateUser(id: string, payload: { username: string; password?: string; name?: string; active?: boolean }) {
    return this.http.put<{ ok: boolean; user: AdminUser }>(
      this.url(`/admin/users/${encodeURIComponent(id)}`),
      payload,
      { withCredentials: true }
    );
  }

  deleteUser(id: string) {
    return this.http.delete<{ ok: boolean }>(this.url(`/admin/users/${encodeURIComponent(id)}`), {
      withCredentials: true
    });
  }
}

