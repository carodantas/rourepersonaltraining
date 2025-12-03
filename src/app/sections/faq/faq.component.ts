import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqs = [
    {
      question: 'How often should I train?',
      answer: 'The frequency depends on your goals and current fitness level. We\'ll create a personalized plan that works for your schedule.',
      isOpen: false
    },
    {
      question: 'Do I need a gym membership?',
      answer: 'Not necessarily. We offer both gym-based and home training options to suit your preferences.',
      isOpen: false
    },
    {
      question: 'What should I bring to my first session?',
      answer: 'Just bring comfortable workout clothes, water, and a positive attitude. We\'ll provide everything else you need.',
      isOpen: false
    },
    {
      question: 'Can I cancel or change my plan?',
      answer: 'Yes, you can modify or cancel your plan at any time. We\'re flexible and want to work with your needs.',
      isOpen: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
