import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Observable } from 'rxjs';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { LazyImgComponent } from '../../../shared/images/lazy-img.component';
import { MediaPublicService } from '../../../shared/media/media-public.service';
import { TjImageFallbackPipe } from '../../../shared/media/tj-image-fallback.pipe';
import { DestinationServiceComponent } from '../../../shared/destination/destination-service.component';
import { PortfolioPackageDetail } from '../portfolio.data';
import { resolvePortfolioPackageMediaFolder } from '../utils/portfolio-media-folder.util';
import { PortfolioContentService } from '../services/portfolio-content.service';

export type PortfolioPackageCardViewModel = {
  detail: PortfolioPackageDetail;
  displayName: string;
  tagline: string;
  displayPrice: string;
  displayTypeLabel: string;
  highlights: string[];
};

@Component({
  selector: 'tj-portfolio-category-accordion',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    RevealOnScrollDirective,
    LazyImgComponent,
    TjImageFallbackPipe,
    DestinationServiceComponent,
  ],
  templateUrl: './portfolio-category-accordion.component.html',
  styleUrl: './portfolio-category-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        }),
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        }),
      ),
      transition('collapsed <=> expanded', [animate('300ms cubic-bezier(0.16, 1, 0.3, 1)')]),
    ]),
  ],
})
export class PortfolioCategoryAccordionComponent implements OnInit, OnDestroy {
  private readonly mediaPublic = inject(MediaPublicService);
  private readonly content = inject(PortfolioContentService);

  @ViewChild('sliderTrack', { static: false }) sliderTrack?: ElementRef<HTMLDivElement>;

  @Input({ required: true }) title = '';
  @Input() lead = '';
  @Input() packages: PortfolioPackageCardViewModel[] = [];
  @Input() initiallyOpen = false;

  @Output() openPackage = new EventEmitter<{ slug: string; imageUrl: string }>();

  readonly openState = signal(false);
  readonly activeSlideIndex = signal(0);
  readonly showSwipeCue = signal(false);

  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private isInteracting = false;

  ngOnInit(): void {
    this.openState.set(this.initiallyOpen);

    // Show first-time swipe invitation cue if not seen in current session
    if (typeof window !== 'undefined') {
      try {
        const seen = sessionStorage.getItem('tj_swipe_cue_seen');
        if (!seen) {
          this.showSwipeCue.set(true);
        }
      } catch {
        this.showSwipeCue.set(true);
      }
    }

    if (this.initiallyOpen) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  isOpen(): boolean {
    return this.openState();
  }

  toggle(): void {
    this.openState.update((value) => {
      const next = !value;
      if (next) {
        setTimeout(() => this.startAutoplay(), 350);
      } else {
        this.stopAutoplay();
      }
      return next;
    });
  }

  dismissSwipeCue(): void {
    if (this.showSwipeCue()) {
      this.showSwipeCue.set(false);
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('tj_swipe_cue_seen', 'true');
        } catch {}
      }
    }
  }

  startAutoplay(): void {
    this.stopAutoplay();
    if (this.packages.length <= 1) return;

    this.autoplayTimer = setInterval(() => {
      if (this.isInteracting || !this.isOpen() || this.packages.length <= 1) return;
      const nextIdx = (this.activeSlideIndex() + 1) % this.packages.length;
      this.scrollToSlide(nextIdx);
      this.dismissSwipeCue();
    }, 5000);
  }

  stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  resetAutoplay(): void {
    this.dismissSwipeCue();
    this.startAutoplay();
  }

  onSliderMouseEnter(): void {
    this.isInteracting = true;
  }

  onSliderMouseLeave(): void {
    this.isInteracting = false;
  }

  onSliderTouchStart(): void {
    this.isInteracting = true;
    this.dismissSwipeCue();
  }

  onSliderTouchEnd(): void {
    setTimeout(() => {
      this.isInteracting = false;
      this.resetAutoplay();
    }, 2000);
  }

  onCardClick(index: number): void {
    if (this.activeSlideIndex() !== index) {
      this.scrollToSlide(index);
      this.resetAutoplay();
    }
  }

  scrollToSlide(index: number): void {
    if (!this.sliderTrack?.nativeElement) return;
    const track = this.sliderTrack.nativeElement;
    const cards = track.querySelectorAll<HTMLElement>('.tj-apple-card');
    if (!cards || !cards[index]) return;
    const targetCard = cards[index];
    const targetLeft = targetCard.offsetLeft - (track.clientWidth - targetCard.clientWidth) / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
    this.activeSlideIndex.set(index);
  }

  prevSlide(): void {
    const total = this.packages.length;
    if (total <= 1) return;
    const nextIdx = this.activeSlideIndex() === 0 ? total - 1 : this.activeSlideIndex() - 1;
    this.scrollToSlide(nextIdx);
    this.resetAutoplay();
  }

  nextSlide(): void {
    const total = this.packages.length;
    if (total <= 1) return;
    const nextIdx = (this.activeSlideIndex() + 1) % total;
    this.scrollToSlide(nextIdx);
    this.resetAutoplay();
  }

  onTrackScroll(): void {
    if (!this.sliderTrack?.nativeElement) return;
    const track = this.sliderTrack.nativeElement;
    const scrollLeft = track.scrollLeft;
    const cards = track.querySelectorAll<HTMLElement>('.tj-apple-card');
    if (!cards || cards.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;
    const centerPoint = scrollLeft + track.clientWidth / 2;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(centerPoint - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (this.activeSlideIndex() !== closestIndex) {
      this.activeSlideIndex.set(closestIndex);
      this.dismissSwipeCue();
    }
  }

  requestOpenPackage(slug: string, imageUrl: string): void {
    this.openPackage.emit({ slug, imageUrl });
  }

  get showDestinationNotice(): boolean {
    const value = (this.title || '').toLowerCase();
    return value.includes('boda') || value.includes('quince') || value.includes('15');
  }

  coverByDetail(
    detail: PortfolioPackageDetail | null | undefined,
  ): Observable<string> {
    return this.mediaPublic.getRealImage(
      resolvePortfolioPackageMediaFolder(detail),
    );
  }

  getWhatsAppBookingHref(item: PortfolioPackageCardViewModel): string {
    const text = `Hola TECNOJACK, me interesa reservar o recibir asesoría para el paquete "${item.displayName}" (${item.displayPrice}). ¿Podemos agendar?`;
    return this.content.buildWhatsappHref(text);
  }
}
