import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spotlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spotlight.component.html',
  styleUrl: './spotlight.component.css'
})
export class SpotlightComponent {
  spotlightArticle = {
    category: 'Personal Training',
    title: 'Why Personal Trainers Are Worth It',
    date: 'August 21, 2024',
    image: 'images/why-personal-trainers-are-worth-it.png',
    slug: 'why-personal-trainers-are-worth-it'
  };
}

