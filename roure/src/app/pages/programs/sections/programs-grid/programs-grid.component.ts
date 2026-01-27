import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Program {
  title: string;
  benefits: string[];
  image: string;
  route?: string;
}

@Component({
  selector: 'app-programs-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programs-grid.component.html',
  styleUrl: './programs-grid.component.css'
})
export class ProgramsGridComponent {
  constructor(private router: Router) {}

  programs: Program[] = [
    {
      title: 'Weight loss & muscle mass',
      benefits: ['Sustainable weight loss', 'Increased muscle strength'],
      image: 'images/card-weight-loss-muscle-mass.jpg',
      route: '/programs/weight-loss-muscle-mass'
    },
    {
      title: 'Peak performance',
      benefits: ['Competition readiness', 'Advanced athletic training'],
      image: 'images/card-peak-performance.jpg',
      route: '/programs/peak-performance'
    },
    {
      title: 'Vitality & longevity',
      benefits: ['Train safely for healthy aging', 'Boost energy and vitality'],
      image: 'images/card-vitality-longevity.jpg',
      route: '/programs/vitality-longevity'
    },
    {
      title: 'Prenatal & postpartum',
      benefits: ['Safe pregnancy fitness', 'Postpartum recovery'],
      image: 'images/card-prenatal-postpartum.jpg',
      route: '/programs/prenatal-postpartum'
    }
  ];

  goToProgram(program: Program): void {
    if (program.route) {
      void this.router.navigate([program.route]);
    } else {
      // Fallback to free intake if no route specified
      void this.router.navigate(['/free-intake']);
    }
  }

  bookFreeIntake(program: Program): void {
    // Navigate to free intake page with program query parameter
    if (program.route) {
      const programSlug = program.route.split('/').pop() || '';
      void this.router.navigate(['/free-intake'], { queryParams: { program: programSlug } });
    } else {
      void this.router.navigate(['/free-intake']);
    }
  }
}

