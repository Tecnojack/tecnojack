import { computed, Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { PortfolioPackageCategory } from '../../portfolio/portfolio.data';
import { FirebaseCmsMediaUploadService } from '../firebase/firebase-cms-media-upload.service';
import {
  CmsAdditionalService,
  CmsCategory,
  CmsEntityStatus,
  CmsMedia,
  CmsPackage,
  CmsPackageFeature,
  CmsPage,
  CmsSection,
  CmsSectionData,
  CmsService
} from '../models/cms.models';
import { CMS_BACKEND_MODE, CmsBackendMode } from '../repositories/cms-database-repository';
import { AdminAuthService } from '../firebase/admin-auth.service';
import { MockCmsStoreService } from './mock-cms-store.service';

@Injectable({ providedIn: 'root' })
export class CmsVisualEditorService {
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly backendMode = inject<CmsBackendMode>(CMS_BACKEND_MODE);
  private readonly mediaUpload = inject(FirebaseCmsMediaUploadService);
  private readonly store = inject(MockCmsStoreService);
  private readonly state = toSignal(this.store.state$, { initialValue: this.store.getSnapshot() });
  private readonly user = toSignal(this.auth.user$, { initialValue: null });

  readonly isEditMode = computed(() => !!this.user());
  readonly currentUserEmail = computed(() => this.user()?.email ?? '');
  readonly isSaving = signal(false);
  readonly lastError = signal('');

  async logout(): Promise<void> {
    await this.auth.logout();
  }

  async openAdminDashboard(): Promise<void> {
    await this.router.navigate(['/admin/dashboard']);
  }

  getPageBySlug(pageSlug: string): CmsPage | undefined {
    return this.state().pages.find((page) => page.slug === pageSlug && !page.deletedAt);
  }

  getPublicRouteForPage(page: CmsPage): string {
    const routePath = String(page.routePath ?? '').trim();
    if (routePath) {
      return routePath;
    }

    if (page.slug === 'portfolio') {
      return '/portfolio';
    }

    return `/${page.slug}`;
  }

  getSection(pageSlug: string, sectionType: CmsSection['type']): CmsSection | undefined {
    const page = this.getPageBySlug(pageSlug);
    if (!page) {
      return undefined;
    }

    return this.state().sections.find(
      (section) => section.pageId === page.id && section.type === sectionType && !section.deletedAt
    );
  }

  getSectionData(pageSlug: string, sectionType: CmsSection['type']): CmsSectionData | undefined {
    const page = this.getPageBySlug(pageSlug);
    if (!page) {
      return undefined;
    }

    const section = this.getSection(pageSlug, sectionType);
    if (section?.sectionDataId) {
      return this.state().sectionsData.find((item) => item.id === section.sectionDataId && !item.deletedAt);
    }

    return this.state().sectionsData.find(
      (item) => item.pageId === page.id && item.sectionType === sectionType && !item.deletedAt
    );
  }

  getServicesForPage(pageSlug: string): CmsService[] {
    const page = this.getPageBySlug(pageSlug);
    if (!page) {
      return [];
    }

    return this.state().services
      .filter((service) => service.pageIds.includes(page.id) && !service.deletedAt)
      .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name));
  }

  async updateSectionContent(
    pageSlug: string,
    sectionType: CmsSection['type'],
    payload: Partial<CmsSectionData>
  ): Promise<void> {
    const page = this.getPageBySlug(pageSlug);
    if (!page) {
      throw new Error(`No existe la página ${pageSlug}.`);
    }

    const current = this.getSectionData(pageSlug, sectionType);
    const baseData = current?.data ?? { layout: 'grid', columns: 1, showCTA: false, style: 'light' };

    this.lastError.set('');
    this.isSaving.set(true);
    try {
      if (current) {
        await this.store.update('sectionsData', current.id, {
          ...payload,
          data: {
            ...baseData,
            ...(payload.data ?? {})
          }
        });
        return;
      }

      const created = await this.store.create('sectionsData', {
        name: `${page.name} ${sectionType}`,
        pageId: page.id,
        sectionType,
        title: String(payload.title ?? ''),
        subtitle: String(payload.subtitle ?? ''),
        body: String(payload.body ?? ''),
        mediaIds: payload.mediaIds ?? [],
        data: {
          ...baseData,
          ...(payload.data ?? {})
        },
        active: true,
        status: 'published',
        order: this.state().sectionsData.filter((item) => item.pageId === page.id).length + 1
      });

      const existingSection = this.getSection(pageSlug, sectionType);
      if (existingSection) {
        await this.store.update('sections', existingSection.id, {
          sectionDataId: created.id,
          enabled: true,
          active: true,
          status: 'published'
        });
        return;
      }

      const createdSection = await this.store.create('sections', {
        name: `${page.name} ${sectionType}`,
        pageId: page.id,
        type: sectionType,
        enabled: true,
        sectionDataId: created.id,
        entityCollection: '',
        entityIds: [],
        active: true,
        status: 'published',
        order: this.state().sections.filter((item) => item.pageId === page.id).length + 1
      });

      await this.store.update('pages', page.id, {
        sectionIds: Array.from(new Set([...(page.sectionIds ?? []), createdSection.id]))
      });
    } catch (error) {
      this.lastError.set(error instanceof Error ? error.message : 'No se pudo guardar la sección.');
      throw error;
    } finally {
      this.isSaving.set(false);
    }
  }

  async updateService(serviceId: string, payload: Partial<CmsService>): Promise<void> {
    await this.runMutation(async () => {
      await this.store.update('services', serviceId, payload);
    }, 'No se pudo actualizar el servicio.');
  }

  async createService(
    pageSlug: string,
    payload?: Partial<CmsService>
  ): Promise<CmsService> {
    const page = this.getPageBySlug(pageSlug);
    if (!page) {
      throw new Error(`No existe la página ${pageSlug}.`);
    }

    const servicesSection = this.getSection(pageSlug, 'services');
    const currentServices = this.getServicesForPage(pageSlug);

    return this.runMutation(async () => {
      const created = await this.store.create('services', {
        name: String(payload?.name ?? 'Nuevo servicio'),
        slug: String(payload?.slug ?? `nuevo-servicio-${Date.now()}`),
        description: String(payload?.description ?? 'Describe visualmente este servicio desde el sitio público.'),
        mediaId: String(payload?.mediaId ?? ''),
        href: String(payload?.href ?? this.getPublicRouteForPage(page)),
        ctaLabel: String(payload?.ctaLabel ?? 'Ver paquetes'),
        points: Array.isArray(payload?.points) ? payload?.points : [],
        pageIds: [page.id],
        sectionIds: servicesSection ? [servicesSection.id] : [],
        categoryIds: Array.isArray(payload?.categoryIds) ? payload?.categoryIds : [],
        active: payload?.active ?? true,
        status: payload?.status ?? 'published',
        order: payload?.order ?? currentServices.length + 1
      });

      if (servicesSection) {
        await this.store.update('sections', servicesSection.id, {
          entityIds: [...servicesSection.entityIds, created.id]
        });
      }

      return created;
    }, 'No se pudo crear el servicio.');
  }

  async deleteService(pageSlug: string, serviceId: string): Promise<void> {
    const servicesSection = this.getSection(pageSlug, 'services');

    await this.runMutation(async () => {
      if (servicesSection) {
        await this.store.update('sections', servicesSection.id, {
          entityIds: servicesSection.entityIds.filter((id) => id !== serviceId)
        });
      }
      await this.store.delete('services', serviceId);
    }, 'No se pudo eliminar el servicio.');
  }

  getPackage(category: PortfolioPackageCategory, slug: string): CmsPackage | undefined {
    const normalizedSlug = String(slug ?? '').trim();
    if (!normalizedSlug) {
      return undefined;
    }

    return this.state().packages.find((item) => {
      if (item.deletedAt || item.slug !== normalizedSlug) {
        return false;
      }

      const matchesCategory = item.categoryIds.some((categoryId) => {
        const categoryItem = this.state().categories.find((entry) => entry.id === categoryId && !entry.deletedAt);
        return categoryItem?.slug === category;
      });

      if (matchesCategory) {
        return true;
      }

      return item.pageIds.some((pageId) => {
        const page = this.state().pages.find((entry) => entry.id === pageId && !entry.deletedAt);
        return page?.slug === `portfolio-${category}`;
      });
    });
  }

  async updatePackage(category: PortfolioPackageCategory, slug: string, payload: Partial<CmsPackage>): Promise<void> {
    const item = this.getPackage(category, slug);
    if (!item) {
      throw new Error('No se encontró el paquete a editar.');
    }

    await this.runMutation(async () => {
      await this.store.update('packages', item.id, payload);
    }, 'No se pudo guardar el paquete.');
  }

  async deletePackage(category: PortfolioPackageCategory, slug: string): Promise<void> {
    const item = this.getPackage(category, slug);
    if (!item) {
      throw new Error('No se encontró el paquete a eliminar.');
    }

    await this.runMutation(async () => {
      await this.store.delete('packages', item.id);
    }, 'No se pudo eliminar el paquete.');
  }

  getPackageAdditionalServices(item: CmsPackage): CmsAdditionalService[] {
    return item.additionalServiceIds
      .map((id) => this.state().additionalServices.find((entry) => entry.id === id && !entry.deletedAt))
      .filter((entry): entry is CmsAdditionalService => !!entry);
  }

  getServicesForPackageCategory(category: PortfolioPackageCategory): CmsService[] {
    const categoryId = this.getCategoryBySlug(category)?.id;
    const pageId = this.getPageBySlug(`portfolio-${category}`)?.id;

    return [...this.state().services]
      .filter((item) => {
        if (!item.active || item.deletedAt) {
          return false;
        }

        if (pageId && item.pageIds.includes(pageId)) {
          return true;
        }

        return !!categoryId && item.categoryIds.includes(categoryId);
      })
      .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name, 'es'));
  }

  getAdditionalServicesForPackageCategory(category: PortfolioPackageCategory): CmsAdditionalService[] {
    const serviceIds = new Set(this.getServicesForPackageCategory(category).map((item) => item.id));

    return [...this.state().additionalServices]
      .filter((item) => {
        if (!item.active || item.deletedAt) {
          return false;
        }

        return !item.serviceIds.length || item.serviceIds.some((serviceId) => serviceIds.has(serviceId));
      })
      .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name, 'es'));
  }

  getPackageFeaturesForCategory(category: PortfolioPackageCategory): CmsPackageFeature[] {
    const categoryId = this.getCategoryBySlug(category)?.id;

    return [...this.state().packageFeatures]
      .filter((item) => {
        if (!item.active || item.deletedAt) {
          return false;
        }

        return !categoryId || !item.categoryIds.length || item.categoryIds.includes(categoryId);
      })
      .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name, 'es'));
  }

  getMediaLibrary(): CmsMedia[] {
    return [...this.state().media]
      .filter((item) => item.active && !item.deletedAt)
      .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name, 'es'));
  }

  resolveMediaUrl(mediaId: string | null | undefined): string {
    const normalizedId = String(mediaId ?? '').trim();
    if (!normalizedId) {
      return '';
    }

    return String(this.state().media.find((item) => item.id === normalizedId && !item.deletedAt)?.url ?? '').trim();
  }

  async uploadImage(file: File, namePrefix: string): Promise<CmsMedia> {
    return this.runMutation(async () => {
      if (this.backendMode === 'firebase') {
        return this.mediaUpload.upload(file, {
          alt: file.name.replace(/\.[^.]+$/, ''),
          folder: 'cms/uploads'
        });
      }

      const dataUrl = await this.readFileAsDataUrl(file);
      return this.store.create('media', {
        name: `${namePrefix.trim() || 'Media'} · ${file.name}`,
        mediaType: file.type.startsWith('image/') ? 'image' : 'other',
        url: dataUrl,
        alt: file.name.replace(/\.[^.]+$/, ''),
        folder: 'uploads/local',
        mimeType: file.type || 'image/*',
        sizeLabel: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        isMockUpload: true,
        active: true,
        status: 'published',
        publishedAt: new Date().toISOString(),
        deletedAt: null,
        order: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }, 'No se pudo subir la imagen.');
  }

  private getCategoryBySlug(categorySlug: string): CmsCategory | undefined {
    return this.state().categories.find((item) => item.slug === categorySlug && !item.deletedAt);
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        if (!result) {
          reject(new Error('No se pudo leer la imagen seleccionada.'));
          return;
        }

        resolve(result);
      };
      reader.onerror = () => reject(reader.error ?? new Error('No se pudo leer la imagen seleccionada.'));
      reader.readAsDataURL(file);
    });
  }

  private async runMutation<T>(task: () => Promise<T>, fallback: string): Promise<T> {
    this.lastError.set('');
    this.isSaving.set(true);
    try {
      return await task();
    } catch (error) {
      this.lastError.set(error instanceof Error ? error.message : fallback);
      throw error;
    } finally {
      this.isSaving.set(false);
    }
  }
}
