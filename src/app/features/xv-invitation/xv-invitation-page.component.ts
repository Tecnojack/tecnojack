import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { XvEventConfig, XvGuestGroup } from '../../core/models/xv-invitation.model';
import { SavedSongSuggestion, XvInvitationService } from '../../core/services/xv-invitation.service';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

type ModalType = 'map' | 'dresscode' | 'gifts' | 'music' | 'tips' | 'rsvp' | null;

@Component({
  selector: 'tj-xv-invitation-page',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, FormsModule],
  templateUrl: './xv-invitation-page.component.html',
  styleUrl: './xv-invitation-page.component.scss'
})
export class XvInvitationPageComponent implements OnInit, AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly xvService = inject(XvInvitationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elRef = inject(ElementRef);

  readonly config: XvEventConfig = this.xvService.getConfig();
  readonly celebrantName = signal<string>(this.config.celebrantName);
  readonly group = signal<XvGuestGroup | null>(null);
  readonly loading = signal<boolean>(true);
  readonly notFound = signal<boolean>(false);

  // Estado del preloader inicial
  readonly loaded = signal<boolean>(false);

  // Vista de Bienvenida / Selección de Entrada con Música
  readonly welcomeGateOpen = signal<boolean>(true);

  // Modales
  readonly activeModal = signal<ModalType>(null);

  // Selección de invitados en Modal RSVP
  readonly selectedGuests = signal<string[]>([]);
  readonly isDecliningRsvp = signal<boolean>(false);

  // Sugerencia de canción guardada en el estado local
  readonly savedSong = signal<SavedSongSuggestion | null>(null);
  readonly songSavedSuccess = signal<boolean>(false);
  readonly songTitle = signal<string>('');
  readonly songArtist = signal<string>('');
  readonly songSender = signal<string>('');

  // Reproductor de audio de fondo oficial (Alone-xv.mp3)
  readonly isMusicPlaying = signal<boolean>(false);
  private bgAudio: HTMLAudioElement | null = null;

  // Countdown timer
  readonly now = signal<number>(Date.now());

  readonly countdown = computed<CountdownState>(() => {
    const target = new Date(this.config.targetDateTime).getTime();
    const current = this.now();
    const diff = Math.max(0, target - current);

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  });

  readonly isGroup = computed(() => (this.group()?.guestCount ?? 1) > 1);

  readonly formattedNames = computed(() => {
    const g = this.group();
    if (!g) return '';
    return this.xvService.formatGuestNamesList(g.guests);
  });

  readonly whatsAppUrl = computed(() => {
    const g = this.group();
    if (!g) return '#';
    return this.xvService.getWhatsAppLink(
      g,
      this.selectedGuests(),
      this.isDecliningRsvp(),
      this.savedSong()
    );
  });

  readonly whatsAppConfirmUrl = computed(() => {
    const g = this.group();
    if (!g) return '#';
    return this.xvService.getWhatsAppLink(g, this.selectedGuests(), false, this.savedSong());
  });

  readonly whatsAppDeclineUrl = computed(() => {
    const g = this.group();
    if (!g) return '#';
    return this.xvService.getWhatsAppLink(g, this.selectedGuests(), true);
  });

  readonly googleCalendarUrl = computed(() => {
    return this.xvService.getGoogleCalendarUrl();
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const celebrantSlug = params.get('celebrantSlug') || '';
      const guestSlug = params.get('guestSlug') || params.get('guest') || '';
      const guestCountParam = params.get('guestCount');

      if (celebrantSlug) {
        const cleanCelebrant = celebrantSlug.replace(/-/g, ' ');
        this.celebrantName.set(this.xvService.toTitleCase(cleanCelebrant));
      } else {
        this.celebrantName.set(this.config.celebrantName);
      }

      if (!guestSlug) {
        const defaultGroup = this.xvService.getAllGroups()[0];
        if (defaultGroup) {
          this.group.set(defaultGroup);
          this.selectedGuests.set([...defaultGroup.guests]);
          this.songSender.set(defaultGroup.guests[0] || '');
          this.notFound.set(false);
        } else {
          this.notFound.set(true);
        }
      } else {
        const found = this.xvService.resolveGroup(guestSlug, guestCountParam, celebrantSlug);
        if (found) {
          this.group.set(found);
          this.selectedGuests.set([...found.guests]);
          this.songSender.set(found.guests[0] || '');
          this.notFound.set(false);
        } else {
          this.notFound.set(true);
          this.welcomeGateOpen.set(false);
        }
      }
      this.loading.set(false);
    });

    // Desactivar preloader tras animación de entrada
    setTimeout(() => {
      this.loaded.set(true);
    }, 450);

    // Iniciar Cuenta Regresiva
    timer(0, 1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.now.set(Date.now());
      });
  }

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  private initScrollReveal(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    setTimeout(() => {
      const elements = this.elRef.nativeElement.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el: Element) => observer.observe(el));
    }, 300);
  }

  /**
   * Acción de entrada desde la pantalla de bienvenida / sobre inicial
   */
  enterInvitation(withMusic: boolean): void {
    this.welcomeGateOpen.set(false);

    if (withMusic) {
      this.playAudio();
    }
  }

  private playAudio(): void {
    if (!this.bgAudio) {
      this.bgAudio = new Audio('assets/audio/Alone-xv.mp3');
      this.bgAudio.loop = true;
    }

    this.bgAudio
      .play()
      .then(() => {
        this.isMusicPlaying.set(true);
      })
      .catch((err) => {
        console.warn('Audio playback not allowed or failed:', err);
        this.isMusicPlaying.set(false);
      });
  }

  openModal(type: ModalType): void {
    if (type === 'music' && this.savedSong()) {
      const song = this.savedSong();
      if (song) {
        this.songTitle.set(song.title);
        this.songArtist.set(song.artist || '');
      }
    }
    this.songSavedSuccess.set(false);
    this.activeModal.set(type);
    document.body.style.overflow = 'hidden';
  }

  openRsvpModal(declining: boolean = false): void {
    this.isDecliningRsvp.set(declining);
    const g = this.group();
    if (g && this.selectedGuests().length === 0) {
      this.selectedGuests.set([...g.guests]);
    }
    this.openModal('rsvp');
  }

  closeModal(): void {
    this.activeModal.set(null);
    this.songSavedSuccess.set(false);
    document.body.style.overflow = '';
  }

  // Métodos de selección en modal RSVP
  isGuestSelected(guest: string): boolean {
    return this.selectedGuests().includes(guest);
  }

  toggleGuestSelection(guest: string): void {
    const current = this.selectedGuests();
    if (current.includes(guest)) {
      this.selectedGuests.set(current.filter((g) => g !== guest));
    } else {
      this.selectedGuests.set([...current, guest]);
    }
  }

  selectAllGuests(): void {
    const g = this.group();
    if (g) {
      this.selectedGuests.set([...g.guests]);
    }
  }

  deselectAllGuests(): void {
    this.selectedGuests.set([]);
  }

  scrollToSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Guarda la sugerencia musical en el estado local para combinarla automáticamente
   * en el mensaje final de confirmación de WhatsApp
   */
  saveSongSuggestion(): void {
    const title = this.songTitle().trim();
    if (!title) return;

    this.savedSong.set({
      title,
      artist: this.songArtist().trim()
    });

    this.songSavedSuccess.set(true);

    setTimeout(() => {
      this.closeModal();
    }, 1100);
  }

  removeSavedSong(): void {
    this.savedSong.set(null);
    this.songTitle.set('');
    this.songArtist.set('');
  }

  toggleMusic(): void {
    if (!this.bgAudio) {
      this.bgAudio = new Audio('assets/audio/Alone-xv.mp3');
      this.bgAudio.loop = true;
    }

    if (this.isMusicPlaying()) {
      this.bgAudio.pause();
      this.isMusicPlaying.set(false);
    } else {
      this.playAudio();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.activeModal()) {
      this.closeModal();
    }
  }
}
