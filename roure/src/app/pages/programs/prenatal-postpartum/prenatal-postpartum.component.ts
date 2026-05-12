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
import { TranslationService } from '../../../services/translation.service';
import {
  PROGRAM_FEEDBACK_COMPACT_MEDIA,
  programFeedbackItemsPerPage,
  programFeedbackPageCount,
  remapFeedbackPageIndex
} from '../feedback-carousel-breakpoint';

const AUTO_ADVANCE_MS = 10_000;
const TRANSITION_MS = 360;

type Testimonial = {
  textKey: string;
  author: string;
  rating: number;
};

@Component({
  selector: 'app-prenatal-postpartum',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryGlassComponent, TranslatePipe],
  templateUrl: './prenatal-postpartum.component.html',
  styleUrl: './prenatal-postpartum.component.css'
})
export class PrenatalPostpartumComponent implements AfterViewInit, OnDestroy {
  readonly feedbackPageIndex = signal(0);
  readonly feedbackLayoutCompact = signal(false);
  readonly carouselAutoplayEnabled = signal(true);

  paginationAriaKey = 'programs.prenatal.feedback.paginationAria';

  readonly carouselTrackTransform = computed(() => {
    const pages = programFeedbackPageCount(this.testimonials.length, this.feedbackLayoutCompact());
    return `translateX(-${(100 * this.feedbackPageIndex()) / pages}%)`;
  });

  readonly pageIndices = computed(() =>
    Array.from({ length: programFeedbackPageCount(this.testimonials.length, this.feedbackLayoutCompact()) }, (_, i) => i)
  );

  expandedTestimonials: { [key: number]: boolean } = {};

  testimonials: Testimonial[] = [
    {
      textKey: 'programs.prenatal.testimonials.0.text',
      author: 'Aline Kiers',
      rating: 5
    },
    {
      textKey: 'programs.prenatal.testimonials.1.text',
      author: 'Arlyta Wibowo',
      rating: 5
    },
    {
      textKey: 'programs.prenatal.testimonials.2.text',
      author: 'Natalia Sanchez',
      rating: 5
    },
    {
      textKey: 'programs.prenatal.testimonials.3.text',
      author: 'Monique Pereboom',
      rating: 5
    }
  ];

  readMoreKey = 'programs.prenatal.feedback.readMore';
  readLessKey = 'programs.prenatal.feedback.readLess';
  prevAriaKey = 'programs.prenatal.feedback.prevAria';
  nextAriaKey = 'programs.prenatal.feedback.nextAria';
  goToAriaPrefixKey = 'programs.prenatal.feedback.goToAriaPrefix';

  private prefersReducedMotion = false;
  private feedbackMediaQuery: MediaQueryList | null = null;
  private autoAdvanceTimer: ReturnType<typeof setTimeout> | null = null;
  private slideTransitionTimeout: ReturnType<typeof setTimeout> | null = null;
  private isAnimatingSlide = false;

  constructor(
    private router: Router,
    private translation: TranslationService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) this.carouselAutoplayEnabled.set(false);
    this.initFeedbackCompactMediaQuery();
    this.scheduleNextAutoAdvance();
  }

  ngOnDestroy(): void {
    this.clearAutoAdvanceTimer();
    if (this.slideTransitionTimeout !== null) clearTimeout(this.slideTransitionTimeout);
    if (this.feedbackMediaQuery) {
      this.feedbackMediaQuery.removeEventListener('change', this.onFeedbackCompactChangeBound);
      this.feedbackMediaQuery = null;
    }
  }

  sliceForPage(page: number): Testimonial[] {
    const per = programFeedbackItemsPerPage(this.feedbackLayoutCompact());
    const start = page * per;
    return this.testimonials.slice(start, start + per);
  }

  testimonialAbsoluteIndex(page: number, itemIndex: number): number {
    return page * programFeedbackItemsPerPage(this.feedbackLayoutCompact()) + itemIndex;
  }

  private readonly onFeedbackCompactChangeBound = (): void => this.onFeedbackCompactChange();

  private initFeedbackCompactMediaQuery(): void {
    const mq = window.matchMedia(PROGRAM_FEEDBACK_COMPACT_MEDIA);
    this.feedbackMediaQuery = mq;
    this.feedbackLayoutCompact.set(mq.matches);
    mq.addEventListener('change', this.onFeedbackCompactChangeBound);
  }

  private onFeedbackCompactChange(): void {
    const mq = this.feedbackMediaQuery;
    if (!mq) return;
    const compact = mq.matches;
    const prevCompact = this.feedbackLayoutCompact();
    if (compact === prevCompact) return;
    const newIdx = remapFeedbackPageIndex(
      this.feedbackPageIndex(),
      prevCompact,
      compact,
      this.testimonials.length
    );
    this.feedbackPageIndex.set(newIdx);
    this.feedbackLayoutCompact.set(compact);
  }

  goToFreeIntake(): void {
    void this.router.navigate(['/free-intake'], {
      queryParams: { program: 'prenatal-postpartum' }
    });
  }

  goToPrograms(): void {
    void this.router.navigate(['/programs']);
  }

  onFeedbackContentClick(): void {
    if (this.prefersReducedMotion) return;
    this.disableCarouselAutoplay();
  }

  nextTestimonial(): void {
    const pages = programFeedbackPageCount(this.testimonials.length, this.feedbackLayoutCompact());
    this.goToSlide((this.feedbackPageIndex() + 1) % pages);
  }

  prevTestimonial(): void {
    const pages = programFeedbackPageCount(this.testimonials.length, this.feedbackLayoutCompact());
    this.goToSlide((this.feedbackPageIndex() - 1 + pages) % pages);
  }

  goToTestimonial(pageIndex: number): void {
    this.goToSlide(pageIndex);
  }

  onDotClick(event: Event, pageIndex: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.goToTestimonial(pageIndex);
  }

  onDotKeydown(event: KeyboardEvent, pageIndex: number): void {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      event.stopPropagation();
      this.goToTestimonial(pageIndex);
    }
  }

  toggleTestimonial(index: number): void {
    this.expandedTestimonials[index] = !this.expandedTestimonials[index];
  }

  isExpanded(index: number): boolean {
    return this.expandedTestimonials[index] || false;
  }

  needsTruncation(text: string): boolean {
    return text.length > 350;
  }

  needsTruncationKey(key: string): boolean {
    const text = this.translation.translate(key);
    return this.needsTruncation(text);
  }

  private disableCarouselAutoplay(): void {
    this.carouselAutoplayEnabled.set(false);
    this.clearAutoAdvanceTimer();
  }

  private goToSlide(nextPage: number): void {
    if (nextPage === this.feedbackPageIndex() || this.isAnimatingSlide) return;
    this.clearAutoAdvanceTimer();

    const finishSlideTransition = (): void => {
      this.isAnimatingSlide = false;
      this.slideTransitionTimeout = null;
      this.scheduleNextAutoAdvance();
    };

    if (this.prefersReducedMotion) {
      this.feedbackPageIndex.set(nextPage);
      this.scheduleNextAutoAdvance();
      return;
    }

    this.isAnimatingSlide = true;
    if (this.slideTransitionTimeout !== null) clearTimeout(this.slideTransitionTimeout);

    this.feedbackPageIndex.set(nextPage);
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
