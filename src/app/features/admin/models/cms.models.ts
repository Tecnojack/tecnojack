export type CmsCollectionKey =
  | 'generalSettings'
  | 'categories'
  | 'pages'
  | 'pageSnapshots'
  | 'sections'
  | 'sectionsData'
  | 'services'
  | 'additionalServices'
  | 'packages'
  | 'packageFeatures'
  | 'galleryItems'
  | 'stories'
  | 'videoCategories'
  | 'videos'
  | 'media';

export type CmsPageType =
  | 'brand'
  | 'landing'
  | 'service-category'
  | 'service-detail'
  | 'video'
  | 'wedding'
  | 'admin'
  | 'custom';

export type CmsSectionType =
  | 'hero'
  | 'about'
  | 'profile'
  | 'services'
  | 'packages'
  | 'gallery'
  | 'stories'
  | 'videos'
  | 'contact'
  | 'invitation'
  | 'passport'
  | 'custom';

export type CmsMediaType = 'image' | 'video' | 'document' | 'other';
export type CmsEntityStatus = 'draft' | 'published' | 'archived';
export type CmsCategoryType = 'service' | 'package' | 'video';
export type CmsSectionLayout = 'grid' | 'carousel' | 'list';
export type CmsSurfaceStyle = 'dark' | 'light';

export interface CmsFeatureFlags {
  enableVideos: boolean;
  enableStories: boolean;
  enableRSVP: boolean;
}

export interface CmsSectionUiData {
  layout?: CmsSectionLayout;
  columns?: number;
  showCTA?: boolean;
  style?: CmsSurfaceStyle;
  [key: string]: unknown;
}

