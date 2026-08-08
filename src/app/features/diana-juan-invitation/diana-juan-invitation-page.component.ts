import { NgClass, NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AfterViewInit, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, timer } from 'rxjs';

type GuestGroup = 'amigos' | 'familia';
type GuestGender = 'm' | 'f' | 'x';

interface GuestProfile {
  slug: string;
  name: string;
  relation: string;
  group: GuestGroup;
  gender: GuestGender;
  allowedGuests: number;
  companionFirstName?: string;
}

interface GalleryImageItem {
  key: string;
  alt: string;
  src: string;
}

const COMPANION_FIRST_NAME_BY_SLUG: Record<string, string> = {
  'roberto-grajales': 'Noralba Diaz',
  'angee-camila-garcia-santa': 'Isabela García',
  'maria-angela-grajales': 'Rosa Grajales',
  'ana-milena-grajales': 'Víctor Merchán',
  'bibiana-lujan': 'Diego Morales',
  'angelica-montoya': 'Danilo Arenas',
  'anny-arias': 'Hernan Jurado',
  'alejandra-gallego': 'Paola Gallego',
  'luz-nelly-lopez': 'Mauricio Bárcenas',
  'melba-lopez': 'Reinaldo Blanco',
  'marcel-ribero': 'Laura Correa',
  'david-hernandez': 'Lizeth Pinilla',
  'ana-reyes': 'Hugo Visbal',
  'daniel-sinza': 'Sara Pedraza',
  'marvin-arrieta': 'Laura Buitrago',
  'maritza-moreno': 'Alejandro Villada',
  'mery-betancourt': 'Damaris Lopez',
  'johan-barcenas': 'Laura Galeano',
  'esposos-iucumi': 'Familia',
  'familia-fonseca-lopez': 'Familia',
  'familia-lopez-gutierrez': 'Familia'
};

const INVITATION_MEMBER_NAMES_BY_SLUG: Record<string, string[]> = {
  'nicolas-barcenas': ['Nicolás Bárcenas', 'Cecilia Cortés', 'Alfonso Bárcenas']
};

const DISPLAY_NAME_BY_SLUG: Record<string, string> = {
  'luz-nelly-lopez': 'Nelly López',
  'mauricio-barcenas': 'Mauricio Bárcenas',
  'nicolas-barcenas': 'Nicolás Bárcenas',
  'cecilia-cortes': 'Cecilia Cortés',
  'alfonso-barcenas': 'Alfonso Bárcenas',
  'maria-angela-grajales': 'María Ángela Grajales',
  'ana-milena-grajales': 'Ana Milena Grajales',
  'victor-merchan': 'Víctor Merchán',
  'angee-camila-garcia-santa': 'Angee Camila García',
  'isabela-garcia': 'Isabela García',
  'esposos-iucumi': 'Esposos Lucumí',
  'esposos-lucumi': 'Esposos Lucumí'
};

