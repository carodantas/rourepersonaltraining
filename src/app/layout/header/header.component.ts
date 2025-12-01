import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navigationItems = [
    { label: 'Home', anchor: 'hero' },
    { label: 'About', anchor: 'why-us' },
    { label: 'Qualifications', anchor: 'qualifications' },
    { label: 'Services', anchor: 'plans' },
    { label: 'Testimonials', anchor: 'testimonials' },
    { label: 'FAQ', anchor: 'faq' }
  ];
  activeAnchor = 'hero';
  isMobileMenuOpen = false;
  logoError = false;

  scrollToSection(anchor: string): void {
    this.activeAnchor = anchor;
    this.isMobileMenuOpen = false; // Close mobile menu after navigation
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('window:resize')
  onResize(): void {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }

  onLogoError(): void {
    this.logoError = true;
  }
}

