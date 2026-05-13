import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    clarity: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly gaMeasurementId = 'G-RT9X7JZQ89';

  constructor() {
    if (this.isBrowser) {
      this.initializeRouteTracking();
    }
  }

  private initializeRouteTracking(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const pathWithSearch = this.pathWithSearch(event.urlAfterRedirects);
        // After NavigationEnd, route components may still update Title — measure on the next macrotask.
        setTimeout(() => this.sendPageView(pathWithSearch), 0);
      });
  }

  /**
   * Syncs GA4 Consent Mode with Osano cookieconsent (opt-out banner: deny revokes analytics).
   */
  applyCookieConsentStatus(status: string): void {
    if (!this.isBrowser || typeof window.gtag !== 'function') return;

    const analyticsGranted = status === 'allow' || status === 'dismiss';
    window.gtag('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied',
      ad_storage: analyticsGranted ? 'granted' : 'denied',
      ad_user_data: analyticsGranted ? 'granted' : 'denied',
      ad_personalization: analyticsGranted ? 'granted' : 'denied',
    });

    if (analyticsGranted) {
      const path = this.pathWithSearch(this.router.url);
      this.sendPageView(path);
    }
  }

  private pathWithSearch(routerUrl: string): string {
    const path = routerUrl.startsWith('/') ? routerUrl : `/${routerUrl}`;
    const search = this.document.defaultView?.location?.search ?? '';
    return search && !path.includes('?') ? `${path}${search}` : path;
  }

  private sendPageView(pagePath: string): void {
    if (!this.isBrowser || typeof window.gtag !== 'function') return;

    const loc = this.document.defaultView?.location;
    const pageLocation = loc ? `${loc.origin}${loc.pathname}${loc.search}${loc.hash}` : '';

    window.gtag('config', this.gaMeasurementId, {
      page_path: pagePath,
      page_title: this.document.title,
      ...(pageLocation ? { page_location: pageLocation } : {}),
    });
  }

  trackPageView(path: string, title?: string): void {
    if (!this.isBrowser || typeof window.gtag !== 'function') return;

    const loc = this.document.defaultView?.location;
    const pageLocation = loc ? `${loc.origin}${loc.pathname}${loc.search}${loc.hash}` : '';

    window.gtag('config', this.gaMeasurementId, {
      page_path: path,
      page_title: title ?? this.document.title,
      ...(pageLocation ? { page_location: pageLocation } : {}),
    });
  }

  trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (!this.isBrowser || typeof window.gtag !== 'function') return;

    window.gtag('event', eventName, params);
  }

  trackClick(elementName: string, location?: string): void {
    this.trackEvent('click', {
      element_name: elementName,
      location: location || (this.isBrowser ? window.location.pathname : ''),
      category: 'user_interaction',
    });
  }

  trackFormSubmit(formName: string, formData?: Record<string, unknown>): void {
    this.trackEvent('form_submit', {
      form_name: formName,
      category: 'conversion',
      ...formData,
    });
  }

  trackConversion(conversionName: string, value?: number): void {
    this.trackEvent('conversion', {
      conversion_name: conversionName,
      value,
      category: 'conversion',
    });
  }
}

