import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminApiService } from '../../../services/admin-api.service';
import { BlogCategory, BlogPost, BlogPostSection, ContentModel } from '../../../models/content.model';
import { slugify } from '../../../utils/slugify';
import { environment } from '../../../../environments/environment';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';

type Locale = 'nl' | 'en';

function isoToDateInput(iso?: string): string {
  if (!iso) return '';
  // "YYYY-MM-DD..." -> "YYYY-MM-DD"
  return iso.length >= 10 ? iso.slice(0, 10) : '';
}

function dateInputToIso(date: string): string | undefined {
  const d = (date ?? '').trim();
  if (!d) return undefined;
  return `${d}T00:00:00Z`;
}

@Component({
  selector: 'app-post-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RichTextEditorComponent],
  templateUrl: './post-edit.page.html',
  styleUrl: './post-edit.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly uploading = signal(false);
  readonly error = signal<string | null>(null);
  readonly info = signal<string | null>(null);
  readonly activeTab = signal<Locale>('nl');

  private content: ContentModel | null = null;
  private currentPost: BlogPost | null = null;

  readonly isNew = computed(() => this.route.snapshot.paramMap.get('id') === null);

  readonly categories = signal<BlogCategory[]>([]);

  readonly form = this.fb.group({
    // Meta
    id: [''],
    slug: ['', [Validators.required]],
    status: ['draft', [Validators.required]],
    publishedDate: [''],
    categoryId: [''],
    cardImage: [''],
    heroImage: [''],

    // NL (base)
    titleNl: ['', [Validators.required]],
    excerptNl: [''],
    introNl: ['', [Validators.required]],
    sectionsNl: this.fb.array([]),

    // EN (translation)
    titleEn: ['', [Validators.required]],
    excerptEn: [''],
    introEn: ['', [Validators.required]],
    sectionsEn: this.fb.array([])
  });

  readonly sectionsNl = computed(() => this.form.controls.sectionsNl as FormArray);
  readonly sectionsEn = computed(() => this.form.controls.sectionsEn as FormArray);

  constructor() {
    this.load();
  }

  back(): void {
    void this.router.navigate(['/posts']);
  }

  preview(): void {
    this.error.set(null);
    this.info.set(null);

    const values = this.form.getRawValue();
    const id = (values.id ?? '').trim();
    const slug = slugify(values.slug ?? '');
    const status = (values.status as 'draft' | 'published') ?? 'draft';
    const siteBase = (environment.apiBaseUrl ?? '').toString(); // '' or '/staging'

    if (!slug) {
      this.error.set('Please set a slug before preview.');
      return;
    }

    // If already published, just open the public URL (no token needed).
    if (status === 'published') {
      const url = `${window.location.origin}${siteBase}/blog/${encodeURIComponent(slug)}`;
      window.open(url, '_blank', 'noopener');
      return;
    }

    if (!id) {
      this.error.set('Save the post first to preview drafts.');
      return;
    }

    this.api.createPreviewToken(id).subscribe({
      next: (res) => {
        if (!res?.ok || !res.token) {
          this.error.set('Failed to create preview token.');
          return;
        }
        const url = `${window.location.origin}${siteBase}/blog/${encodeURIComponent(slug)}?preview=${encodeURIComponent(res.token)}`;
        window.open(url, '_blank', 'noopener');
        this.info.set('Preview opened in a new tab.');
      },
      error: (err: unknown) => {
        const statusCode = (err as { status?: number })?.status;
        if (statusCode === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Failed to create preview token.');
      }
    });
  }


  private sectionGroup(s?: Partial<BlogPostSection>) {
    return this.fb.group({
      title: [s?.title ?? '', [Validators.required]],
      body: [s?.body ?? '', [Validators.required]]
    });
  }

  addSection(locale: Locale): void {
    // NL controls the structure; always sync to EN
    this.sectionsNl().push(this.sectionGroup({ title: 'New section', body: '' }));
    this.sectionsEn().push(this.sectionGroup({ title: '', body: '' }));
  }

  removeSection(locale: Locale, index: number): void {
    // NL controls the structure; always sync to EN
    this.sectionsNl().removeAt(index);
    this.sectionsEn().removeAt(index);
  }

  normalizeSlug(): void {
    const raw = (this.form.controls.slug.value ?? '').toString();
    this.form.controls.slug.setValue(slugify(raw));
  }

  private load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.info.set(null);
    this.api.getContent().subscribe({
      next: content => {
        this.loading.set(false);
        this.content = content;

        const blog = content.blog;
        this.categories.set(blog?.categories ?? []);

        const idParam = this.route.snapshot.paramMap.get('id');
        if (!idParam) {
          this.resetForNew();
          return;
        }
        const found = (blog?.posts ?? []).find(p => p.id === idParam) ?? null;
        if (!found) {
          this.error.set('Post not found.');
          return;
        }
        this.currentPost = found;
        this.fillForm(found);
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

  private resetForNew(): void {
    this.currentPost = null;
    this.form.reset({
      id: '',
      slug: '',
      status: 'draft',
      publishedDate: '',
      categoryId: '',
      cardImage: '',
      heroImage: '',
      titleNl: '',
      excerptNl: '',
      introNl: '',
      titleEn: '',
      excerptEn: '',
      introEn: ''
    });
    this.sectionsNl().clear();
    this.sectionsEn().clear();
    this.sectionsNl().push(this.sectionGroup({ title: 'New section', body: '' }));
    this.sectionsEn().push(this.sectionGroup({ title: 'New section', body: '' }));
  }

  private fillForm(p: BlogPost): void {
    const en = p.i18n?.en ?? {};
    const enContent = en.content ?? {};
    const enSections = enContent.sections ?? [];

    this.form.reset({
      id: p.id ?? '',
      slug: p.slug ?? '',
      status: p.status ?? 'draft',
      publishedDate: isoToDateInput(p.publishedAt),
      categoryId: p.categoryId ?? '',
      cardImage: p.cardImage ?? '',
      heroImage: p.heroImage ?? '',
      titleNl: p.title ?? '',
      excerptNl: p.excerpt ?? '',
      introNl: p.content?.introduction ?? '',
      titleEn: en.title ?? p.title ?? '',
      excerptEn: en.excerpt ?? p.excerpt ?? '',
      introEn: enContent.introduction ?? p.content?.introduction ?? ''
    });

    this.sectionsNl().clear();
    for (const s of p.content?.sections ?? []) this.sectionsNl().push(this.sectionGroup(s));

    this.sectionsEn().clear();
    if (enSections.length > 0) {
      for (const s of enSections) this.sectionsEn().push(this.sectionGroup(s));
    } else {
      // default: copy NL -> EN for convenience
      for (const s of p.content?.sections ?? []) this.sectionsEn().push(this.sectionGroup(s));
    }
  }

  clearImage(controlName: 'cardImage' | 'heroImage'): void {
    const current = (this.form.get(controlName)?.value ?? '').toString().trim();
    if (!current) {
      this.form.get(controlName)?.setValue('');
      return;
    }

    // Only attempt server cleanup for uploads served by our API.
    // (We don't delete static /images/* shipped with the site.)
    const path = (() => {
      try {
        return current.startsWith('http://') || current.startsWith('https://')
          ? new URL(current).pathname
          : current;
      } catch {
        return current;
      }
    })();

    if (!path.includes('/uploads/')) {
      this.form.get(controlName)?.setValue('');
      return;
    }

    this.uploading.set(true);
    this.error.set(null);
    this.info.set(null);
    this.api.deleteUpload(current).subscribe({
      next: () => {
        this.uploading.set(false);
        this.form.get(controlName)?.setValue('');
        this.info.set('Image removed.');
      },
      error: (err: unknown) => {
        this.uploading.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        // Even if delete fails, allow clearing locally.
        this.form.get(controlName)?.setValue('');
        this.error.set('Failed to remove image from server (cleared locally).');
      }
    });
  }

  onFilePicked(event: Event, controlName: 'cardImage' | 'heroImage'): void {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) return;
    this.uploadFile(file, controlName);
    // allow re-uploading the same file
    if (input) input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDropFile(event: DragEvent, controlName: 'cardImage' | 'heroImage'): void {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    this.uploadFile(file, controlName);
  }

  private uploadFile(file: File, controlName: 'cardImage' | 'heroImage'): void {
    this.uploading.set(true);
    this.error.set(null);
    this.info.set(null);
    this.api.upload(file).subscribe({
      next: res => {
        this.uploading.set(false);
        this.form.get(controlName)?.setValue(res.url);
        this.info.set('Upload completed.');
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

  save(): void {
    this.error.set(null);
    this.info.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Please fix the highlighted fields.');
      return;
    }
    if (!this.content?.blog) {
      this.error.set('Blog section is missing in content.json.');
      return;
    }

    const values = this.form.getRawValue();
    const nowIso = new Date().toISOString();
    const slug = slugify(values.slug ?? '');

    const baseSections = (this.sectionsNl().getRawValue() as BlogPostSection[]) ?? [];
    const enSections = (this.sectionsEn().getRawValue() as BlogPostSection[]) ?? [];

    const id =
      (values.id ?? '').trim() ||
      `post_${slug || Math.random().toString(16).slice(2)}`;

    const post: BlogPost = {
      id,
      slug,
      status: (values.status as 'draft' | 'published') ?? 'draft',
      publishedAt: dateInputToIso(values.publishedDate ?? ''),
      updatedAt: this.currentPost?.updatedAt ?? nowIso,
      categoryId: (values.categoryId ?? '').trim() || undefined,
      tags: this.currentPost?.tags ?? [],
      cardImage: (values.cardImage ?? '').trim() || undefined,
      heroImage: (values.heroImage ?? '').trim() || undefined,
      title: (values.titleNl ?? '').trim(),
      excerpt: (values.excerptNl ?? '').trim() || undefined,
      content: {
        introduction: (values.introNl ?? '').trim(),
        sections: baseSections,
      },
      i18n: {
        en: {
          title: (values.titleEn ?? '').trim() || undefined,
          excerpt: (values.excerptEn ?? '').trim() || undefined,
          content: {
            introduction: (values.introEn ?? '').trim() || undefined,
            sections: enSections
          }
        }
      }
    };

    // Create/replace post in array.
    const current = this.content!;
    const blog = current.blog!;
    const posts = [...(blog.posts ?? [])];
    const idx = posts.findIndex(p => p.id === id);
    if (idx >= 0) posts[idx] = post;
    else posts.push(post);

    const next: ContentModel = {
      ...current,
      blog: {
        ...blog,
        categories: blog.categories ?? [],
        posts
      }
    };

    this.saving.set(true);
    this.api.saveContent(next).subscribe({
      next: () => {
        this.saving.set(false);
        this.info.set('Saved successfully.');
        // Reload so meta.updatedAt and any server normalization is reflected.
        this.load();
        // If we just created a new post, navigate to its edit URL.
        if (this.isNew()) {
          void this.router.navigate(['/posts', id]);
        }
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
}

