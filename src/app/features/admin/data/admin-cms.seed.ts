import {
  CmsAdditionalService,
  CmsCategory,
  CmsDatabaseState,
  CmsGalleryItem,
  CmsGeneralSettings,
  CmsMedia,
  CmsPackage,
  CmsPackageFeature,
  CmsPage,
  CmsSection,
  CmsSectionData,
  CmsService,
  CmsStory,
  CmsVideo,
  CmsVideoCategory,
  CmsPageSnapshot
} from '../models/cms.models';
import {
  portfolioAdditionalServices,
  portfolioGalleryItems,
  portfolioPackageDetails,
  portfolioProfessionalProfile,
  portfolioServicePageConfigs,
  portfolioServices,
  portfolioVideoCategories,
  portfolioVideoItems,
  socialLinks
} from '../../portfolio/portfolio.data';

const seedTimestamp = new Date().toISOString();

function slugify(value: string): string {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeMoney(value: string | undefined): number {
  const numeric = String(value ?? '').replace(/[^0-9]/g, '');
  return numeric ? Number(numeric) : 0;
}

function createBaseEntity(id: string, name: string, order: number) {
  return {
    id,
    name,
    active: true,
    status: 'published' as const,
    publishedAt: seedTimestamp,
    deletedAt: null,
    order,
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp
  };
}

function fileNameFromUrl(url: string): string {
  const clean = String(url ?? '').split('?')[0];
  return clean.split('/').pop() ?? clean;
}

function folderFromUrl(url: string): string {
  const segments = String(url ?? '').split('/');
  return segments.length > 1 ? segments.slice(0, -1).join('/') : 'assets';
}

function inferMediaType(url: string): CmsMedia['mediaType'] {
  if (/youtube|youtu\.be|\.mp4|\.webm/i.test(url)) {
    return 'video';
  }

  if (/\.pdf|\.doc|\.docx/i.test(url)) {
    return 'document';
  }

  return 'image';
}

function buildMediaId(url: string): string {
  return `media-${slugify(url)}`;
}

function buildServiceId(name: string): string {
  return `service-${slugify(name)}`;
}

function buildAdditionalServiceId(name: string): string {
  return `additional-${slugify(name)}`;
}

function buildFeatureId(name: string): string {
  return `feature-${slugify(name)}`;
}

function buildPackageId(category: string, slug: string): string {
  return `package-${category}-${slug}`;
}

function buildVideoId(videoId: string): string {
  return `video-${videoId}`;
}

function buildStoryId(category: string, name: string): string {
  return `story-${category}-${slugify(name)}`;
}

function buildGalleryId(title: string, index: number): string {
  return `gallery-${slugify(title)}-${index + 1}`;
}

function buildPageId(slug: string): string {
  return `page-${slug}`;
}

function buildCategoryId(type: CmsCategory['type'], slug: string): string {
  return `category-${type}-${slug}`;
}

function buildSectionDataId(pageSlug: string, key: string): string {
  return `section-data-${pageSlug}-${key}`;
}

function buildSectionId(pageSlug: string, key: string): string {
  return `section-${pageSlug}-${key}`;
}

function createMediaCollection(): CmsMedia[] {
  const mediaMap = new Map<string, CmsMedia>();
  const addMedia = (url: string, alt = '', order = mediaMap.size + 1) => {
    if (!url || mediaMap.has(url)) {
      return;
    }

    mediaMap.set(url, {
      ...createBaseEntity(buildMediaId(url), fileNameFromUrl(url), order),
      mediaType: inferMediaType(url),
      url,
      alt,
      folder: folderFromUrl(url),
      mimeType: inferMediaType(url) === 'video' ? 'video/youtube' : 'image/jpeg',
      sizeLabel: 'mock',
      isMockUpload: false
    });
  };

  portfolioServices.forEach((service, index) => addMedia(service.image, service.title, index + 1));
  portfolioGalleryItems.forEach((item, index) => addMedia(item.src, item.alt, index + 20));
  portfolioPackageDetails.forEach((item, index) => addMedia(item.image, item.title, index + 40));

  Object.values(portfolioServicePageConfigs).forEach((config) => {
    addMedia(config.hero.backgroundImage, config.hero.title);
    config.stories.forEach((story) => story.images.forEach((image) => addMedia(image.src, image.alt)));
  });

  portfolioVideoCategories.forEach((category) => {
    category.videos.forEach((video) => addMedia(video.thumbnail, video.title));
  });

  return Array.from(mediaMap.values()).sort((left, right) => left.order - right.order);
}

const media = createMediaCollection();
const mediaIdByUrl = new Map(media.map((item) => [item.url, item.id]));

function buildAdditionalServices(): CmsAdditionalService[] {
  const map = new Map<string, CmsAdditionalService>();
  const upsert = (name: string, priceLabel: string, description: string, serviceIds: string[] = []) => {
    if (!name) {
      return;
    }

    const id = buildAdditionalServiceId(name);
    const current = map.get(id);
    const nextServiceIds = Array.from(new Set([...(current?.serviceIds ?? []), ...serviceIds]));

    map.set(id, {
      ...createBaseEntity(id, name, current?.order ?? map.size + 1),
      priceLabel: priceLabel || current?.priceLabel || 'A medida',
      basePrice: normalizeMoney(priceLabel || current?.priceLabel),
      description: description || current?.description || 'Complemento comercial configurable desde el CMS.',
      serviceIds: nextServiceIds
    });
  };

  portfolioAdditionalServices.forEach((item) => {
    upsert(item.title, item.price, item.description, portfolioServices.map((service) => buildServiceId(service.title)));
  });

  portfolioPackageDetails.forEach((detail) => {
    detail.requestOptionGroups
      .filter((group) => group.selectable)
      .flatMap((group) => group.options)
      .forEach((option) => {
        upsert(option.label, option.priceLabel ?? 'A medida', `Extra configurable para ${detail.title}.`, [buildServiceId(detail.categoryLabel)]);
      });
  });

  return Array.from(map.values()).sort((left, right) => left.order - right.order);
}

const additionalServices = buildAdditionalServices();
const additionalServiceIdByName = new Map(additionalServices.map((item) => [item.name, item.id]));

function buildCategories(): CmsCategory[] {
  const serviceCategories = Object.entries(portfolioServicePageConfigs).map(([slug, config], index) => ({
    ...createBaseEntity(buildCategoryId('service', slug), config.label, index + 1),
    slug,
    type: 'service' as const
  }));

  const packageCategories = Object.entries(portfolioServicePageConfigs).map(([slug, config], index) => ({
    ...createBaseEntity(buildCategoryId('package', slug), config.label, serviceCategories.length + index + 1),
    slug,
    type: 'package' as const
  }));

  const videoCategories = portfolioVideoCategories.map((category, index) => ({
    ...createBaseEntity(buildCategoryId('video', category.key), category.title, serviceCategories.length + packageCategories.length + index + 1),
    slug: category.key,
    type: 'video' as const
  }));

  return [...serviceCategories, ...packageCategories, ...videoCategories];
}

const categories = buildCategories();

function findCategoryId(type: CmsCategory['type'], slug: string): string {
  return categories.find((item) => item.type === type && item.slug === slug)?.id ?? '';
}

function buildPackageFeatures(): CmsPackageFeature[] {
  const map = new Map<string, CmsPackageFeature>();

  portfolioPackageDetails.forEach((detail) => {
    detail.sections.forEach((section) => {
      section.items.forEach((item) => {
        const id = buildFeatureId(item);
        if (map.has(id)) {
          return;
        }

        map.set(id, {
          ...createBaseEntity(id, item, map.size + 1),
          description: item,
          categoryIds: [findCategoryId('package', detail.category)].filter(Boolean),
          value: item
        });
      });
    });
  });

  return Array.from(map.values()).sort((left, right) => left.order - right.order);
}

const packageFeatures = buildPackageFeatures();
const packageFeatureIdByName = new Map(packageFeatures.map((item) => [item.name, item.id]));

function inferServiceCategoryIds(service: typeof portfolioServices[number]): string[] {
  const normalized = `${service.title} ${service.href ?? ''}`.toLowerCase();
  return Object.keys(portfolioServicePageConfigs)
    .filter((slug) => normalized.includes(slug))
    .map((slug) => findCategoryId('service', slug))
    .filter(Boolean);
}

function buildPages(): CmsPage[] {
  const items: Array<Omit<CmsPage, 'sectionIds'>> = [
    {
      ...createBaseEntity(buildPageId('brand'), 'Brand Mode', 1),
      slug: 'brand',
      routePath: '/brand',
      pageType: 'brand',
      description: 'Landing de presentación de marca.',
      metaTitle: 'TECNOJACK | Brand',
      metaDescription: 'Presentacion de marca y experiencia visual principal.'
    },
    {
      ...createBaseEntity(buildPageId('portfolio'), 'Portfolio Home', 2),
      slug: 'portfolio',
      routePath: '/portfolio',
      pageType: 'landing',
      description: 'Landing comercial del portfolio.',
      metaTitle: 'TECNOJACK | Portfolio',
      metaDescription: 'Portafolio premium de fotografia, video y experiencias visuales.'
    },
    {
      ...createBaseEntity(buildPageId('portfolio-videos'), 'Portfolio Videos', 3),
      slug: 'portfolio-videos',
      routePath: '/portfolio/videos',
      pageType: 'video',
      description: 'Pagina dedicada a categorias y galerias de video.',
      metaTitle: 'TECNOJACK | Videos',
      metaDescription: 'Videos musicales, bodas y proyectos especiales.'
    },
    {
      ...createBaseEntity(buildPageId('portfolio-bodas'), 'Portfolio Bodas', 4),
      slug: 'portfolio-bodas',
      routePath: '/portfolio/bodas',
      pageType: 'service-category',
      description: 'Categoria comercial de bodas.',
      metaTitle: 'TECNOJACK | Bodas',
      metaDescription: 'Cobertura de bodas con direccion cinematografica.'
    },
    {
      ...createBaseEntity(buildPageId('portfolio-quinces'), 'Portfolio Quinces', 5),
      slug: 'portfolio-quinces',
      routePath: '/portfolio/quinces',
      pageType: 'service-category',
      description: 'Categoria comercial de quinceaneros.',
      metaTitle: 'TECNOJACK | Quinces',
      metaDescription: 'Quinceaneros con retratos, cobertura y clips de alto impacto.'
    },
    {
      ...createBaseEntity(buildPageId('portfolio-grados'), 'Portfolio Grados', 6),
      slug: 'portfolio-grados',
      routePath: '/portfolio/grados',
      pageType: 'service-category',
      description: 'Categoria comercial de grados.',
      metaTitle: 'TECNOJACK | Grados',
      metaDescription: 'Paqueticos claros para ceremonias y promociones.'
    },
    {
      ...createBaseEntity(buildPageId('portfolio-preboda'), 'Portfolio Preboda', 7),
      slug: 'portfolio-preboda',
      routePath: '/portfolio/preboda',
      pageType: 'service-category',
      description: 'Categoria comercial de preboda.',
      metaTitle: 'TECNOJACK | Preboda',
      metaDescription: 'Sesiones previas con direccion editorial.'
    },
    {
      ...createBaseEntity(buildPageId('wedding'), 'Wedding Experience', 8),
      slug: 'wedding',
      routePath: '/:wedding/:guest',
      pageType: 'wedding',
      description: 'Experiencia dinamica de invitaciones y pagina de boda.',
      metaTitle: 'TECNOJACK | Wedding',
      metaDescription: 'Pagina dinamica de boda, invitacion y passport.'
    },
    {
      ...createBaseEntity(buildPageId('admin'), 'Admin CMS', 9),
      slug: 'admin',
      routePath: '/admin',
      pageType: 'admin',
      description: 'Modulo interno de gestion del contenido.',
      metaTitle: 'TECNOJACK | Admin',
      metaDescription: 'Centro de control del contenido del sitio.'
    }
  ];

  return items.map((item) => ({ ...item, sectionIds: [] }));
}

const pages = buildPages();
const pageBySlug = new Map(pages.map((page) => [page.slug, page]));

function buildSectionData(): CmsSectionData[] {
  const homePageId = pageBySlug.get('portfolio')?.id ?? '';
  const videoPageId = pageBySlug.get('portfolio-videos')?.id ?? '';
  const weddingPageId = pageBySlug.get('wedding')?.id ?? '';

  const items: CmsSectionData[] = [
    {
      ...createBaseEntity(buildSectionDataId('portfolio', 'hero'), 'Portfolio Hero', 1),
      pageId: homePageId,
      sectionType: 'hero',
      title: 'Portafolio premium para momentos que merecen quedarse',
      subtitle: 'Fotografia, video e invitaciones digitales con direccion visual y enfoque comercial.',
      body: 'Este bloque centraliza el mensaje de apertura de la landing del portfolio y permite evolucionarlo sin tocar componentes.',
      mediaIds: [],
      data: {
        stats: ['7+ anos', '4K', '100% direccion artistica'],
        highlights: ['Estetica cinematografica', 'Cobertura para eventos y marcas', 'Direccion visual con intencion']
      }
    },
    {
      ...createBaseEntity(buildSectionDataId('portfolio', 'about'), 'Portfolio About', 2),
      pageId: homePageId,
      sectionType: 'about',
      title: 'Pilares de la marca',
      subtitle: 'Experiencia, calidad y arte con intencion.',
      body: 'Este bloque resume la promesa principal del portfolio para la parte comercial.',
      mediaIds: [],
      data: {
        pillars: ['Experiencia que guia', 'Calidad que permanece', 'Arte con intencion']
      }
    },
    {
      ...createBaseEntity(buildSectionDataId('portfolio', 'profile'), 'Portfolio Profile', 3),
      pageId: homePageId,
      sectionType: 'profile',
      title: portfolioProfessionalProfile.title,
      subtitle: portfolioProfessionalProfile.eyebrow,
      body: portfolioProfessionalProfile.lead,
      mediaIds: [],
      data: {
        supportingLabel: portfolioProfessionalProfile.supportingLabel,
        points: portfolioProfessionalProfile.points,
        ctaLabel: portfolioProfessionalProfile.ctaLabel,
        ctaHref: portfolioProfessionalProfile.ctaHref
      }
    },
    {
      ...createBaseEntity(buildSectionDataId('portfolio', 'contact'), 'Portfolio Contact', 4),
      pageId: homePageId,
      sectionType: 'contact',
      title: 'Conversemos',
      subtitle: 'Cierra por WhatsApp o lleva al cliente a tus redes.',
      body: 'Esta seccion resume el cierre comercial del portfolio y se conecta con la configuracion general.',
      mediaIds: [],
      data: {
        channels: ['whatsapp', 'instagram', 'facebook', 'tiktok']
      }
    },
    {
      ...createBaseEntity(buildSectionDataId('portfolio-videos', 'hero'), 'Video Hero', 5),
      pageId: videoPageId,
      sectionType: 'hero',
      title: 'Categorias de video y playlists',
      subtitle: 'Todo el catalogo audiovisual en un solo bloque administrable.',
      body: 'La pagina de videos puede cambiar textos, enfoque comercial y priorizacion sin tocar la UI publica.',
      mediaIds: [],
      data: {
        featuredFormats: portfolioVideoItems.map((item) => item.format)
      }
    },
    {
      ...createBaseEntity(buildSectionDataId('wedding', 'invitation'), 'Wedding Invitation', 6),
      pageId: weddingPageId,
      sectionType: 'invitation',
      title: 'Invitacion digital dinamica',
      subtitle: 'Controla textos base, estructura y bloques de experiencia.',
      body: 'Esta pagina representa la arquitectura de bodas y demuestra que el CMS no queda amarrado solo al portfolio.',
      mediaIds: [],
      data: {
        widgets: ['hero', 'countdown', 'map', 'gallery', 'passport']
      }
    },
    {
      ...createBaseEntity(buildSectionDataId('wedding', 'passport'), 'Wedding Passport', 7),
      pageId: weddingPageId,
      sectionType: 'passport',
      title: 'Passport y confirmacion',
      subtitle: 'Gestiona la capa de acceso y acompanamiento del invitado.',
      body: 'Sirve como referencia de seccion dinamica para experiencias personalizadas.',
      mediaIds: [],
      data: {
        actions: ['confirmacion', 'mesa', 'codigo QR', 'recordatorio']
      }
    }
  ];

  Object.entries(portfolioServicePageConfigs).forEach(([category, config], index) => {
    const pageId = pageBySlug.get(`portfolio-${category}`)?.id ?? '';

    items.push({
      ...createBaseEntity(buildSectionDataId(`portfolio-${category}`, 'hero'), `${config.label} Hero`, 10 + index * 2),
      pageId,
      sectionType: 'hero',
      title: config.hero.title,
      subtitle: config.hero.eyebrow,
      body: config.hero.description,
      mediaIds: [mediaIdByUrl.get(config.hero.backgroundImage) ?? ''].filter(Boolean),
      data: {
        highlights: config.hero.highlights,
        whatsappMessage: config.hero.whatsappMessage
      }
    });

    items.push({
      ...createBaseEntity(buildSectionDataId(`portfolio-${category}`, 'packages'), `${config.label} Packages`, 11 + index * 2),
      pageId,
      sectionType: 'packages',
      title: config.packageTitle,
      subtitle: config.packageEyebrow,
      body: config.packageLead,
      mediaIds: [],
      data: {
        storiesTitle: config.storiesTitle,
        storiesLead: config.storiesLead
      }
    });
  });

  return items;
}

const sectionsData = buildSectionData();

function buildSections(): CmsSection[] {
  const sections: CmsSection[] = [];
  const register = (item: CmsSection) => sections.push(item);

  const homePageId = pageBySlug.get('portfolio')?.id ?? '';
  register({
    ...createBaseEntity(buildSectionId('portfolio', 'hero'), 'Portfolio Hero Section', 1),
    pageId: homePageId,
    type: 'hero',
    enabled: true,
    sectionDataId: buildSectionDataId('portfolio', 'hero'),
    entityCollection: '',
    entityIds: []
  });
  register({
    ...createBaseEntity(buildSectionId('portfolio', 'about'), 'Portfolio About Section', 2),
    pageId: homePageId,
    type: 'about',
    enabled: true,
    sectionDataId: buildSectionDataId('portfolio', 'about'),
    entityCollection: '',
    entityIds: []
  });
  register({
    ...createBaseEntity(buildSectionId('portfolio', 'profile'), 'Portfolio Profile Section', 3),
    pageId: homePageId,
    type: 'profile',
    enabled: true,
    sectionDataId: buildSectionDataId('portfolio', 'profile'),
    entityCollection: '',
    entityIds: []
  });
  register({
    ...createBaseEntity(buildSectionId('portfolio', 'services'), 'Portfolio Services Section', 4),
    pageId: homePageId,
    type: 'services',
    enabled: true,
    sectionDataId: '',
    entityCollection: 'services',
    entityIds: portfolioServices.map((service) => buildServiceId(service.title))
  });
  register({
    ...createBaseEntity(buildSectionId('portfolio', 'gallery'), 'Portfolio Gallery Section', 5),
    pageId: homePageId,
    type: 'gallery',
    enabled: true,
    sectionDataId: '',
    entityCollection: 'galleryItems',
    entityIds: portfolioGalleryItems.map((item, index) => buildGalleryId(item.title, index))
  });
  register({
    ...createBaseEntity(buildSectionId('portfolio', 'videos'), 'Portfolio Videos Section', 6),
    pageId: homePageId,
    type: 'videos',
    enabled: true,
    sectionDataId: '',
    entityCollection: 'videos',
    entityIds: portfolioVideoItems.map((item) => buildVideoId(item.youtubeId))
  });
  register({
    ...createBaseEntity(buildSectionId('portfolio', 'contact'), 'Portfolio Contact Section', 7),
    pageId: homePageId,
    type: 'contact',
    enabled: true,
    sectionDataId: buildSectionDataId('portfolio', 'contact'),
    entityCollection: 'generalSettings',
    entityIds: ['settings-primary']
  });

  const videoPageId = pageBySlug.get('portfolio-videos')?.id ?? '';
  register({
    ...createBaseEntity(buildSectionId('portfolio-videos', 'hero'), 'Videos Hero Section', 8),
    pageId: videoPageId,
    type: 'hero',
    enabled: true,
    sectionDataId: buildSectionDataId('portfolio-videos', 'hero'),
    entityCollection: '',
    entityIds: []
  });
  register({
    ...createBaseEntity(buildSectionId('portfolio-videos', 'categories'), 'Videos Categories Section', 9),
    pageId: videoPageId,
    type: 'videos',
    enabled: true,
    sectionDataId: '',
    entityCollection: 'videoCategories',
    entityIds: portfolioVideoCategories.map((item) => `video-category-${item.key}`)
  });

  Object.entries(portfolioServicePageConfigs).forEach(([category, config], index) => {
    const pageSlug = `portfolio-${category}`;
    const pageId = pageBySlug.get(pageSlug)?.id ?? '';
    register({
      ...createBaseEntity(buildSectionId(pageSlug, 'hero'), `${config.label} Hero Section`, 20 + index * 3),
      pageId,
      type: 'hero',
      enabled: true,
      sectionDataId: buildSectionDataId(pageSlug, 'hero'),
      entityCollection: '',
      entityIds: []
    });
    register({
      ...createBaseEntity(buildSectionId(pageSlug, 'packages'), `${config.label} Packages Section`, 21 + index * 3),
      pageId,
      type: 'packages',
      enabled: true,
      sectionDataId: buildSectionDataId(pageSlug, 'packages'),
      entityCollection: 'packages',
      entityIds: portfolioPackageDetails
        .filter((item) => item.category === category)
        .map((item) => buildPackageId(item.category, item.slug))
    });
    register({
      ...createBaseEntity(buildSectionId(pageSlug, 'stories'), `${config.label} Stories Section`, 22 + index * 3),
      pageId,
      type: 'stories',
      enabled: true,
      sectionDataId: '',
      entityCollection: 'stories',
      entityIds: config.stories.map((story) => buildStoryId(category, story.title))
    });
  });

  const weddingPageId = pageBySlug.get('wedding')?.id ?? '';
  register({
    ...createBaseEntity(buildSectionId('wedding', 'invitation'), 'Wedding Invitation Section', 40),
    pageId: weddingPageId,
    type: 'invitation',
    enabled: true,
    sectionDataId: buildSectionDataId('wedding', 'invitation'),
    entityCollection: '',
    entityIds: []
  });
  register({
    ...createBaseEntity(buildSectionId('wedding', 'passport'), 'Wedding Passport Section', 41),
    pageId: weddingPageId,
    type: 'passport',
    enabled: true,
    sectionDataId: buildSectionDataId('wedding', 'passport'),
    entityCollection: '',
    entityIds: []
  });

  return sections;
}

const sections = buildSections();

const sectionsByPageId = sections.reduce<Record<string, string[]>>((accumulator, section) => {
  accumulator[section.pageId] = [...(accumulator[section.pageId] ?? []), section.id];
  return accumulator;
}, {});

const hydratedPages: CmsPage[] = pages.map((page) => ({
  ...page,
  sectionIds: (sectionsByPageId[page.id] ?? []).sort()
}));

const services: CmsService[] = portfolioServices.map((service, index) => ({
  ...createBaseEntity(buildServiceId(service.title), service.title, index + 1),
  slug: slugify(service.title),
  description: service.description,
  mediaId: mediaIdByUrl.get(service.image) ?? '',
  href: service.href ?? '/portfolio',
  ctaLabel: service.ctaLabel ?? 'Ver servicio',
  points: service.points,
  pageIds: [pageBySlug.get('portfolio')?.id ?? ''],
  sectionIds: [buildSectionId('portfolio', 'services')],
  categoryIds: inferServiceCategoryIds(service)
}));

function pageIdsForCategory(category: string): string[] {
  if (!category) {
    return [pageBySlug.get('portfolio')?.id ?? ''].filter(Boolean);
  }

  const pageId = pageBySlug.get(`portfolio-${category}`)?.id;
  return pageId ? [pageId] : [];
}

function sectionIdsForCategory(category: string): string[] {
  if (!category) {
    return [];
  }

  return [buildSectionId(`portfolio-${category}`, 'packages')];
}

const packages: CmsPackage[] = portfolioPackageDetails.map((item, index) => ({
  ...createBaseEntity(buildPackageId(item.category, item.slug), item.title, index + 1),
  slug: item.slug,
  categoryIds: [findCategoryId('package', item.category)].filter(Boolean),
  packageTypeLabel: item.packageTypeLabel,
  summary: item.lead,
  mediaId: mediaIdByUrl.get(item.image) ?? '',
  priceLabel: item.priceLines[0] ?? 'A medida',
  basePrice: item.baseQuoteOptions[0]?.amountCop ?? normalizeMoney(item.priceLines[0]),
  priceLines: item.priceLines,
  featured: item.featured ?? false,
  serviceIds: services
    .filter((service) => item.categoryLabel.toLowerCase().includes(service.name.toLowerCase()) || service.name.toLowerCase().includes(item.category))
    .map((service) => service.id),
  additionalServiceIds: item.requestOptionGroups
    .filter((group) => group.selectable)
    .flatMap((group) => group.options)
    .map((option) => additionalServiceIdByName.get(option.label) ?? '')
    .filter(Boolean),
  featureIds: item.sections
    .flatMap((section) => section.items)
    .map((feature) => packageFeatureIdByName.get(feature) ?? '')
    .filter(Boolean),
  pageIds: pageIdsForCategory(item.category),
  sectionIds: sectionIdsForCategory(item.category),
  notes: item.notes ?? [],
  advancedData: {
    visualsTitle: item.visualsTitle ?? '',
    visuals: item.visuals ?? [],
    sections: item.sections,
    requestOptionGroups: item.requestOptionGroups,
    baseQuoteOptions: item.baseQuoteOptions,
    whatsappHref: item.whatsappHref,
    categoryHref: item.categoryHref,
    accent: item.accent,
    sortOrder: item.sortOrder
  }
}));

const galleryItems: CmsGalleryItem[] = portfolioGalleryItems.map((item, index) => ({
  ...createBaseEntity(buildGalleryId(item.title, index), item.title, index + 1),
  title: item.title,
  categoryIds: [findCategoryId('package', item.category)].filter(Boolean),
  alt: item.alt,
  mediaId: mediaIdByUrl.get(item.src) ?? '',
  variant: item.variant ?? 'default',
  tags: [item.category, item.variant ?? 'default'],
  pageIds: [pageBySlug.get('portfolio')?.id ?? ''].filter(Boolean),
  sectionIds: [buildSectionId('portfolio', 'gallery')]
}));

const stories: CmsStory[] = Object.entries(portfolioServicePageConfigs).flatMap(([category, config], categoryIndex) =>
  config.stories.map((story, storyIndex) => ({
    ...createBaseEntity(buildStoryId(category, story.title), story.title, categoryIndex * 10 + storyIndex + 1),
    categoryIds: [findCategoryId('package', category)].filter(Boolean),
    clientName: story.clientName,
    location: story.location,
    subtitle: story.subtitle,
    mediaId: mediaIdByUrl.get(story.images[0]?.src ?? '') ?? '',
    mediaIds: story.images.map((image) => mediaIdByUrl.get(image.src) ?? '').filter(Boolean),
    pageIds: pageIdsForCategory(category),
    sectionIds: [buildSectionId(`portfolio-${category}`, 'stories')]
  }))
);

const videosById = new Map<string, CmsVideo>();

portfolioVideoItems.forEach((item, index) => {
  const id = buildVideoId(item.youtubeId);
  videosById.set(id, {
    ...createBaseEntity(id, item.title, index + 1),
    videoId: item.youtubeId,
    description: item.description,
    duration: item.duration,
    format: item.format,
    mediaId: mediaIdByUrl.get(`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`) ?? '',
    categoryIds: [],
    featuredOnLanding: true
  });
});

portfolioVideoCategories.forEach((category, categoryIndex) => {
  category.videos.forEach((video, videoIndex) => {
    const id = buildVideoId(video.videoId);
    const current = videosById.get(id);
    videosById.set(id, {
      ...(current ?? createBaseEntity(id, video.title, categoryIndex * 100 + videoIndex + 20)),
      name: current?.name ?? video.title,
      videoId: video.videoId,
      description: current?.description ?? `Video perteneciente a la categoria ${category.title}.`,
      duration: current?.duration ?? '',
      format: current?.format ?? category.title,
      mediaId: mediaIdByUrl.get(video.thumbnail) ?? current?.mediaId ?? '',
      categoryIds: Array.from(new Set([...(current?.categoryIds ?? []), findCategoryId('video', category.key)])).filter(Boolean),
      featuredOnLanding: current?.featuredOnLanding ?? false
    });
  });
});

const videos = Array.from(videosById.values()).sort((left, right) => left.order - right.order);

const videoCategories: CmsVideoCategory[] = portfolioVideoCategories.map((category, index) => ({
  ...createBaseEntity(`video-category-${category.key}`, category.title, index + 1),
  key: category.key,
  summary: category.summary,
  playlistId: category.playlistId,
  playlistUrl: category.playlistUrl,
  mediaId: mediaIdByUrl.get(category.videos[0]?.thumbnail ?? '') ?? '',
  videoIds: category.videos.map((video) => buildVideoId(video.videoId))
}));

const generalSettings: CmsGeneralSettings[] = [
  {
    ...createBaseEntity('settings-primary', 'Configuracion principal', 1),
    siteName: 'TECNOJACK',
    siteTagline: 'Fotografia, video e invitaciones digitales con direccion visual.',
    defaultTitle: 'TECNOJACK',
    defaultDescription: 'Portafolio comercial y experiencias digitales para bodas, eventos y marcas.',
    footerText: 'TECNOJACK crea experiencias visuales, contenido premium e invitaciones digitales personalizadas.',
    whatsappPhone: '+57 314 540 6467',
    whatsappMessage: 'Hola TECNOJACK, quiero informacion sobre sus servicios.',
    instagram: socialLinks.instagram,
    facebook: socialLinks.facebook,
    tiktok: socialLinks.tiktok,
    youtube: 'https://www.youtube.com/@tecnojack',
    featureFlags: {
      enableVideos: true,
      enableStories: true,
      enableRSVP: true
    }
  }
];

const pageSnapshots: CmsPageSnapshot[] = [];

export const adminCmsSeed: CmsDatabaseState = {
  generalSettings,
  categories,
  pages: hydratedPages,
  pageSnapshots,
  sections,
  sectionsData,
  services,
  additionalServices,
  packages,
  packageFeatures,
  galleryItems,
  stories,
  videoCategories,
  videos,
  media
};

export function cloneAdminCmsSeed(): CmsDatabaseState {
  return JSON.parse(JSON.stringify(adminCmsSeed)) as CmsDatabaseState;
}
