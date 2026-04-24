import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminAuthService } from './firebase/admin-auth.service';

@Component({
  selector: 'app-admin-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login-page.component.html',
  styleUrl: './admin-login-page.component.scss'
})
export class AdminLoginPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AdminAuthService);
  private readonly route = inject(ActivatedRoute);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly redirectTo = computed(() => this.resolveRedirectTarget());
  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async submit(): Promise<void> {
    if (this.loginForm.invalid || this.isSubmitting()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    try {
      const { email, password } = this.loginForm.getRawValue();
      await this.authService.login(email, password, this.redirectTo());
    } catch (error) {
      this.errorMessage.set(this.resolveFirebaseError(error));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private resolveRedirectTarget(): string {
    const redirectTo = String(this.route.snapshot.queryParamMap.get('redirectTo') ?? '').trim();
    if (!redirectTo) {
      return '/admin/dashboard';
    }

    const decoded = this.safeDecodeURIComponent(redirectTo);
    if (!decoded.startsWith('/admin') || decoded === '/admin/login') {
      return '/admin/dashboard';
    }

    return decoded;
  }

  private safeDecodeURIComponent(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  private resolveFirebaseError(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string') {
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          return 'Credenciales inválidas para el panel admin.';
        case 'auth/too-many-requests':
          return 'Demasiados intentos. Espera un momento antes de volver a ingresar.';
        default:
          return 'No fue posible autenticar con Firebase Auth.';
      }
    }

    return 'No fue posible autenticar con Firebase Auth.';
  }
}
