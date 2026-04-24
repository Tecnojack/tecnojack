import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { filter, firstValueFrom, map, shareReplay, take, timeout } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly user$ = authState(this.auth).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  readonly isAuthenticated$ = this.user$.pipe(
    map((user) => Boolean(user)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  async login(email: string, password: string, redirectTo = '/admin/dashboard'): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
    await this.waitForAuthenticatedUser();
    await this.router.navigateByUrl(this.normalizeAdminRedirect(redirectTo));
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/admin/login']);
  }

  private normalizeAdminRedirect(redirectTo: string): string {
    const normalized = this.sanitizeRedirect(redirectTo);

    if (!normalized.startsWith('/admin')) {
      return '/admin/dashboard';
    }

    if (normalized === '/admin/login') {
      return '/admin/dashboard';
    }

    return normalized;
  }

  private sanitizeRedirect(redirectTo: string): string {
    const raw = String(redirectTo ?? '').trim();
    if (!raw) {
      return '/admin/dashboard';
    }

    const decoded = this.safeDecodeURIComponent(raw);
    if (!decoded.startsWith('/')) {
      return '/admin/dashboard';
    }

    return decoded.split('#')[0]?.trim() || '/admin/dashboard';
  }

  private safeDecodeURIComponent(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  private async waitForAuthenticatedUser(): Promise<void> {
    if (this.auth.currentUser) {
      return;
    }

    await firstValueFrom(
      this.user$.pipe(
        filter((user): user is NonNullable<typeof user> => user !== null),
        take(1),
        timeout(5000)
      )
    );
  }
}
