import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import type { BlogCategory, BlogCategoryId } from '../../blog.types';

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.css'
})
export class CategoryFiltersComponent {
  categories: BlogCategory[] = [
    { id: 'all', labelKey: 'blog.categories.all' },
    { id: 'client-talks', labelKey: 'blog.categories.clientTalks' },
    { id: 'event', labelKey: 'blog.categories.event' },
    { id: 'exercises', labelKey: 'blog.categories.exercises' },
    { id: 'personal-training', labelKey: 'blog.categories.personalTraining' },
    { id: 'recipes', labelKey: 'blog.categories.recipes' },
    { id: 'tips-tricks', labelKey: 'blog.categories.tipsTricks' },
    { id: 'uncategorized', labelKey: 'blog.categories.uncategorized' }
  ];

  selectedCategory = signal<BlogCategoryId>('all');
  categorySelected = output<BlogCategoryId>();

  selectCategory(category: BlogCategoryId): void {
    this.selectedCategory.set(category);
    this.categorySelected.emit(category);
  }
}

