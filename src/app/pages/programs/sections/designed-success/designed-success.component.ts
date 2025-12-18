import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-designed-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './designed-success.component.html',
  styleUrl: './designed-success.component.css'
})
export class DesignedSuccessComponent {
  benefits = [
    'Personalized training programs tailored to your goals',
    'Expert guidance from certified trainers',
    'Flexible scheduling that fits your lifestyle',
    'Progressive tracking to measure your success',
    'Supportive community and accountability',
    'Science-backed methods for lasting results'
  ];
}

