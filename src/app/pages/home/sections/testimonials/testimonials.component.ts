import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  currentIndex = 0;
  expandedTestimonials: { [key: string]: boolean } = {
    'caro': false,
    'goncagul': false,
    'marcel': false,
    'jeroen': false
  };

  testimonials: any[] = [];

  constructor(private sanitizer: DomSanitizer) {
    const rawTestimonials = [
      {
        id: 'caro',
        name: 'Caro Dantas',
        rating: 5,
        textKey: 'home.testimonials.items.caro.text',
        expandedText: [],
        videoUrl: 's2kOo861aSc'
      },
      {
        id: 'goncagul',
        name: 'Goncagül',
        rating: 5,
        textKey: 'home.testimonials.items.goncagul.text',
        expandedText: [],
        videoUrl: 'Hnh09wNM5UA'
      },
      {
        id: 'marcel',
        name: 'Marcel',
        rating: 5,
        textKey: 'home.testimonials.items.marcel.text',
        expandedText: [],
        videoUrl: 'KcxS6cwW-xA'
      },
      {
        id: 'jeroen',
        name: 'Jeroen',
        rating: 5,
        textKey: 'home.testimonials.items.jeroen.text',
        expandedText: [],
        videoUrl: 'zDMUZMQL8vA'
      }
    ];

    this.testimonials = rawTestimonials.map(t => ({
      ...t,
      safeVideoUrl: this.toSafeYoutubeEmbed(`https://www.youtube.com/embed/${t.videoUrl}`)
    }));
  }

  toSafeYoutubeEmbed(url: string): SafeResourceUrl | null {
    // Whitelist only YouTube embed URLs for security
    const allowed = /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
    if (!allowed.test(url)) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get currentTestimonial() {
    return this.testimonials[this.currentIndex];
  }

  needsTruncation(text: string): boolean {
    // Show read more if text is longer than approximately 5 lines
    // Rough estimate: 5 lines * ~70 characters per line = 350 characters
    return text.length > 350;
  }

  isExpanded(id: string): boolean {
    return this.expandedTestimonials[id] || false;
  }

  toggleTestimonial(id: string): void {
    this.expandedTestimonials[id] = !this.expandedTestimonials[id];
  }

  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number): void {
    this.currentIndex = index;
  }
}
