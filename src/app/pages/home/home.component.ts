import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './sections/hero/hero.component';
import { WhyUsComponent } from './sections/why-us/why-us.component';
import { PlansComponent } from './sections/plans/plans.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { FaqComponent } from './sections/faq/faq.component';
import { PromotionComponent } from './sections/promotion/promotion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    WhyUsComponent,
    PlansComponent,
    TestimonialsComponent,
    FaqComponent,
    PromotionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}

