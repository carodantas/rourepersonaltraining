import { AfterViewInit, Component, DestroyRef, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, skip } from 'rxjs';
import { TranslationService } from './services/translation.service';
import { baseCookieConfig } from './app.config';
import type { SupportedLocale } from './i18n/locales';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  private title = inject(Title);
  private translation = inject(TranslationService);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private cookieConsentInstance: any | null = null;
  private cookieConsentInitInProgress = false;
  private lastCookieLocale: SupportedLocale | null = null;

  ngOnInit(): void {
    // Set default title on app initialization
    this.title.setTitle('Roure Personal Training | Amsterdam Oost');
    
    // Page view tracking is handled automatically by AnalyticsService
    // via router NavigationEnd events, so no need to track here to avoid duplicates
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Init once on first paint, then re-init whenever locale changes.
      this.initCookieConsent();

      this.translation.localeChanges$
        .pipe(
          distinctUntilChanged(),
          skip(1), // skip the initial BehaviorSubject emission to avoid double-init at startup
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => this.initCookieConsent(true));
    }
  }

  private initCookieConsent(force = false): void {
    if (!this.isBrowser) return;

    const lib = (window as any).cookieconsent;
    if (!lib?.initialise) {
      // Script might not be ready yet (timing can differ in staging vs prod).
      // Retry a couple times without spamming init.
      if (!this.cookieConsentInitInProgress) {
        this.cookieConsentInitInProgress = true;
        let tries = 0;
        const tick = () => {
          tries += 1;
          const ready = (window as any).cookieconsent?.initialise;
          if (ready) {
            this.cookieConsentInitInProgress = false;
            this.initCookieConsent(force);
            return;
          }
          if (tries < 10) {
            setTimeout(tick, 150);
          } else {
            this.cookieConsentInitInProgress = false;
          }
        };
        setTimeout(tick, 0);
      }
      return;
    }

    const currentLocale = this.translation.locale;
    if (!force && this.lastCookieLocale === currentLocale) return;
    this.lastCookieLocale = currentLocale;

    const content = {
      message: this.translation.translate('cookieConsent.message'),
      dismiss: this.translation.translate('cookieConsent.dismiss'),
      deny: this.translation.translate('cookieConsent.deny'),
      link: this.translation.translate('cookieConsent.link'),
      href: this.translation.translate('cookieConsent.href'),
      policy: this.translation.translate('cookieConsent.policy')
    };

    // Try to destroy any existing instance before re-initializing.
    try {
      this.cookieConsentInstance?.destroy?.();
    } catch {
      // ignore
    }

    // Fallback: remove any existing injected DOM nodes to avoid stacked banners.
    try {
      document.querySelectorAll('.cc-window, .cc-revoke').forEach((el) => el.remove());
    } catch {
      // ignore
    }

    const cfg = { ...baseCookieConfig, content };
    this.cookieConsentInstance = lib.initialise(cfg);
  }
}
