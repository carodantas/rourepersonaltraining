import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './editor.page.html',
  styleUrl: './editor.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly uploading = signal(false);
  readonly error = signal<string | null>(null);
  readonly info = signal<string | null>(null);

  readonly rawJson = signal<string>('');
  readonly lastUploadUrl = signal<string | null>(null);

  constructor() {
    this.refresh();
  }

  onRawJsonInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement | null;
    this.rawJson.set(target?.value ?? '');
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set(null);
    this.info.set(null);

    this.api.getContent().subscribe({
      next: content => {
        this.loading.set(false);
        this.rawJson.set(JSON.stringify(content, null, 2));
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

  format(): void {
    this.error.set(null);
    try {
      const parsed = JSON.parse(this.rawJson());
      this.rawJson.set(JSON.stringify(parsed, null, 2));
    } catch {
      this.error.set('Invalid JSON: could not format.');
    }
  }

  save(): void {
    this.error.set(null);
    this.info.set(null);
    let parsed: unknown;
    try {
      parsed = JSON.parse(this.rawJson());
    } catch {
      this.error.set('Invalid JSON: fix it before saving.');
      return;
    }

    this.saving.set(true);
    this.api.saveContent(parsed).subscribe({
      next: () => {
        this.saving.set(false);
        this.info.set('Saved successfully.');
        this.refresh();
      },
      error: (err: unknown) => {
        this.saving.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Failed to save. Check the schema and try again.');
      }
    });
  }

  pickFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.uploading.set(true);
    this.error.set(null);
    this.info.set(null);

    this.api.upload(file).subscribe({
      next: res => {
        this.uploading.set(false);
        this.lastUploadUrl.set(res.url);
        this.info.set('Upload completed.');
        input.value = '';
      },
      error: (err: unknown) => {
        this.uploading.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Upload failed.');
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

