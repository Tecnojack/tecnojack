import { Injectable, inject } from '@angular/core';
import { MockCmsDatabaseRepositoryService } from './mock-cms-database-repository.service';
import { PagesRepository } from '../repositories/pages-repository';

@Injectable({ providedIn: 'root' })
export class MockPagesRepositoryService implements PagesRepository {
  private readonly repository = inject(MockCmsDatabaseRepositoryService);

  readonly collection$ = this.repository.selectCollection('pages');
  readonly publishedCollection$ = this.repository.selectPublishedCollection('pages');

  create(payload: Parameters<PagesRepository['create']>[0]) {
    return this.repository.create('pages', payload);
  }

  update(id: string, payload: Parameters<PagesRepository['update']>[1]) {
    return this.repository.update('pages', id, payload);
  }

  delete(id: string) {
    return this.repository.delete('pages', id);
  }

  exists(id: string) {
    return Promise.resolve(this.repository.getCollectionSnapshot('pages').some((item) => item.id === id));
  }
}
