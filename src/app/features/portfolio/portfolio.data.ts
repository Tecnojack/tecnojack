export interface PortfolioStat {
  value: string;
  label: string;
}

export interface PortfolioService {
  id?: string;
  title: string;
  description: string;
  image: string;
  href: string;
  ctaLabel?: string;
  points: string[];
}

export interface PortfolioBrandPillar {
  title: string;
  description: string;
}

export interface PortfolioNavItem {
  label: string;
  href: string;
}

export interface PortfolioProfessionalProfile {
  eyebrow: string;
  title: string;
  lead: string;
  supportingLabel: string;
  points: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface PortfolioServicePageHero {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage: string;
  highlights: string[];
  whatsappMessage: string;
}

export interface PortfolioServiceStoryImage {
  src: string;
  alt: string;
}

export interface PortfolioServiceStory {
  clientName: string;
  location: string;
  title: string;
  subtitle: string;
  images: PortfolioServiceStoryImage[];
}

export interface PortfolioServicePageConfig {
  category: PortfolioPackageCategory;
  label: string;
  shellSubtitle: string;
  hero: PortfolioServicePageHero;
  packageEyebrow: string;
  packageTitle: string;
  packageLead: string;
  storiesTitle: string;
  storiesLead: string;
  stories: PortfolioServiceStory[];
}

export interface GroupGraduationPackage {
  slug: string;
  title: string;
  packageName: string;
  price: string;
  lead: string;
  image: string;
  features: string[];
}

export interface GroupGraduationShot {
  title: string;
  image: string;
}

export interface GroupGraduationPlan {
  slug: string;
  name: string;
  price: string;
  amountCop: number;
  lead: string;
  image: string;
  features: string[];
  deliverables: string[];
  featured?: boolean;
}

export interface WeddingPackagePlan {
  slug: string;
  name: string;
  priceLines: string[];
  lead: string;
  image: string;
  items: string[];
  features: string[];
  deliverables: string[];
  coverage: string[];
  featured?: boolean;
}

export interface WeddingPhotoOnlyPlan {
  slug: string;
  name: string;
  priceLines: string[];
  lead: string;
  image: string;
  items: string[];
  features: string[];
  deliverables: string[];
  coverage: string[];
  featured?: boolean;
}

export interface QuincePackagePlan {
  slug: string;
  name: string;
  lead: string;
  image: string;
  priceLines: string[];
  amountCop: number;
  items: string[];
  features: string[];
  deliverables: string[];
  coverage?: string[];
  featured?: boolean;
}

export interface QuinceAdditionalItem {
  title: string;
  price: string;
}

export interface PreweddingPlan {
  slug: string;
  name: string;
  lead: string;
  image: string;
  price?: string;
  items: string[];
  features: string[];
  deliverables: string[];
  featured?: boolean;
}

export type PortfolioPackageCategory = 'bodas' | 'quinces' | 'grados' | 'preboda' | 'corporativos';
export type PortfolioPackageGroup = 'photo-video' | 'photo-only' | 'custom' | 'session';

export interface PortfolioPackageDetailSection {
  title: string;
  items: string[];
}

export interface PortfolioPackageDetailVisual {
  title: string;
  image: string;
}

export interface PortfolioRequestOption {
  id: string;
  label: string;
  priceLabel?: string;
  priceAmountCop?: number;
  selectedByDefault?: boolean;
  linkedPackageCategory?: PortfolioPackageCategory;
  linkedPackageSlug?: string;
}

export interface PortfolioRequestOptionGroup {
  title: string;
  description?: string;
  selectable?: boolean;
  options: PortfolioRequestOption[];
}

export interface PortfolioBaseQuoteOption {
  id: string;
  label: string;
  amountCop?: number;
  selectedByDefault?: boolean;
}

export interface PortfolioPackageDetail {
  category: PortfolioPackageCategory;
  slug: string;
  categoryLabel: string;
  categoryHref: string;
  title: string;
  packageTypeLabel: string;
  packageGroup: PortfolioPackageGroup;
  eyebrow: string;
  lead: string;
  image: string;
  priceLines: string[];
  baseQuoteOptions: PortfolioBaseQuoteOption[];
  featured?: boolean;
  sortOrder?: number;
  accent?: 'gold' | 'rose';
  sections: PortfolioPackageDetailSection[];
  requestOptionGroups: PortfolioRequestOptionGroup[];
  notes?: string[];
  visualsTitle?: string;
  visuals?: PortfolioPackageDetailVisual[];
  whatsappHref: string;
}

export interface PortfolioPackage {
  name: string;
  price: string;
  summary: string;
  features: string[];
  featured?: boolean;
}

export interface PortfolioPhotoPackage {
  name: string;
  priceCop: string;
  summary: string;
  features: string[];
  featured?: boolean;
}

export interface PortfolioSuggestedShot {
  title: string;
  description: string;
  image: string;
}

export interface PortfolioWeddingPlan {
  name: string;
  priceCop: string;
  priceUsd: string;
  summary: string;
  features: string[];
  featured?: boolean;
}

export interface PortfolioGalleryItem {
  src: string;
  alt: string;
  title: string;
  category: string;
  variant?: 'wide' | 'tall';
}

export interface PortfolioVideoItem {
  title: string;
  description: string;
  duration: string;
  youtubeId: string;
  format: string;
}

export type PortfolioVideoCategoryKey = 'musicales' | 'bodas' | 'otros';

export interface PortfolioPlaylistVideo {
  title: string;
  videoId: string;
  thumbnail: string;
}

export interface PortfolioVideoCategory {
  key: PortfolioVideoCategoryKey;
  title: string;
  playlistId: string;
  playlistUrl: string;
  summary: string;
  videos: PortfolioPlaylistVideo[];
}

export interface PortfolioContactLink {
  platform: 'instagram' | 'facebook' | 'tiktok' | 'whatsapp';
  title: string;
  description: string;
  href: string;
}

export interface PortfolioAdditionalService {
  title: string;
  price: string;
  description: string;
}

const phone = '573145406467';
const whatsappMessage =
  'Hola TECNOJACK, quiero cotizar un proyecto audiovisual y necesito ayuda para elegir la opción más adecuada según mi evento, marca o necesidad.';

export const socialLinks = {
  instagram: 'https://www.instagram.com/tecnojack',
  facebook: 'https://www.facebook.com/tecnojack.pc',
  tiktok: 'https://www.tiktok.com/@tecnojackyt',
  whatsapp: 'https://wa.me/573145406467'
};

export const portfolioWhatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

export function buildPortfolioWhatsappHref(message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildPortfolioPackageHref(category: PortfolioPackageCategory, slug: string): string {
  return `/portfolio/${category}/${slug}`;
}

function buildRequestOptions(
  prefix: string,
  items: string[],
  selectedByDefault = true
): PortfolioRequestOption[] {
  return items.map((item, index) => ({
    id: `${prefix}-${index + 1}`,
    label: item,
    selectedByDefault
  }));
}

function buildPricedRequestOptions(
  prefix: string,
  items: Array<{ label: string; priceLabel: string; priceAmountCop: number }>,
  selectedByDefault = false
): PortfolioRequestOption[] {
  return items.map((item, index) => ({
    id: `${prefix}-${index + 1}`,
    label: item.label,
    priceLabel: item.priceLabel,
    priceAmountCop: item.priceAmountCop,
    selectedByDefault
  }));
}

function buildBaseQuoteOption(
  id: string,
  label: string,
  amountCop?: number,
  selectedByDefault = true
): PortfolioBaseQuoteOption {
  return { id, label, amountCop, selectedByDefault };
}

function buildIncludedRequestOptionGroups(
  prefix: string,
  sections: PortfolioPackageDetailSection[]
): PortfolioRequestOptionGroup[] {
  return sections
    .filter((section) => section.items.length > 0)
    .map((section, index) => ({
      title: section.title,
      selectable: false,
      options: buildRequestOptions(`${prefix}-section-${index + 1}`, section.items)
    }));
}

function normalizePortfolioPackageDetail(
  detail: PortfolioPackageDetail
): PortfolioPackageDetail {
  return {
    ...detail,
    requestOptionGroups: [
      ...buildIncludedRequestOptionGroups(detail.slug, detail.sections),
      ...detail.requestOptionGroups.filter((group) => group.selectable)
    ]
  };
}

function buildWeddingMainBaseQuoteOptions(slug: string): PortfolioBaseQuoteOption[] {
  switch (slug) {
    case 'esencial-hibrido-foto-video':
      return [buildBaseQuoteOption(`${slug}-cop`, "1'900.000 COP", 1900000)];
    case 'completo-hibrido-foto-video':
      return [buildBaseQuoteOption(`${slug}-cop`, "2'800.000 COP", 2800000)];
    case 'premium-cinematico-foto-video':
      return [buildBaseQuoteOption(`${slug}-cop`, "3'900.000 COP", 3900000)];
    case 'luxury-cinematico-foto-video':
      return [buildBaseQuoteOption(`${slug}-cop`, "6'100.000 COP", 6100000)];
    default:
      return [];
  }
}

function buildWeddingHybridSortOrder(slug: string): number {
  switch (slug) {
    case 'esencial-hibrido-foto-video':
      return 1;
    case 'completo-hibrido-foto-video':
      return 2;
    case 'premium-cinematico-foto-video':
      return 3;
    case 'luxury-cinematico-foto-video':
      return 4;
    default:
      return 999;
  }
}

function buildWeddingPhotoBaseQuoteOptions(slug: string): PortfolioBaseQuoteOption[] {
  switch (slug) {
    case 'sencilla-solo-fotos':
      return [buildBaseQuoteOption(`${slug}-cop`, '900.000 COP', 900000)];
    case 'completa-solo-fotos':
      return [buildBaseQuoteOption(`${slug}-cop`, "1'650.000 COP", 1650000)];
    case 'premium-solo-fotos':
      return [buildBaseQuoteOption(`${slug}-cop`, "2'650.000 COP", 2650000)];
    case 'luxury-solo-fotos':
      return [buildBaseQuoteOption(`${slug}-cop`, "4'100.000 COP", 4100000)];
    default:
      return [];
  }
}

const invitationWebUpsells: Array<{ label: string; priceLabel: string; priceAmountCop: number }> = [
  {
    label: 'Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante',
    priceLabel: '150.000 COP',
    priceAmountCop: 150000
  },
  {
    label: 'Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados',
    priceLabel: '220.000 COP',
    priceAmountCop: 220000
  },
  {
    label: 'Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado',
    priceLabel: '350.000 COP',
    priceAmountCop: 350000
  }
];

function buildInvitationWebRequestOptionGroup(prefix: string, eventLabel: string): PortfolioRequestOptionGroup {
  return {
    title: 'Invitaciones web para tu evento',
    description: `Agrega una invitación digital alojada por TECNOJACK para presentar tu ${eventLabel} con una experiencia más atractiva y compartible.`,
    selectable: true,
    options: buildPricedRequestOptions(`${prefix}-web-invite`, invitationWebUpsells, false)
  };
}

export const portfolioNavItems: PortfolioNavItem[] = [
  { label: 'INICIO', href: '/portfolio' },
  { label: 'BODAS', href: '/portfolio/bodas' },
  { label: 'QUINCES', href: '/portfolio/quinces' },
  { label: 'GRADOS', href: '/portfolio/grados' },
  { label: 'VIDEOS', href: '/portfolio/videos' },
  { label: 'CORPORATIVOS', href: '/portfolio/corporativos' },
  { label: 'SOLUCIONES', href: '/soluciones' },
  { label: 'OTROS', href: '/otros' },
  { label: 'SOBRE MÍ', href: '/portfolio/sobre-mi' }
];

export const portfolioLandingNavItems: PortfolioNavItem[] = [
  { label: 'INICIO', href: '/portfolio' },
  { label: 'BODAS', href: '/portfolio/bodas' },
  { label: 'QUINCES', href: '/portfolio/quinces' },
  { label: 'GRADOS', href: '/portfolio/grados' },
  { label: 'VIDEOS', href: '/portfolio/videos' },
  { label: 'CORPORATIVOS', href: '/portfolio/corporativos' },
  { label: 'SOLUCIONES', href: '/soluciones' },
  { label: 'OTROS', href: '/otros' },
  { label: 'SOBRE MÍ', href: '/portfolio/sobre-mi' }
];

export const portfolioHeroStats: PortfolioStat[] = [
  { value: '7+ años', label: 'Experiencia real en eventos' },
  { value: '4K', label: 'Calidad cinematográfica' },
  { value: '100%', label: 'Dirección artística' }
];

export const portfolioHeroHighlights: string[] = [
  'Estética cinematográfica.',
  'Cobertura para eventos y marcas.',
  'Dirección visual con intención.'
];

export const portfolioBrandPillars: PortfolioBrandPillar[] = [
  {
    title: 'Experiencia que guía',
    description: 'Cobertura segura, lectura del momento y criterio visual en cada evento.'
  },
  {
    title: 'Calidad que permanece',
    description: 'Imagen limpia, color cuidado y entregas con valor real en el tiempo.'
  },
  {
    title: 'Arte con intención',
    description: 'Narrativa visual pensada para emocionar, representar y vender mejor.'
  }
];

export const portfolioProfessionalProfile: PortfolioProfessionalProfile = {
  eyebrow: 'Perfil profesional',
  title: 'Más que fotografía, una visión completa',
  lead:
    'Ingeniero de sistemas y productor audiovisual. Combino tecnología, creatividad y narrativa visual para ofrecer experiencias modernas, interactivas y visualmente impactantes.',
  supportingLabel: 'También desarrollo:',
  points: [
    'Invitaciones digitales personalizadas',
    'Experiencias web para bodas y eventos',
    'Plataformas visuales interactivas'
  ],
  ctaLabel: 'Ver ejemplos',
  ctaHref: '/portfolio#gallery'
};

export const portfolioServices: PortfolioService[] = [
  {
    id: 'bodas',
    title: 'Bodas',
    description: 'Historias de boda con estética elegante y lectura emocional del momento.',
    image: 'assets/images/fotos/default-cover.png',
    href: '/portfolio/bodas',
    ctaLabel: 'Ver paquetes',
    points: ['Foto + video', 'Color cinematográfico', 'Entrega para redes y archivo final']
  },
  {
    id: 'quinces',
    title: '15 años',
    description: 'Cobertura visual para celebrar con retratos, clips y momentos clave.',
    image: 'assets/images/galery/M&D-22.jpg',
    href: '/portfolio/quinces',
    ctaLabel: 'Ver paquetes',
    points: ['Retratos de gala', 'Clips verticales', 'Cobertura de ceremonia y fiesta']
  },
  {
    id: 'grados',
    title: 'Grados',
    description: 'Ceremonias y promociones con una cobertura limpia, clara y bien presentada.',
    image: 'assets/images/galery/M&D-15.jpg',
    href: '/portfolio/grados',
    ctaLabel: 'Ver paquetes',
    points: ['Llamado individual', 'Fotos familiares', 'Paquetes por estudiante o grupo']
  },
  {
    id: 'preboda',
    title: 'Preboda',
    description: 'Sesiones previas con dirección sutil, narrativa visual y una estética íntima.',
    image: 'assets/images/galery/M&D-32.jpg',
    href: '/portfolio/preboda',
    ctaLabel: 'Ver paquetes',
    points: ['Dirección creativa', 'Sesión exterior', 'Contenido emocional']
  },
  {
    id: 'videos',
    title: 'Videos',
    description: 'Producción de video musical, corporativo y creativo con enfoque narrativo.',
    image: 'assets/images/galery/M&D-29.jpg',
    href: '/portfolio/videos',
    ctaLabel: 'Ver paquetes',
    points: ['Videos musicales', 'Corporativo y marca', 'Cortometrajes y creativos']
  },
  {
    id: 'corporativos',
    title: 'Corporativos',
    description: 'Contenido visual para marcas, equipos y eventos de empresa.',
    image: 'assets/images/galery/M&D-23.jpg',
    href: '/portfolio/corporativos',
    ctaLabel: 'Ver paquetes',
    points: ['Cobertura de marca', 'Clips para redes', 'Registro institucional']
  },
  {
    id: 'solutions',
    title: 'Soluciones',
    description: 'Páginas y experiencias digitales pensadas para convertir visitas en consultas reales, con una propuesta visual clara y enfocada en ventas.',
    image: 'assets/images/fotos/default-cover.png',
    href: '/soluciones',
    ctaLabel: 'Ver soluciones',
    points: ['Landing pages de conversión', 'Presentación de servicios', 'Contacto directo por WhatsApp']
  }
];

export const portfolioPackages: PortfolioPackage[] = [
  {
    name: 'Cobertura selecta',
    price: 'Desde COP 180.000',
    summary: 'Una base comercial flexible para eventos sociales y ceremonias puntuales.',
    features: [
      'Cobertura por bloque de horas',
      'Entrega digital optimizada',
      'Selección de las mejores fotografías',
      'Soporte por WhatsApp',
      'Escalable con extras y video'
    ]
  },
  {
    name: 'Experiencia Foto + Video',
    price: 'Desde COP 450.000',
    summary: 'Ideal para clientes que buscan una propuesta audiovisual más aspiracional y comercial.',
    featured: true,
    features: [
      'Cobertura foto + video',
      'Reel vertical para redes',
      'Edición premium',
      'Entrega web o privada',
      'Apoyo para narrativa visual',
      'Opciones para ampliar la cobertura'
    ]
  },
  {
    name: 'Producción extendida',
    price: 'A medida',
    summary: 'Para jornadas completas, grupos grandes o eventos que necesitan cobertura estratégica.',
    features: [
      'Preproducción básica',
      'Equipo ampliado',
      'Material para prensa o redes',
      'Entregables múltiples',
      'Cotización personalizada'
    ]
  }
];

export const portfolioPhotoPackages: PortfolioPhotoPackage[] = [
  {
    name: 'Recuerdo Esencial',
    priceCop: '60.000 COP',
    summary: 'Pensado para grados y ceremonias donde necesitas un recuerdo puntual, rápido y bien presentado.',
    features: ['Todas las fotos digitales', '12 fotografías editadas en JPG']
  },
  {
    name: 'Recuerdo Plus',
    priceCop: '120.000 COP',
    summary: 'Una versión más completa para quien quiere variedad, retratos y una entrega con más detalle.',
    featured: true,
    features: ['Todas las fotos digitales', '25 fotografías editadas en JPG', 'Mini selección prioritaria para compartir']
  },
  {
    name: 'Recuerdo Integral',
    priceCop: '220.000 COP',
    summary: 'Cobertura superior con mejor narrativa para familias, promociones y clientes que quieren material amplio.',
    features: ['Todas las fotos digitales', '40 fotografías editadas en JPG', 'Cobertura extendida y apoyo en poses']
  }
];

export const portfolioSuggestedShots: PortfolioSuggestedShot[] = [
  {
    title: 'Imposición de bata',
    description: 'Momento simbólico de apertura con enfoque documental.',
    image: 'assets/images/galery/M&D-3.jpg'
  },
  {
    title: 'Foto individual al ser llamado',
    description: 'Retrato limpio y bien dirigido en el instante principal.',
    image: 'assets/images/galery/M&D-5.jpg'
  },
  {
    title: 'Foto familiar',
    description: 'Composición ordenada para conservar el valor familiar del evento.',
    image: 'assets/images/galery/M&D-10.jpg'
  },
  {
    title: 'Foto con padre/madre o acudiente',
    description: 'Imagen emocional con las personas más importantes del día.',
    image: 'assets/images/galery/M&D-11.jpg'
  },
  {
    title: 'Foto grupal de curso',
    description: 'Cobertura amplia para registrar la promoción completa.',
    image: 'assets/images/galery/M&D-14.jpg'
  },
  {
    title: 'Foto personalizada',
    description: 'Un retrato más creativo y dirigido para redes o impresión.',
    image: 'assets/images/galery/M&D-15.jpg'
  },
  {
    title: 'Foto con amigos',
    description: 'Frames espontáneos con energía y conexión real.',
    image: 'assets/images/galery/M&D-18.jpg'
  },
  {
    title: 'Foto con directivos/docentes',
    description: 'Registro formal y claro para memoria institucional.',
    image: 'assets/images/galery/M&D-21.jpg'
  },
  {
    title: 'Foto de detalles de la ceremonia',
    description: 'Elementos, decoración y símbolos que completan la historia.',
    image: 'assets/images/galery/M&D-22.jpg'
  },
  {
    title: '+3 fotos aleatorias',
    description: 'Selección sorpresa para capturar espontaneidad y ambiente.',
    image: 'assets/images/galery/M&D-29.jpg'
  }
];

export const portfolioWeddingPlans: PortfolioWeddingPlan[] = [
  {
    name: 'Plan Sencilla',
    priceCop: "1'250.000 COP",
    priceUsd: 'Foto + video',
    summary: 'Una cobertura sobria para parejas que buscan resolver su boda con buena estética y sin excesos.',
    features: ['6-8 horas', '120 fotos editadas', 'Video 3-10 min', '1 foto impresa 50cm']
  },
  {
    name: 'Plan Completa',
    priceCop: "1'750.000 COP",
    priceUsd: 'Foto + video',
    summary: 'Plan equilibrado para cubrir todo el evento con más material, más narrativa y mejor entrega social.',
    features: ['Todo el evento', '200 fotos editadas', 'Video 4K', 'Reel redes sociales', 'Video tráiler']
  },
  {
    name: 'Plan Premium',
    priceCop: "2'800.000 COP",
    priceUsd: 'Foto + video',
    summary: 'La propuesta más potente: pensada para parejas que quieren una experiencia cinematográfica completa.',
    featured: true,
    features: ['Preboda incluida', 'Dron', '400 fotos', 'Equipo completo', 'Efectos especiales', 'Trailer + Reel']
  }
];

export const portfolioAdditionalServices: PortfolioAdditionalService[] = [
  {
    title: 'Fotobook de lujo',
    price: 'Desde 250.000 COP',
    description: 'Álbum premium con selección detallada y acabado elegante.'
  },
  {
    title: 'Video tráiler',
    price: 'Desde 150.000 COP',
    description: 'Pieza corta de alto impacto para compartir fácilmente en redes o por WhatsApp.'
  },
  {
    title: 'Reel para redes',
    price: 'Desde 150.000 COP',
    description: 'Versión vertical lista para Instagram, TikTok y estados.'
  },
  {
    title: 'Fotografía en madera',
    price: 'Desde 120.000 COP',
    description: 'Impresión decorativa con un acabado más memorable.'
  }
];

export const groupGraduationPackage: GroupGraduationPackage = {
  slug: 'recuerdo-esencial',
  title: 'PAQUETES GRUPALES DE GRADUACIÓN',
  packageName: 'Básico',
  price: 'Desde 250.000 COP',
  lead:
    'Una base flexible para grados, pensada para cotizar rápido y personalizar según fotos, impresos y video.',
  image: 'assets/images/galery/M&D-15.jpg',
  features: ['50 fotos digitales', 'Servicio personalizable según entrega final', 'Propuesta negociable con el cliente']
};

export const groupGraduationSuggestedShots: GroupGraduationShot[] = [
  { title: 'Imposición de bata', image: 'assets/images/galery/M&D-3.jpg' },
  { title: 'Foto individual al ser llamado', image: 'assets/images/galery/M&D-5.jpg' },
  { title: 'Foto familiar', image: 'assets/images/galery/M&D-10.jpg' },
  { title: 'Foto con padre / madre o acudiente', image: 'assets/images/galery/M&D-11.jpg' },
  { title: 'Foto grupal de curso', image: 'assets/images/galery/M&D-14.jpg' },
  { title: 'Foto personalizada (como la deseen)', image: 'assets/images/galery/M&D-15.jpg' },
  { title: 'Foto con amigos', image: 'assets/images/galery/M&D-18.jpg' },
  { title: 'Foto con directivos docentes', image: 'assets/images/galery/M&D-21.jpg' },
  { title: 'Foto de detalles de la ceremonia', image: 'assets/images/galery/M&D-22.jpg' },
  { title: '+3 fotos aleatorias', image: 'assets/images/galery/M&D-29.jpg' }
];

export const groupGraduationPlans: GroupGraduationPlan[] = [
  {
    slug: 'plan-esencial',
    name: 'Plan Esencial',
    price: '250.000 COP',
    amountCop: 250000,
    lead: 'La opción más directa para quien quiere asegurar un recuerdo limpio y bien entregado de su grado, con 50 fotos digitales listas para compartir.',
    image: 'assets/images/galery/M&D-15.jpg',
    features: [
      'Sesión fotográfica individual profesional',
      'Acompañamiento básico durante la sesión',
      'Dirección de poses sencilla',
      'Iluminación adecuada para retrato',
      'Presencia durante toda la ceremonia de grado',
      'Captura individual durante el llamado a grado',
      'Toma grupal del curso',
      'Momentos espontáneos del evento',
      'Selección curada de fotografías del evento',
      'Edición básica de color, iluminación y encuadre'
    ],
    deliverables: [
      '50 fotografías digitales en alta calidad',
      'Entrega final por Google Drive'
    ]
  },
  {
    slug: 'plan-marco',
    name: 'Plan Marco',
    price: '350.000 COP',
    amountCop: 350000,
    lead: 'Pensado para quienes quieren el recuerdo digital completo y además una pieza física protagonista para exhibir el logro.',
    image: 'assets/images/galery/M&D-21.jpg',
    features: [
      'Incluye todo lo del Plan Esencial',
      'Sesión fotográfica con enfoque en retrato destacado',
      'Mejor dirección de poses',
      'Cuidado en composición visual para impresión',
      'Toma con familiares y acompañantes',
      'Edición mejorada en imágenes seleccionadas',
      'Optimización de archivos para impresión'
    ],
    deliverables: [
      '50 fotografías digitales en alta calidad',
      'Cuadro fotográfico en madera de 70 cm',
      'Entrega final por Google Drive'
    ]
  },
  {
    slug: 'plan-memoria',
    name: 'Plan Memoria',
    price: '450.000 COP',
    amountCop: 450000,
    lead: 'Una propuesta ideal para conservar el grado en formato digital y también en un fotobook breve, práctico y fácil de mostrar.',
    image: 'assets/images/galery/M&D-22.jpg',
    features: [
      'Incluye todo lo del Plan Esencial',
      'Cobertura fotográfica más enfocada en momentos emocionales',
      'Selección narrativa de imágenes',
      'Enfoque en recuerdo visual del evento',
      'Toma con familiares y acompañantes',
      'Diseño básico del fotobook',
      'Edición mejorada para impresión'
    ],
    deliverables: [
      '50 fotografías digitales en alta calidad',
      'Fotobook de 5 páginas',
      'Entrega final por Google Drive'
    ]
  },
  {
    slug: 'plan-legado',
    name: 'Plan Legado',
    price: '550.000 COP',
    amountCop: 550000,
    lead: 'La versión más completa de grados: fotos digitales, fotobook y cuadro, pensada para quien quiere guardar el recuerdo en varios formatos.',
    image: 'assets/images/galery/M&D-19.jpg',
    features: [
      'Incluye todo lo del Plan Esencial',
      'Cobertura completa del momento de grado',
      'Dirección más detallada durante la sesión',
      'Enfoque en recuerdo integral (digital + físico)',
      'Toma con familiares y acompañantes',
      'Edición optimizada para impresión'
    ],
    deliverables: [
      '50 fotografías digitales en alta calidad',
      'Fotobook de 5 páginas',
      'Cuadro fotográfico en madera de 70 cm',
      'Entrega final por Google Drive'
    ],
    featured: true
  }
];

export const weddingPackagesTitle = 'Paquetes principales de boda';

export const weddingMainPlans: WeddingPackagePlan[] = [
  {
    slug: 'esencial-hibrido-foto-video',
    name: 'HÍBRIDA - Tu historia en foto y video',
    priceLines: ["1'900.000 COP"],
    lead:
      'Cobertura equilibrada que combina fotografía y video para conservar los momentos más importantes del día de una forma natural, elegante y emotiva. Ideal para bodas pequeñas o parejas que desean conservar los recuerdos esenciales sin perder calidad.',
    image: 'assets/images/galery/M&D-16.jpg',
    items: [
      'Cobertura de hasta 6 horas',
      '1 fotógrafo y 1 videógrafo',
      'Ceremonia, momentos importantes y recepción parcial',
      'Dirección básica de poses',
      'Hasta 180 fotos editadas',
      'Video resumen (Highlight Film) de 4 a 6 minutos',
      '1 Reel vertical para redes sociales',
      'Galería privada durante 3 meses',
      'Entrega digital mediante Google Drive'
    ],
    features: [
      'Cobertura de hasta 6 horas',
      '1 fotógrafo',
      '1 videógrafo',
      'Dirección básica',
      'Edición profesional',
      'Colorización cinematográfica ligera',
      'Audio ambiente'
    ],
    deliverables: [
      'Hasta 180 fotografías editadas',
      'Video resumen (Highlight Film) de 4 a 6 minutos',
      '1 Reel vertical para redes sociales',
      'Galería privada durante 3 meses',
      'Entrega digital mediante Google Drive'
    ],
    coverage: ['Ceremonia', 'Momentos importantes', 'Recepción parcial']
  },
  {
    slug: 'completo-hibrido-foto-video',
    name: 'HÍBRIDA - La historia completa de tu boda',
    priceLines: ["2'800.000 COP"],
    lead:
      'Cobertura completa que documenta el desarrollo de la boda desde los preparativos hasta los momentos más importantes de la celebración. Diseñado para parejas que desean revivir su historia completa.',
    image: 'assets/images/galery/M&D-29.jpg',
    items: [
      'Cobertura de hasta 8 horas',
      '1 fotógrafo y 1 videógrafo',
      'Apoyo logístico cuando sea necesario',
      'Preparativos, ceremonia, sesión de pareja, recepción e inicio de fiesta',
      'Dirección durante el evento y tomas creativas',
      'Gimbal y audio profesional de consola',
      'Hasta 300 fotos editadas',
      '15 fotos impresas + 1 ampliación',
      'Video resumen (Highlight Film) de 6 a 8 minutos',
      'Película documental de 15 a 25 minutos',
      '1 Reel vertical para redes',
      'Galería privada durante 6 meses',
      'Entrega digital'
    ],
    features: [
      'Cobertura de hasta 8 horas',
      '1 fotógrafo',
      '1 videógrafo',
      'Apoyo logístico cuando sea necesario',
      'Dirección durante el evento',
      'Tomas creativas',
      'Audio profesional de consola',
      'Gimbal'
    ],
    deliverables: [
      'Hasta 300 fotografías editadas',
      '15 fotografías impresas',
      '1 fotografía ampliada',
      'Video resumen (Highlight Film) de 6 a 8 minutos',
      'Película documental de 15 a 25 minutos',
      '1 Reel vertical',
      'Galería privada durante 6 meses',
      'Entrega digital'
    ],
    coverage: ['Preparativos', 'Ceremonia', 'Sesión de pareja', 'Recepción', 'Inicio de fiesta']
  },
  {
    slug: 'premium-cinematico-foto-video',
    name: 'HÍBRIDA - Experiencia cinematográfica',
    priceLines: ["3'900.000 COP"],
    lead:
      'Experiencia completa que combina fotografía artística y producción cinematográfica para contar la historia del día con una narrativa mucho más cuidada. Este es nuestro paquete recomendado.',
    image: 'assets/images/fotos/M&D-31.jpg',
    featured: true,
    items: [
      'Cobertura de hasta 10 horas',
      'Fotógrafo principal + Videógrafo principal',
      'Segundo operador o asistente según logística',
      'Preparativos completos, primer encuentro a solas (First Look), ceremonia, sesión artística de pareja, recepción y fiesta',
      'Sesión preboda incluida',
      'Dirección creativa y corrección de color cinematográfica',
      'Gimbal, tomas con dron (cuando sea posible), audio pro dedicado e iluminación de apoyo',
      'Hasta 450 fotos editadas',
      '20 fotos impresas + 1 ampliación + Álbum fotográfico',
      'Tráiler cinematográfico + Video resumen (8-12 min) + Película documental (25-40 min)',
      '2 Reels para redes sociales',
      'Galería privada durante 1 año',
      'Entrega digital'
    ],
    features: [
      'Cobertura de hasta 10 horas',
      'Fotógrafo principal',
      'Videógrafo principal',
      'Segundo operador o asistente según logística',
      'Dirección creativa',
      'Gimbal',
      'Tomas con dron cuando sea posible',
      'Audio profesional dedicado',
      'Iluminación de apoyo',
      'Corrección de color cinematográfica',
      'Sesión preboda incluida'
    ],
    deliverables: [
      'Hasta 450 fotografías editadas',
      '20 fotografías impresas',
      '1 fotografía ampliada',
      'Álbum fotográfico',
      'Tráiler cinematográfico',
      'Video resumen (Highlight Film) de 8 a 12 minutos',
      'Película documental de 25 a 40 minutos',
      '2 Reels para redes',
      'Galería privada durante 1 año',
      'Entrega digital'
    ],
    coverage: ['Preparativos completos', 'Primer encuentro a solas (First Look)', 'Ceremonia', 'sesión artística de pareja', 'Recepción', 'Fiesta']
  },
  {
    slug: 'luxury-cinematico-foto-video',
    name: 'HÍBRIDA - The Wedding Film Experience',
    priceLines: ["6'100.000 COP"],
    lead:
      'La experiencia audiovisual más completa de TECNOJACK. Pensada para parejas que desean transformar su boda en una producción cinematográfica de alto nivel con un enfoque de autor sumamente exclusivo.',
    image: 'assets/images/galery/M&D-32.jpg',
    items: [
      'Cobertura de hasta 12 horas',
      '2 fotógrafos + 2 videógrafos + Asistente de producción',
      'Preproducción completa (reunión creativa, planeación, cronograma, tablero de inspiración y lista de fotos clave)',
      'Sesión Preboda Premium y Sesión Postboda Premium incluidas',
      'Cobertura simultánea de ambos preparativos',
      'Tomas con dron, gimbal, audio e iluminación profesional',
      'Más de 600 fotos editadas con selección y edición de las mejores tomas',
      '30 fotos impresas + 2 ampliaciones + Álbum Premium XL + Caja de presentación',
      'Tráiler cinematográfico + Video resumen (10-15 min) + Película documental (45-75 min)',
      '4 Reels para redes + Tráiler vertical',
      'Galería privada durante 2 años con entrega prioritaria',
      'Adelanto rápido de 20 fotografías durante las primeras 72 horas'
    ],
    features: [
      'Cobertura de hasta 12 horas',
      '2 fotógrafos',
      '2 videógrafos',
      'Asistente de producción',
      'Reunión creativa, planeación, cronograma, tablero de inspiración (moodboard) y lista de fotos deseadas',
      'Asesoría de locaciones y de iluminación',
      'Cobertura simultánea de ambos preparativos',
      'Dirección audiovisual completa',
      'Tomas con dron',
      'Gimbal',
      'Audio profesional de consola y micrófonos inalámbricos',
      'Iluminación profesional de apoyo',
      'Tomas artísticas, de decoración y de la locación',
      'Sesión Preboda Premium y Sesión Postboda Premium'
    ],
    deliverables: [
      'Más de 600 fotografías editadas con selección personalizada de las mejores tomas',
      '30 fotografías impresas',
      '2 ampliaciones',
      'Álbum Premium XL',
      'Caja de presentación',
      'Tráiler cinematográfico',
      'Video resumen (Highlight Film) de 10 a 15 minutos',
      'Película documental de 45 a 75 minutos',
      '4 Reels para redes',
      'Tráiler vertical',
      'Sesión Preboda Premium',
      'Sesión Postboda Premium',
      'Galería privada durante 2 años con entrega prioritaria',
      'Adelanto rápido de 20 fotografías durante las primeras 72 horas'
    ],
    coverage: ['Cobertura simultánea de ambos preparativos', 'Dirección audiovisual completa', 'Tomas con dron', 'Gimbal', 'Audio profesional', 'Iluminación profesional', 'Tomas artísticas', 'Tomas de decoración', 'Tomas de la locación']
  }
];

export const weddingPhotoOnlySectionTitle = 'Paquetes solo fotos';

export const weddingPhotoOnlyPlans: WeddingPhotoOnlyPlan[] = [
  {
    slug: 'sencilla-solo-fotos',
    name: 'Esencial – Recuerdo esencial de tu boda',
    priceLines: ['900.000 COP'],
    lead:
      'Cobertura fotográfica ideal para capturar los momentos más importantes de tu boda de forma natural y emotiva.',
    image: 'assets/images/galery/M&D-22.jpg',
    items: [
      'Cobertura de hasta 4 horas',
      '1 fotógrafo',
      'Hasta 150 fotografías editadas',
      '10 fotos impresas',
      'Galería privada durante 3 meses'
    ],
    features: [
      'Cobertura de hasta 4 horas',
      '1 fotógrafo',
      'Dirección básica de poses',
      'Edición con estilo limpio y natural'
    ],
    deliverables: [
      'Hasta 150 fotografías editadas',
      '10 fotografías impresas',
      'Galería digital privada por 3 meses',
      'Entrega digital en alta resolución'
    ],
    coverage: ['Ceremonia', 'Momentos clave']
  },
  {
    slug: 'completa-solo-fotos',
    name: 'Completa – La historia completa de tu día',
    priceLines: ["1'650.000 COP"],
    lead:
      'Cobertura más amplia que documenta tu boda con mayor detalle, acompañamiento y enfoque emocional.',
    image: 'assets/images/galery/M&D-29.jpg',
    items: [
      'Cobertura de hasta 7 horas',
      'Fotógrafo principal + Asistente de fotografía',
      'Hasta 280 fotografías editadas',
      '20 fotos impresas + 1 ampliación',
      'Galería privada durante 6 meses'
    ],
    features: [
      'Cobertura de hasta 7 horas',
      '1 fotógrafo principal',
      '1 asistente de fotografía',
      'Dirección y acompañamiento durante el evento',
      'Edición profesional con estilo natural'
    ],
    deliverables: [
      'Hasta 280 fotografías editadas',
      '20 fotografías impresas',
      '1 fotografía ampliada',
      'Galería digital privada por 6 meses',
      'Entrega digital en alta resolución'
    ],
    coverage: ['Preparativos', 'Ceremonia', 'Sesión de fotos', 'Recepción']
  },
  {
    slug: 'premium-solo-fotos',
    name: 'Premium – Experiencia fotográfica completa',
    priceLines: ["2'650.000 COP"],
    lead:
      'Experiencia completa que combina cobertura total, dirección creativa y fotografía con acabado artístico. Nuestro paquete recomendado.',
    image: 'assets/images/fotos/M&D-31.jpg',
    featured: true,
    items: [
      'Cobertura completa del evento (preparativos hasta la fiesta)',
      '1 o 2 fotógrafos + 1 asistente',
      'Dirección creativa con enfoque artístico',
      'Sesión previa incluida (preboda)',
      'Hasta 450 fotografías editadas con edición profesional avanzada',
      '20 fotos impresas + Álbum fotográfico',
      'Adelanto rápido de fotografías en las primeras 72 horas',
      'Galería online disponible por 1 año'
    ],
    features: [
      'Cobertura completa del evento (preparativos y fiesta)',
      '1 o 2 fotógrafos',
      '1 asistente',
      'Dirección creativa con enfoque artístico',
      'Sesión preboda incluida',
      'Edición profesional avanzada'
    ],
    deliverables: [
      'Hasta 450 fotografías editadas',
      '20 fotografías impresas',
      'Álbum fotográfico',
      'Adelanto rápido de fotografías',
      'Galería digital privada por 1 año',
      'Entrega digital en alta resolución'
    ],
    coverage: ['Preparativos', 'Ceremonia', 'Sesión de fotos', 'Recepción', 'Fiesta']
  },
  {
    slug: 'luxury-solo-fotos',
    name: 'Exclusivo – Producción fotográfica de autor',
    priceLines: ["4'100.000 COP"],
    lead:
      'Experiencia fotográfica de autor de alto nivel. Diseñada para parejas que buscan una estética artística y de autor, con un registro exclusivo y diferente de su boda.',
    image: 'assets/images/galery/M&D-32.jpg',
    items: [
      'Cobertura de hasta 12 horas',
      '2 fotógrafos + Asistente',
      'Sesión Preboda Premium y Sesión Postboda Premium incluidas',
      'Planeación creativa, tablero de inspiración y dirección creativa avanzada',
      'Esquemas de iluminación profesional',
      'Hasta 600 fotografías editadas',
      'Álbum Premium XL + Caja de presentación',
      'Adelanto rápido de 20 fotografías en las primeras 72 horas',
      'Galería privada durante 2 años con entrega prioritaria'
    ],
    features: [
      'Cobertura de hasta 12 horas',
      '2 fotógrafos',
      'Asistente',
      'Sesión Preboda Premium y Sesión Postboda Premium incluidas',
      'Planeación creativa y tablero de inspiración (moodboard)',
      'Dirección creativa avanzada',
      'Iluminación profesional'
    ],
    deliverables: [
      'Hasta 600 fotografías editadas',
      'Álbum Premium XL',
      'Caja de presentación',
      'Sesión Preboda Premium',
      'Sesión Postboda Premium',
      'Adelanto rápido de 20 fotografías',
      'Galería privada durante 2 años',
      'Entrega prioritaria'
    ],
    coverage: ['Preparativos de ambos novios', 'Ceremonia', 'Sesión de fotos artística', 'Recepción', 'Fiesta', 'Detalles y decoración']
  }
];

export type WeddingVideoOnlyPlan = {
  slug: string;
  name: string;
  priceLines: string[];
  amountCop: number;
  lead: string;
  image: string;
  features: string[];
  deliverables: string[];
};

export type WeddingPostweddingPlan = {
  slug: string;
  name: string;
  priceLines: string[];
  amountCop: number;
  lead: string;
  image: string;
  features: string[];
  deliverables: string[];
};

export type WeddingCivilPlan = {
  slug: string;
  name: string;
  priceLines: string[];
  amountCop: number;
  lead: string;
  image: string;
  features: string[];
  deliverables: string[];
  coverage: string[];
  featured?: boolean;
};

export type WeddingProposalPlan = {
  slug: string;
  name: string;
  priceLines: string[];
  amountCop: number;
  lead: string;
  image: string;
  features: string[];
  deliverables: string[];
  coverage: string[];
  featured?: boolean;
};

export const weddingVideoOnlyPlans: WeddingVideoOnlyPlan[] = [
  {
    slug: 'video-bodas-elemental',
    name: 'Esencial – Recuerdo esencial de tu boda',
    priceLines: ['850.000 COP'],
    amountCop: 850000,
    lead: 'Cobertura sencilla y emotiva grabada en resolución 4K para conservar los momentos más importantes de tu boda.',
    image: 'assets/images/galery/M&D-16.jpg',
    features: [
      'Cobertura parcial del evento (hasta 4 horas)',
      '1 videógrafo',
      'Grabación en resolución 4K',
      'Audio ambiente',
      'Tomas espontáneas'
    ],
    deliverables: [
      'Highlight Film de 4 a 6 minutos',
      '1 Reel vertical para redes sociales',
      'Entrega final por Google Drive'
    ]
  },
  {
    slug: 'video-bodas-completo',
    name: 'Completo – La historia de tu día',
    priceLines: ["1'650.000 COP"],
    amountCop: 1650000,
    lead: 'Narrativa completa de tu boda con dos cámaras y audio dedicado para capturar cada emoción.',
    image: 'assets/images/galery/M&D-29.jpg',
    features: [
      'Cobertura amplia (ceremonia y recepción parcial)',
      '2 cámaras',
      'Gimbal para tomas estabilizadas',
      'Captura de audio de votos y discursos',
      'Tomas creativas',
      'Edición narrativa'
    ],
    deliverables: [
      'Highlight Film',
      'Película documental',
      '1 Reel vertical para redes sociales',
      'Entrega final por Google Drive'
    ]
  },
  {
    slug: 'video-bodas-premium',
    name: 'Premium – Experiencia cinematográfica',
    priceLines: ["2'800.000 COP"],
    amountCop: 2800000,
    lead: 'Producción audiovisual con enfoque cinematográfico, tomas aéreas y cobertura completa de tu boda.',
    image: 'assets/images/galery/M&D-30.jpg',
    features: [
      'Cobertura completa del evento (preparativos y fiesta)',
      '2 a 3 cámaras',
      'Tomas estabilizadas (gimbal)',
      'Tomas aéreas con drone (si aplica)',
      'Audio profesional dedicado',
      'Colorización cinematográfica'
    ],
    deliverables: [
      'Highlight Film',
      'Película documental',
      '2 Reels para redes sociales',
      'Entrega final por Google Drive'
    ]
  },
  {
    slug: 'video-bodas-luxury',
    name: 'Exclusivo – The Wedding Film Experience',
    priceLines: ["4'500.000 COP"],
    amountCop: 4500000,
    lead: 'Experiencia premium de autor que transforma tu boda en una película con narrativa cinematográfica, diseño sonoro e iluminación profesional.',
    image: 'assets/images/galery/M&D-32.jpg',
    features: [
      'Cobertura completa desde preparativos hasta la fiesta',
      'Reunión de dirección, cronograma de producción, tablero de inspiración (moodboard) y desarrollo de narrativa',
      '3 a 4 cámaras',
      '2 videógrafos principales + Asistente',
      'Tomas avanzadas con gimbal y dron',
      'Audio profesional y multicámara con micrófonos dedicados',
      'Esquemas de iluminación profesional',
      'Corrección de color (color grading) cinematográfica avanzada',
      'Diseño de sonido (Sound Design) cinematográfico'
    ],
    deliverables: [
      'Tráiler cinematográfico',
      'Wedding Film principal',
      'Película documental larga',
      '3 a 4 Reels para redes',
      'Edición prioritaria',
      'Entrega final por Google Drive'
    ]
  }
];

export const weddingCivilPlans: WeddingCivilPlan[] = [
  {
    slug: 'civil-esencial',
    name: 'Civil Esencial',
    priceLines: ['550.000 COP'],
    amountCop: 550000,
    lead: 'Una cobertura cercana y precisa para conservar los momentos esenciales de tu ceremonia civil.',
    image: 'assets/images/stock/boda-civil/civil-esencial.jpg',
    features: ['1 fotógrafo', 'Duración de 2 horas', 'Dirección de pareja y fotografías familiares'],
    deliverables: [
      'Hasta 50 fotografías finales, seleccionadas y editadas',
      'Galería digital privada por 1 mes',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Ceremonia civil', 'Firma de documentos y anillos', 'Familiares', 'Sesión breve de pareja']
  },
  {
    slug: 'civil-completa',
    name: 'Civil Completa',
    priceLines: ['850.000 COP'],
    amountCop: 850000,
    lead: 'Una narrativa más completa que acompaña la llegada, la ceremonia y una celebración breve.',
    image: 'assets/images/stock/boda-civil/civil-completa.jpg',
    features: ['1 fotógrafo', 'Duración de 3 horas', 'Dirección creativa de pareja y grupos'],
    deliverables: [
      'Hasta 100 fotografías finales, seleccionadas y editadas',
      'Reel vertical de 30 a 45 segundos',
      '1 cuadro fotográfico de 60 x 40 cm',
      'Galería digital privada por 3 meses',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Llegada', 'Ceremonia civil', 'Firma de documentos y anillos', 'Familiares e invitados', 'Sesión dirigida de pareja', 'Brindis o recepción breve'],
    featured: true
  },
  {
    slug: 'civil-hibrida',
    name: 'Civil Híbrida',
    priceLines: ["1'350.000 COP"],
    amountCop: 1350000,
    lead: 'Fotografía y video coordinados para contar la ceremonia civil con una mirada más completa.',
    image: 'assets/images/stock/boda-civil/civil-hibrida.jpg',
    features: ['1 fotógrafo y 1 videógrafo', 'Duración de 4 horas', 'Reunión breve de planeación', 'Dirección audiovisual'],
    deliverables: [
      'Hasta 120 fotografías finales, seleccionadas y editadas',
      'Reel vertical de 45 a 60 segundos',
      'Video principal de 3 a 5 minutos',
      'Galería digital privada por 6 meses',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Llegada o preparación breve', 'Ceremonia civil', 'Firma de documentos y anillos', 'Familiares e invitados', 'Sesión de pareja', 'Brindis o recepción']
  }
];

export const weddingProposalPlans: WeddingProposalPlan[] = [
  {
    slug: 'peticion-esencial',
    name: 'Petición Esencial',
    priceLines: ['450.000 COP'],
    amountCop: 450000,
    lead: 'Capturamos la sorpresa con discreción y cerramos la experiencia con una sesión breve de pareja.',
    image: 'assets/images/stock/peticion-de-mano/peticion-esencial.jpg',
    features: ['1 fotógrafo', 'Duración de 2 horas', 'Reunión breve de planeación', 'Coordinación de ubicación y momento clave'],
    deliverables: [
      'Hasta 50 fotografías finales, seleccionadas y editadas',
      'Galería digital privada por 1 mes',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Llegada discreta', 'Momento de la petición', 'Reacciones', 'Sesión breve de pareja']
  },
  {
    slug: 'peticion-completa',
    name: 'Petición Completa',
    priceLines: ['750.000 COP'],
    amountCop: 750000,
    lead: 'Una cobertura más cuidada para documentar la preparación, la sorpresa y la celebración posterior.',
    image: 'assets/images/stock/peticion-de-mano/peticion-completa.jpg',
    features: ['1 fotógrafo y 1 asistente', 'Duración de 3 horas', 'Reunión de planeación', 'Apoyo de iluminación y coordinación discreta'],
    deliverables: [
      'Hasta 80 fotografías finales, seleccionadas y editadas',
      'Reel vertical de 30 a 45 segundos',
      '1 cuadro fotográfico de 60 x 40 cm',
      'Galería digital privada por 3 meses',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Preparación del momento', 'Llegada discreta', 'Petición y reacciones', 'Sesión dirigida de pareja', 'Brindis o celebración breve'],
    featured: true
  },
  {
    slug: 'peticion-hibrida',
    name: 'Petición Híbrida',
    priceLines: ["1'150.000 COP"],
    amountCop: 1150000,
    lead: 'Fotografía y video coordinados para convertir la sorpresa en una historia audiovisual completa.',
    image: 'assets/images/stock/peticion-de-mano/peticion-hibrida.jpg',
    features: ['1 fotógrafo, 1 videógrafo y 1 asistente', 'Duración de 4 horas', 'Planeación audiovisual', 'Coordinación discreta del equipo'],
    deliverables: [
      'Hasta 100 fotografías finales, seleccionadas y editadas',
      'Reel vertical de 45 a 60 segundos',
      'Video principal de 2 a 4 minutos',
      'Galería digital privada por 6 meses',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Preparación y detalles', 'Llegada discreta', 'Petición y reacciones', 'Sesión de pareja', 'Brindis o celebración']
  }
];

export const weddingPostweddingPlans: WeddingPostweddingPlan[] = [
  {
    slug: 'postboda-esencial',
    name: 'Postboda Esencial',
    priceLines: ['400.000 COP'],
    amountCop: 400000,
    lead: 'Sesión sencilla y emotiva para capturar momentos naturales como recién casados sin el estrés del evento.',
    image: 'assets/images/galery/M&D-15.jpg',
    features: ['1 fotógrafo', '1 locación', 'Duración de 2 horas', '1 vestuario', 'Dirección de pareja', 'Sesión en exterior'],
    deliverables: ['Hasta 50 fotografías finales, seleccionadas y editadas', 'Galería digital privada por 1 mes', 'Entrega final en alta resolución por Google Drive']
  },
  {
    slug: 'postboda-completa',
    name: 'Postboda Completa',
    priceLines: ['650.000 COP'],
    amountCop: 650000,
    lead: 'Sesión más elaborada que permite explorar diferentes escenarios y lograr fotografías más cuidadas y expresivas.',
    image: 'assets/images/galery/M&D-21.jpg',
    features: ['1 fotógrafo', '1 a 2 locaciones cercanas', 'Duración de 3 horas', 'Hasta 2 vestuarios', 'Dirección creativa'],
    deliverables: ['Hasta 80 fotografías finales, seleccionadas y editadas', '1 cuadro fotográfico de 60 x 40 cm', 'Galería digital privada por 3 meses', 'Entrega final en alta calidad por Google Drive']
  },
  {
    slug: 'postboda-premium',
    name: 'Postboda Editorial',
    priceLines: ['950.000 COP'],
    amountCop: 950000,
    lead: 'Sesión diseñada para crear imágenes impactantes con estética artística en locaciones especiales.',
    image: 'assets/images/galery/M&D-22.jpg',
    features: [
      '1 fotógrafo y 1 asistente',
      'Hasta 2 locaciones',
      'Duración de 4 horas',
      'Hasta 3 vestuarios',
      'Reunión breve de planeación',
      'Concepto visual',
      'dirección creativa avanzada avanzada',
      'Apoyo de iluminación y logística durante la sesión'
    ],
    deliverables: [
      'Hasta 120 fotografías finales, seleccionadas y editadas',
      'Reel vertical de 30 a 45 segundos',
      '1 cuadro fotográfico de 60 x 40 cm',
      'Galería digital privada por 6 meses',
      'Entrega final en alta resolución por Google Drive'
    ]
  }
];

export const weddingPackageNotes: string[] = [
  '"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente."',
  '"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos."',
  '"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje."'
];

export const quincePackagesTitle = 'PAQUETES DE QUINCEAÑEROS';

export const quinceMainPlans: QuincePackagePlan[] = [
  {
    slug: 'quince-esencial-recuerdos',
    name: 'Esencial – Recuerdos de tus quince',
    lead: 'Cobertura fotográfica enfocada en capturar los momentos más importantes de tu celebración de forma natural y elegante.',
    image: 'assets/images/galery/M&D-22.jpg',
    priceLines: ['650.000 COP'],
    amountCop: 650000,
    items: [
      'Cobertura del evento de 3 a 4 horas',
      'Dirección básica de poses',
      'Fotografía documental del evento',
      '80 a 120 fotografías editadas',
      '1 fotografía impresa de 50 cm',
      'Entrega digital en alta resolución'
    ],
    features: [
      'Cobertura del evento de 3 a 4 horas',
      'Dirección básica de poses',
      'Fotografía documental del evento'
    ],
    deliverables: [
      '80 a 120 fotografías editadas',
      '1 fotografía impresa de 50 cm',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Llegada de la quinceañera', 'Decoración y detalles del salón', 'Ceremonia', 'Vals de honor', 'Brindis']
  },
  {
    slug: 'quince-completa-historia',
    name: 'Completa – Historia completa en fotografía',
    lead: 'Una cobertura más amplia que permite capturar cada momento importante con mayor detalle y dirección profesional.',
    image: 'assets/images/fotos/M&D-12.jpg',
    priceLines: ['950.000 COP'],
    amountCop: 950000,
    items: [
      'Cobertura del evento de 5 a 6 horas',
      'Dirección de poses',
      'Mayor enfoque en momentos clave',
      '120 a 180 fotografías editadas',
      '1 fotografía impresa de 50 cm',
      'Galería digital',
      'Entrega en alta resolución'
    ],
    features: [
      'Cobertura del evento de 5 a 6 horas',
      'Dirección de poses',
      'Mayor enfoque en momentos clave'
    ],
    deliverables: [
      '120 a 180 fotografías editadas',
      '1 fotografía impresa de 50 cm',
      'Galería digital privada',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Arreglos y preparativos', 'Llegada al evento', 'Sesión de fotos', 'Ceremonia', 'Vals de honor', 'Inicio de recepción']
  },
  {
    slug: 'quince-premium-experiencia-fotografica',
    name: 'Premium – Experiencia fotográfica completa',
    lead: 'Una experiencia completa para capturar tus quince con un estilo artístico y mayor nivel de producción.',
    image: 'assets/images/galery/M&D-23.jpg',
    priceLines: ["1'400.000 COP"],
    amountCop: 1400000,
    featured: true,
    items: [
      'Cobertura del evento de 7 a 8 horas',
      'Dirección creativa avanzada',
      'Mayor enfoque en estética y narrativa visual',
      'Hasta 250 fotografías editadas',
      '2 fotografías impresas de 50 cm',
      '5 fotografías impresas tamaño 15 cm',
      'Fotobook básico',
      'Entrega digital en alta resolución'
    ],
    features: [
      'Cobertura del evento de 7 a 8 horas',
      'Dirección creativa avanzada',
      'Mayor enfoque en estética y narrativa visual'
    ],
    deliverables: [
      'Hasta 250 fotografías editadas',
      '2 fotografías impresas de 50 cm',
      '5 fotografías impresas tamaño 15 cm',
      'Fotobook básico',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Preparativos y arreglos personales', 'Sesión artística de pareja o con amigas', 'Llegada y entrada al evento', 'Ceremonia', 'Vals de honor', 'Sesión de retratos', 'Recepción y fiesta', 'Brindis y detalles especiales']
  },
  {
    slug: 'quince-luxury-experiencia-exclusiva',
    name: 'Luxury – Experiencia exclusiva de quince',
    lead: 'El más alto nivel de producción para capturar la magia de tus quince con múltiples locaciones, vestuarios y un acabado verdaderamente lujoso.',
    image: 'assets/images/galery/M&D-25.jpg',
    priceLines: ["2'500.000 COP"],
    amountCop: 2500000,
    featured: true,
    items: [
      'Cobertura del evento completa (sin límite de horas)',
      'Hasta 4 locaciones diferentes',
      'Cambios de vestuario ilimitados',
      'Dirección creativa de alto nivel',
      'Iluminación y asistentes dedicados',
      'Más de 400 fotografías editadas artísticamente',
      'Fotolibro de lujo premium (acabados finos)',
      '2 fotografías impresas en retablo de madera (60x40 cm)',
      '10 fotografías impresas tamaño 15 cm',
      'Sesión Pre 15',
      'Sesión Post 15',
      'Entrega digital en alta resolución'
    ],
    features: [
      'Cobertura completa (sin límite de horas)',
      'Hasta 4 locaciones diferentes y cambios de vestuario',
      'Dirección creativa y estilismo avanzado'
    ],
    deliverables: [
      'Más de 400 fotografías con edición artística',
      'Fotolibro de lujo premium',
      '2 impresiones en retablo de madera (60x40 cm)',
      '10 fotografías impresas tamaño 15 cm',
      'Sesión Pre 15 incluida',
      'Sesión Post 15 incluida',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Sesión Pre 15 (múltiples locaciones y vestuarios)', 'Preparativos y arreglos personales', 'Llegada y entrada al evento', 'Ceremonia', 'Vals de honor', 'Sesión de retratos', 'Recepción y fiesta completa', 'Sesión Post 15 (cierre fotográfico)']
  }
];

type QuinceVideoPlan = {
  slug: string;
  name: string;
  lead: string;
  image: string;
  priceLines: string[];
  amountCop: number;
  features: string[];
  deliverables: string[];
  coverage?: string[];
  featured?: boolean;
};

export const quinceVideoPlans: QuinceVideoPlan[] = [
  {
    slug: 'quince-video-esencial',
    name: 'Esencial – Video de tus quince',
    lead: 'Video resumen que captura los momentos más importantes de tu celebración.',
    image: 'assets/images/galery/M&D-29.jpg',
    priceLines: ['700.000 COP'],
    amountCop: 700000,
    features: [
      'Cobertura de 3 a 4 horas',
      'Grabación en alta calidad',
      'Enfoque en momentos clave',
      'Edición profesional'
    ],
    deliverables: [
      'Video principal de 3 a 5 minutos en 4K',
      'Entrega final por Google Drive'
    ],
    coverage: ['Ceremonia', 'Vals de honor', 'Brindis', 'Momentos destacados']
  },
  {
    slug: 'quince-video-completa',
    name: 'Completa – Historia en video',
    lead: 'Cobertura más completa que permite contar tu historia con mayor profundidad y calidad visual.',
    image: 'assets/images/galery/M&D-19.jpg',
    priceLines: ["1'200.000 COP"],
    amountCop: 1200000,
    features: [
      'Cobertura de 5 a 6 horas',
      'Grabación profesional con mejor narrativa',
      'Tomas dinámicas con movimiento',
      'Edición con corrección de color'
    ],
    deliverables: [
      'Video principal de 5 a 10 minutos en 4K',
      'Tráiler de 30 a 60 segundos',
      'Entrega final por Google Drive'
    ],
    coverage: ['Preparativos', 'Llegada al evento', 'Ceremonia', 'Vals de honor', 'Recepción e inicio de fiesta']
  },
  {
    slug: 'quince-video-premium-cinematica',
    name: 'Premium – Experiencia cinematográfica',
    lead: 'Producción audiovisual de alto nivel con enfoque cinematográfico para tus quince años.',
    image: 'assets/images/galery/M&D-23.jpg',
    priceLines: ["2'000.000 COP"],
    amountCop: 2000000,
    featured: true,
    features: [
      'Cobertura de 7 a 10 horas',
      'Tomas con dron (cuando sea posible)',
      'Equipo de grabación profesional',
      'Dirección creativa avanzada',
      'Corrección de color cinematográfica',
      'Audio profesional de consola'
    ],
    deliverables: [
      'Video principal de 10 a 20 minutos en 4K',
      'Tráiler de 2 a 3 minutos',
      '1 reel vertical para redes',
      'Entrega final por Google Drive'
    ],
    coverage: ['Preparativos y arreglos', 'Sesión de fotos previa', 'Llegada y entrada al evento', 'Ceremonia', 'Vals de honor', 'Sesión de retratos', 'Fiesta completa', 'Detalles y decoración']
  }
];

type QuinceHybridPlan = {
  slug: string;
  name: string;
  lead: string;
  image: string;
  priceLines: string[];
  amountCop: number;
  features: string[];
  deliverables: string[];
  coverage?: string[];
  featured?: boolean;
};

export const quinceHybridPlans: QuinceHybridPlan[] = [
  {
    slug: 'quince-mixta-esencial-foto-video',
    name: 'Esencial – Foto + Video',
    lead: 'Cobertura básica que combina fotografía y video para capturar los momentos principales.',
    image: 'assets/images/galery/M&D-23.jpg',
    priceLines: ["1'250.000 COP"],
    amountCop: 1250000,
    features: [
      'Cobertura de 4 a 5 horas',
      'Fotógrafo y videógrafo',
      'Dirección básica de poses y tomas',
      'Grabación en alta calidad'
    ],
    deliverables: [
      '100 a 140 fotografías editadas',
      'Video principal de 3 a 5 minutos',
      'Entrega final por Google Drive'
    ],
    coverage: ['Ceremonia', 'Vals de honor', 'Sesión de fotos', 'Brindis']
  },
  {
    slug: 'quince-mixta-completa-experiencia',
    name: 'Completa – Experiencia combinada',
    lead: 'Cobertura equilibrada que permite capturar tanto fotografía como video con mayor detalle.',
    image: 'assets/images/galery/M&D-19.jpg',
    priceLines: ["1'800.000 COP"],
    amountCop: 1800000,
    features: [
      'Cobertura de 5 a 7 horas',
      'Fotógrafo y videógrafo dedicados',
      'Dirección creativa durante el evento',
      'Tomas dinámicas con movimiento'
    ],
    deliverables: [
      '140 a 200 fotografías editadas',
      'Video principal de 5 a 10 minutos',
      'Tráiler de 30 a 60 segundos',
      'Fotobook básico',
      'Entrega final por Google Drive'
    ],
    coverage: ['Preparativos', 'Llegada al evento', 'Sesión de fotos', 'Ceremonia', 'Vals de honor', 'Inicio de recepción']
  },
  {
    slug: 'quince-mixta-premium-produccion-completa',
    name: 'Premium – Producción completa de quince',
    lead: 'Experiencia completa que combina fotografía, video y producción avanzada para un resultado cinematográfico.',
    image: 'assets/images/galery/M&D-29.jpg',
    priceLines: ["2'900.000 COP"],
    amountCop: 2900000,
    featured: true,
    features: [
      'Cobertura de 7 a 10 horas',
      'Equipo de 2 a 3 personas',
      'Tomas con dron (cuando sea posible)',
      'Dirección creativa avanzada',
      'Corrección de color cinematográfica',
      'Audio profesional de consola'
    ],
    deliverables: [
      'Hasta 300 fotografías editadas',
      'Video principal de 10 a 20 minutos',
      'Tráiler de 1 a 2 minutos',
      '1 reel vertical para redes',
      'Fotobook de lujo',
      'Set de fotografías impresas',
      'Entrega final por Google Drive'
    ],
    coverage: ['Preparativos y arreglos personales', 'Sesión artística previa', 'Llegada y entrada al evento', 'Ceremonia', 'Vals de honor', 'Sesión de retratos con familia y amigas', 'Fiesta completa', 'Brindis y detalles especiales']
  },
  {
    slug: 'quince-mixta-luxury-experiencia-exclusiva',
    name: 'Luxury – Producción exclusiva de quince',
    lead: 'Nuestra propuesta más completa y lujosa. Fotografía y cinematografía del más alto nivel con múltiples locaciones, vestuarios y un resultado deslumbrante.',
    image: 'assets/images/galery/M&D-30.jpg',
    priceLines: ["4'500.000 COP"],
    amountCop: 4500000,
    featured: true,
    features: [
      'Cobertura completa (sin límite de horas)',
      'Equipo audiovisual completo (múltiples cámaras)',
      'Tomas con dron (cuando sea posible)',
      'Hasta 4 locaciones diferentes y cambios de vestuario',
      'Dirección cinematográfica y estilismo avanzado',
      'Corrección de color cinematográfica y audio profesional'
    ],
    deliverables: [
      'Más de 400 fotografías con edición artística',
      'Video principal cinematográfico',
      'Tráiler y múltiples reels para redes',
      'Fotolibro de lujo premium',
      '2 impresiones en retablo de madera (60x40 cm)',
      'Sesión Pre 15 (foto y video)',
      'Sesión Post 15 (foto y video)',
      'Entrega final en alta resolución por Google Drive'
    ],
    coverage: ['Sesión Pre 15 (múltiples locaciones y vestuarios)', 'Preparativos y arreglos personales', 'Llegada y entrada al evento', 'Ceremonia', 'Vals de honor', 'Sesión de retratos', 'Recepción y fiesta completa', 'Sesión Post 15 (cierre fotográfico)']
  }
];

const quinceAdditionalUpsells: Array<{ label: string; priceLabel: string; priceAmountCop: number }> = [
  {
    label: 'Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento',
    priceLabel: '450.000 COP',
    priceAmountCop: 450000
  },
  {
    label: 'Sesión Post 15||Sesión posterior para fotos más artísticas sin presión',
    priceLabel: '500.000 COP',
    priceAmountCop: 500000
  },
  {
    label: 'Reel para redes||Video corto ideal para redes sociales',
    priceLabel: '140.000 COP',
    priceAmountCop: 140000
  },
  {
    label: 'Video extendido||Versión más completa del evento',
    priceLabel: '220.000 COP',
    priceAmountCop: 220000
  },
  {
    label: 'Trailer cinematográfico||Resumen emocional tipo cine',
    priceLabel: '180.000 COP',
    priceAmountCop: 180000
  },
  {
    label: 'Fotolibro de lujo||Álbum premium con acabados de alta calidad',
    priceLabel: '550.000 COP',
    priceAmountCop: 550000
  },
  {
    label: 'Fotografía en madera (60x40)||Impresión lista para exhibir',
    priceLabel: '120.000 COP',
    priceAmountCop: 120000
  },
  {
    label: 'Hora adicional||Extiende la cobertura del evento',
    priceLabel: '100.000 COP',
    priceAmountCop: 100000
  },
  {
    label: 'Retoque de maquillaje||Ajustes durante sesión o evento',
    priceLabel: '150.000 COP',
    priceAmountCop: 150000
  },
  {
    label: 'Maquillaje profesional||Maquillaje completo de larga duración',
    priceLabel: '300.000 COP',
    priceAmountCop: 300000
  },
  {
    label: 'Peinado profesional||Peinado acorde al estilo del evento',
    priceLabel: '250.000 COP',
    priceAmountCop: 250000
  },
  {
    label: 'Saxofonista||Ambiente moderno con música en vivo',
    priceLabel: '400.000 COP',
    priceAmountCop: 400000
  },
  {
    label: 'Violinista||Toque clásico y elegante',
    priceLabel: '400.000 COP',
    priceAmountCop: 400000
  },
  {
    label: 'Vocalista||Interpretación en vivo para momentos especiales',
    priceLabel: '350.000 COP',
    priceAmountCop: 350000
  },
  {
    label: 'Guitarrista||Ambiente musical cálido',
    priceLabel: '300.000 COP',
    priceAmountCop: 300000
  }
];

export const quinceAdditionalItems: QuinceAdditionalItem[] = [
  { title: 'Fotobook', price: 'desde 250.000' },
  { title: 'Video tráiler', price: 'desde 150.000' },
  { title: 'Reel redes', price: 'desde 150.000' },
  { title: 'Foto en madera', price: 'desde 120.000' }
];

export const quincePackageNotes: string[] = ['Precios ajustables', 'Condiciones Medellín'];

export const preweddingPackagesTitle = 'PAQUETES DE PREBODA';

export const preweddingPlans: PreweddingPlan[] = [
  {
    slug: 'preboda-esencial',
    name: 'Preboda Esencial',
    lead: 'Sesión íntima y natural para capturar la esencia de la pareja antes del gran día.',
    image: 'assets/images/galery/M&D-18.jpg',
    price: '400.000',
    items: [
      '1 fotógrafo',
      '1 locación',
      'Duración de 2 horas',
      '1 vestuario',
      'Dirección de pareja',
      'Sesión en exterior',
      'Hasta 50 fotografías finales, seleccionadas y editadas',
      'Entrega digital en alta resolución',
      'Galería online disponible por 1 mes'
    ],
    features: ['1 fotógrafo', '1 locación', 'Duración de 2 horas', '1 vestuario', 'Dirección de pareja', 'Sesión en exterior'],
    deliverables: ['Hasta 50 fotografías finales, seleccionadas y editadas', 'Galería digital privada por 1 mes', 'Entrega final en alta resolución por Google Drive']
  },
  {
    slug: 'preboda-completa',
    name: 'Preboda Completa',
    lead:
      'Sesión más elaborada que permite explorar diferentes escenarios y lograr una narrativa más completa de la pareja.',
    image: 'assets/images/galery/M&D-32.jpg',
    price: '580.000',
    items: [
      '1 fotógrafo',
      '1 a 2 locaciones cercanas',
      'Duración de 3 horas',
      'Hasta 2 vestuarios',
      'Dirección creativa',
      'Hasta 70 fotografías finales, seleccionadas y editadas',
      '1 cuadro fotográfico de 60 x 40 cm',
      'Entrega digital en alta calidad',
      'Galería online disponible por 3 meses'
    ],
    features: ['1 fotógrafo', '1 a 2 locaciones cercanas', 'Duración de 3 horas', 'Hasta 2 vestuarios', 'Dirección creativa'],
    deliverables: ['Hasta 70 fotografías finales, seleccionadas y editadas', '1 cuadro fotográfico de 60 x 40 cm', 'Galería digital privada por 3 meses', 'Entrega final en alta calidad por Google Drive']
  },
  {
    slug: 'preboda-editorial',
    name: 'Preboda Editorial',
    lead: 'Sesión con planeación visual y dirección creativa avanzada para crear una historia de pareja con mayor intención estética.',
    image: 'assets/images/galery/M&D-32.jpg',
    price: '780.000',
    featured: true,
    items: [
      '1 fotógrafo',
      'Hasta 2 locaciones',
      'Duración de 3 horas',
      'Hasta 3 vestuarios',
      'Planeación visual',
      'Dirección creativa personalizada',
      'Hasta 80 fotografías finales, seleccionadas y editadas',
      'Reel vertical de 30 a 45 segundos',
      '1 cuadro fotográfico de 60 x 40 cm',
      'Entrega digital en alta resolución',
      'Galería online disponible por 6 meses'
    ],
    features: [
      '1 fotógrafo',
      'Hasta 2 locaciones',
      'Duración de 3 horas',
      'Hasta 3 vestuarios',
      'Planeación visual',
      'Dirección creativa personalizada'
    ],
    deliverables: [
      'Hasta 80 fotografías finales, seleccionadas y editadas',
      'Reel vertical de 30 a 45 segundos',
      '1 cuadro fotográfico de 60 x 40 cm',
      'Galería digital privada por 6 meses',
      'Entrega final en alta resolución por Google Drive'
    ]
  },
  {
    slug: 'preboda-premium',
    name: 'Preboda Cinematográfica',
    lead:
      'Producción audiovisual de preboda con fotografía, video y una narrativa planeada para contar la historia antes del gran día.',
    image: 'assets/images/fotos/M&D-31.jpg',
    price: '1.150.000',
    items: [
      '1 fotógrafo y 1 videógrafo',
      'Hasta 2 locaciones',
      'Duración de 4 horas',
      'Hasta 3 vestuarios',
      'Reunión de planeación',
      'Concepto visual y narrativa',
      'Dirección creativa avanzada',
      'Hasta 100 fotografías finales, seleccionadas y editadas',
      'Reel vertical de 45 a 60 segundos',
      'Película preboda de 2 a 3 minutos',
      '1 cuadro fotográfico de 60 x 40 cm',
      'Galería online disponible por 1 año'
    ],
    features: [
      '1 fotógrafo y 1 videógrafo',
      'Hasta 2 locaciones',
      'Duración de 4 horas',
      'Hasta 3 vestuarios',
      'Reunión de planeación',
      'Concepto visual y narrativa',
      'Dirección creativa avanzada'
    ],
    deliverables: [
      'Hasta 100 fotografías finales, seleccionadas y editadas',
      'Reel vertical de 45 a 60 segundos',
      'Película preboda de 2 a 3 minutos',
      '1 cuadro fotográfico de 60 x 40 cm',
      'Galería digital privada por 1 año',
      'Entrega final en alta resolución por Google Drive'
    ]
  }
];

function buildLinkedPackageOption(
  id: string,
  label: string,
  priceLabel: string,
  priceAmountCop: number,
  linkedPackageCategory: PortfolioPackageCategory,
  linkedPackageSlug: string,
): PortfolioRequestOption {
  return {
    id,
    label,
    priceLabel,
    priceAmountCop,
    selectedByDefault: false,
    linkedPackageCategory,
    linkedPackageSlug,
  };
}

function buildWeddingRelatedExperienceGroups(
  prefix: string,
  includeCivil = true,
  includeProposal = true,
  includeMainWedding = false,
  includePostwedding = true,
): PortfolioRequestOptionGroup[] {
  const prebodaOptions = preweddingPlans.map((plan) => {
    const amount = Number((plan.price ?? '').replace(/\D/g, ''));
    return buildLinkedPackageOption(
      `${prefix}-related-${plan.slug}`,
      plan.name,
      `${plan.price} COP`,
      amount,
      'preboda',
      plan.slug,
    );
  });

  const postbodaOptions = includePostwedding
    ? weddingPostweddingPlans.map((plan) =>
        buildLinkedPackageOption(
          `${prefix}-related-${plan.slug}`,
          plan.name,
          plan.priceLines[0] ?? `${plan.amountCop} COP`,
          plan.amountCop,
          'bodas',
          plan.slug,
        ),
      )
    : [];

  const civilOptions = includeCivil
    ? weddingCivilPlans.map((plan) =>
        buildLinkedPackageOption(
          `${prefix}-related-${plan.slug}`,
          plan.name,
          plan.priceLines[0] ?? `${plan.amountCop} COP`,
          plan.amountCop,
          'bodas',
          plan.slug,
        ),
      )
    : [];

  const proposalOptions = includeProposal
    ? weddingProposalPlans.map((plan) =>
        buildLinkedPackageOption(
          `${prefix}-related-${plan.slug}`,
          plan.name,
          plan.priceLines[0] ?? `${plan.amountCop} COP`,
          plan.amountCop,
          'bodas',
          plan.slug,
        ),
      )
    : [];

  const mainWeddingOptions = includeMainWedding
    ? weddingMainPlans.map((plan) => {
        const amount = Number((plan.priceLines[0] ?? '').replace(/\D/g, ''));
        return buildLinkedPackageOption(
          `${prefix}-related-${plan.slug}`,
          plan.name,
          plan.priceLines[0] ?? `${amount} COP`,
          amount,
          'bodas',
          plan.slug,
        );
      })
    : [];

  return [
    {
      title: 'Petición de mano',
      description: 'Documenta el comienzo de la historia antes de la boda.',
      selectable: true,
      options: proposalOptions,
    },
    {
      title: 'Boda civil',
      description: 'Añade una cobertura independiente para la ceremonia civil.',
      selectable: true,
      options: civilOptions,
    },
    {
      title: 'Sesión de preboda',
      description: 'Crea fotografías de pareja antes del día de la boda.',
      selectable: true,
      options: prebodaOptions,
    },
    {
      title: 'Cobertura principal de boda',
      description: 'Continúa con uno de los paquetes protagonistas de foto y video.',
      selectable: true,
      options: mainWeddingOptions,
    },
    {
      title: 'Sesión postboda',
      description: 'Extiende la historia con una sesión después de la celebración.',
      selectable: true,
      options: postbodaOptions,
    },
  ].filter((group) => group.options.length > 0);
}

function buildPreweddingWeddingOptionGroups(prefix: string): PortfolioRequestOptionGroup[] {
  const buildOptions = (plans: Array<{ slug: string; name: string; priceLines: string[] }>) =>
    plans.map((plan) => {
      const amount = Number((plan.priceLines[0] ?? '').replace(/\D/g, ''));
      return buildLinkedPackageOption(
        `${prefix}-related-${plan.slug}`,
        plan.name,
        plan.priceLines[0] ?? `${amount} COP`,
        amount,
        'bodas',
        plan.slug,
      );
    });

  return [
    {
      title: 'Cobertura principal de boda',
      description: 'Continúa con uno de nuestros paquetes protagonistas de foto y video.',
      selectable: true,
      options: buildOptions(weddingMainPlans),
    },
    {
      title: 'Boda civil',
      description: 'Conecta la preboda con una cobertura independiente para la ceremonia civil.',
      selectable: true,
      options: buildOptions(weddingCivilPlans),
    },
    {
      title: 'Petición de mano',
      description: 'Consulta los paquetes disponibles para documentar también la petición.',
      selectable: true,
      options: buildOptions(weddingProposalPlans),
    },
  ];
}

export const portfolioPackageDetails: PortfolioPackageDetail[] = [
  ...weddingMainPlans.map((plan) => ({
    category: 'bodas' as const,
    slug: plan.slug,
    categoryLabel: 'Bodas',
    categoryHref: '/portfolio/bodas',
    title: plan.name,
    packageTypeLabel: 'Foto + video',
    packageGroup: 'photo-video' as const,
    eyebrow: 'Paquete de boda · foto + video',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.priceLines,
    baseQuoteOptions: buildWeddingMainBaseQuoteOptions(plan.slug),
    featured: plan.featured,
    sortOrder: buildWeddingHybridSortOrder(plan.slug),
    accent: 'gold' as const,
    sections: [
      { title: 'Cobertura y servicio incluido', items: plan.features },
      { title: 'Entregables', items: plan.deliverables },
      { title: 'Incluye momentos', items: plan.coverage }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios adicionales',
        description: 'Suma extras para personalizar la entrega final.',
        selectable: true,
        options: buildPricedRequestOptions(
          `${plan.slug}-addon`,
          [
            {
              label: 'Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar',
              priceLabel: '110.000 COP',
              priceAmountCop: 110000
            },
            {
              label: 'Fotobook de lujo||Álbum premium con acabados de alta calidad',
              priceLabel: '350.000 COP',
              priceAmountCop: 350000
            },
            {
              label: 'Reel para redes||Video corto optimizado para redes sociales',
              priceLabel: '140.000 COP',
              priceAmountCop: 140000
            },
            {
              label: 'Video extendido||Versión más completa del evento',
              priceLabel: '220.000 COP',
              priceAmountCop: 220000
            },
            {
              label: 'Trailer cinematográfico||Resumen emocional tipo cine',
              priceLabel: '180.000 COP',
              priceAmountCop: 180000
            },
            {
              label: 'Hora adicional||Extiende la cobertura del evento',
              priceLabel: '100.000 COP',
              priceAmountCop: 100000
            },
            {
              label: 'Retoque de maquillaje||Ajustes durante sesión o evento',
              priceLabel: '150.000 COP',
              priceAmountCop: 150000
            },
            {
              label: 'Maquillaje profesional de novia||Maquillaje de larga duración profesional',
              priceLabel: '350.000 COP',
              priceAmountCop: 350000
            },
            {
              label: 'Peinado profesional||Estilo acorde al evento y maquillaje',
              priceLabel: '250.000 COP',
              priceAmountCop: 250000
            },
            {
              label: 'Pianista en vivo||Música elegante en vivo para tu evento',
              priceLabel: '400.000 COP',
              priceAmountCop: 400000
            },
            {
              label: 'Saxofonista||Ambiente sofisticado con saxofón en vivo',
              priceLabel: '400.000 COP',
              priceAmountCop: 400000
            },
            {
              label: 'Violinista||Toque clásico y emocional para tu boda',
              priceLabel: '400.000 COP',
              priceAmountCop: 400000
            },
            {
              label: 'Guitarrista||Acompañamiento musical cálido',
              priceLabel: '300.000 COP',
              priceAmountCop: 300000
            },
            {
              label: 'Vocalista||Interpretación en vivo para momentos especiales',
              priceLabel: '350.000 COP',
              priceAmountCop: 350000
            }
          ],
          false
        )
      },
      ...buildWeddingRelatedExperienceGroups(plan.slug),
      buildInvitationWebRequestOptionGroup(plan.slug, 'boda')
    ],
    notes: weddingPackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name} de boda.`)
  })),
  ...weddingPhotoOnlyPlans.map((plan) => ({
    category: 'bodas' as const,
    slug: plan.slug,
    categoryLabel: 'Bodas',
    categoryHref: '/portfolio/bodas',
    title: plan.name,
    packageTypeLabel: 'Solo fotografía',
    packageGroup: 'photo-only' as const,
    eyebrow: 'Paquete de boda · solo fotografía',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.priceLines,
    baseQuoteOptions: buildWeddingPhotoBaseQuoteOptions(plan.slug),
    featured: plan.featured,
    sortOrder: plan.slug === 'sencilla-solo-fotos' ? 1 : plan.slug === 'completa-solo-fotos' ? 2 : plan.slug === 'premium-solo-fotos' ? 3 : 4,
    accent: 'gold' as const,
    sections: [
      { title: 'Cobertura y servicio incluido', items: plan.features },
      { title: 'Entregables', items: plan.deliverables },
      { title: 'Incluye momentos', items: plan.coverage }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios adicionales',
        description: 'Complementa el paquete con piezas extra para la entrega.',
        selectable: true,
        options: buildPricedRequestOptions(
          `${plan.slug}-addon`,
          [
            {
              label: 'Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar',
              priceLabel: '110.000 COP',
              priceAmountCop: 110000
            },
            {
              label: 'Fotobook de lujo||Álbum premium con acabados de alta calidad',
              priceLabel: '350.000 COP',
              priceAmountCop: 350000
            },
            {
              label: 'Hora adicional||Extiende la cobertura del evento',
              priceLabel: '100.000 COP',
              priceAmountCop: 100000
            },
            {
              label: 'Retoque de maquillaje||Ajustes durante sesión o evento',
              priceLabel: '150.000 COP',
              priceAmountCop: 150000
            },
            {
              label: 'Maquillaje profesional de novia||Maquillaje de larga duración profesional',
              priceLabel: '350.000 COP',
              priceAmountCop: 350000
            },
            {
              label: 'Peinado profesional||Estilo acorde al evento y maquillaje',
              priceLabel: '250.000 COP',
              priceAmountCop: 250000
            },
            {
              label: 'Pianista en vivo||Música elegante en vivo para tu evento',
              priceLabel: '400.000 COP',
              priceAmountCop: 400000
            },
            {
              label: 'Saxofonista||Ambiente sofisticado con saxofón en vivo',
              priceLabel: '400.000 COP',
              priceAmountCop: 400000
            },
            {
              label: 'Violinista||Toque clásico y emocional para tu boda',
              priceLabel: '400.000 COP',
              priceAmountCop: 400000
            },
            {
              label: 'Guitarrista||Acompañamiento musical cálido',
              priceLabel: '300.000 COP',
              priceAmountCop: 300000
            },
            {
              label: 'Vocalista||Interpretación en vivo para momentos especiales',
              priceLabel: '350.000 COP',
              priceAmountCop: 350000
            }
          ],
          false
        )
      },
      ...buildWeddingRelatedExperienceGroups(plan.slug),
      buildInvitationWebRequestOptionGroup(plan.slug, 'boda')
    ],
    notes: weddingPackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name} de boda.`)
  })),
  ...weddingVideoOnlyPlans.map((plan, index) => ({
    category: 'bodas' as const,
    slug: plan.slug,
    categoryLabel: 'Bodas',
    categoryHref: '/portfolio/bodas',
    title: plan.name,
    packageTypeLabel: 'Video de bodas',
    packageGroup: 'custom' as const,
    eyebrow: 'Paquete de boda · video',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.priceLines,
    baseQuoteOptions: [
      buildBaseQuoteOption(`${plan.slug}-cop`, plan.priceLines[0] ?? 'Cotización personalizada', plan.amountCop)
    ],
    sortOrder: index + 1,
    accent: 'gold' as const,
    sections: [
      { title: 'Incluye', items: plan.features },
      { title: 'Entregables', items: plan.deliverables }
    ],
    requestOptionGroups: [
      ...buildWeddingRelatedExperienceGroups(plan.slug),
      buildInvitationWebRequestOptionGroup(plan.slug, 'boda'),
    ],
    notes: weddingPackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name} (video de bodas).`)
  })),
  ...weddingCivilPlans.map((plan, index) => ({
    category: 'bodas' as const,
    slug: plan.slug,
    categoryLabel: 'Boda civil',
    categoryHref: '/portfolio/bodas',
    title: plan.name,
    packageTypeLabel: 'Boda civil',
    packageGroup: 'custom' as const,
    eyebrow: 'Boda civil',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.priceLines,
    baseQuoteOptions: [buildBaseQuoteOption(`${plan.slug}-cop`, plan.priceLines[0] ?? 'Cotización personalizada', plan.amountCop)],
    featured: plan.featured,
    sortOrder: index + 1,
    accent: 'gold' as const,
    sections: [
      { title: 'Cobertura y servicio incluido', items: plan.features },
      { title: 'Entregables', items: plan.deliverables },
      { title: 'Incluye momentos', items: plan.coverage }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios adicionales',
        description: 'Amplía la cobertura o suma entregables sin cambiar el paquete base.',
        selectable: true,
        options: buildPricedRequestOptions(
          `${plan.slug}-addon`,
          [
            { label: 'Hora adicional||Extiende la cobertura de la ceremonia o celebración', priceLabel: '100.000 COP', priceAmountCop: 100000 },
            { label: 'Grabación continua de la ceremonia||Registro completo de la ceremonia civil con audio', priceLabel: '250.000 COP', priceAmountCop: 250000 },
            { label: 'Reel adicional para redes', priceLabel: '140.000 COP', priceAmountCop: 140000 },
            { label: 'Video extendido||Versión más amplia de la historia audiovisual', priceLabel: '220.000 COP', priceAmountCop: 220000 },
            { label: 'Cuadro fotográfico adicional 60 x 40 cm', priceLabel: '110.000 COP', priceAmountCop: 110000 },
            { label: 'Fotobook de lujo', priceLabel: '350.000 COP', priceAmountCop: 350000 }
          ],
          false
        )
      },
      ...buildWeddingRelatedExperienceGroups(plan.slug, false),
      buildInvitationWebRequestOptionGroup(plan.slug, 'boda')
    ],
    notes: weddingPackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name}.`)
  })),
  ...weddingProposalPlans.map((plan, index) => ({
    category: 'bodas' as const,
    slug: plan.slug,
    categoryLabel: 'Petición de mano',
    categoryHref: '/portfolio/bodas',
    title: plan.name,
    packageTypeLabel: 'Petición de mano',
    packageGroup: 'custom' as const,
    eyebrow: 'Petición de mano',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.priceLines,
    baseQuoteOptions: [buildBaseQuoteOption(`${plan.slug}-cop`, plan.priceLines[0] ?? 'Cotización personalizada', plan.amountCop)],
    featured: plan.featured,
    sortOrder: index + 1,
    accent: 'gold' as const,
    sections: [
      { title: 'Cobertura y servicio incluido', items: plan.features },
      { title: 'Entregables', items: plan.deliverables },
      { title: 'Incluye momentos', items: plan.coverage }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios adicionales',
        description: 'Personaliza el registro audiovisual sin modificar el paquete base.',
        selectable: true,
        options: buildPricedRequestOptions(
          `${plan.slug}-addon`,
          [
            { label: 'Hora adicional||Amplía la preparación, sesión o celebración', priceLabel: '100.000 COP', priceAmountCop: 100000 },
            { label: 'Videógrafo adicional||Suma registro profesional de video al equipo', priceLabel: '350.000 COP', priceAmountCop: 350000 },
            { label: 'Reel adicional para redes', priceLabel: '140.000 COP', priceAmountCop: 140000 },
            { label: 'Video extendido||Versión más amplia de la petición y sus reacciones', priceLabel: '220.000 COP', priceAmountCop: 220000 },
            { label: 'Cuadro fotográfico adicional 60 x 40 cm', priceLabel: '110.000 COP', priceAmountCop: 110000 },
            { label: 'Edición prioritaria', priceLabel: '150.000 COP', priceAmountCop: 150000 }
          ],
          false
        )
      },
      ...buildWeddingRelatedExperienceGroups(plan.slug, true, false, true, false),
      buildInvitationWebRequestOptionGroup(plan.slug, 'boda')
    ],
    notes: weddingPackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name}.`)
  })),
  ...weddingPostweddingPlans.map((plan, index) => ({
    category: 'bodas' as const,
    slug: plan.slug,
    categoryLabel: 'Sesión postboda',
    categoryHref: '/portfolio/bodas',
    title: plan.name,
    packageTypeLabel: 'Sesión postboda',
    packageGroup: 'session' as const,
    eyebrow: 'Postboda · sesión fotográfica',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.priceLines,
    baseQuoteOptions: [buildBaseQuoteOption(`${plan.slug}-cop`, plan.priceLines[0] ?? 'Cotización personalizada', plan.amountCop)],
    sortOrder: index + 1,
    accent: 'gold' as const,
    sections: [
      { title: 'Incluye', items: plan.features },
      { title: 'Entregables', items: plan.deliverables }
    ],
    requestOptionGroups: [buildInvitationWebRequestOptionGroup(plan.slug, 'boda')],
    notes: weddingPackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name} (sesión postboda).`)
  })),
  ...quinceMainPlans.map((plan) => ({
    category: 'quinces' as const,
    slug: plan.slug,
    categoryLabel: 'Fotografía de quince',
    categoryHref: '/portfolio/quinces',
    title: plan.name,
    packageTypeLabel: 'Solo fotografía',
    packageGroup: 'photo-only' as const,
    eyebrow: 'Fotografía de quince',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.priceLines,
    baseQuoteOptions: [buildBaseQuoteOption(`${plan.slug}-cop`, plan.priceLines[0] ?? 'Cotización personalizada', plan.amountCop)],
    featured: plan.featured,
    sortOrder: plan.slug === 'quince-esencial-recuerdos' ? 1 : plan.slug === 'quince-completa-historia' ? 2 : 3,
    accent: 'rose' as const,
    sections: [
      { title: 'Cobertura y servicio incluido', items: plan.features },
      { title: 'Entregables', items: plan.deliverables },
      ...(plan.coverage && plan.coverage.length ? [{ title: 'Incluye momentos', items: plan.coverage }] : [])
    ],
    requestOptionGroups: [
      {
        title: 'Servicios adicionales',
        description: 'Suma extras para personalizar la entrega final.',
        selectable: true,
        options: buildPricedRequestOptions(`${plan.slug}-addon`, quinceAdditionalUpsells, false)
      },
      buildInvitationWebRequestOptionGroup(plan.slug, 'quince')
    ],
    notes: quincePackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name} (fotografía de quince).`)
  })),
  ...quinceHybridPlans.map((plan, index) => ({
    category: 'quinces' as const,
    slug: plan.slug,
    categoryLabel: 'Cobertura mixta',
    categoryHref: '/portfolio/quinces',
    title: plan.name,
    packageTypeLabel: 'Foto + video',
    packageGroup: 'photo-video' as const,
    eyebrow: 'Cobertura mixta',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.priceLines,
    baseQuoteOptions: [buildBaseQuoteOption(`${plan.slug}-cop`, plan.priceLines[0] ?? 'Cotización personalizada', plan.amountCop)],
    featured: plan.featured,
    sortOrder: index + 1,
    accent: 'rose' as const,
    sections: [
      { title: 'Cobertura y servicio incluido', items: plan.features },
      { title: 'Entregables', items: plan.deliverables },
      ...(plan.coverage && plan.coverage.length ? [{ title: 'Incluye momentos', items: plan.coverage }] : [])
    ],
    requestOptionGroups: [
      {
        title: 'Servicios adicionales',
        description: 'Suma extras para personalizar la entrega final.',
        selectable: true,
        options: buildPricedRequestOptions(`${plan.slug}-addon`, quinceAdditionalUpsells, false)
      },
      buildInvitationWebRequestOptionGroup(plan.slug, 'quince')
    ],
    notes: quincePackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name} (cobertura mixta de quince).`)
  })),
  ...quinceVideoPlans.map((plan, index) => ({
    category: 'quinces' as const,
    slug: plan.slug,
    categoryLabel: 'Video de quince',
    categoryHref: '/portfolio/quinces',
    title: plan.name,
    packageTypeLabel: 'Video de quince',
    packageGroup: 'custom' as const,
    eyebrow: 'Video de quince',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.priceLines,
    baseQuoteOptions: [buildBaseQuoteOption(`${plan.slug}-cop`, plan.priceLines[0] ?? 'Cotización personalizada', plan.amountCop)],
    featured: plan.featured,
    sortOrder: index + 1,
    accent: 'rose' as const,
    sections: [
      { title: 'Cobertura y servicio incluido', items: plan.features },
      { title: 'Entregables', items: plan.deliverables },
      ...(plan.coverage && plan.coverage.length ? [{ title: 'Incluye momentos', items: plan.coverage }] : [])
    ],
    requestOptionGroups: [
      {
        title: 'Servicios adicionales',
        description: 'Suma extras para personalizar la entrega final.',
        selectable: true,
        options: buildPricedRequestOptions(`${plan.slug}-addon`, quinceAdditionalUpsells, false)
      },
      buildInvitationWebRequestOptionGroup(plan.slug, 'quince')
    ],
    notes: quincePackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name} (video de quince).`)
  })),

  // Grados estudiantes
  ...(() => {
    const gradAdditionalUpsells = [
      { label: 'Cuadro en madera 70 cm||Impresión en formato grande sobre madera, ideal para decoración', priceLabel: '110.000 COP', priceAmountCop: 110000 },
      { label: 'Fotobook adicional||Álbum fotográfico de lujo con diseño personalizado', priceLabel: '250.000 COP', priceAmountCop: 250000 },
      { label: '12 fotos impresas||Impresiones físicas en alta calidad para recuerdo', priceLabel: '30.000 COP', priceAmountCop: 30000 },
      { label: 'Reel de grado (1 minuto)||Video corto optimizado para redes con momentos destacados', priceLabel: '150.000 COP', priceAmountCop: 150000 },
      { label: 'Video de grado personalizado||Producción audiovisual íntima con enfoque emocional', priceLabel: '350.000 COP', priceAmountCop: 350000 },
      { label: 'Fotos adicionales (paquete de 20)||Selección extra de fotografías editadas', priceLabel: '50.000 COP', priceAmountCop: 50000 },
      { label: 'Edición prioritaria||Entrega más rápida del material final', priceLabel: '80.000 COP', priceAmountCop: 80000 }
    ];
    return groupGraduationPlans.map((plan, index) => ({
      category: 'grados' as const,
      slug: plan.slug,
      categoryLabel: 'Grados',
      categoryHref: '/portfolio/grados',
      title: plan.name,
      packageTypeLabel: 'Fotografía',
      packageGroup: 'photo-only' as const,
      eyebrow: 'Paquete de graduación',
      lead: plan.lead,
      image: plan.image,
      priceLines: [plan.price],
      baseQuoteOptions: [
        buildBaseQuoteOption(`${plan.slug}-base`, `${plan.name} · ${plan.price}`, plan.amountCop)
      ],
      featured: plan.featured,
      accent: 'gold' as const,
      sortOrder: index + 1,
      sections: [
        { title: 'Características', items: plan.features },
        { title: 'Entregables del paquete', items: plan.deliverables }
      ],
      requestOptionGroups: [
        {
          title: 'Adicionales disponibles',
          description: 'Suma extras para personalizar tu recuerdo de grado.',
          selectable: true,
          options: buildPricedRequestOptions(`${plan.slug}-addon`, gradAdditionalUpsells, false)
        }
      ],
      notes: [
        'Cada paquete parte de una base cerrada para que la elección sea más rápida y clara.',
        'Los adicionales se pueden anexar a cualquier plan y se confirman al enviar la solicitud.'
      ],
      whatsappHref: buildPortfolioWhatsappHref(
        `Hola TECNOJACK, quiero información sobre ${plan.name} para grados.`
      )
    }));
  })(),
  ...preweddingPlans.map((plan) => ({
    category: 'preboda' as const,
    slug: plan.slug,
    categoryLabel: 'Preboda',
    categoryHref: '/portfolio/preboda',
    title: plan.name,
    packageTypeLabel: 'Sesión preboda',
    packageGroup: 'session' as const,
    eyebrow: 'Paquete de preboda',
    lead: plan.lead,
    image: plan.image,
    priceLines: plan.price ? [`${plan.price} COP`] : [],
    baseQuoteOptions: [
      buildBaseQuoteOption(
        `${plan.slug}-base`,
        plan.price ? `${plan.price} COP` : 'Cotización personalizada',
        plan.price ? Number(plan.price.replace(/\./g, '').replace(/[^0-9]/g, '')) : undefined
      )
    ],
    featured: plan.featured,
    sortOrder: (() => {
      switch (plan.slug) {
        case 'preboda-esencial':
          return 1;
        case 'preboda-completa':
          return 2;
        case 'preboda-editorial':
          return 3;
        case 'preboda-premium':
          return 4;
        default:
          break;
      }

      return 99;
    })(),
    accent: 'rose' as const,
    sections: [
      { title: 'Cobertura y servicio incluido', items: plan.features },
      { title: 'Entregables', items: plan.deliverables }
    ],
    requestOptionGroups: [
      {
        title: 'Complementos opcionales',
        description: 'Añade entregables o extras para ampliar la sesión.',
        selectable: true,
        options: buildPricedRequestOptions(
          `${plan.slug}-addon`,
          [
            { label: 'Reel adicional para redes', priceLabel: '150.000 COP', priceAmountCop: 150000 },
            { label: 'Cambio extra de vestuario', priceLabel: '80.000 COP', priceAmountCop: 80000 },
            { label: 'Película extendida', priceLabel: '220.000 COP', priceAmountCop: 220000 },
            { label: 'Foto impresa adicional', priceLabel: '60.000 COP', priceAmountCop: 60000 }
          ],
          false
        )
      },
      ...buildPreweddingWeddingOptionGroups(plan.slug),
    ],
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name} de preboda.`)
  }))
  ,
  // --- CORPORATIVOS ---
  {
    category: 'corporativos' as const,
    slug: 'corporativos-video-institucional-esencial',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Esencial – Presentación corporativa',
    packageTypeLabel: 'Video institucional',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · video institucional',
    lead: 'Video institucional claro y profesional para presentar tu empresa.',
    image: 'assets/images/galery/M&D-23.jpg',
    priceLines: ['620000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-video-institucional-esencial-cop', '620000', 620000)],
    sortOrder: 1,
    accent: 'gold' as const,
    sections: [
      {
        title: 'Incluye',
        items: ['Hasta 4 horas de grabación', '1 locación', 'Grabación en 4K', 'Tomas de apoyo (B-roll)']
      },
      {
        title: 'Entregables',
        items: ['Video institucional principal de 1 a 2 minutos', 'Archivo final horizontal', 'Entrega final por Google Drive']
      }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Esencial – Presentación corporativa (video institucional).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-video-institucional-completo',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Completo – Comunicación de marca',
    packageTypeLabel: 'Video institucional',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · video institucional',
    lead: 'Producción audiovisual con mayor profundidad para comunicar tu marca.',
    image: 'assets/images/galery/M&D-29.jpg',
    priceLines: ['1100000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-video-institucional-completo-cop', '1100000', 1100000)],
    sortOrder: 2,
    accent: 'gold' as const,
    sections: [
      {
        title: 'Incluye',
        items: ['Hasta 6 horas de grabación', '1 a 2 locaciones', 'Dirección básica', 'Mayor variedad de tomas']
      },
      {
        title: 'Entregables',
        items: ['Video institucional principal de 2 a 4 minutos', 'Versión corta de 30 a 60 segundos', 'Archivos finales en formato horizontal y vertical', 'Entrega final por Google Drive']
      }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Completo – Comunicación de marca (video institucional).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-video-institucional-premium',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Premium – Producción corporativa',
    packageTypeLabel: 'Video institucional',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · video institucional',
    lead: 'Producción completa con enfoque cinematográfico y alto impacto visual.',
    image: 'assets/images/fotos/default-cover.png',
    priceLines: ['1900000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-video-institucional-premium-cop', '1900000', 1900000)],
    featured: true,
    sortOrder: 3,
    accent: 'gold' as const,
    sections: [
      {
        title: 'Incluye',
        items: ['Hasta 10 horas de grabación', 'Múltiples locaciones', 'Dirección creativa', 'Tomas con drone (si aplica)']
      },
      {
        title: 'Entregables',
        items: ['Video principal de 3 a 5 minutos', '2 a 3 videos cortos', '2 a 3 cortes adaptados para redes sociales', 'Archivos finales en formato horizontal y vertical', 'Entrega final por Google Drive']
      }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Premium – Producción corporativa (video institucional).')
  },

