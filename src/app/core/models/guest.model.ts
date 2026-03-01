export interface Guest {
  slug: string;
  name: string;
  allowedGuests: number;
  customMessage: string;
  childrenCount?: number;
}
