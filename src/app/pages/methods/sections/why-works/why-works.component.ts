import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-works.component.html',
  styleUrl: './why-works.component.css'
})
export class WhyWorksComponent {
  bullets: string[] = [
    'personalized coaching',
    'data-informed decisions',
    'structured support',
    'progressive adjustments',
    'consistent accountability'
  ];
}


