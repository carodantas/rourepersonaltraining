export interface ContentMeta {
  version?: number;
  updatedAt?: string;
}

export interface ContentModel {
  meta?: ContentMeta;
  /**
   * Legacy (hotel example). Kept optional so unused pages still typecheck.
   */
  homeRooms?: HomeRoomCard[];
  homePackages?: HomePackageCard[];
  rooms?: Room[];
  packages?: Package[];
  menu?: MenuCategory[];

  /**
   * Blog CMS (roure).
   */
  blog?: BlogContent;
}

export interface HomeRoomCard {
  id: string;
  name: string;
  image: string;
  description?: string;
  features?: Array<{ icon?: string; text?: string }>;
}

export interface HomePackageCard {
  id: string;
  name: string;
  image: string;
  description?: string;
  features?: Array<{ text?: string }>;
}

export interface Money {
  amount: number;
}

export type SupportedLocale = 'pt' | 'en' | 'es';
export type TranslationLocale = Exclude<SupportedLocale, 'pt'>; // pt is default/base
export type I18nMap<T> = Partial<Record<TranslationLocale, Partial<T>>>;

export type IconText = string | IconTextItem;

export interface IconTextItem {
  icon: string; // FontAwesome icon name, e.g. "wifi" (render as "fa-solid fa-wifi")
  text: string;
}

export interface RoomI18nFields {
  name?: string;
  description?: string;
  view?: string;
  amenities?: IconText[];
  packageFeatures?: string[];
}

export interface Room {
  id: string;
  slug?: string;
  name: string;
  active?: boolean;
  bookingUrl?: string;
  images: string[];
  description?: string;
  guests?: number;
  area?: string;
  view?: string;
  price?: Money;
  amenities?: IconText[];
  packageFeatures?: string[];
  i18n?: I18nMap<RoomI18nFields>;
}

export interface PackageI18nFields {
  name?: string;
  description?: string;
  inclusions?: IconText[];
}

export interface Package {
  id: string;
  name: string;
  active?: boolean;
  bookingUrl?: string;
  images: string[];
  description?: string;
  nights?: number;
  inclusions?: IconText[];
  price?: Money;
  i18n?: I18nMap<PackageI18nFields>;
}

export interface MenuCategoryI18nFields {
  name?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: Money;
  active?: boolean;
  i18n?: I18nMap<{ name?: string; description?: string }>;
}

export interface MenuSubcategoryI18nFields {
  name?: string;
}

export interface MenuSubcategory {
  id: string;
  name: string;
  items: MenuItem[];
  i18n?: I18nMap<MenuSubcategoryI18nFields>;
}

export interface MenuCategory {
  id: string;
  name: string;
  subcategories: MenuSubcategory[];
  i18n?: I18nMap<MenuCategoryI18nFields>;
}

// -----------------------------
// Blog CMS model (nl base + i18n.en)
// -----------------------------

export type BlogBaseLocale = 'nl';
export type BlogTranslationLocale = 'en';
export type BlogI18nMap<T> = Partial<Record<BlogTranslationLocale, Partial<T>>>;

export interface BlogContent {
  featuredPostSlug?: string;
  categories: BlogCategory[];
  posts: BlogPost[];
}

export interface BlogCategoryI18nFields {
  name?: string;
}

export interface BlogCategory {
  id: string;
  name: string; // base (nl)
  i18n?: BlogI18nMap<BlogCategoryI18nFields>;
}

export interface BlogPostSection {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface BlogPostContentI18nFields {
  introduction?: string;
  sections?: BlogPostSection[];
  conclusion?: string;
  callToAction?: string;
}

export interface BlogPostSeoI18nFields {
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface BlogPostI18nFields {
  title?: string;
  excerpt?: string;
  content?: BlogPostContentI18nFields;
  seo?: BlogPostSeoI18nFields;
}

export interface BlogPostContent {
  introduction: string;
  sections: BlogPostSection[];
  conclusion?: string;
  callToAction?: string;
}

export interface BlogPostSeo {
  title?: string;
  description?: string;
  ogImage?: string;
}

export type BlogPostStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  slug: string;
  status: BlogPostStatus;
  publishedAt?: string;
  updatedAt?: string;
  categoryId?: string;
  tags?: string[];
  cardImage?: string;
  heroImage?: string;
  title: string; // base (nl)
  excerpt?: string; // base (nl)
  content: BlogPostContent; // base (nl)
  seo?: BlogPostSeo; // base (nl)
  i18n?: BlogI18nMap<BlogPostI18nFields>;
}
