import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of, retry } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { PeopleDirectoryEntry } from '../models/people-directory.models';
import { PersonResponseDto } from '../models/person-http.dto';
import { PeopleDirectoryPort } from './people-directory.port';

@Injectable()
export class HttpPeopleDirectoryAdapter implements PeopleDirectoryPort {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/persons`;

  watchEntries(): Observable<PeopleDirectoryEntry[]> {
    const params = new HttpParams().set('limit', '100');

    return this.http.get<PersonResponseDto[]>(this.apiUrl, { params }).pipe(
      retry(2),
      map((persons) =>
        persons.map((person) => this.mapToEntry(person))
      ),
      catchError((error) => {
        console.error('[HttpPeopleDirectoryAdapter] Error loading persons from NestJS API:', error);
        return of([]);
      })
    );
  }

  private mapToEntry(dto: PersonResponseDto): PeopleDirectoryEntry {
    const primaryEmail = dto.contactPoints?.find(
      (cp) => cp.type === 'EMAIL' && cp.isPrimary
    )?.value;
    const primaryPhone = dto.contactPoints?.find(
      (cp) => cp.type === 'PHONE' && cp.isPrimary
    )?.value;

    return {
      id: dto.id,
      displayName: dto.name.displayName || `${dto.name.givenNames} ${dto.name.familyNames ?? ''}`.trim(),
      service: 'bodas',
      serviceLabel: 'Cliente ERP',
      eventDate: null,
      location: primaryEmail || primaryPhone || dto.code,
      galleryCount: 0,
      status: dto.status === 'ACTIVE' ? 'published' : 'draft',
      source: 'legacy-portfolio'
    };
  }
}
