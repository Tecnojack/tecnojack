import { Injectable } from '@angular/core';

import {
  PortfolioBrandPillar,
  PortfolioContactLink,
  PortfolioGalleryItem,
  PortfolioNavItem,
  PortfolioPackageCategory,
  PortfolioPackageDetail,
  PortfolioProfessionalProfile,
  PortfolioService,
  PortfolioServicePageConfig,
  PortfolioStat,
  PortfolioVideoCategory,
  PortfolioVideoItem,
  buildPortfolioWhatsappHref,
  getPortfolioPackageDetail,
  getPortfolioPackageDetailsByCategory,
  portfolioBrandPillars,
  portfolioContactLinks,
  portfolioGalleryItems,
  portfolioHeroHighlights,
  portfolioHeroStats,
  portfolioLandingNavItems,
  portfolioNavItems,
  portfolioProfessionalProfile,
  portfolioServicePageConfigs,
  portfolioServices,
  portfolioVideoCategories,
  portfolioVideoItems,
  portfolioWhatsappHref
} from '../portfolio.data';

type SectionHeading = {
  eyebrow: string;
  title: string;
  lead: string;
};

const DEFAULT_FOOTER_TEXT = 'TECNOJACK Studio · fotografía y cine de bodas con dirección editorial.';
const DEFAULT_ABOUT_TITLE = 'Sobre la marca';
const DEFAULT_ABOUT_LEAD =
  'TECNOJACK es una marca audiovisual enfocada en crear piezas visuales con intención, estética y valor emocional.';
const DEFAULT_HERO_TITLE = 'Capturamos momentos\nque se convierten en eternidad';
const DEFAULT_HERO_LEAD = 'Fotografía y cine para bodas, eventos y marcas.';
const DEFAULT_GALLERY_TITLE = 'Una selección de lo mejor para mostrar estilo, atmósfera y dirección visual.';
const DEFAULT_VIDEO_TITLE = 'Piezas en video con ritmo, intención y salida comercial.';
const DEFAULT_CONTACT_TITLE = 'Haz que tu evento tenga una imagen a su altura';
const DEFAULT_CONTACT_LEAD = 'Escríbenos por WhatsApp y recibe una propuesta según tu evento.';
const DEFAULT_CONTACT_BODY =
  'Cuéntanos tu evento, tu ciudad y la fecha estimada. Te responderemos con una propuesta clara, visual y alineada con lo que quieres proyectar.';

@Injectable({ providedIn: 'root' })
export class PortfolioContentService {
  readonly fallbackImageUrl = 'assets/images/placeholders/default-media.svg';

  navItems(): PortfolioNavItem[] {
    return portfolioNavItems;
  }

  landingNavItems(): PortfolioNavItem[] {
    return portfolioLandingNavItems;
  }

  whatsappHref(): string {
    return portfolioWhatsappHref;
  }

  buildWhatsappHref(message?: string | null): string {
    const normalized = String(message ?? '').trim();
    return normalized ? buildPortfolioWhatsappHref(normalized) : portfolioWhatsappHref;
  }

  footerText(): string {
    return DEFAULT_FOOTER_TEXT;
  }

  heroEyebrow(): string {
    return 'TECNOJACK Studio';
  }

  heroTitle(): string {
    return DEFAULT_HERO_TITLE;
  }

  heroLead(): string {
    return DEFAULT_HERO_LEAD;
  }

  heroImageUrl(): string {
    return portfolioServices[0]?.image || portfolioGalleryItems[0]?.src || this.fallbackImageUrl;
  }

  heroStats(): PortfolioStat[] {
    const categories = this.servicePageCategories();
    const activePackages = categories.reduce(
      (total, category) => total + this.getPackageDetailsByCategory(category).length,
      0
    );

    return [
      ...portfolioHeroStats,
      { value: String(activePackages+'+'), label: 'Paquetes activos' },
      { value: String(categories.length+'+'), label: 'Lineas de servicio' },
      { value: String('200+'), label: 'Proyectos realizados' }

    ];
  }

  heroHighlights(): string[] {
    return portfolioHeroHighlights;
  }

  aboutTitle(): string {
    return DEFAULT_ABOUT_TITLE;
  }

  aboutLead(): string {
    return DEFAULT_ABOUT_LEAD;
  }

  brandPillars(): PortfolioBrandPillar[] {
    return portfolioBrandPillars;
  }

  professionalProfile(): PortfolioProfessionalProfile {
    return portfolioProfessionalProfile;
  }

  services(): PortfolioService[] {
    return portfolioServices;
  }

  servicesSectionHeading(): SectionHeading {
    return {
      eyebrow: 'Servicios',
      title: 'Coberturas y formatos visuales para eventos, marcas y proyectos con intención.',
      lead: ''
    };
  }

  galleryItems(): PortfolioGalleryItem[] {
    return portfolioGalleryItems;
  }

  gallerySectionHeading(): SectionHeading {
    return {
      eyebrow: 'Galería',
      title: DEFAULT_GALLERY_TITLE,
      lead: ''
    };
  }

  landingVideos(): PortfolioVideoItem[] {
    return portfolioVideoItems;
  }

  videoSectionHeading(): SectionHeading {
    return {
      eyebrow: 'Video',
      title: DEFAULT_VIDEO_TITLE,
      lead: ''
    };
  }

  contactTitle(): string {
    return DEFAULT_CONTACT_TITLE;
  }

  contactLead(): string {
    return DEFAULT_CONTACT_LEAD;
  }

  contactBody(): string {
    return DEFAULT_CONTACT_BODY;
  }

  contactLinks(): PortfolioContactLink[] {
    return portfolioContactLinks.map((link) =>
      link.platform === 'whatsapp'
        ? {
            ...link,
            href: this.whatsappHref()
          }
        : link
    );
  }

  videoCategories(): PortfolioVideoCategory[] {
    return portfolioVideoCategories;
  }

  getPageMeta(
    _pageSlug: string,
    fallbackTitle: string,
    fallbackDescription: string
  ): { title: string; description: string } {
    return {
      title: fallbackTitle,
      description: fallbackDescription
    };
  }

  getServicePageConfig(
    category: PortfolioPackageCategory | string | null | undefined
  ): PortfolioServicePageConfig | undefined {
    const normalized = this.normalizeCategory(category);
    return normalized ? portfolioServicePageConfigs[normalized] : undefined;
  }

  servicePageCategories(): PortfolioPackageCategory[] {
    return Object.keys(portfolioServicePageConfigs) as PortfolioPackageCategory[];
  }

  getPackageDetailsByCategory(category: PortfolioPackageCategory | string | null | undefined): PortfolioPackageDetail[] {
    return getPortfolioPackageDetailsByCategory(this.normalizeCategory(category));
  }

  getPackageDetail(
    category: PortfolioPackageCategory | string | null | undefined,
    slug: string | null | undefined
  ): PortfolioPackageDetail | undefined {
    return getPortfolioPackageDetail(this.normalizeCategory(category), slug);
  }

  private normalizeCategory(category: PortfolioPackageCategory | string | null | undefined): PortfolioPackageCategory | null {
    const value = String(category ?? '').trim().toLowerCase();
    if (value === 'bodas' || value === 'quinces' || value === 'grados' || value === 'preboda' || value === 'corporativos') {
      return value;
    }

    return null;
  }
}
