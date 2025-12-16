import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Transformation {
  name: string;
  program: string;
  quote: string;
  image: string;
}

@Component({
  selector: 'app-transformations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transformations.component.html',
  styleUrl: './transformations.component.css'
})
export class TransformationsComponent {
  transformations: Transformation[] = [
    {
      name: 'Sarah M.',
      program: 'Weight Loss & Muscle Mass',
      quote: 'Lost 15kg and gained confidence I never knew I had. The personalized approach made all the difference.',
      image: '/images/no-image.jpg'
    },
    {
      name: 'Michael R.',
      program: 'Peak Performance',
      quote: 'Achieved my personal best in competition. The training program was exactly what I needed to break through my plateau.',
      image: '/images/no-image.jpg'
    }
  ];
}

