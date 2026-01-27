import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type DetailStep = {
  number: string;
  title: string;
  body: string[];
  bullets?: string[];
  imageAlt: string;
};

@Component({
  selector: 'app-steps-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './steps-detail.component.html',
  styleUrl: './steps-detail.component.css'
})
export class StepsDetailComponent {
  steps: DetailStep[] = [
    {
      number: '04',
      title: 'Body Analysis (InBody)',
      body: [
        'We use a professional InBody scan to measure your body composition — including fat mass, muscle mass, and overall balance.',
        'This goes far beyond the scale and gives a data-driven view of your progress over time.',
        'With this insight, we can objectively track:'
      ],
      bullets: [
        'Fat loss',
        'Muscle gain',
        'Changes in body composition',
        'Trends week to week'
      ],
      imageAlt: 'Body analysis placeholder'
    },
    {
      number: '05',
      title: 'Progress Tracking With Your App',
      body: [
        'We connect you with the Roure app — your hub for accountability, tracking, and communication.',
        'Through the app you can:'
      ],
      bullets: ['Book sessions', 'Access training plans', 'Track nutrition and habits', 'Monitor progress and goals'],
      imageAlt: 'App tracking placeholder'
    },
    {
      number: '06',
      title: 'Ongoing Evaluation',
      body: [
        'Progress isn’t static, and neither is our coaching.',
        'Every few weeks we review your results together and make adjustments where needed so you stay on the right path.',
        'This keeps your plan relevant, effective, and motivating — and when goals shift we adapt.'
      ],
      imageAlt: 'Ongoing evaluation placeholder'
    }
  ];

  getStepImage(title: string): string {
    if (title === 'Body Analysis (InBody)') {
      return 'images/body-analysis-inbody.jpg';
    } else if (title === 'Progress Tracking With Your App') {
      return 'images/progress-tracking.jpg';
    } else if (title === 'Ongoing Evaluation') {
      return 'images/ongoing-evaluation.jpg';
    }
    return 'images/no-image.jpg';
  }
}