  {
    category: 'corporativos' as const,
    slug: 'corporativos-redes-start',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Base – Contenido esencial',
    packageTypeLabel: 'Contenido para redes',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · contenido para redes',
    lead: 'Producción de contenido simple para comenzar en redes sociales.',
    image: 'assets/images/galery/M&D-22.jpg',
    priceLines: ['420000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-redes-start-cop', '420000', 420000)],
    sortOrder: 1,
    accent: 'gold' as const,
    sections: [
      {
        title: 'Incluye',
        items: ['Sesión de grabación de 3 a 4 horas', 'Producción básica']
      },
      {
        title: 'Entregables',
        items: ['5 piezas de contenido en formato vertical', 'Entrega final por Google Drive']
      }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Base – Contenido esencial (contenido para redes).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-redes-creator',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Constante – Presencia activa',
    packageTypeLabel: 'Contenido para redes',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · contenido para redes',
    lead: 'Contenido constante para mantener presencia activa en redes.',
    image: 'assets/images/galery/M&D-15.jpg',
    priceLines: ['790000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-redes-creator-cop', '790000', 790000)],
    sortOrder: 2,
    accent: 'gold' as const,
    sections: [
      {
        title: 'Incluye',
        items: ['Jornada de hasta 6 horas', 'Planeación básica de contenido']
      },
      {
        title: 'Entregables',
        items: ['10 piezas de contenido listas para publicar', 'Entrega final por Google Drive']
      }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Constante – Presencia activa (contenido para redes).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-redes-pro-content',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Estratégico – Producción audiovisual',
    packageTypeLabel: 'Contenido para redes',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · contenido para redes',
    lead: 'Producción avanzada con enfoque estratégico para redes.',
    image: 'assets/images/galery/M&D-18.jpg',
    priceLines: ['1450000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-redes-pro-content-cop', '1450000', 1450000)],
    featured: true,
    sortOrder: 3,
    accent: 'gold' as const,
    sections: [
      {
        title: 'Incluye',
        items: ['Producción estructurada', 'Dirección creativa']
      },
      {
        title: 'Entregables',
        items: ['15 a 20 piezas de contenido', 'Piezas para formatos educativo, promocional y branding', 'Entrega final por Google Drive']
      }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Estratégico – Producción audiovisual (contenido para redes).')
  },

