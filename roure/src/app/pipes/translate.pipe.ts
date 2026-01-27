import { ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private readonly translation = inject(TranslationService);
  private readonly cdr = inject(ChangeDetectorRef);
  private currentLocale = '';

  transform(key: string): string {
    const newLocale = this.translation.locale;
    if (newLocale !== this.currentLocale) {
      this.currentLocale = newLocale;
      this.cdr.markForCheck();
    }

    return this.translation.translate(key);
  }

  ngOnDestroy(): void {}
}

