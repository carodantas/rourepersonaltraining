import type { SupportedLocale } from '../locales';

export const headerTranslations: Record<SupportedLocale, Record<string, string>> = {
  nl: {
    'header.nav.home': 'Home',
    'header.nav.aboutUs': 'Over ons',
    'header.nav.methods': 'Methode',
    'header.nav.programs': "Programma's",
    'header.nav.blog': 'Blog',
    'header.actions.bookFreeIntake': 'Gratis intake boeken',
    'header.a11y.backToHome': 'Terug naar start',
    'header.a11y.toggleNavigation': 'Navigatiemenu openen/sluiten'
  },
  en: {
    'header.nav.home': 'Home',
    'header.nav.aboutUs': 'About us',
    'header.nav.methods': 'Methods',
    'header.nav.programs': 'Programs',
    'header.nav.blog': 'Blog',
    'header.actions.bookFreeIntake': 'Book free intake',
    'header.a11y.backToHome': 'Back to home',
    'header.a11y.toggleNavigation': 'Toggle navigation menu'
  }
};

