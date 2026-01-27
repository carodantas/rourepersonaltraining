import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightComponent } from './sections/spotlight/spotlight.component';
import { CategoryFiltersComponent } from './sections/category-filters/category-filters.component';
import { ArticlesGridComponent } from './sections/articles-grid/articles-grid.component';

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
  selectedCategoryId = signal<string>('all');

  onCategorySelected(categoryId: string): void {
    this.selectedCategoryId.set(categoryId);
  }
}

