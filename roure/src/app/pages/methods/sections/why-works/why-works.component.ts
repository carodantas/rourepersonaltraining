import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-why-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-works.component.html',
  styleUrl: './why-works.component.css'
})
export class WhyWorksComponent {
  bullets: string[] = [
    'Personalized coaching',
    'Data-informed decisions',
    'Structured support',
    'Progressive adjustments',
    'Consistent accountability'
  ];

  videoUrl: SafeResourceUrl | null;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.toSafeYoutubeEmbed('https://www.youtube.com/embed/gXrA7aO5J-g');
  }

  toSafeYoutubeEmbed(url: string): SafeResourceUrl | null {
    // Whitelist only YouTube embed URLs for security
    const allowed = /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
    if (!allowed.test(url)) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