  {
    category: 'corporativos' as const,
    slug: 'corporativos-eventos-esencial',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Esencial – Cobertura básica',
    packageTypeLabel: 'Eventos corporativos',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · eventos',
    lead: 'Cobertura básica para eventos empresariales.',
    image: 'assets/images/galery/M&D-19.jpg',
    priceLines: ['520000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-eventos-esencial-cop', '520000', 520000)],
    sortOrder: 1,
    accent: 'gold' as const,
    sections: [
      { title: 'Cobertura del evento', items: ['Hasta 4 horas de cobertura'] },
      { title: 'Entregables', items: ['60 a 80 fotografías editadas', 'Galería digital privada', 'Entrega final por Google Drive'] }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Esencial – Cobertura básica (eventos corporativos).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-eventos-completo',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Completo – Cobertura profesional',
    packageTypeLabel: 'Eventos corporativos',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · eventos',
    lead: 'Cobertura completa con fotografía y video.',
    image: 'assets/images/galery/M&D-32.jpg',
    priceLines: ['950000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-eventos-completo-cop', '950000', 950000)],
    sortOrder: 2,
    accent: 'gold' as const,
    sections: [
      { title: 'Cobertura del evento', items: ['Hasta 6 horas de cobertura', 'Mayor cobertura de momentos'] },
      { title: 'Entregables', items: ['100 a 150 fotografías editadas', 'Video resumen de 1 a 2 minutos', 'Galería digital privada', 'Entrega final por Google Drive'] }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Completo – Cobertura profesional (eventos corporativos).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-eventos-premium',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Premium – Cobertura integral',
    packageTypeLabel: 'Eventos corporativos',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · eventos',
    lead: 'Cobertura completa con equipo ampliado y contenido para redes.',
    image: 'assets/images/galery/M&D-18.jpg',
    priceLines: ['1750000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-eventos-premium-cop', '1750000', 1750000)],
    featured: true,
    sortOrder: 3,
    accent: 'gold' as const,
    sections: [
      { title: 'Cobertura del evento', items: ['Jornada completa', 'Equipo ampliado'] },
      { title: 'Entregables', items: ['150 a 250 fotografías editadas', 'Video resumen de 2 a 4 minutos', 'Reel para redes', 'Galería digital privada', 'Entrega final por Google Drive'] }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Premium – Cobertura integral (eventos corporativos).')
  },

