import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MediaAdminAuthService } from './media-admin-auth.service';

@Component({
  selector: 'tj-media-admin-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <main class="container">
      <h1 class="heading-lg">Media Admin</h1>
      <p class="text-body text-muted">Inicia sesión para gestionar imágenes.</p>

      <form class="card" [formGroup]="form" (ngSubmit)="submit()">
        <div class="field">
          <label class="text-body">Email</label>
          <input class="input" type="email" formControlName="email" autocomplete="email" />
        </div>

        <div class="field">
          <label class="text-body">Contraseña</label>
          <input class="input" type="password" formControlName="password" autocomplete="current-password" />
        </div>

        <p class="text-body text-muted" *ngIf="error()">{{ error() }}</p>

        <button class="btn" type="submit" [disabled]="loading() || form.invalid">
          {{ loading() ? 'Ingresando…' : 'Ingresar' }}
        </button>
      </form>
    </main>
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
export class MediaAdminLoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(MediaAdminAuthService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  async submit(): Promise<void> {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') ?? '/media-admin';
      await this.auth.login(this.form.value.email ?? '', this.form.value.password ?? '', redirectTo);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo iniciar sesión.';
      this.error.set(message);
      this.loading.set(false);
    }
  }
}
