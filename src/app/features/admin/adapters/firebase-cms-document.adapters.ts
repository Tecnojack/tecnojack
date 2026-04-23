import { FieldValue, Timestamp, serverTimestamp } from 'firebase/firestore';
import {
  CmsAdditionalService,
  CmsCategory,
  CmsGalleryItem,
  CmsGeneralSettings,
  CmsMedia,
  CmsPackage,
  CmsPackageFeature,
  CmsPage,
  CmsPageSnapshot,
  CmsSection,
  CmsSectionData,
  CmsService,
  CmsStory,
  CmsVideo,
  CmsVideoCategory
} from '../models/cms.models';

type FirestoreEntityRecord = Record<string, unknown> & { id: string };
type FirestoreWriteValue = string | number | boolean | null | string[] | Record<string, unknown> | FieldValue | Timestamp;
type FirestoreWriteRecord = Record<string, FirestoreWriteValue>;

export interface FirestoreCmsAdapter<TEntity> {
  fromFirestore(record: FirestoreEntityRecord): TEntity;
  toFirestore(payload: Partial<TEntity>, options?: { create?: boolean }): FirestoreWriteRecord;
}

const toIsoString = (value: unknown): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'string') {
    return value;
  }

  return null;
};

const toTimestampOrNull = (value: string | null | undefined): Timestamp | null => {
  if (!value) {
    return null;
  }

  return Timestamp.fromDate(new Date(value));
};

const compactRecord = (record: Record<string, unknown>): FirestoreWriteRecord => {
  const entries = Object.entries(record).filter(([, value]) => value !== undefined);
  return Object.fromEntries(entries) as FirestoreWriteRecord;
};

const buildBaseReadModel = (record: FirestoreEntityRecord) => ({
  id: record.id,
  name: String(record['name'] ?? ''),
  active: Boolean(record['active'] ?? true),
  status: (record['status'] ?? 'draft') as CmsService['status'],
  publishedAt: toIsoString(record['publishedAt']),
  deletedAt: toIsoString(record['deletedAt']),
  order: Number(record['order'] ?? 1),
  createdAt: toIsoString(record['createdAt']) ?? new Date().toISOString(),
  updatedAt: toIsoString(record['updatedAt']) ?? new Date().toISOString()
});

const buildBaseWriteRecord = <T extends { createdAt?: string; publishedAt?: string | null; deletedAt?: string | null; updatedAt?: string }>(
  payload: Partial<T>,
  options?: { create?: boolean }
) => ({
  name: payload['name' as keyof T],
  active: payload['active' as keyof T],
  status: payload['status' as keyof T],
  publishedAt:
    payload.publishedAt === undefined ? undefined : payload.publishedAt === null ? null : toTimestampOrNull(payload.publishedAt),
  deletedAt:
    payload.deletedAt === undefined ? undefined : payload.deletedAt === null ? null : toTimestampOrNull(payload.deletedAt),
  order: payload['order' as keyof T],
  createdAt: options?.create ? (payload.createdAt ? Timestamp.fromDate(new Date(payload.createdAt)) : serverTimestamp()) : undefined,
  updatedAt: payload.updatedAt ? Timestamp.fromDate(new Date(payload.updatedAt)) : serverTimestamp()
});

export const firebaseServiceAdapter: FirestoreCmsAdapter<CmsService> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      slug: String(record['slug'] ?? ''),
      description: String(record['description'] ?? ''),
      mediaId: String(record['mediaId'] ?? ''),
      href: String(record['href'] ?? ''),
      ctaLabel: String(record['ctaLabel'] ?? ''),
      points: Array.isArray(record['points']) ? record['points'].map((value) => String(value)) : [],
      pageIds: Array.isArray(record['pageIds']) ? record['pageIds'].map((value) => String(value)) : [],
      sectionIds: Array.isArray(record['sectionIds']) ? record['sectionIds'].map((value) => String(value)) : [],
      categoryIds: Array.isArray(record['categoryIds']) ? record['categoryIds'].map((value) => String(value)) : []
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      slug: payload.slug,
      description: payload.description,
      mediaId: payload.mediaId,
      href: payload.href,
      ctaLabel: payload.ctaLabel,
      points: payload.points,
      pageIds: payload.pageIds,
      sectionIds: payload.sectionIds,
      categoryIds: payload.categoryIds
    });
  }
};

