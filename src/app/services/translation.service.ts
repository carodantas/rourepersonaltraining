import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type SupportedLocale } from '../i18n/locales';
import { headerTranslations } from '../i18n/layout/header.i18n';
import { footerTranslations } from '../i18n/layout/footer.i18n';
import { homeTranslations } from '../i18n/pages/home.i18n';
import { cookieConsentTranslations } from '../i18n/layout/cookie-consent.i18n';
import { aboutUsTranslations } from '../i18n/pages/about-us.i18n';
import { methodsTranslations } from '../i18n/pages/methods.i18n';
import { programsTranslations } from '../i18n/pages/programs.i18n';
import { blogTranslations } from '../i18n/pages/blog.i18n';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private _locale: SupportedLocale = DEFAULT_LOCALE;
  private readonly _localeChanges$ = new BehaviorSubject<SupportedLocale>(DEFAULT_LOCALE);

  private readonly dictionaries: Array<Record<SupportedLocale, Record<string, string>>> = [
    headerTranslations,
    footerTranslations,
    homeTranslations,
    cookieConsentTranslations,
    aboutUsTranslations,
    methodsTranslations,
    programsTranslations,
    blogTranslations
  ];

  constructor() {
    this._locale = this.readPersistedLocale() ?? DEFAULT_LOCALE;
    this._localeChanges$.next(this._locale);
  }

  get locale(): SupportedLocale {
    return this._locale;
  }

  get localeChanges$() {
    return this._localeChanges$.asObservable();
  }

  setLocale(locale: SupportedLocale): void {
    if (this._locale === locale) return;
    this._locale = locale;
    this._localeChanges$.next(locale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }

  translate(key: string): string {
    // Try current locale first, then fallback to default locale.
    const current = this.lookup(this._locale, key);
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

