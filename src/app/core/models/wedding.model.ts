export interface Wedding {
  slug: string;
  theme: string;
  names: string;
  date: string;
  /** Enlace de confirmación (WhatsApp, Google Form, etc.) */
  rsvpUrl?: string;
  /** Fecha límite de confirmación (texto ya formateado, ej: 10/06/2026) */
  rsvpDeadline?: string;
  location: {
    name: string;
    mapsUrl: string;
  };
  dressCode: {
    description: string;
    womenNote?: string;
    /** Colores reservados (para no usarlos) */
    reservedColors?: string[];
  };
  pinterestUrl: string;
  giftNote: string;
  exclusiveNote: string;
}
