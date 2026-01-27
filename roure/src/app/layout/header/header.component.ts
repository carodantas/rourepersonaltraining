import { Component, DestroyRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';
import type { SupportedLocale } from '../../i18n/locales';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private pendingScrollAnchor: string | null = null;
  private readonly translation = inject(TranslationService);

  private readonly routeByAnchor: Record<string, string> = {
    home: '/',
    'about-us': '/about-us',
    methods: '/methods',
    blog: '/blog',
    programs: '/programs',
    'free-intake': '/free-intake'
  };

  navigationItems = [
    { labelKey: 'header.nav.home', anchor: 'home' },
    { labelKey: 'header.nav.aboutUs', anchor: 'about-us' },
    { labelKey: 'header.nav.methods', anchor: 'methods' },
    { labelKey: 'header.nav.programs', anchor: 'programs' },
    { labelKey: 'header.nav.blog', anchor: 'blog' }
  ];

  actionItems = [
    { labelKey: 'header.actions.bookFreeIntake', anchor: 'free-intake', showArrow: false }
  ];

  activeAnchor = 'home';
  isMobileMenuOpen = false;
  logoError = false;

  get currentLocale(): SupportedLocale {
    return this.translation.locale;
  }

  setLocale(locale: SupportedLocale): void {
    this.translation.setLocale(locale);
  }

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        if (this.pendingScrollAnchor) {
          const anchor = this.pendingScrollAnchor;
          this.pendingScrollAnchor = null;
          this.deferScrollToAnchor(anchor);
        }
      });
  }

  scrollToSection(anchor: string): void {
    this.activeAnchor = anchor;
    this.isMobileMenuOpen = false; // Close mobile menu after navigation

    // Todos os links do dropdown são páginas/rotas.
    const route = this.routeByAnchor[anchor];
    if (route) {
      void this.router.navigate([route]);
      return;
    }
  }

  private deferScrollToAnchor(anchor: string): void {
    // dá um tick pro Angular atualizar o DOM antes de tentar pegar o elemento
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
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

