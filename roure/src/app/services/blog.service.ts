import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import type { SupportedLocale } from '../i18n/locales';
import { TranslationService } from './translation.service';

// --- CMS wire format (content.json) ---

export interface CmsContentMeta {
  version?: number;
  updatedAt?: string;
}

export interface CmsContent {
  meta?: CmsContentMeta;
  blog: CmsBlog;
}

export interface CmsBlog {
  featuredPostSlug?: string;
  categories: CmsCategory[];
  posts: CmsPost[];
}

export interface CmsCategory {
  id: string;
  name: string; // base (nl)
  i18n?: {
    en?: {
      name?: string;
    };
  };
}

export interface CmsPostSection {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface CmsPostContent {
  introduction: string;
  sections: CmsPostSection[];
  conclusion?: string;
  callToAction?: string;
}

export interface CmsPost {
  id: string;
  slug: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  updatedAt?: string;
  categoryId?: string;
  tags?: string[];
  cardImage?: string;
  heroImage?: string;
  title: string;
  excerpt?: string;
  content: CmsPostContent;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  i18n?: {
    en?: {
      title?: string;
      excerpt?: string;
      content?: Partial<CmsPostContent>;
      seo?: {
        title?: string;
        description?: string;
        ogImage?: string;
      };
    };
  };
}

// --- View model used by components ---

export interface BlogPostCardView {
  id: string;
  slug: string;
  categoryId?: string;
  categoryLabel: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  comments: number;
  cardImage: string;
}

export interface BlogPostView extends BlogPostCardView {
  heroImage: string;
  content: CmsPostContent;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(TranslationService);

  // Reactive locale signal (updates when user switches language)
  readonly localeSignal = this.i18n.localeSignal;

  // Use a relative URL so it works both at "/" (prod) and "/staging/" (staging):
  // - prod:  /api/content.json
  // - stage: /staging/api/content.json
  private readonly content$ = this.http.get<CmsContent>('api/content.json').pipe(shareReplay(1));

  getContent(): Observable<CmsContent> {
    return this.content$;
  }

  getCategories(locale: SupportedLocale): Observable<Array<{ id: string; label: string }>> {
    return this.content$.pipe(
      map((c) =>
        (c.blog?.categories ?? []).map((cat) => ({
          id: cat.id,
          label: this.pickCategoryName(cat, locale),
        })),
      ),
    );
  }

  getFeaturedPost(locale: SupportedLocale): Observable<BlogPostCardView | null> {
    return this.content$.pipe(
      map((c) => {
        const slug = c.blog?.featuredPostSlug;
        if (!slug) return null;
        const post = (c.blog?.posts ?? []).find((p) => p.slug === slug) ?? null;
        if (!post) return null;
        if (post.status !== 'published') return null;
        return this.toCardView(post, c.blog?.categories ?? [], locale);
      }),
    );
  }

  getPosts(locale: SupportedLocale, opts?: { categoryId?: string }): Observable<BlogPostCardView[]> {
    const categoryId = opts?.categoryId;
    return this.content$.pipe(
      map((c) => {
        const cats = c.blog?.categories ?? [];
        let posts = (c.blog?.posts ?? []).filter((p) => p.status === 'published');
        if (categoryId && categoryId !== 'all') {
          posts = posts.filter((p) => p.categoryId === categoryId);
        }
        posts = [...posts].sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));
        return posts.map((p) => this.toCardView(p, cats, locale));
      }),
    );
  }

  getPostBySlug(locale: SupportedLocale, slug: string): Observable<BlogPostView | null> {
    return this.content$.pipe(
      map((c) => {
        const cats = c.blog?.categories ?? [];
        const post = (c.blog?.posts ?? []).find((p) => p.slug === slug) ?? null;
        if (!post) return null;
        if (post.status !== 'published') return null;
        return this.toPostView(post, cats, locale);
      }),
    );
  }

  /**
   * Convenience: uses the currently selected locale in `TranslationService`.
   * Useful when you just want "current locale" without passing it everywhere.
   */
  get locale(): SupportedLocale {
    return this.i18n.locale;
  }

  private pickCategoryName(cat: CmsCategory, locale: SupportedLocale): string {
    if (locale === 'en') return cat.i18n?.en?.name ?? cat.name ?? '';
    return cat.name ?? '';
  }

  private pickPost(post: CmsPost, locale: SupportedLocale): CmsPost {
    if (locale !== 'en') return post;
    const en = post.i18n?.en ?? {};
    const enContent = en.content ?? {};
    return {
      ...post,
      title: en.title ?? post.title,
      excerpt: en.excerpt ?? post.excerpt,
      content: {
        ...post.content,
        ...enContent,
        sections: enContent.sections ?? post.content.sections,
      },
      seo: { ...post.seo, ...(en.seo ?? {}) },
    };
  }

  private formatDateLabel(iso: string | undefined, locale: SupportedLocale): string {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    const dtfLocale = locale === 'en' ? 'en-US' : 'nl-NL';
    return new Intl.DateTimeFormat(dtfLocale, { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
  }

  private toCardView(post: CmsPost, cats: CmsCategory[], locale: SupportedLocale): BlogPostCardView {
    const p = this.pickPost(post, locale);
    const category = cats.find((c) => c.id === p.categoryId) ?? null;
    const categoryLabel = category ? this.pickCategoryName(category, locale) : this.i18n.translate('blog.uncategorized');
    const cardImage = p.cardImage ?? p.heroImage ?? 'images/sem-imagem.jpg';
    return {
      id: p.id,
      slug: p.slug,
      categoryId: p.categoryId,
      categoryLabel,
      title: p.title ?? '',
      excerpt: p.excerpt ?? '',
      dateLabel: this.formatDateLabel(p.publishedAt, locale),
      comments: 0,
      cardImage,
    };
  }

  private toPostView(post: CmsPost, cats: CmsCategory[], locale: SupportedLocale): BlogPostView {
    const p = this.pickPost(post, locale);
    const card = this.toCardView(post, cats, locale);
    return {
      ...card,
      heroImage: p.heroImage ?? p.cardImage ?? card.cardImage,
      content: p.content,
    };
  }
}

