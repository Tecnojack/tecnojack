import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MediaAdminPageComponent } from './media-admin-page.component';

const MEDIA_ADMIN_KEY = 'Admin*';
const STORAGE_KEY = 'tj_media_admin_unlocked';

@Component({
  selector: 'tj-media-admin-gate-page',
  standalone: true,
  imports: [NgIf, MediaAdminPageComponent],
  template: `
    <tj-media-admin-page *ngIf="unlocked(); else locked" />

    <ng-template #locked>
      <main class="container">
        <h1 class="heading-lg">Media Admin</h1>
        <p class="text-body text-muted">Ingresa la clave para acceder.</p>

        <form class="card" (submit)="submit($event)">
          <div class="field">
            <label class="text-body">Clave</label>
            <input
              class="input"
              type="password"
              [value]="keyInput()"
              (input)="keyInput.set(($any($event.target).value ?? ''))"
              autocomplete="off"
              autofocus
            />
          </div>

          <p class="text-body text-muted" *ngIf="error()">{{ error() }}</p>

          <button class="btn" type="submit">Entrar</button>
        </form>
      </main>
    </ng-template>
  `,
  styles: [
    `
      .card {
        margin-top: 16px;
        padding: 16px;
        border: 1px solid var(--border);
        border-radius: 16px;
        background: var(--surface);
        display: grid;
        gap: 12px;
        max-width: 520px;
      }
      .field {
        display: grid;
        gap: 6px;
      }
      .input {
        width: 100%;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid var(--border);
        background: color-mix(in srgb, var(--surface) 92%, white);
        color: var(--text);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaAdminGatePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly keyInput = signal('');
  readonly error = signal<string | null>(null);

  private readonly unlockedSignal = signal(this.readUnlocked());
  readonly unlocked = computed(() => this.unlockedSignal());

  constructor() {
    effect(() => {
      const maybeKey = this.route.snapshot.queryParamMap.get('key');
      if (!maybeKey) return;

      if (this.checkKey(maybeKey)) {
        this.setUnlocked(true);
        void this.stripKeyFromUrl();
      } else {
        this.error.set('Clave incorrecta.');
        void this.stripKeyFromUrl();
      }
    });
  }

  submit(event: Event): void {
    event.preventDefault();

    const value = this.keyInput().trim();
    if (!value) {
      this.error.set('Ingresa la clave.');
      return;
    }

    if (!this.checkKey(value)) {
      this.error.set('Clave incorrecta.');
      return;
    }

    this.error.set(null);
    this.setUnlocked(true);
  }

  private checkKey(value: string): boolean {
    return value === MEDIA_ADMIN_KEY;
  }

  private readUnlocked(): boolean {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  }

  private setUnlocked(value: boolean): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
    }

    this.unlockedSignal.set(value);
  }

  private async stripKeyFromUrl(): Promise<void> {
    const queryParams = { ...this.route.snapshot.queryParams } as Record<string, unknown>;
    if (!('key' in queryParams)) return;

    delete queryParams['key'];

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true
    });
  }
}
