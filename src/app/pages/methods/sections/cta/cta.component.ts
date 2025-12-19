import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../../shared/components/button-primary-glass/button-primary-glass.component';

@Component({
  selector: 'app-methods-cta',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent {
  private router = inject(Router);

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake']);
  }
}


