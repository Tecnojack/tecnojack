import { InjectionToken } from '@angular/core';
import { CmsSectionData } from '../models/cms.models';
import { CmsEntityRepository } from './cms-entity-repository';

export interface SectionsDataRepository extends CmsEntityRepository<CmsSectionData> {}

export const SECTIONS_DATA_REPOSITORY = new InjectionToken<SectionsDataRepository>('SECTIONS_DATA_REPOSITORY');
