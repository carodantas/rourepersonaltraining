import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

type Reason = {
  titleKey: string;
  descriptionKey: string;
  icon: string;
};

@Component({
  selector: 'app-reasons',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './reasons.component.html',
  styleUrl: './reasons.component.css'
})
export class ReasonsComponent {
  reasons: Reason[] = [
    {
      titleKey: 'aboutUs.reasons.items.0.title',
      descriptionKey: 'aboutUs.reasons.items.0.description',
      icon: 'calendar'
    },
    {
      titleKey: 'aboutUs.reasons.items.1.title',
      descriptionKey: 'aboutUs.reasons.items.1.description',
      icon: 'handshake'
    },
    {
      titleKey: 'aboutUs.reasons.items.2.title',
      descriptionKey: 'aboutUs.reasons.items.2.description',
      icon: 'target'
    }
  ];
}


