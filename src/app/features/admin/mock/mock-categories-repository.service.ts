import { Injectable, inject } from '@angular/core';
import { CategoriesRepository } from '../repositories/categories-repository';
import { MockCmsDatabaseRepositoryService } from './mock-cms-database-repository.service';

@Injectable({ providedIn: 'root' })
export class MockCategoriesRepositoryService implements CategoriesRepository {
  private readonly repository = inject(MockCmsDatabaseRepositoryService);

  readonly collection$ = this.repository.selectCollection('categories');
  readonly publishedCollection$ = this.repository.selectPublishedCollection('categories');

  create(payload: Parameters<CategoriesRepository['create']>[0]) {
    return this.repository.create('categories', payload);
  }

  update(id: string, payload: Parameters<CategoriesRepository['update']>[1]) {
    return this.repository.update('categories', id, payload);
  }

  delete(id: string) {
    return this.repository.delete('categories', id);
  }

  exists(id: string) {
    return Promise.resolve(this.repository.getCollectionSnapshot('categories').some((item) => item.id === id));
  }
}
