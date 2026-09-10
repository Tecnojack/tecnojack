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
    return base;
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

  isPlural(): boolean {
    const total = Math.max(1, Number(this.guest?.allowedGuests ?? 1) || 1);
    if (total > 1) return true;
    if (this.childrenCount() > 0) return true;
    const raw = String(this.guest?.name ?? '').trim().toLowerCase();
    if (
      raw.startsWith('familia') ||
      raw.includes(' e hijo') ||
      raw.includes(' & ') ||
      raw.includes(' y ') ||
      raw.includes(' e ')
    ) {
      return true;
    }
    return false;
  }

  get passengerExclusiveNote(): string {
    const name = this.baseGuestName() || 'Invitado';
    if (this.isPlural()) {
      return `${name}, queremos una boda íntima, para que así continúe, esta invitación es exclusiva para ustedes.`;
    }
    const kids = this.childrenCount();
    const suffix = kids === 1 ? ' y tu hijo' : kids > 1 ? ' y tus hijos' : '';
    return `${name}, queremos una boda íntima, para que así continúe, esta invitación es exclusiva para ti${suffix}.`;
  }

  get passengerTotalNote(): string {
    const total = Math.max(1, Number(this.guest?.allowedGuests ?? 1) || 1);
    if (total === 1) {
      return 'En total, 1 persona puede asistir con esta invitación.';
    }
    return `En total, ${total} personas pueden asistir con esta invitación.`;
  }

  get welcomeAboardText(): string {
    return this.isPlural() ? 'Les damos la bienvenida' : 'Te damos la bienvenida';
  }

  get journeyKickerText(): string {
    return this.isPlural() ? 'Su viaje comienza aquí' : 'Tu viaje comienza aquí';
  }

  get checkinIntroText(): string {
    return this.isPlural()
      ? 'Ayúdennos a organizar el itinerario: confirmen su asistencia.'
      : 'Ayúdanos a organizar el itinerario: confirma tu asistencia.';
  }

  get checkinHelpText(): string {
    return this.isPlural()
      ? 'Su respuesta nos ayuda con el itinerario, logística y reservas.'
      : 'Tu respuesta nos ayuda con el itinerario, logística y reservas.';
  }

  get galleryIntroText(): string {
    return this.isPlural()
      ? 'Unas postales de nuestro viaje: aquí les mostramos algunas fotos que nos encantan y queremos compartir con ustedes. Toquen una para verla en grande, deslicen para navegar y hagan zoom.'
      : 'Unas postales de nuestro viaje: aquí te mostramos algunas fotos que nos encantan y queremos compartir contigo. Toca una para verla en grande, desliza para navegar y haz zoom.';
  }

  get giftIntroText(): string {
    return this.isPlural()
      ? 'Su presencia es nuestro mejor regalo, pero si desean hacernos un presente, les dejamos la opción de'
      : 'Tu presencia es nuestro mejor regalo, pero si deseas hacernos un presente, te dejamos la opción de';
  }

  get seatTitleText(): string {
    return this.isPlural() ? 'Sus asientos' : 'Tu asiento';
  }

  get seatKickerText(): string {
    return this.isPlural() ? 'Mensaje para su viaje' : 'Mensaje para tu viaje';
  }

  get seatDefaultText(): string {
    return this.isPlural()
      ? 'Sus asientos serán asignados al llegar. ¡Gracias por acompañarnos en este viaje!'
      : 'Tu asiento será asignado al llegar. ¡Gracias por acompañarnos en este viaje!';
  }

  @Input() customGalleryImages?: string[];
  @Input() heroImageUrl?: string;
  @Input() destinationImageUrl?: string;
  @Input() dressCodeImageUrl?: string;
  @Input() quoteText?: string;
  @Input() quoteAuthor?: string;

  get currentHeroImage(): string {
    return this.heroImageUrl || 'assets/images/fotos/main.jpg';
  }

  get currentDestinationImage(): string {
    return this.destinationImageUrl || 'assets/images/fotos/M&D-6.jpg';
  }

  get currentDressCodeImage(): string {
    return this.dressCodeImageUrl || 'assets/images/fotos/M&D-7.jpg';
  }

  get currentQuoteText(): string {
    return this.quoteText || '“Cuando te das cuenta de que quieres pasar el resto de tu vida con alguien, deseas que el resto de tu vida comience lo antes posible”.';
  }

  get currentQuoteAuthor(): string {
    return this.quoteAuthor || '— Cuando Harry encontró a Sally';
  }

  readonly defaultGalleryImages: string[] = [
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

  get galleryImages(): string[] {
    return this.customGalleryImages && this.customGalleryImages.length ? this.customGalleryImages : this.defaultGalleryImages;
  }



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

  colorSwatch(colorName: string): string {
    const map: Record<string, string> = {
      'azul rey profundo': '#1e3a8a',
      'azul rey': '#1e3a8a',
      'azul': '#1e3a8a',
      'rosa empolvado': '#d4a5a5',
      'rosa': '#d4a5a5',
      'rosado': '#d4a5a5',
      'terracota': '#c85a32',
      'terracotta': '#c85a32',
      'borgoña': '#6b1d2f',
      'borgona': '#6b1d2f',
      'vino': '#6b1d2f',
      'verde salvia': '#879f84',
      'verde': '#879f84',
      'salvia': '#879f84',
      'marfil / blanco': '#fdfbf7',
      'marfil/blanco': '#fdfbf7',
      'marfil': '#fdfbf7',
      'blanco': '#ffffff',
      'beige': '#e8dfd8'
    };

    const clean = String(colorName || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    return map[clean] || '#c6a75e';
  }

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

    const isPlural = this.isPlural();
    const message = [
      `Hola ${weddingNames},`,
      isPlural ? 'queremos confirmar nuestra asistencia.' : 'quiero confirmar mi asistencia.',
      guestName ? (isPlural ? `Somos ${guestName}.` : `Soy ${guestName}.`) : '',
      passengersText,
      'Gracias.'
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  });
}
