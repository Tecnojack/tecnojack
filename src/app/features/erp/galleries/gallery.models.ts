export type GalleryStatus = 'Draft' | 'Preparing' | 'Ready' | 'Published' | 'Selection Required' | 'Selection Submitted' | 'Delivered' | 'Expired' | 'Archived';

export interface GalleryMediaReference {
  id: string;
  mediaAssetId: string;
  url: string;
  filename: string;
  collectionId: string;
  favorite?: boolean;
  hidden?: boolean;
}

export interface GalleryCollection {
  id: string;
  name: string;
  count: number;
  tagline?: string;
  cover?: string;
  visible: boolean;
  order: number;
}

export interface GallerySettings {
  access: 'Private link' | 'Password protected' | 'Client account' | 'Public';
  password?: string;
  expiresAt?: string;
  allowDownloads: boolean;
  allowFavorites: boolean;
  allowSelections: boolean;
  allowComments: boolean;
  allowSocialSharing: boolean;
  watermark: boolean;
  selectionTarget: number;
  layout: 'masonry' | 'justified' | 'grid';
}

export interface Gallery {
  id: string;
  token: string;
  title: string;
  subtitle: string;
  client: string;
  event: string;
  type: string;
  date: string;
  location: string;
  description: string;
  status: GalleryStatus;
  cover: string;
  totalPhotos: number;
  views: number;
  collections: GalleryCollection[];
  items: GalleryMediaReference[];
  settings: GallerySettings;
  /** Compatibility projections for legacy templates; canonical values live in settings. */
  access: string;
  expiry?: string;
  selectionTarget: number;
  selection?: { status: 'Draft' | 'Submitted' | 'Approved' | 'Changes Requested'; itemIds: string[]; submittedAt?: string; version: number; comment?: string };
}
