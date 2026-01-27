import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';
import { ContentModel, MenuCategory, MenuItem, MenuSubcategory } from '../../../models/content.model';
import { slugify } from '../../../utils/slugify';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

type MenuItemGroup = FormGroup<{
  active: FormControl<boolean>;
  id: FormControl<string>;
  name: FormControl<string>;
  priceAmount: FormControl<number>;
  description: FormControl<string>;
  i18nEnName: FormControl<string>;
  i18nEnDescription: FormControl<string>;
  i18nEsName: FormControl<string>;
  i18nEsDescription: FormControl<string>;
}>;

@Component({
  selector: 'app-menu-subcategory-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './menu-subcategory-edit.page.html',
  styleUrl: './menu-subcategory-edit.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuSubcategoryEditPage {
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
  readonly isNew = computed(() => this.route.snapshot.paramMap.get('subId') === null);

  readonly categoryId = computed(() => this.route.snapshot.paramMap.get('id') ?? '');
  readonly subId = computed(() => this.route.snapshot.paramMap.get('subId'));

  readonly category = signal<MenuCategory | null>(null);
  readonly subcategory = signal<MenuSubcategory | null>(null);

  readonly lang = signal<'pt' | 'en' | 'es'>('pt');

  readonly form = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    i18nEnName: [''],
    i18nEsName: [''],
    items: this.fb.array<MenuItemGroup>([])
  });

  constructor() {
    this.load();
  }

  get items(): FormArray<MenuItemGroup> {
    return this.form.get('items') as FormArray<MenuItemGroup>;
  }

  private buildItem(active = true, id = '', name = '', priceAmount = 0, description = ''): MenuItemGroup {
    return this.fb.group({
      active: this.fb.control(active, { nonNullable: true }),
      id: this.fb.control(id, { nonNullable: true, validators: [Validators.required] }),
      name: this.fb.control(name, { nonNullable: true, validators: [Validators.required] }),
      priceAmount: this.fb.control(priceAmount, { nonNullable: true, validators: [Validators.min(0)] }),
      description: this.fb.control(description, { nonNullable: true }),

      // i18n (pt is base; only en/es are allowed)
      i18nEnName: this.fb.control('', { nonNullable: true }),
      i18nEnDescription: this.fb.control('', { nonNullable: true }),
      i18nEsName: this.fb.control('', { nonNullable: true }),
      i18nEsDescription: this.fb.control('', { nonNullable: true })
    });
  }

  itemNameControl(c: AbstractControl): FormControl<string> {
    return c.get('name') as FormControl<string>;
  }

  itemIdControl(c: AbstractControl): FormControl<string> {
    return c.get('id') as FormControl<string>;
  }

  back(): void {
    const catId = this.categoryId();
    void this.router.navigate(['/cardapio/categoria', catId]);
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.info.set(null);

    const catId = this.categoryId();
    const subId = this.subId();
    this.api.getContent().subscribe({
      next: content => {
        this.loading.set(false);
        this.content.set(content);

        const cat = (content.menu ?? []).find(c => c.id === catId) ?? null;
        if (!cat) {
          this.error.set('Categoria não encontrada.');
          return;
        }
        this.category.set(cat);

        if (!subId) {
          this.subcategory.set(null);
          this.resetForNew();
          return;
        }

        const sub = (cat.subcategories ?? []).find(s => s.id === subId) ?? null;
        if (!sub) {
          this.error.set('Subcategoria não encontrada.');
          return;
        }
        this.subcategory.set(sub);
        this.fillForm(sub);
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
    this.form.reset({ id: '', name: '', i18nEnName: '', i18nEsName: '' });
    this.items.clear();
    this.lang.set('pt');
  }

  fillForm(sub: MenuSubcategory): void {
    this.form.patchValue({ id: sub.id, name: sub.name });
    const en = sub.i18n?.en ?? null;
    const es = sub.i18n?.es ?? null;
    this.form.patchValue({
      i18nEnName: (en?.name ?? '').toString(),
      i18nEsName: (es?.name ?? '').toString()
    });
    this.lang.set('pt');

    this.items.clear();
    for (const it of sub.items ?? []) {
      const itEn = it.i18n?.en ?? null;
      const itEs = it.i18n?.es ?? null;
      const g = this.buildItem(
        it.active !== false,
        it.id ?? '',
        it.name ?? '',
        it.price?.amount ?? 0,
        it.description ?? ''
      );
      g.patchValue({
        i18nEnName: (itEn?.name ?? '').toString(),
        i18nEnDescription: (itEn?.description ?? '').toString(),
        i18nEsName: (itEs?.name ?? '').toString(),
        i18nEsDescription: (itEs?.description ?? '').toString()
      });
      this.items.push(g);
    }
  }
 
  setLang(next: 'pt' | 'en' | 'es'): void {
    this.lang.set(next);
  }

  generateSubIdFromName(): void {
    const name = (this.form.value.name ?? '').toString().trim();
    if (!name) return;
    const current = (this.form.value.id ?? '').toString().trim();
    if (current) return;
    this.form.patchValue({ id: slugify(name) });
  }

  addItem(): void {
    this.items.push(this.buildItem(true, '', '', 0, ''));
  }

  removeItem(idx: number): void {
    this.items.removeAt(idx);
  }

  generateItemIdFromName(c: AbstractControl): void {
    const name = (this.itemNameControl(c).value ?? '').toString().trim();
    if (!name) return;
    const current = (this.itemIdControl(c).value ?? '').toString().trim();
    if (current) return;
    this.itemIdControl(c).setValue(slugify(name));
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

    const catId = this.categoryId();
    const cat = (content.menu ?? []).find(c => c.id === catId) ?? null;
    if (!cat) {
      this.error.set('Categoria não encontrada.');
      return;
    }

    const subId = (this.form.value.id ?? '').toString().trim();
    const name = (this.form.value.name ?? '').toString().trim();
    if (!subId || !name) {
      this.error.set('ID e Nome são obrigatórios.');
      return;
    }

    const items: MenuItem[] = this.items.controls.map(ctrl => {
      const v = ctrl.getRawValue();
      const i18n: MenuItem['i18n'] = {};
      const enName = (v.i18nEnName ?? '').toString().trim();
      const enDesc = (v.i18nEnDescription ?? '').toString().trim();
      const esName = (v.i18nEsName ?? '').toString().trim();
      const esDesc = (v.i18nEsDescription ?? '').toString().trim();
      if (enName || enDesc) i18n.en = { name: enName || undefined, description: enDesc || undefined };
      if (esName || esDesc) i18n.es = { name: esName || undefined, description: esDesc || undefined };
      return {
        id: v.id.trim(),
        name: v.name.trim(),
        description: v.description.trim() || undefined,
        active: v.active !== false,
        price: { amount: Number(v.priceAmount ?? 0) || 0 },
        i18n: Object.keys(i18n).length ? i18n : undefined
      };
    });

    // enforce unique item IDs
    const seen = new Set<string>();
    for (const it of items) {
      if (!it.id) {
        this.error.set('Todo item precisa de ID.');
        return;
      }
      if (seen.has(it.id)) {
        this.error.set(`ID de item duplicado: "${it.id}".`);
        return;
      }
      seen.add(it.id);
    }

    const subI18n: MenuSubcategory['i18n'] = {};
    const enName = (this.form.value.i18nEnName ?? '').toString().trim();
    const esName = (this.form.value.i18nEsName ?? '').toString().trim();
    if (enName) subI18n.en = { name: enName };
    if (esName) subI18n.es = { name: esName };
    const sub: MenuSubcategory = {
      id: subId,
      name,
      items,
      i18n: Object.keys(subI18n).length ? subI18n : undefined
    };

    const menu = Array.isArray(content.menu) ? [...content.menu] : [];
    const catIdx = menu.findIndex(c => c.id === catId);
    const catCopy: MenuCategory = { ...cat, subcategories: Array.isArray(cat.subcategories) ? [...cat.subcategories] : [] };

    const existingIdx = catCopy.subcategories.findIndex(s => s.id === (this.subId() ?? subId));
    if (this.isNew()) {
      if (catCopy.subcategories.some(s => s.id === subId)) {
        this.error.set('Já existe uma subcategoria com este ID nesta categoria.');
        return;
      }
      catCopy.subcategories.push(sub);
    } else {
      // editing: allow ID change but keep uniqueness
      const originalId = this.subId()!;
      if (originalId !== subId && catCopy.subcategories.some(s => s.id === subId)) {
        this.error.set('Já existe uma subcategoria com este ID nesta categoria.');
        return;
      }
      if (existingIdx >= 0) catCopy.subcategories[existingIdx] = sub;
      else catCopy.subcategories.push(sub);
    }

    if (catIdx >= 0) menu[catIdx] = catCopy;
    const next: ContentModel = { ...content, menu };

    this.saving.set(true);
    this.api.saveContent(next).subscribe({
      next: () => {
        this.saving.set(false);
        this.info.set('Subcategoria salva.');
        void this.router.navigate(['/cardapio/categoria', catId, 'sub', subId]);
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
    const catId = this.categoryId();
    const subId = this.subId();
    if (!subId) return;

    const menu = Array.isArray(content.menu) ? [...content.menu] : [];
    const catIdx = menu.findIndex(c => c.id === catId);
    if (catIdx < 0) return;

    const cat = menu[catIdx];
    const nextCat: MenuCategory = {
      ...cat,
      subcategories: (cat.subcategories ?? []).filter(s => s.id !== subId)
    };
    menu[catIdx] = nextCat;

    const next: ContentModel = { ...content, menu };
    this.saving.set(true);
    this.api.saveContent(next).subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/cardapio/categoria', catId]);
      },
      error: (err: unknown) => {
        this.saving.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Falha ao remover subcategoria.');
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

