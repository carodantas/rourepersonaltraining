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

  actionItems = [
    { label: 'View Plans', anchor: 'plans', showArrow: false },
    { label: 'Book Free Consultation', anchor: 'promotion', showArrow: false },
    { label: 'Start Your Journey', anchor: 'promotion', showArrow: true }
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const menuToggle = target.closest('.menu-toggle');
    const dropdownMenu = target.closest('.dropdown-menu');
    
    // Fecha o menu se clicar fora dele (exceto no botão toggle)
    if (this.isMobileMenuOpen && !menuToggle && !dropdownMenu) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Opcional: fecha o menu ao rolar a página
    // Descomente se quiser que o menu feche ao rolar
    // if (this.isMobileMenuOpen) {
    //   this.isMobileMenuOpen = false;
    // }
  }

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  onLogoError(): void {
    this.logoError = true;
  }
}

