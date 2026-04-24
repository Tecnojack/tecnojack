import {
  AdminFieldConfig,
  AdminFieldOption,
  CMS_ENTITY_STATUSES,
  CmsCollectionConfig,
  CmsCollectionKey,
  CmsPageType,
  CmsSectionType
} from '../models/cms.models';

const pageTypeOptions: AdminFieldOption[] = [
  { label: 'Brand', value: 'brand' },
  { label: 'Landing', value: 'landing' },
  { label: 'Categoria de servicio', value: 'service-category' },
  { label: 'Detalle de servicio', value: 'service-detail' },
  { label: 'Videos', value: 'video' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Admin', value: 'admin' },
  { label: 'Custom', value: 'custom' }
];

const sectionTypeOptions: AdminFieldOption[] = [
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

const entityCollectionOptions: AdminFieldOption[] = [
  { label: 'Sin entidad', value: '' },
  { label: 'Servicios', value: 'services' },
  { label: 'Servicios adicionales', value: 'additionalServices' },
  { label: 'Paquetes', value: 'packages' },
  { label: 'Features de paquete', value: 'packageFeatures' },
  { label: 'Galeria', value: 'galleryItems' },
  { label: 'Historias', value: 'stories' },
  { label: 'Categorias de video', value: 'videoCategories' },
  { label: 'Videos', value: 'videos' },
  { label: 'Media', value: 'media' }
];

const mediaTypeOptions: AdminFieldOption[] = [
  { label: 'Image', value: 'image' },
  { label: 'Video', value: 'video' },
  { label: 'Document', value: 'document' },
  { label: 'Other', value: 'other' }
];

const categoryTypeOptions: AdminFieldOption[] = [
  { label: 'Servicio', value: 'service' },
  { label: 'Paquete', value: 'package' },
  { label: 'Video', value: 'video' }
];

const statusOptions: AdminFieldOption[] = CMS_ENTITY_STATUSES.map((status) => ({
  label: status === 'draft' ? 'Draft' : status === 'published' ? 'Published' : 'Archived',
  value: status
}));

const lifecycleFields = (defaultStatus: 'draft' | 'published' | 'archived' = 'draft'): AdminFieldConfig[] => [
  { key: 'status', label: 'Estado de publicación', type: 'select', options: statusOptions, defaultValue: defaultStatus, required: true },
  { key: 'publishedAt', label: 'Publicado en', type: 'text', readOnly: true, hint: 'Se completa automáticamente al publicar.' },
  { key: 'deletedAt', label: 'Eliminado en', type: 'text', readOnly: true, hint: 'Se completa al hacer soft delete.' },
  { key: 'active', label: 'Activo', type: 'boolean', defaultValue: true },
  { key: 'order', label: 'Orden', type: 'number', defaultValue: 1 }
];

export const CMS_COLLECTION_CONFIGS: Record<CmsCollectionKey, CmsCollectionConfig> = {
  generalSettings: {
    key: 'generalSettings',
    label: 'Configuracion general',
    singularLabel: 'configuracion',
    description: 'Branding, SEO base, footer, redes y feature flags del sitio.',
    icon: 'SG',
    subtitleKey: 'siteTagline',
    fields: [
      { key: 'name', label: 'Nombre interno', type: 'text', required: true },
      { key: 'siteName', label: 'Nombre del sitio', type: 'text', required: true },
      { key: 'siteTagline', label: 'Tagline', type: 'text' },
      { key: 'defaultTitle', label: 'Titulo SEO por defecto', type: 'text' },
      { key: 'defaultDescription', label: 'Descripcion SEO por defecto', type: 'textarea', rows: 3 },
      { key: 'footerText', label: 'Texto del footer', type: 'textarea', rows: 3 },
      { key: 'whatsappPhone', label: 'Telefono WhatsApp', type: 'text' },
      { key: 'whatsappMessage', label: 'Mensaje base WhatsApp', type: 'textarea', rows: 3 },
      { key: 'instagram', label: 'Instagram', type: 'text' },
      { key: 'facebook', label: 'Facebook', type: 'text' },
      { key: 'tiktok', label: 'TikTok', type: 'text' },
      { key: 'youtube', label: 'YouTube', type: 'text' },
      { key: 'featureFlags', label: 'Feature flags', type: 'json', rows: 8, defaultValue: { enableVideos: true, enableStories: true, enableRSVP: true } },
      ...lifecycleFields('published')
    ]
  },
  categories: {
    key: 'categories',
    label: 'Categorias',
    singularLabel: 'categoria',
    description: 'Taxonomía reutilizable para servicios, paquetes y videos.',
    icon: 'CT',
    subtitleKey: 'slug',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'type', label: 'Tipo', type: 'select', options: categoryTypeOptions, required: true },
      ...lifecycleFields('published')
    ]
  },
  pages: {
    key: 'pages',
    label: 'Paginas',
    singularLabel: 'pagina',
    description: 'Estructura navegable del sitio y composición de secciones.',
    icon: 'PG',
    subtitleKey: 'routePath',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'routePath', label: 'Ruta', type: 'text', required: true },
      { key: 'pageType', label: 'Tipo de pagina', type: 'select', options: pageTypeOptions, required: true },
      { key: 'description', label: 'Descripcion', type: 'textarea', rows: 3 },
      { key: 'metaTitle', label: 'Meta title', type: 'text' },
      { key: 'metaDescription', label: 'Meta description', type: 'textarea', rows: 3 },
      { key: 'sectionIds', label: 'Secciones asignadas', type: 'multiselect', relationCollection: 'sections' },
      ...lifecycleFields()
    ]
  },
  pageSnapshots: {
    key: 'pageSnapshots',
    label: 'Snapshots de pagina',
    singularLabel: 'snapshot',
    description: 'Estructura preparada para almacenar páginas resueltas y optimizadas.',
    icon: 'PS',
    subtitleKey: 'slug',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'pageId', label: 'Pagina fuente', type: 'select', relationCollection: 'pages', required: true },
      { key: 'builtAt', label: 'Construido en', type: 'text', readOnly: true },
      { key: 'data', label: 'Snapshot resuelto', type: 'json', rows: 12, defaultValue: {} },
      ...lifecycleFields()
    ]
  },
  sections: {
    key: 'sections',
    label: 'Secciones',
    singularLabel: 'seccion',
    description: 'Bloques habilitables, ordenables y desacoplados del contenido.',
    icon: 'SC',
    subtitleKey: 'type',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'pageId', label: 'Pagina', type: 'select', relationCollection: 'pages', required: true },
      { key: 'type', label: 'Tipo de seccion', type: 'select', options: sectionTypeOptions, required: true },
      { key: 'sectionDataId', label: 'Contenido de seccion', type: 'select', relationCollection: 'sectionsData' },
      { key: 'entityCollection', label: 'Coleccion vinculada', type: 'select', options: entityCollectionOptions },
      { key: 'entityIds', label: 'Entidades vinculadas', type: 'multiselect', dynamicRelationField: 'entityCollection' },
      { key: 'enabled', label: 'Habilitada', type: 'boolean', defaultValue: true },
      ...lifecycleFields()
    ]
  },
  sectionsData: {
    key: 'sectionsData',
    label: 'Contenido de secciones',
    singularLabel: 'contenido',
    description: 'Copy y configuración UI dinámica de cada bloque.',
    icon: 'SD',
    subtitleKey: 'sectionType',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'pageId', label: 'Pagina', type: 'select', relationCollection: 'pages' },
      { key: 'sectionType', label: 'Tipo', type: 'select', options: sectionTypeOptions, required: true },
      { key: 'title', label: 'Titulo', type: 'text' },
      { key: 'subtitle', label: 'Subtitulo', type: 'textarea', rows: 2 },
      { key: 'body', label: 'Body', type: 'textarea', rows: 5 },
      { key: 'mediaIds', label: 'Media relacionada', type: 'multiselect', relationCollection: 'media' },
      { key: 'data', label: 'JSON UI dinámico', type: 'json', rows: 10, defaultValue: { layout: 'grid', columns: 2, showCTA: true, style: 'dark' } },
      ...lifecycleFields()
    ]
  },
  services: {
    key: 'services',
    label: 'Servicios',
    singularLabel: 'servicio',
    description: 'Catálogo principal de servicios visibles en el sitio.',
    icon: 'SV',
    subtitleKey: 'slug',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'description', label: 'Descripcion', type: 'textarea', rows: 4 },
      { key: 'mediaId', label: 'Media principal', type: 'select', relationCollection: 'media' },
      { key: 'href', label: 'Href', type: 'text' },
      { key: 'ctaLabel', label: 'CTA', type: 'text' },
      { key: 'points', label: 'Puntos', type: 'chips', rows: 4 },
      { key: 'categoryIds', label: 'Categorias', type: 'multiselect', relationCollection: 'categories' },
      { key: 'pageIds', label: 'Paginas', type: 'multiselect', relationCollection: 'pages' },
      { key: 'sectionIds', label: 'Secciones', type: 'multiselect', relationCollection: 'sections' },
      ...lifecycleFields()
    ]
  },
  additionalServices: {
    key: 'additionalServices',
    label: 'Servicios adicionales',
    singularLabel: 'servicio adicional',
    description: 'Upsells y complementos comerciales reutilizables.',
    icon: 'AS',
    subtitleKey: 'priceLabel',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'priceLabel', label: 'Precio visible', type: 'text' },
      { key: 'basePrice', label: 'Precio base', type: 'number', defaultValue: 0 },
      { key: 'description', label: 'Descripcion', type: 'textarea', rows: 4 },
      { key: 'serviceIds', label: 'Servicios relacionados', type: 'multiselect', relationCollection: 'services' },
      ...lifecycleFields()
    ]
  },
  packages: {
    key: 'packages',
    label: 'Paquetes',
    singularLabel: 'paquete',
    description: 'Paquetes comerciales con relaciones complejas y JSON avanzado.',
    icon: 'PK',
    subtitleKey: 'packageTypeLabel',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'categoryIds', label: 'Categorias', type: 'multiselect', relationCollection: 'categories' },
      { key: 'packageTypeLabel', label: 'Tipo visible', type: 'text' },
      { key: 'summary', label: 'Resumen', type: 'textarea', rows: 4 },
      { key: 'mediaId', label: 'Media principal', type: 'select', relationCollection: 'media' },
      { key: 'priceLabel', label: 'Precio visible', type: 'text' },
      { key: 'basePrice', label: 'Precio base', type: 'number', defaultValue: 0 },
      { key: 'priceLines', label: 'Lineas de precio', type: 'chips', rows: 4 },
      { key: 'featured', label: 'Destacado', type: 'boolean', defaultValue: false },
      { key: 'serviceIds', label: 'Servicios asignados', type: 'multiselect', relationCollection: 'services' },
      { key: 'additionalServiceIds', label: 'Servicios adicionales', type: 'multiselect', relationCollection: 'additionalServices' },
      { key: 'featureIds', label: 'Features', type: 'multiselect', relationCollection: 'packageFeatures' },
      { key: 'pageIds', label: 'Paginas', type: 'multiselect', relationCollection: 'pages' },
      { key: 'sectionIds', label: 'Secciones', type: 'multiselect', relationCollection: 'sections' },
      { key: 'notes', label: 'Notas', type: 'chips', rows: 4 },
      { key: 'advancedData', label: 'JSON avanzado', type: 'json', rows: 12, defaultValue: {} },
      ...lifecycleFields()
    ]
  },
  packageFeatures: {
    key: 'packageFeatures',
    label: 'Features de paquetes',
    singularLabel: 'feature',
    description: 'Items reutilizables asignables a uno o varios paquetes.',
    icon: 'FT',
    subtitleKey: 'value',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'description', label: 'Descripcion', type: 'textarea', rows: 4 },
      { key: 'categoryIds', label: 'Categorias', type: 'multiselect', relationCollection: 'categories' },
      { key: 'value', label: 'Valor', type: 'text' },
      ...lifecycleFields()
    ]
  },
  galleryItems: {
    key: 'galleryItems',
    label: 'Galeria',
    singularLabel: 'item de galeria',
    description: 'Imagenes curadas del portfolio con media normalizada.',
    icon: 'GL',
    subtitleKey: 'variant',
    fields: [
      { key: 'name', label: 'Nombre interno', type: 'text', required: true },
      { key: 'title', label: 'Titulo visible', type: 'text', required: true },
      { key: 'categoryIds', label: 'Categorias', type: 'multiselect', relationCollection: 'categories' },
      { key: 'alt', label: 'Alt', type: 'textarea', rows: 2 },
      { key: 'mediaId', label: 'Media', type: 'select', relationCollection: 'media' },
      { key: 'variant', label: 'Variant', type: 'text' },
      { key: 'tags', label: 'Tags', type: 'chips', rows: 3 },
      { key: 'pageIds', label: 'Paginas', type: 'multiselect', relationCollection: 'pages' },
      { key: 'sectionIds', label: 'Secciones', type: 'multiselect', relationCollection: 'sections' },
      ...lifecycleFields()
    ]
  },
  stories: {
    key: 'stories',
    label: 'Historias',
    singularLabel: 'historia',
    description: 'Casos o galerías por categoría con media principal y galería secundaria.',
    icon: 'ST',
    subtitleKey: 'clientName',
    fields: [
      { key: 'name', label: 'Titulo', type: 'text', required: true },
      { key: 'categoryIds', label: 'Categorias', type: 'multiselect', relationCollection: 'categories' },
      { key: 'clientName', label: 'Cliente', type: 'text' },
      { key: 'location', label: 'Ubicacion', type: 'text' },
      { key: 'subtitle', label: 'Subtitulo', type: 'textarea', rows: 2 },
      { key: 'mediaId', label: 'Media cover', type: 'select', relationCollection: 'media' },
      { key: 'mediaIds', label: 'Galeria media', type: 'multiselect', relationCollection: 'media' },
      { key: 'pageIds', label: 'Paginas', type: 'multiselect', relationCollection: 'pages' },
      { key: 'sectionIds', label: 'Secciones', type: 'multiselect', relationCollection: 'sections' },
      ...lifecycleFields()
    ]
  },
  videoCategories: {
    key: 'videoCategories',
    label: 'Categorias de video',
    singularLabel: 'categoria de video',
    description: 'Agrupa playlists y videos del sitio.',
    icon: 'VC',
    subtitleKey: 'key',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'key', label: 'Key', type: 'text', required: true },
      { key: 'summary', label: 'Resumen', type: 'textarea', rows: 4 },
      { key: 'playlistId', label: 'Playlist ID', type: 'text' },
      { key: 'playlistUrl', label: 'Playlist URL', type: 'text' },
      { key: 'mediaId', label: 'Media cover', type: 'select', relationCollection: 'media' },
      { key: 'videoIds', label: 'Videos asociados', type: 'multiselect', relationCollection: 'videos' },
      ...lifecycleFields()
    ]
  },
  videos: {
    key: 'videos',
    label: 'Videos',
    singularLabel: 'video',
    description: 'Videos individuales asociados a categorías y playlists.',
    icon: 'VD',
    subtitleKey: 'videoId',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'videoId', label: 'YouTube ID', type: 'text', required: true },
      { key: 'description', label: 'Descripcion', type: 'textarea', rows: 4 },
      { key: 'duration', label: 'Duracion', type: 'text' },
      { key: 'format', label: 'Formato', type: 'text' },
      { key: 'mediaId', label: 'Thumbnail media', type: 'select', relationCollection: 'media' },
      { key: 'categoryIds', label: 'Categorias', type: 'multiselect', relationCollection: 'categories' },
      { key: 'featuredOnLanding', label: 'Destacado en landing', type: 'boolean', defaultValue: false },
      ...lifecycleFields()
    ]
  },
  media: {
    key: 'media',
    label: 'Media',
    singularLabel: 'archivo',
    description: 'Recursos mock persistidos con metadata y subida local.',
    icon: 'MD',
    subtitleKey: 'folder',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'mockUpload', label: 'Subida mock', type: 'file', hint: 'Lee el archivo local y guarda una data URL persistente en localStorage.', fileConfig: { urlKey: 'url', mimeTypeKey: 'mimeType', sizeKey: 'sizeLabel', mockFlagKey: 'isMockUpload' } },
      { key: 'mediaType', label: 'Tipo', type: 'select', options: mediaTypeOptions, required: true },
      { key: 'url', label: 'URL', type: 'text' },
      { key: 'alt', label: 'Alt', type: 'text' },
      { key: 'folder', label: 'Folder', type: 'text' },
      { key: 'mimeType', label: 'Mime type', type: 'text' },
      { key: 'sizeLabel', label: 'Tamano', type: 'text' },
      { key: 'isMockUpload', label: 'Es mock upload', type: 'boolean', defaultValue: false },
      ...lifecycleFields('published')
    ]
  }
};

export const CMS_ADMIN_NAV = Object.values(CMS_COLLECTION_CONFIGS);

export const CMS_PAGE_TYPE_VALUES: CmsPageType[] = ['brand', 'landing', 'service-category', 'service-detail', 'video', 'wedding', 'admin', 'custom'];

export const CMS_SECTION_TYPE_VALUES: CmsSectionType[] = ['hero', 'about', 'profile', 'services', 'packages', 'gallery', 'stories', 'videos', 'contact', 'invitation', 'passport', 'custom'];
