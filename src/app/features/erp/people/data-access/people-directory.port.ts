import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { PeopleDirectoryEntry } from '../models/people-directory.models';

export interface PeopleDirectoryPort {
  watchEntries(): Observable<PeopleDirectoryEntry[]>;
}

export const PEOPLE_DIRECTORY_PORT = new InjectionToken<PeopleDirectoryPort>('PEOPLE_DIRECTORY_PORT');