export const firebaseCategoryAdapter: FirestoreCmsAdapter<CmsCategory> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      slug: String(record['slug'] ?? ''),
      type: (record['type'] ?? 'service') as CmsCategory['type']
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      slug: payload.slug,
      type: payload.type
    });
  }
};

export const firebaseGeneralSettingsAdapter: FirestoreCmsAdapter<CmsGeneralSettings> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      siteName: String(record['siteName'] ?? ''),
      siteTagline: String(record['siteTagline'] ?? ''),
      defaultTitle: String(record['defaultTitle'] ?? ''),
      defaultDescription: String(record['defaultDescription'] ?? ''),
      footerText: String(record['footerText'] ?? ''),
      whatsappPhone: String(record['whatsappPhone'] ?? ''),
      whatsappMessage: String(record['whatsappMessage'] ?? ''),
      instagram: String(record['instagram'] ?? ''),
      facebook: String(record['facebook'] ?? ''),
      tiktok: String(record['tiktok'] ?? ''),
      youtube: String(record['youtube'] ?? ''),
      featureFlags:
        typeof record['featureFlags'] === 'object' && record['featureFlags'] !== null
          ? (record['featureFlags'] as CmsGeneralSettings['featureFlags'])
          : { enableVideos: true, enableStories: true, enableRSVP: true }
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      siteName: payload.siteName,
      siteTagline: payload.siteTagline,
      defaultTitle: payload.defaultTitle,
      defaultDescription: payload.defaultDescription,
      footerText: payload.footerText,
      whatsappPhone: payload.whatsappPhone,
      whatsappMessage: payload.whatsappMessage,
      instagram: payload.instagram,
      facebook: payload.facebook,
      tiktok: payload.tiktok,
      youtube: payload.youtube,
      featureFlags: payload.featureFlags
    });
  }
};

export const firebasePageAdapter: FirestoreCmsAdapter<CmsPage> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      slug: String(record['slug'] ?? ''),
      routePath: String(record['routePath'] ?? ''),
      pageType: (record['pageType'] ?? 'custom') as CmsPage['pageType'],
      description: String(record['description'] ?? ''),
      metaTitle: String(record['metaTitle'] ?? ''),
      metaDescription: String(record['metaDescription'] ?? ''),
      sectionIds: Array.isArray(record['sectionIds']) ? record['sectionIds'].map((value) => String(value)) : []
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      slug: payload.slug,
      routePath: payload.routePath,
      pageType: payload.pageType,
      description: payload.description,
      metaTitle: payload.metaTitle,
      metaDescription: payload.metaDescription,
      sectionIds: payload.sectionIds
    });
  }
};

export const firebaseSectionAdapter: FirestoreCmsAdapter<CmsSection> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      pageId: String(record['pageId'] ?? ''),
      type: (record['type'] ?? 'custom') as CmsSection['type'],
      enabled: Boolean(record['enabled'] ?? true),
      sectionDataId: String(record['sectionDataId'] ?? ''),
      entityCollection: String(record['entityCollection'] ?? '') as CmsSection['entityCollection'],
      entityIds: Array.isArray(record['entityIds']) ? record['entityIds'].map((value) => String(value)) : []
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      pageId: payload.pageId,
      type: payload.type,
      enabled: payload.enabled,
      sectionDataId: payload.sectionDataId,
      entityCollection: payload.entityCollection,
      entityIds: payload.entityIds
    });
  }
};

export const firebaseSectionDataAdapter: FirestoreCmsAdapter<CmsSectionData> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      pageId: String(record['pageId'] ?? ''),
      sectionType: (record['sectionType'] ?? 'custom') as CmsSectionData['sectionType'],
      title: String(record['title'] ?? ''),
      subtitle: String(record['subtitle'] ?? ''),
      body: String(record['body'] ?? ''),
      mediaIds: Array.isArray(record['mediaIds']) ? record['mediaIds'].map((value) => String(value)) : [],
      data: typeof record['data'] === 'object' && record['data'] !== null ? (record['data'] as CmsSectionData['data']) : {}
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      pageId: payload.pageId,
      sectionType: payload.sectionType,
      title: payload.title,
      subtitle: payload.subtitle,
      body: payload.body,
      mediaIds: payload.mediaIds,
      data: payload.data
    });
  }
};

