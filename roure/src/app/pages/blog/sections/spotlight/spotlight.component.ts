import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

import { BlogService, type BlogPostCardView } from '../../../../services/blog.service';

@Component({
  selector: 'app-spotlight',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './spotlight.component.html',
  styleUrl: './spotlight.component.css'
})
export class SpotlightComponent {
  private readonly blog = inject(BlogService);
  private readonly destroyRef = inject(DestroyRef);

  readonly spotlightArticle = signal<BlogPostCardView | null>(null);
  private featuredSub: Subscription | null = null;

  constructor() {
    effect(() => {
      const locale = this.blog.localeSignal();
      this.featuredSub?.unsubscribe();
      this.featuredSub = this.blog
        .getFeaturedPost(locale)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((p) => this.spotlightArticle.set(p));
    });
  }
}

