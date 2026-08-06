import { portfolioPackageDetails, PortfolioPackageDetail } from '../../portfolio/portfolio.data';

export interface CatalogPackageItem {
  id: string;
  slug: string;
  category: string; // 'bodas' | 'quinces' | 'grados' | 'preboda' | 'corporativos'
  subServiceGroup: string; // e.g. 'Boda Híbrida (Foto + Video)', 'Boda Civil', etc.
  title: string; // e.g. 'Paquete Boda Sencilla Híbrida'
  packageName: string;
  priceAmountCop: number;
  lead: string;
  features: string[];
  deliverables: string[];
}

export interface CatalogSubServiceGroup {
  groupName: string;
  packages: CatalogPackageItem[];
}

export interface CatalogPageConfig {
  id: string;
  label: string;
  href: string;
  subServiceGroups: CatalogSubServiceGroup[];
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

  // Fallback a regex desde priceLines
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

function resolveSubServiceGroup(detail: PortfolioPackageDetail): string {
  const category = detail.category;
  const pkgType = (detail.packageTypeLabel || '').toLowerCase();
  const slug = (detail.slug || '').toLowerCase();
  const title = (detail.title || '').toLowerCase();

  if (category === 'bodas') {
    if (slug.includes('civil') || title.includes('civil')) {
      return 'Boda Civil';
    }
    if (slug.includes('peticion') || slug.includes('propuesta') || title.includes('petición') || title.includes('propuesta')) {
      return 'Petición de Mano';
    }
    if (pkgType.includes('solo foto') || slug.includes('solo-foto')) {
      return 'Fotografía de Bodas (Solo Foto)';
    }
    if (pkgType.includes('video') || slug.includes('video-only') || slug.includes('video')) {
      return 'Videos de Bodas (Solo Video)';
    }
    return 'Boda Híbrida (Foto + Video)';
  }

  if (category === 'quinces') {
    if (pkgType.includes('solo foto') || slug.includes('solo-foto')) {
      return '15 Años Solo Fotografía';
    }
    return '15 Años Híbridos (Foto + Video)';
  }

  if (category === 'grados') {
    if (slug.includes('instituc') || title.includes('instituc') || slug.includes('colegio')) {
      return 'Grados Institucionales / Promoción';
    }
    return 'Grados Estudiantes / Individual';
  }

  if (category === 'preboda') {
    if (slug.includes('postboda') || title.includes('postboda') || title.includes('trash')) {
      return 'Sesiones Postboda / Trash The Dress';
    }
    return 'Sesiones Preboda / Parejas';
  }

  if (category === 'corporativos') {
    if (slug.includes('redes') || title.includes('redes') || title.includes('reels')) {
      return 'Contenido para Redes Sociales';
    }
    if (slug.includes('evento') || title.includes('evento') || title.includes('fiesta')) {
      return 'Eventos Sociales & Fiestas';
    }
    if (slug.includes('marca') || title.includes('marca') || title.includes('personal')) {
      return 'Fotografía de Marca Personal';
    }
    return 'Video Institucional / Corporativo';
  }

  return detail.packageTypeLabel || 'Servicio General';
}

export function buildCatalogPages(): CatalogPageConfig[] {
  const categoriesMap: Record<string, { label: string; href: string }> = {
    bodas: { label: '💍 Página de Bodas', href: '/portfolio/bodas' },
    quinces: { label: '👑 Página de 15 Años', href: '/portfolio/quinces' },
    grados: { label: '🎓 Página de Grados', href: '/portfolio/grados' },
    preboda: { label: '📸 Página de Preboda & Parejas', href: '/portfolio/preboda' },
    corporativos: { label: '🎥 Página de Video & Corporativo', href: '/portfolio/corporativos' },
  };

  const pagesMap: Record<string, Record<string, CatalogPackageItem[]>> = {};

  for (const detail of portfolioPackageDetails) {
    const catId = detail.category;
    if (!categoriesMap[catId]) continue;

    if (!pagesMap[catId]) {
      pagesMap[catId] = {};
    }

    const groupName = resolveSubServiceGroup(detail);
    if (!pagesMap[catId][groupName]) {
      pagesMap[catId][groupName] = [];
    }

    const price = extractPriceCop(detail);
    const features = extractFeatures(detail);
    const deliverables = extractDeliverables(detail);

    pagesMap[catId][groupName].push({
      id: `${catId}-${detail.slug}`,
      slug: detail.slug,
      category: catId,
      subServiceGroup: groupName,
      title: detail.title,
      packageName: `${groupName} · ${detail.title}`,
      priceAmountCop: price,
      lead: detail.lead || '',
      features,
      deliverables,
    });
  }

  return Object.keys(categoriesMap).map((catId) => {
    const catMeta = categoriesMap[catId];
    const groupsObj = pagesMap[catId] || {};

    const subServiceGroups: CatalogSubServiceGroup[] = Object.keys(groupsObj).map((groupName) => ({
      groupName,
      packages: groupsObj[groupName],
    }));

    return {
      id: catId,
      label: catMeta.label,
      href: catMeta.href,
      subServiceGroups,
    };
  });
}

export const CATALOG_PAGES = buildCatalogPages();
