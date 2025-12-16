import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Program {
  title: string;
  benefits: string[];
  image: string;
}

@Component({
  selector: 'app-programs-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programs-grid.component.html',
  styleUrl: './programs-grid.component.css'
})
export class ProgramsGridComponent {
  programs: Program[] = [
    {
      title: 'Weight loss & muscle mass',
      benefits: ['Sustainable weight loss', 'Increased muscle strength'],
      image: '/images/no-image.jpg'
    },
    {
      title: 'Peak performance',
      benefits: ['Competition readiness', 'Advanced athletic training'],
      image: '/images/no-image.jpg'
    },
    {
      title: 'Vitality & longevity',
      benefits: ['Anti-aging protocol', 'Health span extension'],
      image: '/images/no-image.jpg'
    },
    {
      title: 'Prenatal & postpartum',
      benefits: ['Safe pregnancy fitness', 'Postpartum recovery'],
      image: '/images/no-image.jpg'
    }
  ];

  scrollToPromotion(): void {
    const element = document.getElementById('promotion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

