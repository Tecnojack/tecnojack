import { InjectionToken } from '@angular/core';
import { CmsSection } from '../models/cms.models';
import { CmsEntityRepository } from './cms-entity-repository';

export interface SectionsRepository extends CmsEntityRepository<CmsSection> {}

export const SECTIONS_REPOSITORY = new InjectionToken<SectionsRepository>('SECTIONS_REPOSITORY');
