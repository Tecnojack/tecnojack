import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Client } from '../../../../core/models/client.model';
import { ClientAdminService } from '../../../media-admin/client-admin.service';
import { PeopleDirectoryEntry } from '../models/people-directory.models';
import { PeopleDirectoryPort } from './people-directory.port';

const SERVICE_LABELS: Record<Client['service'], string> = {
  bodas: 'Bodas',
  prebodas: 'Prebodas',
  quinces: 'Quinces',
  grados: 'Grados'
};

@Injectable()
export class LegacyClientDirectoryAdapter implements PeopleDirectoryPort {
  private readonly clients = inject(ClientAdminService);

  watchEntries(): Observable<PeopleDirectoryEntry[]> {
    return this.clients.clients$.pipe(
      map((clients) =>
        clients.map((client) => ({
          id: client.id,
          displayName: client.name,
          service: client.service,
          serviceLabel: SERVICE_LABELS[client.service],
          eventDate: client.eventDate ?? null,
          location: client.location ?? null,
          galleryCount: client.galleryCount,
          status: client.status,
          source: 'legacy-portfolio' as const
        }))
      )
    );
  }
}

