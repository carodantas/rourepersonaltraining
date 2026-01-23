import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../shared/components/button-primary-glass/button-primary-glass.component';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { TranslationService } from '../../../services/translation.service';

type Testimonial = {
  textKey: string;
  author: string;
  rating: number;
};

@Component({
  selector: 'app-peak-performance',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent, TranslatePipe],
  templateUrl: './peak-performance.component.html',
  styleUrl: './peak-performance.component.css'
})
export class PeakPerformanceComponent {
  currentPage = 0;
  expandedTestimonials: { [key: number]: boolean } = {};

  testimonials: Testimonial[] = [
    {
      textKey: 'programs.peak.testimonials.0.text',
      author: 'Wybe-Jan van Coberen',
      rating: 5
    },
    {
      textKey: 'programs.peak.testimonials.1.text',
      author: 'Ludmila Ondarcuhu',
      rating: 5
    },
    {
      textKey: 'programs.peak.testimonials.2.text',
      author: 'Chris Muru',
      rating: 5
    }
  ];

  readMoreKey = 'programs.peak.feedback.readMore';
  readLessKey = 'programs.peak.feedback.readLess';
  prevAriaKey = 'programs.peak.feedback.prevAria';
  nextAriaKey = 'programs.peak.feedback.nextAria';
  goToAriaPrefixKey = 'programs.peak.feedback.goToAriaPrefix';

  get totalPages(): number {
    return Math.ceil(this.testimonials.length / 2);
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  get currentTestimonials() {
    const start = this.currentPage * 2;
    return this.testimonials.slice(start, start + 2);
  }

  constructor(
    private router: Router,
    private translation: TranslationService
  ) {}

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake'], {
      queryParams: { program: 'peak-performance' }
    });
  }

  goToPrograms(): void {
    void this.router.navigate(['/programs']);
  }

  nextTestimonial(): void {
    this.currentPage = (this.currentPage + 1) % this.totalPages;
  }

  prevTestimonial(): void {
    this.currentPage = (this.currentPage - 1 + this.totalPages) % this.totalPages;
  }

  goToTestimonial(page: number): void {
    this.currentPage = page;
  }

  toggleTestimonial(index: number): void {
    this.expandedTestimonials[index] = !this.expandedTestimonials[index];
  }

  isExpanded(index: number): boolean {
    return this.expandedTestimonials[index] || false;
  }

  getTestimonialIndex(pageIndex: number, itemIndex: number): number {
    return this.currentPage * 2 + itemIndex;
  }

  needsTruncation(text: string): boolean {
    // Show read more if text is longer than approximately 5 lines
    // Rough estimate: 5 lines * ~70 characters per line = 350 characters
    // This ensures consistent behavior across all testimonials
    return text.length > 350;
  }

  needsTruncationKey(key: string): boolean {
    const text = this.translation.translate(key);
    return this.needsTruncation(text);
  }
}

