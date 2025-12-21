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
      image: '/images/no-image.jpg',
      route: '/programs/weight-loss-muscle-mass'
    },
    {
      title: 'Peak performance',
      benefits: ['Competition readiness', 'Advanced athletic training'],
      image: '/images/no-image.jpg',
      route: '/programs/peak-performance'
    },
    {
      title: 'Vitality & longevity',
      benefits: ['Anti-aging protocol', 'Health span extension'],
      image: '/images/no-image.jpg',
      route: '/programs/vitality-longevity'
    },
    {
      title: 'Prenatal & postpartum',
      benefits: ['Safe pregnancy fitness', 'Postpartum recovery'],
      image: '/images/no-image.jpg',
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
}

