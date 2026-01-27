import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../shared/components/button-primary-glass/button-primary-glass.component';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-weight-loss-muscle-mass',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent, TranslatePipe],
  templateUrl: './weight-loss-muscle-mass.component.html',
  styleUrl: './weight-loss-muscle-mass.component.css'
})
export class WeightLossMuscleMassComponent {
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
      textKey: 'programs.weightLoss.testimonials.jeroen.p1',
      expandedText: [
        'programs.weightLoss.testimonials.jeroen.p2',
        'programs.weightLoss.testimonials.jeroen.p3'
      ],
      beforeImage: "images/jeroen-marre-before.jpg",
      afterImage: "images/jeroen-marre-after.jpg"
    },
    {
      id: 'reza',
      name: 'Reza',
      rating: 5,
      textKey: 'programs.weightLoss.testimonials.reza.p1',
      expandedText: [
        'programs.weightLoss.testimonials.reza.p2'
      ],
      beforeImage: "images/reza-before.jpg",
      afterImage: "images/reza-after.jpg"
    }
  ];

  get currentTestimonial() {
    return this.testimonials[this.currentIndex];
  }

  constructor(private router: Router) {}

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake'], {
      queryParams: { program: 'weight-loss-muscle-mass' }
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

