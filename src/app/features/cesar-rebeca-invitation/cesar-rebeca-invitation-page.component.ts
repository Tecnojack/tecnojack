import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { PassportComponent } from '../passport/passport.component';
import { InvitationComponent } from '../invitation/invitation.component';
import { Wedding } from '../../core/models/wedding.model';
import { Guest } from '../../core/models/guest.model';

type GuestGroup = 'amigos' | 'familia';
type GuestGender = 'm' | 'f' | 'x';

export interface GuestProfile {
  slug: string;
  name: string;
  relation: string;
  group: GuestGroup;
  gender: GuestGender;
  allowedGuests: number;
  companionFirstName?: string;
}

export const CESAR_REBECA_RAW_GUESTS: Array<Omit<GuestProfile, 'slug'>> = [
  { name: 'Francisco y Arelis', relation: 'Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 },
  { name: 'Martha Vega', relation: 'Familia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Luis Alberto Benavidez', relation: 'Familia', group: 'familia', gender: 'm', allowedGuests: 1 },
  { name: 'Carlos Benavidez', relation: 'Familia', group: 'familia', gender: 'm', allowedGuests: 2 },
  { name: 'Caleb Garcia', relation: 'Familia', group: 'familia', gender: 'm', allowedGuests: 1 },
  { name: 'Veronica Gutierrez', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Familia Polo Garcia', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 5 },
  { name: 'Elena Iriarte', relation: 'Familia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Carlos y Ena', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 2 },
  { name: 'Carmen Vega', relation: 'Familia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Berludis Nunez', relation: 'Familia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Pr. Alberto Hernandez y Esposa', relation: 'Pastores / Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 },
  { name: 'Familia Garcia Gonzalez', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 3 },
  { name: 'Familia Petro Ribon', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 4 },
  { name: 'Familia Vega Palacio', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 4 },
  { name: 'Julio Cesar Yepes', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Marly Ruiz', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Jorge Vega y Esposa', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 2 },
  { name: 'Alberto Vega y Esposa', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 2 },
  { name: 'Magdalena Vega', relation: 'Familia', group: 'familia', gender: 'f', allowedGuests: 1 },
  { name: 'Familia Zapata Gonzalez', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 2 },
  { name: 'Familia Cardenas Gonzalez', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 3 },
  { name: 'Beatriz Puerta', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Mariana Calle', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 2 },
  { name: 'Jenifer Hernandez', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Juliana Hernandez', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Jhon Carlos Garcia', relation: 'Familia', group: 'familia', gender: 'm', allowedGuests: 1 },
  { name: 'Familia Deosa Garcia', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 3 },
  { name: 'Aldair y Melissa', relation: 'Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 },
  { name: 'Jairo Loza', relation: 'Amigos', group: 'amigos', gender: 'm', allowedGuests: 1 },
  { name: 'Pr. William Castaneda y Esposa', relation: 'Pastores / Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 },
  { name: 'Familia Osorio Paez', relation: 'Familia', group: 'familia', gender: 'x', allowedGuests: 4 },
  { name: 'Sofia y Raul', relation: 'Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 },
  { name: 'Yessica y Hammer', relation: 'Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 },
  { name: 'Valentina Gonzalez', relation: 'Amigos', group: 'amigos', gender: 'f', allowedGuests: 1 },
  { name: 'Angie y Juan', relation: 'Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 },
  { name: 'Angel y Leidy', relation: 'Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 },
  { name: 'Erika y Camilo', relation: 'Amigos', group: 'amigos', gender: 'x', allowedGuests: 2 }
];

export const CESAR_REBECA_GUESTS_SOURCE: GuestProfile[] = CESAR_REBECA_RAW_GUESTS.map((entry) => ({
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
  selector: 'tj-cesar-rebeca-invitation-page',
  standalone: true,
  imports: [NgIf, PassportComponent, InvitationComponent],
  templateUrl: './cesar-rebeca-invitation-page.component.html',
  styleUrl: './cesar-rebeca-invitation-page.component.scss'
})
export class CesarRebecaInvitationPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly isOpen = signal(false);
  readonly selectedGuestProfile = signal<GuestProfile | null>(null);

  readonly cesarRebecaGallery: string[] = [
    'assets/images/cesar-rebe/img (1).jpeg',
    'assets/images/cesar-rebe/img (2).jpeg',
    'assets/images/cesar-rebe/img (3).jpeg',
    'assets/images/cesar-rebe/img (4).jpeg',
    'assets/images/cesar-rebe/img (5).jpeg',
    'assets/images/cesar-rebe/img (6).jpeg',
    'assets/images/cesar-rebe/img (7).jpeg',
    'assets/images/cesar-rebe/img (8).jpeg',
    'assets/images/cesar-rebe/img (9).jpeg',
    'assets/images/cesar-rebe/IMG-20260523-WA0071.jpg',
    'assets/images/cesar-rebe/IMG-20260602-WA0096.jpg',
    'assets/images/cesar-rebe/IMG-20260602-WA0116.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0039.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0041.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0051.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0063.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0068.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0070.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0071.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0072.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0073.jpg',
    'assets/images/cesar-rebe/IMG-20260810-WA0086.jpg'
  ];

  readonly heroImage = 'assets/images/cesar-rebe/img (1).jpeg';
  readonly destinationImage = 'assets/images/cesar-rebe/IMG-20260810-WA0068.jpg';
  readonly dressCodeImage = 'assets/images/cesar-rebe/IMG-20260810-WA0051.jpg';
  readonly bibleQuote = '“Mi amado habló y me dijo: Levántate, oh amada mía, hermosa mía, y ven. Porque he aquí ha pasado el invierno, la lluvia ha cesado y se ha ido; han aparecido las flores en la tierra, el tiempo de la canción ha venido, y en nuestro país se oye el arrullo de la tórtola.”';
  readonly bibleQuoteAuthor = '— Cantares 2: 10-13';

  readonly weddingData: Wedding = {
    slug: 'cesar-rebeca',
    theme: 'clasico',
    names: 'César & Rebeca',
    date: '2026-11-01T15:00:00-05:00',
    location: {
      name: 'Salón de Eventos Castillo Real Los Molinos',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Calle+30AA+%23+81A+-+42%2C+Bel%C3%A9n+Los+Molinos%2C+Medell%C3%ADn%2C+Antioquia&travelmode=driving'
    },
    dressCode: {
      description: 'Semi-Formal Elegante. Ella: Vestido largo o midi fluidos. Ellos: Traje o pantalón de vestir, camisa de lino o algodón, opcional blazer.',
      reservedColors: ['Azul rey profundo', 'Rosa empolvado', 'Terracota', 'Borgoña', 'Verde salvia', 'Marfil / Blanco']
    },
    pinterestUrl: '',
    giftNote: 'Lluvia de sobres',
    exclusiveNote: 'Invitación personal e intransferible',
    rsvpDeadline: '15 de Octubre 2026',
    rsvpUrl: 'https://wa.me/573207041379'
  };

  readonly guestData = computed<Guest>(() => {
    const profile = this.selectedGuestProfile();
    if (!profile) {
      return {
        slug: 'invitado',
        name: 'Invitado Especial',
        allowedGuests: 1,
        customMessage: '¡Gracias por acompañarnos en este día tan especial!'
      };
    }

    return {
      slug: profile.slug,
      name: profile.name,
      allowedGuests: profile.allowedGuests,
      customMessage: '¡Gracias por acompañarnos en este día tan especial!'
    };
  });

  onPassportOpened(): void {
    this.isOpen.set(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

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

  constructor() {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([params, query]) => {
        const routeGuest = params.get('guest') ?? '';
        const routeCount = this.parseGuestsCount(params.get('count'));
        const rawName = query.get('invitado') ?? query.get('guest') ?? query.get('nombre') ?? this.humanizeSlug(routeGuest);
        const normalizedSlug = this.slugify(routeGuest || rawName);

        const bySlug = CESAR_REBECA_GUESTS_SOURCE.find((entry) => entry.slug === normalizedSlug);
        if (bySlug) {
          this.selectedGuestProfile.set({
            ...bySlug,
            allowedGuests: routeCount ?? bySlug.allowedGuests
          });
          return;
        }

        if (!rawName.trim()) {
          this.selectedGuestProfile.set(null);
          return;
        }

        const customCount = routeCount ?? this.parseGuestsCount(query.get('personas') ?? query.get('cupos') ?? query.get('count'));

        this.selectedGuestProfile.set({
          slug: normalizedSlug,
          name: rawName.trim(),
          relation: 'Invitado especial',
          group: 'familia',
          gender: 'x',
          allowedGuests: customCount ?? 1
        });
      });
  }
}

