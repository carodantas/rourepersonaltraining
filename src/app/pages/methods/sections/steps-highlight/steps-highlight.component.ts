import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

type HighlightStep = {
  number: string;
  titleKey: string;
  kickerKey: string;
  bodyKey: string;
};

@Component({
  selector: 'app-steps-highlight',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './steps-highlight.component.html',
  styleUrl: './steps-highlight.component.css'
})
export class StepsHighlightComponent {
  steps: HighlightStep[] = [
    {
      number: '01',
      titleKey: 'methods.stepsHighlight.items.0.title',
      kickerKey: 'methods.stepsHighlight.items.0.kicker',
      bodyKey: 'methods.stepsHighlight.items.0.body'
    },
    {
      number: '02',
      titleKey: 'methods.stepsHighlight.items.1.title',
      kickerKey: 'methods.stepsHighlight.items.1.kicker',
      bodyKey: 'methods.stepsHighlight.items.1.body'
    },
    {
      number: '03',
      titleKey: 'methods.stepsHighlight.items.2.title',
      kickerKey: 'methods.stepsHighlight.items.2.kicker',
      bodyKey: 'methods.stepsHighlight.items.2.body'
    }
  ];
}


