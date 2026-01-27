import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './why.component.html',
  styleUrl: './why.component.css'
})
export class WhyComponent {
  videoUrl: SafeResourceUrl | null;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.toSafeYoutubeEmbed('https://www.youtube.com/embed/7hmlKK2zZyI');
  }

  toSafeYoutubeEmbed(url: string): SafeResourceUrl | null {
    // Whitelist only YouTube embed URLs for security
    const allowed = /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
    if (!allowed.test(url)) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


