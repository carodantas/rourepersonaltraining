import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AdminApiService } from '../../../services/admin-api.service';
import { BlogPost, ContentModel } from '../../../models/content.model';

@Component({
  selector: 'app-posts-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-list.page.html',
  styleUrl: './posts-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly query = signal('');

  private content: ContentModel | null = null;
  readonly posts = signal<BlogPost[]>([]);

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const items = this.posts();
    if (!q) return items;
    return items.filter(p => {
      const title = (p.title ?? '').toLowerCase();
      const slug = (p.slug ?? '').toLowerCase();
      return title.includes(q) || slug.includes(q);
    });
  });

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getContent().subscribe({
      next: content => {
        this.loading.set(false);
        this.content = content;
        const items = content.blog?.posts ?? [];
        // Show newest first.
        const sorted = [...items].sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));
        this.posts.set(sorted);
      },
      error: (err: unknown) => {
        this.loading.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Failed to load content.');
      }
    });
  }

  onQueryInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.query.set(target?.value ?? '');
  }

  edit(id: string): void {
    void this.router.navigate(['/posts', id]);
  }

  create(): void {
    void this.router.navigate(['/posts/new']);
  }

  statusLabel(p: BlogPost): string {
    return p.status === 'published' ? 'Published' : 'Draft';
  }
}

