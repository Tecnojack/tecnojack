import { DatePipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, Input, ViewChild, computed, inject, signal } from '@angular/core';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Wedding } from '../../core/models/wedding.model';
import { Guest } from '../../core/models/guest.model';
import { RevealOnScrollDirective } from '../../shared/animations/reveal-on-scroll.directive';

type PhotoSwipeLightboxModule = typeof import('photoswipe/lightbox');
type PhotoSwipeLightboxType = InstanceType<PhotoSwipeLightboxModule['default']>;

type GallerySize = { w: number; h: number };
type GalleryMeta = { src: string; w: number; h: number; cls: string };

type Countdown = {
  label: string;
  value: string;
};

@Component({
  selector: 'tj-invitation',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf, RevealOnScrollDirective],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss'
})
export class InvitationComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly now = signal(Date.now());

  @ViewChild('pswpGallery', { read: ElementRef })
  private readonly pswpGallery?: ElementRef<HTMLElement>;

  private pswp?: PhotoSwipeLightboxType;

  @Input({ required: true }) wedding!: Wedding;
  @Input({ required: true }) guest!: Guest;

  private normalizeShortName(value: string): string {
    const cleaned = (value ?? '').trim().replace(/\s+/g, ' ');
    if (!cleaned) return '';

    const parts = cleaned.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} ${parts[1]}`;

    const commonSecondNames = new Set([
      'maria',
      'jose',
      'juan',
      'ana',
      'luis',
      'carlos',
      'andres',
      'fernando',
      'eduardo',
      'johana',
      'javier',
      'sebastian',
      'camilo',
      'daniel',
      'nicolas',
      'sofia',
      'natalia',
      'marcela',
      'alejandra'
    ]);

    if (parts.length === 3) {
      const second = parts[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const apellido = commonSecondNames.has(second) ? parts[2] : parts[1];
      return `${parts[0]} ${apellido}`;
    }

    return `${parts[0]} ${parts[parts.length - 2]}`;
  }

  private baseGuestName(): string {
    const raw = String(this.guest?.name ?? '').trim();
    const base = raw.replace(/\s+e\s+hijo(s)?\s*$/i, '').trim();
    return this.normalizeShortName(base) || base;
  }

  private childrenCount(): number {
    const fromCount = Number(this.guest?.childrenCount ?? 0);
    if (Number.isFinite(fromCount) && fromCount > 0) return Math.floor(fromCount);

    const name = String(this.guest?.name ?? '');
    if (/\s+e\s+hijo\s*$/i.test(name)) return 1;
    if (/\s+e\s+hijos\s*$/i.test(name)) return 2;
    return 0;
  }

  private hasChildren(): boolean {
    return this.childrenCount() > 0;
  }

  get passengerExclusiveNote(): string {
    const name = this.baseGuestName() || 'Invitado';
    const kids = this.childrenCount();
    const suffix = kids === 1 ? ' y tu hijo' : kids > 1 ? ' y tus hijos' : '';
    return `${name}, queremos una boda íntima, para que así continúe, esta invitación es exclusiva para ti${suffix}.`;
  }

  get passengerTotalNote(): string {
    const total = Math.max(1, Number(this.guest?.allowedGuests ?? 1) || 1);
    if (total === 1) return 'En total, 1 persona puede asistir con tu invitación.';
    return `En total, ${total} personas pueden asistir con tu invitación.`;
  }

  get welcomeAboardText(): string {
    const total = Math.max(1, Number(this.guest?.allowedGuests ?? 1) || 1);
    return total === 1 ? 'Bienvenido a bordo' : 'Bienvenidos a bordo';
  }

  readonly galleryImages: string[] = [
    'assets/images/galery/M&D-3.jpg',
    'assets/images/galery/M&D-4.jpg',
    'assets/images/galery/M&D-5.jpg',
    'assets/images/galery/M&D-8.jpg',
    'assets/images/galery/M&D-10.jpg',
    'assets/images/galery/M&D-11.jpg',
    'assets/images/galery/M&D-14.jpg',
    'assets/images/galery/M&D-15.jpg',
    'assets/images/galery/M&D-16.jpg',
    'assets/images/galery/M&D-18.jpg',
    'assets/images/galery/M&D-19.jpg',
    'assets/images/galery/M&D-21.jpg',
    'assets/images/galery/M&D-22.jpg',
    'assets/images/galery/M&D-23.jpg',
    'assets/images/galery/M&D-26.jpg',
    'assets/images/galery/M&D-29.jpg',
    'assets/images/galery/M&D-30.jpg',
    'assets/images/galery/M&D-32.jpg'
  ];

  private readonly gallerySizes = signal<Record<string, GallerySize>>({});

  readonly galleryMeta = computed<GalleryMeta[]>(() => {
    const sizes = this.gallerySizes();
    return this.galleryImages.map((src, index) => {
      const size = sizes[src];
      return {
        src,
        w: size?.w ?? 1600,
        h: size?.h ?? 1067,
        cls: this.galleryTileClass(index)
      };
    });
  });

  galleryTileClass(index: number): string {
    const pattern = ['tile--hero', 'tile--tall', 'tile--small', 'tile--small', 'tile--wide', 'tile--small', 'tile--small', 'tile--wide'];
    return pattern[index % pattern.length];
  }

  private loadGallerySizes(): void {
    if (!this.galleryImages.length) return;

    this.galleryImages.forEach((src) => {
      if (this.gallerySizes()[src]) return;

      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        const w = img.naturalWidth || 1600;
        const h = img.naturalHeight || 1067;
        this.gallerySizes.update((current) => ({
          ...current,
          [src]: { w, h }
        }));
      };
      img.src = src;
    });
  }

  constructor() {
    timer(0, 1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.now.set(Date.now()));

    this.destroyRef.onDestroy(() => {
      this.pswp?.destroy();
      this.pswp = undefined;
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const host = this.pswpGallery?.nativeElement;
    if (!host) return;

    this.loadGallerySizes();

    const mod = (await import('photoswipe/lightbox')) as PhotoSwipeLightboxModule;
    const PhotoSwipeLightbox = mod.default;

    this.pswp = new PhotoSwipeLightbox({
      gallery: host,
      children: 'a',
      pswpModule: () => import('photoswipe')
    });

    this.pswp.init();
  }

  readonly target = computed(() => new Date(this.wedding?.date ?? Date.now()).getTime());

  readonly isEventDay = computed(() => {
    const diff = this.target() - this.now();
    return diff <= 0;
  });

  readonly countdown = computed<Countdown[]>(() => {
    const diffMs = Math.max(0, this.target() - this.now());
    const totalSeconds = Math.floor(diffMs / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const format = (n: number) => String(n).padStart(2, '0');

    return [
      { label: 'Días', value: String(days) },
      { label: 'Horas', value: format(hours) },
      { label: 'Min', value: format(minutes) },
      { label: 'Seg', value: format(seconds) }
    ];
  });

  readonly rsvpHref = computed(() => {
    const explicit = (this.wedding?.rsvpUrl ?? '').trim();

    const defaultPhone = '573160512666';
    const normalizePhone = (value: string) => value.replace(/\D/g, '');
    const extractPhoneFromWhatsAppUrl = (value: string): string | null => {
      try {
        const url = new URL(value);
        const isWaMe = /(^|\.)wa\.me$/i.test(url.hostname);
        if (!isWaMe) return null;
        const pathPhone = normalizePhone(url.pathname.replace(/^\//, ''));
        return pathPhone || null;
      } catch {
        return null;
      }
    };

    const explicitWhatsAppPhone = explicit ? extractPhoneFromWhatsAppUrl(explicit) : null;
    if (explicit && !explicitWhatsAppPhone) return explicit;

    const phone = explicitWhatsAppPhone ?? defaultPhone;

    const weddingNames = this.wedding?.names ?? 'la boda';
    const guestName = this.guest?.name ?? '';
    const allowedGuests = this.guest?.allowedGuests;
    const childrenCount = this.guest?.childrenCount;
    const adultsCount =
      typeof allowedGuests === 'number' && typeof childrenCount === 'number'
        ? Math.max(allowedGuests - childrenCount, 0)
        : undefined;

    const passengersText =
      typeof allowedGuests === 'number'
        ? `Pasajeros: ${allowedGuests}` +
          (typeof childrenCount === 'number'
            ? ` (${typeof adultsCount === 'number' ? adultsCount : '0'} adulto(s) y ${childrenCount} niño(s))`
            : '')
        : '';

    const message = [
      `Hola ${weddingNames},`,
      'quiero hacer mi check-in y confirmar mi asistencia.',
      guestName ? `Soy ${guestName}.` : '',
      passengersText,
      'Gracias.'
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  });
}
