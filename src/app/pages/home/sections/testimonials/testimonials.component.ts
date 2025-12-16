import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  currentIndex = 0;

  testimonials = [
    {
      text: "I've never felt stronger! John pushed me to my limits while providing the support I needed to succeed. Highly recommended!",
      author: "Daniele Debbians"
    },
    {
      text: "Amazing results! The personalized training plan helped me achieve my fitness goals faster than I ever imagined.",
      author: "Sarah Johnson"
    },
    {
      text: "Professional, knowledgeable, and supportive. Best personal trainer I've ever worked with!",
      author: "Michael Chen"
    }
  ];

  get currentTestimonial() {
    return this.testimonials[this.currentIndex];
  }

  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number): void {
    this.currentIndex = index;
  }
}
