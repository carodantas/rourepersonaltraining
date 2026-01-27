import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminApiService } from '../../../services/admin-api.service';
import { BlogCategory, ContentModel } from '../../../models/content.model';
import { slugify } from '../../../utils/slugify';

type CategoryFormValue = {
  id: string;
  nameNl: string;
  nameEn: string;
};

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly info = signal<string | null>(null);

  private content: ContentModel | null = null;

  readonly categoriesArray: FormArray = this.fb.array([]);
  readonly form: FormGroup = this.fb.group({
    categories: this.categoriesArray
  });

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set(null);
    this.info.set(null);
    this.api.getContent().subscribe({
      next: content => {
        this.loading.set(false);
        this.content = content;
        this.rebuildForm(content);
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

  private rebuildForm(content: ContentModel): void {
    const blog = content.blog;
    this.categoriesArray.clear();
    for (const c of blog?.categories ?? []) this.categoriesArray.push(this.categoryGroupFromModel(c) as any);
  }

  private categoryGroupFromModel(c: BlogCategory) {
    return this.fb.group({
      id: [c.id ?? '', [Validators.required]],
      nameNl: [c.name ?? '', [Validators.required]],
      nameEn: [c.i18n?.en?.name ?? '', [Validators.required]]
    });
  }

  add(): void {
    this.categoriesArray.push(
      this.fb.group({
        id: ['new-category', [Validators.required]],
        nameNl: ['New category', [Validators.required]],
        nameEn: ['New category', [Validators.required]]
      }) as any
    );
  }

  removeAt(index: number): void {
    this.categoriesArray.removeAt(index);
  }

  normalizeId(index: number): void {
    const group = this.categoriesArray.at(index);
    const raw = (group?.value as CategoryFormValue | null)?.id ?? '';
    group?.get('id')?.setValue(slugify(raw));
  }

  save(): void {
    this.error.set(null);
    this.info.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Please fix the highlighted fields.');
      return;
    }
    if (!this.content) {
      this.error.set('Content is not loaded.');
      return;
    }
    const blog = this.content.blog;
    if (!blog) {
      this.error.set('Blog section is missing in content.json.');
      return;
    }

    const values = (this.categoriesArray.getRawValue() as CategoryFormValue[]) ?? [];
    const categories: BlogCategory[] = values.map(v => ({
      id: v.id,
      name: v.nameNl,
      i18n: { en: { name: v.nameEn } }
    }));

    // Keep featuredPostSlug/posts as-is.
    const next: ContentModel = {
      ...this.content,
      blog: {
        ...blog,
        categories
      }
    };

    this.saving.set(true);
    this.api.saveContent(next).subscribe({
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
        this.error.set('Failed to save.');
      }
    });
  }
}

