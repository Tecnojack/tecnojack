import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
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
export class PortfolioCategoryAccordionComponent {
  private readonly mediaPublic = inject(MediaPublicService);
  private readonly content = inject(PortfolioContentService);

  @Input({ required: true }) title = '';
  @Input() lead = '';
  @Input() packages: PortfolioPackageCardViewModel[] = [];
  @Input() initiallyOpen = false;

  @Output() openPackage = new EventEmitter<{ slug: string; imageUrl: string }>();

  readonly openState = signal(false);
  readonly selectedIndex = signal(0);

  readonly selectedPackage = computed(() => {
    const list = this.packages;
    if (!list || list.length === 0) return null;
    const idx = this.selectedIndex();
    return list[idx] ?? list[0];
  });

  ngOnInit(): void {
    this.openState.set(this.initiallyOpen);
  }

  isOpen(): boolean {
    return this.openState();
  }

  toggle(): void {
    this.openState.update((value) => !value);
  }

  selectPackage(index: number): void {
    this.selectedIndex.set(index);
  }

  prevPackage(): void {
    const list = this.packages;
    if (!list || list.length <= 1) return;
    const current = this.selectedIndex();
    this.selectedIndex.set((current - 1 + list.length) % list.length);
  }

  nextPackage(): void {
    const list = this.packages;
    if (!list || list.length <= 1) return;
    const current = this.selectedIndex();
    this.selectedIndex.set((current + 1) % list.length);
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
