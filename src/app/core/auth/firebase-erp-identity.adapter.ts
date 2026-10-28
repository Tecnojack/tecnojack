import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { map, shareReplay } from 'rxjs';

import { ErpIdentityPort } from './erp-identity.port';

@Injectable({ providedIn: 'root' })
export class FirebaseErpIdentityAdapter implements ErpIdentityPort {
  private readonly auth = inject(Auth);

  readonly session$ = authState(this.auth).pipe(
    map((user) =>
      user
        ? {
            id: user.uid,
            email: user.email ?? '',
            displayName: user.displayName || user.email?.split('@')[0] || 'Usuario TECNOJACK',
            photoUrl: user.photoURL,
            provider: 'firebase' as const
          }
        : null
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}

