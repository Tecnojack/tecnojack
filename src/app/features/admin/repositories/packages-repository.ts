import { InjectionToken } from '@angular/core';
import { CmsPackage } from '../models/cms.models';
import { CmsEntityRepository } from './cms-entity-repository';

export interface PackagesRepository extends CmsEntityRepository<CmsPackage> {}

export const PACKAGES_REPOSITORY = new InjectionToken<PackagesRepository>('PACKAGES_REPOSITORY');
