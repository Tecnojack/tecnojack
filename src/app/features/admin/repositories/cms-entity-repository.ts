import { Observable } from 'rxjs';
import { CmsEntityBase } from '../models/cms.models';

export interface CmsEntityRepository<TEntity extends CmsEntityBase> {
  readonly collection$: Observable<TEntity[]>;
  readonly publishedCollection$: Observable<TEntity[]>;

  create(payload: Partial<TEntity>): Promise<TEntity>;
  update(id: string, payload: Partial<TEntity>): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
