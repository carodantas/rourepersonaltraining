import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

interface Program {
  titleKey: string;
  benefitsKeys: string[];
  image: string;
  route?: string;
}

@Component({
  selector: 'app-programs-grid',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './programs-grid.component.html',
  styleUrl: './programs-grid.component.css'
})
export class ProgramsGridComponent {
  constructor(private router: Router) {}

  programs: Program[] = [
    {
      titleKey: 'programs.grid.items.weightLoss.title',
      benefitsKeys: ['programs.grid.items.weightLoss.benefits.0', 'programs.grid.items.weightLoss.benefits.1'],
      image: 'images/card-weight-loss-muscle-mass.jpg',
      route: '/programs/weight-loss-muscle-mass'
    },
    {
      titleKey: 'programs.grid.items.peak.title',
      benefitsKeys: ['programs.grid.items.peak.benefits.0', 'programs.grid.items.peak.benefits.1'],
      image: 'images/card-peak-performance.jpg',
      route: '/programs/peak-performance'
    },
    {
      titleKey: 'programs.grid.items.vitality.title',
      benefitsKeys: ['programs.grid.items.vitality.benefits.0', 'programs.grid.items.vitality.benefits.1'],
      image: 'images/card-vitality-longevity.jpg',
      route: '/programs/vitality-longevity'
    },
    {
      titleKey: 'programs.grid.items.prenatal.title',
      benefitsKeys: ['programs.grid.items.prenatal.benefits.0', 'programs.grid.items.prenatal.benefits.1'],
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

