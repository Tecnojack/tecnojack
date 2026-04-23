import { InjectionToken } from '@angular/core';
import { CmsPageSnapshot } from '../models/cms.models';
import { CmsEntityRepository } from './cms-entity-repository';

export interface PageSnapshotsRepository extends CmsEntityRepository<CmsPageSnapshot> {}

export const PAGE_SNAPSHOTS_REPOSITORY = new InjectionToken<PageSnapshotsRepository>('PAGE_SNAPSHOTS_REPOSITORY');
