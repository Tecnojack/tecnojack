import { portfolioPackageDetails, PortfolioPackageDetail } from '../../portfolio/portfolio.data';

export interface CatalogPackageItem {
  id: string;
  slug: string;
  category: string; // 'bodas' | 'quinces' | 'grados' | 'videos' | 'corporativos' | 'otros'
  accordionTitle: string; // Título exacto del acordeón en la web
  title: string; // Nombre exacto del paquete tal cual aparece en la card del acordeón
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

function extractFeatures(detail: PortfolioPackageDetail): string[] {
  const featSec = detail.sections.find((s: { title: string; items: string[] }) =>
    /cobertura|incluido|características|incluye/i.test(s.title)
  ) || detail.sections[0];
  return featSec ? featSec.items : [];
}

function extractDeliverables(detail: PortfolioPackageDetail): string[] {
  const delSec = detail.sections.find((s: { title: string; items: string[] }) =>
    /entregables|entrega/i.test(s.title)
  ) || detail.sections[1];
  return delSec ? delSec.items : [];
}

function extractPriceCop(detail: PortfolioPackageDetail): number {
  if (detail.baseQuoteOptions && detail.baseQuoteOptions.length > 0) {
    const opt = detail.baseQuoteOptions[0];
    if (opt.amountCop && opt.amountCop > 0) {
      return opt.amountCop;
    }
  }

  if (detail.priceLines && detail.priceLines.length > 0) {
    const raw = detail.priceLines.join(' ');
    const cleaned = raw.replace(/[^\d]/g, '');
    const val = parseInt(cleaned, 10);
    if (!isNaN(val) && val > 0) {
      return val;
    }
  }

  return 1500000;
}

function resolveAccordionTitle(detail: PortfolioPackageDetail): { pageId: string; accordionTitle: string } {
  const category = detail.category;
  const pkgType = (detail.packageTypeLabel || '').toLowerCase();
  const slug = (detail.slug || '').toLowerCase();
  const title = (detail.title || '').toLowerCase();

  // 1. BODAS
  if (category === 'bodas') {
    if (slug.includes('civil') || title.includes('civil')) {
      return { pageId: 'bodas', accordionTitle: 'Boda civil' };
    }
    if (slug.includes('peticion') || slug.includes('propuesta') || title.includes('petición') || title.includes('propuesta')) {
      return { pageId: 'bodas', accordionTitle: 'Petición de mano' };
    }
    if (pkgType.includes('solo foto') || slug.includes('solo-foto')) {
      return { pageId: 'bodas', accordionTitle: 'Fotografía de bodas (Solo foto)' };
    }
    if (pkgType.includes('video') || slug.includes('video-only') || slug.includes('video')) {
      return { pageId: 'bodas', accordionTitle: 'Video de bodas (Solo video)' };
    }
    return { pageId: 'bodas', accordionTitle: 'Boda híbrida (Foto + video)' };
  }

  // 2. QUINCES
  if (category === 'quinces') {
    if (pkgType.includes('solo foto') || slug.includes('solo-foto')) {
      return { pageId: 'quinces', accordionTitle: 'Fotografía de quince' };
    }
    if (pkgType.includes('video') || slug.includes('video')) {
      return { pageId: 'quinces', accordionTitle: 'Video de quince' };
    }
    return { pageId: 'quinces', accordionTitle: 'Cobertura mixta (foto + video)' };
  }

  // 3. GRADOS
  if (category === 'grados') {
    if (slug.includes('instituc') || title.includes('instituc') || slug.includes('colegio')) {
      return { pageId: 'grados', accordionTitle: 'Grados institucionales / Promoción' };
    }
    return { pageId: 'grados', accordionTitle: 'Fotografía de grado (Estudiantes / Individual)' };
  }

  // 4. PREBODA (organizado dentro de la sección de Bodas)
  if (category === 'preboda') {
    if (slug.includes('postboda') || title.includes('postboda') || title.includes('trash')) {
      return { pageId: 'bodas', accordionTitle: 'Sesión postboda' };
    }
    return { pageId: 'bodas', accordionTitle: 'Sesión de preboda' };
  }

  // 5. CORPORATIVOS / VIDEOS / OTROS
  if (category === 'corporativos') {
    if (slug.includes('redes') || title.includes('redes') || title.includes('reels')) {
      return { pageId: 'corporativos', accordionTitle: 'Contenido para redes' };
    }
    if (slug.includes('evento') || title.includes('evento') || title.includes('fiesta')) {
      return { pageId: 'otros', accordionTitle: 'Eventos corporativos & Coberturas especiales' };
    }
    if (slug.includes('marca') || title.includes('marca') || title.includes('personal')) {
      return { pageId: 'corporativos', accordionTitle: 'Marca personal' };
    }
    return { pageId: 'videos', accordionTitle: 'Video institucional & publicidad' };
  }

  return { pageId: 'otros', accordionTitle: 'Otros servicios' };
}

export function buildCatalogPages(): CatalogPageConfig[] {
  const pagesList: { id: string; label: string }[] = [
    { id: 'bodas', label: '💍 BODAS' },
    { id: 'quinces', label: '👑 QUINCES' },
    { id: 'grados', label: '🎓 GRADOS' },
    { id: 'videos', label: '🎥 VIDEOS' },
    { id: 'corporativos', label: '🏢 CORPORATIVOS' },
    { id: 'otros', label: '⭐ OTROS' },
  ];

  const pagesMap: Record<string, Record<string, CatalogPackageItem[]>> = {
    bodas: {},
    quinces: {},
    grados: {},
    videos: {},
    corporativos: {},
    otros: {},
  };

  for (const detail of portfolioPackageDetails) {
    const { pageId, accordionTitle } = resolveAccordionTitle(detail);

    if (!pagesMap[pageId]) {
      pagesMap[pageId] = {};
    }

    if (!pagesMap[pageId][accordionTitle]) {
      pagesMap[pageId][accordionTitle] = [];
    }

    const price = extractPriceCop(detail);
    const features = extractFeatures(detail);
    const deliverables = extractDeliverables(detail);

    // Nombre exacto del paquete sin prefijos sintéticos
    const cleanTitle = detail.title;

    pagesMap[pageId][accordionTitle].push({
      id: `${pageId}-${detail.slug}`,
      slug: detail.slug,
      category: pageId,
      accordionTitle,
      title: cleanTitle,
      packageName: `${accordionTitle} · ${cleanTitle}`,
      priceAmountCop: price,
      lead: detail.lead || '',
      features,
      deliverables,
    });
  }

  return pagesList.map((p) => {
    const groupsObj = pagesMap[p.id] || {};
    const subServiceGroups: CatalogAccordionGroup[] = Object.keys(groupsObj).map((accordionTitle) => ({
      accordionTitle,
      packages: groupsObj[accordionTitle],
    }));

    return {
      id: p.id,
      label: p.label,
      subServiceGroups,
    };
  });
}

export const CATALOG_PAGES = buildCatalogPages();
