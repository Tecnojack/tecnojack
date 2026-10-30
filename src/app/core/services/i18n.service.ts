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
    'nav.soluciones': 'Soluciones',
    'nav.corporativos': 'Corporativos',
    'nav.videos': 'Videos',
    'nav.preboda': 'Preboda',
    'nav.sobre_mi': 'Sobre mí',
    'nav.contacto': 'Contacto',
    'nav.cotizar': 'Cotizar',
    'nav.otros': 'Otros',
    'nav.menu': 'Páginas',
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
    'hero.caps.editorial': 'Fotografía Editorial',
    'hero.caps.weddings': 'Cine de Bodas',
    'hero.caps.sessions': 'Sesiones de Autor',
    'hero.caps.studio': 'Estudio & Marcas',
    'hero.cta.portfolio': 'Explorar Portafolio',
    'hero.cta.quote': 'Cotizar por WhatsApp',
    'hero.cta.contact': 'Contactar',
    'hero.cta.explore': 'Explorar colecciones',

    // Stats
    'stats.years': 'Años de trayectoria',
    'stats.weddings': 'Bodas & Eventos',
    'stats.deliverables': 'Entregas exitosas',
    'stats.satisfaction': 'Satisfacción de clientes',

    // Philosophy / Manifesto
    'brand.manifesto_badge': 'FILOSOFÍA & MANIFIESTO',
    'brand.manifesto_quote1': 'La fotografía no captura lo que ves.',
    'brand.manifesto_quote2': 'Captura lo que sentiste.',
    'brand.manifesto_lead': 'TECNOJACK es una marca audiovisual colombiana enfocada en crear piezas visuales con intención, estética y valor emocional.',
    'brand.pillar1.title': 'Composición de autor',
    'brand.pillar1.desc': 'Cada cuadro es meditado en color, luz, textura y equilibrio para un recuerdo intemporal.',
    'brand.pillar2.title': 'Flujo ágil y seguro',
    'brand.pillar2.desc': 'Garantía de respaldo digital redundante y entregas organizadas en galerías privadas.',
    'brand.pillar3.title': 'Experiencia personalizada',
    'brand.pillar3.desc': 'Acompañamiento cercano desde la preproducción hasta la entrega final física y digital.',

    // Selected Work
    'work.badge': 'CAMPAÑAS DESTACADAS',
    'work.eyebrow': 'OBRA SELECCIONADA',
    'work.title': 'Fotografía y cine con intención editorial.',
    'work.lead': 'Una cuidada selección de proyectos donde cada encuadre responde a una visión artística deliberada y atemporal.',
    'work.view_full': 'Ver proyecto completo →',
    'work.explore_sessions': 'Explorar sesiones →',
    'work.explore_quinces': 'Ver celebraciones →',
    'work.explore_cinema': 'Ver producciones de cine →',
    'work.c1.cat': 'CINE DE BODAS & NARRATIVA',
    'work.c1.title': 'Historias de Amor de Autor',
    'work.c1.sub': 'Dirección cinematográfica en locaciones exclusivas de Colombia',
    'work.c2.cat': 'RETRATO & SESIONES',
    'work.c2.title': 'Sesiones de Autor',
    'work.c2.sub': 'Estudio profesional y exteriores con dirección estética personalizada',
    'work.c3.cat': 'QUINCEAÑERAS DE ALTO NIVEL',
    'work.c3.title': 'Celebraciones Contemporáneas',
    'work.c3.sub': 'Elegancia, frescura y registro documental de vanguardia',
    'work.c4.cat': 'PRODUCCIÓN AUDIOVISUAL',
    'work.c4.title': 'The Master Cut — Cine 4K',
    'work.c4.sub': 'Color grading cinematográfico y sonido inmersivo para bodas y marcas',

    // Services Catalog
    'services.badge': 'CATÁLOGO EDITORIAL',
    'services.eyebrow': 'Disciplinas y Especialidades',
    'services.title': 'Servicios audiovisuales creados para trascender.',
    'services.lead': 'Desde la emoción íntima de una boda hasta campañas de marca de gran formato, cada producción se ejecuta con dirección estética meticulosa.',
    'services.discipline': 'DISCIPLINA',
    'services.explore': 'Ver paquetes y cobertura',
    'services.included_title': 'Puntos clave de la cobertura:',
    'services.view_details': 'Ver detalles del servicio',
    'services.bodas.title': 'Bodas',
    'services.bodas.desc': 'Historias de boda con estética elegante y lectura emocional del momento.',
    'services.quinces.title': '15 Años',
    'services.quinces.desc': 'Cobertura visual para celebrar con retratos, clips y momentos clave.',
    'services.grados.title': 'Grados',
    'services.grados.desc': 'Ceremonias y promociones con una cobertura limpia, clara y bien presentada.',
    'services.preboda.title': 'Preboda',
    'services.preboda.desc': 'Sesiones previas pensadas para conectar, narrar y proyectar la boda.',
    'services.sesiones.title': 'Sesiones',
    'services.sesiones.desc': 'Retratos individuales, familias o marcas personales con dirección visual.',
    'services.videos.title': 'Videos',
    'services.videos.desc': 'Producción en video con ritmo, intención narrativa y salida comercial.',
    'services.corporativos.title': 'Corporativos',
    'services.corporativos.desc': 'Piezas audiovisuales con ritmo comercial y narrativa estratégica para marcas, empresas y figuras públicas.',

    // Storytelling Transition
    'story.badge': 'ARTE & PRECISIÓN',
    'story.quote': '“Cada segundo contiene una eternidad cuando la mirada correcta lo detiene.”',
    'story.tag1': 'Cine 4K',
    'story.tag2': 'Color Grading de Autor',
    'story.tag3': 'Óptica Prime',
    'story.tag4': 'Narrativa Emocional',

    // Flagship Experiences
    'exp.badge': 'PLANES & COBERTURAS',
    'exp.eyebrow': 'EXPERIENCIAS INSIGNIA',
    'exp.title': 'Colecciones creadas para momentos irrepetibles.',
    'exp.lead': 'Compara nuestras producciones más representativas y descubre la opción perfecta para tu historia.',
    'exp.recommended': 'COLECCIÓN RECOMENDADA',
    'exp.key_points': 'Puntos clave de la cobertura:',
    'exp.view_all_prefix': 'Ver todos los paquetes y tarifas de',
    'exp.1.cat': 'BODAS',
    'exp.1.title': 'Boda Híbrida — Foto & Cine Nupcial',
    'exp.1.lead': 'Desde $1\'900.000 COP',
    'exp.1.desc': 'Nuestra experiencia más completa. Cobertura simultánea de fotografía de autor y cinematografía documental con equipo dedicado.',
    'exp.1.h1': 'Fotógrafo principal + Videógrafo cinematográfico',
    'exp.1.h2': 'Hasta 450 fotos editadas en alta resolución',
    'exp.1.h3': 'Película documental + Highlight Film + Reels verticales',
    'exp.1.h4': 'Dron aéreo y galería online privada',
    'exp.2.cat': 'QUINCEAÑERAS',
    'exp.2.title': '15 Años — Celebración Contemporánea',
    'exp.2.lead': 'Planes a la medida',
    'exp.2.desc': 'Dirección visual de vanguardia para quinceañeras. Sesión previa de gala, cobertura completa de la fiesta y entrega para redes.',
    'exp.2.h1': 'Sesión previa en estudio o exteriores',
    'exp.2.h2': 'Cobertura de recepción, protocolo y fiesta',
    'exp.2.h3': 'Video resumen en 4K y reels para Instagram/TikTok',
    'exp.2.h4': 'Álbum fotográfico de alta gama',
    'exp.3.cat': 'GRADOS',
    'exp.3.title': 'Grados — Fotografía de Promoción & Familia',
    'exp.3.lead': 'Planes Estudiantes & Grupos',
    'exp.3.desc': 'Cobertura profesional y solemne de ceremonias de graduación, fotografía de llamado individual con toga y birrete, retratos de estudio y fotos familiares de alta calidad.',
    'exp.3.h1': 'Llamado individual en tarima con toga y birrete',
    'exp.3.h2': 'Retratos familiares y con compañeros de promoción',
    'exp.3.h3': 'Mosaicos, carpetas de lujo y retablos en madera',
    'exp.3.h4': 'Entrega digital en alta resolución y galería privada',
    'exp.4.cat': 'AUDIOVISUAL',
    'exp.4.title': 'Corporativo, Comerciales & Marca',
    'exp.4.lead': 'Cotización personalizada',
    'exp.4.desc': 'Piezas audiovisuales con ritmo comercial y narrativa estratégica para marcas, empresas y figuras públicas.',
    'exp.4.h1': 'Video institucional y registro de eventos',
    'exp.4.h2': 'Contenido audiovisual para campañas publicitarias',
    'exp.4.h3': 'Fotografía de producto y retratos corporativos',
    'exp.4.h4': 'Entrega en formatos multicanal (16:9, 9:16, 1:1)',

    // Profile
    'profile.eyebrow': 'PERFIL PROFESIONAL',
    'profile.title': 'Más que fotografía, una visión completa',
    'profile.role': 'Jackson Palacios · Fundador & Director Visual',
    'profile.lead': 'Ingeniero de sistemas y productor audiovisual. Combino tecnología, creatividad y narrativa visual para ofrecer experiencias modernas, interactivas y visualmente impactantes.',
    'profile.quote': '“La tecnología nos entrega las herramientas de precisión; la mirada humana y la sensibilidad nos entregan el alma de cada historia.”',
    'profile.supportingLabel': 'TAMBIÉN DESARROLLO:',
    'profile.p1': 'Invitaciones digitales personalizadas',
    'profile.p2': 'Experiencias web para bodas y eventos',
    'profile.p3': 'Plataformas visuales interactivas',
    'profile.cta': 'Ver ejemplos',

    // Contact
    'contact.badge': 'DISPONIBILIDAD & ASESORÍA PERSONALIZADA',
    'contact.eyebrow': 'Contacto Directo',
    'contact.title': 'Hagamos realidad una historia inolvidable',
    'contact.lead': 'Cuéntanos tu evento, tu ciudad y la fecha estimada. Te responderemos con una propuesta clara, visual y alineada con lo que quieres proyectar.',
    'contact.wa_cta': 'Iniciar conversación en WhatsApp',
    'contact.socials': 'O síguenos en redes:',
    'contact.location': '📍 Base en Medellín · Cobertura en toda Colombia y producciones internacionales',

    // Packages & Sliders
    'packages.eyebrow': 'Inversión & Paquetes',
    'packages.collections': 'COLECCIONES',
    'packages.plans_available': 'planes disponibles',
    'packages.view_collections': 'Ver colecciones',
    'packages.collapse': 'Contraer',
    'packages.investment': 'INVERSIÓN',
    'packages.travel_fee': '+ VIÁTICOS',
    'packages.view_details': 'Ver detalles',
    'packages.details_title': 'Detalles del paquete',
    'packages.close': 'Cerrar',
    'packages.included': 'Incluye:',
    'packages.deliverables': 'Entregables:',
    'packages.destination_info': '¿Tu historia sucede fuera de Medellín? Este servicio está disponible en modalidad Destination. El transporte se cotiza aparte.',
    'packages.more_info': 'Más info',
    'packages.book_now': 'Reservar por WhatsApp',
    'packages.explore_collections': 'Explorar colecciones',
    'packages.quote_whatsapp': 'Cotizar por WhatsApp',

    // Footer
    'footer.brand': 'TECNOJACK',
    'footer.slogan': 'El arte de ser un pro.',
    'footer.summary': 'TECNOJACK · fotografía y video con dirección visual para bodas, eventos y marcas.',
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
    'nav.soluciones': 'Solutions',
    'nav.corporativos': 'Corporate',
    'nav.videos': 'Videos',
    'nav.preboda': 'Engagement',
    'nav.sobre_mi': 'About',
    'nav.contacto': 'Contact',
    'nav.cotizar': 'Quote',
    'nav.otros': 'Other',
    'nav.menu': 'Pages',
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
    'hero.subtitle': 'Stories that deserve to be told. Images that deserve to be remembered. Editorial photography, signature weddings, and pro visual cinema.',
    'hero.caps.editorial': 'Editorial Photography',
    'hero.caps.weddings': 'Wedding Cinema',
    'hero.caps.sessions': 'Signature Sessions',
    'hero.caps.studio': 'Studio & Brands',
    'hero.cta.portfolio': 'Explore Portfolio',
    'hero.cta.quote': 'Quote via WhatsApp',
    'hero.cta.contact': 'Contact Us',
    'hero.cta.explore': 'Explore collections',

    // Stats
    'stats.years': 'Years of Experience',
    'stats.weddings': 'Weddings & Events',
    'stats.deliverables': 'Successful Deliveries',
    'stats.satisfaction': 'Client Satisfaction',

    // Philosophy / Manifesto
    'brand.manifesto_badge': 'PHILOSOPHY & MANIFESTO',
    'brand.manifesto_quote1': 'Photography does not capture what you see.',
    'brand.manifesto_quote2': 'It captures what you felt.',
    'brand.manifesto_lead': 'TECNOJACK is a Colombian audiovisual brand dedicated to crafting visual pieces with intention, aesthetic rigor, and deep emotion.',
    'brand.pillar1.title': 'Author Composition',
    'brand.pillar1.desc': 'Every frame is carefully balanced in color, light, texture, and harmony for a timeless memory.',
    'brand.pillar2.title': 'Agile & Secure Workflow',
    'brand.pillar2.desc': 'Redundant digital backup guarantee and seamless delivery via private online galleries.',
    'brand.pillar3.title': 'Tailored Experience',
    'brand.pillar3.desc': 'Close guidance from initial pre-production to final physical and digital delivery.',

    // Selected Work
    'work.badge': 'FEATURED CAMPAIGNS',
    'work.eyebrow': 'SELECTED WORK',
    'work.title': 'Photography and cinema with editorial intention.',
    'work.lead': 'A curated selection of projects where every frame reflects a deliberate, timeless artistic vision.',
    'work.view_full': 'View full project →',
    'work.explore_sessions': 'Explore sessions →',
    'work.explore_quinces': 'View celebrations →',
    'work.explore_cinema': 'View cinema productions →',
    'work.c1.cat': 'WEDDING CINEMA & NARRATIVE',
    'work.c1.title': 'Author Love Stories',
    'work.c1.sub': 'Cinematic direction in exclusive locations in Colombia',
    'work.c2.cat': 'PORTRAITS & SESSIONS',
    'work.c2.title': 'Signature Sessions',
    'work.c2.sub': 'Professional studio and outdoor sessions with custom aesthetic direction',
    'work.c3.cat': 'HIGH-END SWEET 15',
    'work.c3.title': 'Contemporary Celebrations',
    'work.c3.sub': 'Elegance, freshness, and avant-garde documentary recording',
    'work.c4.cat': 'AUDIOVISUAL PRODUCTION',
    'work.c4.title': 'The Master Cut — 4K Cinema',
    'work.c4.sub': 'Cinematic color grading and immersive sound for weddings and brands',

    // Services Catalog
    'services.badge': 'EDITORIAL CATALOG',
    'services.eyebrow': 'Disciplines & Specialties',
    'services.title': 'Audiovisual services crafted to transcend.',
    'services.lead': 'From the intimate emotion of a wedding to large-scale brand campaigns, every production is executed with meticulous aesthetic direction.',
    'services.discipline': 'DISCIPLINE',
    'services.explore': 'View packages & coverage',
    'services.included_title': 'Key coverage points:',
    'services.view_details': 'View service details',
    'services.bodas.title': 'Weddings',
    'services.bodas.desc': 'Wedding stories with elegant aesthetics and emotional depth.',
    'services.quinces.title': 'Sweet 15',
    'services.quinces.desc': 'Visual coverage to celebrate with portraits, clips, and key moments.',
    'services.grados.title': 'Graduations',
    'services.grados.desc': 'Ceremonies and graduations with clean, clear, and well-presented coverage.',
    'services.preboda.title': 'Engagement',
    'services.preboda.desc': 'Pre-wedding sessions designed to connect, narrate, and anticipate the wedding.',
    'services.sesiones.title': 'Sessions',
    'services.sesiones.desc': 'Individual portraits, families, or personal brands with visual direction.',
    'services.videos.title': 'Videos',
    'services.videos.desc': 'Video production with rhythm, narrative intent, and commercial finish.',
    'services.corporativos.title': 'Corporate',
    'services.corporativos.desc': 'Audiovisual pieces with commercial pace and strategic narrative for brands, companies, and public figures.',

    // Storytelling Transition
    'story.badge': 'ART & PRECISION',
    'story.quote': '“Every second holds an eternity when the right gaze pauses it.”',
    'story.tag1': '4K Cinema',
    'story.tag2': 'Signature Color Grading',
    'story.tag3': 'Prime Optics',
    'story.tag4': 'Emotional Narrative',

    // Flagship Experiences
    'exp.badge': 'PLANS & COVERAGE',
    'exp.eyebrow': 'FLAGSHIP EXPERIENCES',
    'exp.title': 'Collections crafted for unrepeatable moments.',
    'exp.lead': 'Compare our hallmark productions and discover the perfect option for your story.',
    'exp.recommended': 'RECOMMENDED COLLECTION',
    'exp.key_points': 'Key coverage points:',
    'exp.view_all_prefix': 'View all packages and rates for',
    'exp.1.cat': 'WEDDINGS',
    'exp.1.title': 'Hybrid Wedding — Photo & Bridal Cinema',
    'exp.1.lead': 'From $1,900,000 COP',
    'exp.1.desc': 'Our most complete experience. Simultaneous signature photography and documentary cinematography with dedicated crew.',
    'exp.1.h1': 'Lead photographer + Cinematic videographer',
    'exp.1.h2': 'Up to 450 edited high-resolution photos',
    'exp.1.h3': 'Documentary film + Highlight Film + Vertical reels',
    'exp.1.h4': 'Aerial drone and private online gallery',
    'exp.2.cat': 'SWEET 15',
    'exp.2.title': 'Sweet 15 — Contemporary Celebration',
    'exp.2.lead': 'Customized plans',
    'exp.2.desc': 'Cutting-edge visual direction for quinceañeras. Pre-gala session, complete party coverage, and delivery for social media.',
    'exp.2.h1': 'Pre-session in studio or outdoors',
    'exp.2.h2': 'Coverage of reception, protocol, and party',
    'exp.2.h3': '4K summary video and reels for Instagram/TikTok',
    'exp.2.h4': 'High-end photo album',
    'exp.3.cat': 'GRADUATIONS',
    'exp.3.title': 'Graduations — Class & Family Photography',
    'exp.3.lead': 'Student & Group Plans',
    'exp.3.desc': 'Professional, solemn coverage of graduation ceremonies, individual cap-and-gown photo calling, studio portraits, and premium family photos.',
    'exp.3.h1': 'Individual stage photo with cap and gown',
    'exp.3.h2': 'Family portraits and group photos with classmates',
    'exp.3.h3': 'Mosaics, luxury folders, and wooden wall frames',
    'exp.3.h4': 'High-resolution digital delivery and private gallery',
    'exp.4.cat': 'AUDIOVISUAL',
    'exp.4.title': 'Corporate, Commercials & Brand',
    'exp.4.lead': 'Custom quote',
    'exp.4.desc': 'Audiovisual pieces with commercial pace and strategic narrative for brands, companies, and public figures.',
    'exp.4.h1': 'Corporate video and event recording',
    'exp.4.h2': 'Audiovisual content for advertising campaigns',
    'exp.4.h3': 'Product photography and corporate portraits',
    'exp.4.h4': 'Multi-channel format delivery (16:9, 9:16, 1:1)',

    // Profile
    'profile.eyebrow': 'PROFESSIONAL PROFILE',
    'profile.title': 'More than photography, a complete vision',
    'profile.role': 'Jackson Palacios · Founder & Visual Director',
    'profile.lead': 'Systems engineer and audiovisual producer. Combining technology, creativity, and visual narrative to deliver modern, interactive, and visually stunning experiences.',
    'profile.quote': '“Technology provides us with precision tools; the human gaze and sensitivity deliver the soul of every story.”',
    'profile.supportingLabel': 'ALSO DEVELOPING:',
    'profile.p1': 'Custom digital invitations',
    'profile.p2': 'Web experiences for weddings & events',
    'profile.p3': 'Interactive visual platforms',
    'profile.cta': 'View examples',

    // Contact
    'contact.badge': 'AVAILABILITY & PERSONALIZED ADVICE',
    'contact.eyebrow': 'Direct Contact',
    'contact.title': "Let's bring an unforgettable story to life",
    'contact.lead': 'Tell us about your event, your city, and estimated date. We will reply with a clear, visual proposal aligned with your vision.',
    'contact.wa_cta': 'Start conversation on WhatsApp',
    'contact.socials': 'Or follow us on social media:',
    'contact.location': '📍 Based in Medellín · Full coverage across Colombia and international productions',

    // Packages & Sliders
    'packages.eyebrow': 'Investment & Packages',
    'packages.collections': 'COLLECTIONS',
    'packages.plans_available': 'plans available',
    'packages.view_collections': 'View collections',
    'packages.collapse': 'Collapse',
    'packages.investment': 'INVESTMENT',
    'packages.travel_fee': '+ TRAVEL EXPENSES',
    'packages.view_details': 'View details',
    'packages.details_title': 'Package Details',
    'packages.close': 'Close',
    'packages.included': 'Includes:',
    'packages.deliverables': 'Deliverables:',
    'packages.destination_info': 'Does your story take place outside Medellín? This service is available in Destination mode. Transportation quoted separately.',
    'packages.more_info': 'More info',
    'packages.book_now': 'Book via WhatsApp',
    'packages.explore_collections': 'Explore collections',
    'packages.quote_whatsapp': 'Quote via WhatsApp',

    // Footer
    'footer.brand': 'TECNOJACK',
    'footer.slogan': 'The art of being a pro.',
    'footer.summary': 'TECNOJACK · photography and video with visual direction for weddings, events, and brands.',
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
