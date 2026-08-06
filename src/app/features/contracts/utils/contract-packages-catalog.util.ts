import {
  weddingMainPlans,
  weddingPhotoOnlyPlans,
  weddingVideoOnlyPlans,
  weddingCivilPlans,
  weddingProposalPlans,
  preweddingPlans,
  weddingPostweddingPlans,
  quinceMainPlans,
  quinceVideoPlans,
  quinceHybridPlans,
  portfolioPackageDetails,
  PortfolioPackageDetail,
} from '../../portfolio/portfolio.data';

export interface CatalogPackageItem {
  id: string;
  slug: string;
  category: string; // 'bodas' | 'quinces' | 'grados' | 'videos' | 'corporativos' | 'otros'
  accordionTitle: string; // Título del acordeón
  title: string; // Nombre exacto del paquete en la card
  packageName: string;
  priceAmountCop: number;
  lead: string;
  features: string[];
  deliverables: string[];
}

export interface CatalogAccordionGroup {
  accordionTitle: string;
  packages: CatalogPackageItem[];
}

export interface CatalogPageConfig {
  id: string; // 'bodas' | 'quinces' | 'grados' | 'videos' | 'corporativos' | 'otros'
  label: string;
  subServiceGroups: CatalogAccordionGroup[];
}

export interface CatalogAddOnItem {
  id: string;
  name: string;
  description: string;
  priceAmountCop: number;
}

export const CATALOG_AVAILABLE_ADDONS: CatalogAddOnItem[] = [
  {
    id: 'addon-dron-4k',
    name: 'Cobertura Aérea con Dron 4K UHD',
    description: 'Tomas aéreas cinemáticas de alta resolución durante la ceremonia y exteriores.',
    priceAmountCop: 350000,
  },
  {
    id: 'addon-fotolibro-lujo',
    name: 'Álbum Fotolibro Impreso de Lujo (30x30 cm)',
    description: 'Álbum tapa dura personalizado con 40 páginas en papel fotográfico brillante.',
    priceAmountCop: 450000,
  },
  {
    id: 'addon-hora-extra',
    name: 'Hora de Cobertura Adicional (Foto + Video)',
    description: 'Extensión de jornada de cobertura profesional en vivo por hora adicional.',
    priceAmountCop: 250000,
  },
  {
    id: 'addon-same-day-edit',
    name: 'Edición en Vivo Mismo Día (Same Day Edit Reel)',
    description: 'Reel de 60s editado durante el evento proyectado en la recepción.',
    priceAmountCop: 400000,
  },
  {
    id: 'addon-segundo-fotografo',
    name: 'Segundo Fotógrafo Profesional de Apoyo',
    description: 'Fotógrafo secundario para capturar ángulos simultáneos y reacciones.',
    priceAmountCop: 300000,
  },
  {
    id: 'addon-sesion-estudio',
    name: 'Sesión de Retrato en Estudio / Externa Adicional',
    description: 'Sesión previa o posterior de 2 horas con estilismo básico e iluminación.',
    priceAmountCop: 350000,
  },
];

function parsePriceCop(priceStr?: string | string[], fallbackAmount?: number): number {
  if (fallbackAmount && fallbackAmount > 0) {
    return fallbackAmount;
  }
  if (!priceStr) return 1500000;
  const raw = Array.isArray(priceStr) ? priceStr.join(' ') : priceStr;
  const cleaned = raw.replace(/[^\d]/g, '');
  const val = parseInt(cleaned, 10);
  return !isNaN(val) && val > 0 ? val : 1500000;
}

