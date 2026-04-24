import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsCollectionKey, CmsDatabaseState, CmsEntityMap, CmsEntityStatus } from '../models/cms.models';
import { CMS_DATABASE_REPOSITORY, CmsDatabaseRepository } from '../repositories/cms-database-repository';

@Injectable({ providedIn: 'root' })
export class MockCmsStoreService {
  private readonly repository = inject<CmsDatabaseRepository>(CMS_DATABASE_REPOSITORY);

  readonly state$ = this.repository.state$;

  selectCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]> {
    return this.repository.selectCollection(collection);
  }

  selectPublishedCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]> {
    return this.repository.selectPublishedCollection(collection);
  }

  getSnapshot(): CmsDatabaseState {
    return this.repository.getSnapshot();
  }

  getCollectionSnapshot<K extends CmsCollectionKey>(collection: K): CmsEntityMap[K][] {
    return this.repository.getCollectionSnapshot(collection);
  }

  create<K extends CmsCollectionKey>(collection: K, payload: Partial<CmsEntityMap[K]>): Promise<CmsEntityMap[K]> {
    return this.repository.create(collection, payload);
  }

  update<K extends CmsCollectionKey>(collection: K, id: string, payload: Partial<CmsEntityMap[K]>): Promise<void> {
    return this.repository.update(collection, id, payload);
  }

  delete<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    return this.repository.delete(collection, id);
  }

  restore<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    return this.repository.restore(collection, id);
  }

  duplicate<K extends CmsCollectionKey>(collection: K, id: string): Promise<CmsEntityMap[K] | undefined> {
    return this.repository.duplicate(collection, id);
  }

  toggleActive<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    return this.repository.toggleActive(collection, id);
  }

  updateStatus<K extends CmsCollectionKey>(collection: K, id: string, status: CmsEntityStatus): Promise<void> {
    return this.repository.updateStatus(collection, id, status);
  }

  publish<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    return this.repository.publish(collection, id);
  }

  reorder<K extends CmsCollectionKey>(collection: K, orderedIds: string[]): Promise<void> {
    return this.repository.reorder(collection, orderedIds);
  }

  reset(): Promise<void> {
    return this.repository.reset();
  }
}
