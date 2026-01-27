import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type HighlightStep = {
  number: string;
  title: string;
  kicker: string;
  body: string;
};

@Component({
  selector: 'app-steps-highlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './steps-highlight.component.html',
  styleUrl: './steps-highlight.component.css'
})
export class StepsHighlightComponent {
  steps: HighlightStep[] = [
    {
      number: '01',
      title: 'Easy Sign-Up',
      kicker: 'Getting started is simple',
      body:
        'Schedule your free intake directly through the website or reach out to us — we’ll guide you through the first step toward personalized training.'
    },
    {
      number: '02',
      title: 'Intake Session',
      kicker: 'Understanding your goals and lifestyle',
      body:
        'In the intake session we take the time to truly understand your goals, your training experience, and your current lifestyle and fitness level — often over coffee or tea.'
    },
    {
      number: '03',
      title: 'First Training & Assessment',
      kicker: 'Movement and technique assessment',
      body:
        'We observe posture, movement quality, and technique to identify strengths and areas to improve — ensuring training is safe, effective, and confidence-building from day one.'
    }
  ];
}


