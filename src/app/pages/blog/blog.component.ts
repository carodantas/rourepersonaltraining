import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightComponent } from './sections/spotlight/spotlight.component';
import { CategoryFiltersComponent } from './sections/category-filters/category-filters.component';
import { ArticlesGridComponent } from './sections/articles-grid/articles-grid.component';
import type { BlogCategoryId } from './blog.types';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    SpotlightComponent,
    CategoryFiltersComponent,
    ArticlesGridComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  selectedCategory = signal<BlogCategoryId>('all');

  onCategorySelected(category: BlogCategoryId): void {
    this.selectedCategory.set(category);
  }
}

