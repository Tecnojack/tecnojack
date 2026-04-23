import { Injectable, inject } from '@angular/core';
import { MockCmsDatabaseRepositoryService } from './mock-cms-database-repository.service';
import { SectionsDataRepository } from '../repositories/sections-data-repository';

@Injectable({ providedIn: 'root' })
export class MockSectionsDataRepositoryService implements SectionsDataRepository {
  private readonly repository = inject(MockCmsDatabaseRepositoryService);

  readonly collection$ = this.repository.selectCollection('sectionsData');
  readonly publishedCollection$ = this.repository.selectPublishedCollection('sectionsData');

  create(payload: Parameters<SectionsDataRepository['create']>[0]) {
    return this.repository.create('sectionsData', payload);
  }

  update(id: string, payload: Parameters<SectionsDataRepository['update']>[1]) {
    return this.repository.update('sectionsData', id, payload);
  }

  delete(id: string) {
    return this.repository.delete('sectionsData', id);
  }

  exists(id: string) {
    return Promise.resolve(this.repository.getCollectionSnapshot('sectionsData').some((item) => item.id === id));
  }
}
