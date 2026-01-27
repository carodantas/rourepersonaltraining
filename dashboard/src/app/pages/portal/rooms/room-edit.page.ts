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
import { ContentModel, IconTextItem, Room, RoomI18nFields } from '../../../models/content.model';
import { slugify } from '../../../utils/slugify';
import { faIconClass, HOTEL_ICON_OPTIONS } from '../../../utils/hotel-icons';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

type AmenityGroup = FormGroup<{
  icon: FormControl<string>;
  text: FormControl<string>;
}>;

@Component({
  selector: 'app-room-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './room-edit.page.html',
  styleUrl: './room-edit.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomEditPage {
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

  readonly openAmenityIconMenuIndex = signal<number | null>(null);
  readonly amenityIconOptions = HOTEL_ICON_OPTIONS;
  readonly faIconClass = faIconClass;

  readonly content = signal<ContentModel | null>(null);
  readonly isNew = computed(() => this.route.snapshot.paramMap.get('id') === null);

  readonly lang = signal<'pt' | 'en' | 'es'>('pt');

  readonly form = this.fb.group({
    active: [true],
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    slug: [''],
    bookingUrl: [''],
    description: [''],
    guests: [2, [Validators.min(1)]],
    area: [''],
    view: [''],
    priceAmount: [0, [Validators.min(0)]],
    amenities: this.fb.array([] as AmenityGroup[]),
    packageFeatures: this.fb.array<string>([]),
    images: this.fb.array<string>([]),

    // Translations (pt is base; only en/es are allowed)
    i18nEnName: [''],
    i18nEnDescription: [''],
    i18nEnView: [''],
    i18nEnAmenityTexts: this.fb.array<string>([]),
    i18nEnFeatureTexts: this.fb.array<string>([]),

    i18nEsName: [''],
    i18nEsDescription: [''],
    i18nEsView: [''],
    i18nEsAmenityTexts: this.fb.array<string>([]),
    i18nEsFeatureTexts: this.fb.array<string>([])
  });

  private buildAmenity(icon = 'check', text = ''): AmenityGroup {
    return this.fb.group({
      icon: this.fb.control(icon, { nonNullable: true }),
      text: this.fb.control(text, { nonNullable: true })
    });
  }

  amenityIconControl(c: AbstractControl): FormControl<string> {
    return c.get('icon') as FormControl<string>;
  }

  amenityTextControl(c: AbstractControl): FormControl<string> {
    return c.get('text') as FormControl<string>;
  }

  get amenities(): FormArray<AmenityGroup> {
    return this.form.get('amenities') as FormArray<AmenityGroup>;
  }
  get packageFeatures(): FormArray {
    return this.form.get('packageFeatures') as FormArray;
  }
  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  get i18nEnAmenityTexts(): FormArray {
    return this.form.get('i18nEnAmenityTexts') as FormArray;
  }
  get i18nEnFeatureTexts(): FormArray {
    return this.form.get('i18nEnFeatureTexts') as FormArray;
  }
  get i18nEsAmenityTexts(): FormArray {
    return this.form.get('i18nEsAmenityTexts') as FormArray;
  }
  get i18nEsFeatureTexts(): FormArray {
    return this.form.get('i18nEsFeatureTexts') as FormArray;
  }

  readonly amenityControls = computed(() => this.amenities.controls);
  readonly featureControls = computed(() => this.packageFeatures.controls as FormControl<string>[]);
  readonly imageControls = computed(() => this.images.controls as FormControl<string>[]);
  readonly enAmenityTextControls = computed(() => this.i18nEnAmenityTexts.controls as FormControl<string>[]);
  readonly enFeatureTextControls = computed(() => this.i18nEnFeatureTexts.controls as FormControl<string>[]);
  readonly esAmenityTextControls = computed(() => this.i18nEsAmenityTexts.controls as FormControl<string>[]);
  readonly esFeatureTextControls = computed(() => this.i18nEsFeatureTexts.controls as FormControl<string>[]);

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

        const room = (content.rooms ?? []).find(r => r.id === idParam);
        if (!room) {
          this.error.set('Quarto não encontrado.');
          return;
        }
        this.fillFormFromRoom(room);
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
    void this.router.navigate(['/quartos']);
  }

  resetForNew(): void {
    this.form.reset({
      active: true,
      id: '',
      name: '',
      slug: '',
      bookingUrl: '',
      description: '',
      guests: 2,
      area: '',
      view: '',
      priceAmount: 0,

      i18nEnName: '',
      i18nEnDescription: '',
      i18nEnView: '',
      i18nEnFeatureTexts: [],
      i18nEsName: '',
      i18nEsDescription: '',
      i18nEsView: '',
      i18nEsFeatureTexts: []
    });
    this.amenities.clear();
    this.packageFeatures.clear();
    this.images.clear();
    this.addAmenity();
    this.addFeature();

    this.i18nEnAmenityTexts.clear();
    this.i18nEnFeatureTexts.clear();
    this.i18nEsAmenityTexts.clear();
    this.i18nEsFeatureTexts.clear();
    this.lang.set('pt');
  }

  fillFormFromRoom(room: Room): void {
    this.form.patchValue({
      active: room.active ?? true,
      id: room.id,
      name: room.name,
      slug: room.slug ?? '',
      bookingUrl: room.bookingUrl ?? '',
      description: room.description ?? '',
      guests: room.guests ?? 2,
      area: room.area ?? '',
      view: room.view ?? '',
      priceAmount: room.price?.amount ?? 0
    });

    this.amenities.clear();
    (room.amenities ?? []).forEach(v => {
      if (typeof v === 'string') this.amenities.push(this.buildAmenity('check', v));
      else {
        const obj = v as IconTextItem;
        this.amenities.push(this.buildAmenity((obj.icon ?? 'check').toString(), (obj.text ?? '').toString()));
      }
    });

    this.packageFeatures.clear();
    (room.packageFeatures ?? []).forEach(v => this.packageFeatures.push(this.fb.control(v)));

    this.images.clear();
    (room.images ?? []).forEach(v => this.images.push(this.fb.control(v)));

    // i18n
    const en = room.i18n?.en ?? null;
    const es = room.i18n?.es ?? null;

    this.form.patchValue({
      i18nEnName: (en?.name ?? '').toString(),
      i18nEnDescription: (en?.description ?? '').toString(),
      i18nEnView: (en?.view ?? '').toString(),
      i18nEsName: (es?.name ?? '').toString(),
      i18nEsDescription: (es?.description ?? '').toString(),
      i18nEsView: (es?.view ?? '').toString()
    });

    const baseAmenities = this.amenities.controls;
    const enAmenities = (en?.amenities ?? []) as IconTextItem[];
    const esAmenities = (es?.amenities ?? []) as IconTextItem[];
    this.i18nEnAmenityTexts.clear();
    this.i18nEsAmenityTexts.clear();
    baseAmenities.forEach((_, idx) => {
      const tEn = (enAmenities[idx]?.text ?? '').toString();
      const tEs = (esAmenities[idx]?.text ?? '').toString();
      this.i18nEnAmenityTexts.push(this.fb.control(tEn));
      this.i18nEsAmenityTexts.push(this.fb.control(tEs));
    });

    const baseFeatures = this.packageFeatures.controls as FormControl<string>[];
    const enFeatures = (en?.packageFeatures ?? []) as string[];
    const esFeatures = (es?.packageFeatures ?? []) as string[];
    this.i18nEnFeatureTexts.clear();
    this.i18nEsFeatureTexts.clear();
    baseFeatures.forEach((_, idx) => {
      this.i18nEnFeatureTexts.push(this.fb.control((enFeatures[idx] ?? '').toString()));
      this.i18nEsFeatureTexts.push(this.fb.control((esFeatures[idx] ?? '').toString()));
    });

    this.lang.set('pt');
  }

  setLang(next: 'pt' | 'en' | 'es'): void {
    this.lang.set(next);
  }

  amenityIconAt(idx: number): string {
    const c = this.amenities.at(idx);
    return this.amenityIconControl(c).value ?? 'check';
  }

  generateIdAndSlugFromName(): void {
    const name = this.form.value.name ?? '';
    const s = slugify(name);
    if (!(this.form.value.id ?? '').trim()) this.form.patchValue({ id: s });
    if (!(this.form.value.slug ?? '').trim()) this.form.patchValue({ slug: s });
  }

  addAmenity(): void {
    this.amenities.push(this.buildAmenity());
    this.i18nEnAmenityTexts.push(this.fb.control(''));
    this.i18nEsAmenityTexts.push(this.fb.control(''));
  }

  removeAmenity(idx: number): void {
    this.amenities.removeAt(idx);
    this.i18nEnAmenityTexts.removeAt(idx);
    this.i18nEsAmenityTexts.removeAt(idx);
  }

  addFeature(): void {
    this.packageFeatures.push(this.fb.control(''));
    this.i18nEnFeatureTexts.push(this.fb.control(''));
    this.i18nEsFeatureTexts.push(this.fb.control(''));
  }

  removeFeature(idx: number): void {
    this.packageFeatures.removeAt(idx);
    this.i18nEnFeatureTexts.removeAt(idx);
    this.i18nEsFeatureTexts.removeAt(idx);
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

  toggleAmenityIconMenu(index: number): void {
    this.openAmenityIconMenuIndex.update(v => (v === index ? null : index));
  }

  selectAmenityIcon(control: AbstractControl, icon: string): void {
    (control.get('icon') as FormControl<string>).setValue(icon);
    this.openAmenityIconMenuIndex.set(null);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.openAmenityIconMenuIndex() === null) return;
    const target = event.target as Node | null;
    if (!target) return;
    if (this.el.nativeElement.contains(target)) return;
    this.openAmenityIconMenuIndex.set(null);
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

    const slug = (this.form.value.slug ?? '').toString().trim() || slugify(name);
    const bookingUrl = (this.form.value.bookingUrl ?? '').toString().trim();
    const active = this.form.value.active !== false;

    const amenities = this.amenities.controls
      .map(c => {
        const v = c.value as { icon?: string; text?: string };
        const text = (v?.text ?? '').toString().trim();
        const iconRaw = (v?.icon ?? '').toString().trim();
        if (!text) return null;
        const icon = iconRaw ? iconRaw : 'check';
        return { icon, text } as IconTextItem;
      })
      .filter((x): x is IconTextItem => x !== null);

    const features = this.packageFeatures.controls.map(c => (c.value ?? '').toString().trim()).filter(Boolean);
    const images = this.images.controls.map(c => (c.value ?? '').toString().trim()).filter(Boolean);

    const i18n: Room['i18n'] = {};
    {
      const enName = (this.form.value.i18nEnName ?? '').toString().trim();
      const enDesc = (this.form.value.i18nEnDescription ?? '').toString().trim();
      const enView = (this.form.value.i18nEnView ?? '').toString().trim();
      const enAmenities: IconTextItem[] = [];
      this.amenities.controls.forEach((c, idx) => {
        const text = (this.i18nEnAmenityTexts.at(idx)?.value ?? '').toString().trim();
        if (!text) return;
        const icon = (c.get('icon')?.value ?? 'check').toString().trim() || 'check';
        enAmenities.push({ icon, text });
      });
      const enFeatures = this.i18nEnFeatureTexts.controls.map(c => (c.value ?? '').toString().trim()).filter(Boolean);
      const enFields: RoomI18nFields = {
        name: enName || undefined,
        description: enDesc || undefined,
        view: enView || undefined,
        amenities: enAmenities.length ? enAmenities : undefined,
        packageFeatures: enFeatures.length ? enFeatures : undefined
      };
      if (enName || enDesc || enView || enAmenities.length || enFeatures.length) i18n.en = enFields;
    }
    {
      const esName = (this.form.value.i18nEsName ?? '').toString().trim();
      const esDesc = (this.form.value.i18nEsDescription ?? '').toString().trim();
      const esView = (this.form.value.i18nEsView ?? '').toString().trim();
      const esAmenities: IconTextItem[] = [];
      this.amenities.controls.forEach((c, idx) => {
        const text = (this.i18nEsAmenityTexts.at(idx)?.value ?? '').toString().trim();
        if (!text) return;
        const icon = (c.get('icon')?.value ?? 'check').toString().trim() || 'check';
        esAmenities.push({ icon, text });
      });
      const esFeatures = this.i18nEsFeatureTexts.controls.map(c => (c.value ?? '').toString().trim()).filter(Boolean);
      const esFields: RoomI18nFields = {
        name: esName || undefined,
        description: esDesc || undefined,
        view: esView || undefined,
        amenities: esAmenities.length ? esAmenities : undefined,
        packageFeatures: esFeatures.length ? esFeatures : undefined
      };
      if (esName || esDesc || esView || esAmenities.length || esFeatures.length) i18n.es = esFields;
    }

    const room: Room = {
      id,
      slug,
      name,
      active,
      bookingUrl: bookingUrl || undefined,
      description: (this.form.value.description ?? '').toString().trim(),
      guests: Number(this.form.value.guests ?? 0) || 0,
      area: (this.form.value.area ?? '').toString().trim(),
      view: (this.form.value.view ?? '').toString().trim(),
      price: { amount: Number(this.form.value.priceAmount ?? 0) || 0 },
      amenities,
      packageFeatures: features,
      images,
      i18n: Object.keys(i18n).length ? i18n : undefined
    };

    const existingIdx = (current.rooms ?? []).findIndex(r => r.id === id);
    const next: ContentModel = { ...current, rooms: [...(current.rooms ?? [])] };

    if (existingIdx >= 0) next.rooms![existingIdx] = room;
    else {
      const idClash = (current.rooms ?? []).some(r => r.id === id);
      if (idClash) {
        this.error.set('Esse ID já está em uso em outro quarto.');
        return;
      }
      next.rooms!.push(room);
    }

    // Keep highlights list in sync if ID changed (edit existing by route param)
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId && routeId !== id) {
      next.homeRooms = (next.homeRooms ?? []).map(hr => (hr.id === routeId ? { ...hr, id } : hr));
    }

    this.saving.set(true);
    this.api.saveContent(next).subscribe({
      next: () => {
        this.saving.set(false);
        this.info.set('Salvo com sucesso.');
        // Navigate to canonical edit URL (handles new + id changes)
        void this.router.navigate(['/quartos', id]);
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
      rooms: (current.rooms ?? []).filter(r => r.id !== routeId),
      homeRooms: (current.homeRooms ?? []).filter(r => r.id !== routeId)
    };

    this.saving.set(true);
    this.api.saveContent(next).subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/quartos']);
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

