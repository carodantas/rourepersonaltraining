import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
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
        text: "I've never felt stronger and confident! Carlos pushed me to my limits while providing the support and the guidance I needed to succeed. Highly recommended!",
        expandedText: [],
        videoUrl: 's2kOo861aSc'
      },
      {
        id: 'goncagul',
        name: 'Goncagül',
        rating: 5,
        text: "Training here helped me regain strength, confidence, and balance after a difficult period in my life. What started as a goal to lose weight became a long-term journey toward feeling healthier and happier.",
        expandedText: [],
        videoUrl: 'Hnh09wNM5UA'
      },
      {
        id: 'marcel',
        name: 'Marcel',
        rating: 5,
        text: "I've been training here for a few years now, and my programs are always tailored to me. I truly feel I'm growing—not only physically, but mentally as well. It's great that the coaching looks beyond just the body.",
        expandedText: [],
        videoUrl: 'KcxS6cwW-xA'
      },
      {
        id: 'jeroen',
        name: 'Jeroen',
        rating: 5,
        text: "I started training here with a very specific goal: gaining muscle and reducing body fat. Through a clear assessment and a step-by-step training plan, I've been able to work consistently toward my goals. It's hard work, but the results speak for themselves.",
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
