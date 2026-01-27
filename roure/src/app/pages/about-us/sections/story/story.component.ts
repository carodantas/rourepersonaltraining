import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {}


