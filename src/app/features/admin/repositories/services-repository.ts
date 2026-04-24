import { InjectionToken } from '@angular/core';
import { CmsService } from '../models/cms.models';
import { CmsEntityRepository } from './cms-entity-repository';

export interface ServicesRepository extends CmsEntityRepository<CmsService> {}

export const SERVICES_REPOSITORY = new InjectionToken<ServicesRepository>('SERVICES_REPOSITORY');
