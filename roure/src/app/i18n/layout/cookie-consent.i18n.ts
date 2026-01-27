import type { SupportedLocale } from '../locales';

export const cookieConsentTranslations: Record<SupportedLocale, Record<string, string>> = {
  nl: {
    'cookieConsent.message': 'Deze website gebruikt cookies om ervoor te zorgen dat je de beste ervaring op onze website hebt.',
    'cookieConsent.dismiss': 'Begrepen!',
    'cookieConsent.deny': 'Cookies weigeren',
    'cookieConsent.link': 'Meer info',
    'cookieConsent.href': 'https://cookiesandyou.com',
    'cookieConsent.policy': 'Cookiebeleid'
  },
  en: {
    'cookieConsent.message': 'This website uses cookies to ensure you get the best experience on our website.',
    'cookieConsent.dismiss': 'Got it!',
    'cookieConsent.deny': 'Refuse cookies',
    'cookieConsent.link': 'Learn more',
    'cookieConsent.href': 'https://cookiesandyou.com',
    'cookieConsent.policy': 'Cookie Policy'
  }
};


