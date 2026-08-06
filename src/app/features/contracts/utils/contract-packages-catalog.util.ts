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
      packages: weddingMainPlans.map((plan) => {
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
      packages: weddingPhotoOnlyPlans.map((plan) => {
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
      packages: weddingVideoOnlyPlans.map((plan) => {
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
          features: plan.features || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Boda Civil',
      packages: weddingCivilPlans.map((plan) => {
        const price = parsePriceCop(plan.priceLines, plan.amountCop);
        return {
          id: `bodas-civil-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Boda Civil',
          title: plan.name,
          packageName: `Boda Civil · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Petición de Mano',
      packages: weddingProposalPlans.map((plan) => {
        const price = parsePriceCop(plan.priceLines, plan.amountCop);
        return {
          id: `bodas-peticion-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Petición de Mano',
          title: plan.name,
          packageName: `Petición de Mano · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: 'Sesión de Preboda',
      packages: preweddingPlans.map((plan) => {
        const price = parsePriceCop(plan.price);
        return {
          id: `bodas-preboda-${plan.slug}`,
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
      packages: weddingPostweddingPlans.map((plan) => {
        const price = parsePriceCop(plan.priceLines, plan.amountCop);
        return {
          id: `bodas-postboda-${plan.slug}`,
          slug: plan.slug,
          category: 'bodas',
          accordionTitle: 'Sesión Postboda',
          title: plan.name,
          packageName: `Sesión Postboda · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
  ];

  // 2. QUINCES (3 Acordeones Oficiales)
  const quincesGroups: CatalogAccordionGroup[] = [
    {
      accordionTitle: '15 Años Híbridos (Foto + Video)',
      packages: quinceHybridPlans.map((plan) => {
        const price = parsePriceCop(plan.priceLines, plan.amountCop);
        return {
          id: `quinces-hybrid-${plan.slug}`,
          slug: plan.slug,
          category: 'quinces',
          accordionTitle: '15 Años Híbridos (Foto + Video)',
          title: plan.name,
          packageName: `15 Años Híbridos · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: '15 Años Solo Fotografía',
      packages: quinceMainPlans.map((plan) => {
        const price = parsePriceCop(plan.priceLines, plan.amountCop);
        return {
          id: `quinces-photo-${plan.slug}`,
          slug: plan.slug,
          category: 'quinces',
          accordionTitle: '15 Años Solo Fotografía',
          title: plan.name,
          packageName: `15 Años Solo Fotografía · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || plan.items || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
    {
      accordionTitle: '15 Años Solo Video',
      packages: quinceVideoPlans.map((plan) => {
        const price = parsePriceCop(plan.priceLines, plan.amountCop);
        return {
          id: `quinces-video-${plan.slug}`,
          slug: plan.slug,
          category: 'quinces',
          accordionTitle: '15 Años Solo Video',
          title: plan.name,
          packageName: `15 Años Solo Video · ${plan.name}`,
          priceAmountCop: price,
          lead: plan.lead || '',
          features: plan.features || [],
          deliverables: plan.deliverables || [],
        };
      }),
    },
  ];

  // 3. GRADOS, VIDEOS, CORPORATIVOS, OTROS (leídos dinámicamente de portfolioPackageDetails)
  const otherPagesMap: Record<string, Record<string, CatalogPackageItem[]>> = {
    grados: {},
    videos: {},
    corporativos: {},
    otros: {},
  };

  for (const detail of portfolioPackageDetails) {
    if (detail.category === 'bodas' || detail.category === 'quinces' || detail.category === 'preboda') {
      continue; // Ya cubiertos explícitamente arriba
    }

    let targetPage = 'corporativos';
    let accordionTitle = detail.packageTypeLabel || 'Servicios Generales';

    if (detail.category === 'grados') {
      targetPage = 'grados';
      accordionTitle = detail.slug.includes('instituc')
        ? 'Grados Institucionales / Promoción'
        : 'Fotografía de Grado Individual';
    } else if (detail.category === 'corporativos') {
      if (detail.slug.includes('redes')) {
        targetPage = 'corporativos';
        accordionTitle = 'Contenido para Redes Sociales';
      } else if (detail.slug.includes('evento')) {
        targetPage = 'otros';
        accordionTitle = 'Eventos Corporativos & Coberturas Especiales';
      } else if (detail.slug.includes('marca')) {
        targetPage = 'corporativos';
        accordionTitle = 'Fotografía de Marca Personal';
      } else {
        targetPage = 'videos';
        accordionTitle = 'Video Institucional & Publicitario';
      }
    }

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
