import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

const AUTO_ADVANCE_MS = 10_000;
/** Must match `.carousel-track { transition-duration }` in CSS */
const TRANSITION_MS = 360;

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  /** Signals so zoneless change detection runs when timers update the carousel. */
  readonly currentIndex = signal(0);
  readonly carouselAutoplayEnabled = signal(true);

  readonly carouselTrackTransform = computed(() => {
    const n = this.testimonials.length;
    if (n <= 0) return 'translateX(0)';
    const i = this.currentIndex();
    const pct = (100 * i) / n;
    return `translateX(-${pct}%)`;
  });

  private prefersReducedMotion = false;
  private autoAdvanceTimer: ReturnType<typeof setTimeout> | null = null;
  private slideTransitionTimeout: ReturnType<typeof setTimeout> | null = null;
  private isAnimatingSlide = false;

  expandedTestimonials: { [key: string]: boolean } = {
    caro: false,
    goncagul: false,
    marcel: false,
    jeroen: false
  };

  testimonials: Array<{
    id: string;
    name: string;
    rating: number;
    textKey: string;
    expandedText: unknown[];
    videoUrl: string;
    safeVideoUrl: SafeResourceUrl | null;
  }> = [];

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
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

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) this.carouselAutoplayEnabled.set(false);
    this.scheduleNextAutoAdvance();
  }

  ngOnDestroy(): void {
    this.clearAutoAdvanceTimer();
    if (this.slideTransitionTimeout !== null) {
      clearTimeout(this.slideTransitionTimeout);
    }
  }

  toSafeYoutubeEmbed(url: string): SafeResourceUrl | null {
    const allowed = /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
    if (!allowed.test(url)) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  needsTruncation(text: string): boolean {
    return text.length > 350;
  }

  isExpanded(id: string): boolean {
    return this.expandedTestimonials[id] || false;
  }

  toggleTestimonial(id: string): void {
    this.expandedTestimonials[id] = !this.expandedTestimonials[id];
  }

  onTestimonialsContentClick(): void {
    if (this.prefersReducedMotion) return;
    this.disableCarouselAutoplay();
  }

  onVideoInteractionPauseAutoplay(): void {
    this.disableCarouselAutoplay();
  }

  nextTestimonial(): void {
    this.goToSlide((this.currentIndex() + 1) % this.testimonials.length);
  }

  prevTestimonial(): void {
    const n = this.testimonials.length;
    this.goToSlide((this.currentIndex() - 1 + n) % n);
  }

  goToTestimonial(index: number): void {
    this.goToSlide(index);
  }

  onDotClick(event: Event, index: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.goToTestimonial(index);
  }

  onDotKeydown(event: KeyboardEvent, index: number): void {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      event.stopPropagation();
      this.goToTestimonial(index);
    }
  }

  private disableCarouselAutoplay(): void {
    this.carouselAutoplayEnabled.set(false);
    this.clearAutoAdvanceTimer();
  }

  private goToSlide(nextIndex: number): void {
    if (nextIndex === this.currentIndex() || this.isAnimatingSlide) return;
    this.clearAutoAdvanceTimer();

    const finishSlideTransition = (): void => {
      this.isAnimatingSlide = false;
      this.slideTransitionTimeout = null;
      this.scheduleNextAutoAdvance();
    };

    if (this.prefersReducedMotion) {
      this.currentIndex.set(nextIndex);
      this.scheduleNextAutoAdvance();
      return;
    }

    this.isAnimatingSlide = true;
    if (this.slideTransitionTimeout !== null) {
      clearTimeout(this.slideTransitionTimeout);
    }

    this.currentIndex.set(nextIndex);
    this.slideTransitionTimeout = setTimeout(() => {
      finishSlideTransition();
    }, TRANSITION_MS);
  }

  private scheduleNextAutoAdvance(): void {
    this.clearAutoAdvanceTimer();
    if (
      !isPlatformBrowser(this.platformId) ||
      !this.carouselAutoplayEnabled() ||
      this.prefersReducedMotion
    ) {
      return;
    }
    this.autoAdvanceTimer = setTimeout(() => {
      if (!this.carouselAutoplayEnabled() || this.isAnimatingSlide) {
        if (this.carouselAutoplayEnabled()) this.scheduleNextAutoAdvance();
        return;
      }
      this.nextTestimonial();
    }, AUTO_ADVANCE_MS);
  }

  private clearAutoAdvanceTimer(): void {
    if (this.autoAdvanceTimer !== null) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }
}
