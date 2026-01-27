import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqs = [
    {
      questionKey: 'home.faq.items.0.question',
      answerKey: 'home.faq.items.0.answer',
      isOpen: false
    },
    {
      questionKey: 'home.faq.items.1.question',
      answerKey: 'home.faq.items.1.answer',
      isOpen: false
    },
    {
      questionKey: 'home.faq.items.2.question',
      answerKey: 'home.faq.items.2.answer',
      isOpen: false
    },
    {
      questionKey: 'home.faq.items.3.question',
      answerKey: 'home.faq.items.3.answer',
      isOpen: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
