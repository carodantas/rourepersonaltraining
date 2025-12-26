import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './sections/hero/hero.component';
import { StoryComponent } from './sections/story/story.component';
import { WhyComponent } from './sections/why/why.component';
import { TeamComponent } from './sections/team/team.component';
import { ReasonsComponent } from './sections/reasons/reasons.component';
import { ContactComponent } from './sections/contact/contact.component';
import { CtaComponent } from './sections/cta/cta.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    StoryComponent,
    WhyComponent,
    TeamComponent,
    ReasonsComponent,
    ContactComponent,
    CtaComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {}


