import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import type { BlogCategoryId } from '../../blog.types';

@Component({
  selector: 'app-spotlight',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './spotlight.component.html',
  styleUrl: './spotlight.component.css'
})
export class SpotlightComponent {
  spotlightArticle = {
    categoryId: 'personal-training' as BlogCategoryId,
    titleKey: 'blog.articles.items.why-personal-trainers-are-worth-it.title',
    date: 'August 21, 2024',
    image: 'images/why-personal-trainers-are-worth-it.png',
    slug: 'why-personal-trainers-are-worth-it'
  };

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
}