  {
    category: 'corporativos' as const,
    slug: 'corporativos-marca-personal-esencial',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Esencial – Presencia profesional',
    packageTypeLabel: 'Marca personal',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · marca personal',
    lead: 'Sesión básica para mejorar tu imagen profesional.',
    image: 'assets/images/galery/M&D-22.jpg',
    priceLines: ['350000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-marca-personal-esencial-cop', '350000', 350000)],
    sortOrder: 1,
    accent: 'gold' as const,
    sections: [
      { title: 'Incluye', items: ['Sesión fotográfica'] },
      { title: 'Entregables', items: ['20 fotografías editadas', 'Entrega final por Google Drive'] }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Esencial – Presencia profesional (marca personal).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-marca-personal-completo',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Completo – Imagen y contenido',
    packageTypeLabel: 'Marca personal',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · marca personal',
    lead: 'Combinación de fotografía y video para redes.',
    image: 'assets/images/galery/M&D-29.jpg',
    priceLines: ['690000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-marca-personal-completo-cop', '690000', 690000)],
    sortOrder: 2,
    accent: 'gold' as const,
    sections: [
      { title: 'Incluye', items: ['Sesión foto + video'] },
      { title: 'Entregables', items: ['40 fotografías editadas', '3 reels', 'Entrega final por Google Drive'] }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Completo – Imagen y contenido (marca personal).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-marca-personal-premium',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Premium – Marca personal completa',
    packageTypeLabel: 'Marca personal',
    packageGroup: 'custom' as const,
    eyebrow: 'Corporativos · marca personal',
    lead: 'Producción completa con dirección de imagen.',
    image: 'assets/images/fotos/M&D-31.jpg',
    priceLines: ['1250000'],
    baseQuoteOptions: [buildBaseQuoteOption('corporativos-marca-personal-premium-cop', '1250000', 1250000)],
    featured: true,
    sortOrder: 3,
    accent: 'gold' as const,
    sections: [
      { title: 'Incluye', items: ['Producción completa', 'Dirección creativa'] },
      { title: 'Entregables', items: ['60 fotografías editadas', '6 a 10 videos cortos', 'Entrega final por Google Drive'] }
    ],
    requestOptionGroups: [],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Premium – Marca personal completa (marca personal).')
  }
].map(normalizePortfolioPackageDetail);

