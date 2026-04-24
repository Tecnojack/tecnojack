import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  CmsAdditionalService,
  CmsCategory,
  CmsEntityStatus,
  CmsPackage,
  CmsPackageFeature,
  CmsPage,
  CmsPageType,
  CmsSection,
  CmsSectionData,
  CmsSectionType,
  CmsService
} from './models/cms.models';
import { FirebaseCmsMediaUploadService } from './firebase/firebase-cms-media-upload.service';
import { CMS_BACKEND_MODE, CmsBackendMode } from './repositories/cms-database-repository';
import { CmsMediaService } from './services/cms-media.service';
import { MockCmsStoreService } from './services/mock-cms-store.service';

type ModalEntity = 'page' | 'section' | 'service' | 'package' | null;
type ModalMode = 'create' | 'edit';
type ModalOption = { id: string; label: string; meta?: string };

function slugify(value: string): string {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function humanizeServiceScope(value: string): string {
  const normalized = normalizeServiceScopeKey(value);
  const map: Record<string, string> = {
    bodas: 'Bodas',
    boda: 'Bodas',
    quinces: 'Quinces',
    quince: 'Quinces',
    cumpleanos: 'Cumpleaños',
    'cumpleaños': 'Cumpleaños',
    grados: 'Grados',
    grado: 'Grados',
    preboda: 'Preboda',
    prebodas: 'Preboda',
    videos: 'Videos',
    video: 'Videos',
    general: 'General'
  };

  if (map[normalized]) {
    return map[normalized];
  }

  return normalized
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeServiceScopeKey(value: string): string {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^portfolio\s+/i, '')
    .replace(/^pagina\s+/i, '')
    .replace(/^servicio\s+/i, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  if (/(^|\s)pre\s*boda(s)?(\s|$)/.test(normalized) || /(^|\s)preboda(s)?(\s|$)/.test(normalized)) {
    return 'preboda';
  }

  if (/(^|\s)boda(s)?(\s|$)/.test(normalized)) {
    return 'bodas';
  }

  if (/(^|\s)quince(s)?(\s|$)|quinceanero|quinceanera/.test(normalized)) {
    return 'quinces';
  }

  if (/(^|\s)grado(s)?(\s|$)|graduacion|graduaciones/.test(normalized)) {
    return 'grados';
  }

  if (/(^|\s)cumple(anos)?(\s|$)|cumpleanos|cumplean(os|eras?)/.test(normalized)) {
    return 'cumpleanos';
  }

  if (/(^|\s)video(s)?(\s|$)/.test(normalized)) {
    return 'videos';
  }

  if (normalized === 'general') {
    return 'general';
  }

  return normalized.replace(/\s+/g, '-');
}

const PAGE_TYPE_OPTIONS: Array<{ label: string; value: CmsPageType }> = [
  { label: 'Landing', value: 'landing' },
  { label: 'Categoría de servicio', value: 'service-category' },
  { label: 'Detalle de servicio', value: 'service-detail' },
  { label: 'Videos', value: 'video' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Brand', value: 'brand' },
  { label: 'Custom', value: 'custom' }
];

const SECTION_TYPE_OPTIONS: Array<{ label: string; value: CmsSectionType }> = [
  { label: 'Hero', value: 'hero' },
  { label: 'About', value: 'about' },
  { label: 'Profile', value: 'profile' },
  { label: 'Services', value: 'services' },
  { label: 'Packages', value: 'packages' },
  { label: 'Gallery', value: 'gallery' },
  { label: 'Stories', value: 'stories' },
  { label: 'Videos', value: 'videos' },
  { label: 'Contact', value: 'contact' },
  { label: 'Invitation', value: 'invitation' },
  { label: 'Passport', value: 'passport' },
  { label: 'Custom', value: 'custom' }
];

const STATUS_OPTIONS: Array<{ label: string; value: CmsEntityStatus }> = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' }
];

function pageSort(left: CmsPage, right: CmsPage): number {
  return left.order - right.order || left.name.localeCompare(right.name);
}

@Component({
  selector: 'app-admin-pages-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-pages-page.component.html',
  styleUrl: './admin-pages-page.component.scss'
})
export class AdminPagesPageComponent {
  readonly pageSearch = signal('');
  readonly serviceLinkId = signal('');
  readonly packageLinkId = signal('');
  readonly quickDrafts = signal<Record<string, string>>({});
  readonly modalEntity = signal<ModalEntity>(null);
  readonly modalMode = signal<ModalMode>('create');
  readonly modalTargetId = signal<string | null>(null);
  readonly pageTypeOptions = PAGE_TYPE_OPTIONS;
  readonly sectionTypeOptions = SECTION_TYPE_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;
  readonly formError = signal('');
  readonly pendingUploads = signal(0);

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(MockCmsStoreService);
  private readonly backendMode = inject<CmsBackendMode>(CMS_BACKEND_MODE);
  private readonly mediaUpload = inject(FirebaseCmsMediaUploadService);
  private readonly media = inject(CmsMediaService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
  private readonly state = toSignal(this.store.state$, { initialValue: this.store.getSnapshot() });

  readonly pageForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    slug: ['', Validators.required],
    routePath: ['', Validators.required],
    pageType: ['service-category', Validators.required],
    description: [''],
    metaTitle: [''],
    metaDescription: [''],
    status: ['draft', Validators.required],
    active: [true],
    order: [1, Validators.required]
  });

  readonly entityForm: FormGroup = this.fb.group({});

  readonly isCreateRoute = computed(() => this.routeData()['mode'] === 'create');
  readonly isModalOpen = computed(() => this.modalEntity() !== null);
  readonly isPageModal = computed(() => this.modalEntity() === 'page');
  readonly isEntityModal = computed(() => this.modalEntity() !== null && this.modalEntity() !== 'page');
  readonly isUploadingMedia = computed(() => this.pendingUploads() > 0);

  readonly pages = computed(() =>
    this.state().pages
      .filter((page) => page.pageType !== 'admin')
      .sort(pageSort)
  );

  readonly filteredPages = computed(() => {
    const query = this.pageSearch().trim().toLowerCase();
    if (!query) {
      return this.pages();
    }

    return this.pages().filter((page) => JSON.stringify(page).toLowerCase().includes(query));
  });

  readonly selectedPage = computed(() => {
    const pageId = this.routeParams().get('pageId');
    return this.pages().find((page) => page.id === pageId) ?? null;
  });

  readonly pageSections = computed(() =>
    this.selectedPage()
      ? this.state().sections
          .filter((section) => section.pageId === this.selectedPage()!.id)
          .sort((left, right) => left.order - right.order)
      : []
  );

  readonly pageServices = computed(() =>
    this.selectedPage()
      ? this.state().services
          .filter((service) => service.pageIds.includes(this.selectedPage()!.id))
          .sort((left, right) => left.order - right.order)
      : []
  );

  readonly pagePackages = computed(() =>
    this.selectedPage()
      ? this.state().packages
          .filter((item) => item.pageIds.includes(this.selectedPage()!.id))
          .sort((left, right) => left.order - right.order)
      : []
  );

  readonly pagesById = computed(() => new Map(this.pages().map((page) => [page.id, page])));
  readonly servicesById = computed(() => new Map(this.state().services.map((service) => [service.id, service])));
  readonly categoriesById = computed(() => new Map(this.state().categories.map((category) => [category.id, category])));
  readonly selectedPageScope = computed(() => this.inferPageScope(this.selectedPage()));

  readonly availableServices = computed(() => {
    const page = this.selectedPage();
    if (!page) {
      return [];
    }

    return this.state().services.filter((service) => !service.pageIds.includes(page.id) && this.matchesCurrentPageScope(service));
  });

  readonly availablePackages = computed(() => {
    const page = this.selectedPage();
    if (!page) {
      return [];
    }

    return this.state().packages.filter((item) => !item.pageIds.includes(page.id) && this.matchesCurrentPageScope(item));
  });

  readonly allAdditionalServices = computed(() =>
    [...this.state().additionalServices]
      .filter((item) => this.matchesCurrentPageScope(item))
      .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
  );

  readonly allPackageFeatures = computed(() =>
    [...this.state().packageFeatures]
      .filter((item) => this.matchesCurrentPageScope(item))
      .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
  );

  readonly allMedia = computed(() =>
    [...this.state().media].sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
  );

  readonly pageSummary = computed(() => {
    const page = this.selectedPage();
    if (!page) {
      return [];
    }

    return [
      { label: 'Secciones', value: this.pageSections().length },
      { label: 'Servicios', value: this.pageServices().length },
      { label: 'Paquetes', value: this.pagePackages().length },
      {
        label: 'Recursos visuales',
        value:
          this.state().galleryItems.filter((item) => item.pageIds.includes(page.id)).length +
          this.state().stories.filter((item) => item.pageIds.includes(page.id)).length
      }
    ];
  });

  readonly modalTitle = computed(() => {
    const entity = this.modalEntity();
    const mode = this.modalMode();
    if (!entity) {
      return '';
    }

    const action = mode === 'create' ? 'Crear' : 'Editar';
    const label = entity === 'page'
      ? 'página'
      : entity === 'section'
        ? 'sección'
        : entity === 'service'
          ? 'servicio'
          : 'paquete';

    return `${action} ${label}`;
  });

  readonly modalDescription = computed(() => {
    switch (this.modalEntity()) {
      case 'page':
        return 'Define la identidad, ruta y contexto general de la página o servicio.';
      case 'section':
        return 'Crea o actualiza el bloque interno de la página con contenido, orden, visibilidad y elementos vinculados.';
      case 'service':
        return 'Configura el servicio con identidad, descripción, enlaces, puntos clave y recursos visuales.';
      case 'package':
        return 'Configura el paquete con precios, notas, extras, beneficios y relación con servicios.';
      default:
        return '';
    }
  });

  constructor() {
    effect(() => {
      if (this.isCreateRoute()) {
        this.openPageCreateModal();
      }
    });

    effect(() => {
      this.routeParams().get('pageId');
      this.serviceLinkId.set('');
      this.packageLinkId.set('');
      this.formError.set('');

      if (this.modalMode() === 'edit' && this.modalEntity() !== 'page') {
        this.closeModal(false);
      }
    });
  }

  updatePageSearch(value: string): void {
    this.pageSearch.set(value);
  }

  openPageCreateModal(): void {
    this.modalEntity.set('page');
    this.modalMode.set('create');
    this.modalTargetId.set(null);
    this.pageForm.reset({
      name: '',
      slug: '',
      routePath: '',
      pageType: 'service-category',
      description: '',
      metaTitle: '',
      metaDescription: '',
      status: 'draft',
      active: true,
      order: this.pages().length + 1
    });
  }

  openPageEditModal(): void {
    const page = this.selectedPage();
    if (!page) {
      return;
    }

    this.modalEntity.set('page');
    this.modalMode.set('edit');
    this.modalTargetId.set(page.id);
    this.pageForm.reset({
      name: page.name,
      slug: page.slug,
      routePath: page.routePath,
      pageType: page.pageType,
      description: page.description,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      status: page.status,
      active: page.active,
      order: page.order
    });
  }

  async savePageModal(): Promise<void> {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      return;
    }

    const raw = this.pageForm.getRawValue();
    this.formError.set('');

    try {
      if (this.modalMode() === 'create') {
        const createdPage = await this.store.create('pages', {
          name: raw.name,
          slug: raw.slug,
          routePath: raw.routePath,
          pageType: raw.pageType,
          description: raw.description,
          metaTitle: raw.metaTitle || raw.name,
          metaDescription: raw.metaDescription || raw.description || '',
          status: raw.status,
          active: !!raw.active,
          order: Number(raw.order),
          sectionIds: []
        });

        await this.createDefaultStructure(createdPage);
        this.closeModal(false);
        void this.router.navigate(['/admin/pages', createdPage.id]);
        return;
      }

      const page = this.selectedPage();
      if (!page) {
        return;
      }

      await this.store.update('pages', page.id, {
        name: raw.name,
        slug: raw.slug,
        routePath: raw.routePath,
        pageType: raw.pageType,
        description: raw.description,
        metaTitle: raw.metaTitle,
        metaDescription: raw.metaDescription,
        status: raw.status,
        active: !!raw.active,
        order: Number(raw.order)
      });

      this.closeModal(false);
    } catch (error) {
      this.formError.set(error instanceof Error ? error.message : 'No se pudo guardar la página.');
    }
  }

  openCreateSectionModal(): void {
    const page = this.selectedPage();
    if (!page) {
      return;
    }

    this.modalEntity.set('section');
    this.modalMode.set('create');
    this.modalTargetId.set(null);
    this.resetEntityForm({
      name: `${page.name} · ${this.sectionTypeLabel('hero')}`,
      type: 'hero',
      title: `${page.name} · Hero`,
      subtitle: 'Bloque introductorio de la página.',
      body: 'Describe aquí el contenido principal de esta sección.',
      entityIds: [],
      status: 'draft',
      enabled: true,
      order: this.pageSections().length + 1
    });
  }

  openEditSectionModal(section: CmsSection): void {
    this.modalEntity.set('section');
    this.modalMode.set('edit');
    this.modalTargetId.set(section.id);
    const content = this.getSectionData(section.sectionDataId);
    this.resetEntityForm({
      name: section.name,
      type: section.type,
      title: content?.title ?? section.name,
      subtitle: content?.subtitle ?? '',
      body: content?.body ?? '',
      entityIds: [...section.entityIds],
      status: section.status,
      enabled: section.enabled,
      order: section.order
    });
  }

  openCreateServiceModal(): void {
    const page = this.selectedPage();
    if (!page) {
      return;
    }

    this.modalEntity.set('service');
    this.modalMode.set('create');
    this.modalTargetId.set(null);
    this.resetEntityForm({
      name: `${page.name} Servicio`,
      slug: `${page.slug}-servicio`,
      description: 'Describe aquí el servicio principal de esta página.',
      href: page.routePath,
      ctaLabel: 'Ver servicio',
      mediaId: '',
      categoryIds: this.defaultCategoryIds('service'),
      pointsText: '',
      status: 'draft',
      active: true,
      order: this.pageServices().length + 1
    });
  }

  openEditServiceModal(service: CmsService): void {
    this.modalEntity.set('service');
    this.modalMode.set('edit');
    this.modalTargetId.set(service.id);
    this.resetEntityForm({
      name: service.name,
      slug: service.slug,
      description: service.description,
      href: service.href,
      ctaLabel: service.ctaLabel,
      mediaId: service.mediaId,
      categoryIds: [...service.categoryIds],
      pointsText: service.points.join('\n'),
      status: service.status,
      active: service.active,
      order: service.order
    });
  }

  openCreatePackageModal(): void {
    const page = this.selectedPage();
    if (!page) {
      return;
    }

    this.modalEntity.set('package');
    this.modalMode.set('create');
    this.modalTargetId.set(null);
    this.resetEntityForm({
      name: `${page.name} Paquete`,
      slug: `${page.slug}-paquete`,
      categoryIds: this.defaultCategoryIds('package'),
      packageTypeLabel: 'Paquete principal',
      summary: 'Describe aquí el paquete principal de esta página.',
      mediaId: '',
      priceLabel: 'A medida',
      basePrice: 0,
      priceLinesText: '',
      notesText: '',
      serviceIds: this.pageServices().length ? [this.pageServices()[0].id] : [],
      additionalServiceIds: [],
      featureIds: [],
      featured: false,
      status: 'draft',
      active: true,
      order: this.pagePackages().length + 1
    });
  }

  openEditPackageModal(item: CmsPackage): void {
    this.modalEntity.set('package');
    this.modalMode.set('edit');
    this.modalTargetId.set(item.id);
    this.resetEntityForm({
      name: item.name,
      slug: item.slug,
      categoryIds: [...item.categoryIds],
      packageTypeLabel: item.packageTypeLabel,
      summary: item.summary,
      mediaId: item.mediaId,
      priceLabel: item.priceLabel,
      basePrice: item.basePrice,
      priceLinesText: item.priceLines.join('\n'),
      notesText: item.notes.join('\n'),
      serviceIds: [...item.serviceIds],
      additionalServiceIds: [...item.additionalServiceIds],
      featureIds: [...item.featureIds],
      featured: item.featured,
      status: item.status,
      active: item.active,
      order: item.order
    });
  }

  async saveEntityModal(): Promise<void> {
    const page = this.selectedPage();
    const entity = this.modalEntity();
    if (!page || !entity || entity === 'page' || this.entityForm.invalid) {
      this.entityForm.markAllAsTouched();
      return;
    }

    if (this.isUploadingMedia()) {
      this.formError.set('Espera a que termine la subida de archivos antes de guardar.');
      return;
    }

    const raw = this.entityForm.getRawValue();
    this.formError.set('');

    try {
      if (entity === 'section') {
        const normalizedEntityIds = this.normalizeSelectedIds(raw.entityIds);
        if (this.modalMode() === 'create') {
          await this.createSectionForPage(page, raw.type as CmsSectionType, {
            name: raw.name,
            title: raw.title,
            subtitle: raw.subtitle,
            body: raw.body,
            entityIds: normalizedEntityIds,
            status: raw.status as CmsEntityStatus,
            enabled: !!raw.enabled,
            order: Number(raw.order)
          });
        } else if (this.modalTargetId()) {
          const currentSection = this.pageSections().find((item) => item.id === this.modalTargetId());
          await this.store.update('sections', this.modalTargetId()!, {
            name: raw.name,
            type: raw.type,
            status: raw.status,
            entityIds: normalizedEntityIds,
            enabled: !!raw.enabled,
            order: Number(raw.order)
          });
          if (currentSection?.sectionDataId) {
            await this.store.update('sectionsData', currentSection.sectionDataId, {
              title: String(raw.title ?? ''),
              subtitle: String(raw.subtitle ?? ''),
              body: String(raw.body ?? ''),
              status: raw.status
            });
          }
        }
      }

      if (entity === 'service') {
        const servicesSectionId = this.findSectionIdByType(page.id, 'services');
        const points = this.splitLines(raw.pointsText);
        const categoryIds = this.filterCategoryIds(raw.categoryIds, 'service');
        if (this.modalMode() === 'create') {
          const createdService = await this.store.create('services', {
            name: raw.name,
            slug: raw.slug,
            description: raw.description,
            mediaId: String(raw.mediaId ?? ''),
            href: raw.href,
            ctaLabel: raw.ctaLabel,
            points,
            categoryIds,
            status: raw.status,
            active: !!raw.active,
            order: Number(raw.order),
            pageIds: [page.id],
            sectionIds: servicesSectionId ? [servicesSectionId] : []
          });
          await this.syncSectionEntities(page.id, 'services', [...this.pageServices().map((item) => item.id), createdService.id]);
        } else if (this.modalTargetId()) {
          await this.store.update('services', this.modalTargetId()!, {
            name: raw.name,
            slug: raw.slug,
            description: raw.description,
            href: raw.href,
            ctaLabel: raw.ctaLabel,
            mediaId: String(raw.mediaId ?? ''),
            points,
            categoryIds,
            status: raw.status,
            active: !!raw.active,
            order: Number(raw.order)
          });
          await this.syncSectionEntities(page.id, 'services', this.pageServices().map((item) => item.id));
        }
      }

      if (entity === 'package') {
        const packagesSectionId = this.findSectionIdByType(page.id, 'packages');
        const selectedServiceIds = this.normalizeSelectedIds(raw.serviceIds);
        const selectedAdditionalServiceIds = this.normalizeSelectedIds(raw.additionalServiceIds);
        const selectedFeatureIds = this.normalizeSelectedIds(raw.featureIds);
        const categoryIds = this.filterCategoryIds(raw.categoryIds, 'package');
        const priceLines = this.splitLines(raw.priceLinesText);
        const notes = this.splitLines(raw.notesText);
        if (this.modalMode() === 'create') {
          const createdPackage = await this.store.create('packages', {
            name: raw.name,
            slug: raw.slug,
            categoryIds,
            packageTypeLabel: raw.packageTypeLabel,
            summary: raw.summary,
            mediaId: String(raw.mediaId ?? ''),
            priceLabel: raw.priceLabel,
            basePrice: this.toNumber(raw.basePrice),
            priceLines,
            featured: !!raw.featured,
            status: raw.status,
            active: !!raw.active,
            order: Number(raw.order),
            serviceIds: selectedServiceIds,
            additionalServiceIds: selectedAdditionalServiceIds,
            featureIds: selectedFeatureIds,
            pageIds: [page.id],
            sectionIds: packagesSectionId ? [packagesSectionId] : [],
            notes,
            advancedData: {}
          });
          await this.publishLinkedPackageEntities(raw.status, selectedServiceIds, selectedAdditionalServiceIds, selectedFeatureIds);
          await this.syncSectionEntities(page.id, 'packages', [...this.pagePackages().map((item) => item.id), createdPackage.id]);
        } else if (this.modalTargetId()) {
          await this.store.update('packages', this.modalTargetId()!, {
            name: raw.name,
            slug: raw.slug,
            categoryIds,
            packageTypeLabel: raw.packageTypeLabel,
            summary: raw.summary,
            mediaId: String(raw.mediaId ?? ''),
            priceLabel: raw.priceLabel,
            basePrice: this.toNumber(raw.basePrice),
            priceLines,
            notes,
            serviceIds: selectedServiceIds,
            additionalServiceIds: selectedAdditionalServiceIds,
            featureIds: selectedFeatureIds,
            featured: !!raw.featured,
            status: raw.status,
            active: !!raw.active,
            order: Number(raw.order)
          });
          await this.publishLinkedPackageEntities(raw.status, selectedServiceIds, selectedAdditionalServiceIds, selectedFeatureIds);
          await this.syncSectionEntities(page.id, 'packages', this.pagePackages().map((item) => item.id));
        }
      }

      this.closeModal(false);
    } catch (error) {
      this.formError.set(error instanceof Error ? error.message : 'No se pudo guardar el registro.');
    }
  }

  async linkExistingService(): Promise<void> {
    const page = this.selectedPage();
    const serviceId = this.serviceLinkId();
    if (!page || !serviceId) {
      return;
    }

    const service = this.state().services.find((item) => item.id === serviceId);
    if (!service) {
      return;
    }

    const servicesSectionId = this.findSectionIdByType(page.id, 'services');
    try {
      await this.store.update('services', service.id, {
        pageIds: Array.from(new Set([...service.pageIds, page.id])),
        sectionIds: Array.from(new Set([...service.sectionIds, ...(servicesSectionId ? [servicesSectionId] : [])]))
      });
      await this.syncSectionEntities(page.id, 'services', [...this.pageServices().map((item) => item.id), service.id]);
      this.serviceLinkId.set('');
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo vincular el servicio.'));
    }
  }

  async unlinkService(service: CmsService): Promise<void> {
    const page = this.selectedPage();
    if (!page) {
      return;
    }

    const servicesSectionId = this.findSectionIdByType(page.id, 'services');
    try {
      await this.store.update('services', service.id, {
        pageIds: service.pageIds.filter((id) => id !== page.id),
        sectionIds: service.sectionIds.filter((id) => id !== servicesSectionId)
      });
      await this.syncSectionEntities(page.id, 'services', this.pageServices().filter((item) => item.id !== service.id).map((item) => item.id));
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo desvincular el servicio.'));
    }
  }

  async linkExistingPackage(): Promise<void> {
    const page = this.selectedPage();
    const packageId = this.packageLinkId();
    if (!page || !packageId) {
      return;
    }

    const item = this.state().packages.find((entry) => entry.id === packageId);
    if (!item) {
      return;
    }

    const packageSectionId = this.findSectionIdByType(page.id, 'packages');
    try {
      await this.store.update('packages', item.id, {
        pageIds: Array.from(new Set([...item.pageIds, page.id])),
        sectionIds: Array.from(new Set([...item.sectionIds, ...(packageSectionId ? [packageSectionId] : [])]))
      });
      await this.syncSectionEntities(page.id, 'packages', [...this.pagePackages().map((entry) => entry.id), item.id]);
      this.packageLinkId.set('');
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo vincular el paquete.'));
    }
  }

  async unlinkPackage(item: CmsPackage): Promise<void> {
    const page = this.selectedPage();
    if (!page) {
      return;
    }

    const packageSectionId = this.findSectionIdByType(page.id, 'packages');
    try {
      await this.store.update('packages', item.id, {
        pageIds: item.pageIds.filter((id) => id !== page.id),
        sectionIds: item.sectionIds.filter((id) => id !== packageSectionId)
      });
      await this.syncSectionEntities(page.id, 'packages', this.pagePackages().filter((entry) => entry.id !== item.id).map((entry) => entry.id));
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo desvincular el paquete.'));
    }
  }

  async removeSection(section: CmsSection): Promise<void> {
    const page = this.selectedPage();
    if (!page) {
      return;
    }

    const shouldDelete = window.confirm(`Eliminar la sección ${section.name} de esta página? Sus vínculos internos también se limpiarán.`);
    if (!shouldDelete) {
      return;
    }

    try {
      await this.detachSectionReferences(section);
      await this.store.update('pages', page.id, {
        sectionIds: page.sectionIds.filter((id) => id !== section.id)
      });
      if (section.sectionDataId) {
        await this.store.delete('sectionsData', section.sectionDataId);
      }
      await this.store.delete('sections', section.id);
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo eliminar la sección.'));
    }
  }

  closeModal(shouldNavigate = true): void {
    const wasCreateRoute = this.isCreateRoute();
    this.modalEntity.set(null);
    this.modalTargetId.set(null);
    this.quickDrafts.set({});

    if (shouldNavigate && wasCreateRoute) {
      void this.router.navigate(['/admin/pages']);
    }
  }

  entityHasControl(name: string): boolean {
    return this.entityForm.contains(name);
  }

  getEntityArrayValues(name: string): string[] {
    const value = this.entityForm.get(name)?.value;
    return Array.isArray(value) ? value : [];
  }

  toggleEntityArrayValue(name: string, value: string, checked: boolean): void {
    const control = this.entityForm.get(name);
    if (!control) {
      return;
    }

    const current = this.getEntityArrayValues(name);
    const next = checked ? Array.from(new Set([...current, value])) : current.filter((item) => item !== value);
    control.setValue(next);
    control.markAsDirty();
  }

  quickDraftValue(key: string): string {
    return this.quickDrafts()[key] ?? '';
  }

  updateQuickDraft(key: string, value: string): void {
    this.quickDrafts.update((current) => ({ ...current, [key]: value }));
  }

  appendDraftLine(controlName: string, draftKey: string): void {
    const control = this.entityForm.get(controlName);
    const value = this.quickDraftValue(draftKey).trim();
    if (!control || !value) {
      return;
    }

    const next = [...this.splitLines(control.value), value];
    control.setValue(next.join('\n'));
    control.markAsDirty();
    this.updateQuickDraft(draftKey, '');
  }

  removeLineFromControl(controlName: string, index: number): void {
    const control = this.entityForm.get(controlName);
    if (!control) {
      return;
    }

    const next = this.splitLines(control.value).filter((_item, currentIndex) => currentIndex !== index);
    control.setValue(next.join('\n'));
    control.markAsDirty();
  }

  getControlLines(controlName: string): string[] {
    const control = this.entityForm.get(controlName);
    return control ? this.splitLines(control.value) : [];
  }

  getControlValue(controlName: string): string {
    const control = this.entityForm.get(controlName);
    return String(control?.value ?? '');
  }

  async onLocalImageSelected(event: Event, config: { mediaControl: string; namePrefix: string }): Promise<void> {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) {
      return;
    }

    if (this.backendMode === 'firebase') {
      try {
        this.pendingUploads.update((current) => current + 1);
        const createdMedia = await this.mediaUpload.upload(file, {
          alt: file.name.replace(/\.[^.]+$/, ''),
          folder: 'cms/uploads'
        });

        this.entityForm.get(config.mediaControl)?.setValue(createdMedia.id);
        this.entityForm.get(config.mediaControl)?.markAsDirty();

        if (input) {
          input.value = '';
        }
      } catch (error) {
        this.formError.set(this.resolveErrorMessage(error, 'No se pudo subir la imagen a Firebase Storage.'));
      } finally {
        this.pendingUploads.update((current) => Math.max(0, current - 1));
        if (input) {
          input.value = '';
        }
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!dataUrl) {
        return;
      }

      try {
        this.pendingUploads.update((current) => current + 1);
        const createdMedia = await this.store.create('media', {
          name: `${config.namePrefix} · ${file.name}`,
          mediaType: 'image',
          url: dataUrl,
          alt: file.name.replace(/\.[^.]+$/, ''),
          folder: 'uploads/local',
          mimeType: file.type || 'image/*',
          sizeLabel: this.formatFileSize(file.size),
          isMockUpload: true
        });

        this.entityForm.get(config.mediaControl)?.setValue(createdMedia.id);
        this.entityForm.get(config.mediaControl)?.markAsDirty();
      } catch (error) {
        this.formError.set(this.resolveErrorMessage(error, 'No se pudo registrar la imagen local en el CMS.'));
      } finally {
        this.pendingUploads.update((current) => Math.max(0, current - 1));
        if (input) {
          input.value = '';
        }
      }
    };

    reader.readAsDataURL(file);
  }

  clearImageSelection(mediaControl: string): void {
    this.entityForm.get(mediaControl)?.setValue('');
    this.entityForm.get(mediaControl)?.markAsDirty();
  }

  async createQuickAdditionalService(): Promise<void> {
    const name = this.quickDraftValue('newAdditionalService').trim();
    if (!name) {
      return;
    }

    const status = this.entityStatusValue();
    const active = this.entityActiveValue();

    try {
      const created = await this.store.create('additionalServices', {
        name,
        priceLabel: 'A medida',
        basePrice: 0,
        description: 'Servicio adicional creado desde el modal del paquete.',
        status,
        active,
        serviceIds: this.getEntityArrayValues('serviceIds').length ? this.getEntityArrayValues('serviceIds') : this.pageServices().map((item) => item.id)
      });

      this.addArrayValue('additionalServiceIds', created.id);
      this.updateQuickDraft('newAdditionalService', '');
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo crear el servicio adicional.'));
    }
  }

  async createQuickFeature(): Promise<void> {
    const name = this.quickDraftValue('newFeature').trim();
    if (!name) {
      return;
    }

    const status = this.entityStatusValue();
    const active = this.entityActiveValue();

    try {
      const created = await this.store.create('packageFeatures', {
        name,
        description: name,
        categoryIds: this.filterCategoryIds(this.entityForm.get('categoryIds')?.value, 'package'),
        status,
        active,
        value: name
      });

      this.addArrayValue('featureIds', created.id);
      this.updateQuickDraft('newFeature', '');
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo crear el feature.'));
    }
  }

  async createQuickServiceForPackage(): Promise<void> {
    const page = this.selectedPage();
    const name = this.quickDraftValue('newPackageService').trim();
    if (!page || !name) {
      return;
    }

    const status = this.entityStatusValue();
    const active = this.entityActiveValue();

    try {
      const servicesSectionId = this.findSectionIdByType(page.id, 'services');
      const created = await this.store.create('services', {
        name,
        slug: slugify(name),
        description: 'Servicio creado rápidamente desde el modal del paquete.',
        mediaId: '',
        href: page.routePath,
        ctaLabel: 'Ver servicio',
        points: [],
        categoryIds: this.defaultCategoryIds('service'),
        status,
        active,
        order: this.pageServices().length + 1,
        pageIds: [page.id],
        sectionIds: servicesSectionId ? [servicesSectionId] : []
      });

      await this.syncSectionEntities(page.id, 'services', [...this.pageServices().map((item) => item.id), created.id]);
      this.addArrayValue('serviceIds', created.id);
      this.updateQuickDraft('newPackageService', '');
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo crear el servicio rápido.'));
    }
  }

  async createQuickEntityForSection(): Promise<void> {
    const page = this.selectedPage();
    const name = this.quickDraftValue('newSectionEntity').trim();
    const type = String(this.entityForm.get('type')?.value ?? '') as CmsSectionType;
    if (!page || !name) {
      return;
    }

    if (type === 'services') {
      const status = this.entityStatusValue();
      const active = this.entityActiveValue();
      try {
        const servicesSectionId = this.findSectionIdByType(page.id, 'services');
        const created = await this.store.create('services', {
          name,
          slug: slugify(name),
          description: 'Servicio creado rápidamente desde la edición de sección.',
          mediaId: '',
          href: page.routePath,
          ctaLabel: 'Ver servicio',
          points: [],
          categoryIds: this.defaultCategoryIds('service'),
          status,
          active,
          order: this.pageServices().length + 1,
          pageIds: [page.id],
          sectionIds: servicesSectionId ? [servicesSectionId] : []
        });

        await this.syncSectionEntities(page.id, 'services', [...this.pageServices().map((item) => item.id), created.id]);
        this.addArrayValue('entityIds', created.id);
        this.updateQuickDraft('newSectionEntity', '');
      } catch (error) {
        this.formError.set(this.resolveErrorMessage(error, 'No se pudo crear la entidad rápida de servicio.'));
      }
      return;
    }

    if (type === 'packages') {
      const status = this.entityStatusValue();
      const active = this.entityActiveValue();
      try {
        const packageSectionId = this.findSectionIdByType(page.id, 'packages');
        const created = await this.store.create('packages', {
          name,
          slug: slugify(name),
          categoryIds: this.defaultCategoryIds('package'),
          packageTypeLabel: 'Paquete rápido',
          summary: 'Paquete creado rápidamente desde la edición de sección.',
          mediaId: '',
          priceLabel: 'A medida',
          basePrice: 0,
          priceLines: [],
          featured: false,
          status,
          active,
          order: this.pagePackages().length + 1,
          serviceIds: [],
          additionalServiceIds: [],
          featureIds: [],
          pageIds: [page.id],
          sectionIds: packageSectionId ? [packageSectionId] : [],
          notes: [],
          advancedData: {}
        });

        await this.syncSectionEntities(page.id, 'packages', [...this.pagePackages().map((item) => item.id), created.id]);
        this.addArrayValue('entityIds', created.id);
        this.updateQuickDraft('newSectionEntity', '');
      } catch (error) {
        this.formError.set(this.resolveErrorMessage(error, 'No se pudo crear la entidad rápida de paquete.'));
      }
    }
  }

  getSectionEntityOptions(typeValue?: unknown): ModalOption[] {
    const page = this.selectedPage();
    const type = String(typeValue ?? this.entityForm.get('type')?.value ?? '') as CmsSectionType;
    if (!page) {
      return [];
    }

    switch (type) {
      case 'services':
        return this.pageServices().map((service) => ({
          id: service.id,
          label: service.name,
          meta: service.ctaLabel
        }));
      case 'packages':
        return this.pagePackages().map((item) => ({
          id: item.id,
          label: this.packageDisplayName(item),
          meta: item.priceLabel || this.categorySummary(item.categoryIds)
        }));
      case 'gallery':
        return this.state().galleryItems
          .filter((item) => item.pageIds.includes(page.id))
          .map((item) => ({ id: item.id, label: item.title, meta: this.categorySummary(item.categoryIds) }));
      case 'stories':
        return this.state().stories
          .filter((item) => item.pageIds.includes(page.id))
          .map((item) => ({ id: item.id, label: item.clientName, meta: item.location }));
      case 'videos':
        return this.state().videos.map((item) => ({ id: item.id, label: item.name, meta: item.duration }));
      default:
        return [];
    }
  }

  trackByValue(_index: number, value: string): string {
    return value;
  }

  packageDisplayName(item: CmsPackage): string {
    const scope = this.packageScopeLabel(item);
    return scope ? `${item.name} - ${scope}` : item.name;
  }

  additionalServiceDisplayName(item: CmsAdditionalService): string {
    const scope = this.additionalServiceScopeLabel(item);
    return scope ? `${item.name} - ${scope}` : item.name;
  }

  featureDisplayName(item: CmsPackageFeature): string {
    const scope = this.categorySummary(item.categoryIds);
    return scope && scope !== 'General' ? `${item.name} - ${scope}` : item.name;
  }

  isEditingEntity(entity: Exclude<ModalEntity, 'page' | null>, id: string): boolean {
    return this.modalEntity() === entity && this.modalMode() === 'edit' && this.modalTargetId() === id;
  }

  trackById(_index: number, item: { id: string }): string {
    return item.id;
  }

  private async createDefaultStructure(page: CmsPage): Promise<void> {
    const blueprint = this.defaultSectionsForPage(page.pageType);
    const createdSectionIds: string[] = [];

    for (const [index, entry] of blueprint.entries()) {
      const data = await this.store.create('sectionsData', {
        name: `${page.name} ${entry.label} contenido`,
        pageId: page.id,
        sectionType: entry.type,
        title: entry.defaultTitle,
        subtitle: 'Configura este bloque desde la vista de página.',
        body: 'Este contenido fue creado como estructura inicial para la nueva página.',
        mediaIds: [],
        data: {},
        order: index + 1
      });

      const section = await this.store.create('sections', {
        name: entry.label,
        pageId: page.id,
        type: entry.type,
        enabled: true,
        sectionDataId: data.id,
        entityCollection: entry.entityCollection,
        entityIds: [],
        order: index + 1
      });

      createdSectionIds.push(section.id);
    }

    await this.store.update('pages', page.id, { sectionIds: createdSectionIds });
  }

  private async createSectionForPage(
    page: CmsPage,
    sectionType: CmsSectionType,
    overrides?: {
      name?: string;
      title?: string;
      subtitle?: string;
      body?: string;
      entityIds?: string[];
      status?: CmsEntityStatus;
      enabled?: boolean;
      order?: number;
    }
  ): Promise<CmsSection> {
    const nextOrder = overrides?.order ?? this.pageSections().length + 1;
    const data = await this.store.create('sectionsData', {
      name: `${page.name} ${sectionType} contenido`,
      pageId: page.id,
      sectionType,
      title: String(overrides?.title ?? `${page.name} · ${sectionType}`),
      subtitle: String(overrides?.subtitle ?? 'Nuevo bloque agregado desde la página.'),
      body: String(overrides?.body ?? 'Edita este contenido para personalizar la nueva sección.'),
      mediaIds: [],
      data: {},
      status: overrides?.status ?? 'draft',
      order: nextOrder
    });

    const entityCollection = sectionType === 'services'
      ? 'services'
      : sectionType === 'packages'
        ? 'packages'
        : sectionType === 'gallery'
          ? 'galleryItems'
          : sectionType === 'stories'
            ? 'stories'
            : sectionType === 'videos'
              ? 'videos'
              : '';

    const section = await this.store.create('sections', {
      name: overrides?.name || this.sectionTypeLabel(sectionType),
      pageId: page.id,
      type: sectionType,
      status: overrides?.status ?? 'draft',
      enabled: overrides?.enabled ?? true,
      sectionDataId: data.id,
      entityCollection,
      entityIds: overrides?.entityIds ?? [],
      order: nextOrder
    });

    await this.store.update('pages', page.id, {
      sectionIds: [...page.sectionIds, section.id]
    });

    return section;
  }

  private defaultSectionsForPage(pageType: CmsPageType): Array<{ label: string; type: CmsSectionType; entityCollection: '' | 'services' | 'packages' | 'videos'; defaultTitle: string }> {
    switch (pageType) {
      case 'video':
        return [
          { label: 'Hero', type: 'hero', entityCollection: '', defaultTitle: 'Presentación principal' },
          { label: 'Videos', type: 'videos', entityCollection: 'videos', defaultTitle: 'Galería de videos' }
        ];
      case 'wedding':
        return [
          { label: 'Invitación', type: 'invitation', entityCollection: '', defaultTitle: 'Invitación principal' },
          { label: 'Passport', type: 'passport', entityCollection: '', defaultTitle: 'Passport del invitado' }
        ];
      case 'brand':
        return [
          { label: 'Hero', type: 'hero', entityCollection: '', defaultTitle: 'Hero de marca' },
          { label: 'About', type: 'about', entityCollection: '', defaultTitle: 'Bloque de presentación' }
        ];
      default:
        return [
          { label: 'Hero', type: 'hero', entityCollection: '', defaultTitle: 'Hero principal' },
          { label: 'Servicios', type: 'services', entityCollection: 'services', defaultTitle: 'Servicios de la página' },
          { label: 'Paquetes', type: 'packages', entityCollection: 'packages', defaultTitle: 'Paquetes de la página' }
        ];
    }
  }

  private defaultCategoryIds(type: CmsCategory['type']): string[] {
    const scope = this.selectedPageScope();
    const matches = this.state().categories
      .filter((category) => category.type === type)
      .filter((category) => !scope || normalizeServiceScopeKey(category.slug || category.name) === scope);

    return matches.length ? matches.map((category) => category.id) : [];
  }

  private findSectionIdByType(pageId: string, type: CmsSectionType): string | undefined {
    return this.state().sections.find((section) => section.pageId === pageId && section.type === type)?.id;
  }

  private getSectionData(sectionDataId: string): CmsSectionData | undefined {
    return this.state().sectionsData.find((item) => item.id === sectionDataId);
  }

  private packageScopeLabel(item: CmsPackage): string {
    const categoryLabel = this.categorySummary(item.categoryIds);
    if (categoryLabel && categoryLabel !== 'General') {
      return categoryLabel;
    }

    const linkedPage = item.pageIds
      .map((pageId) => this.pagesById().get(pageId))
      .find((page) => !!page && page.pageType !== 'landing' && page.pageType !== 'brand');

    if (linkedPage?.name) {
      const cleaned = linkedPage.name
        .replace(/^portfolio\s+/i, '')
        .replace(/^pagina\s+/i, '')
        .trim();
      return humanizeServiceScope(cleaned || linkedPage.slug || linkedPage.pageType);
    }

    return categoryLabel;
  }

  private inferPageScope(page: CmsPage | null | undefined): string {
    if (!page) {
      return '';
    }

    if (page.pageType === 'landing' || page.pageType === 'brand' || page.pageType === 'wedding') {
      return '';
    }

    if (page.pageType === 'video') {
      return 'videos';
    }

    return normalizeServiceScopeKey(page.name) || normalizeServiceScopeKey(page.slug) || normalizeServiceScopeKey(page.routePath);
  }

  private matchesCurrentPageScope(item: CmsService | CmsPackage | CmsAdditionalService | CmsPackageFeature): boolean {
    const currentScope = this.selectedPageScope();
    if (!currentScope || currentScope === 'general') {
      return true;
    }

    if ('value' in item) {
      return this.categoryScopes(item.categoryIds).includes(currentScope);
    }

    if ('serviceIds' in item) {
      return item.serviceIds.some((serviceId) => {
        const service = this.servicesById().get(serviceId);
        return !!service && this.matchesCurrentPageScope(service);
      });
    }

    const directScopeMatch = 'categoryIds' in item && this.categoryScopes(item.categoryIds).includes(currentScope);
    return directScopeMatch || item.pageIds.some((pageId) => {
      const page = this.pagesById().get(pageId);
      return this.inferPageScope(page) === currentScope;
    });
  }

  private additionalServiceScopeLabel(item: CmsAdditionalService): string {
    const scopes = Array.from(
      new Set(
        item.serviceIds
          .map((serviceId) => this.servicesById().get(serviceId))
          .flatMap((service) => {
            if (!service) {
              return [];
            }

            return service.pageIds
              .map((pageId) => this.pagesById().get(pageId))
              .filter((page): page is CmsPage => !!page)
              .map((page) => {
                const cleaned = page.name
                  .replace(/^portfolio\s+/i, '')
                  .replace(/^pagina\s+/i, '')
                  .trim();
                return humanizeServiceScope(cleaned || page.slug || page.pageType);
              });
          })
          .filter(Boolean)
      )
    );

    if (!scopes.length) {
      return '';
    }

    if (scopes.length === 1) {
      return scopes[0];
    }

    return `${scopes[0]} +${scopes.length - 1}`;
  }

  private addArrayValue(controlName: string, value: string): void {
    const control = this.entityForm.get(controlName);
    if (!control) {
      return;
    }

    const next = Array.from(new Set([...this.getEntityArrayValues(controlName), value]));
    control.setValue(next);
    control.markAsDirty();
  }

  private async syncSectionEntities(pageId: string, type: CmsSectionType, entityIds: string[]): Promise<void> {
    const sectionId = this.findSectionIdByType(pageId, type);
    if (!sectionId) {
      return;
    }

    await this.store.update('sections', sectionId, {
      entityIds: Array.from(new Set(entityIds))
    });
  }

  private async detachSectionReferences(section: CmsSection): Promise<void> {
    const uniqueEntityIds = Array.from(new Set(section.entityIds));

    if (section.entityCollection === 'services') {
      await Promise.all(
        uniqueEntityIds.map(async (entityId) => {
          const service = this.state().services.find((item) => item.id === entityId);
          if (!service) {
            return;
          }

          await this.store.update('services', service.id, {
            sectionIds: service.sectionIds.filter((id) => id !== section.id)
          });
        })
      );
      return;
    }

    if (section.entityCollection === 'packages') {
      await Promise.all(
        uniqueEntityIds.map(async (entityId) => {
          const item = this.state().packages.find((entry) => entry.id === entityId);
          if (!item) {
            return;
          }

          await this.store.update('packages', item.id, {
            sectionIds: item.sectionIds.filter((id) => id !== section.id)
          });
        })
      );
      return;
    }

    if (section.entityCollection === 'galleryItems') {
      await Promise.all(
        uniqueEntityIds.map(async (entityId) => {
          const item = this.state().galleryItems.find((entry) => entry.id === entityId);
          if (!item) {
            return;
          }

          await this.store.update('galleryItems', item.id, {
            sectionIds: item.sectionIds.filter((id) => id !== section.id)
          });
        })
      );
      return;
    }

    if (section.entityCollection === 'stories') {
      await Promise.all(
        uniqueEntityIds.map(async (entityId) => {
          const item = this.state().stories.find((entry) => entry.id === entityId);
          if (!item) {
            return;
          }

          await this.store.update('stories', item.id, {
            sectionIds: item.sectionIds.filter((id) => id !== section.id)
          });
        })
      );
      return;
    }

    if (section.entityCollection === 'videos') {
      return;
    }
  }

  private resolveErrorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
  }

  private entityStatusValue(): CmsEntityStatus {
    const value = String(this.entityForm.get('status')?.value ?? 'draft').trim();
    return value === 'published' || value === 'archived' ? value : 'draft';
  }

  private entityActiveValue(): boolean {
    return !!this.entityForm.get('active')?.value;
  }

  private async publishLinkedPackageEntities(
    status: unknown,
    serviceIds: string[],
    additionalServiceIds: string[],
    featureIds: string[]
  ): Promise<void> {
    if (status !== 'published') {
      return;
    }

    await Promise.all([
      ...serviceIds.map(async (serviceId) => {
        const service = this.state().services.find((item) => item.id === serviceId);
        if (!service || (service.status === 'published' && service.active)) {
          return;
        }

        await this.store.update('services', serviceId, {
          status: 'published',
          active: true
        });
      }),
      ...additionalServiceIds.map(async (additionalId) => {
        const additional = this.state().additionalServices.find((item) => item.id === additionalId);
        if (!additional || (additional.status === 'published' && additional.active)) {
          return;
        }

        await this.store.update('additionalServices', additionalId, {
          status: 'published',
          active: true
        });
      }),
      ...featureIds.map(async (featureId) => {
        const feature = this.state().packageFeatures.find((item) => item.id === featureId);
        if (!feature || (feature.status === 'published' && feature.active)) {
          return;
        }

        await this.store.update('packageFeatures', featureId, {
          status: 'published',
          active: true
        });
      })
    ]);
  }

  private splitLines(value: unknown): string[] {
    return String(value ?? '')
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  private filterSelectableIds(value: unknown, options: ModalOption[]): string[] {
    const allowed = new Set(options.map((item) => item.id));
    return (Array.isArray(value) ? value : []).filter((item): item is string => typeof item === 'string' && allowed.has(item));
  }

  private normalizeSelectedIds(value: unknown): string[] {
    return Array.from(
      new Set(
        (Array.isArray(value) ? value : [])
          .map((item) => String(item ?? '').trim())
          .filter(Boolean)
      )
    );
  }

  private toNumber(value: unknown): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private sectionTypeLabel(type: CmsSectionType): string {
    return SECTION_TYPE_OPTIONS.find((item) => item.value === type)?.label ?? type;
  }

  private resetEntityForm(payload: Record<string, unknown>): void {
    Object.keys(this.entityForm.controls).forEach((key) => this.entityForm.removeControl(key));
    Object.entries(payload).forEach(([key, value]) => {
      this.entityForm.addControl(
        key,
        this.fb.control(
          value,
          ['name', 'slug', 'type', 'priceLabel', 'packageTypeLabel', 'title', 'status'].includes(key) ? Validators.required : []
        )
      );
    });
  }

  categorySummary(categoryIds: string[]): string {
    const names = this.categoryNames(categoryIds);
    if (!names.length) {
      return '';
    }

    return names.length === 1 ? names[0] : `${names[0]} +${names.length - 1}`;
  }

  categoryNames(categoryIds: string[] | null | undefined): string[] {
    return (categoryIds ?? [])
      .map((categoryId) => this.categoriesById().get(categoryId)?.name)
      .filter((name): name is string => !!name);
  }

  categoryOptions(type: CmsCategory['type']): CmsCategory[] {
    return this.state().categories
      .filter((category) => category.type === type)
      .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name));
  }

  statusLabel(status: CmsEntityStatus): string {
    return status === 'draft' ? 'Draft' : status === 'published' ? 'Published' : 'Archived';
  }

  previewMediaUrl(controlName = 'mediaId'): string {
    return this.media.resolveUrl(String(this.entityForm.get(controlName)?.value ?? ''));
  }

  private categoryScopes(categoryIds: string[] | null | undefined): string[] {
    return (categoryIds ?? [])
      .map((categoryId) => this.categoriesById().get(categoryId))
      .filter((category): category is CmsCategory => !!category)
      .map((category) => normalizeServiceScopeKey(category.slug || category.name))
      .filter(Boolean);
  }

  private filterCategoryIds(value: unknown, type: CmsCategory['type']): string[] {
    const allowed = new Set(this.categoryOptions(type).map((category) => category.id));
    return (Array.isArray(value) ? value : [])
      .filter((item): item is string => typeof item === 'string' && allowed.has(item));
  }
}
