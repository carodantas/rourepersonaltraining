import { Component, inject, OnInit, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  private title = inject(Title);
  private ccService = inject(NgcCookieConsentService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    // Set default title on app initialization
    this.title.setTitle('Roure Personal Training | Amsterdam Oost');
    
    // Page view tracking is handled automatically by AnalyticsService
    // via router NavigationEnd events, so no need to track here to avoid duplicates
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Wait for cookieconsent library to be available
      setTimeout(() => {
        // Check if cookieconsent library is loaded
        const cookieConsentLib = (window as any).cookieconsent;
        console.log('Cookie consent library available:', !!cookieConsentLib);
        console.log('Cookie consent service:', this.ccService);
        
        // Check if consent cookie exists
        const consentCookie = localStorage.getItem('cookieconsent_status');
        console.log('Consent cookie:', consentCookie);
        
        // Try to manually initialize if needed
        if (cookieConsentLib && !consentCookie) {
          console.log('Attempting to show cookie consent banner...');
        }
      }, 1000);
    }
  }
}
