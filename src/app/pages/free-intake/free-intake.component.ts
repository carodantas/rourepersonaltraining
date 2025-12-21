import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from '../home/sections/promotion/promotion.component';

@Component({
  selector: 'app-free-intake',
  standalone: true,
  imports: [CommonModule, PromotionComponent],
  templateUrl: './free-intake.component.html',
  styleUrl: './free-intake.component.css'
})
export class FreeIntakeComponent {
}

