import { Injectable } from '@angular/core';
import { CmsDatabaseState } from '../models/cms.models';

const STORAGE_KEY = 'tecnojack.admin.cms.v1';

@Injectable({ providedIn: 'root' })
export class LocalStorageCmsPersistenceService {
  load(): unknown {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  save(state: CmsDatabaseState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
