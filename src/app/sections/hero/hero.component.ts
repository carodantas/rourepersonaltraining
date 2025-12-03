import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryGlassComponent } from '../../shared/components/button-primary-glass/button-primary-glass.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  scrollToForm(): void {
    const element = document.getElementById('promotion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

