import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Video {
  videoUrl: string;
  safeVideoUrl: SafeResourceUrl | null;
}

@Component({
  selector: 'app-transformations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transformations.component.html',
  styleUrl: './transformations.component.css'
})
export class TransformationsComponent {
  videos: Video[] = [];

  constructor(private sanitizer: DomSanitizer) {
    const rawVideos = [
      { videoUrl: '7hmlKK2zZyI' },
      { videoUrl: 'C2qpvmGdz08' }
    ];

    this.videos = rawVideos.map(v => ({
      ...v,
      safeVideoUrl: this.toSafeYoutubeEmbed(`https://www.youtube.com/embed/${v.videoUrl}`)
    }));
  }

  toSafeYoutubeEmbed(url: string): SafeResourceUrl | null {
    // Whitelist only YouTube embed URLs for security
    const allowed = /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
    if (!allowed.test(url)) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

