import { ApplicationConfig } from '@angular/core';
import { ActivatedRouteSnapshot, provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { routes } from './app.routes';
import { firebaseOptions } from './core/firebase/firebase.options';

/** First URL segment of a route snapshot tree (e.g. 'portfolio'). */
function topSegment(snapshot: ActivatedRouteSnapshot): string {
  let node: ActivatedRouteSnapshot | null = snapshot;
  while (node) {
    if (node.url.length) return node.url[0].path;
    node = node.firstChild;
  }
  return '';
}

/**
 * Public marketing pages that animate between each other. Invitations, ERP (`app`), admin, contracts and
 * client galleries keep their instant navigation.
 */
const PAGE_TRANSITION_SEGMENTS = new Set(['portfolio', 'soluciones', 'otros', 'cotizacion', 'cotizacion-grados', 'terminos-y-condiciones', 'brand', 'p']);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      // App-like transitions between public pages (and card photo → package hero).
      // Invitations, ERP, admin and contracts keep their instant navigation.
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition, from, to }) => {
          const reduceMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (reduceMotion || !PAGE_TRANSITION_SEGMENTS.has(topSegment(from)) || !PAGE_TRANSITION_SEGMENTS.has(topSegment(to))) {
            transition.skipTransition();
          }
        },
      }),
    ),
    provideAnimations(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseOptions)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
