import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../shared/components/button-primary-glass/button-primary-glass.component';

@Component({
  selector: 'app-prenatal-postpartum',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent],
  templateUrl: './prenatal-postpartum.component.html',
  styleUrl: './prenatal-postpartum.component.css'
})
export class PrenatalPostpartumComponent {
  currentPage = 0;
  expandedTestimonials: { [key: number]: boolean } = {};

  testimonials = [
    {
      text: "I'm currently getting personal training from Carlos. Because I'm improving my fitness and want to lose weight, he's not only helping me with my workouts, but also with my nutrition. We work with a meal plan specifically designed for me. Carlos is dedicated, easily accessible (app/phone), and tailors the training plan to my personal situation (busy, mother, owning a business). During workouts, he pays attention to whether I'm performing the exercises correctly, so he constantly corrects my posture so I'm working exactly the right muscles. I used to see a physiotherapist, but because Carlos is also helping me with my injury, the physiotherapist is no longer necessary. I'm very happy I chose to train with Carlos; he really helps me focus and maintain a positive outlook.",
      author: "Aline Kiers",
      rating: 5
    },
    {
      text: "Going back to the gym after having a baby was very scary and discouraging to me, and I just didn't know where to start. After sharing my goals and expectations with Carlos, he customized the exercises accordingly. He really takes the time to teach me the techniques. He motivates, pushes, and has helped me realize that I'm stronger than I thought. Thanks Carlos for your patience and for helping me with getting my confidence back in working out. You have actually made working out fun again!",
      author: "Arlyta Wibowo",
      rating: 5
    },
    {
      text: "The trainers are super friendly. They create personalized programs that help you progress while also being mindful of your limits. They help design a nutrition plan and track muscle gain, which I found to be very motivating.",
      author: "Natalia Sanchez",
      rating: 5
    },
    {
      text: "I've been training at Roure for almost five months now, and for the first time in my life I'm seeing real progress! The sessions remain challenging, and with Niels' guidance you can definitely achieve your goals. The atmosphere is approachable (otherwise I wouldn't have kept coming back), friendly, and you receive professional advice. The coffee is good too!",
      author: "Monique Pereboom",
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
}

