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
import { Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../shared/components/button-primary-glass/button-primary-glass.component';
import { TranslatePipe } from '../../../pipes/translate.pipe';

const AUTO_ADVANCE_MS = 10_000;
const TRANSITION_MS = 360;

@Component({
  selector: 'app-weight-loss-muscle-mass',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent, TranslatePipe],
  templateUrl: './weight-loss-muscle-mass.component.html',
  styleUrl: './weight-loss-muscle-mass.component.css'
})
export class WeightLossMuscleMassComponent implements AfterViewInit, OnDestroy {
  readonly currentIndex = signal(0);
  readonly carouselAutoplayEnabled = signal(true);

  readonly carouselTrackTransform = computed(() => {
    const n = this.testimonials.length;
    if (n <= 0) return 'translateX(0)';
    const i = this.currentIndex();
    const pct = (100 * i) / n;
    return `translateX(-${pct}%)`;
  });

  expandedTestimonials: { [key: string]: boolean } = {
    jeroen: false,
    reza: false
  };

  testimonials: Array<{
    id: string;
    name: string;
    rating: number;
    textKey: string;
    expandedText: string[];
    beforeImage: string;
    afterImage: string;
  }> = [
    {
      id: 'jeroen',
      name: 'Jeroen Marré',
      rating: 5,
      textKey: 'programs.weightLoss.testimonials.jeroen.p1',
      expandedText: ['programs.weightLoss.testimonials.jeroen.p2', 'programs.weightLoss.testimonials.jeroen.p3'],
      beforeImage: 'images/jeroen-marre-before.jpg',
      afterImage: 'images/jeroen-marre-after.jpg'
    },
    {
      id: 'reza',
      name: 'Reza',
      rating: 5,
      textKey: 'programs.weightLoss.testimonials.reza.p1',
      expandedText: ['programs.weightLoss.testimonials.reza.p2'],
      beforeImage: 'images/reza-before.jpg',
      afterImage: 'images/reza-after.jpg'
    }
  ];

  private prefersReducedMotion = false;
  private autoAdvanceTimer: ReturnType<typeof setTimeout> | null = null;
  private slideTransitionTimeout: ReturnType<typeof setTimeout> | null = null;
  private isAnimatingSlide = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) this.carouselAutoplayEnabled.set(false);
    this.scheduleNextAutoAdvance();
  }

  ngOnDestroy(): void {
    this.clearAutoAdvanceTimer();
    if (this.slideTransitionTimeout !== null) clearTimeout(this.slideTransitionTimeout);
  }

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake'], {
      queryParams: { program: 'weight-loss-muscle-mass' }
    });
  }

  goToPrograms(): void {
    void this.router.navigate(['/programs']);
  }

  toggleTestimonial(id: string): void {
    this.expandedTestimonials[id] = !this.expandedTestimonials[id];
  }

  onFeedbackContentClick(): void {
    if (this.prefersReducedMotion) return;
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
    if (this.slideTransitionTimeout !== null) clearTimeout(this.slideTransitionTimeout);

    this.currentIndex.set(nextIndex);
    this.slideTransitionTimeout = setTimeout(() => finishSlideTransition(), TRANSITION_MS);
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
