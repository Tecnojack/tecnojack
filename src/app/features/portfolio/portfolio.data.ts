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
  'Hola TECNOJACK, quiero información para cotizar contigo un proyecto audiovisual ¿Me puedes direccionar en la elección de paquetes según mi proyecto?';

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

function buildWeddingMainBaseQuoteOptions(slug: string): PortfolioBaseQuoteOption[] {
  switch (slug) {
    case 'esencial-hibrido-foto-video':
      return [buildBaseQuoteOption(`${slug}-cop`, "1'650.000 COP", 1650000)];
    case 'completo-hibrido-foto-video':
      return [buildBaseQuoteOption(`${slug}-cop`, "2'200.000 COP", 2200000)];
    case 'premium-cinematico-foto-video':
      return [buildBaseQuoteOption(`${slug}-cop`, "3'200.000 COP", 3200000)];
    case 'luxury-cinematico-foto-video':
      return [buildBaseQuoteOption(`${slug}-cop`, "4'800.000 COP", 4800000)];
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
      return [buildBaseQuoteOption(`${slug}-cop`, '750.000 COP', 750000)];
    case 'completa-solo-fotos':
      return [buildBaseQuoteOption(`${slug}-cop`, "1'350.000 COP", 1350000)];
    case 'premium-solo-fotos':
      return [buildBaseQuoteOption(`${slug}-cop`, "2'400.000 COP", 2400000)];
    default:
      return [];
  }
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
    points: ['Foto + video', 'Color cinematográfico', 'Entrega social y full quality']
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
    name: 'Film & Photo Experience',
    price: 'Desde COP 450.000',
    summary: 'Ideal para clientes que buscan una propuesta audiovisual más aspiracional y comercial.',
    featured: true,
    features: [
      'Cobertura foto + video',
      'Reel vertical para redes',
      'Edición premium',
      'Entrega web o privada',
      'Apoyo para narrativa visual',
      'Opciones de upsell integradas'
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
    name: 'Recuerdo Signature',
    priceCop: '120.000 COP',
    summary: 'Una versión más completa para quien quiere variedad, retratos y una entrega con más detalle.',
    featured: true,
    features: ['Todas las fotos digitales', '25 fotografías editadas en JPG', 'Mini selección prioritaria para compartir']
  },
  {
    name: 'Recuerdo Full Day',
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
    description: 'Pieza corta de alto impacto para compartir rápido.'
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
      'Momentos espontáneos del evento'
    ],
    deliverables: [
      '50 fotografías digitales en alta calidad',
      'Selección de las mejores tomas del evento',
      'Edición básica (color, iluminación y encuadre)',
      'Entrega digital en formato listo para compartir'
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
      'Toma con familiares y acompañantes'
    ],
    deliverables: [
      '50 fotografías digitales en alta calidad',
      'Edición mejorada en imágenes seleccionadas',
      'Cuadro fotográfico en madera de 70 cm',
      'Fotografía optimizada para impresión',
      'Entrega digital completa'
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
      'Toma con familiares y acompañantes'
    ],
    deliverables: [
      '50 fotografías digitales en alta calidad',
      'Fotobook de 5 páginas',
      'Diseño básico del álbum',
      'Edición mejorada para impresión',
      'Entrega digital completa'
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
      'Toma con familiares y acompañantes'
    ],
    deliverables: [
      '50 fotografías digitales en alta calidad',
      'Fotobook de 5 páginas',
      'Cuadro fotográfico en madera de 70 cm',
      'Edición optimizada para impresión',
      'Entrega digital completa'
    ],
    featured: true
  }
];

export const weddingPackagesTitle = 'Paquetes principales de boda';