const portfolioPackageSlugAliases: Partial<Record<PortfolioPackageCategory, Record<string, string>>> = {
  preboda: {
    'plan-sencilla': 'preboda-esencial',
    'plan-completa': 'preboda-completa',
    'plan-especial': 'preboda-editorial',
    'plan-premium': 'preboda-premium',
  },
};

export function getPortfolioPackageDetail(
  category: string | null | undefined,
  slug: string | null | undefined
): PortfolioPackageDetail | undefined {
  if (!category || !slug) {
    return undefined;
  }

  const canonicalSlug = portfolioPackageSlugAliases[category as PortfolioPackageCategory]?.[slug] ?? slug;
  return portfolioPackageDetails.find((item) => item.category === category && item.slug === canonicalSlug);
}

export function getPortfolioPackageDetailsByCategory(
  category: string | null | undefined
): PortfolioPackageDetail[] {
  if (!category) {
    return [];
  }

  return portfolioPackageDetails.filter((item) => item.category === category);
}

export const portfolioGalleryItems: PortfolioGalleryItem[] = [
  {
    src: 'assets/images/fotos/default-cover.png',
    alt: 'Retrato editorial de pareja en exterior',
    title: 'Luz natural y dirección sutil',
    category: 'Preboda',
    variant: 'tall'
  },
  {
    src: 'assets/images/galery/M&D-29.jpg',
    alt: 'Pareja abrazándose durante la sesión de boda',
    title: 'Emoción real',
    category: 'Bodas'
  },
  {
    src: 'assets/images/galery/M&D-22.jpg',
    alt: 'Detalle elegante de una celebración especial',
    title: 'Detalles con intención',
    category: '15 años'
  },
  {
    src: 'assets/images/galery/M&D-15.jpg',
    alt: 'Ceremonia capturada con estilo cinematográfico',
    title: 'Ceremonias con atmósfera',
    category: 'Grados',
    variant: 'wide'
  },
  {
    src: 'assets/images/fotos/M&D-31.jpg',
    alt: 'Retrato creativo de novios en recepción',
    title: 'Mirada de autor',
    category: 'Bodas'
  },
  {
    src: 'assets/images/fotos/M&D-12.jpg',
    alt: 'Momento espontáneo durante una boda',
    title: 'Movimiento y textura',
    category: '15 años'
  },
  {
    src: 'assets/images/galery/M&D-18.jpg',
    alt: 'Sesión íntima de pareja antes del evento',
    title: 'Narrativa de pareja',
    category: 'Preboda'
  },
  {
    src: 'assets/images/galery/M&D-19.jpg',
    alt: 'Retrato elegante durante celebración de grado',
    title: 'Retratos de ceremonia',
    category: 'Grados'
  },
  {
    src: 'assets/images/galery/M&D-23.jpg',
    alt: 'Composición visual para una celebración juvenil',
    title: 'Celebraciones memorables',
    category: '15 años'
  },
  {
    src: 'assets/images/galery/M&D-32.jpg',
    alt: 'Escena romántica en sesión previa a boda',
    title: 'Escenas previas al gran día',
    category: 'Preboda',
    variant: 'wide'
  }
];

