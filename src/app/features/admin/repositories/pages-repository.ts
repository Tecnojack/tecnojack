import { InjectionToken } from '@angular/core';
import { CmsPage } from '../models/cms.models';
import { CmsEntityRepository } from './cms-entity-repository';

export interface PagesRepository extends CmsEntityRepository<CmsPage> {}

export const PAGES_REPOSITORY = new InjectionToken<PagesRepository>('PAGES_REPOSITORY');
