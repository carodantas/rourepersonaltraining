import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService, AdminUser } from '../../../services/admin-api.service';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './user-edit.page.html',
  styleUrl: './user-edit.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly info = signal<string | null>(null);
  readonly confirmDeleteOpen = signal(false);

  readonly isNew = computed(() => this.route.snapshot.paramMap.get('id') === null);

  readonly form = this.fb.group({
    active: [true],
    username: ['', [Validators.required]],
    name: [''],
    password: [''],
    passwordConfirm: ['']
  });

  private currentUser: AdminUser | null = null;

  constructor() {
    this.load();
  }

  back(): void {
    void this.router.navigate(['/users']);
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.info.set(null);

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.loading.set(false);
      this.resetForNew();
      return;
    }

    this.api.getUsers().subscribe({
      next: res => {
        this.loading.set(false);
        const found = (res.users ?? []).find(u => u.id === idParam) ?? null;
        if (!found) {
          this.error.set('User not found.');
          return;
        }
        this.currentUser = found;
        this.fillForm(found);
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

  resetForNew(): void {
    this.currentUser = null;
    this.form.reset({
      active: true,
      username: '',
      name: '',
      password: '',
      passwordConfirm: ''
    });
  }

  fillForm(u: AdminUser): void {
    this.form.reset({
      active: u.active !== false,
      username: u.username ?? '',
      name: u.name ?? '',
      password: '',
      passwordConfirm: ''
    });
  }

  private validatePasswordRules(isNew: boolean): string | null {
    const password = (this.form.value.password ?? '').toString();
    const confirm = (this.form.value.passwordConfirm ?? '').toString();

    if (isNew && password.trim() === '') return 'Password is required.';
    if (password.trim() !== '') {
      if (password.length < 6) return 'Password must be at least 6 characters.';
      if (password !== confirm) return 'Password confirmation does not match.';
    }
    return null;
  }

  save(): void {
    this.error.set(null);
    this.info.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Please fill the required fields.');
      return;
    }

    const username = (this.form.value.username ?? '').toString().trim();
    const name = (this.form.value.name ?? '').toString().trim();
    const active = this.form.value.active !== false;
    const password = (this.form.value.password ?? '').toString();

    const pwdError = this.validatePasswordRules(this.isNew());
    if (pwdError) {
      this.error.set(pwdError);
      return;
    }

    this.saving.set(true);
    if (this.isNew()) {
      this.api
        .createUser({ username, name: name || undefined, active, password })
        .subscribe({
          next: () => {
            this.saving.set(false);
            this.info.set('User created successfully.');
            void this.router.navigate(['/users']);
          },
          error: (err: unknown) => {
            this.saving.set(false);
            const status = (err as { status?: number })?.status;
            const code = (err as { error?: { error?: string } })?.error?.error;
            if (status === 401) {
              this.router.navigateByUrl('/login');
              return;
            }
            if (code === 'username_taken') {
              this.error.set('That username is already taken.');
              return;
            }
            if (code === 'weak_password') {
              this.error.set('Weak password (minimum 6 characters).');
              return;
            }
            this.error.set('Failed to create user.');
          }
        });
      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;
    const payload: { username: string; name?: string; active?: boolean; password?: string } = {
      username,
      name: name || undefined,
      active
    };
    if (password.trim() !== '') payload.password = password;

    this.api.updateUser(id, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.info.set('User updated.');
        this.load();
      },
      error: (err: unknown) => {
        this.saving.set(false);
        const status = (err as { status?: number })?.status;
        const code = (err as { error?: { error?: string } })?.error?.error;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        if (code === 'username_taken') {
          this.error.set('That username is already taken.');
          return;
        }
        if (code === 'weak_password') {
          this.error.set('Weak password (minimum 6 characters).');
          return;
        }
        this.error.set('Failed to save user.');
      }
    });
  }

  remove(): void {
    this.error.set(null);
    this.info.set(null);
    if (this.isNew()) return;
    const id = this.route.snapshot.paramMap.get('id')!;
    this.saving.set(true);
    this.api.deleteUser(id).subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/users']);
      },
      error: (err: unknown) => {
        this.saving.set(false);
        const status = (err as { status?: number })?.status;
        const code = (err as { error?: { error?: string } })?.error?.error;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        if (code === 'cannot_delete_self') {
          this.error.set('You cannot delete the currently logged-in user.');
          return;
        }
        if (code === 'cannot_delete_last_admin') {
          this.error.set('You cannot delete the last active admin.');
          return;
        }
        this.error.set('Failed to delete user.');
      }
    });
  }

  askDelete(): void {
    if (this.isNew()) return;
    this.confirmDeleteOpen.set(true);
  }

  cancelDelete(): void {
    this.confirmDeleteOpen.set(false);
  }

  confirmDelete(): void {
    this.confirmDeleteOpen.set(false);
    this.remove();
  }
}

