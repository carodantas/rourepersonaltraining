import { Component, signal, effect, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { TranslationService } from '../../../../services/translation.service';
import type { BlogCategoryId } from '../../blog.types';

type BlogArticle = {
  id: string;
  categoryId: BlogCategoryId;
  titleKey: string;
  excerptKey: string;
  date: string;
  comments: number;
  image: string;
  slug: string;
};

@Component({
  selector: 'app-articles-grid',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './articles-grid.component.html',
  styleUrl: './articles-grid.component.css'
})
export class ArticlesGridComponent {
  private translation = inject(TranslationService);
  selectedCategory = input<BlogCategoryId>('all');

  allArticles: BlogArticle[] = [
    {
      id: '1',
      categoryId: 'personal-training',
      titleKey: 'blog.articles.items.why-personal-trainers-are-worth-it.title',
      excerptKey: 'blog.articles.items.why-personal-trainers-are-worth-it.excerpt',
      date: 'August 21, 2024',
      comments: 0,
      image: 'images/why-personal-trainers-are-worth-it-card.jpg',
      slug: 'why-personal-trainers-are-worth-it'
    },
    {
      id: '2',
      categoryId: 'tips-tricks',
      titleKey: 'blog.articles.items.how-exercise-helps-to-relieve-stress.title',
      excerptKey: 'blog.articles.items.how-exercise-helps-to-relieve-stress.excerpt',
      date: 'June 29, 2023',
      comments: 0,
      image: 'images/how-exercise-helps-to-relieve-stress-card.jpg',
      slug: 'how-exercise-helps-to-relieve-stress'
    },
    {
      id: '3',
      categoryId: 'exercises',
      titleKey: 'blog.articles.items.static-stretching-vs-dynamic-stretching.title',
      excerptKey: 'blog.articles.items.static-stretching-vs-dynamic-stretching.excerpt',
      date: 'February 14, 2023',
      comments: 0,
      image: 'images/static-stretching-vs-dynamic-stretching-an-introduction-card.jpg',
      slug: 'static-stretching-vs-dynamic-stretching'
    },
    {
      id: '4',
      categoryId: 'tips-tricks',
      titleKey: 'blog.articles.items.how-much-water-should-you-drink.title',
      excerptKey: 'blog.articles.items.how-much-water-should-you-drink.excerpt',
      date: 'May 14, 2023',
      comments: 0,
      image: 'images/hydration-before-during-after-workout-card.jpg',
      slug: 'how-much-water-should-you-drink'
    },
    {
      id: '5',
      categoryId: 'exercises',
      titleKey: 'blog.articles.items.mindful-exercise-mindfulness-workouts.title',
      excerptKey: 'blog.articles.items.mindful-exercise-mindfulness-workouts.excerpt',
      date: 'January 10, 2023',
      comments: 0,
      image: 'images/mindful-exercise-workout-routine-card.jpg',
      slug: 'mindful-exercise-mindfulness-workouts'
    },
    {
      id: '6',
      categoryId: 'personal-training',
      titleKey: 'blog.articles.items.building-strength-comprehensive-guide.title',
      excerptKey: 'blog.articles.items.building-strength-comprehensive-guide.excerpt',
      date: 'December 5, 2023',
      comments: 0,
      image: 'images/fascinating-facts-about-muscles-card.jpg',
      slug: 'building-strength-comprehensive-guide'
    }
  ];

  filteredArticles = signal<BlogArticle[]>(this.allArticles);

  constructor(private router: Router) {
    // React to category changes
    effect(() => {
      const category = this.selectedCategory();
      if (category === 'all') {
        this.filteredArticles.set(this.allArticles);
      } else {
        this.filteredArticles.set(
          this.allArticles.filter(article => article.categoryId === category)
        );
      }
    });
  }

  categoryLabelKey(categoryId: BlogCategoryId): string {
    switch (categoryId) {
      case 'all':
        return 'blog.categories.all';
      case 'client-talks':
        return 'blog.categories.clientTalks';
      case 'event':
        return 'blog.categories.event';
      case 'exercises':
        return 'blog.categories.exercises';
      case 'personal-training':
        return 'blog.categories.personalTraining';
      case 'recipes':
        return 'blog.categories.recipes';
      case 'tips-tricks':
        return 'blog.categories.tipsTricks';
      case 'uncategorized':
        return 'blog.categories.uncategorized';
    }
  }

  openArticle(article: BlogArticle): void {
    // Navigate to article detail page (to be implemented)
    void this.router.navigate(['/blog', article.slug]);
  }

  formatComments(count: number): string {
    if (count === 0) return this.translation.translate('blog.comments.none');
    const word = count === 1 ? this.translation.translate('blog.comments.one') : this.translation.translate('blog.comments.many');
    return `${count} ${word}`;
  }
}

