import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../shared/components/button-primary-glass/button-primary-glass.component';

@Component({
  selector: 'app-weight-loss-muscle-mass',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent],
  templateUrl: './weight-loss-muscle-mass.component.html',
  styleUrl: './weight-loss-muscle-mass.component.css'
})
export class WeightLossMuscleMassComponent {
  expandedTestimonials: { [key: string]: boolean } = {
    'jeroen': false,
    'reza': false
  };

  constructor(private router: Router) {}

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake'], {
      queryParams: { program: 'weight-loss-muscle-mass' }
    });
  }

  toggleTestimonial(id: string): void {
    this.expandedTestimonials[id] = !this.expandedTestimonials[id];
  }
}

