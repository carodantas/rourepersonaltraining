import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './sections/hero/hero.component';
import { ProgramsGridComponent } from './sections/programs-grid/programs-grid.component';
import { DesignedSuccessComponent } from './sections/designed-success/designed-success.component';
import { TransformationsComponent } from './sections/transformations/transformations.component';
import { PromotionComponent } from '../home/sections/promotion/promotion.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ProgramsGridComponent,
    DesignedSuccessComponent,
    TransformationsComponent,
    PromotionComponent
  ],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent {
}

