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
    'stats.experience': 'Experiencia real en eventos',
    'stats.quality': 'Calidad cinematográfica',
    'stats.art_direction': 'Dirección artística',
    'stats.active_packages': 'Paquetes activos',
    'stats.service_lines': 'Líneas de servicio',
    'stats.completed_projects': 'Proyectos realizados',

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
    'services.solutions.title': 'Soluciones Digitales',
    'services.solutions.desc': 'Páginas y experiencias digitales pensadas para convertir visitas en consultas reales, con una propuesta visual clara y enfocada en ventas.',

    // Points
    'point.Foto + video': 'Foto + video',
    'point.Color cinematográfico': 'Color cinematográfico',
    'point.Entrega para redes y archivo final': 'Entrega para redes y archivo final',
    'point.Retratos de gala': 'Retratos de gala',
    'point.Clips verticales': 'Clips verticales',
    'point.Cobertura de ceremonia y fiesta': 'Cobertura de ceremonia y fiesta',
    'point.Llamado individual': 'Llamado individual',
    'point.Fotos familiares': 'Fotos familiares',
    'point.Paquetes por estudiante o grupo': 'Paquetes por estudiante o grupo',
    'point.Dirección creativa': 'Dirección creativa',
    'point.Sesión exterior': 'Sesión exterior',
    'point.Contenido emocional': 'Contenido emocional',
    'point.Individuales & Generales': 'Individuales & Generales',
    'point.Familiares & Grupos': 'Familiares & Grupos',
    'point.Estudio profesional (2h)': 'Estudio profesional (2h)',
    'point.Entrega digital en alta calidad': 'Entrega digital en alta calidad',
    'point.Videos musicales': 'Videos musicales',
    'point.Corporativo y marca': 'Corporativo y marca',
    'point.Cortometrajes y creativos': 'Cortometrajes y creativos',
    'point.Cobertura de marca': 'Cobertura de marca',
    'point.Clips para redes': 'Clips para redes',
    'point.Registro institucional': 'Registro institucional',
    'point.Landing pages de conversión': 'Landing pages de conversión',
    'point.Presentación de servicios': 'Presentación de servicios',
    'point.Contacto directo por WhatsApp': 'Contacto directo por WhatsApp',

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

    // Service Categories Hero & Configs
    'category.bodas.eyebrow': 'Servicio premium',
    'category.bodas.title': 'Bodas con dirección cinematográfica',
    'category.bodas.desc': 'Historias reales contadas con estética, emoción y precisión visual.',
    'category.bodas.packageTitle': 'Paquetes de boda, de Esencial a Exclusivo',
    'category.bodas.packageLead': 'Elige tu paquete, compara cobertura y entregables, y cuando tengas tu favorito envíanos la fecha y la ciudad para armar la propuesta y reservar tu cupo.',
    'category.bodas.storiesTitle': 'Historias reales de boda',
    'category.bodas.storiesLead': 'Eventos que ya hemos transformado en piezas visuales.',

    'category.quinces.eyebrow': 'Celebración y estilo',
    'category.quinces.title': '15 Años con dirección visual moderna',
    'category.quinces.desc': 'Coberturas contemporáneas, sesiones previas de gala y registro documental de vanguardia.',
    'category.quinces.packageTitle': 'Paquetes para 15 Años',
    'category.quinces.packageLead': 'Desde sesiones previas hasta cobertura completa de fiesta con video 4K y reels para redes.',
    'category.quinces.storiesTitle': 'Celebraciones reales',
    'category.quinces.storiesLead': 'Quinceañeras que vivieron la experiencia TECNOJACK.',

    'category.grados.eyebrow': 'Ceremonias solemnes',
    'category.grados.title': 'Grados escolares y universitarios',
    'category.grados.desc': 'Cobertura organizada, solemne y completa para instituciones, grupos de estudiantes y familias.',
    'category.grados.packageTitle': 'Paquetes de Grado',
    'category.grados.packageLead': 'Opciones individuales por estudiante y planes integrales para colegios y universidades.',
    'category.grados.storiesTitle': 'Ceremonias y promociones',
    'category.grados.storiesLead': 'Momentos de orgullo institucional y familiar capturados con excelencia.',

    'category.sesiones.eyebrow': 'Retrato & Familia',
    'category.sesiones.title': 'Sesiones fotográficas de autor',
    'category.sesiones.desc': 'Estudio profesional y exteriores con dirección visual para retratos, familias, parejas y marcas personales.',
    'category.sesiones.packageTitle': 'Paquetes de Sesiones',
    'category.sesiones.packageLead': 'Elige tu tipo de sesión y agenda tu fecha con anticipación.',
    'category.sesiones.storiesTitle': 'Galería de sesiones',
    'category.sesiones.storiesLead': 'Retratos de estudio y exteriores con luz natural y estética editorial.',

    'category.videos.eyebrow': 'Portafolio audiovisual',
    'category.videos.title': 'Producción audiovisual con enfoque cinéfilo',
    'category.videos.desc': 'Videos musicales, bodas y proyectos creativos con dirección, color grading y entrega profesional.',
    'category.videos.packageTitle': 'Paquetes de Producción en Video',
    'category.videos.packageLead': 'Formatos de cine, comerciales y narrativas visuales de alto impacto.',
    'category.videos.storiesTitle': 'Producciones en video',
    'category.videos.storiesLead': 'Piezas comerciales, musicales y narrativas.',

    'category.corporativos.eyebrow': 'Empresas & Marcas',
    'category.corporativos.title': 'Producción audiovisual corporativa',
    'category.corporativos.desc': 'Cobertura de eventos empresariales, videos institucionales, comerciales y contenido de marca de alto impacto.',
    'category.corporativos.packageTitle': 'Soluciones Corporativas',
    'category.corporativos.packageLead': 'Producciones audiovisuales diseñadas con visión estratégica y comercial.',
    'category.corporativos.storiesTitle': 'Proyectos corporativos',
    'category.corporativos.storiesLead': 'Marcas e instituciones que confían en nuestra dirección visual.',

    'category.preboda.eyebrow': 'Sesiones de Pareja',
    'category.preboda.title': 'Sesiones de Preboda y Postboda',
    'category.preboda.desc': 'Momentos íntimos y naturales previos y posteriores al gran día en locaciones inspiradoras.',
    'category.preboda.packageTitle': 'Paquetes Preboda y Postboda',
    'category.preboda.packageLead': 'Fotografía y cinematografía de autor para parejas.',
    'category.preboda.storiesTitle': 'Historias de pareja',
    'category.preboda.storiesLead': 'Conexión, complicidad y paisajes increíbles.',

    // Comparison Table
    'compare.badge': 'COMPARATIVA DE PLANES',
    'compare.title': 'Tabla Comparativa de Paquetes Híbridos',
    'compare.lead': 'Compara de manera directa las características clave de cada uno de nuestros planes principales.',
    'compare.scroll_hint': 'Desliza horizontalmente para ver todos los planes',
    'compare.plan': 'Plan',
    'compare.investment': 'Inversión',
    'compare.hours': 'Horas de Cobertura',
    'compare.team': 'Equipo Humano',
    'compare.photos': 'Fotografías Editadas',
    'compare.video': 'Entregables Video',
    'compare.drone': 'Drone Aéreo',
    'compare.album': 'Álbum Físico',
    'compare.preboda': 'Sesión Preboda',
    'compare.postboda': 'Sesión Postboda',
    'compare.reels': 'Reels / Redes',
    'compare.gallery': 'Galería Online',
    'compare.priority': 'Entrega Prioritaria',
    'compare.viaticos': 'Viáticos',
    'compare.recommended': 'MÁS RECOMENDADO',
    'compare.exclusive': 'EXCLUSIVO',

    // Modal
    'modal.detail_experience': 'Experiencia de detalle',
    'modal.back_to_detail': 'Volver al detalle',
    'modal.close': 'Cerrar',
    'modal.request': 'Solicitar',
    'modal.customize': 'Personalizar solicitud',
    'modal.load_more': 'Cargar más',
    'modal.loading_images': 'Cargando imágenes...',
    'modal.error_images': 'No fue posible cargar la galería. Se muestra la imagen por defecto.',
    'modal.empty_images': 'Aún no hay imágenes publicadas para esta carpeta.',
    'modal.contact_data': 'Datos de contacto',
    'modal.complete_data': 'Completa los datos para continuar',
    'modal.name': 'Nombre',
    'modal.name_ph': 'Tu nombre completo',
    'modal.phone': 'Teléfono / WhatsApp',
    'modal.phone_ph': 'Tu número de contacto',
    'modal.city': 'Ciudad',
    'modal.city_ph': 'Ciudad del evento',
    'modal.date': 'Fecha estimada',
    'modal.venue': 'Lugar / Locación',
    'modal.venue_ph': 'Salón, finca, iglesia o locación',
    'modal.guests': 'Invitados estimados',
    'modal.guests_ph': 'Ej. 120',
    'modal.notes': 'Notas especiales',
    'modal.notes_ph': 'Cuéntanos qué quieres priorizar en tu evento.',
    'modal.request_type': 'Tipo de solicitud',
    'modal.request_mode_desc': 'Decide si quieres usar el paquete base o armar una versión personalizada.',
    'modal.base_package': 'Paquete base cerrado',
    'modal.custom_package': 'Armar propuesta a la medida',
    'modal.base_options': 'Opciones de cotización base',
    'modal.additional_services': 'Servicios adicionales disponibles',
    'modal.estimated_total': 'Total estimado',
    'modal.send_whatsapp': 'Enviar por WhatsApp',
    'modal.copy_summary': 'Copiar resumen',
    'modal.summary_copied': '¡Resumen copiado!',

    // Exhibition
    'exhibit.badge': 'EXHIBICIÓN DE TRABAJOS',
    'exhibit.eyebrow': 'CLIENTES & HISTORIAS REALES',
    'exhibit.load_more': 'Cargar más historias',
    'exhibit.view_gallery': 'Ver galería completa',
    'exhibit.no_images': 'Sin imágenes publicadas.',

    // About Me
    'about.eyebrow': 'Jackson Palacios',
    'about.title': 'Productor Audiovisual & Desarrollador de Software',
    'about.subtitle': 'Productor audiovisual colombiano, con raíces en el Chocó. Transformo ideas en historias visuales con intención, estética y emoción.',
    'about.desc': 'Combino fotografía, video y desarrollo digital para crear experiencias visuales para bodas, marcas y artistas que buscan algo bien hecho.',
    'about.quote': '“No solo capturo momentos, creo historias que permanecen en el tiempo.”',
    'about.cta.quote': 'Cotizar mi proyecto',
    'about.cta.work': 'Ver mi trabajo',
    'about.proof1': '+10 años de experiencia',
    'about.proof2': 'Bodas, marcas y artistas',
    'about.proof3': 'Producción audiovisual completa',
    'about.approach': 'Enfoque',
    'about.deliverables_title': 'Lo que recibes',
    'about.deliverables_desc': 'Una experiencia completa: dirección, estética, emoción y entrega impecable.',
    'about.team_title': 'Equipo y Cobertura',
    'about.process_title': 'Flujo de Trabajo',

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
    'stats.experience': 'Real Event Experience',
    'stats.quality': 'Cinematic Quality',
    'stats.art_direction': 'Artistic Direction',
    'stats.active_packages': 'Active Packages',
    'stats.service_lines': 'Service Lines',
    'stats.completed_projects': 'Completed Projects',

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
    'services.solutions.title': 'Digital Solutions',
    'services.solutions.desc': 'High-conversion digital landing pages and experiences designed to turn visitors into real bookings with pro visual clarity.',

    // Points
    'point.Foto + video': 'Photo + Video',
    'point.Color cinematográfico': 'Cinematic Color Grading',
    'point.Entrega para redes y archivo final': 'Social Media & Final Archive Delivery',
    'point.Retratos de gala': 'Gala Portraits',
    'point.Clips verticales': 'Vertical Clips',
    'point.Cobertura de ceremonia y fiesta': 'Ceremony & Party Coverage',
    'point.Llamado individual': 'Individual Stage Calling',
    'point.Fotos familiares': 'Family Photos',
    'point.Paquetes por estudiante o grupo': 'Packages per Student or Group',
    'point.Dirección creativa': 'Creative Direction',
    'point.Sesión exterior': 'Outdoor Session',
    'point.Contenido emocional': 'Emotional Content',
    'point.Individuales & Generales': 'Individual & General Portraits',
    'point.Familiares & Grupos': 'Family & Group Portraits',
    'point.Estudio profesional (2h)': 'Professional Studio (2h)',
    'point.Entrega digital en alta calidad': 'High-Quality Digital Delivery',
    'point.Videos musicales': 'Music Videos',
    'point.Corporativo y marca': 'Corporate & Brand',
    'point.Cortometrajes y creativos': 'Short Films & Creatives',
    'point.Cobertura de marca': 'Brand Coverage',
    'point.Clips para redes': 'Social Media Clips',
    'point.Registro institucional': 'Institutional Documentation',
    'point.Landing pages de conversión': 'High-Conversion Landing Pages',
    'point.Presentación de servicios': 'Service Showcase',
    'point.Contacto directo por WhatsApp': 'Direct WhatsApp Contact',

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
    'exp.3.h3': 'Mosaicos, luxury folders, and wooden wall frames',
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

    // Service Categories Hero & Configs
    'category.bodas.eyebrow': 'Premium Service',
    'category.bodas.title': 'Weddings with Cinematic Direction',
    'category.bodas.desc': 'Real stories told with aesthetics, emotion, and visual precision.',
    'category.bodas.packageTitle': 'Wedding Collections, from Essential to Exclusive',
    'category.bodas.packageLead': 'Choose your collection, compare coverage and deliverables, and send us your date and venue to check availability.',
    'category.bodas.storiesTitle': 'Real Wedding Stories',
    'category.bodas.storiesLead': 'Love celebrations transformed into timeless cinematic memories.',

    'category.quinces.eyebrow': 'Celebration & Style',
    'category.quinces.title': 'Sweet 15 with Modern Visual Direction',
    'category.quinces.desc': 'Contemporary coverage, gala pre-sessions, and avant-garde documentary recording.',
    'category.quinces.packageTitle': 'Sweet 15 Collections',
    'category.quinces.packageLead': 'From pre-sessions to full party coverage with 4K cinema video and social media reels.',
    'category.quinces.storiesTitle': 'Real Celebrations',
    'category.quinces.storiesLead': 'Young women who lived the TECNOJACK experience.',

    'category.grados.eyebrow': 'Solemn Ceremonies',
    'category.grados.title': 'School & University Graduations',
    'category.grados.desc': 'Organized, solemn, and complete coverage for institutions, student groups, and families.',
    'category.grados.packageTitle': 'Graduation Packages',
    'category.grados.packageLead': 'Individual student options and full institutional packages for schools and universities.',
    'category.grados.storiesTitle': 'Ceremonies & Graduations',
    'category.grados.storiesLead': 'Institutional and family pride captured with photographic excellence.',

    'category.sesiones.eyebrow': 'Portrait & Family',
    'category.sesiones.title': 'Author Portrait Sessions',
    'category.sesiones.desc': 'Professional studio and outdoor locations with visual direction for portraits, families, couples, and personal brands.',
    'category.sesiones.packageTitle': 'Session Packages',
    'category.sesiones.packageLead': 'Choose your session type and book your date in advance.',
    'category.sesiones.storiesTitle': 'Sessions Gallery',
    'category.sesiones.storiesLead': 'Studio and outdoor portraits with natural light and editorial style.',

    'category.videos.eyebrow': 'Audiovisual Portfolio',
    'category.videos.title': 'Audiovisual Production with Cinematic Focus',
    'category.videos.desc': 'Music videos, weddings, and creative projects with creative direction, color grading, and commercial delivery.',
    'category.videos.packageTitle': 'Video Production Packages',
    'category.videos.packageLead': 'Cinema formats, commercial campaigns, and impactful visual storytelling.',
    'category.videos.storiesTitle': 'Video Productions',
    'category.videos.storiesLead': 'Commercial, musical, and narrative video pieces.',

    'category.corporativos.eyebrow': 'Companies & Brands',
    'category.corporativos.title': 'Corporate Audiovisual Production',
    'category.corporativos.desc': 'Corporate event coverage, institutional films, commercials, and high-impact brand content.',
    'category.corporativos.packageTitle': 'Corporate Solutions',
    'category.corporativos.packageLead': 'Audiovisual productions aligned with your strategic and commercial goals.',
    'category.corporativos.storiesTitle': 'Corporate Projects',
    'category.corporativos.storiesLead': 'Brands and institutions that trust our visual direction.',

    'category.preboda.eyebrow': 'Couple Sessions',
    'category.preboda.title': 'Engagement & Post-Wedding Sessions',
    'category.preboda.desc': 'Intimate and natural moments before and after the big day in inspiring locations.',
    'category.preboda.packageTitle': 'Engagement & Post-Wedding Packages',
    'category.preboda.packageLead': 'Fine art photography and cinematic film for couples.',
    'category.preboda.storiesTitle': 'Couple Stories',
    'category.preboda.storiesLead': 'Connection, warmth, and breathtaking landscapes.',

    // Comparison Table
    'compare.badge': 'PACKAGE COMPARISON',
    'compare.title': 'Hybrid Wedding Packages Comparison',
    'compare.lead': 'Directly compare key features across our primary packages.',
    'compare.scroll_hint': 'Swipe horizontally to view all plans',
    'compare.plan': 'Plan',
    'compare.investment': 'Investment',
    'compare.hours': 'Coverage Hours',
    'compare.team': 'Production Crew',
    'compare.photos': 'Edited Photos',
    'compare.video': 'Video Deliverables',
    'compare.drone': 'Aerial Drone',
    'compare.album': 'Printed Album',
    'compare.preboda': 'Pre-Wedding Session',
    'compare.postboda': 'Post-Wedding Session',
    'compare.reels': 'Reels & Socials',
    'compare.gallery': 'Online Gallery',
    'compare.priority': 'Priority Delivery',
    'compare.viaticos': 'Travel Expenses',
    'compare.recommended': 'MOST RECOMMENDED',
    'compare.exclusive': 'EXCLUSIVE',

    // Modal
    'modal.detail_experience': 'Package Details',
    'modal.back_to_detail': 'Back to details',
    'modal.close': 'Close',
    'modal.request': 'Book Package',
    'modal.customize': 'Customize Request',
    'modal.load_more': 'Load more',
    'modal.loading_images': 'Loading images...',
    'modal.error_images': 'Could not load gallery. Default image displayed.',
    'modal.empty_images': 'No images published yet for this folder.',
    'modal.contact_data': 'Contact Information',
    'modal.complete_data': 'Complete details to continue',
    'modal.name': 'Full Name',
    'modal.name_ph': 'Your full name',
    'modal.phone': 'Phone / WhatsApp',
    'modal.phone_ph': 'Your contact phone',
    'modal.city': 'City',
    'modal.city_ph': 'Event city',
    'modal.date': 'Estimated Date',
    'modal.venue': 'Venue / Location',
    'modal.venue_ph': 'Hall, estate, church, or venue',
    'modal.guests': 'Estimated Guests',
    'modal.guests_ph': 'E.g. 120',
    'modal.notes': 'Special Notes',
    'modal.notes_ph': 'Tell us what you want to prioritize for your event.',
    'modal.request_type': 'Request Type',
    'modal.request_mode_desc': 'Decide whether you want the fixed base package or a custom proposal.',
    'modal.base_package': 'Fixed base package',
    'modal.custom_package': 'Build custom proposal',
    'modal.base_options': 'Base quote options',
    'modal.additional_services': 'Available Extra Services',
    'modal.estimated_total': 'Estimated Total',
    'modal.send_whatsapp': 'Send via WhatsApp',
    'modal.copy_summary': 'Copy summary',
    'modal.summary_copied': 'Summary copied!',

    // Exhibition
    'exhibit.badge': 'WORK EXHIBITION',
    'exhibit.eyebrow': 'CLIENTS & REAL STORIES',
    'exhibit.load_more': 'Load more stories',
    'exhibit.view_gallery': 'View full gallery',
    'exhibit.no_images': 'No images published.',

    // About Me
    'about.eyebrow': 'Jackson Palacios',
    'about.title': 'Audiovisual Producer & Software Developer',
    'about.subtitle': 'Colombian audiovisual producer, with roots in Chocó. I transform ideas into visual stories with intention, aesthetics, and emotion.',
    'about.desc': 'I combine photography, video, and digital development to craft visual experiences for weddings, brands, and artists seeking excellence.',
    'about.quote': '“I do not merely capture moments; I craft stories that endure through time.”',
    'about.cta.quote': 'Quote my project',
    'about.cta.work': 'View my work',
    'about.proof1': '+10 years of experience',
    'about.proof2': 'Weddings, brands & artists',
    'about.proof3': 'Full audiovisual production',
    'about.approach': 'Approach',
    'about.deliverables_title': 'What you receive',
    'about.deliverables_desc': 'A complete experience: direction, aesthetics, emotion, and flawless delivery.',
    'about.team_title': 'Team & Coverage',
    'about.process_title': 'Workflow & Process',

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

  translateCategoryConfig<T extends { hero: { eyebrow: string; title: string; description: string; highlights?: string[] }; packageTitle: string; packageLead: string; storiesTitle: string; storiesLead: string }>(config: T, category: string): T {
    if (this.currentLang() === 'es') return config;
    const cat = category.toLowerCase();
    return {
      ...config,
      hero: {
        ...config.hero,
        eyebrow: this.t(`category.${cat}.eyebrow`, config.hero.eyebrow),
        title: this.t(`category.${cat}.title`, config.hero.title),
        description: this.t(`category.${cat}.desc`, config.hero.description),
        highlights: config.hero.highlights?.map(h => this.t(`point.${h}`, this.translateDeliverable(h))) ?? []
      },
      packageTitle: this.t(`category.${cat}.packageTitle`, config.packageTitle),
      packageLead: this.t(`category.${cat}.packageLead`, config.packageLead),
      storiesTitle: this.t(`category.${cat}.storiesTitle`, config.storiesTitle),
      storiesLead: this.t(`category.${cat}.storiesLead`, config.storiesLead),
    };
  }

  translateAccordionTitle(title: string): string {
    if (this.currentLang() === 'es') return title;
    const map: Record<string, string> = {
      'THE FULL EXPERIENCE': 'THE FULL EXPERIENCE',
      'Boda híbrida (Foto + video)': 'Hybrid Wedding (Photo + Video)',
      'Fotografía de bodas': 'Wedding Photography',
      'Video de bodas': 'Wedding Cinema',
      'Boda civil': 'Civil Wedding',
      'Petición de mano': 'Proposal & Engagement',
      'Sesión de preboda': 'Pre-Wedding Session',
      'Sesión postboda': 'Post-Wedding Session',
      'Cobertura mixta (foto + video)': 'Mixed Coverage (Photo + Video)',
      'Fotografía de quince': 'Sweet 15 Photography',
      'Video de quince': 'Sweet 15 Cinema',
      'Foto + video para 15 años': 'Photo + Video Sweet 15',
      'Fotografía para 15 años': 'Sweet 15 Photography',
      'Video para 15 años': 'Sweet 15 Cinema',
      'Sesión previa de 15 años': 'Sweet 15 Pre-Session',
      'Fotografía de grado': 'Graduation Photography',
      'Video de grados': 'Graduation Video',
      'Sesiones individuales y generales': 'Individual & General Sessions',
      'Sesiones familiares': 'Family Sessions',
      'Sesiones especiales': 'Special Sessions',
      'Video institucional': 'Corporate & Brand Film',
      'Contenido para redes': 'Social Media Content',
      'Eventos corporativos': 'Corporate Events',
      'Marca personal': 'Personal Brand',
    };
    return map[title] ?? title;
  }

  translateDeliverable(text: string): string {
    if (this.currentLang() === 'es' || !text) return text;
    let t = text;
    t = t.replace(/Hasta (\d+) horas/gi, 'Up to $1 hours');
    t = t.replace(/Hasta (\d+) fotos editadas/gi, 'Up to $1 edited photos');
    t = t.replace(/Hasta (\d+) fotos/gi, 'Up to $1 photos');
    t = t.replace(/Más de (\d+) fotos editadas/gi, 'More than $1 edited photos');
    t = t.replace(/Más de (\d+) fotos/gi, 'More than $1 photos');
    t = t.replace(/Ilimitadas/gi, 'Unlimited');
    t = t.replace(/Por separado/gi, 'Quoted separately');
    t = t.replace(/Opcional/gi, 'Optional');
    t = t.replace(/No incluida/gi, 'Not included');
    t = t.replace(/Galería online privada/gi, 'Private online gallery');
    t = t.replace(/Galería VIP de por vida/gi, 'Lifetime VIP gallery');
    t = t.replace(/Galería VIP permanente/gi, 'Permanent VIP gallery');
    t = t.replace(/1 Fotógrafo \+ 1 Videógrafo \+ Asistente/gi, '1 Photographer + 1 Videographer + Assistant');
    t = t.replace(/1 Fotógrafo \+ 1 Videógrafo/gi, '1 Photographer + 1 Videographer');
    t = t.replace(/2 Fotógrafos \+ 2 Videógrafos \+ Asistente/gi, '2 Photographers + 2 Videographers + Assistant');
    t = t.replace(/Fotógrafo Principal \+ Videógrafo Principal \+ Asistente/gi, 'Lead Photographer + Lead Videographer + Assistant');
    t = t.replace(/1 Fotógrafo/gi, '1 Photographer');
    t = t.replace(/1 Videógrafo/gi, '1 Videographer');
    t = t.replace(/Dron aéreo incluido/gi, 'Aerial drone included');
    t = t.replace(/Álbum fotográfico impreso/gi, 'Printed photo album');
    t = t.replace(/Sesión Preboda estándar/gi, 'Standard Pre-Wedding Session');
    t = t.replace(/Sesión Preboda Premium/gi, 'Premium Pre-Wedding Session');
    t = t.replace(/Reels para redes/gi, 'Reels for social media');
    t = t.replace(/Reel para redes/gi, 'Reel for social media');
    t = t.replace(/Cotización personalizada/gi, 'Custom quote');
    return t;
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
