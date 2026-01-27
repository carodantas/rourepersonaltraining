import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

import { BlogService, type BlogPostCardView } from '../../../../services/blog.service';
import { TranslationService } from '../../../../services/translation.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-articles-grid',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './articles-grid.component.html',
  styleUrl: './articles-grid.component.css'
})
export class ArticlesGridComponent {
  private readonly blog = inject(BlogService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(TranslationService);

  selectedCategoryId = input<string>('all');

  readonly articles = signal<BlogPostCardView[]>([]);
  private postsSub: Subscription | null = null;

  constructor() {
    effect(() => {
      const categoryId = this.selectedCategoryId();
      const locale = this.blog.localeSignal();
      this.postsSub?.unsubscribe();
      this.postsSub = this.blog
        .getPosts(locale, { categoryId })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((posts) => this.articles.set(posts));
    });
  }

  openArticle(article: BlogPostCardView): void {
    void this.router.navigate(['/blog', article.slug]);
  }

  formatComments(count: number): string {
    if (count === 0) return this.i18n.translate('blog.noComments');
    if (count === 1) return `1 ${this.i18n.translate('blog.comment')}`;
    return `${count} ${this.i18n.translate('blog.comments')}`;
  }
}

