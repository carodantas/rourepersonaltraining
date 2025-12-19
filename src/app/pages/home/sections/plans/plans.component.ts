import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent {
  constructor(private router: Router) {}

  scrollToForm(plan?: string): void {
    // Navigate to home page with query params and fragment
    const navigationExtras: any = { fragment: 'promotion' };
    if (plan) {
      navigationExtras.queryParams = { plan };
    }
    
    void this.router.navigate(['/'], navigationExtras).then(() => {
      // Scroll to form after navigation
      setTimeout(() => {
        const element = document.getElementById('promotion');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    });
  }
}
