import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.css'
})
export class CategoryFiltersComponent {
  categories = [
    'All Articles',
    'Client talks',
    'Event',
    'Exercises',
    'Personal Training',
    'Recipes',
    'Tips & Tricks',
    'Uncategorized'
  ];

  selectedCategory = signal<string>('All Articles');
  categorySelected = output<string>();

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.categorySelected.emit(category);
  }
}

