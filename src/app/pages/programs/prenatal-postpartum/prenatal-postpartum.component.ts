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
  expandedTestimonials: { [key: string]: boolean } = {
    'aline': false,
    'arlyta': false,
    'natalia': false,
    'monique': false
  };

  constructor(private router: Router) {}

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake'], {
      queryParams: { program: 'prenatal-postpartum' }
    });
  }

  goToPrograms(): void {
    void this.router.navigate(['/programs']);
  }

  toggleTestimonial(id: string): void {
    this.expandedTestimonials[id] = !this.expandedTestimonials[id];
  }
}

