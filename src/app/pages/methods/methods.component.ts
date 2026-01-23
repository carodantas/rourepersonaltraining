import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './sections/hero/hero.component';
import { IntroComponent } from './sections/intro/intro.component';
import { StepsHighlightComponent } from './sections/steps-highlight/steps-highlight.component';
import { StepsDetailComponent } from './sections/steps-detail/steps-detail.component';
import { WhyWorksComponent } from './sections/why-works/why-works.component';
import { CtaComponent } from './sections/cta/cta.component';

@Component({
  selector: 'app-methods',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    IntroComponent,
    StepsHighlightComponent,
    StepsDetailComponent,
    WhyWorksComponent,
    CtaComponent
  ],
  templateUrl: './methods.component.html',
  styleUrl: './methods.component.css'
})
export class MethodsComponent {}


