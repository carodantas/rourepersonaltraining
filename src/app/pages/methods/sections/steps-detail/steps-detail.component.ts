import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

type DetailStep = {
  id: 'inbody' | 'app' | 'evaluation';
  number: string;
  titleKey: string;
  bodyKeys: string[];
  bulletKeys?: string[];
  imageAltKey: string;
};

@Component({
  selector: 'app-steps-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './steps-detail.component.html',
  styleUrl: './steps-detail.component.css'
})
export class StepsDetailComponent {
  steps: DetailStep[] = [
    {
      id: 'inbody',
      number: '04',
      titleKey: 'methods.stepsDetail.items.0.title',
      bodyKeys: [
        'methods.stepsDetail.items.0.body.0',
        'methods.stepsDetail.items.0.body.1',
        'methods.stepsDetail.items.0.body.2'
      ],
      bulletKeys: [
        'methods.stepsDetail.items.0.bullets.0',
        'methods.stepsDetail.items.0.bullets.1',
        'methods.stepsDetail.items.0.bullets.2',
        'methods.stepsDetail.items.0.bullets.3'
      ],
      imageAltKey: 'methods.stepsDetail.items.0.imageAlt'
    },
    {
      id: 'app',
      number: '05',
      titleKey: 'methods.stepsDetail.items.1.title',
      bodyKeys: ['methods.stepsDetail.items.1.body.0', 'methods.stepsDetail.items.1.body.1'],
      bulletKeys: [
        'methods.stepsDetail.items.1.bullets.0',
        'methods.stepsDetail.items.1.bullets.1',
        'methods.stepsDetail.items.1.bullets.2',
        'methods.stepsDetail.items.1.bullets.3'
      ],
      imageAltKey: 'methods.stepsDetail.items.1.imageAlt'
    },
    {
      id: 'evaluation',
      number: '06',
      titleKey: 'methods.stepsDetail.items.2.title',
      bodyKeys: [
        'methods.stepsDetail.items.2.body.0',
        'methods.stepsDetail.items.2.body.1',
        'methods.stepsDetail.items.2.body.2'
      ],
      imageAltKey: 'methods.stepsDetail.items.2.imageAlt'
    }
  ];

  getStepImage(id: DetailStep['id']): string {
    const images: Record<DetailStep['id'], string> = {
      inbody: 'images/body-analysis-inbody.jpg',
      app: 'images/progress-tracking.jpg',
      evaluation: 'images/ongoing-evaluation.jpg'
    };
    return images[id] ?? 'images/no-image.jpg';
  }
}


