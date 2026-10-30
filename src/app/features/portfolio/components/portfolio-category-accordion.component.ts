import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  computed,
  effect,
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
import { I18nService } from '../../../core/services/i18n.service';

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
  private readonly cdr = inject(ChangeDetectorRef);
  readonly i18n = inject(I18nService);

  @ViewChild('sliderTrack', { static: false }) sliderTrack?: ElementRef<HTMLDivElement>;

  @Input({ required: true }) title = '';
  @Input() lead = '';
  @Input() packages: PortfolioPackageCardViewModel[] = [];
  @Input() initiallyOpen = false;

  @Output() openPackage = new EventEmitter<{ slug: string; imageUrl: string }>();

  readonly openState = signal(false);
  readonly activeSlideIndex = signal(0);
  readonly showSwipeCue = signal(false);

  private isInteracting = false;

  constructor() {
    effect(() => {
      this.i18n.currentLang();
      this.cdr.markForCheck();
    });
  }

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
  }

  ngOnDestroy(): void {}

  isOpen(): boolean {
    return this.openState();
  }

  toggle(): void {
    this.openState.update((value) => !value);
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
    this.isInteracting = false;
  }

  // Mouse drag-to-scroll state
  private isMouseDown = false;
  private startMouseX = 0;
  private startScrollLeft = 0;
  private hasDragged = false;

  onTrackMouseDown(e: MouseEvent): void {
    if (e.button !== 0 || !this.sliderTrack?.nativeElement) return;
    this.isMouseDown = true;
    this.hasDragged = false;
    this.isInteracting = true;
    this.startMouseX = e.pageX;
    this.startScrollLeft = this.sliderTrack.nativeElement.scrollLeft;
    this.sliderTrack.nativeElement.style.cursor = 'grabbing';
    this.sliderTrack.nativeElement.style.scrollBehavior = 'auto';
    this.sliderTrack.nativeElement.style.scrollSnapType = 'none';
  }

  onTrackMouseMove(e: MouseEvent): void {
    if (!this.isMouseDown || !this.sliderTrack?.nativeElement) return;
    const deltaX = e.pageX - this.startMouseX;
    if (Math.abs(deltaX) > 6) {
      this.hasDragged = true;
      this.dismissSwipeCue();
    }
    this.sliderTrack.nativeElement.scrollLeft = this.startScrollLeft - deltaX;
  }

  onTrackMouseUp(e: MouseEvent): void {
    if (!this.isMouseDown) return;
    this.isMouseDown = false;
    if (this.sliderTrack?.nativeElement) {
      this.sliderTrack.nativeElement.style.cursor = 'grab';
      this.sliderTrack.nativeElement.style.scrollBehavior = 'smooth';
      this.sliderTrack.nativeElement.style.scrollSnapType = 'x mandatory';
    }
    setTimeout(() => {
      this.snapToClosestCard();
      this.isInteracting = false;
    }, 40);
  }

  onTrackMouseLeave(e: MouseEvent): void {
    if (this.isMouseDown) {
      this.onTrackMouseUp(e);
    }
    this.onSliderMouseLeave();
  }

  snapToClosestCard(): void {
    if (!this.sliderTrack?.nativeElement) return;
    const track = this.sliderTrack.nativeElement;
    const cards = track.querySelectorAll<HTMLElement>('.tj-apple-card');
    if (!cards.length) return;
    const centerPoint = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(centerPoint - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    this.scrollToSlide(closestIndex);
  }

  onCardClick(index: number): void {
    if (this.hasDragged) {
      this.hasDragged = false;
      return;
    }
    this.scrollToSlide(index);
  }

  scrollToSlide(index: number): void {
    if (!this.sliderTrack?.nativeElement) return;
    const track = this.sliderTrack.nativeElement;
    const cards = track.querySelectorAll<HTMLElement>('.tj-apple-card');
    if (!cards || !cards[index]) return;
    const targetCard = cards[index];

    // Scroll target card into view if needed
    const trackRect = track.getBoundingClientRect();
    const cardRect = targetCard.getBoundingClientRect();
    const isVisible = cardRect.left >= trackRect.left - 4 && cardRect.right <= trackRect.right + 4;
    if (!isVisible) {
      track.scrollTo({
        left: targetCard.offsetLeft,
        behavior: 'smooth',
      });
    }
    this.activeSlideIndex.set(index);
    this.dismissSwipeCue();
  }

  prevSlide(): void {
    const total = this.packages.length;
    if (total <= 1) return;
    const nextIdx = this.activeSlideIndex() === 0 ? total - 1 : this.activeSlideIndex() - 1;
    if (nextIdx === total - 1) {
      if (this.sliderTrack?.nativeElement) {
        const cards = this.sliderTrack.nativeElement.querySelectorAll<HTMLElement>('.tj-apple-card');
        if (cards[nextIdx]) {
          this.sliderTrack.nativeElement.scrollTo({ left: cards[nextIdx].offsetLeft, behavior: 'smooth' });
        }
      }
      this.activeSlideIndex.set(nextIdx);
    } else {
      this.scrollToSlide(nextIdx);
    }
  }

  nextSlide(): void {
    const total = this.packages.length;
    if (total <= 1) return;
    const nextIdx = (this.activeSlideIndex() + 1) % total;
    if (nextIdx === 0) {
      if (this.sliderTrack?.nativeElement) {
        this.sliderTrack.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
      }
      this.activeSlideIndex.set(0);
    } else {
      if (this.sliderTrack?.nativeElement) {
        const cards = this.sliderTrack.nativeElement.querySelectorAll<HTMLElement>('.tj-apple-card');
        if (cards[nextIdx]) {
          const track = this.sliderTrack.nativeElement;
          const card = cards[nextIdx];
          const trackRect = track.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          if (cardRect.right > trackRect.right + 4 || cardRect.left < trackRect.left - 4) {
            track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
          }
        }
      }
      this.activeSlideIndex.set(nextIdx);
    }
    this.dismissSwipeCue();
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