export const firebasePageSnapshotAdapter: FirestoreCmsAdapter<CmsPageSnapshot> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      slug: String(record['slug'] ?? ''),
      pageId: String(record['pageId'] ?? ''),
      data: typeof record['data'] === 'object' && record['data'] !== null ? (record['data'] as CmsPageSnapshot['data']) : {},
      builtAt: toIsoString(record['builtAt'])
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      slug: payload.slug,
      pageId: payload.pageId,
      data: payload.data,
      builtAt: payload.builtAt === undefined ? undefined : payload.builtAt === null ? null : toTimestampOrNull(payload.builtAt)
    });
  }
};

export const firebasePackageAdapter: FirestoreCmsAdapter<CmsPackage> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      slug: String(record['slug'] ?? ''),
      categoryIds: Array.isArray(record['categoryIds']) ? record['categoryIds'].map((value) => String(value)) : [],
      packageTypeLabel: String(record['packageTypeLabel'] ?? ''),
      summary: String(record['summary'] ?? ''),
      mediaId: String(record['mediaId'] ?? ''),
      priceLabel: String(record['priceLabel'] ?? ''),
      basePrice: Number(record['basePrice'] ?? 0),
      priceLines: Array.isArray(record['priceLines']) ? record['priceLines'].map((value) => String(value)) : [],
      featured: Boolean(record['featured'] ?? false),
      serviceIds: Array.isArray(record['serviceIds']) ? record['serviceIds'].map((value) => String(value)) : [],
      additionalServiceIds: Array.isArray(record['additionalServiceIds'])
        ? record['additionalServiceIds'].map((value) => String(value))
        : [],
      featureIds: Array.isArray(record['featureIds']) ? record['featureIds'].map((value) => String(value)) : [],
      pageIds: Array.isArray(record['pageIds']) ? record['pageIds'].map((value) => String(value)) : [],
      sectionIds: Array.isArray(record['sectionIds']) ? record['sectionIds'].map((value) => String(value)) : [],
      notes: Array.isArray(record['notes']) ? record['notes'].map((value) => String(value)) : [],
      advancedData: typeof record['advancedData'] === 'object' && record['advancedData'] !== null
        ? (record['advancedData'] as Record<string, unknown>)
        : {}
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      slug: payload.slug,
      categoryIds: payload.categoryIds,
      packageTypeLabel: payload.packageTypeLabel,
      summary: payload.summary,
      mediaId: payload.mediaId,
      priceLabel: payload.priceLabel,
      basePrice: payload.basePrice,
      priceLines: payload.priceLines,
      featured: payload.featured,
      serviceIds: payload.serviceIds,
      additionalServiceIds: payload.additionalServiceIds,
      featureIds: payload.featureIds,
      pageIds: payload.pageIds,
      sectionIds: payload.sectionIds,
      notes: payload.notes,
      advancedData: payload.advancedData
    });
  }
};

export const firebaseAdditionalServiceAdapter: FirestoreCmsAdapter<CmsAdditionalService> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      priceLabel: String(record['priceLabel'] ?? ''),
      basePrice: Number(record['basePrice'] ?? 0),
      description: String(record['description'] ?? ''),
      serviceIds: Array.isArray(record['serviceIds']) ? record['serviceIds'].map((value) => String(value)) : []
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      priceLabel: payload.priceLabel,
      basePrice: payload.basePrice,
      description: payload.description,
      serviceIds: payload.serviceIds
    });
  }
};

export const firebasePackageFeatureAdapter: FirestoreCmsAdapter<CmsPackageFeature> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      description: String(record['description'] ?? ''),
      categoryIds: Array.isArray(record['categoryIds']) ? record['categoryIds'].map((value) => String(value)) : [],
      value: String(record['value'] ?? '')
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      description: payload.description,
      categoryIds: payload.categoryIds,
      value: payload.value
    });
  }
};