export const portfolioVideoItems: PortfolioVideoItem[] = [
  {
    title: 'Wedding Films',
    description: 'Historias de boda editadas con ritmo, emoción y acabado cinematográfico.',
    duration: '4 - 6 min',
    youtubeId: 'ysz5S6PUM-U',
    format: 'Wedding film'
  },
  {
    title: 'Event Recaps',
    description: 'Coberturas ágiles para eventos, shows y piezas pensadas para difusión rápida.',
    duration: '1 - 2 min',
    youtubeId: 'ScMzIvxBSi4',
    format: 'Event recap'
  },
  {
    title: 'Social Edits',
    description: 'Ediciones verticales y cortas para captar atención en redes sociales.',
    duration: '30 - 45 s',
    youtubeId: 'M7lc1UVf-VE',
    format: 'Social teaser'
  }
];

function buildPlaylistThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export const portfolioVideoCategories: PortfolioVideoCategory[] = [
  {
    key: 'musicales',
    title: 'Videos Musicales',
    playlistId: 'PL2iifydD-8SFwziBNF7e4GNDQFuTMGu9Y',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL2iifydD-8SFwziBNF7e4GNDQFuTMGu9Y',
    summary: 'Videos para artistas que quieren una imagen con identidad, presencia y una propuesta visual que conecte con su público.',
    videos: [
      { title: 'Dúo Zimrah - Bendice, Alma Mía', videoId: 'ouRucGtTW0w', thumbnail: buildPlaylistThumbnail('ouRucGtTW0w') },
      { title: 'En otro tiempo más - Cuarteto Sabbath', videoId: 'jeV3nSxa5rc', thumbnail: buildPlaylistThumbnail('jeV3nSxa5rc') },
      { title: 'En Alegría Está Mi Vida (2026)', videoId: 'Ms-FalRkz1Y', thumbnail: buildPlaylistThumbnail('Ms-FalRkz1Y') },
      { title: 'Lo que Dios Ve - Cuarteto Sabbath', videoId: 'N6QG7DmaQow', thumbnail: buildPlaylistThumbnail('N6QG7DmaQow') },
      { title: 'Blanca Navidad - Cuarteto Sabbath', videoId: '7Ps9Y-yTni0', thumbnail: buildPlaylistThumbnail('7Ps9Y-yTni0') },
      { title: 'Tal Como Soy - Cuarteto Sabbath', videoId: 'SgplGkQiqrg', thumbnail: buildPlaylistThumbnail('SgplGkQiqrg') },
      { title: 'Luz del Establo - Ministerio 4Praise', videoId: 'euhwy0MtUD4', thumbnail: buildPlaylistThumbnail('euhwy0MtUD4') },
      { title: 'Nuevo Corazón - Ministerio 4Praise', videoId: 'w7fGPLbESb0', thumbnail: buildPlaylistThumbnail('w7fGPLbESb0') },
      { title: 'La Gloria Sea Para Ti', videoId: 'Iijfs41SF30', thumbnail: buildPlaylistThumbnail('Iijfs41SF30') },
      { title: 'Grupo Angeluz - Cerca del cielo', videoId: 'goIalfivMGI', thumbnail: buildPlaylistThumbnail('goIalfivMGI') },
      { title: 'Mi Corazón Sería Belén', videoId: 'Y20DR_JJdDQ', thumbnail: buildPlaylistThumbnail('Y20DR_JJdDQ') },
      { title: 'The Shadow of Your Wings', videoId: 'UPXnGCCI6zA', thumbnail: buildPlaylistThumbnail('UPXnGCCI6zA') },
      { title: 'Grupo Angeluz - Siempre Más', videoId: 'FYRcS-7v15k', thumbnail: buildPlaylistThumbnail('FYRcS-7v15k') },
      { title: 'Grupo Angeluz - Solo Para Ti', videoId: 'OdvoQjaHgvE', thumbnail: buildPlaylistThumbnail('OdvoQjaHgvE') },
      { title: 'Confiando en Ti', videoId: '60wFz_b3LcQ', thumbnail: buildPlaylistThumbnail('60wFz_b3LcQ') },
      { title: 'En Jesús Hay Salvación', videoId: 'p0ZfVAoqo8Q', thumbnail: buildPlaylistThumbnail('p0ZfVAoqo8Q') },
      { title: 'Mi Salvador (en vivo)', videoId: 'zFAX2EyMLGI', thumbnail: buildPlaylistThumbnail('zFAX2EyMLGI') },
      { title: 'Tengo Paz', videoId: 'urhLjmN8Xzk', thumbnail: buildPlaylistThumbnail('urhLjmN8Xzk') },
      { title: 'Digno es el Cordero', videoId: 'gYhEcO5oetk', thumbnail: buildPlaylistThumbnail('gYhEcO5oetk') },
      { title: 'Me ha tocado', videoId: 'ao4cnjTH2A4', thumbnail: buildPlaylistThumbnail('ao4cnjTH2A4') },
      { title: 'Soy Perdonado', videoId: '-0xAbizyrkY', thumbnail: buildPlaylistThumbnail('-0xAbizyrkY') },
      { title: 'Jesús lo Hará por Ti', videoId: 'Xii1TMxirck', thumbnail: buildPlaylistThumbnail('Xii1TMxirck') },
      { title: 'La Redención', videoId: 'BmYDrhyJBzM', thumbnail: buildPlaylistThumbnail('BmYDrhyJBzM') },
      { title: 'Mi Dios por la Eternidad', videoId: 'TIR1CPWhqoo', thumbnail: buildPlaylistThumbnail('TIR1CPWhqoo') },
      { title: 'Yo Seguiré', videoId: 'J232L8aV0yU', thumbnail: buildPlaylistThumbnail('J232L8aV0yU') },
      { title: 'Engrandecido Sea Dios', videoId: '0aOoAcy9Hxg', thumbnail: buildPlaylistThumbnail('0aOoAcy9Hxg') }
    ]
  },
  {
    key: 'bodas',
    title: 'Bodas',
    playlistId: 'PL2iifydD-8SH9HdbF6w8CNx2BqswfJ2kw',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL2iifydD-8SH9HdbF6w8CNx2BqswfJ2kw',
    summary: 'Historias de boda para volver a sentir cada instante con emoción, detalle y una estética elegante que perdura en el tiempo.',
    videos: [
      { title: 'Matt & Jack - Official Wedding Trailer', videoId: '0lZY0ZZmsqI', thumbnail: buildPlaylistThumbnail('0lZY0ZZmsqI') },
      { title: 'Boda Andrés & Karen', videoId: 'T9KQSglNLyE', thumbnail: buildPlaylistThumbnail('T9KQSglNLyE') },
      { title: 'Ruben y Slendy', videoId: 'pKcNvEs_DRY', thumbnail: buildPlaylistThumbnail('pKcNvEs_DRY') },
      { title: 'Edwin & Ana Wedding', videoId: 'bQAQNKGV01k', thumbnail: buildPlaylistThumbnail('bQAQNKGV01k') },
      { title: 'Ariel & Maira', videoId: 'Gl67jP1NGLY', thumbnail: buildPlaylistThumbnail('Gl67jP1NGLY') },
      { title: 'Wedding Camila & Fede', videoId: 'kxsoWMOQWCc', thumbnail: buildPlaylistThumbnail('kxsoWMOQWCc') },
      { title: 'Wedding Santiago & María', videoId: 'MOK2RgvRa50', thumbnail: buildPlaylistThumbnail('MOK2RgvRa50') },
      { title: 'Santiago & Eliana', videoId: 'Wb7fk2vji20', thumbnail: buildPlaylistThumbnail('Wb7fk2vji20') },
      { title: 'Sí se pudo!', videoId: 'KDUp_Z9DSug', thumbnail: buildPlaylistThumbnail('KDUp_Z9DSug') },
      { title: 'Ana Raquel & Jesús Alberto', videoId: 'rsfN6hJYigU', thumbnail: buildPlaylistThumbnail('rsfN6hJYigU') },
      { title: 'Johan & Laura', videoId: 'gt6iaYAc_D4', thumbnail: buildPlaylistThumbnail('gt6iaYAc_D4') },
      { title: 'Duvan & Milena', videoId: 'KnIlL9wml5A', thumbnail: buildPlaylistThumbnail('KnIlL9wml5A') },
      { title: 'Rotimi, I Do', videoId: 'jM3L3GpnN3c', thumbnail: buildPlaylistThumbnail('jM3L3GpnN3c') },
      { title: 'Boda Neider & Lina', videoId: 'AMPPCYYZAZw', thumbnail: buildPlaylistThumbnail('AMPPCYYZAZw') },
      { title: 'Wedding video with bridal makeup', videoId: 'dNWoPG32LaQ', thumbnail: buildPlaylistThumbnail('dNWoPG32LaQ') }
    ]
  },
  {
    key: 'otros',
    title: 'Otros',
    playlistId: 'PL2iifydD-8SFEggZvgpkG9ut8FSQJYoKX',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL2iifydD-8SFEggZvgpkG9ut8FSQJYoKX',
    summary: 'Prebodas, reels y proyectos especiales para quienes quieren mostrar su historia de una forma auténtica, cercana y memorable.',
    videos: [
      { title: 'Paseo de despedida a Kevin', videoId: 'CBQTrHRrB5g', thumbnail: buildPlaylistThumbnail('CBQTrHRrB5g') },
      { title: 'A beautiful pre-wedding', videoId: 'U05Do6legg4', thumbnail: buildPlaylistThumbnail('U05Do6legg4') },
      { title: 'Summervibes en Guatapé', videoId: 'ytsADdrUTMc', thumbnail: buildPlaylistThumbnail('ytsADdrUTMc') },
      { title: 'Señores, llegó el día', videoId: 'reTSUA_TQwA', thumbnail: buildPlaylistThumbnail('reTSUA_TQwA') },
      { title: 'Sí se pudo!', videoId: 'KDUp_Z9DSug', thumbnail: buildPlaylistThumbnail('KDUp_Z9DSug') },
      { title: 'Preboda usando Canon R10', videoId: 'EX7fjf2GIWE', thumbnail: buildPlaylistThumbnail('EX7fjf2GIWE') },
      { title: 'Mi camera ya está en modo graduation', videoId: 'XSjChVKI9zY', thumbnail: buildPlaylistThumbnail('XSjChVKI9zY') },
      { title: 'You ready? let\'s go!', videoId: '5JV-XCKpGW8', thumbnail: buildPlaylistThumbnail('5JV-XCKpGW8') },
      { title: 'Color grading with Canon', videoId: 'xzsFXzgAB0w', thumbnail: buildPlaylistThumbnail('xzsFXzgAB0w') },
      { title: 'Beautiful Things - Benson Boone', videoId: '-T4g6qH50Cg', thumbnail: buildPlaylistThumbnail('-T4g6qH50Cg') },
      { title: 'Yamê - Bécane remix', videoId: 'EYpn9-dIs5I', thumbnail: buildPlaylistThumbnail('EYpn9-dIs5I') },
      { title: 'Un hermoso lugar para compartir', videoId: '17gQ4gmWXEQ', thumbnail: buildPlaylistThumbnail('17gQ4gmWXEQ') },
      { title: 'Conociendo el cerro', videoId: 'S1SCKdftn_Q', thumbnail: buildPlaylistThumbnail('S1SCKdftn_Q') },
      { title: 'Simplemente mágico', videoId: 'BOvE0at_7wQ', thumbnail: buildPlaylistThumbnail('BOvE0at_7wQ') },
      { title: 'Celebrating important achievements', videoId: 'lsQ0wEXvvyo', thumbnail: buildPlaylistThumbnail('lsQ0wEXvvyo') },
      { title: 'Edición fotográfica en Lightroom', videoId: 'Xbt5dUQp3ZU', thumbnail: buildPlaylistThumbnail('Xbt5dUQp3ZU') },
      { title: 'A happy and funny wedding', videoId: 'dG9BYe8r5e4', thumbnail: buildPlaylistThumbnail('dG9BYe8r5e4') },
      { title: 'I\'m a photographer', videoId: 'E_DXon34sqM', thumbnail: buildPlaylistThumbnail('E_DXon34sqM') },
      { title: 'Simply Art', videoId: 'FRkOlRzVONk', thumbnail: buildPlaylistThumbnail('FRkOlRzVONk') },
      { title: 'The art of being a Pro!', videoId: 'o9SD3cHlQcs', thumbnail: buildPlaylistThumbnail('o9SD3cHlQcs') },
      { title: 'Photography canon Medellín art', videoId: 'a0bBXbyPFHc', thumbnail: buildPlaylistThumbnail('a0bBXbyPFHc') },
      { title: 'Sesión de fotos con Canon T3I + M200', videoId: '2W3rrsXW9yQ', thumbnail: buildPlaylistThumbnail('2W3rrsXW9yQ') },
      { title: 'Sesión de fotos en exteriores', videoId: 'rVpyqe9J1Cc', thumbnail: buildPlaylistThumbnail('rVpyqe9J1Cc') }
    ]
  }
];

