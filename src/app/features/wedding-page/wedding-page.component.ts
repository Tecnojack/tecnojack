import { NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Wedding } from '../../core/models/wedding.model';
import { Guest } from '../../core/models/guest.model';
import { WeddingService } from '../../core/services/wedding.service';
import { GuestService } from '../../core/services/guest.service';
import { ThemeService } from '../../core/services/theme.service';
import { PassportComponent } from '../passport/passport.component';
import { InvitationComponent } from '../invitation/invitation.component';

@Component({
  selector: 'tj-wedding-page',
  standalone: true,
  imports: [NgIf, PassportComponent, InvitationComponent],
  templateUrl: './wedding-page.component.html',
  styleUrl: './wedding-page.component.scss'
})
export class WeddingPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly weddingService = inject(WeddingService);
  private readonly guestService = inject(GuestService);
  private readonly themeService = inject(ThemeService);

  readonly wedding = signal<Wedding | null>(null);
  readonly guest = signal<Guest | null>(null);
  readonly opened = signal(false);
  readonly loading = signal(true);

  private readonly defaultWeddingNames = 'TECNOJACK';
  private readonly defaultGuestName = 'Jackson Palacios';

  private readonly commonSecondNames = new Set([
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

  private normalizeShortNameFromParts(parts: string[]): string {
    const p = parts.filter(Boolean);
    if (p.length === 0) return '';
    if (p.length === 1) return p[0];
    if (p.length === 2) return `${p[0]} ${p[1]}`;

    if (p.length === 3) {
      const second = p[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const apellido = this.commonSecondNames.has(second) ? p[2] : p[1];
      return `${p[0]} ${apellido}`;
    }

    return `${p[0]} ${p[p.length - 2]}`;
  }

  private toTitleCaseName(value: string): string {
    const cleaned = (value ?? '')
      .trim()
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ');

    if (!cleaned) return this.defaultGuestName;

    const titledParts = cleaned
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());

    return this.normalizeShortNameFromParts(titledParts) || this.defaultGuestName;
  }

  private parseCount(value: string | null): number | null {
    if (!value) return null;
    const n = Number(value);
    if (!Number.isFinite(n)) return null;
    if (n <= 0) return null;
    return Math.floor(n);
  }

  private slugify(value: string): string {
    const normalized = (value ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return normalized
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private sanitizeWedding(wedding: Wedding): Wedding {
    const names = (wedding.names ?? '').trim();
    if (names) return wedding;
    return { ...wedding, names: this.defaultWeddingNames };
  }

  private createFallbackGuest(guestParam?: string, count?: number | null): Guest {
    const fromUrl = (guestParam ?? '').trim();
    const name = fromUrl ? this.toTitleCaseName(fromUrl) : this.defaultGuestName;
    const slug = fromUrl ? this.slugify(fromUrl) : 'default';

    return {
      slug,
      name,
      allowedGuests: count ?? 1,
      customMessage: 'Nos encantaría que nos acompañes en este viaje.',
      childrenCount: 0
    };
  }

  private sanitizeGuest(guest: Guest): Guest {
    const name = (guest.name ?? '').trim();
    if (name) return guest;
    return { ...guest, name: this.defaultGuestName };
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.opened.set(false);
        }),
        switchMap((params) => {
          const weddingSlug = params.get('wedding')?.trim() ?? '';
          const guestSlug = params.get('guest')?.trim() ?? '';
          const count = this.parseCount(params.get('count'));
          if (!weddingSlug) {
            return of({ wedding: null as Wedding | null, guest: null as Guest | null });
          }

          return this.weddingService.getWeddingBySlug(weddingSlug).pipe(
            switchMap((wedding) => {
              if (!wedding) {
                return of({ wedding: null as Wedding | null, guest: null as Guest | null });
              }

              const safeWedding = this.sanitizeWedding(wedding);
              this.wedding.set(safeWedding);
              this.themeService.applyTheme(safeWedding.theme);

              if (!guestSlug) {
                return of({ wedding: safeWedding, guest: this.createFallbackGuest('', count) });
              }

              return this.guestService.getGuestBySlug(safeWedding.slug, guestSlug).pipe(
                map((guest) => {
                  const baseGuest = guest ? this.sanitizeGuest(guest) : this.createFallbackGuest(guestSlug, count);
                  const safeGuest = count ? { ...baseGuest, allowedGuests: count } : baseGuest;
                  return { wedding: safeWedding, guest: safeGuest };
                }),
                catchError(() => of({ wedding: safeWedding, guest: this.createFallbackGuest(guestSlug, count) }))
              );
            }),
            catchError(() => of({ wedding: null as Wedding | null, guest: null as Guest | null }))
          );
        }),
        catchError(() => of({ wedding: null as Wedding | null, guest: null as Guest | null }))
      )
      .subscribe((result) => {
        if (!result.wedding) {
          void this.router.navigateByUrl('/brand');
          return;
        }

        if (!result.guest) {
          void this.router.navigateByUrl('/brand');
          return;
        }

        this.guest.set(result.guest);
        this.loading.set(false);
      });
  }

  onPassportOpened(): void {
    this.opened.set(true);
  }
}