export interface CmsEntityBase {
  id: string;
  name: string;
  active: boolean;
  status: CmsEntityStatus;
  publishedAt?: string | null;
  deletedAt?: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CmsGeneralSettings extends CmsEntityBase {
  siteName: string;
  siteTagline: string;
  defaultTitle: string;
  defaultDescription: string;
  footerText: string;
  whatsappPhone: string;
  whatsappMessage: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  featureFlags: CmsFeatureFlags;
}

export interface CmsCategory extends CmsEntityBase {
  slug: string;
  type: CmsCategoryType;
}

export interface CmsPage extends CmsEntityBase {
  slug: string;
  routePath: string;
  pageType: CmsPageType;
  description: string;
  metaTitle: string;
  metaDescription: string;
  sectionIds: string[];
}

export interface CmsPageSnapshot extends CmsEntityBase {
  slug: string;
  pageId: string;
  data: Record<string, unknown>;
  builtAt?: string | null;
}

export interface CmsSection extends CmsEntityBase {
  pageId: string;
  type: CmsSectionType;
  enabled: boolean;
  sectionDataId: string;
  entityCollection: CmsCollectionKey | '';
  entityIds: string[];
}

export interface CmsSectionData extends CmsEntityBase {
  pageId: string;
  sectionType: CmsSectionType;
  title: string;
  subtitle: string;
  body: string;
  mediaIds: string[];
  data: CmsSectionUiData;
}

export interface CmsService extends CmsEntityBase {
  slug: string;
  description: string;
  mediaId: string;
  href: string;
  ctaLabel: string;
  points: string[];
  pageIds: string[];
  sectionIds: string[];
  categoryIds: string[];
}

export interface CmsAdditionalService extends CmsEntityBase {
  priceLabel: string;
  basePrice: number;
  description: string;
  serviceIds: string[];
}

export interface CmsPackageFeature extends CmsEntityBase {
  description: string;
  categoryIds: string[];
  value: string;
}

export interface CmsPackage extends CmsEntityBase {
  slug: string;
  categoryIds: string[];
  packageTypeLabel: string;
  summary: string;
  mediaId: string;
  priceLabel: string;
  basePrice: number;
  priceLines: string[];
  featured: boolean;
  serviceIds: string[];
  additionalServiceIds: string[];
  featureIds: string[];
  pageIds: string[];
  sectionIds: string[];
  notes: string[];
  advancedData: Record<string, unknown>;
}

export interface CmsGalleryItem extends CmsEntityBase {
  title: string;
  categoryIds: string[];
  alt: string;
  mediaId: string;
  variant: string;
  tags: string[];
  pageIds: string[];
  sectionIds: string[];
}

export interface CmsStory extends CmsEntityBase {
  categoryIds: string[];
  clientName: string;
  location: string;
  subtitle: string;
  mediaId: string;
  mediaIds: string[];
  pageIds: string[];
  sectionIds: string[];
}

export interface CmsVideoCategory extends CmsEntityBase {
  key: string;
  summary: string;
  playlistId: string;
  playlistUrl: string;
  mediaId: string;
  videoIds: string[];
}

export interface CmsVideo extends CmsEntityBase {
  videoId: string;
  description: string;
  duration: string;
  format: string;
  mediaId: string;
  categoryIds: string[];
  featuredOnLanding: boolean;
}

export interface CmsMedia extends CmsEntityBase {
  mediaType: CmsMediaType;
  url: string;
  alt: string;
  folder: string;
  mimeType: string;
  sizeLabel: string;
  isMockUpload: boolean;
}

export interface CmsDatabaseState {
  generalSettings: CmsGeneralSettings[];
  categories: CmsCategory[];
  pages: CmsPage[];
  pageSnapshots: CmsPageSnapshot[];
  sections: CmsSection[];
  sectionsData: CmsSectionData[];
  services: CmsService[];
  additionalServices: CmsAdditionalService[];
  packages: CmsPackage[];
  packageFeatures: CmsPackageFeature[];
  galleryItems: CmsGalleryItem[];
  stories: CmsStory[];
  videoCategories: CmsVideoCategory[];
  videos: CmsVideo[];
  media: CmsMedia[];
}

export type CmsEntityMap = {
  generalSettings: CmsGeneralSettings;
  categories: CmsCategory;
  pages: CmsPage;
  pageSnapshots: CmsPageSnapshot;
  sections: CmsSection;
  sectionsData: CmsSectionData;
  services: CmsService;
  additionalServices: CmsAdditionalService;
  packages: CmsPackage;
  packageFeatures: CmsPackageFeature;
  galleryItems: CmsGalleryItem;
  stories: CmsStory;
  videoCategories: CmsVideoCategory;
  videos: CmsVideo;
  media: CmsMedia;
};

export type CmsEntityRecord = CmsEntityMap[CmsCollectionKey];

export type AdminFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'select'
  | 'multiselect'
  | 'chips'
  | 'json'
  | 'file';

export interface AdminFieldOption {
  label: string;
  value: string;
}

export interface AdminFileFieldConfig {
  urlKey: string;
  altKey?: string;
  mimeTypeKey?: string;
  sizeKey?: string;
  mockFlagKey?: string;
}

export interface AdminFieldConfig {
  key: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  rows?: number;
  readOnly?: boolean;
  options?: AdminFieldOption[];
  relationCollection?: CmsCollectionKey;
  dynamicRelationField?: string;
  defaultValue?: unknown;
  fileConfig?: AdminFileFieldConfig;
}

export interface CmsCollectionConfig {
  key: CmsCollectionKey;
  label: string;
  singularLabel: string;
  description: string;
  icon: string;
  subtitleKey?: string;
  fields: AdminFieldConfig[];
}

export const CMS_ENTITY_STATUSES: CmsEntityStatus[] = ['draft', 'published', 'archived'];

export const CMS_COLLECTION_KEYS: CmsCollectionKey[] = [
  'generalSettings',
  'categories',
  'pages',
  'pageSnapshots',
  'sections',
  'sectionsData',
  'services',
  'additionalServices',
  'packages',
  'packageFeatures',
  'galleryItems',
  'stories',
  'videoCategories',
  'videos',
  'media'
];
