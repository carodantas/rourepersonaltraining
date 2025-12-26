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
  expandedTestimonials: { [key: string]: boolean } = {
    'jeroen': false,
    'reza': false
  };

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
}

