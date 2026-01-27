import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    clarity: (...args: any[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private gaMeasurementId = 'G-RT9X7JZQ89';

  constructor() {
    if (this.isBrowser) {
      this.initializeRouteTracking();
    }
  }

  private initializeRouteTracking(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  trackPageView(path: string, title?: string): void {
    if (!this.isBrowser || !window.gtag) return;

    window.gtag('config', this.gaMeasurementId, {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }

  trackEvent(eventName: string, params?: Record<string, any>): void {
    if (!this.isBrowser || !window.gtag) return;

    window.gtag('event', eventName, params);
  }

  trackClick(elementName: string, location?: string): void {
    this.trackEvent('click', {
      element_name: elementName,
      location: location || (this.isBrowser ? window.location.pathname : ''),
      category: 'user_interaction',
    });
  }

  trackFormSubmit(formName: string, formData?: Record<string, any>): void {
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

