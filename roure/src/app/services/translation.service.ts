import { Injectable, signal } from '@angular/core';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type SupportedLocale } from '../i18n/locales';
import { headerTranslations } from '../i18n/layout/header.i18n';
import { blogTranslations } from '../i18n/pages/blog.i18n';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly localeSignal = signal<SupportedLocale>(DEFAULT_LOCALE);

  private readonly dictionaries: Array<Record<SupportedLocale, Record<string, string>>> = [
    headerTranslations,
    blogTranslations
  ];

  constructor() {
    this.localeSignal.set(this.readPersistedLocale() ?? DEFAULT_LOCALE);
  }

  get locale(): SupportedLocale {
    return this.localeSignal();
  }

  setLocale(locale: SupportedLocale): void {
    if (this.localeSignal() === locale) return;
    this.localeSignal.set(locale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }

  translate(key: string): string {
    // Try current locale first, then fallback to default locale.
    const current = this.lookup(this.localeSignal(), key);
    if (current != null) return current;

    const fallback = this.lookup(DEFAULT_LOCALE, key);
    if (fallback != null) return fallback;

    return key;
  }

  private lookup(locale: SupportedLocale, key: string): string | null {
    for (const dict of this.dictionaries) {
      const value = dict[locale]?.[key];
      if (typeof value === 'string') return value;
    }
    return null;
  }

  private readPersistedLocale(): SupportedLocale | null {
    // SSR-safe: localStorage not available on the server.
    try {
      const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (raw === 'nl' || raw === 'en') return raw;
      return null;
    } catch {
      return null;
    }
  }
}