export const portfolioContactLinks: PortfolioContactLink[] = [
  {
    platform: 'whatsapp',
    title: 'WhatsApp',
    description: 'Consulta disponibilidad, inversión y tiempos de entrega.',
    href: socialLinks.whatsapp
  },
  {
    platform: 'instagram',
    title: 'Instagram',
    description: 'Explora trabajos recientes, reels y contenido detrás de cámaras.',
    href: socialLinks.instagram
  },
  {
    platform: 'facebook',
    title: 'Facebook',
    description: 'Revisa publicaciones, álbumes y novedades del estudio.',
    href: socialLinks.facebook
  },
  {
    platform: 'tiktok',
    title: 'TikTok',
    description: 'Mira clips cortos, tendencias y piezas rápidas del portafolio.',
    href: socialLinks.tiktok
  }
];

export const portfolioServicePageConfigs: Record<PortfolioPackageCategory, PortfolioServicePageConfig> = {
  bodas: {
    category: 'bodas',
    label: 'Bodas',
    shellSubtitle: 'Bodas',
    hero: {
      eyebrow: 'Servicio premium',
      title: 'Bodas con dirección cinematográfica',
      description: 'Historias reales contadas con estética, emoción y precisión visual.',
      backgroundImage: 'assets/images/fotos/M&D-31.jpg',
      highlights: ['Foto + video', 'Color cinematográfico', 'Dirección artística'],
      whatsappMessage: 'Hola TECNOJACK, quiero información sobre cobertura de boda.'
    },
    packageEyebrow: 'Presentación de paquetes',
    packageTitle: 'Paquetes de boda, de Esencial a Exclusivo',
    packageLead:
      'Elige tu paquete, compara cobertura y entregables, y cuando tengas tu favorito envíanos la fecha y la ciudad para armar la propuesta y reservar tu cupo.',
    storiesTitle: 'Historias reales',
    storiesLead: 'Eventos que ya hemos transformado en piezas visuales.',
    stories: [
      {
        clientName: 'María & Daniel',
        location: 'Medellín, Antioquia',
        title: 'María & Daniel',
        subtitle: 'Ceremonia, retratos y recepción',
        images: [
          { src: 'assets/images/galery/M&D-29.jpg', alt: 'Pareja abrazándose durante la boda' },
          { src: 'assets/images/fotos/M&D-31.jpg', alt: 'Retrato editorial de novios durante la recepción' },
          { src: 'assets/images/fotos/default-cover.png', alt: 'Retrato de pareja en exterior' }
        ]
      },
      {
        clientName: 'Valentina & Samuel',
        location: 'Envigado, Antioquia',
        title: 'Preparativos con intención',
        subtitle: 'Cobertura completa del día',
        images: [
          { src: 'assets/images/fotos/M&D-10.jpg', alt: 'Preparativos de boda con luz natural' },
          { src: 'assets/images/fotos/M&D-11.jpg', alt: 'Momento emocional en preparativos' },
          { src: 'assets/images/fotos/M&D-26.jpg', alt: 'Detalle elegante de boda' }
        ]
      },
      {
        clientName: 'Laura & Esteban',
        location: 'Rionegro, Antioquia',
        title: 'Recepción editorial',
        subtitle: 'Detalles, pareja y atmósfera',
        images: [
          { src: 'assets/images/galery/M&D-22.jpg', alt: 'Detalle elegante de recepción de boda' },
          { src: 'assets/images/fotos/M&D-16.jpg', alt: 'Retrato de pareja durante la celebración' },
          { src: 'assets/images/galery/M&D-30.jpg', alt: 'Ambiente de recepción con estética cinematográfica' }
        ]
      }
    ]
  },
  quinces: {
    category: 'quinces',
    label: 'Quinces',
    shellSubtitle: 'Quinces',
    hero: {
      eyebrow: 'Servicio premium',
      title: 'Quinceañeros con una puesta en escena memorable',
      description: 'Retratos, cobertura y clips diseñados para una celebración con presencia visual.',
      backgroundImage: 'assets/images/galery/M&D-23.jpg',
      highlights: ['Retratos de gala', 'Cobertura del evento', 'Contenido social'],
      whatsappMessage: 'Hola TECNOJACK, quiero información sobre cobertura de quinceañeros.'
    },
    packageEyebrow: 'Presentación de paquetes',
    packageTitle: 'Paquetes de quince, listos para lucir',
    packageLead:
      'Selecciona el paquete, revisa qué incluye en retratos, evento y piezas para redes, y comparte fecha y ciudad para confirmar disponibilidad y enviarte la propuesta.',
    storiesTitle: 'Historias reales',
    storiesLead: 'Eventos que ya hemos transformado en piezas visuales.',
    stories: [
      {
        clientName: 'Sofía Hernández',
        location: 'Medellín, Antioquia',
        title: 'Celebración de gala',
        subtitle: 'Retratos y sesión previa',
        images: [
          { src: 'assets/images/galery/M&D-23.jpg', alt: 'Retrato principal de quinceañera' },
          { src: 'assets/images/galery/M&D-22.jpg', alt: 'Detalle elegante de vestido y celebración' },
          { src: 'assets/images/fotos/M&D-12.jpg', alt: 'Momento espontáneo de celebración juvenil' }
        ]
      },
      {
        clientName: 'Mariana López',
        location: 'Bello, Antioquia',
        title: 'Entrada y ceremonia',
        subtitle: 'Cobertura del evento',
        images: [
          { src: 'assets/images/fotos/M&D-16.jpg', alt: 'Entrada de evento con iluminación cuidada' },
          { src: 'assets/images/fotos/M&D-10.jpg', alt: 'Retrato en ceremonia de quinceaños' },
          { src: 'assets/images/fotos/M&D-11.jpg', alt: 'Momento emocional durante la celebración' }
        ]
      },
      {
        clientName: 'Isabella Restrepo',
        location: 'Itagüí, Antioquia',
        title: 'Fiesta y detalle',
        subtitle: 'Contenido listo para redes',
        images: [
          { src: 'assets/images/fotos/M&D-26.jpg', alt: 'Detalle de fiesta y decoración' },
          { src: 'assets/images/galery/M&D-29.jpg', alt: 'Baile y celebración con ritmo visual' },
          { src: 'assets/images/galery/M&D-23.jpg', alt: 'Retrato final de quinceañera' }
        ]
      }
    ]
  },
  grados: {
    category: 'grados',
    label: 'Grados',
    shellSubtitle: 'Grados',
    hero: {
      eyebrow: 'Servicio premium',
      title: 'Grados con imagen limpia y valor de recuerdo',
      description: 'Ceremonias y promociones cubiertas con orden, claridad y dirección visual.',
      backgroundImage: 'assets/images/galery/M&D-15.jpg',
      highlights: ['Retratos individuales', 'Fotos familiares', 'Entrega ágil'],
      whatsappMessage: 'Hola TECNOJACK, quiero información sobre cobertura de grados.'
    },
    packageEyebrow: 'Presentación de paquetes',
    packageTitle: 'Paqueticos de grados (claros y rápidos)',
    packageLead:
      'Escoge tu opción base, define si quieres sumar video como adicional, y envíanos fecha y ciudad para cotizar según tu plan y asegurar disponibilidad.',
    storiesTitle: 'Historias reales',
    storiesLead: 'Eventos que ya hemos transformado en piezas visuales.',
    stories: [
      {
        clientName: 'Prom 2025 San José',
        location: 'Medellín, Antioquia',
        title: 'Promoción memorable',
        subtitle: 'Llamado, retratos y familia',
        images: [
          { src: 'assets/images/galery/M&D-15.jpg', alt: 'Retrato principal de graduación' },
          { src: 'assets/images/galery/M&D-19.jpg', alt: 'Retrato editorial en ceremonia de grado' },
          { src: 'assets/images/galery/M&D-21.jpg', alt: 'Retrato con directivos docentes' }
        ]
      },
      {
        clientName: 'Prom 2025 Santa María',
        location: 'Sabaneta, Antioquia',
        title: 'Ceremonia completa',
        subtitle: 'Cobertura limpia y clara',
        images: [
          { src: 'assets/images/galery/M&D-14.jpg', alt: 'Foto grupal de curso' },
          { src: 'assets/images/galery/M&D-5.jpg', alt: 'Llamado individual durante la ceremonia' },
          { src: 'assets/images/galery/M&D-3.jpg', alt: 'Imposición de bata en la graduación' }
        ]
      },
      {
        clientName: 'Prom 2025 Nuevo Horizonte',
        location: 'La Estrella, Antioquia',
        title: 'Recuerdos compartidos',
        subtitle: 'Grupo, amigos y detalles',
        images: [
          { src: 'assets/images/fotos/M&D-10.jpg', alt: 'Foto familiar en graduación' },
          { src: 'assets/images/galery/M&D-18.jpg', alt: 'Foto con amigos al finalizar el evento' },
          { src: 'assets/images/galery/M&D-22.jpg', alt: 'Detalle de ceremonia de graduación' }
        ]
      }
    ]
  },
  preboda: {
    category: 'preboda',
    label: 'Preboda',
    shellSubtitle: 'Preboda',
    hero: {
      eyebrow: 'Servicio premium',
      title: 'Preboda con narrativa íntima y editorial',
      description: 'Sesiones previas diseñadas para contar la historia con estética y emoción.',
      backgroundImage: 'assets/images/galery/M&D-32.jpg',
      highlights: ['Dirección creativa', 'Sesión exterior', 'Contenido emocional'],
      whatsappMessage: 'Hola TECNOJACK, quiero información sobre una sesión preboda.'
    },
    packageEyebrow: 'Presentación de paquetes',
    packageTitle: 'Sesiones preboda con intención editorial',
    packageLead:
      'Elige tu nivel, revisa entregables y estilo de la sesión, y cuando estés listo envíanos fecha, ciudad y tu idea para confirmar agenda y preparar la propuesta.',
    storiesTitle: 'Historias reales',
    storiesLead: 'Eventos que ya hemos transformado en piezas visuales.',
    stories: [
      {
        clientName: 'María & Daniel',
        location: 'Guatapé, Antioquia',
        title: 'Sesión exterior',
        subtitle: 'Narrativa íntima de pareja',
        images: [
          { src: 'assets/images/fotos/default-cover.png', alt: 'Sesión preboda en exterior con luz natural' },
          { src: 'assets/images/galery/M&D-32.jpg', alt: 'Escena romántica en sesión preboda' },
          { src: 'assets/images/galery/M&D-18.jpg', alt: 'Retrato íntimo de pareja antes de la boda' }
        ]
      },
      {
        clientName: 'Juliana & Mateo',
        location: 'Santa Elena, Antioquia',
        title: 'Luz natural y dirección',
        subtitle: 'Frames para invitaciones y redes',
        images: [
          { src: 'assets/images/galery/M&D-29.jpg', alt: 'Retrato de pareja con dirección sutil' },
          { src: 'assets/images/fotos/M&D-31.jpg', alt: 'Frame editorial de pareja' },
          { src: 'assets/images/fotos/M&D-26.jpg', alt: 'Detalle visual de sesión en exterior' }
        ]
      },
      {
        clientName: 'Catalina & Andrés',
        location: 'El Retiro, Antioquia',
        title: 'Escenas previas al gran día',
        subtitle: 'Contenido emocional y editorial',
        images: [
          { src: 'assets/images/galery/M&D-18.jpg', alt: 'Pareja caminando en sesión preboda' },
          { src: 'assets/images/galery/M&D-32.jpg', alt: 'Escena íntima previa a la boda' },
          { src: 'assets/images/galery/M&D-19.jpg', alt: 'Retrato elegante de pareja' }
        ]
      }
    ]
  },
  corporativos: {
    category: 'corporativos',
    label: 'Corporativos',
    shellSubtitle: 'Corporativos',
    hero: {
      eyebrow: 'Servicio premium',
      title: 'Producción corporativa con intención comercial',
      description: 'Contenido visual para marcas, equipos y eventos con estética limpia y narrativa clara.',
      backgroundImage: 'assets/images/galery/M&D-23.jpg',
      highlights: ['Foto + video', 'Contenido para redes', 'Cobertura institucional'],
      whatsappMessage: 'Hola TECNOJACK, quiero información sobre producción corporativa.'
    },
    packageEyebrow: 'Presentación de paquetes',
    packageTitle: 'Producción corporativa por tipo de entrega',
    packageLead:
      'Selecciona el tipo de producción, revisa entregables y alcance, y compártenos objetivo, fecha y ciudad para cotizar con claridad y planear la ejecución.',
    storiesTitle: 'Casos / muestras',
    storiesLead: 'Una selección de estilo visual para contenidos institucionales y comerciales.',
    stories: []
  }
};

export function getPortfolioServicePageConfig(
  category: PortfolioPackageCategory | null | undefined
): PortfolioServicePageConfig | undefined {
  if (!category) {
    return undefined;
  }

  return portfolioServicePageConfigs[category];
}

export const portfolioProcess: string[] = [
  'Cuéntanos el tipo de evento, fecha y ciudad para revisar disponibilidad real.',
  'Te enviamos una propuesta clara con paquetes, extras y entregables recomendados.',
  'Definimos cobertura y estilo visual para llegar al evento con el plan listo.'
];

export const portfolioEventOptions: string[] = [
  'Boda',
  '15 años',
  'Grado',
  'Evento especial',
  'Otro'
];
