import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Reason = {
  title: string;
  description: string;
  icon: string;
};

@Component({
  selector: 'app-reasons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reasons.component.html',
  styleUrl: './reasons.component.css'
})
export class ReasonsComponent {
  reasons: Reason[] = [
    {
      title: 'Flexible scheduling',
      description: 'We plan sessions around your availability, adjusting week by week when needed.',
      icon: 'calendar'
    },
    {
      title: 'Friendly & Supportive',
      description: 'Supportive and motivating, with guidance that extends beyond the training floor.',
      icon: 'handshake'
    },
    {
      title: 'Personalized',
      description: 'Structured coaching, clear planning, and expert support to help you reach your health and fitness goals.',
      icon: 'target'
    }
  ];
}


