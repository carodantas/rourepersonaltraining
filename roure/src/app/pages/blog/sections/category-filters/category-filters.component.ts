import { Component, DestroyRef, effect, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../../services/blog.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.css'
})
export class CategoryFiltersComponent {
  private readonly blog = inject(BlogService);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = signal<Array<{ id: string; label: string }>>([{ id: 'all', label: '' }]);

  selectedCategoryId = signal<string>('all');
  categorySelected = output<string>();

  private categoriesSub: Subscription | null = null;

  constructor() {
    effect(() => {
      const locale = this.blog.localeSignal();
      this.categoriesSub?.unsubscribe();
      this.categoriesSub = this.blog
        .getCategories(locale)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((cats) => {
          this.categories.set([{ id: 'all', label: '' }, ...cats]);
        });
    });
  }

  selectCategory(categoryId: string): void {
    this.selectedCategoryId.set(categoryId);
    this.categorySelected.emit(categoryId);
  }
}

