export type SupportedLocale = 'nl' | 'en';

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['nl', 'en'] as const;
export const DEFAULT_LOCALE: SupportedLocale = 'nl';
export const LOCALE_STORAGE_KEY = 'roure.locale';

