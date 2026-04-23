import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsCollectionKey, CmsDatabaseState, CmsEntityMap, CmsEntityStatus } from '../models/cms.models';

export interface CmsDatabaseRepository {
  readonly state$: Observable<CmsDatabaseState>;

  selectCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]>;
  selectPublishedCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]>;
  getSnapshot(): CmsDatabaseState;
  getCollectionSnapshot<K extends CmsCollectionKey>(collection: K): CmsEntityMap[K][];
  create<K extends CmsCollectionKey>(collection: K, payload: Partial<CmsEntityMap[K]>): Promise<CmsEntityMap[K]>;
  update<K extends CmsCollectionKey>(collection: K, id: string, payload: Partial<CmsEntityMap[K]>): Promise<void>;
  delete<K extends CmsCollectionKey>(collection: K, id: string): Promise<void>;
  restore<K extends CmsCollectionKey>(collection: K, id: string): Promise<void>;
  duplicate<K extends CmsCollectionKey>(collection: K, id: string): Promise<CmsEntityMap[K] | undefined>;
  toggleActive<K extends CmsCollectionKey>(collection: K, id: string): Promise<void>;
  updateStatus<K extends CmsCollectionKey>(collection: K, id: string, status: CmsEntityStatus): Promise<void>;
  publish<K extends CmsCollectionKey>(collection: K, id: string): Promise<void>;
  reorder<K extends CmsCollectionKey>(collection: K, orderedIds: string[]): Promise<void>;
  reset(): Promise<void>;
}

export type CmsBackendMode = 'mock' | 'firebase';

export const CMS_DATABASE_REPOSITORY = new InjectionToken<CmsDatabaseRepository>('CMS_DATABASE_REPOSITORY');
export const CMS_BACKEND_MODE = new InjectionToken<CmsBackendMode>('CMS_BACKEND_MODE');
export const CMS_FIREBASE_COLLECTIONS = new InjectionToken<readonly CmsCollectionKey[]>('CMS_FIREBASE_COLLECTIONS');
