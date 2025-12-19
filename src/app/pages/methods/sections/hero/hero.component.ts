import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../../shared/components/button-primary-glass/button-primary-glass.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  private router = inject(Router);

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake']);
  }
}