export function buildCatalogPages(): CatalogPageConfig[] {
  // 1. BODAS (7 Acordeones Oficiales)
  const bodasGroups: CatalogAccordionGroup[] = [
    {
      accordionTitle: 'Boda Híbrida (Foto + Video)',
      packages: weddingMainPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines);
        return {
          id: `bodas-main-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Boda Híbrida (Foto + Video)',
          title: plan.name,
          packageName: `Boda Híbrida · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Fotografía de Bodas',
      packages: weddingPhotoOnlyPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines);
        return {
          id: `bodas-photo-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Fotografía de Bodas',
          title: plan.name,
          packageName: `Fotografía de Bodas · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Video de Bodas',
      packages: weddingVideoOnlyPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines, plan.amountCop);
        return {
          id: `bodas-video-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Video de Bodas',
          title: plan.name,
          packageName: `Video de Bodas · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Boda Civil',
      packages: weddingCivilPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines);
        return {
          id: `bodas-civil-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Boda Civil',
          title: plan.name,
          packageName: `Boda Civil · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Petición de Mano',
      packages: weddingProposalPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines);
        return {
          id: `bodas-proposal-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Petición de Mano',
          title: plan.name,
          packageName: `Petición de Mano · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Sesión de Preboda',
      packages: preweddingPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines || plan.price);
        return {
          id: `bodas-prewedding-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Sesión de Preboda',
          title: plan.name,
          packageName: `Sesión de Preboda · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Sesión Postboda',
      packages: weddingPostweddingPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines);
        return {
          id: `bodas-postwedding-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Sesión Postboda',
          title: plan.name,
          packageName: `Sesión Postboda · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
  ];

  // 2. QUINCES (3 Acordeones Oficiales)
  const quincesGroups: CatalogAccordionGroup[] = [
    {
      accordionTitle: 'Fotografía de Quinceañeras',
      packages: quinceMainPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines);
        return {
          id: `quinces-photo-${plan.slug}`,
          slug: plan.slug,
          category: 'quinces',
          accordionTitle: 'Fotografía de Quinceañeras',
          title: plan.name,
          packageName: `Fotografía Quinces · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Video de Quinceañeras',
      packages: quinceVideoPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines);
        return {
          id: `quinces-video-${plan.slug}`,
          slug: plan.slug,
          category: 'quinces',
          accordionTitle: 'Video de Quinceañeras',
          title: plan.name,
          packageName: `Video Quinces · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Quinces Híbrido (Foto + Video)',
      packages: quinceHybridPlans.map((plan: any) => {
        const price = parsePriceCop(plan.priceLines);
        return {
          id: `quinces-hybrid-${plan.slug}`,
          slug: plan.slug,
          category: 'quinces',
          accordionTitle: 'Quinces Híbrido (Foto + Video)',
          title: plan.name,
          packageName: `Quinces Híbrido · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
  ];

  // 3, 4, 5, 6. OTRAS PÁGINAS (GRADOS, VIDEOS, CORPORATIVOS, OTROS)
  const otherPagesMap: Record<string, Record<string, CatalogPackageItem[]>> = {
    grados: {},
    videos: {},
    corporativos: {},
    otros: {},
  };

  for (const detail of portfolioPackageDetails) {
    let targetPage = 'otros';
    const catStr = (detail.category as string) || '';
    if (catStr === 'grados') targetPage = 'grados';
    else if (catStr === 'video' || catStr === 'videos') targetPage = 'videos';
    else if (catStr === 'corporativos') targetPage = 'corporativos';
    else targetPage = 'otros';

    const accordionTitle = detail.categoryLabel || detail.title;
    if (!otherPagesMap[targetPage][accordionTitle]) {
      otherPagesMap[targetPage][accordionTitle] = [];
    }

    const price = parsePriceCop(detail.priceLines, detail.baseQuoteOptions?.[0]?.amountCop);
    const featSec = detail.sections.find((s) => /cobertura|incluido|características|incluye/i.test(s.title)) || detail.sections[0];
    const delSec = detail.sections.find((s) => /entregables|entrega/i.test(s.title)) || detail.sections[1];

    otherPagesMap[targetPage][accordionTitle].push({
      id: `${targetPage}-${detail.slug}`,
      slug: detail.slug,
      category: targetPage,
      accordionTitle,
      title: detail.title,
      packageName: `${accordionTitle} · ${detail.title}`,
      priceAmountCop: price,
      lead: detail.lead || '',
      features: featSec ? featSec.items : [],
      deliverables: delSec ? delSec.items : [],
    });
  }

  const buildSubGroups = (pageId: string): CatalogAccordionGroup[] => {
    const obj = otherPagesMap[pageId] || {};
    return Object.keys(obj).map((accordionTitle) => ({
      accordionTitle,
      packages: obj[accordionTitle],
    }));
  };

  return [
    {
      id: 'bodas',
      label: '💍 BODAS',
      subServiceGroups: bodasGroups,
    },
    {
      id: 'quinces',
      label: '👑 QUINCES',
      subServiceGroups: quincesGroups,
    },
    {
      id: 'grados',
      label: '🎓 GRADOS',
      subServiceGroups: buildSubGroups('grados'),
    },
    {
      id: 'videos',
      label: '🎥 VIDEOS',
      subServiceGroups: buildSubGroups('videos'),
    },
    {
      id: 'corporativos',
      label: '🏢 CORPORATIVOS',
      subServiceGroups: buildSubGroups('corporativos'),
    },
    {
      id: 'otros',
      label: '⭐ OTROS',
      subServiceGroups: buildSubGroups('otros'),
    },
  ];
}

export const CATALOG_PAGES = buildCatalogPages();
