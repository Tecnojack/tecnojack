import { Injectable, computed, effect, signal } from '@angular/core';

export type SupportedLanguage = 'es' | 'en';

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  es: {
    // Brand & Header
    'brand.tagline': 'El arte de ser un pro.',
    'brand.subtitle': 'Producción Audiovisual & Fotografía de Alto Nivel',
    'nav.home': 'Inicio',
    'nav.bodas': 'Bodas',
    'nav.quinces': '15 Años',
    'nav.grados': 'Grados',
    'nav.sesiones': 'Sesiones',
    'nav.corporativos': 'Corporativos',
    'nav.videos': 'Videos',
    'nav.preboda': 'Preboda',
    'nav.sobre_mi': 'Sobre mí',
    'nav.contacto': 'Contacto',
    'nav.cotizar': 'Cotizar',
    'nav.otros': 'Otros',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'nav.language': 'Idioma',
    'nav.theme': 'Tema',
    'nav.theme.dark': 'Modo oscuro',
    'nav.theme.light': 'Modo claro',
    'nav.theme.system': 'Sistema',

    // Hero Home
    'hero.eyebrow': 'Estudio Audiovisual · Colombia',
    'hero.title_line1': 'El arte de',
    'hero.title_line2': 'ser un pro.',
    'hero.subtitle': 'Historias que merecen ser contadas. Imágenes que merecen ser recordadas. Fotografía editorial, bodas de autor y cine visual con estándar pro.',
    'hero.cta.portfolio': 'Explorar Portafolio',
    'hero.cta.quote': 'Cotizar por WhatsApp',
    'hero.cta.contact': 'Contactar',

    // Stats
    'stats.years': 'Años de trayectoria',
    'stats.weddings': 'Bodas & Eventos',
    'stats.deliverables': 'Entregas exitosas',
    'stats.satisfaction': 'Satisfacción de clientes',

    // Sections
    'services.eyebrow': 'Especialidades',
    'services.title': 'Servicios audiovisuales creados para trascender.',
    'services.lead': 'Desde la emoción íntima de una boda hasta campañas de marca de gran formato, cada producción se ejecuta con dirección estética meticulosa.',
    'services.explore': 'Ver paquetes y detalles',

    'profile.eyebrow': 'Dirección Creativa',
    'profile.title': 'Jackson Palacios',
    'profile.role': 'Director Visual & Fotógrafo',
    'profile.bio1': 'Más de 8 años dedicados a capturar la verdad y la estética de momentos irrepetibles.',
    'profile.bio2': 'Combinando el rigor técnico del cine digital con la sensibilidad espontánea de la fotografía documental.',
    'profile.cta': 'Conoce más sobre mi enfoque',

    'about.eyebrow': 'Identidad & Filosofía',
    'about.title': 'La precisión tecnológica al servicio de la emoción.',
    'about.lead': 'No creemos en poses artificiales ni en fórmulas prefabricadas. Diseñamos experiencias visuales a la medida de personas y marcas exigentes.',
    'about.pillar1.title': 'Composición de autor',
    'about.pillar1.desc': 'Cada cuadro es meditado en color, luz, textura y equilibrio para un recuerdo intemporal.',
    'about.pillar2.title': 'Flujo ágil y seguro',
    'about.pillar2.desc': 'Garantía de respaldo digital redundante y entregas organizadas en galerías privadas.',
    'about.pillar3.title': 'Experiencia personalizada',
    'about.pillar3.desc': 'Acompañamiento cercano desde la preproducción hasta la entrega final física y digital.',

    // Catalog & Packages
    'packages.eyebrow': 'Inversión & Paquetes',
    'packages.title': 'Propuestas transparentes, completas y sin sorpresas.',
    'packages.lead': 'Selecciona la alternativa ideal para tu evento o sesión fotográfica. Todos los planes incluyen respaldo profesional y edición curada.',
    'packages.investment': 'Inversión',
    'packages.included': 'Lo que incluye:',
    'packages.deliverables': 'Entregables:',
    'packages.view_detail': 'Ver detalles del plan',
    'packages.request_plan': 'Reservar este plan',
    'packages.badge.featured': 'Destacado',
    'packages.badge.recommended': 'Más Recomendado',
    'packages.badge.exclusive': 'Experiencia Exclusiva',
    'packages.badge.studio': 'Estudio',

    // Contact
    'contact.eyebrow': 'Contacto Directo',
    'contact.title': 'Conversemos sobre tu próxima fecha.',
    'contact.lead': 'Cuéntanos qué tienes en mente y diseñamos una propuesta adecuada a tus expectativas y locación.',
    'contact.name': 'Nombre completo',
    'contact.phone': 'WhatsApp / Teléfono',
    'contact.date': 'Fecha estimada del evento',
    'contact.service': 'Servicio de interés',
    'contact.city': 'Ciudad o locación',
    'contact.notes': 'Cuéntanos detalles o expectativas',
    'contact.send': 'Enviar por WhatsApp',
    'contact.fast_reply': 'Respuesta habitualmente en menos de 2 horas',

    // Footer
    'footer.brand': 'TECNOJACK',
    'footer.slogan': 'El arte de ser un pro.',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.col.services': 'Servicios',
    'footer.col.experience': 'Experiencias',
    'footer.col.legal': 'Legal & Contacto',
    'footer.terms': 'Términos y condiciones',
    'footer.privacy': 'Políticas de privacidad',
    'footer.client_portal': 'Portal de Clientes'
  },
  en: {
    // Brand & Header
    'brand.tagline': 'The art of being a pro.',
    'brand.subtitle': 'High-End Audiovisual Production & Photography',
    'nav.home': 'Home',
    'nav.bodas': 'Weddings',
    'nav.quinces': 'Sweet 15',
    'nav.grados': 'Graduations',
    'nav.sesiones': 'Sessions',
    'nav.corporativos': 'Corporate',
    'nav.videos': 'Videos',
    'nav.preboda': 'Engagement',
    'nav.sobre_mi': 'About',
    'nav.contacto': 'Contact',
    'nav.cotizar': 'Quote',
    'nav.otros': 'Other',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.language': 'Language',
    'nav.theme': 'Theme',
    'nav.theme.dark': 'Dark Mode',
    'nav.theme.light': 'Light Mode',
    'nav.theme.system': 'System',

    // Hero Home
    'hero.eyebrow': 'Audiovisual Studio · Colombia',
    'hero.title_line1': 'The art of',
    'hero.title_line2': 'being a pro.',
    'hero.subtitle': 'Stories that deserve to be told. Images that deserve to be remembered. Editorial photography, author weddings, and visual cinema with a pro standard.',
    'hero.cta.portfolio': 'Explore Portfolio',
    'hero.cta.quote': 'Quote via WhatsApp',
    'hero.cta.contact': 'Contact Us',

    // Stats
    'stats.years': 'Years of Experience',
    'stats.weddings': 'Weddings & Events',
    'stats.deliverables': 'Successful Deliveries',
    'stats.satisfaction': 'Client Satisfaction',

    // Sections
    'services.eyebrow': 'Specialties',
    'services.title': 'Audiovisual services crafted to transcend.',
    'services.lead': 'From the intimate emotion of a wedding to large-scale brand campaigns, every production is executed with meticulous aesthetic direction.',
    'services.explore': 'View packages & details',

    'profile.eyebrow': 'Creative Direction',
    'profile.title': 'Jackson Palacios',
    'profile.role': 'Visual Director & Photographer',
    'profile.bio1': 'Over 8 years dedicated to capturing truth and aesthetics in unrepeatable moments.',
    'profile.bio2': 'Combining the technical discipline of digital cinema with the candid sensitivity of documentary photography.',
    'profile.cta': 'Learn more about my approach',

    'about.eyebrow': 'Identity & Philosophy',
    'about.title': 'Technological precision at the service of emotion.',
    'about.lead': 'We do not believe in artificial poses or pre-made recipes. We design tailored visual experiences for demanding individuals and brands.',
    'about.pillar1.title': 'Author Composition',
    'about.pillar1.desc': 'Every frame is carefully balanced in color, light, texture, and harmony for a timeless memory.',
    'about.pillar2.title': 'Agile & Secure Workflow',
    'about.pillar2.desc': 'Redundant digital backup guarantee and seamless delivery via private online galleries.',
    'about.pillar3.title': 'Tailored Experience',
    'about.pillar3.desc': 'Close guidance from initial pre-production to final physical and digital delivery.',

    // Catalog & Packages
    'packages.eyebrow': 'Investment & Packages',
    'packages.title': 'Transparent, complete, and surprise-free proposals.',
    'packages.lead': 'Select the ideal tier for your event or photo session. All packages include professional backup and curated color grading.',
    'packages.investment': 'Investment',
    'packages.included': 'What is included:',
    'packages.deliverables': 'Deliverables:',
    'packages.view_detail': 'View plan details',
    'packages.request_plan': 'Book this plan',
    'packages.badge.featured': 'Featured',
    'packages.badge.recommended': 'Most Recommended',
    'packages.badge.exclusive': 'Exclusive Experience',
    'packages.badge.studio': 'Studio',

    // Contact
    'contact.eyebrow': 'Direct Contact',
    'contact.title': "Let's talk about your upcoming date.",
    'contact.lead': 'Tell us what you have in mind and we will design a proposal tailored to your expectations and venue.',
    'contact.name': 'Full name',
    'contact.phone': 'WhatsApp / Phone',
    'contact.date': 'Estimated event date',
    'contact.service': 'Service of interest',
    'contact.city': 'City or location',
    'contact.notes': 'Tell us details or expectations',
    'contact.send': 'Send via WhatsApp',
    'contact.fast_reply': 'Usually replied in under 2 hours',

    // Footer
    'footer.brand': 'TECNOJACK',
    'footer.slogan': 'The art of being a pro.',
    'footer.rights': 'All rights reserved.',
    'footer.col.services': 'Services',
    'footer.col.experience': 'Experiences',
    'footer.col.legal': 'Legal & Contact',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.client_portal': 'Client Portal'
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly storageKey = 'tj_language_pref';
  readonly currentLang = signal<SupportedLanguage>(this.getInitialLang());

  readonly isEn = computed(() => this.currentLang() === 'en');
  readonly isEs = computed(() => this.currentLang() === 'es');

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(this.storageKey, lang);
          document.documentElement.lang = lang;
        } catch {
          // Ignore storage restrictions
        }
      }
    });
  }

  setLang(lang: SupportedLanguage): void {
    if (lang === 'es' || lang === 'en') {
      this.currentLang.set(lang);
    }
  }

  toggleLang(): void {
    this.currentLang.update((cur) => (cur === 'es' ? 'en' : 'es'));
  }

  t(key: string, fallback?: string): string {
    const lang = this.currentLang();
    return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS['es']?.[key] ?? fallback ?? key;
  }

  private getInitialLang(): SupportedLanguage {
    if (typeof window === 'undefined') {
      return 'es';
    }
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved === 'es' || saved === 'en') {
        return saved;
      }
      const browserLang = (navigator.language || '').toLowerCase();
      if (browserLang.startsWith('en')) {
        return 'en';
      }
    } catch {
      // Fallback to Spanish
    }
    return 'es';
  }
}
