import { Injectable } from '@angular/core';
import { XvEventConfig, XvGuestGroup } from '../models/xv-invitation.model';
import { XV_EVENT_CONFIG, XV_GUEST_GROUPS } from '../data/xv-invitation-data';

export interface SavedSongSuggestion {
  title: string;
  artist?: string;
}

@Injectable({
  providedIn: 'root'
})
export class XvInvitationService {
  getConfig(): XvEventConfig {
    return XV_EVENT_CONFIG;
  }

  getAllGroups(): XvGuestGroup[] {
    return XV_GUEST_GROUPS;
  }

  /**
   * Resuelve el grupo de invitados ya sea buscando en la base de 55 invitaciones
   * o parseando dinámicamente nombres y cupos pasados en la URL:
   * Ejemplos:
   * - /xv/isabella-bermudez/sandra-yepes/4
   * - /xv/isabella-bermudez/xiomara-bermudez-elkin-angel-julian-angel-veronica-angel-y-martin-angel/5
   * - /xv/isabella-bermudez/jackson-palacios-luz-cordoba-y-juan-perea/3
   * - /xv/jackson-palacios,luz-cordoba,juan-perea/3
   */
  resolveGroup(
    guestSlug: string,
    guestCountParam?: string | null,
    celebrantSlug?: string | null
  ): XvGuestGroup | undefined {
    const rawGuest = (guestSlug ?? '').trim();
    if (!rawGuest) return undefined;

    const normalizedSlug = rawGuest.toLowerCase();

    // 1. Buscar coincidencia exacta en los 55 grupos predefinidos
    const predefined = XV_GUEST_GROUPS.find(
      (g) => g.slug.toLowerCase() === normalizedSlug || g.id.toLowerCase() === normalizedSlug
    );

    if (predefined) {
      if (guestCountParam && !isNaN(Number(guestCountParam)) && Number(guestCountParam) > 0) {
        return {
          ...predefined,
          guestCount: Number(guestCountParam)
        };
      }
      return predefined;
    }

    // 2. Si no es un slug predefinido, extraer nombres y cupos dinámicamente
    const expectedCount =
      guestCountParam && !isNaN(Number(guestCountParam)) && Number(guestCountParam) > 0
        ? Number(guestCountParam)
        : undefined;

    const parsedNames = this.parseGuestNamesFromSlug(rawGuest, expectedCount);
    if (parsedNames.length === 0) return undefined;

    let parsedCount = parsedNames.length;
    if (expectedCount) {
      parsedCount = Math.max(expectedCount, parsedNames.length);
    }

    return {
      id: `dyn-${this.slugify(rawGuest)}`,
      slug: this.slugify(rawGuest),
      guestCount: Math.max(1, parsedCount),
      guests: parsedNames
    };
  }