const RAW_GUESTS: Array<Omit<GuestProfile, 'slug'>> = [
  { name: 'Roberto Grajales', relation: 'Papa de la novia', group: 'familia', gender: 'm', allowedGuests: 2 },
  { name: 'Noralba Diaz', relation: 'Mama de la novia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Carolina Santa', relation: 'Hermana de la novia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Angee Camila Garcia Santa', relation: 'Sobrina de la novia', group: 'familia', gender: 'f', allowedGuests: 2 },
  { name: 'Isabela Garcia', relation: 'Sobrina de la novia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Maria Angela Grajales', relation: 'Abuela de la novia', group: 'familia', gender: 'f', allowedGuests: 2 },
  { name: 'Rosa Grajales', relation: 'Tia de la novia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Blanca Gallego', relation: 'Tia de la novia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Jonathan Grajales Gallego', relation: 'Primo de la novia', group: 'familia', gender: 'm', allowedGuests: 1 },
  { name: 'Ana Milena Grajales', relation: 'Prima de la novia', group: 'familia', gender: 'f', allowedGuests: 2 },
  { name: 'Victor Merchan', relation: 'Primo de la novia', group: 'familia', gender: 'm', allowedGuests: 1 },
  { name: 'Bibiana Lujan', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 2 },
  { name: 'Diego Morales', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Angelica Montoya', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 2 },
  { name: 'Danilo Arenas', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Aura Ochoa', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Anny Arias', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 2 },
  { name: 'Hernan Jurado', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Juliany Marin', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Alejandra Gallego', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 2 },
  { name: 'Paola Gallego', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Monica Manrique', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Luz Nelly Lopez', relation: 'Mama del novio', group: 'familia', gender: 'f', allowedGuests: 2 },
  { name: 'Mauricio Barcenas', relation: 'Papa del novio', group: 'familia', gender: 'm', allowedGuests: 1 },
  { name: 'Nicolas Barcenas', relation: 'Abuelo del novio', group: 'familia', gender: 'm', allowedGuests: 3 },
  { name: 'Cecilia Cortes', relation: 'Abuela del novio', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Alfonso Barcenas', relation: 'Tio del novio', group: 'familia', gender: 'm', allowedGuests: 1 },
  { name: 'Manuel Cortes', relation: 'Tio del novio', group: 'familia', gender: 'm', allowedGuests: 1 },
  { name: 'Melba Lopez', relation: 'Tia del novio', group: 'familia', gender: 'f', allowedGuests: 2 },
  { name: 'Reinaldo Blanco', relation: 'Tio del novio', group: 'familia', gender: 'm', allowedGuests: 1 },
  { name: 'Laura Puentes', relation: 'Prima del novio', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Marcel Ribero', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 2 },
  { name: 'Laura Correa', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'David Hernandez', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 2 },
  { name: 'Lizeth Pinilla', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Diego Hernandez', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Guadalupe Casallas', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Mariana Cardenas', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Ana Reyes', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 2 },
  { name: 'Hugo Visbal', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Daniel Sinza', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 2 },
  { name: 'Sara Pedraza', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Esposos Iucumi', relation: 'Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 },
  { name: 'Marvin Arrieta', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 2 },
  { name: 'Laura Buitrago', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Raul Suarez', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Angela Buitrago', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Maritza Moreno', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 2 },
  { name: 'Alejandro Villada', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Mery Betancourt', relation: 'Abuela del novio', group: 'familia', gender: 'f', allowedGuests: 2 },
  { name: 'Damaris Lopez', relation: 'Familia del novio', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'John Alexander Barbosa', relation: 'Amigo', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Johan Barcenas', relation: 'Hermano del novio', group: 'familia', gender: 'm', allowedGuests: 2 },
  { name: 'Laura Galeano', relation: 'Cunada del novio', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Familia Fonseca Lopez', relation: 'Tios del novio', group: 'familia', gender: 'x', allowedGuests: 3 },
  { name: 'Valentina Montenegro', relation: 'Prima', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Veronica Zapata', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Sandra Areiza', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Amina Diaz', relation: 'Amiga', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Familia Lopez Gutierrez', relation: 'Tios', group: 'familia', gender: 'x', allowedGuests: 4 }
];

const GUESTS_SOURCE: GuestProfile[] = RAW_GUESTS.map((entry) => ({
  ...entry,
  slug: String(entry.name)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}));

@Component({
  selector: 'tj-diana-juan-invitation-page',
  standalone: true,
  imports: [NgIf, NgClass, NgFor],
  templateUrl: './diana-juan-invitation-page.component.html',
  styleUrl: './diana-juan-invitation-page.component.scss'
})
export class DianaJuanInvitationPageComponent implements AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly eventDate = new Date('2026-09-06T15:00:00-05:00').getTime();
  private readonly now = signal(Date.now());
  readonly selectedGuest = signal<GuestProfile | null>(null);
  readonly galleryItems: GalleryImageItem[] = [
    { key: 'img-4627', alt: 'Diana y Juan en un abrazo', src: '/assets/images/diana-juan/IMG_4627.jpg' },
    { key: 'img-4333', alt: 'Diana y Juan en retrato editorial', src: '/assets/images/diana-juan/IMG_4333.jpg' },
    { key: 'img-4577', alt: 'Diana y Juan en primer plano', src: '/assets/images/diana-juan/IMG_4577.jpg' },
    { key: 'img-4581', alt: 'Diana y Juan en sesión romántica', src: '/assets/images/diana-juan/IMG_4581.jpg' },
    { key: 'img-4765', alt: 'Diana y Juan celebrando su amor', src: '/assets/images/diana-juan/IMG_4765.jpg' },
    { key: 'img-4307', alt: 'Diana y Juan en foto espontánea', src: '/assets/images/diana-juan/IMG_4307.jpg' },
    { key: 'img-4326', alt: 'Diana y Juan en retrato natural', src: '/assets/images/diana-juan/IMG_4326.jpg' },
    { key: 'img-4393', alt: 'Diana y Juan en detalle artístico', src: '/assets/images/diana-juan/IMG_4393.jpg' },
    { key: 'img-4434', alt: 'Diana y Juan en composición elegante', src: '/assets/images/diana-juan/IMG_4434.jpg' },
    { key: 'img-4650', alt: 'Diana y Juan en escalera monumental', src: '/assets/images/diana-juan/IMG_4650.jpg' },
    { key: 'img-4667', alt: 'Diana y Juan al atardecer', src: '/assets/images/diana-juan/IMG_4667.jpg' },
    { key: 'img-4710', alt: 'Diana y Juan en retrato íntimo', src: '/assets/images/diana-juan/IMG_4710.jpg' },
    { key: 'img-4745', alt: 'Diana y Juan en encuadre floral', src: '/assets/images/diana-juan/IMG_4745.jpg' }
  ];
  readonly galleryLeadImage = this.galleryItems[0] ?? null;
  readonly galleryGridItems = this.galleryItems.slice(1);
  readonly featuredGalleryIndex = signal(0);
  readonly featuredGalleryImage = computed<GalleryImageItem>(() => {
    return this.galleryItems[this.featuredGalleryIndex()] ?? this.galleryItems[0];
  });
  readonly activeGalleryKey = signal<string | null>(null);
  readonly activeGalleryImage = computed<GalleryImageItem | null>(() => {
    const key = this.activeGalleryKey();
    if (!key) return null;
    return this.galleryItems.find((item) => item.key === key) ?? null;
  });
  readonly isGalleryImageLoading = signal(false);
  readonly galleryImageError = signal(false);
  readonly lightboxTouchStartX = signal<number | null>(null);
  readonly invitationOpened = signal(false);
  readonly invitationOpening = signal(false);
  private revealObserver: IntersectionObserver | null = null;
  private coverTimer: ReturnType<typeof setTimeout> | null = null;

  openInvitationCover(): void {
    if (this.invitationOpened() || this.invitationOpening()) return;
    this.invitationOpening.set(true);
    this.coverTimer = setTimeout(() => {
      this.invitationOpened.set(true);
      this.invitationOpening.set(false);
      this.coverTimer = null;
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 860);
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    timer(4800, 4800)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.activeGalleryKey()) return;
        this.advanceFeaturedGallery();
      });

    if (!('IntersectionObserver' in window)) {
      return;
    }

    const root = document.querySelector('.cw-page');
    if (!root) return;

    const selectors = [
      '.cw-hero__text',
      '.cw-hero__centerpiece',
      '.cw-countdown',
      '.cw-services',
      '.cw-services .cw-card',
      '.cw-gallery',
      '.cw-gallery__lead',
      '.cw-gallery__thumb',
      '.cw-sobres',
      '.cw-sobres__card',
      '.cw-contact',
      '.cw-footer-band'
    ];

    const revealElements = Array.from(root.querySelectorAll<HTMLElement>(selectors.join(', ')));
    if (revealElements.length === 0) return;

    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.classList.add('is-visible');
        this.revealObserver?.unobserve(target);
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    });

    revealElements.forEach((element, index) => {
      element.classList.add('cw-reveal');
      element.style.setProperty('--cw-reveal-delay', `${(index % 6) * 55}ms`);
      this.revealObserver?.observe(element);
    });

    this.destroyRef.onDestroy(() => {
      this.revealObserver?.disconnect();
      this.revealObserver = null;
      if (this.coverTimer) {
        clearTimeout(this.coverTimer);
        this.coverTimer = null;
      }
    });
  }

  heroBackgroundStyle(): string {
    const isMobile = typeof window !== 'undefined' && (
      window.innerWidth <= 640 ||
      /android|iphone|ipad|ipod|mobile/i.test(window.navigator.userAgent)
    );
    const imagePath = isMobile
      ? '/assets/images/diana-juan/IMG_4577.jpg'
      : '/assets/images/diana-juan/IMG_4333.jpg';

    if (isMobile) {
      return `url('${imagePath}') center bottom / 135% auto no-repeat`;
    }

    return `url('${imagePath}') center 62% / cover no-repeat`;
  }

  isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 640 || /android|iphone|ipad|ipod|mobile/i.test(window.navigator.userAgent);
  }

  private readonly galleryOrder = this.galleryItems.map((item) => item.key);

  scrollToServiceCard(target: 'fecha' | 'lugar' | 'vestuario'): void {
    const id = `service-card-${target}`;
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openGalleryImage(target: string): void {
    const targetIndex = this.galleryOrder.indexOf(target);
    if (targetIndex >= 0) {
      this.featuredGalleryIndex.set(targetIndex);
    }
    this.isGalleryImageLoading.set(true);
    this.galleryImageError.set(false);
    this.activeGalleryKey.set(target);
  }

  setFeaturedGallery(index: number): void {
    const normalizedIndex = ((index % this.galleryItems.length) + this.galleryItems.length) % this.galleryItems.length;
    this.featuredGalleryIndex.set(normalizedIndex);
  }

  closeGalleryImage(): void {
    this.activeGalleryKey.set(null);
    this.isGalleryImageLoading.set(false);
    this.galleryImageError.set(false);
  }

  showPreviousGalleryImage(): void {
    const key = this.activeGalleryKey();
    if (!key) return;

    const currentIndex = this.galleryOrder.indexOf(key);
    const previousIndex = (currentIndex - 1 + this.galleryOrder.length) % this.galleryOrder.length;
    this.openGalleryImage(this.galleryOrder[previousIndex]);
  }

  showNextGalleryImage(): void {
    const key = this.activeGalleryKey();
    if (!key) return;

    const currentIndex = this.galleryOrder.indexOf(key);
    const nextIndex = (currentIndex + 1) % this.galleryOrder.length;
    this.openGalleryImage(this.galleryOrder[nextIndex]);
  }

  private advanceFeaturedGallery(): void {
    this.setFeaturedGallery(this.featuredGalleryIndex() + 1);
  }

  onLightboxTouchStart(event: TouchEvent): void {
    if (event.touches.length !== 1) return;
    this.lightboxTouchStartX.set(event.touches[0].clientX);
  }

  onLightboxTouchEnd(event: TouchEvent): void {
    const startX = this.lightboxTouchStartX();
    this.lightboxTouchStartX.set(null);
    if (startX === null || event.changedTouches.length === 0) return;

    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;
    const threshold = 45;
    if (Math.abs(deltaX) < threshold) return;

    if (deltaX < 0) {
      this.showNextGalleryImage();
      return;
    }

    this.showPreviousGalleryImage();
  }

  onGalleryImageLoad(): void {
    this.isGalleryImageLoading.set(false);
    this.galleryImageError.set(false);
  }

  onGalleryImageError(): void {
    this.isGalleryImageLoading.set(false);
    this.galleryImageError.set(true);
  }

  navigateToSection(event: Event, sectionId: 'wedding' | 'servicios' | 'galeria' | 'contacto'): void {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - 12;
    window.scrollTo({ top, behavior: 'smooth' });
    window.history.replaceState(null, '', `#${sectionId}`);
  }

  private readonly remainingMs = computed(() => Math.max(0, this.eventDate - this.now()));

  readonly daysRemaining = computed(() => {
    return Math.floor(this.remainingMs() / (1000 * 60 * 60 * 24));
  });

  readonly hoursRemaining = computed(() => Math.floor(this.remainingMs() / (1000 * 60 * 60)) % 24);
  readonly minutesRemaining = computed(() => Math.floor(this.remainingMs() / (1000 * 60)) % 60);
  readonly secondsRemaining = computed(() => Math.floor(this.remainingMs() / 1000) % 60);

  readonly isEventDay = computed(() => this.daysRemaining() === 0);

  readonly isFriendsView = computed(() => this.selectedGuest()?.group === 'amigos');
  readonly isFamilyView = computed(() => this.selectedGuest()?.group === 'familia');

  readonly guestDisplayName = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) return 'Invitado especial';
    return this.displayGuestName(invited);
  });

  readonly heroGuestTitle = computed(() => {
    return this.guestDisplayName();
  });

  readonly heroNarrative = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) {
      return 'Con mucha alegría queremos invitarte a celebrar con nosotros el día más especial de nuestras vidas. Acompáñanos a unir nuestras almas y a compartir este momento lleno de amor, risas y nuevas historias.';
    }

    return this.isPluralContext(invited)
      ? 'Con mucha alegría queremos invitarles a celebrar con nosotros el día más especial de nuestras vidas. Acompáñenos a unir nuestras almas y a compartir este momento lleno de amor, risas y nuevas historias.'
      : 'Con mucha alegría queremos invitarte a celebrar con nosotros el día más especial de nuestras vidas. Acompáñanos a unir nuestras almas y a compartir este momento lleno de amor, risas y nuevas historias.';
  });

  readonly dateCardText = computed(() => {
    const invited = this.selectedGuest();
    const suffix = invited
      ? `${this.waitForYouText(invited)} con mucho amor, ${this.guestMention(invited)}.`
      : 'Un día preparado con amor para celebrarlo contigo.';
    return `06 de septiembre de 2026. ${suffix}`;
  });

  readonly datePrimaryText = computed(() => '06 de Septiembre 2026 - 3:00 PM');

  readonly dateSecondaryText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) return 'Un día preparado con amor para celebrarlo contigo.';
    return this.isPluralContext(invited)
      ? 'Un día preparado con amor para celebrarlo con ustedes.'
      : 'Un día preparado con amor para celebrarlo contigo.';
  });

  readonly locationCardText = computed(() => {
    const invited = this.selectedGuest();
    const personal = invited ? `${this.personalGreeting(invited)},` : 'Hola invitado especial,';
    const canSearch = invited ? this.canSearchVerb(invited) : 'puedes';
    return `La Hoguera, Llano Grande. ${personal} ${canSearch} buscarlo asi en Waze para llegar sin contratiempos.`;
  });

  readonly locationPrimaryText = computed(() => 'La Hoguera, Llano Grande');

  readonly locationSecondaryText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) return 'Puedes abrir el GPS para llegar sin contratiempos.';
    return this.isPluralContext(invited)
      ? 'Pueden abrir el GPS para llegar sin contratiempos.'
      : 'Puedes abrir el GPS para llegar sin contratiempos.';
  });

  readonly locationGpsHref = computed(() => {
    const destination = 'La Hoguera, Llano Grande, Rionegro, Antioquia, Colombia';
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  });

  readonly calendarEventHref = computed(() => {
    const title = 'Boda Marcela y Sebastian';
    const details = 'Ceremonia a las 3:00 PM. Nos vemos en nuestra boda.';
    const location = 'La Hoguera, Llano Grande, Rionegro, Antioquia';
    const start = '20260906T150000';
    const end = '20260906T220000';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  });

  readonly dressCardText = computed(() => {
    const invited = this.selectedGuest();
    const pronoun = invited && this.isPluralContext(invited) ? 'Queremos que se sientan cómodos' : 'Queremos que te sientas cómodo';
    return `${pronoun} para disfrutar nuestra celebración al aire libre. Nos reservamos los colores blanco y beige.`;
  });

  readonly ceremonyText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) {
      return '3:00 pm, la ceremonia iniciará súper puntual. Es el momento más importante para nosotros y tú cumples un papel muy especial en esta historia.';
    }

    if (this.isPluralContext(invited)) {
      return '3:00 pm, la ceremonia iniciará súper puntual. Es el momento más importante para nosotros y ustedes cumplen un papel muy especial en esta historia.';
    }

    const role = this.relationInSentence(invited);
    return `3:00 pm, la ceremonia iniciará súper puntual. Es el momento más importante para nosotros y tú, ${role}, cumples un papel muy especial en esta historia.`;
  });

  readonly travelAdviceText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) {
      return 'Si vienes desde Medellín, te recomendamos salir con tiempo para llegar con calma y disfrutar la bienvenida desde el primer momento.';
    }

    return `Si ${this.comeVerb(invited)} desde Medellín, ${this.leaveOnTimeText(invited)} para llegar con calma y disfrutar cada detalle desde el inicio.`;
  });

  readonly planArrivalText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) {
      return 'La ceremonia y la recepción serán en el mismo lugar: La Hoguera, Llano Grande.';
    }

    return this.isPluralContext(invited)
      ? 'Ceremonia y recepción serán en el mismo lugar, para que se acomoden con tranquilidad al llegar.'
      : 'Ceremonia y recepción serán en el mismo lugar, para que te acomodes con tranquilidad al llegar.';
  });

  readonly planTimingText = computed(() => {
    const invited = this.selectedGuest();
    return invited && this.isPluralContext(invited)
        ? 'Les sugerimos llegar 20 minutos antes de las 3:00 pm para recibirles y comenzar puntuales.'
        : 'Te sugerimos llegar 20 minutos antes de las 3:00 pm para recibirte y comenzar puntuales.';
  });

  readonly planConfirmationHintText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) {
      return 'Si necesitan apoyo con la llegada, escríbannos por WhatsApp y con gusto les ayudamos.';
    }

    return this.isPluralContext(invited)
      ? 'Si necesitan apoyo con la llegada o parqueo, escríbannos por WhatsApp y les ayudamos.'
      : 'Si necesitas apoyo con la llegada o parqueo, escríbenos por WhatsApp y te ayudamos.';
  });

  readonly locationLogisticsText = computed(() => {
    const invited = this.selectedGuest();
    const opener = invited ? `Para ${this.guestMention(invited)},` : 'Para todos nuestros invitados,';
    return `${opener} la ceremonia y la recepcion seran en el mismo lugar para que compartamos cada momento juntos.`;
  });

  readonly confirmationText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) {
      return 'Confirma tu asistencia por WhatsApp antes del 15 de julio de 2026 para reservar tu lugar.';
    }

    return this.isPluralContext(invited)
      ? 'Confirmen su asistencia por WhatsApp antes del 15 de julio de 2026 para reservar sus lugares.'
      : 'Confirma tu asistencia por WhatsApp antes del 15 de julio de 2026 para reservar tu lugar.';
  });

  readonly rsvpSupportText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) {
      return 'Si tienes dudas sobre llegada o acompañantes, escribenos por WhatsApp y te ayudamos.';
    }

    return this.isPluralContext(invited)
      ? 'Si necesitan ayuda con la llegada o cambios, escribannos por WhatsApp y les ayudamos.'
      : 'Si necesitas ayuda con la llegada o cambios, escribenos por WhatsApp y te ayudamos.';
  });

  readonly confirmationPolicyText = computed(() => {
    const invited = this.selectedGuest();
    if (invited && this.isPluralContext(invited)) {
      return 'Esperamos contar con su presencia, la invitacion es valida unicamente para quienes aparecen en ella.';
    }
    return 'Esperamos contar con tu presencia, la invitacion es valida unicamente para quienes aparecen en ella.';
  });

  readonly contactText = computed(() => {
    const invited = this.selectedGuest();
    const intro = invited ? `${this.personalGreeting(invited)},` : 'Hola invitado especial,';
    const confirm = invited ? this.confirmAction(invited).toLowerCase() : 'confirma';
    const accompany = invited && this.isPluralContext(invited) ? 'acompañarles' : 'acompañarte';
    return `${intro} ${confirm} por WhatsApp al 3128801240 antes del 15 de julio de 2026. Estaremos felices de ${accompany} en todo lo que necesiten.`;
  });

  readonly footerThanksText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) {
      return 'Gracias por ser parte de esta promesa de amor. Tu compania hara este dia aun mas inolvidable.';
    }
    const base = invited.group === 'familia'
      ? 'Gracias por abrazar nuestra historia desde la familia.'
      : 'Gracias por caminar con nosotros desde la amistad.';
    return `${base} ${this.presenceWord(invited)} hara este dia aun mas inolvidable, ${this.guestMention(invited)}.`;
  });

  readonly footerLocationText = computed(() => {
    const invited = this.selectedGuest();
    if (!invited) {
      return 'La Hoguera, Llano Grande. Si vienes desde Medellín, te recomendamos salir con tiempo.';
    }

    if (this.isPluralContext(invited)) {
      return 'La Hoguera, Llano Grande. Si vienen desde Medellín, les recomendamos salir con tiempo.';
    }

    return 'La Hoguera, Llano Grande. Si vienes desde Medellín, te recomendamos salir con tiempo.';
  });

  readonly rsvpHref = computed(() => {
    const invited = this.selectedGuest();
    const isPlural = invited ? this.isPluralContext(invited) : false;
    const guestName = this.guestDisplayName();
    const message = [
      'Hola Marcela y Sebastian,',
      isPlural ? `Somos ${guestName}` : `Soy ${guestName}`,
      isPlural
        ? 'y queremos confirmar nuestra asistencia a su boda.'
        : 'y quiero confirmar mi asistencia a su boda.',
      'Muchas gracias por la invitación.',
      isPlural
        ? 'Estamos encantados de poder acompañarles.'
        : 'Estoy encantado de poder acompañarles.'
    ].filter(Boolean).join('\n');

    return `https://wa.me/573128801240?text=${encodeURIComponent(message)}`;
  });

  private slugify(value: string): string {
    return String(value ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private parseGuestsCount(raw: string | null): number | null {
    if (!raw) return null;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return null;
    if (parsed < 1) return null;
    return Math.floor(parsed);
  }

  private humanizeSlug(slug: string): string {
    return String(slug ?? '')
      .trim()
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  private displayNameFromRaw(value: string): string {
    const key = this.slugify(value);
    return DISPLAY_NAME_BY_SLUG[key] ?? String(value ?? '').trim();
  }

  private joinDisplayNames(names: string[]): string {
    const formatted = names.map((name) => this.displayNameFromRaw(name)).filter(Boolean);
    if (!formatted.length) return '';
    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) {
      const [first, second] = formatted;
      return `${first} y ${second}`;
    }

    const last = formatted[formatted.length - 1];
    return `${formatted.slice(0, -1).join(', ')} y ${last}`;
  }

  private joinCoupleNames(left: string, right: string): string {
    const first = this.displayNameFromRaw(left);
    const second = this.displayNameFromRaw(right);
    const separator = /^i|^hi/.test(this.normalizeText(second)) ? 'e' : 'y';
    return `${first} ${separator} ${second}`;
  }

  private inferGroup(relation: string, explicit: string | null): GuestGroup {
    const normalizedRelation = relation.toLowerCase();
    const normalizedExplicit = String(explicit ?? '').toLowerCase();
    if (normalizedExplicit.includes('amig')) return 'amigos';
    if (normalizedExplicit.includes('famil')) return 'familia';
    if (normalizedRelation.includes('amig')) return 'amigos';
    return 'familia';
  }

  private inferGender(relation: string, explicit: string | null): GuestGender {
    const normalizedExplicit = String(explicit ?? '').toLowerCase();
    if (normalizedExplicit === 'm' || normalizedExplicit === 'masculino' || normalizedExplicit === 'hombre') return 'm';
    if (normalizedExplicit === 'f' || normalizedExplicit === 'femenino' || normalizedExplicit === 'mujer') return 'f';

    const normalized = relation.toLowerCase();
    const femaleHints = ['mama', 'madre', 'hermana', 'tia', 'prima', 'abuela', 'cunada', 'sobrina', 'esposa'];
    const maleHints = ['papa', 'padre', 'hermano', 'tio', 'primo', 'abuelo', 'sobrino', 'esposo'];

    if (femaleHints.some((hint) => normalized.includes(hint))) return 'f';
    if (maleHints.some((hint) => normalized.includes(hint))) return 'm';
    return 'x';
  }

  private relationMessage(guest: GuestProfile): string {
    const relation = guest.relation.toLowerCase();
    const isPlural = this.isPluralContext(guest);
    const poss = this.possessiveWord(guest);
    const examplePronoun = isPlural ? 'su' : 'tu';
    if (relation.includes('mama') || relation.includes('papa')) {
      return `Gracias por guiarnos con tanto amor; ${examplePronoun} ejemplo es la raiz de este nuevo hogar que hoy empezamos.`;
    }
    if (relation.includes('abuela') || relation.includes('abuelo')) {
      return `${isPlural ? 'Su' : 'Tu'} carino y ${poss} legado ${isPlural ? 'son' : 'es'} un regalo para nosotros; hoy queremos honrar esa historia en este dia inolvidable.`;
    }
    if (relation.includes('herman') || relation.includes('primo') || relation.includes('prima') || relation.includes('tia') || relation.includes('tio')) {
      return isPlural
        ? 'Nos llena de alegria vivir este momento a su lado, porque la familia hace que cada recuerdo sea mas profundo y especial.'
        : 'Nos llena de alegria vivir este momento a tu lado, porque la familia hace que cada recuerdo sea mas profundo y especial.';
    }
    if (relation.includes('amig')) {
      return isPlural
        ? 'Su amistad ha sido parte esencial de nuestra historia y queremos celebrar este capitulo con ustedes desde el corazon.'
        : 'Tu amistad ha sido parte esencial de nuestra historia y queremos celebrar este capitulo contigo desde el corazon.';
    }
    return isPlural
      ? 'Queremos que sean parte de este dia irrepetible para nosotros.'
      : 'Queremos que seas parte de este dia irrepetible para nosotros.';
  }

  private normalizeText(value: string): string {
    return String(value ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private isPluralGuest(guest: GuestProfile): boolean {
    return /^(familia|esposos)\b/i.test(guest.name) || guest.gender === 'x';
  }

  private isPluralContext(guest: GuestProfile): boolean {
    return this.isPluralGuest(guest) || guest.allowedGuests > 1;
  }

  private firstName(value: string): string {
    return String(value ?? '').trim().split(/\s+/).filter(Boolean)[0] ?? '';
  }

  private firstSurname(value: string): string {
    const parts = String(value ?? '').trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) return '';
    return parts[1];
  }

  private shortInvitationName(value: string): string {
    const first = this.firstName(value);
    const surname = this.firstSurname(value);
    return [first, surname].filter(Boolean).join(' ') || String(value ?? '').trim();
  }

  private groupedInvitationNames(guest: GuestProfile): string[] | null {
    const names = INVITATION_MEMBER_NAMES_BY_SLUG[guest.slug];
    if (!names?.length) return null;
    return names;
  }

  private guestCallName(guest: GuestProfile): string {
    const relation = this.normalizeText(guest.relation);
    const first = this.firstName(guest.name);
    const surname = this.firstSurname(guest.name);

    if (relation.includes('papa') || relation.includes('padre')) return 'Papa';
    if (relation.includes('mama') || relation.includes('madre')) return 'Mama';
    if (relation.includes('prima')) return `Primita ${first || guest.name}`;
    if (relation.includes('primo')) return `Primito ${first || guest.name}`;
    if (relation.includes('amig')) return [first, surname].filter(Boolean).join(' ') || guest.name;
    if (relation.includes('abuela')) return `Abuela ${first || guest.name}`;
    if (relation.includes('abuelo')) return `Abuelo ${first || guest.name}`;
    if (relation.includes('tia')) return `Tia ${first || guest.name}`;
    if (relation.includes('tio')) return `Tio ${first || guest.name}`;
    if (relation.includes('hermana')) return `Hermana ${first || guest.name}`;
    if (relation.includes('hermano')) return `Hermano ${first || guest.name}`;

    return first || guest.name;
  }

  private displayGuestName(guest: GuestProfile): string {
    const groupedNames = this.groupedInvitationNames(guest);
    if (groupedNames) {
      return this.joinDisplayNames(groupedNames);
    }

    const companion = this.knownCompanionFirstName(guest);
    if (companion && this.normalizeText(companion) !== 'familia') {
      return this.joinCoupleNames(guest.name, companion);
    }

    if (this.isPluralContext(guest)) {
      return this.displayNameFromRaw(guest.name);
    }

    return this.displayNameFromRaw(guest.name);
  }

  private companionFirstName(guest: GuestProfile): string {
    const fromProfile = String(guest.companionFirstName ?? '').trim();
    if (fromProfile) return fromProfile;

    const fromLookup = String(COMPANION_FIRST_NAME_BY_SLUG[guest.slug] ?? '').trim();
    if (fromLookup) return fromLookup;

    return '';
  }

  private knownCompanionFirstName(guest: GuestProfile): string | null {
    if (!this.isPluralContext(guest)) return null;
    if (/^familia\b/i.test(guest.name)) return null;
    if (this.groupedInvitationNames(guest)) return null;

    const fromProfile = String(guest.companionFirstName ?? '').trim();
    if (fromProfile) return fromProfile;

    const fromLookup = String(COMPANION_FIRST_NAME_BY_SLUG[guest.slug] ?? '').trim();
    return fromLookup || null;
  }

  private guestMention(guest: GuestProfile): string {
    return this.displayGuestName(guest);
  }

  private personalGreeting(guest: GuestProfile): string {
    const relation = this.normalizeText(guest.relation);
    if (this.isPluralContext(guest)) {
      const names = this.displayGuestName(guest);
      if (relation.includes('papa') || relation.includes('mama') || relation.includes('padre') || relation.includes('madre')) {
        return `Hola papitos ${names}`;
      }
      return `Hola ${names}`;
    }
    return `Hola ${this.guestCallName(guest)}`;
  }

  private withWho(guest: GuestProfile): string {
    return this.isPluralContext(guest) ? 'con ustedes' : 'contigo';
  }

  private invitationExclusivityText(guest?: GuestProfile | null, capitalize = false): string {
    const value = !guest || !this.isPluralContext(guest)
      ? 'esta invitacion es exclusiva para ti'
      : 'esta invitacion es exclusiva para ustedes';

    if (!capitalize) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  private liveVerb(guest: GuestProfile): string {
    return this.isPluralContext(guest) ? 'vivan' : 'vivas';
  }

  private confirmAction(guest: GuestProfile): string {
    return this.isPluralContext(guest) ? 'Confirmen' : 'Confirma';
  }

  private comeVerb(guest: GuestProfile): string {
    return this.isPluralContext(guest) ? 'vienen' : 'vienes';
  }

  private leaveOnTimeText(guest: GuestProfile): string {
    return this.isPluralContext(guest) ? 'salgan con tiempo' : 'sal con tiempo';
  }

  private canSearchVerb(guest: GuestProfile): string {
    return this.isPluralContext(guest) ? 'pueden' : 'puedes';
  }

  private waitForYouText(guest: GuestProfile): string {
    return this.isPluralContext(guest) ? 'Les esperamos' : 'Te esperamos';
  }

  private possessiveWord(guest: GuestProfile, capitalize = false): string {
    const value = this.isPluralContext(guest) ? 'su' : 'tu';
    if (!capitalize) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  private presenceWord(guest: GuestProfile): string {
    return this.isPluralContext(guest) ? 'Su presencia' : 'Tu presencia';
  }

  private welcomeWord(guest: GuestProfile): string {
    if (this.isPluralContext(guest)) return 'bienvenidos';
    if (guest.gender === 'f') return 'bienvenida';
    return 'bienvenido';
  }

  private relationInSentence(guest: GuestProfile): string {
    const relation = guest.relation.toLowerCase();
    if (relation.includes('amig')) {
      return 'como parte de nuestra amistad';
    }
    return `como ${relation}`;
  }

  constructor() {
    timer(0, 1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.now.set(Date.now()));

    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([params, query]) => {
        const routeGuest = params.get('guest') ?? '';
        const routeCount = this.parseGuestsCount(params.get('count'));
        const rawName = query.get('invitado') ?? query.get('guest') ?? query.get('nombre') ?? this.humanizeSlug(routeGuest);
        const normalizedSlug = this.slugify(routeGuest || rawName);

        const bySlug = GUESTS_SOURCE.find((entry) => entry.slug === normalizedSlug);
        if (bySlug) {
          this.selectedGuest.set({
            ...bySlug,
            allowedGuests: routeCount ?? bySlug.allowedGuests
          });
          return;
        }

        if (!rawName.trim()) {
          this.selectedGuest.set(null);
          return;
        }

        const relation = query.get('parentesco') ?? query.get('relacion') ?? 'Invitado especial';
        const customCount = routeCount ?? this.parseGuestsCount(query.get('personas') ?? query.get('cupos') ?? query.get('count'));
        const companion = query.get('acompanante') ?? query.get('companion') ?? '';
        const group = this.inferGroup(relation, query.get('tipo'));
        const gender = this.inferGender(relation, query.get('genero'));

        this.selectedGuest.set({
          slug: normalizedSlug || this.slugify(relation),
          name: rawName.trim(),
          relation: relation.trim(),
          group,
          gender,
          allowedGuests: customCount ?? 1,
          companionFirstName: this.shortInvitationName(companion)
        });
      });
  }
}