export const weddingMainPlans: WeddingPackagePlan[] = [
  {
    slug: 'esencial-hibrido-foto-video',
    name: 'Esencial – Tu historia en foto y video',
    priceLines: ["1'650.000 COP"],
    lead:
      'Cobertura equilibrada que combina fotografía y video para capturar los momentos más importantes de tu boda.',
    image: 'assets/images/galery/M&D-16.jpg',
    featured: true,
    items: [
      'Cobertura parcial del evento',
      '1 fotógrafo',
      '1 videógrafo',
      'Duración de 4 a 6 horas',
      'Dirección básica',
      'Hasta 150 fotos editadas',
      'Video principal de 3 a 5 minutos',
      'Galería online por 3 meses',
      'Entrega digital en alta resolución'
    ],
    coverage: ['Ceremonia', 'Momentos clave', 'Recepción (parcial)']
  },
  {
    slug: 'completo-hibrido-foto-video',
    name: 'Completa – La historia completa de tu boda',
    priceLines: ["2'200.000 COP"],
    lead:
      'Cobertura completa que documenta tu boda con fotografía y video, capturando emociones y momentos clave.',
    image: 'assets/images/galery/M&D-29.jpg',
    items: [
      'Cobertura amplia del evento',
      '1 fotógrafo y 1 videógrafo',
      'Duración de 6 a 8 horas',
      'Dirección durante el evento',
      'Hasta 300 fotos editadas',
      '10 fotos impresas',
      '1 ampliación',
      'Video principal de 5 a 8 minutos',
      'Video extendido de 15 a 25 minutos',
      'Galería online por 6 meses',
      'Entrega digital en alta calidad'
    ],
    coverage: ['Preparativos', 'Ceremonia', 'Sesión de fotos', 'Recepción']
  },
  {
    slug: 'premium-cinematico-foto-video',
    name: 'Premium – Experiencia cinematográfica completa',
    priceLines: ["3'200.000 COP"],
    lead:
      'Experiencia completa que combina fotografía profesional y producción audiovisual con estilo cinematográfico.',
    image: 'assets/images/fotos/M&D-31.jpg',
    items: [
      'Cobertura completa del evento',
      '1 fotógrafo y 1 videógrafo',
      'Asistente',
      'Dirección creativa',
      'Tomas con gimbal',
      'Tomas con drone si aplica',
      'Hasta 450 fotos editadas',
      'Fotos impresas',
      '1 ampliación',
      'Álbum fotográfico',
      'Trailer de 1 minuto',
      'Video principal de 6 a 10 minutos',
      'Video extendido de 20 a 30 minutos',
      'Galería online por 1 año',
      'Reel para redes'
    ],
    coverage: ['Preparativos', 'Ceremonia', 'Sesión de fotos', 'Recepción', 'Fiesta']
  },
  {
    slug: 'luxury-cinematico-foto-video',
    name: 'Luxury – Producción cinematográfica integral',
    priceLines: ["4'800.000 COP"],
    lead:
      'Producción audiovisual de alto nivel donde fotografía y video trabajan juntos para crear una experiencia cinematográfica completa.',
    image: 'assets/images/galery/M&D-32.jpg',
    items: [
      'Cobertura total del evento',
      '2 fotógrafos y 2 videógrafos',
      'Asistente de producción',
      'Dirección audiovisual completa',
      'Tomas con gimbal y drone',
      'Iluminación adicional',
      '500+ fotos editadas',
      'Álbum fotográfico',
      'Fotos impresas y ampliaciones',
      'Trailer cinematográfico',
      'Video principal de 8 a 10 minutos',
      'Video documental de 30 a 60 minutos',
      'Clips para redes',
      'Sesión de preboda incluida',
      'Galería online extendida'
    ],
    coverage: ['Preparativos', 'Ceremonia', 'Sesión de fotos', 'Recepción', 'Fiesta']
  }
];

export const weddingPhotoOnlySectionTitle = 'Paquetes solo fotos';

