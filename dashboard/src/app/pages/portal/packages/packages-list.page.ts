import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';
import { ContentModel } from '../../../models/content.model';

@Component({
  selector: 'app-packages-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages-list.page.html',
  styleUrl: './packages-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesListPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly query = signal('');

  readonly content = signal<ContentModel | null>(null);

  readonly packages = computed(() => this.content()?.packages ?? []);
  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const items = this.packages();
    if (!q) return items;
    return items.filter(p => (p.name ?? '').toLowerCase().includes(q) || (p.id ?? '').includes(q));
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
        this.error.set('Falha ao carregar pacotes.');
      }
    });
  }

  onQueryInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.query.set(target?.value ?? '');
  }

  edit(id: string): void {
    void this.router.navigate(['/pacotes', id]);
  }

  create(): void {
    void this.router.navigate(['/pacotes/novo']);
  }
}

