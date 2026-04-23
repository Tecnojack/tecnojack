import { InjectionToken } from '@angular/core';
import { CmsCategory } from '../models/cms.models';
import { CmsEntityRepository } from './cms-entity-repository';

export interface CategoriesRepository extends CmsEntityRepository<CmsCategory> {}

export const CATEGORIES_REPOSITORY = new InjectionToken<CategoriesRepository>('CATEGORIES_REPOSITORY');
