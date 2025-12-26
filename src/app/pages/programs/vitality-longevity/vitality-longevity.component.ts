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
  expandedTestimonials: { [key: string]: boolean } = {
    'jeroen': false,
    'reza': false
  };

  constructor(private router: Router) {}

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake'], {
      queryParams: { program: 'vitality-longevity' }
    });
  }

  goToPrograms(): void {
    void this.router.navigate(['/programs']);
  }

  toggleTestimonial(id: string): void {
    this.expandedTestimonials[id] = !this.expandedTestimonials[id];
  }
}

