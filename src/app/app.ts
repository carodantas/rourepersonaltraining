import { AfterViewInit, Component, DestroyRef, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from './services/translation.service';
import { baseCookieConfig } from './app.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  private title = inject(Title);
  private ccService = inject(NgcCookieConsentService);
  private translation = inject(TranslationService);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private cookieConsentInstance: any | null = null;

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
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.initCookieConsent());
    }
  }

  private initCookieConsent(): void {
    if (!this.isBrowser) return;

    const lib = (window as any).cookieconsent;
    if (!lib?.initialise) return;

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

    // Also try to destroy via ngx service if available (type-safe via any).
    try {
      (this.ccService as any)?.destroy?.();
    } catch {
      // ignore
    }

    const cfg = { ...baseCookieConfig, content };
    this.cookieConsentInstance = lib.initialise(cfg);
  }
}
