import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { Guest } from '../models/guest.model';
import { GrupoInvitado, Invitado } from '../models/grupo-invitado.model';

@Injectable({ providedIn: 'root' })
export class GuestService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<string, Observable<Guest[]>>();

  // Mapeo explícito (por ahora solo hay una boda). Permite usar un archivo
  // distinto al slug de la boda, sin tener que renombrar assets.
  private readonly guestFileByWeddingSlug: Record<string, string> = {
    'maria-nicolas': 'invitados_boda_MyD'
  };

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
    'felipe',
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

  private normalizeShortName(value: string): string {
    const cleaned = (value ?? '')
      .trim()
      .replace(/\s+/g, ' ');
    if (!cleaned) return '';

    const parts = cleaned.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} ${parts[1]}`;

    // Heurística:
    // - 3 palabras puede ser: (Nombre SegundoNombre Apellido) o (Nombre Apellido Apellido)
    // - Si la 2da palabra parece un segundo nombre común, usamos la última como apellido.
    if (parts.length === 3) {
      const second = parts[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const apellido = this.commonSecondNames.has(second) ? parts[2] : parts[1];
      return `${parts[0]} ${apellido}`;
    }

    // 4+ palabras: asumimos 2 nombres + 2 apellidos (o más). Primer apellido = penúltima palabra.
    return `${parts[0]} ${parts[parts.length - 2]}`;
  }

  private joinNames(names: string[]): string {
    const clean = names.map((n) => String(n ?? '').trim()).filter(Boolean);
    if (clean.length === 0) return '';
    if (clean.length === 1) return clean[0];
    if (clean.length === 2) {
      return `${clean[0]} & ${clean[1]}`;
    }
    return `${clean.slice(0, -1).join(', ')} & ${clean.at(-1)}`;
  }

  private joinNamesForChildrenSuffix(names: string[]): string {
    const clean = names.map((n) => String(n ?? '').trim()).filter(Boolean);
    if (clean.length === 0) return '';
    if (clean.length === 1) return clean[0];
    // Cuando agregamos "e hijo(s)", se lee mejor con coma.
    return clean.join(', ');
  }

  private toGuestFromInvitado(invitado: Invitado): Guest {
    const nombreRaw = String(invitado?.nombre ?? '').trim();
    const slugBase = this.normalizeShortName(nombreRaw) || nombreRaw;
    const ninos = Number(invitado?.ninos ?? 0) || 0;
    const adultos = Number(invitado?.adultos ?? 0) || 0;
    const total = Math.max(1, Number(invitado?.total ?? 0) || (adultos + ninos) || 1);

    const childrenSuffix = ninos === 1 ? ' e hijo' : ninos > 1 ? ' e hijos' : '';

    return {
      slug: this.slugify(slugBase),
      name: `${nombreRaw}${childrenSuffix}`,
      allowedGuests: total,
      customMessage: 'Nos encantaría que nos acompañes en este viaje.',
      childrenCount: ninos
    };
  }

  private normalizeGuestsPayload(payload: unknown): Guest[] {
    if (!Array.isArray(payload) || payload.length === 0) return [];

    const first = payload[0] as Record<string, unknown> | null;
    if (!first || typeof first !== 'object') return [];

    // Caso 1: Formato antiguo (Guest[])
    if ('slug' in first && 'name' in first) {
      return (payload as Guest[])
        .filter((g) => !!g && typeof g.slug === 'string' && typeof g.name === 'string')
        .map((g) => {
          const rawName = String(g.name ?? '').trim();
          const hadChildSingular = /\s+e\s+hijo\s*$/i.test(rawName);
          const hadChildrenPlural = /\s+e\s+hijos\s*$/i.test(rawName);
          const baseRaw = rawName.replace(/\s+e\s+hijo(s)?\s*$/i, '').trim();
          const base = this.normalizeShortName(baseRaw) || baseRaw;

          const inferredChildrenCount = hadChildSingular ? 1 : hadChildrenPlural ? 2 : 0;

          return {
            ...g,
            slug: this.slugify(base || g.slug),
            name: hadChildSingular ? `${base} e hijo` : hadChildrenPlural ? `${base} e hijos` : base,
            childrenCount: (g as Guest).childrenCount ?? (inferredChildrenCount || undefined)
          };
        });
    }

    // Caso 2: Formato nuevo (GrupoInvitado[])
    if ('id_grupo' in first && 'invitados' in first) {
      const groups = payload as GrupoInvitado[];
      const items: Guest[] = [];

      for (const group of groups) {
        const invitados = Array.isArray(group?.invitados) ? group.invitados : [];

        const memberInfo = invitados
          .map((invitado) => {
            const nombreRaw = String(invitado?.nombre ?? '').trim();
            if (!nombreRaw) return null;

            const ninos = Number(invitado?.ninos ?? 0) || 0;
            const adultos = Number(invitado?.adultos ?? 0) || 0;
            const total = Math.max(1, Number(invitado?.total ?? 0) || (adultos + ninos) || 1);
            const slugBase = this.normalizeShortName(nombreRaw) || nombreRaw;
            const slug = this.slugify(slugBase);

            return { nombreRaw, slug, ninos, adultos, total };
          })
          .filter((x): x is NonNullable<typeof x> => !!x);

        if (memberInfo.length === 0) continue;

        const memberNames = memberInfo.map((m) => m.nombreRaw);
        const totalChildren = memberInfo.reduce((acc, m) => acc + (m.ninos || 0), 0);
        const totalAllowedGuests = memberInfo.reduce((acc, m) => acc + (m.total || 0), 0);

        const childrenSuffix =
          totalChildren === 1 ? ' e hijo' : totalChildren > 1 ? ' e hijos' : '';

        const baseName = childrenSuffix
          ? this.joinNamesForChildrenSuffix(memberNames)
          : this.joinNames(memberNames);

        const displayName = `${baseName}${childrenSuffix}`;

        for (const member of memberInfo) {
          items.push({
            slug: member.slug,
            name: displayName,
            allowedGuests: Math.max(1, totalAllowedGuests),
            customMessage: 'Nos encantaría que nos acompañes en este viaje.',
            childrenCount: totalChildren || undefined
          });
        }
      }

      return items;
    }

    return [];
  }

  private loadWeddingGuests(weddingSlug: string): Observable<Guest[]> {
    const key = weddingSlug.trim().toLowerCase();
    const existing = this.cache.get(key);
    if (existing) return existing;

    const file = this.guestFileByWeddingSlug[key] ?? key;

    const request$ = this.http
      .get<unknown>(`assets/data/guests/${file}.json`)
      .pipe(
        map((payload) => this.normalizeGuestsPayload(payload)),
        catchError(() => of([])),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    this.cache.set(key, request$);
    return request$;
  }

  getGuestBySlug(weddingSlug: string, guestSlug: string): Observable<Guest | null> {
    const normalizedGuest = this.slugify(guestSlug);
    return this.loadWeddingGuests(weddingSlug).pipe(
      map(
        (items) => items.find((g) => this.slugify(g.slug) === normalizedGuest) ?? null
      )
    );
  }
}
