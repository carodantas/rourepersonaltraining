import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';
import { ContentModel, MenuCategory } from '../../../models/content.model';

@Component({
  selector: 'app-menu-categories-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-categories.page.html',
  styleUrl: './menu-categories.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCategoriesPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly query = signal('');

  readonly content = signal<ContentModel | null>(null);
  readonly categories = computed(() => (this.content()?.menu ?? []) as MenuCategory[]);
  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const items = this.categories();
    if (!q) return items;
    return items.filter(c => (c.name ?? '').toLowerCase().includes(q) || (c.id ?? '').toLowerCase().includes(q));
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
        this.content.set(content);
      },
      error: (err: unknown) => {
        this.loading.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Falha ao carregar cardápio.');
      }
    });
  }

  onQueryInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.query.set(target?.value ?? '');
  }

  createCategory(): void {
    void this.router.navigate(['/cardapio/categoria/nova']);
  }

  editCategory(id: string): void {
    void this.router.navigate(['/cardapio/categoria', id]);
  }
}

