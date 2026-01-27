import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';
import { ContentModel, MenuCategory, MenuSubcategory } from '../../../models/content.model';
import { slugify } from '../../../utils/slugify';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-menu-category-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './menu-category-edit.page.html',
  styleUrl: './menu-category-edit.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCategoryEditPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly info = signal<string | null>(null);
  readonly confirmDeleteOpen = signal(false);

  readonly content = signal<ContentModel | null>(null);
  readonly isNew = computed(() => this.route.snapshot.paramMap.get('id') === null);
  readonly category = signal<MenuCategory | null>(null);

  readonly lang = signal<'pt' | 'en' | 'es'>('pt');

  readonly form = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    subcategories: this.fb.array<FormControl<string>>([]),

    i18nEnName: [''],
    i18nEsName: ['']
  });

  private currentCategory: MenuCategory | null = null;

  constructor() {
    this.load();
  }

  get subcategories(): FormArray<FormControl<string>> {
    return this.form.get('subcategories') as FormArray<FormControl<string>>;
  }

  back(): void {
    void this.router.navigate(['/cardapio']);
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.info.set(null);

    const idParam = this.route.snapshot.paramMap.get('id');
    this.api.getContent().subscribe({
      next: content => {
        this.loading.set(false);
        this.content.set(content);

        if (!idParam) {
          this.resetForNew();
          return;
        }

        const cat = (content.menu ?? []).find(c => c.id === idParam) ?? null;
        if (!cat) {
          this.error.set('Categoria não encontrada.');
          return;
        }
        this.currentCategory = cat;
        this.category.set(cat);
        this.fillForm(cat);
      },
      error: (err: unknown) => {
        this.loading.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Falha ao carregar conteúdo.');
      }
    });
  }

  resetForNew(): void {
    this.currentCategory = null;
    this.category.set(null);
    this.form.reset({ id: '', name: '', i18nEnName: '', i18nEsName: '' });
    this.subcategories.clear();
    this.lang.set('pt');
  }

  fillForm(cat: MenuCategory): void {
    this.form.patchValue({ id: cat.id, name: cat.name });
    this.subcategories.clear();
    for (const s of cat.subcategories ?? []) {
      this.subcategories.push(this.fb.control(s.id, { nonNullable: true }));
    }

    const en = cat.i18n?.en ?? null;
    const es = cat.i18n?.es ?? null;
    this.form.patchValue({
      i18nEnName: (en?.name ?? '').toString(),
      i18nEsName: (es?.name ?? '').toString()
    });
    this.lang.set('pt');
  }

  setLang(next: 'pt' | 'en' | 'es'): void {
    this.lang.set(next);
  }

  generateIdFromName(): void {
    const name = (this.form.value.name ?? '').toString().trim();
    if (!name) return;
    const current = (this.form.value.id ?? '').toString().trim();
    if (current) return;
    this.form.patchValue({ id: slugify(name) });
  }

  createSubcategory(): void {
    const catId = (this.form.value.id ?? '').toString().trim();
    if (!catId) {
      this.error.set('Preencha o ID da categoria antes de criar subcategoria.');
      return;
    }
    void this.router.navigate(['/cardapio/categoria', catId, 'sub', 'nova']);
  }

  editSubcategory(subId: string): void {
    const catId = (this.form.value.id ?? '').toString().trim();
    if (!catId) return;
    void this.router.navigate(['/cardapio/categoria', catId, 'sub', subId]);
  }

  save(): void {
    this.error.set(null);
    this.info.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Preencha os campos obrigatórios.');
      return;
    }
    const content = this.content();
    if (!content) {
      this.error.set('Conteúdo não carregado.');
      return;
    }

    const id = (this.form.value.id ?? '').toString().trim();
    const name = (this.form.value.name ?? '').toString().trim();
    if (!id || !name) {
      this.error.set('ID e Nome são obrigatórios.');
      return;
    }

    const menu = Array.isArray(content.menu) ? [...content.menu] : [];
    const existingIdx = menu.findIndex(c => c.id === id);

    // If editing and ID was changed, ensure uniqueness
    if (!this.isNew() && this.currentCategory && this.currentCategory.id !== id) {
      if (menu.some(c => c.id === id)) {
        this.error.set('Já existe uma categoria com este ID.');
        return;
      }
    }
    // If creating new, ensure uniqueness
    if (this.isNew() && menu.some(c => c.id === id)) {
      this.error.set('Já existe uma categoria com este ID.');
      return;
    }

    const subcategories: MenuSubcategory[] = this.currentCategory?.subcategories ?? [];

    const i18n: MenuCategory['i18n'] = {};
    const enName = (this.form.value.i18nEnName ?? '').toString().trim();
    const esName = (this.form.value.i18nEsName ?? '').toString().trim();
    if (enName) i18n.en = { name: enName };
    if (esName) i18n.es = { name: esName };

    const cat: MenuCategory = {
      id,
      name,
      subcategories: Array.isArray(subcategories) ? subcategories : [],
      i18n: Object.keys(i18n).length ? i18n : undefined
    };

    if (existingIdx >= 0) {
      menu[existingIdx] = cat;
    } else {
      menu.push(cat);
    }

    const next: ContentModel = { ...content, menu };

    this.saving.set(true);
    this.api.saveContent(next).subscribe({
      next: () => {
        this.saving.set(false);
        this.info.set('Categoria salva.');
        void this.router.navigate(['/cardapio/categoria', id]);
        this.load();
      },
      error: (err: unknown) => {
        this.saving.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Falha ao salvar.');
      }
    });
  }

  remove(): void {
    this.error.set(null);
    this.info.set(null);
    if (this.isNew()) return;

    const content = this.content();
    if (!content) return;
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const menu = Array.isArray(content.menu) ? [...content.menu] : [];
    const nextMenu = menu.filter(c => c.id !== idParam);
    const next: ContentModel = { ...content, menu: nextMenu };

    this.saving.set(true);
    this.api.saveContent(next).subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/cardapio']);
      },
      error: (err: unknown) => {
        this.saving.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Falha ao remover categoria.');
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

