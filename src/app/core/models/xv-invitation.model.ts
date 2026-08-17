export interface XvGuestGroup {
  id: string;
  slug: string;
  guests: string[];
  guestCount: number;
  note?: string;
}

export interface XvEventConfig {
  eventType: string;
  celebrantName: string;
  dateText: string;
  dateDayName: string;
  timeText: string;
  targetDateTime: string;
  venueName: string;
  venueAddress: string;
  mapCoordinates: { lat: number; lng: number };
  googleMapsUrl: string;
  rsvpDeadlineText: string;
  whatsappNumber: string;
  whatsappIntlNumber: string;
  reservedColors: Array<{ name: string; hex: string; description?: string }>;
  giftMessage: string;
  quoteMessage: string;
  coverImage: string;
  musicUrl?: string;
}
