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
  selector: 'app-prenatal-postpartum',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent, TranslatePipe],
  templateUrl: './prenatal-postpartum.component.html',
  styleUrl: './prenatal-postpartum.component.css'
})
export class PrenatalPostpartumComponent {
  currentPage = 0;
  expandedTestimonials: { [key: number]: boolean } = {};

  testimonials: Testimonial[] = [
    {
      textKey: 'programs.prenatal.testimonials.0.text',
      author: 'Aline Kiers',
      rating: 5
    },
    {
      textKey: 'programs.prenatal.testimonials.1.text',
      author: 'Arlyta Wibowo',
      rating: 5
    },
    {
      textKey: 'programs.prenatal.testimonials.2.text',
      author: 'Natalia Sanchez',
      rating: 5
    },
    {
      textKey: 'programs.prenatal.testimonials.3.text',
      author: 'Monique Pereboom',
      rating: 5
    }
  ];

  readMoreKey = 'programs.prenatal.feedback.readMore';
  readLessKey = 'programs.prenatal.feedback.readLess';
  prevAriaKey = 'programs.prenatal.feedback.prevAria';
  nextAriaKey = 'programs.prenatal.feedback.nextAria';
  goToAriaPrefixKey = 'programs.prenatal.feedback.goToAriaPrefix';

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
      queryParams: { program: 'prenatal-postpartum' }
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