  /**
   * Extrae nombres individuales a partir de strings como:
   * "Xiomara Bermudez, Elkin Angel, Julian Angel, Veronica Angel y Martin Angel"
   * "xiomara-bermudez-elkin-angel-julian-angel-veronica-angel-y-martin-angel" con expectedCount: 5
   * "jackson-palacios-luz-cordoba-y-juan-perea"
   * "jackson-palacios,luz-cordoba,juan-perea"
   */
  parseGuestNamesFromSlug(slug: string, expectedCount?: number): string[] {
    let clean = decodeURIComponent(slug).trim();

    // 1. Si contiene comas explícitas, punto y coma o pipes
    if (clean.includes(',') || clean.includes(';') || clean.includes('|')) {
      clean = clean
        .replace(/\s*-\s*y\s*-\s*/gi, ', ')
        .replace(/-y-/gi, ', ')
        .replace(/_y_/gi, ', ')
        .replace(/\s+y\s+/gi, ', ')
        .replace(/\s+e\s+/gi, ', ')
        .replace(/\s*&\s*/g, ', ')
        .replace(/\s*;\s*/g, ', ')
        .replace(/\s*\|\s*/g, ', ');

      const parts = clean.split(',').map((p) => p.trim()).filter(Boolean);
      return parts.map((p) => this.toTitleCase(p.replace(/[-_+]/g, ' ').trim()));
    }

    // 2. Si está separado por ' y ' o '-y-' o '_y_' o '&'
    const hasY = /\s+y\s+|-y-|_y_|\s*-\s*y\s*-\s*|\s*&\s*/i.test(clean);
    const normalized = clean.replace(/[+_]/g, ' ');

    if (hasY) {
      const yParts = normalized.split(/\s*-\s*y\s*-\s*|-y-|_y_|\s+y\s+|\s+e\s+|\s*&\s*/i);
      const beforeY = yParts[0].trim();
      const afterY = yParts.slice(1).join(' ').trim();

      const lastName = this.toTitleCase(afterY.replace(/-/g, ' ').trim());
      const beforeWords = beforeY.split(/[-\s]+/).filter(Boolean);

      const namesBefore: string[] = [];
      const targetBeforeCount = expectedCount && expectedCount > 1 ? expectedCount - 1 : null;

      if (targetBeforeCount && targetBeforeCount > 0 && beforeWords.length >= targetBeforeCount) {
        const wordsPerName = Math.floor(beforeWords.length / targetBeforeCount);
        let currentWordIdx = 0;
        for (let i = 0; i < targetBeforeCount; i++) {
          const takeCount = i === targetBeforeCount - 1 ? beforeWords.length - currentWordIdx : wordsPerName;
          const nameWords = beforeWords.slice(currentWordIdx, currentWordIdx + takeCount);
          currentWordIdx += takeCount;
          if (nameWords.length > 0) {
            namesBefore.push(this.toTitleCase(nameWords.join(' ')));
          }
        }
      } else if (beforeWords.length >= 4 && beforeWords.length % 2 === 0) {
        for (let i = 0; i < beforeWords.length; i += 2) {
          namesBefore.push(this.toTitleCase(`${beforeWords[i]} ${beforeWords[i + 1]}`));
        }
      } else if (beforeWords.length > 0) {
        namesBefore.push(this.toTitleCase(beforeWords.join(' ')));
      }

      const all = [...namesBefore, lastName].filter(Boolean);
      return all.length > 0 ? all : [this.toTitleCase(clean)];
    }

    // 3. Sin 'y', solo guiones o espacios
    const words = normalized.split(/[-\s]+/).filter(Boolean);
    if (expectedCount && expectedCount > 1 && words.length >= expectedCount) {
      const names: string[] = [];
      const wordsPerName = Math.floor(words.length / expectedCount);
      let currentWordIdx = 0;
      for (let i = 0; i < expectedCount; i++) {
        const takeCount = i === expectedCount - 1 ? words.length - currentWordIdx : wordsPerName;
        const nameWords = words.slice(currentWordIdx, currentWordIdx + takeCount);
        currentWordIdx += takeCount;
        if (nameWords.length > 0) {
          names.push(this.toTitleCase(nameWords.join(' ')));
        }
      }
      return names;
    }

    if (words.length >= 4 && words.length % 2 === 0) {
      const names: string[] = [];
      for (let i = 0; i < words.length; i += 2) {
        names.push(this.toTitleCase(`${words[i]} ${words[i + 1]}`));
      }
      return names;
    }

    return [this.toTitleCase(words.join(' '))];
  }

  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .filter((w) => w.length > 0)
      .map((w) => {
        if (['de', 'del', 'la', 'las', 'los', 'y', 'e'].includes(w)) {
          return w;
        }
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(' ');
  }

  slugify(text: string): string {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  }

  getGroupBySlug(slug: string): XvGuestGroup | undefined {
    return this.resolveGroup(slug);
  }

  getTotalGuestsCalculated(): number {
    return XV_GUEST_GROUPS.reduce((acc, g) => acc + g.guestCount, 0);
  }

  /**
   * Genera el enlace de WhatsApp con mensajes en primera persona dirigida a la quinceañera Isabella,
   * combinando automáticamente la confirmación de asistencia con la sugerencia de música si el invitado la guardó.
   */
  getWhatsAppLink(
    group: XvGuestGroup,
    selectedGuests?: string[],
    isDeclining: boolean = false,
    songSuggestion?: SavedSongSuggestion | null
  ): string {
    const config = this.getConfig();
    const cleanPhone = config.whatsappNumber.replace(/\D/g, '');
    const fullPhone = `57${cleanPhone}`;
    const celebrantFirstName = config.celebrantName ? config.celebrantName.split(' ')[0] : 'Isabella';

    const activeGuests = selectedGuests && selectedGuests.length > 0 ? selectedGuests : group.guests;
    const count = activeGuests.length;
    const isSingle = group.guests.length === 1;

    let message = '';

    if (isDeclining) {
      if (isSingle) {
        const name = group.guests[0] || 'Invitado';
        message = `¡Hola ${celebrantFirstName}! Lamentablemente no podré acompañarte en tu fiesta de 15 años del ${config.dateText}. ¡Te deseo una noche mágica, inolvidable y llena de bendiciones! De parte de ${name}. 🌸`;
      } else {
        const namesFormatted = this.formatGuestNamesList(group.guests);
        message = `¡Hola ${celebrantFirstName}! Lamentablemente no podremos acompañarte en tu fiesta de 15 años del ${config.dateText}. ¡Te deseamos una noche mágica, inolvidable y llena de bendiciones! De parte de ${namesFormatted}. 🌸`;
      }
    } else {
      // Confirmando asistencia
      if (isSingle) {
        const name = activeGuests[0] || group.guests[0] || 'Invitado';
        message = `¡Hola ${celebrantFirstName}! Confirmo con mucha alegría mi asistencia a tu fiesta de 15 años del ${config.dateText}. Soy ${name}. ¡Nos vemos allá! ✨`;
      } else if (count === group.guests.length) {
        // Todos confirmaron
        const namesFormatted = this.formatGuestNamesList(activeGuests);
        message = `¡Hola ${celebrantFirstName}! Confirmamos con mucha alegría nuestra asistencia a tu fiesta de 15 años del ${config.dateText}. Asistiremos ${namesFormatted} (${count} ${count === 1 ? 'persona' : 'personas'}). ¡Nos vemos allá! ✨`;
      } else {
        // Confirmación parcial
        const confirmedFormatted = this.formatGuestNamesList(activeGuests);
        const declined = group.guests.filter((g) => !activeGuests.includes(g));
        const declinedFormatted = this.formatGuestNamesList(declined);

        message = `¡Hola ${celebrantFirstName}! Para tu fiesta de 15 años del ${config.dateText}, confirmamos la asistencia de ${confirmedFormatted} (${count} ${count === 1 ? 'persona' : 'personas'}). Lamentablemente ${declinedFormatted} no ${declined.length === 1 ? 'podrá' : 'podrán'} asistir. ¡Nos vemos allá! ✨`;
      }

      // Si el invitado guardó una sugerencia musical, integrarla de forma fluida al mensaje final
      if (songSuggestion && songSuggestion.title && songSuggestion.title.trim()) {
        const songTitle = songSuggestion.title.trim();
        const artist = songSuggestion.artist?.trim() ? ` de ${songSuggestion.artist.trim()}` : '';
        const verb = isSingle ? 'quiero sugerir' : 'queremos sugerir';
        message += `\n\n🎵 Además, ${verb} la canción "${songTitle}"${artist} para que la bailemos en tu fiesta.`;
      }
    }

    return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
  }

  getGoogleCalendarUrl(): string {
    const config = this.getConfig();
    const title = encodeURIComponent(`Mis 15 años - ${config.celebrantName || 'Isabella Bermúdez'}`);
    const details = encodeURIComponent(
      `¡Celebremos juntos mi fiesta de 15 años! Te espero para compartir una noche mágica e inolvidable. Lugar: ${config.venueName}.`
    );
    const location = encodeURIComponent(config.venueName);
    // 2026-10-04 19:00:00 COT (UTC-5) -> 20261005T000000Z to 20261005T080000Z
    const dates = '20261005T000000Z/20261005T080000Z';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }

  formatGuestNamesList(guests: string[]): string {
    if (!guests || guests.length === 0) return '';
    if (guests.length === 1) return guests[0];
    if (guests.length === 2) return `${guests[0]} y ${guests[1]}`;

    const initial = guests.slice(0, guests.length - 1).join(', ');
    const last = guests[guests.length - 1];
    return `${initial} y ${last}`;
  }
}
