import { PortfolioPackageDetail } from '../portfolio.data';

type MediaCategoryResolverInput = Pick<
  PortfolioPackageDetail,
  'category' | 'packageTypeLabel' | 'slug' | 'title'
>;

export function resolvePortfolioPackageMediaFolder(
  detail: MediaCategoryResolverInput | null | undefined,
): string {
  if (!detail) {
    return '';
  }

  const page = resolvePortfolioPageSegment(detail);
  const category = resolvePortfolioCategorySegment(detail);
  const packageSegment = resolvePortfolioPackageSegment(detail, category);

  return ['servicios', page, category, packageSegment]
    .filter((segment) => segment.length > 0)
    .join('/');
}

function resolvePortfolioPageSegment(detail: MediaCategoryResolverInput): string {
  const category = normalizeSegment(detail.category);

  // La página "preboda" consume media desde la estructura de bodas/preboda.
  if (category === 'preboda') {
    return 'bodas';
  }

  return category;
}

function resolvePortfolioPackageSegment(
  detail: MediaCategoryResolverInput,
  categorySegment: string,
): string {
  const slug = normalizeSegment(detail.slug);
  const title = normalizeSegment(detail.title);
  const label = normalizeSegment(detail.packageTypeLabel);
  const tokens = [slug, title, label].filter(Boolean).join(' ');

  switch (categorySegment) {
    case 'hibridas':
      if (hasAny(tokens, ['luxury'])) return 'luxury';
      if (hasAny(tokens, ['premium'])) return 'premium';
      if (hasAny(tokens, ['completa', 'completo'])) return 'completo';
      return 'esencial';

    case 'fotografia-de-bodas':
      if (hasAny(tokens, ['premium'])) return 'plan-premium';
      if (hasAny(tokens, ['completa', 'completo'])) return 'plan-completo';
      return 'plan-esencial';

    case 'video-de-bodas':
      if (hasAny(tokens, ['luxury'])) return 'luxury';
      if (hasAny(tokens, ['premium'])) return 'video-premium';
      if (hasAny(tokens, ['completa', 'completo'])) return 'video-completo';
      return 'video-esencial';

    case 'preboda':
      if (hasAny(tokens, ['premium'])) return 'preboda-premium';
      if (hasAny(tokens, ['completa', 'completo', 'basico', 'sencilla'])) return 'preboda-completa';
      return 'preboda-esencial';

    case 'postboda':
      if (hasAny(tokens, ['premium'])) return 'postboda-premium';
      if (hasAny(tokens, ['completa', 'completo'])) return 'postboda-completa';
      return 'postboda-esencial';

    case 'fotografia-de-quince':
      if (hasAny(tokens, ['premium'])) return 'premium';
      if (hasAny(tokens, ['completa', 'completo'])) return 'completo';
      return 'esencial';

    case 'video-de-quince':
      if (hasAny(tokens, ['premium'])) return 'premium';
      if (hasAny(tokens, ['completa', 'completo'])) return 'completo';
      return 'esencial';

    case 'mixto':
      if (hasAny(tokens, ['premium'])) return 'premium';
      if (hasAny(tokens, ['completa', 'completo'])) return 'completo';
      return 'esencial';

    default:
      return slug;
  }
}

function hasAny(value: string, terms: string[]): boolean {
  return terms.some((term) => value.includes(term));
}

function resolvePortfolioCategorySegment(
  detail: MediaCategoryResolverInput,
): string {
  const category = normalizeSegment(detail.category);
  const typeLabel = normalizeSegment(detail.packageTypeLabel);
  const slug = normalizeSegment(detail.slug);

  switch (category) {
    case 'bodas':
        if (typeLabel === 'foto-video') {
          return 'hibridas';
        }
      if (slug.startsWith('preboda-') || typeLabel === 'sesion-preboda') {
        return 'preboda';
      }
      if (typeLabel === 'sesion-postboda') {
        return 'postboda';
      }
      if (typeLabel === 'video-de-bodas') {
        return 'video-de-bodas';
      }
      return 'fotografia-de-bodas';

    case 'quinces':
      if (typeLabel === 'video-de-quince') {
        return 'video-de-quince';
      }
      if (typeLabel === 'foto-video') {
        return 'mixto';
      }
      return 'fotografia-de-quince';

    case 'grados':
      return 'estudiantes';

    case 'preboda':
      return 'preboda';

    case 'corporativos':
      if (typeLabel === 'contenido-para-redes') {
        return 'redes';
      }
      if (typeLabel === 'eventos-corporativos') {
        return 'eventos';
      }
      if (typeLabel === 'marca-personal') {
        return 'marca-personal';
      }
      return 'video-institucional';

    default:
      return typeLabel;
  }
}

function normalizeSegment(value: string | null | undefined): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'y')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