export const firebaseGalleryItemAdapter: FirestoreCmsAdapter<CmsGalleryItem> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      title: String(record['title'] ?? ''),
      categoryIds: Array.isArray(record['categoryIds']) ? record['categoryIds'].map((value) => String(value)) : [],
      alt: String(record['alt'] ?? ''),
      mediaId: String(record['mediaId'] ?? ''),
      variant: String(record['variant'] ?? ''),
      tags: Array.isArray(record['tags']) ? record['tags'].map((value) => String(value)) : [],
      pageIds: Array.isArray(record['pageIds']) ? record['pageIds'].map((value) => String(value)) : [],
      sectionIds: Array.isArray(record['sectionIds']) ? record['sectionIds'].map((value) => String(value)) : []
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      title: payload.title,
      categoryIds: payload.categoryIds,
      alt: payload.alt,
      mediaId: payload.mediaId,
      variant: payload.variant,
      tags: payload.tags,
      pageIds: payload.pageIds,
      sectionIds: payload.sectionIds
    });
  }
};

export const firebaseStoryAdapter: FirestoreCmsAdapter<CmsStory> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      categoryIds: Array.isArray(record['categoryIds']) ? record['categoryIds'].map((value) => String(value)) : [],
      clientName: String(record['clientName'] ?? ''),
      location: String(record['location'] ?? ''),
      subtitle: String(record['subtitle'] ?? ''),
      mediaId: String(record['mediaId'] ?? ''),
      mediaIds: Array.isArray(record['mediaIds']) ? record['mediaIds'].map((value) => String(value)) : [],
      pageIds: Array.isArray(record['pageIds']) ? record['pageIds'].map((value) => String(value)) : [],
      sectionIds: Array.isArray(record['sectionIds']) ? record['sectionIds'].map((value) => String(value)) : []
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      categoryIds: payload.categoryIds,
      clientName: payload.clientName,
      location: payload.location,
      subtitle: payload.subtitle,
      mediaId: payload.mediaId,
      mediaIds: payload.mediaIds,
      pageIds: payload.pageIds,
      sectionIds: payload.sectionIds
    });
  }
};

export const firebaseVideoCategoryAdapter: FirestoreCmsAdapter<CmsVideoCategory> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      key: String(record['key'] ?? ''),
      summary: String(record['summary'] ?? ''),
      playlistId: String(record['playlistId'] ?? ''),
      playlistUrl: String(record['playlistUrl'] ?? ''),
      mediaId: String(record['mediaId'] ?? ''),
      videoIds: Array.isArray(record['videoIds']) ? record['videoIds'].map((value) => String(value)) : []
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      key: payload.key,
      summary: payload.summary,
      playlistId: payload.playlistId,
      playlistUrl: payload.playlistUrl,
      mediaId: payload.mediaId,
      videoIds: payload.videoIds
    });
  }
};

export const firebaseVideoAdapter: FirestoreCmsAdapter<CmsVideo> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      videoId: String(record['videoId'] ?? ''),
      description: String(record['description'] ?? ''),
      duration: String(record['duration'] ?? ''),
      format: String(record['format'] ?? ''),
      mediaId: String(record['mediaId'] ?? ''),
      categoryIds: Array.isArray(record['categoryIds']) ? record['categoryIds'].map((value) => String(value)) : [],
      featuredOnLanding: Boolean(record['featuredOnLanding'] ?? false)
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      videoId: payload.videoId,
      description: payload.description,
      duration: payload.duration,
      format: payload.format,
      mediaId: payload.mediaId,
      categoryIds: payload.categoryIds,
      featuredOnLanding: payload.featuredOnLanding
    });
  }
};

export const firebaseMediaAdapter: FirestoreCmsAdapter<CmsMedia> = {
  fromFirestore(record) {
    return {
      ...buildBaseReadModel(record),
      mediaType: (record['mediaType'] ?? 'image') as CmsMedia['mediaType'],
      url: String(record['url'] ?? ''),
      alt: String(record['alt'] ?? ''),
      folder: String(record['folder'] ?? ''),
      mimeType: String(record['mimeType'] ?? ''),
      sizeLabel: String(record['sizeLabel'] ?? ''),
      isMockUpload: Boolean(record['isMockUpload'] ?? false)
    };
  },
  toFirestore(payload, options) {
    return compactRecord({
      ...buildBaseWriteRecord(payload, options),
      mediaType: payload.mediaType,
      url: payload.url,
      alt: payload.alt,
      folder: payload.folder,
      mimeType: payload.mimeType,
      sizeLabel: payload.sizeLabel,
      isMockUpload: payload.isMockUpload
    });
  }
};
