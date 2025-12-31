import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../shared/components/button-primary-glass/button-primary-glass.component';

@Component({
  selector: 'app-vitality-longevity',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent],
  templateUrl: './vitality-longevity.component.html',
  styleUrl: './vitality-longevity.component.css'
})
export class VitalityLongevityComponent {
  currentPage = 0;
  expandedTestimonials: { [key: number]: boolean } = {};

  testimonials = [
    {
      text: "If I could turn back time, I would have signed up for Roure Personal Training immediately when I first walked past it years ago. This studio is a real gem — a perfect mix of a warm, welcoming atmosphere and top-level professionalism. It's relaxed yet focused, friendly yet results-driven. From day one, you feel seen, supported, and inspired to grow — regardless of your level or background. When I signed up, I had absolutely no clue — I knew nothing about body composition, muscle growth, or lifting anything heavier than my phone 😅. But after six months of training with Niels, not only has my body changed, my mindset has completely transformed. I feel stronger, more confident, and genuinely excited about the journey ahead — something I never thought I'd say about fitness. Niels has a real talent for reading people — he knows when to push you to your limits and when to meet you with patience, support, and a good dose of humor. His approach is truly personal, positive, and always motivating. You never feel like \"just another client\" here. I've made real progress — physically, mentally, and emotionally. No matter how intense the session is, I always leave with a smile and renewed energy.",
      author: "Olga L",
      rating: 5
    },
    {
      text: "If I could turn back time, I would have signed up for Roure Personal Training immediately when I first walked past it years ago. This studio is a real gem — a perfect mix of a warm, welcoming atmosphere and top-level professionalism. It's relaxed yet focused, friendly yet results-driven. From day one, you feel seen, supported, and inspired to grow — regardless of your level or background. When I signed up, I had absolutely no clue — I knew nothing about body composition, muscle growth, or lifting anything heavier than my phone 😅. But after six months of training with Niels, not only has my body changed, my mindset has completely transformed. I feel stronger, more confident, and genuinely excited about the journey ahead — something I never thought I'd say about fitness. Niels has a real talent for reading people — he knows when to push you to your limits and when to meet you with patience, support, and a good dose of humor. His approach is truly personal, positive, and always motivating. You never feel like \"just another client\" here. I've made real progress — physically, mentally, and emotionally. No matter how intense the session is, I always leave with a smile and renewed energy.",
      author: "Anita Boelsums",
      rating: 5
    },
    {
      text: "I've disliked sports my entire life. But I've been training with Niels every week for two months now, and it's been really good for me. He always finds exercises that suit me well.",
      author: "Frank Smallegange",
      rating: 5
    }
  ];

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

  constructor(private router: Router) {}

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake'], {
      queryParams: { program: 'vitality-longevity' }
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
}

