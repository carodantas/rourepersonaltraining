import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-designed-success',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './designed-success.component.html',
  styleUrl: './designed-success.component.css'
})
export class DesignedSuccessComponent {
  benefitKeys = [
    'programs.designedSuccess.benefits.0',
    'programs.designedSuccess.benefits.1',
    'programs.designedSuccess.benefits.2',
    'programs.designedSuccess.benefits.3',
    'programs.designedSuccess.benefits.4',
    'programs.designedSuccess.benefits.5'
  ];
}

