import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackgroundAudioService {
  private audio?: HTMLAudioElement;
  private initialized = false;

  private readonly _isPlaying = signal(false);
  readonly isPlaying = this._isPlaying.asReadonly();

  private readonly _autoplayBlocked = signal(false);
  readonly autoplayBlocked = this._autoplayBlocked.asReadonly();

  readonly canAutoplay = computed(() => !this._autoplayBlocked());

  private ensureAudio(): HTMLAudioElement {
    if (this.audio) return this.audio;

    const audio = new Audio();
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0.28;
    audio.src = encodeURI('assets/audio/Mia & Sebastians Theme.mp3');

    audio.addEventListener('play', () => this._isPlaying.set(true));
    audio.addEventListener('pause', () => this._isPlaying.set(false));

    this.audio = audio;
    return audio;
  }

  /**
   * Intenta reproducir al entrar. Si el navegador bloquea autoplay,
   * reintenta automáticamente al primer click/tecla del usuario.
   */
  start(): void {
    if (typeof window === 'undefined') return;
    if (this.initialized) return;
    this.initialized = true;

    void this.play().catch(() => {
      // Si se bloquea, esperamos una interacción del usuario.
      const retry = () => {
        void this.play();
      };

      window.addEventListener('pointerdown', retry, { once: true, passive: true });
      window.addEventListener('keydown', retry, { once: true, passive: true });
    });
  }

  async play(): Promise<void> {
    if (typeof window === 'undefined') return;

    const audio = this.ensureAudio();
    try {
      await audio.play();
      this._autoplayBlocked.set(false);
    } catch (err) {
      this._autoplayBlocked.set(true);
      throw err;
    }
  }

  pause(): void {
    this.ensureAudio().pause();
  }

  toggle(): void {
    if (this.isPlaying()) {
      this.pause();
      return;
    }

    this.start();
    void this.play();
  }
}
