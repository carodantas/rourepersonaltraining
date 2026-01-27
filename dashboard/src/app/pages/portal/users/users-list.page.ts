import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminApiService, AdminUser } from '../../../services/admin-api.service';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.page.html',
  styleUrl: './users-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly query = signal('');
  readonly users = signal<AdminUser[]>([]);

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const items = this.users();
    if (!q) return items;
    return items.filter(u => (u.username ?? '').toLowerCase().includes(q) || (u.name ?? '').toLowerCase().includes(q));
  });

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getUsers().subscribe({
      next: res => {
        this.loading.set(false);
        this.users.set(res.users ?? []);
      },
      error: (err: unknown) => {
        this.loading.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Failed to load users.');
      }
    });
  }

  onQueryInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.query.set(target?.value ?? '');
  }

  edit(id: string): void {
    void this.router.navigate(['/users', id]);
  }

  create(): void {
    void this.router.navigate(['/users/new']);
  }
}

