import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { ErpIdentitySession } from './erp-identity.models';

export interface ErpIdentityPort {
  readonly session$: Observable<ErpIdentitySession | null>;
}

export const ERP_IDENTITY_PORT = new InjectionToken<ErpIdentityPort>('ERP_IDENTITY_PORT');

