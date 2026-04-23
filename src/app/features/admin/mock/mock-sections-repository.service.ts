import { Injectable, inject } from '@angular/core';
import { MockCmsDatabaseRepositoryService } from './mock-cms-database-repository.service';
import { SectionsRepository } from '../repositories/sections-repository';

@Injectable({ providedIn: 'root' })
export class MockSectionsRepositoryService implements SectionsRepository {
  private readonly repository = inject(MockCmsDatabaseRepositoryService);

  readonly collection$ = this.repository.selectCollection('sections');
  readonly publishedCollection$ = this.repository.selectPublishedCollection('sections');

  create(payload: Parameters<SectionsRepository['create']>[0]) {
    return this.repository.create('sections', payload);
  }

  update(id: string, payload: Parameters<SectionsRepository['update']>[1]) {
    return this.repository.update('sections', id, payload);
  }

  delete(id: string) {
    return this.repository.delete('sections', id);
  }

  exists(id: string) {
    return Promise.resolve(this.repository.getCollectionSnapshot('sections').some((item) => item.id === id));
  }
}
