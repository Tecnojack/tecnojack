export type PeopleDirectoryStatus = 'published' | 'draft';

export interface PeopleDirectoryEntry {
  id: string;
  displayName: string;
  service: string;
  serviceLabel: string;
  eventDate: string | null;
  location: string | null;
  galleryCount: number;
  status: PeopleDirectoryStatus;
  source: 'legacy-portfolio';
}

export interface PeopleDirectoryFilters {
  search: string;
  status: 'all' | PeopleDirectoryStatus;
}

