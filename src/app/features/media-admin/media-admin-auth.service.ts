import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { filter, firstValueFrom, map, shareReplay, take, timeout } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MediaAdminAuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly user$ = authState(this.auth).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  readonly isAuthenticated$ = this.user$.pipe(
    map((user) => Boolean(user)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  async login(email: string, password: string, redirectTo = '/media-admin'): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
    await this.waitForAuthenticatedUser();
    await this.router.navigateByUrl(this.normalizeRedirect(redirectTo));
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/media-admin/login']);
  }

  private normalizeRedirect(redirectTo: string): string {
    const normalized = this.sanitizeRedirect(redirectTo);

    if (!normalized.startsWith('/media-admin')) {
      return '/media-admin';
    }

    if (normalized === '/media-admin/login') {
      return '/media-admin';
    }

    return normalized;
  }

  private sanitizeRedirect(redirectTo: string): string {
    const raw = String(redirectTo ?? '').trim();
    if (!raw) {
      return '/media-admin';
    }

    const decoded = this.safeDecodeURIComponent(raw);
    if (!decoded.startsWith('/')) {
      return '/media-admin';
    }

    return decoded.split('#')[0]?.trim() || '/media-admin';
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
