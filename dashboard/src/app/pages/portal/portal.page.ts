import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-portal-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './portal.page.html',
  styleUrl: './portal.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);

  readonly checkingSession = signal(true);

  constructor() {
    // Cheap session check: protected endpoint. If not logged in, redirect to login.
    this.api.getContent().subscribe({
      next: () => this.checkingSession.set(false),
      error: (err: unknown) => {
        this.checkingSession.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
        }
      }
    });
  }

  logout(): void {
    this.api.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: () => this.router.navigateByUrl('/login')
    });
  }
}

