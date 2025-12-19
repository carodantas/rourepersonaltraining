import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    image: '/images/no-image.jpg',
    slug: 'why-personal-trainers-are-worth-it'
  };

  constructor(private router: Router) {}

  openArticle(): void {
    // Navigate to article detail page (to be implemented)
    void this.router.navigate(['/blog', this.spotlightArticle.slug]);
  }
}

