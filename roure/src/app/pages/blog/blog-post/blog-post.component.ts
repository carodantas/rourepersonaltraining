import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';

import { BlogService, type BlogPostView } from '../../../services/blog.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blog = inject(BlogService);
  private readonly destroyRef = inject(DestroyRef);

  slug: string | null = null;
  article: BlogPostView | null = null;

  constructor() {
    const locale$ = toObservable(this.blog.localeSignal);

    combineLatest([this.route.paramMap, this.route.queryParamMap, locale$])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(([params, query, locale]) => {
          this.slug = params.get('slug');
          const previewToken = query.get('preview');
          if (!this.slug) return of(null);
          if (previewToken) {
            return this.blog.getPreviewPostByToken(locale, previewToken);
          }
          return this.blog.getPostBySlug(locale, this.slug);
        })
      )
      .subscribe((post) => {
        this.article = post;
        if (this.slug && !post) {
          void this.router.navigate(['/blog']);
      }
    });
  }
}

