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
    // Navigate to free-intake page with query params if plan is provided
    const navigationExtras: any = {};
    if (plan) {
      navigationExtras.queryParams = { plan };
    }
    
    void this.router.navigate(['/free-intake'], navigationExtras);
  }
}
