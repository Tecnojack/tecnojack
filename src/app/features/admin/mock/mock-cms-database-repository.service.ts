import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsCollectionKey, CmsDatabaseState, CmsEntityMap, CmsEntityStatus } from '../models/cms.models';
import { CmsDatabaseRepository } from '../repositories/cms-database-repository';
import { MockCmsRepositoryService } from '../services/mock-cms-repository.service';

@Injectable({ providedIn: 'root' })
export class MockCmsDatabaseRepositoryService implements CmsDatabaseRepository {
  private readonly repository = inject(MockCmsRepositoryService);

  readonly state$ = this.repository.state$;
  readonly rawState$ = this.repository.rawState$;

  selectCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]> {
    return this.repository.selectCollection(collection);
  }

  selectPublishedCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]> {
    return this.repository.selectPublishedCollection(collection);
  }

  getRawSnapshot(): CmsDatabaseState {
    return this.repository.getRawSnapshot();
  }

  getSnapshot(): CmsDatabaseState {
    return this.repository.getSnapshot();
  }

  getCollectionSnapshot<K extends CmsCollectionKey>(collection: K): CmsEntityMap[K][] {
    return this.repository.getCollectionSnapshot(collection);
  }

  async create<K extends CmsCollectionKey>(collection: K, payload: Partial<CmsEntityMap[K]>): Promise<CmsEntityMap[K]> {
    return this.repository.create(collection, payload);
  }

  async update<K extends CmsCollectionKey>(collection: K, id: string, payload: Partial<CmsEntityMap[K]>): Promise<void> {
    this.repository.update(collection, id, payload);
  }

  async delete<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    this.repository.softDelete(collection, id);
  }

  async restore<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    this.repository.restore(collection, id);
  }

  async duplicate<K extends CmsCollectionKey>(collection: K, id: string): Promise<CmsEntityMap[K] | undefined> {
    return this.repository.duplicate(collection, id);
  }

  async toggleActive<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    this.repository.toggleActive(collection, id);
  }

  async updateStatus<K extends CmsCollectionKey>(collection: K, id: string, status: CmsEntityStatus): Promise<void> {
    this.repository.updateStatus(collection, id, status);
  }

  async publish<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    this.repository.publish(collection, id);
  }

  async reorder<K extends CmsCollectionKey>(collection: K, orderedIds: string[]): Promise<void> {
    this.repository.reorder(collection, orderedIds);
  }

  async reset(): Promise<void> {
    this.repository.reset();
  }
}
