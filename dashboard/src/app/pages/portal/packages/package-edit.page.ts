import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  signal
} from '@angular/core';
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
import { concatMap, finalize, from } from 'rxjs';
import { AdminApiService } from '../../../services/admin-api.service';
import { ContentModel, IconTextItem, Package, PackageI18nFields } from '../../../models/content.model';
import { slugify } from '../../../utils/slugify';
import { faIconClass, HOTEL_ICON_OPTIONS } from '../../../utils/hotel-icons';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

type InclusionGroup = FormGroup<{
  icon: FormControl<string>;
  text: FormControl<string>;
}>;

@Component({
  selector: 'app-package-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './package-edit.page.html',
  styleUrl: './package-edit.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackageEditPage {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly uploading = signal(false);
  readonly error = signal<string | null>(null);
  readonly info = signal<string | null>(null);
  readonly confirmDeleteOpen = signal(false);

  readonly openInclusionIconMenuIndex = signal<number | null>(null);
  readonly inclusionIconOptions = HOTEL_ICON_OPTIONS;
  readonly faIconClass = faIconClass;

  readonly content = signal<ContentModel | null>(null);
  readonly isNew = computed(() => this.route.snapshot.paramMap.get('id') === null);

  readonly lang = signal<'pt' | 'en' | 'es'>('pt');

  readonly form = this.fb.group({
    active: [true],
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    bookingUrl: [''],
    description: [''],
    nights: [2, [Validators.min(1)]],
    priceAmount: [0, [Validators.min(0)]],
    inclusions: this.fb.array([] as InclusionGroup[]),
    images: this.fb.array<string>([]),

    // Translations (pt is base; only en/es are allowed)
    i18nEnName: [''],
    i18nEnDescription: [''],
    i18nEnInclusionTexts: this.fb.array<string>([]),

    i18nEsName: [''],
    i18nEsDescription: [''],
    i18nEsInclusionTexts: this.fb.array<string>([])
  });

  private buildInclusion(icon = 'check', text = ''): InclusionGroup {
    return this.fb.group({
      icon: this.fb.control(icon, { nonNullable: true }),
      text: this.fb.control(text, { nonNullable: true })
    });
  }

  inclusionIconControl(c: AbstractControl): FormControl<string> {
    return c.get('icon') as FormControl<string>;
  }

  inclusionTextControl(c: AbstractControl): FormControl<string> {
    return c.get('text') as FormControl<string>;
  }

  get inclusions(): FormArray<InclusionGroup> {
    return this.form.get('inclusions') as FormArray<InclusionGroup>;
  }
  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }
  get i18nEnInclusionTexts(): FormArray {
    return this.form.get('i18nEnInclusionTexts') as FormArray;
  }
  get i18nEsInclusionTexts(): FormArray {
    return this.form.get('i18nEsInclusionTexts') as FormArray;
  }

  readonly inclusionControls = computed(() => this.inclusions.controls);
  readonly imageControls = computed(() => this.images.controls as FormControl<string>[]);
  readonly enInclusionTextControls = computed(() => this.i18nEnInclusionTexts.controls as FormControl<string>[]);
  readonly esInclusionTextControls = computed(() => this.i18nEsInclusionTexts.controls as FormControl<string>[]);

  constructor() {
    this.load();
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

        const pkg = (content.packages ?? []).find(p => p.id === idParam);
        if (!pkg) {
          this.error.set('Pacote não encontrado.');
          return;
        }
        this.fillFormFromPackage(pkg);
      },
      error: (err: unknown) => {
        this.loading.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Falha ao carregar o conteúdo.');
      }
    });
  }

  back(): void {
    void this.router.navigate(['/pacotes']);
  }

  resetForNew(): void {
    this.form.reset({
      active: true,
      id: '',
      name: '',
      bookingUrl: '',
      description: '',
      nights: 2,
      priceAmount: 0,

      i18nEnName: '',
      i18nEnDescription: '',
      i18nEsName: '',
      i18nEsDescription: ''
    });
    this.inclusions.clear();
    this.images.clear();
    this.addInclusion();

    this.i18nEnInclusionTexts.clear();
    this.i18nEsInclusionTexts.clear();
    this.lang.set('pt');
  }

  fillFormFromPackage(pkg: Package): void {
    this.form.patchValue({
      active: pkg.active ?? true,
      id: pkg.id,
      name: pkg.name,
      bookingUrl: pkg.bookingUrl ?? '',
      description: pkg.description ?? '',
      nights: pkg.nights ?? 2,
      priceAmount: pkg.price?.amount ?? 0
    });

    this.inclusions.clear();
    (pkg.inclusions ?? []).forEach(v => {
      if (typeof v === 'string') this.inclusions.push(this.buildInclusion('check', v));
      else {
        const obj = v as IconTextItem;
        this.inclusions.push(this.buildInclusion((obj.icon ?? 'check').toString(), (obj.text ?? '').toString()));
      }
    });

    this.images.clear();
    (pkg.images ?? []).forEach(v => this.images.push(this.fb.control(v)));

    const en = pkg.i18n?.en ?? null;
    const es = pkg.i18n?.es ?? null;
    this.form.patchValue({
      i18nEnName: (en?.name ?? '').toString(),
      i18nEnDescription: (en?.description ?? '').toString(),
      i18nEsName: (es?.name ?? '').toString(),
      i18nEsDescription: (es?.description ?? '').toString()
    });

    const base = this.inclusions.controls;
    const enIncl = (en?.inclusions ?? []) as IconTextItem[];
    const esIncl = (es?.inclusions ?? []) as IconTextItem[];
    this.i18nEnInclusionTexts.clear();
    this.i18nEsInclusionTexts.clear();
    base.forEach((_, idx) => {
      this.i18nEnInclusionTexts.push(this.fb.control((enIncl[idx]?.text ?? '').toString()));
      this.i18nEsInclusionTexts.push(this.fb.control((esIncl[idx]?.text ?? '').toString()));
    });

    this.lang.set('pt');
  }

  generateIdFromName(): void {
    const name = this.form.value.name ?? '';
    const id = slugify(name);
    if (!(this.form.value.id ?? '').trim()) this.form.patchValue({ id });
  }

  addInclusion(): void {
    this.inclusions.push(this.buildInclusion());
    this.i18nEnInclusionTexts.push(this.fb.control(''));
    this.i18nEsInclusionTexts.push(this.fb.control(''));
  }

  removeInclusion(idx: number): void {
    this.inclusions.removeAt(idx);
    this.i18nEnInclusionTexts.removeAt(idx);
    this.i18nEsInclusionTexts.removeAt(idx);
  }

  removeImage(idx: number): void {
    this.images.removeAt(idx);
  }

  openImagePicker(input: HTMLInputElement): void {
    input.click();
  }

  pickFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    if (!files.length) return;

    const maxBytes = 500 * 1024;
    const tooLarge = files.filter(f => f.size > maxBytes);
    const okFiles = files.filter(f => f.size > 0 && f.size <= maxBytes);

    if (tooLarge.length) {
      this.error.set(
        `Algumas imagens excedem 500KB e foram ignoradas: ${tooLarge.map(f => f.name).join(', ')}`
      );
    } else {
      this.error.set(null);
    }
    this.info.set(null);
    if (!okFiles.length) return;

    this.uploading.set(true);
    from(okFiles)
      .pipe(
        concatMap(file => this.api.upload(file)),
        finalize(() => this.uploading.set(false))
      )
      .subscribe({
        next: res => {
          this.images.push(this.fb.control(res.url));
          this.info.set('Upload concluído e imagens adicionadas.');
        },
        error: (err: unknown) => {
          const status = (err as { status?: number })?.status;
          if (status === 401) {
            this.router.navigateByUrl('/login');
            return;
          }
          this.error.set('Falha no upload.');
        }
      });
  }

  toggleInclusionIconMenu(index: number): void {
    this.openInclusionIconMenuIndex.update(v => (v === index ? null : index));
  }

  selectInclusionIcon(control: AbstractControl, icon: string): void {
    this.inclusionIconControl(control).setValue(icon);
    this.openInclusionIconMenuIndex.set(null);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.openInclusionIconMenuIndex() === null) return;
    const target = event.target as Node | null;
    if (!target) return;
    if (this.el.nativeElement.contains(target)) return;
    this.openInclusionIconMenuIndex.set(null);
  }

  setLang(next: 'pt' | 'en' | 'es'): void {
    this.lang.set(next);
  }

  inclusionIconAt(idx: number): string {
    const c = this.inclusions.at(idx);
    return this.inclusionIconControl(c).value ?? 'check';
  }

  save(): void {
    this.error.set(null);
    this.info.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Preencha os campos obrigatórios.');
      return;
    }

    const current = this.content();
    if (!current) {
      this.error.set('Conteúdo não carregado.');
      return;
    }

    const id = (this.form.value.id ?? '').trim();
    const name = (this.form.value.name ?? '').trim();
    if (!id || !name) {
      this.error.set('ID e Nome são obrigatórios.');
      return;
    }

    const bookingUrl = (this.form.value.bookingUrl ?? '').toString().trim();
    const active = this.form.value.active !== false;
    const inclusions = this.inclusions.controls
      .map(c => {
        const v = c.value as { icon?: string; text?: string };
        const text = (v?.text ?? '').toString().trim();
        const iconRaw = (v?.icon ?? '').toString().trim();
        if (!text) return null;
        const icon = iconRaw ? iconRaw : 'check';
        return { icon, text } as IconTextItem;
      })
      .filter((x): x is IconTextItem => x !== null);

    const images = this.images.controls.map(c => (c.value ?? '').toString().trim()).filter(Boolean);

    const i18n: Package['i18n'] = {};
    {
      const enName = (this.form.value.i18nEnName ?? '').toString().trim();
      const enDesc = (this.form.value.i18nEnDescription ?? '').toString().trim();
      const enInclusions: IconTextItem[] = [];
      this.inclusions.controls.forEach((c, idx) => {
        const text = (this.i18nEnInclusionTexts.at(idx)?.value ?? '').toString().trim();
        if (!text) return;
        const icon = (c.get('icon')?.value ?? 'check').toString().trim() || 'check';
        enInclusions.push({ icon, text });
      });
      const enFields: PackageI18nFields = {
        name: enName || undefined,
        description: enDesc || undefined,
        inclusions: enInclusions.length ? enInclusions : undefined
      };
      if (enName || enDesc || enInclusions.length) i18n.en = enFields;
    }
    {
      const esName = (this.form.value.i18nEsName ?? '').toString().trim();
      const esDesc = (this.form.value.i18nEsDescription ?? '').toString().trim();
      const esInclusions: IconTextItem[] = [];
      this.inclusions.controls.forEach((c, idx) => {
        const text = (this.i18nEsInclusionTexts.at(idx)?.value ?? '').toString().trim();
        if (!text) return;
        const icon = (c.get('icon')?.value ?? 'check').toString().trim() || 'check';
        esInclusions.push({ icon, text });
      });
      const esFields: PackageI18nFields = {
        name: esName || undefined,
        description: esDesc || undefined,
        inclusions: esInclusions.length ? esInclusions : undefined
      };
      if (esName || esDesc || esInclusions.length) i18n.es = esFields;
    }

    const pkg: Package = {
      id,
      name,
      active,
      bookingUrl: bookingUrl || undefined,
      description: (this.form.value.description ?? '').toString().trim(),
      nights: Number(this.form.value.nights ?? 0) || 0,
      inclusions,
      images,
      price: { amount: Number(this.form.value.priceAmount ?? 0) || 0 },
      i18n: Object.keys(i18n).length ? i18n : undefined
    };

    const existingIdx = (current.packages ?? []).findIndex(p => p.id === id);
    const next: ContentModel = { ...current, packages: [...(current.packages ?? [])] };

    if (existingIdx >= 0) next.packages![existingIdx] = pkg;
    else {
      const idClash = (current.packages ?? []).some(p => p.id === id);
      if (idClash) {
        this.error.set('Esse ID já está em uso em outro pacote.');
        return;
      }
      next.packages!.push(pkg);
    }

    // keep home highlights list in sync if ID changed
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId && routeId !== id) {
      next.homePackages = (next.homePackages ?? []).map(hp => (hp.id === routeId ? { ...hp, id } : hp));
    }

    this.saving.set(true);
    this.api.saveContent(next).subscribe({
      next: () => {
        this.saving.set(false);
        this.info.set('Salvo com sucesso.');
        void this.router.navigate(['/pacotes', id]);
      },
      error: (err: unknown) => {
        this.saving.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Falha ao salvar. Verifique os campos e tente novamente.');
      }
    });
  }

  remove(): void {
    this.error.set(null);
    this.info.set(null);
    const current = this.content();
    const routeId = this.route.snapshot.paramMap.get('id');
    if (!current || !routeId) return;

    const next: ContentModel = {
      ...current,
      packages: (current.packages ?? []).filter(p => p.id !== routeId),
      homePackages: (current.homePackages ?? []).filter(p => p.id !== routeId)
    };

    this.saving.set(true);
    this.api.saveContent(next).subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/pacotes']);
      },
      error: (err: unknown) => {
        this.saving.set(false);
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.error.set('Falha ao remover.');
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

