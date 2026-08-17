import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ERP_IDENTITY_PORT } from './erp-identity.port';

@Injectable()
export class ErpIdentityFacade {
  private readonly identity = inject(ERP_IDENTITY_PORT);

  readonly session = toSignal(this.identity.session$, { initialValue: null });
}