export const weddingPhotoOnlyPlans: WeddingPhotoOnlyPlan[] = [
  {
    slug: 'sencilla-solo-fotos',
    name: 'Esencial – Recuerdo esencial de tu boda',
    priceLines: ['750.000 COP'],
    lead:
      'Cobertura fotográfica ideal para capturar los momentos más importantes de tu boda de forma natural y emotiva.',
    image: 'assets/images/galery/M&D-22.jpg',
    items: [
      'Cobertura parcial del evento (ceremonia y momentos clave)',
      '1 fotógrafo',
      'Duración de 3 a 4 horas',
      'Dirección básica de poses',
      'Edición con estilo limpio y natural',
      'Hasta 120 fotografías editadas',
      '10 fotos impresas (15x21 cm)',
      'Entrega digital en alta resolución',
      'Galería online disponible por 3 meses'
    ],
    coverage: ['Ceremonia', 'Momentos clave']
  },
  {
    slug: 'completa-solo-fotos',
    name: 'Completa – La historia completa de tu día',
    priceLines: ["1'350.000 COP"],
    lead:
      'Cobertura más amplia que documenta tu boda con mayor detalle, acompañamiento y enfoque emocional.',
    image: 'assets/images/galery/M&D-29.jpg',
    items: [
      'Cobertura amplia del evento',
      '1 fotógrafo principal',
      '1 asistente de fotografía',
      'Duración de 5 a 7 horas',
      'Dirección y acompañamiento durante el evento',
      'Edición profesional con estilo natural',
      'Hasta 250 fotografías editadas',
      '20 fotos impresas (15x21 cm)',
      '1 fotografía ampliada (50 cm)',
      'Entrega digital en alta resolución',
      'Galería online disponible por 6 meses'
    ],
    coverage: ['Ceremonia', 'Sesión de fotos', 'Recepción', 'Momentos clave']
  },
  {
    slug: 'premium-solo-fotos',
    name: 'Premium – Experiencia fotográfica completa',
    priceLines: ["2'400.000 COP"],
    lead:
      'Experiencia completa que combina cobertura total, dirección creativa y resultados con estilo editorial.',
    image: 'assets/images/fotos/M&D-31.jpg',
    featured: true,
    items: [
      'Cobertura completa del evento (preparativos hasta la fiesta)',
      '1 o 2 fotógrafos',
      '1 asistente',
      'Dirección creativa (estilo editorial)',
      'Sesión previa incluida (preboda)',
      'Edición profesional avanzada',
      'Hasta 450 fotografías editadas',
      '20 fotos impresas (15x21 cm)',
      '1 fotografía ampliada (50 cm)',
      'Álbum fotográfico (book)',
      'Entrega digital en alta resolución',
      'Galería online disponible por 1 año'
    ],
    coverage: ['Preparativos', 'Ceremonia', 'Sesión de fotos', 'Recepción', 'Fiesta']
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

export const weddingVideoOnlyPlans: WeddingVideoOnlyPlan[] = [
  {
    slug: 'video-bodas-elemental',
    name: 'Esencial – Recuerdo esencial de tu boda',
    priceLines: ['650.000 COP'],
    amountCop: 650000,
    lead: 'Cobertura sencilla y emotiva para conservar los momentos más importantes de tu boda.',
    image: 'assets/images/galery/M&D-16.jpg',
    features: ['Cobertura parcial del evento', '1 cámara', 'Grabación en Full HD', 'Audio ambiente', 'Tomas espontáneas'],
    deliverables: ['Video principal de 3 a 5 minutos', 'Entrega digital en alta calidad', 'Tiempo de entrega: 5 a 7 días']
  },
  {
    slug: 'video-bodas-completo',
    name: 'Completo – La historia de tu día',
    priceLines: ["1'250.000 COP"],
    amountCop: 1250000,
    lead: 'Narrativa completa de tu boda capturando emociones y momentos clave.',
    image: 'assets/images/galery/M&D-29.jpg',
    features: [
      'Cobertura de ceremonia y recepción parcial',
      '2 cámaras',
      'Captura de audio de votos y discursos',
      'Tomas creativas',
      'Edición narrativa'
    ],
    deliverables: [
      'Video principal de 5 a 8 minutos',
      'Video extendido de 15 a 25 minutos',
      'Entrega digital en alta calidad',
      'Tiempo de entrega: 7 a 10 días'
    ]
  },
  {
    slug: 'video-bodas-premium',
    name: 'Premium – Experiencia cinematográfica',
    priceLines: ["2'600.000 COP"],
    amountCop: 2600000,
    lead: 'Producción audiovisual con enfoque cinematográfico para contar tu historia con emoción y detalle.',
    image: 'assets/images/galery/M&D-30.jpg',
    features: [
      'Cobertura completa del evento',
      '2 a 3 cámaras',
      'Tomas estabilizadas (gimbal)',
      'Audio profesional',
      'Colorización cinematográfica',
      'Tomas aéreas con drone (si aplica)'
    ],
    deliverables: [
      'Trailer de 1 minuto',
      'Video principal de 6 a 10 minutos',
      'Video extendido de 20 a 30 minutos',
      'Versión optimizada para redes',
      'Entrega digital en alta calidad',
      'Tiempo de entrega: 10 a 15 días'
    ]
  },
  {
    slug: 'video-bodas-luxury',
    name: 'Luxury – Producción cinematográfica de alto nivel',
    priceLines: ["4'200.000 COP"],
    amountCop: 4200000,
    lead: 'Experiencia premium que transforma tu boda en una película con narrativa cinematográfica.',
    image: 'assets/images/galery/M&D-32.jpg',
    features: [
      'Cobertura completa desde preparativos hasta la fiesta',
      '3 cámaras o más',
      'Dirección audiovisual',
      'Tomas avanzadas con gimbal y drone',
      'Audio profesional con micrófonos dedicados',
      'Iluminación adicional si es necesario',
      'Edición cinematográfica avanzada',
      'Storytelling estructurado'
    ],
    deliverables: [
      'Trailer cinematográfico de 1 minuto',
      'Video principal de 8 a 10 minutos',
      'Video documental de 30 a 60 minutos o más',
      'Clips optimizados para redes sociales',
      'Entrega en alta calidad',
      'Prioridad en edición',
      'Tiempo de entrega: 7 a 10 días'
    ]
  }
];

export const weddingPostweddingPlans: WeddingPostweddingPlan[] = [
  {
    slug: 'postboda-esencial',
    name: 'Esencial – Recuerdo natural después del gran día',
    priceLines: ['350.000 COP'],
    amountCop: 350000,
    lead: 'Sesión sencilla y emotiva para capturar momentos naturales como recién casados sin el estrés del evento.',
    image: 'assets/images/galery/M&D-15.jpg',
    features: ['1 locación cercana', 'Duración de 2 horas', 'Dirección básica de poses', 'Sesión en exterior'],
    deliverables: ['50 fotografías editadas', 'Entrega digital en alta resolución', 'Galería online disponible por 1 mes']
  },
  {
    slug: 'postboda-completa',
    name: 'Completa – Una historia después del sí',
    priceLines: ['650.000 COP'],
    amountCop: 650000,
    lead: 'Sesión más elaborada que permite explorar diferentes escenarios y lograr fotografías más cuidadas y expresivas.',
    image: 'assets/images/galery/M&D-21.jpg',
    features: ['1 a 2 locaciones', 'Duración de 3 horas', 'Dirección creativa', 'Posibilidad de cambio de outfit'],
    deliverables: ['80 fotografías editadas', 'Galería online disponible por 3 meses', 'Entrega digital en alta calidad']
  },
  {
    slug: 'postboda-premium',
    name: 'Premium – Experiencia artística postboda',
    priceLines: ["1'200.000 COP"],
    amountCop: 1200000,
    lead: 'Sesión diseñada para crear imágenes impactantes con estética editorial en locaciones especiales.',
    image: 'assets/images/galery/M&D-22.jpg',
    features: [
      '2 o más locaciones',
      'Duración de 5 horas',
      'Dirección creativa avanzada',
      'Planeación previa de concepto visual',
      'Posible desplazamiento'
    ],
    deliverables: ['120 fotografías editadas', 'Galería online disponible por 6 meses', 'Entrega digital en alta resolución', '5 fotografías impresas']
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
    features: ['Cobertura del evento de 3 a 4 horas', 'Dirección básica de poses', 'Fotografía documental del evento'],
    deliverables: ['80 a 120 fotografías editadas', '1 fotografía impresa de 50 cm', 'Entrega digital en alta resolución']
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
    features: ['Cobertura del evento de 5 a 6 horas', 'Dirección de poses', 'Mayor enfoque en momentos clave'],
    deliverables: ['120 a 180 fotografías editadas', '1 fotografía impresa de 50 cm', 'Galería digital', 'Entrega en alta resolución']
  },
  {
    slug: 'quince-premium-experiencia-fotografica',
    name: 'Premium – Experiencia fotográfica completa',
    lead: 'Una experiencia completa para capturar tus quince con un estilo artístico y mayor nivel de producción.',
    image: 'assets/images/galery/M&D-23.jpg',
    priceLines: ["1'400.000 COP"],
    amountCop: 1400000,
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
      'Entrega digital en alta resolución'
    ]
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
    features: ['Cobertura de 3 a 4 horas', 'Grabación en alta calidad', 'Enfoque en momentos clave'],
    deliverables: ['Video de 3 a 5 minutos en 4K', 'Entrega digital']
  },
  {
    slug: 'quince-video-completa',
    name: 'Completa – Historia en video',
    lead: 'Cobertura más completa que permite contar tu historia con mayor profundidad y calidad visual.',
    image: 'assets/images/galery/M&D-19.jpg',
    priceLines: ["1'200.000 COP"],
    amountCop: 1200000,
    features: ['Cobertura de 5 a 6 horas', 'Grabación profesional con mejor narrativa', 'Tomas dinámicas'],
    deliverables: ['Video de 5 a 10 minutos en 4K', 'Trailer corto', 'Entrega digital']
  },
  {
    slug: 'quince-video-premium-cinematica',
    name: 'Premium – Experiencia cinematográfica',
    lead: 'Producción audiovisual de alto nivel con enfoque cinematográfico para tus quince años.',
    image: 'assets/images/galery/M&D-23.jpg',
    priceLines: ["2'000.000 COP"],
    amountCop: 2000000,
    features: [
      'Cobertura de 7 a 10 horas',
      'Tomas con drone',
      'Equipo de grabación profesional',
      'Dirección creativa avanzada'
    ],
    deliverables: ['Video principal de 10 a 20 minutos en 4K', 'Trailer de 2 a 3 minutos', 'Reel para redes', 'Entrega digital']
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
    features: ['Cobertura de 4 a 5 horas', 'Fotógrafo + videógrafo'],
    deliverables: ['100 a 140 fotografías editadas', 'Video de 3 a 5 minutos', 'Entrega digital']
  },
  {
    slug: 'quince-mixta-completa-experiencia',
    name: 'Completa – Experiencia combinada',
    lead: 'Cobertura equilibrada que permite capturar tanto fotografía como video con mayor detalle.',
    image: 'assets/images/galery/M&D-19.jpg',
    priceLines: ["1'800.000 COP"],
    amountCop: 1800000,
    features: ['Cobertura de 5 a 7 horas', 'Fotógrafo y videógrafo dedicados'],
    deliverables: ['140 a 200 fotografías editadas', 'Video de 5 a 10 minutos', 'Trailer corto', 'Fotobook básico', 'Entrega digital']
  },
  {
    slug: 'quince-mixta-premium-produccion-completa',
    name: 'Premium – Producción completa de quince',
    lead: 'Experiencia completa que combina fotografía, video y producción avanzada para un resultado cinematográfico.',
    image: 'assets/images/galery/M&D-29.jpg',
    priceLines: ["2'900.000 COP"],
    amountCop: 2900000,
    features: ['Cobertura de 7 a 10 horas', 'Equipo de 2 a 3 personas', 'Tomas con drone', 'Dirección creativa avanzada'],
    deliverables: [
      'Hasta 300 fotografías editadas',
      'Video de 10 a 20 minutos',
      'Trailer + Reel',
      'Fotobook de lujo',
      'Fotografías impresas',
      'Entrega digital'
    ]
  }
];

const quinceAdditionalUpsells: Array<{ label: string; priceLabel: string; priceAmountCop: number }> = [
  {
    label: 'Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento',
    priceLabel: '350.000 COP',
    priceAmountCop: 350000
  },
  {
    label: 'Sesión Post 15||Sesión posterior para fotos más artísticas sin presión',
    priceLabel: '350.000 COP',
    priceAmountCop: 350000
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
    label: 'Fotobook de lujo||Álbum premium con acabados de alta calidad',
    priceLabel: '350.000 COP',
    priceAmountCop: 350000
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

export const preweddingPackagesTitle = 'PAQUETES DE PREBODA 2025';

export const preweddingPlans: PreweddingPlan[] = [
  {
    slug: 'preboda-esencial',
    name: 'Esencial – Nuestro comienzo',
    lead: 'Sesión íntima y natural para capturar la esencia de la pareja antes del gran día.',
    image: 'assets/images/galery/M&D-18.jpg',
    price: '300.000',
    items: [
      '1 locación cercana',
      'Duración de 2 horas',
      'Dirección básica de poses',
      'Sesión en exterior',
      '20 fotografías editadas',
      'Entrega digital en alta resolución',
      'Galería online disponible por 1 mes'
    ]
  },
  {
    slug: 'preboda-completa',
    name: 'Completa – La historia antes del sí',
    lead:
      'Sesión más elaborada que permite explorar diferentes escenarios y lograr una narrativa más completa de la pareja.',
    image: 'assets/images/galery/M&D-32.jpg',
    price: '550.000',
    items: [
      '1 a 2 locaciones',
      'Duración de 3 horas',
      'Dirección creativa',
      'Posibilidad de cambio de outfit',
      '40 fotografías editadas',
      'Entrega digital en alta calidad',
      'Galería online disponible por 3 meses'
    ]
  },
  {
    slug: 'preboda-premium',
    name: 'Premium – Experiencia preboda cinematográfica',
    lead: 'Experiencia completa que combina fotografía y video para crear contenido emocional antes de la boda.',
    image: 'assets/images/fotos/M&D-31.jpg',
    price: '850.000',
    featured: true,
    items: [
      '2 o más locaciones',
      'Duración de 4 a 5 horas',
      'Dirección creativa avanzada',
      'Planeación previa de concepto visual',
      'Posible desplazamiento',
      '60 fotografías editadas',
      'Video tipo reel Save the Date',
      'Entrega digital en alta resolución',
      'Galería online disponible por 6 meses'
    ]
  },
  {
    slug: 'plan-sencilla',
    name: 'Plan Sencilla',
    lead:
      'Una sesión breve y delicada para parejas que quieren un recuerdo previo al matrimonio con dirección sutil y luz limpia.',
    image: 'assets/images/galery/M&D-18.jpg',
    price: '280.000',
    items: ['30 fotos editadas', '1 vestuario', '1 - 2 horas']
  },
  {
    slug: 'plan-completa',
    name: 'Plan Completa',
    lead:
      'Más tiempo, más variedad visual y una entrega pensada para parejas que quieren una sesión más amplia sin ir al extremo premium.',
    image: 'assets/images/galery/M&D-32.jpg',
    price: '400.000',
    items: ['50 fotos editadas', '2 vestuarios', '2 - 3 horas', '1 foto impresa 60CM']
  },
  {
    slug: 'plan-especial',
    name: 'Plan Especial',
    lead:
      'Una propuesta pensada para parejas que quieren una sesión más completa, mayor variedad de vestuario y una salida social más fuerte.',
    image: 'assets/images/fotos/default-cover.png',
    price: '470.000',
    items: ['70 fotos editadas', '3 vestuarios', '3 horas', '1 foto impresa', 'Reel']
  },
  {
    slug: 'plan-premium',
    name: 'Plan Premium',
    lead:
      'La sesión preboda más potente: dirección audiovisual, look romántico premium y una película corta para contar la historia con más intención.',
    image: 'assets/images/fotos/M&D-31.jpg',
    price: '700.000',
    featured: true,
    items: ['70 fotos', '3+ vestuarios', '4 horas', 'Foto impresa', 'Reel', 'Película de hasta 3 minutos']
  }
];

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
      { title: 'Incluye', items: plan.items },
      { title: 'Incluye momentos', items: plan.coverage }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions(`${plan.slug}-service`, [...plan.items, ...plan.coverage])
      },
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
      }
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
    sortOrder: plan.slug === 'sencilla-solo-fotos' ? 1 : plan.slug === 'completa-solo-fotos' ? 2 : 3,
    accent: 'gold' as const,
    sections: [
      { title: 'Incluye', items: plan.items },
      { title: 'Incluye momentos', items: plan.coverage }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions(`${plan.slug}-service`, [...plan.items, ...plan.coverage])
      },
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
      }
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
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions(`${plan.slug}-service`, [...plan.features, ...plan.deliverables])
      }
    ],
    notes: weddingPackageNotes,
    whatsappHref: buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${plan.name} (video de bodas).`)
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
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions(`${plan.slug}-service`, [...plan.features, ...plan.deliverables])
      }
    ],
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
      { title: 'Incluye', items: plan.features },
      { title: 'Entregables', items: plan.deliverables }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Activa o desactiva lo que quieres conservar en tu solicitud.',
        selectable: false,
        options: buildRequestOptions(`${plan.slug}-service`, [...plan.features, ...plan.deliverables])
      },
      {
        title: 'Servicios adicionales',
        description: 'Suma extras para personalizar la entrega final.',
        selectable: true,
        options: buildPricedRequestOptions(`${plan.slug}-addon`, quinceAdditionalUpsells, false)
      }
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
      { title: 'Incluye', items: plan.features },
      { title: 'Entregables', items: plan.deliverables }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions(`${plan.slug}-service`, [...plan.features, ...plan.deliverables])
      },
      {
        title: 'Servicios adicionales',
        description: 'Suma extras para personalizar la entrega final.',
        selectable: true,
        options: buildPricedRequestOptions(`${plan.slug}-addon`, quinceAdditionalUpsells, false)
      }
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
      { title: 'Incluye', items: plan.features },
      { title: 'Entregables', items: plan.deliverables }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions(`${plan.slug}-service`, [...plan.features, ...plan.deliverables])
      },
      {
        title: 'Servicios adicionales',
        description: 'Suma extras para personalizar la entrega final.',
        selectable: true,
        options: buildPricedRequestOptions(`${plan.slug}-addon`, quinceAdditionalUpsells, false)
      }
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
          title: 'Servicios incluidos',
          description: 'Características y cobertura incluidas en este paquete de grado.',
          selectable: false,
          options: buildRequestOptions(`${plan.slug}-service`, plan.features)
        },
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
    priceLines: plan.price ? [plan.price] : [],
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
        case 'preboda-premium':
          return 3;
        default:
          break;
      }

      // Planes legacy (Plan Sencilla/Completa/Especial/Premium): se dejan al final
      // para mantener el orden principal Esencial → Completa → Premium.
      if (plan.slug === 'plan-sencilla') {
        return 10;
      }
      if (plan.slug === 'plan-completa') {
        return 11;
      }
      if (plan.slug === 'plan-premium') {
        return 12;
      }
      if (plan.slug === 'plan-especial') {
        return 13;
      }

      return 99;
    })(),
    accent: 'rose' as const,
    sections: [{ title: 'Incluye', items: plan.items }],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Personaliza el paquete quitando o dejando solo lo que necesitas.',
        selectable: false,
        options: buildRequestOptions(`${plan.slug}-service`, plan.items)
      },
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
      }
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
        items: ['Video institucional de 1 a 2 minutos', 'Formato horizontal', 'Entrega digital']
      }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-video-institucional-esencial-service', [
          'Hasta 4 horas de grabación',
          '1 locación',
          'Grabación en 4K',
          'Tomas de apoyo (B-roll)',
          'Video institucional de 1 a 2 minutos',
          'Formato horizontal',
          'Entrega digital'
        ])
      }
    ],
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
        items: ['Video institucional de 2 a 4 minutos', 'Versión corta de 30 a 60 segundos', 'Formatos horizontal y vertical']
      }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-video-institucional-completo-service', [
          'Hasta 6 horas de grabación',
          '1 a 2 locaciones',
          'Dirección básica',
          'Mayor variedad de tomas',
          'Video institucional de 2 a 4 minutos',
          'Versión corta de 30 a 60 segundos',
          'Formatos horizontal y vertical'
        ])
      }
    ],
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
        items: ['Video principal de 3 a 5 minutos', '2 a 3 videos cortos', 'Adaptaciones para redes sociales', 'Formatos horizontal y vertical']
      }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-video-institucional-premium-service', [
          'Hasta 10 horas de grabación',
          'Múltiples locaciones',
          'Dirección creativa',
          'Tomas con drone (si aplica)',
          'Video principal de 3 a 5 minutos',
          '2 a 3 videos cortos',
          'Adaptaciones para redes sociales',
          'Formatos horizontal y vertical'
        ])
      }
    ],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Premium – Producción corporativa (video institucional).')
  },

  {
    category: 'corporativos' as const,
    slug: 'corporativos-redes-start',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Start – Contenido básico',
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
        items: ['5 piezas de contenido', 'Formato vertical para redes']
      }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-redes-start-service', [
          'Sesión de grabación de 3 a 4 horas',
          'Producción básica',
          '5 piezas de contenido',
          'Formato vertical para redes'
        ])
      }
    ],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Start – Contenido básico (contenido para redes).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-redes-creator',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Creator – Presencia constante',
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
        items: ['10 piezas de contenido', 'Optimización para redes sociales']
      }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-redes-creator-service', [
          'Jornada de hasta 6 horas',
          'Planeación básica de contenido',
          '10 piezas de contenido',
          'Optimización para redes sociales'
        ])
      }
    ],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Creator – Presencia constante (contenido para redes).')
  },
  {
    category: 'corporativos' as const,
    slug: 'corporativos-redes-pro-content',
    categoryLabel: 'Corporativos',
    categoryHref: '/portfolio/corporativos',
    title: 'Pro Content – Estrategia audiovisual',
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
        items: ['15 a 20 piezas de contenido', 'Formatos variados (educativo, promocional, branding)']
      }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-redes-pro-content-service', [
          'Producción estructurada',
          'Dirección creativa',
          '15 a 20 piezas de contenido',
          'Formatos variados (educativo, promocional, branding)'
        ])
      }
    ],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Pro Content – Estrategia audiovisual (contenido para redes).')
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
      { title: 'Entregables', items: ['60 a 80 fotografías editadas', 'Entrega digital'] }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-eventos-esencial-service', [
          'Hasta 4 horas de cobertura',
          '60 a 80 fotografías editadas',
          'Entrega digital'
        ])
      }
    ],
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
      { title: 'Entregables', items: ['100 a 150 fotografías editadas', 'Video resumen de 1 a 2 minutos'] }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-eventos-completo-service', [
          'Hasta 6 horas de cobertura',
          'Mayor cobertura de momentos',
          '100 a 150 fotografías editadas',
          'Video resumen de 1 a 2 minutos'
        ])
      }
    ],
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
      { title: 'Entregables', items: ['150 a 250 fotografías editadas', 'Video resumen de 2 a 4 minutos', 'Reel para redes'] }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-eventos-premium-service', [
          'Jornada completa',
          'Equipo ampliado',
          '150 a 250 fotografías editadas',
          'Video resumen de 2 a 4 minutos',
          'Reel para redes'
        ])
      }
    ],
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
      { title: 'Entregables', items: ['20 fotografías editadas'] }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-marca-personal-esencial-service', ['Sesión fotográfica', '20 fotografías editadas'])
      }
    ],
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
      { title: 'Entregables', items: ['40 fotografías editadas', '3 reels'] }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-marca-personal-completo-service', ['Sesión foto + video', '40 fotografías editadas', '3 reels'])
      }
    ],
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
      { title: 'Entregables', items: ['60 fotografías editadas', '6 a 10 videos cortos'] }
    ],
    requestOptionGroups: [
      {
        title: 'Servicios incluidos',
        description: 'Esta modalidad conserva el contenido completo del paquete base seleccionado.',
        selectable: false,
        options: buildRequestOptions('corporativos-marca-personal-premium-service', [
          'Producción completa',
          'Dirección creativa',
          '60 fotografías editadas',
          '6 a 10 videos cortos'
        ])
      }
    ],
    whatsappHref: buildPortfolioWhatsappHref('Hola TECNOJACK, quiero información sobre Premium – Marca personal completa (marca personal).')
  }
];

export function getPortfolioPackageDetail(
  category: string | null | undefined,
  slug: string | null | undefined
): PortfolioPackageDetail | undefined {
  if (!category || !slug) {
    return undefined;
  }

  return portfolioPackageDetails.find((item) => item.category === category && item.slug === slug);
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
    title: 'Frames de autor',
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
    packageTitle: 'Paquetes de boda, de Esencial a Luxury',
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
