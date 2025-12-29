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
  currentIndex = 0;
  expandedTestimonials: { [key: string]: boolean } = {
    'jeroen': false,
    'reza': false
  };

  testimonials = [
    {
      id: 'jeroen',
      name: 'Jeroen Marré',
      rating: 5,
      text: "I recently started training at Roure Personal Training, and what a difference it has made! Even though I've been used to personal coaching for over 10 years, from my very first session I experienced a completely new level of professionalism and effectiveness.",
      expandedText: [
        "Izabella, my regular trainer, quickly identified where my weak points were and how to push my limits. In a short amount of time, I made tremendous progress thanks to her expertise. During Izabella's vacation, Niels and Carlos took over the sessions seamlessly, continuing exactly where she left off. They know precisely how to get the maximum out of every session.",
        "I set high standards for myself — and they raise the bar even higher. Roure Personal Training is without a doubt the best studio I've ever trained at. For those who have never trained before: don't worry. The team helps you move forward step by step. If you truly want to improve yourself, you're in excellent hands at Roure PT."
      ],
      beforeImage: "images/jeroen-marre-before.png",
      afterImage: "images/jeroen-marre-after.png"
    },
    {
      id: 'reza',
      name: 'Reza',
      rating: 5,
      text: "After training at this PT studio (Roure Personal Training) for a year, I can only express praise. The coaching is extremely professional, always enjoyable, and completely tailored to you.",
      expandedText: [
        "Everything is based on facts: my body is measured regularly, and the results are immediately visible. Thanks to their approach, I'm completely back in shape again! Many thanks to the entire team 😊"
      ],
      beforeImage: "images/reza-before.png",
      afterImage: "images/reza-after.png"
    }
  ];

  get currentTestimonial() {
    return this.testimonials[this.currentIndex];
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

  toggleTestimonial(id: string): void {
    this.expandedTestimonials[id] = !this.expandedTestimonials[id];
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

