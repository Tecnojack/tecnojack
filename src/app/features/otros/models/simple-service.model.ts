export type ServiceCategory =
  | 'fotografia'
  | 'video'
  | 'contenido'
  | 'produccion'
  | 'estudio'
  | 'momentos';

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  fotografia: 'Fotografía',
  video: 'Video',
  contenido: 'Contenido',
  produccion: 'Producción',
  estudio: 'Estudio',
  momentos: 'Momentos'
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'fotografia',
  'video',
  'contenido',
  'produccion',
  'estudio',
  'momentos'
];

export interface SimpleServiceAddOn {
  id: string;
  label: string;
  priceLabel: string;
  price?: number;
}

export interface SimpleService {
  id: string;
  category: ServiceCategory;
  name: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  priceLabel: string;
  includes: string[];
  addOns?: SimpleServiceAddOn[];
  notes?: string[];
  image?: string;
}
