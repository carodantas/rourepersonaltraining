import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../shared/components/button-primary-glass/button-primary-glass.component';

@Component({
  selector: 'app-peak-performance',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent],
  templateUrl: './peak-performance.component.html',
  styleUrl: './peak-performance.component.css'
})
export class PeakPerformanceComponent {
  currentPage = 0;
  expandedTestimonials: { [key: number]: boolean } = {};

  testimonials = [
    {
      text: "After a period of inactivity, I trained for several months at Roure Personal Training to get back in shape. The training sessions were challenging, but thanks to the friendly and professional guidance, I enjoyed every session. The trainers really know what they're doing and gave me the confidence to continue training independently again. It's absolutely a place I'd love to return to in the future!",
      author: "Wybe-Jan van Coberen",
      rating: 5
    },
    {
      text: "Amazing experience! I can't recommend Izabela enough! I've been training with her for over a month now and the results are absolutely impressive. Izabela has an incredible amount of knowledge and designs workouts that are challenging but always achievable. I've already seen significant improvements in my strength, endurance, and overall fitness, all thanks to her personal approach. I really appreciate how she always finds a way to push me beyond what I thought I was capable of, while still keeping an eye on my limits. I leave every session not only feeling stronger, but also in a great mood! The training studio itself is fantastic, and all the other coaches are super friendly and clearly passionate about what they do. If you're looking for a knowledgeable, supportive, and truly excellent personal trainer, Izabela is the right choice. I trust her completely with my fitness journey and look forward to continuing my progress under her guidance. A real recommendation!",
      author: "Ludmila Ondarcuhu",
      rating: 5
    },
    {
      text: "I started training with Carlos some time ago, and it was one of the best decisions I've ever made for myself. He asks the right questions and encourages you to reflect on why you do things the way you do. He takes the time to observe how you move, what you can handle, and whether you have any injuries or weak spots — all of that is taken into account during training. I honestly didn't expect to see and feel progress so quickly. You're challenged to push yourself, but always in a calm and positive environment. Highly recommended for everyone!",
      author: "Chris Muru",
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
}

