import { SimpleService } from '../models/simple-service.model';

export const SIMPLE_SERVICES_MOCK: SimpleService[] = [

  // ── FOTOGRAFÍA ────────────────────────────────────────────────
  {
    id: 'foto-sesion-personal',
    category: 'fotografia',
    name: 'Sesión personal',
    shortDescription: 'Fotos pensadas para que te veas como realmente quieres proyectarte.',
    description:
      'Una sesión diseñada para capturar tu esencia y darte imágenes que realmente puedas usar: redes sociales, perfil o recuerdos personales con estilo.',
    basePrice: 180000,
    priceLabel: 'Desde $180.000 COP',
    includes: [
      'Sesión de 1 a 2 horas en locación',
      'Dirección completa de poses (no necesitas experiencia)',
      '20 fotografías editadas listas para redes y uso personal',
      'Asesoría básica de outfits y estilo',
      'Entrega digital organizada en 5 días hábiles'
    ],
    image: 'assets/images/galery/M&D-18.jpg'
  },
  {
    id: 'foto-sesion-redes',
    category: 'fotografia',
    name: 'Sesión para redes',
    shortDescription: 'Contenido fotográfico listo para publicar y crecer en redes.',
    description:
      'Pensado para creadores y marcas personales que necesitan fotos que conecten y generen impacto en redes sociales.',
    basePrice: 250000,
    priceLabel: 'Desde $250.000 COP',
    includes: [
      'Sesión de hasta 2 horas en diferentes espacios',
      'Dirección enfocada en contenido para Instagram y TikTok',
      '35 fotografías editadas listas para publicar',
      'Formatos vertical y cuadrado optimizados',
      'Ideal para múltiples outfits y estilos',
      'Entrega en 5 días hábiles'
    ],
    notes: ['Puedes llegar con outfits preparados para mayor variedad.'],
    image: 'assets/images/galery/M&D-22.jpg'
  },
  {
    id: 'foto-retrato-profesional',
    category: 'fotografia',
    name: 'Retrato profesional',
    shortDescription: 'La imagen que necesitas para verte profesional desde el primer vistazo.',
    description:
      'Ideal para perfiles profesionales, LinkedIn, portafolios o presentación personal con un acabado limpio y confiable.',
    basePrice: 150000,
    priceLabel: 'Desde $150.000 COP',
    includes: [
      'Sesión de 45 minutos',
      'Fondo neutro o entorno profesional',
      '10 retratos editados en alta calidad',
      'Versiones listas para CV, redes o presentaciones',
      'Entrega rápida en 3 días hábiles'
    ],
    image: 'assets/images/galery/M&D-29.jpg'
  },

  // ── VIDEO ─────────────────────────────────────────────────────
  {
    id: 'video-presentacion-personal',
    category: 'video',
    name: 'Video presentación personal',
    shortDescription: 'Un video corto para presentarte y generar confianza.',
    description:
      'Video de presentación personal de 60 a 90 segundos. Ideal para redes, portafolios o páginas web. Con guión básico, dirección y edición incluida.',
    basePrice: 280000,
    priceLabel: 'Desde $280.000 COP',
    includes: [
      'Grabación de hasta 2 horas',
      'Apoyo en guión o estructura del mensaje',
      'Video editado de 60 a 90 segundos',
      'Formato horizontal y vertical',
      'Entrega digital en 7 días hábiles'
    ],
    image: 'assets/images/fotos/M&D-12.jpg'
  },
  {
    id: 'video-mensaje',
    category: 'video',
    name: 'Video mensaje',
    shortDescription: 'Un mensaje directo y bien grabado para cualquier ocasión.',
    description:
      'Grabación de un video mensaje para fechas especiales, comunicados, felicitaciones o anuncios. Producción sencilla y entrega rápida.',
    basePrice: 150000,
    priceLabel: 'Desde $150.000 COP',
    includes: [
      'Grabación de hasta 1 hora',
      'Video final de hasta 2 minutos',
      'Edición básica con música de fondo si aplica',
      'Formato para WhatsApp, redes o proyección',
      'Entrega en 3 días hábiles'
    ],
    image: 'assets/images/galery/M&D-15.jpg'
  },
  {
    id: 'video-reel-basico',
    category: 'video',
    name: 'Reel básico',
    shortDescription: 'Un reel dinámico para mostrar lo mejor de ti o tu proyecto.',
    description:
      'Producción de un reel vertical de 30 a 60 segundos, pensado para Instagram o TikTok. Incluye música, transiciones y edición con ritmo.',
    basePrice: 200000,
    priceLabel: 'Desde $200.000 COP',
    includes: [
      'Grabación de hasta 2 horas',
      'Reel de 30 a 60 segundos',
      'Edición con música y transiciones',
      'Formato vertical 9:16',
      'Entrega en 5 días hábiles'
    ],
    notes: ['Se puede grabar en exteriores o en estudio con costo adicional.'],
    image: 'assets/images/galery/M&D-32.jpg'
  },

  // ── CONTENIDO ─────────────────────────────────────────────────
  {
    id: 'contenido-plan-mensual',
    category: 'contenido',
    name: 'Plan de contenido mensual',
    shortDescription: 'Creación constante de contenido profesional para redes sociales.',
    description:
      'Servicio diseñado para marcas personales, emprendedores y negocios que necesitan contenido constante para redes sociales. Incluye sesiones periódicas y entrega continua de material optimizado.',
    basePrice: 400000,
    priceLabel: 'Desde $400.000 COP mensual',
    includes: [
      '1 o 2 sesiones mensuales',
      'Producción de fotos y video',
      'Dirección básica de contenido',
      'Edición optimizada para redes',
      'Asesoría básica en contenido',
      '8 a 20 piezas mensuales (fotos y/o reels)',
      'Archivos optimizados para Instagram y TikTok',
      'Entrega digital organizada'
    ],
    addOns: [
      { id: 'contenido-plan-mensual-reel-extra', label: 'Reel adicional', priceLabel: '$100.000 COP', price: 100000 },
      { id: 'contenido-plan-mensual-direccion-avanzada', label: 'Dirección creativa avanzada', priceLabel: '$150.000 COP', price: 150000 },
      { id: 'contenido-plan-mensual-guion', label: 'Guion y storytelling', priceLabel: '$120.000 COP', price: 120000 },
      { id: 'contenido-plan-mensual-express', label: 'Edición express (24h)', priceLabel: '$80.000 COP', price: 80000 }
    ],
    image: 'assets/images/galery/M&D-23.jpg'
  },
  {
    id: 'contenido-express',
    category: 'contenido',
    name: 'Contenido express',
    shortDescription: 'Contenido rápido y funcional para redes sociales.',
    description:
      'Servicio ágil para generar contenido sencillo pero efectivo en poco tiempo.',
    basePrice: 120000,
    priceLabel: 'Desde $120.000 COP',
    includes: [
      'Grabación rápida (máx 1 hora)',
      'Producción ligera',
      'Edición básica',
      '3 a 6 piezas de contenido',
      'Formato vertical'
    ],
    addOns: [
      { id: 'contenido-express-reel-extra', label: 'Reel adicional', priceLabel: '$100.000 COP', price: 100000 },
      { id: 'contenido-express-direccion-avanzada', label: 'Dirección creativa avanzada', priceLabel: '$150.000 COP', price: 150000 },
      { id: 'contenido-express-guion', label: 'Guion y storytelling', priceLabel: '$120.000 COP', price: 120000 },
      { id: 'contenido-express-edicion-express', label: 'Edición express (24h)', priceLabel: '$80.000 COP', price: 80000 }
    ],
    image: 'assets/images/galery/M&D-23.jpg'
  },
  {
    id: 'contenido-reel-profesional',
    category: 'contenido',
    name: 'Reel profesional',
    shortDescription: 'Video corto optimizado para impacto en redes sociales.',
    description:
      'Producción de video corto con enfoque en engagement y estética profesional para redes sociales.',
    basePrice: 150000,
    priceLabel: 'Desde $150.000 COP',
    includes: [
      'Grabación en locación o espacio controlado',
      'Dirección de contenido',
      'Edición dinámica',
      'Música y ritmo adaptado a tendencias',
      '1 video vertical de 30 a 60 segundos',
      'Formato optimizado para redes'
    ],
    addOns: [
      { id: 'contenido-reel-profesional-reel-extra', label: 'Reel adicional', priceLabel: '$100.000 COP', price: 100000 },
      { id: 'contenido-reel-profesional-direccion-avanzada', label: 'Dirección creativa avanzada', priceLabel: '$150.000 COP', price: 150000 },
      { id: 'contenido-reel-profesional-guion', label: 'Guion y storytelling', priceLabel: '$120.000 COP', price: 120000 },
      { id: 'contenido-reel-profesional-edicion-express', label: 'Edición express (24h)', priceLabel: '$80.000 COP', price: 80000 }
    ],
    image: 'assets/images/galery/M&D-19.jpg'
  },
  {
    id: 'contenido-pack',
    category: 'contenido',
    name: 'Pack de contenido',
    shortDescription: 'Producción de múltiples piezas en una sola sesión.',
    description:
      'Ideal para crear contenido en lote para redes sociales en una sola jornada de producción.',
    basePrice: 300000,
    priceLabel: 'Desde $300.000 COP',
    includes: [
      'Sesión de 2 a 4 horas',
      'Dirección básica',
      'Producción optimizada por bloques',
      '10 a 25 piezas de contenido',
      'Fotos y/o videos'
    ],
    addOns: [
      { id: 'contenido-pack-reel-extra', label: 'Reel adicional', priceLabel: '$100.000 COP', price: 100000 },
      { id: 'contenido-pack-direccion-avanzada', label: 'Dirección creativa avanzada', priceLabel: '$150.000 COP', price: 150000 },
      { id: 'contenido-pack-guion', label: 'Guion y storytelling', priceLabel: '$120.000 COP', price: 120000 },
      { id: 'contenido-pack-edicion-express', label: 'Edición express (24h)', priceLabel: '$80.000 COP', price: 80000 }
    ],
    image: 'assets/images/galery/M&D-21.jpg'
  },

  // ── PRODUCCIÓN ────────────────────────────────────────────────
  {
    id: 'prod-direccion-creativa',
    category: 'produccion',
    name: 'Dirección creativa',
    shortDescription: 'Antes de grabar, hay que saber qué contar.',
    description:
      'Te ayudo a construir la idea, el estilo y la narrativa para que tu proyecto tenga sentido y destaque.',
    basePrice: 200000,
    priceLabel: 'Desde $200.000 COP',
    includes: [
      'Desarrollo de concepto',
      'Definición de estilo visual',
      'Planeación creativa completa',
      'Referencias visuales claras',
      'Documento guía del proyecto'
    ],
    addOns: [
      { id: 'prod-direccion-creativa-storyboard', label: 'Storyboard visual', priceLabel: '$120.000 COP', price: 120000 },
      { id: 'prod-direccion-creativa-guion-tecnico', label: 'Guion técnico', priceLabel: '$100.000 COP', price: 100000 },
      { id: 'prod-direccion-creativa-revision', label: 'Ronda adicional de ajustes', priceLabel: '$80.000 COP', price: 80000 },
      { id: 'prod-direccion-creativa-entrega-express', label: 'Entrega express', priceLabel: '$70.000 COP', price: 70000 }
    ],
    image: 'assets/images/fotos/main.jpg'
  },
  {
    id: 'prod-guion-storytelling',
    category: 'produccion',
    name: 'Guion y storytelling',
    shortDescription: 'Una buena historia cambia todo.',
    description:
      'Estructuro tu idea para que tenga impacto, claridad y conexión emocional.',
    basePrice: 150000,
    priceLabel: 'Desde $150.000 COP',
    includes: [
      'Desarrollo de idea',
      'Estructura narrativa clara',
      'Adaptación al objetivo del cliente',
      'Guion listo para producción'
    ],
    addOns: [
      { id: 'prod-guion-storytelling-storyboard', label: 'Storyboard base', priceLabel: '$100.000 COP', price: 100000 },
      { id: 'prod-guion-storytelling-version-corta', label: 'Versión corta para reel', priceLabel: '$80.000 COP', price: 80000 },
      { id: 'prod-guion-storytelling-adaptacion', label: 'Adaptación a formato comercial', priceLabel: '$90.000 COP', price: 90000 },
      { id: 'prod-guion-storytelling-ajustes', label: 'Ronda adicional de ajustes', priceLabel: '$70.000 COP', price: 70000 }
    ],
    image: 'assets/images/galery/M&D-18.jpg'
  },
  {
    id: 'prod-video-referencia',
    category: 'produccion',
    name: 'Video de referencia',
    shortDescription: 'Mira tu video antes de grabarlo.',
    description:
      'Creamos una visualización previa para alinear expectativas y asegurar el resultado.',
    basePrice: 180000,
    priceLabel: 'Desde $180.000 COP',
    includes: [
      'Mood visual',
      'Referencias de estilo',
      'Estructura del video',
      'Presentación o video guía'
    ],
    addOns: [
      { id: 'prod-video-referencia-storyboard', label: 'Storyboard visual', priceLabel: '$100.000 COP', price: 100000 },
      { id: 'prod-video-referencia-presentacion-editable', label: 'Presentación editable', priceLabel: '$60.000 COP', price: 60000 },
      { id: 'prod-video-referencia-version-extra', label: 'Versión adicional de referencia', priceLabel: '$90.000 COP', price: 90000 },
      { id: 'prod-video-referencia-entrega-express', label: 'Entrega express', priceLabel: '$70.000 COP', price: 70000 }
    ],
    image: 'assets/images/galery/M&D-29.jpg'
  },
  {
    id: 'prod-cinematografica',
    category: 'produccion',
    name: 'Producción cinematográfica',
    shortDescription: 'No es solo un video, es una producción completa.',
    description:
      'Un servicio premium donde todo se cuida: narrativa, estética y ejecución.',
    basePrice: 850000,
    priceLabel: 'Desde $850.000 COP',
    includes: [
      'Producción avanzada',
      'Dirección artística',
      'Grabación en múltiples locaciones',
      'Equipo profesional',
      'Video principal + versión redes'
    ],
    addOns: [
      { id: 'prod-cinematografica-drone', label: 'Drone', priceLabel: '$100.000 COP', price: 100000 },
      { id: 'prod-cinematografica-hora-extra', label: 'Hora adicional', priceLabel: '$50.000 COP', price: 50000 },
      { id: 'prod-cinematografica-reel-extra', label: 'Reel adicional', priceLabel: '$100.000 COP', price: 100000 },
      { id: 'prod-cinematografica-color', label: 'Color grading avanzado', priceLabel: '$120.000 COP', price: 120000 }
    ],
    image: 'assets/images/fotos/M&D-31.jpg'
  },
  {
    id: 'prod-video-promocional',
    category: 'produccion',
    name: 'Video promocional',
    shortDescription: 'Video para promocionar productos o servicios.',
    description:
      'Producción audiovisual enfocada en ventas y posicionamiento.',
    basePrice: 300000,
    priceLabel: 'Desde $300.000 COP',
    includes: [
      'Grabación en locación',
      'Edición dinámica',
      'Dirección básica',
      'Video principal',
      'Versión para redes'
    ],
    addOns: [
      { id: 'prod-video-promocional-locacion-extra', label: 'Locación adicional', priceLabel: '$120.000 COP', price: 120000 },
      { id: 'prod-video-promocional-hora-extra', label: 'Hora adicional', priceLabel: '$50.000 COP', price: 50000 },
      { id: 'prod-video-promocional-version-vertical', label: 'Versión vertical adicional', priceLabel: '$80.000 COP', price: 80000 },
      { id: 'prod-video-promocional-subtitulos', label: 'Subtítulos integrados', priceLabel: '$60.000 COP', price: 60000 }
    ],
    notes: [
      'Alquiler de estudio: costo variable'
    ],
    image: 'assets/images/galery/M&D-29.jpg'
  },
  {
    id: 'prod-entrevista-testimonio',
    category: 'produccion',
    name: 'Video testimonial',
    shortDescription: 'Testimonios reales para fortalecer tu marca.',
    description:
      'Producción de videos con clientes o usuarios para generar confianza.',
    basePrice: 250000,
    priceLabel: 'Desde $250.000 COP',
    includes: [
      'Grabación dirigida',
      'Iluminación básica',
      'Edición profesional',
      'Video de 1 a 3 minutos'
    ],
    addOns: [
      { id: 'prod-entrevista-testimonio-version-corta', label: 'Versión corta para redes', priceLabel: '$80.000 COP', price: 80000 },
      { id: 'prod-entrevista-testimonio-subtitulos', label: 'Subtítulos integrados', priceLabel: '$60.000 COP', price: 60000 },
      { id: 'prod-entrevista-testimonio-locacion-extra', label: 'Locación adicional', priceLabel: '$120.000 COP', price: 120000 },
      { id: 'prod-entrevista-testimonio-hora-extra', label: 'Hora adicional', priceLabel: '$50.000 COP', price: 50000 }
    ],
    notes: [
      'Alquiler de estudio: costo variable'
    ],
    image: 'assets/images/galery/M&D-22.jpg'
  },
  {
    id: 'prod-podcast-basico',
    category: 'produccion',
    name: 'Producción de podcast',
    shortDescription: 'Grabación y edición profesional de podcast.',
    description:
      'Servicio completo para creación de podcast con calidad profesional.',
    basePrice: 200000,
    priceLabel: 'Desde $200.000 COP',
    includes: [
      'Grabación de audio',
      'Setup técnico',
      'Edición básica',
      'Episodio editado',
      'Archivo listo para plataformas'
    ],
    addOns: [
      { id: 'prod-podcast-basico-clip-extra', label: 'Clip adicional para redes', priceLabel: '$70.000 COP', price: 70000 },
      { id: 'prod-podcast-basico-limpieza-avanzada', label: 'Limpieza avanzada de audio', priceLabel: '$60.000 COP', price: 60000 },
      { id: 'prod-podcast-basico-master', label: 'Mezcla y master final', priceLabel: '$80.000 COP', price: 80000 },
      { id: 'prod-podcast-basico-video', label: 'Versión en video del episodio', priceLabel: '$250.000 COP', price: 250000 }
    ],
    notes: [
      'Alquiler de estudio: costo variable'
    ],
    image: 'assets/images/fotos/main.jpg'
  },

  // ── ESTUDIO ───────────────────────────────────────────────────
  {
    id: 'estudio-sesion-foto',
    category: 'estudio',
    name: 'Sesión en estudio',
    shortDescription: 'Control total para un resultado profesional.',
    description:
      'Sesión en entorno controlado con iluminación profesional para lograr un acabado limpio y preciso.',
    basePrice: 180000,
    priceLabel: 'Desde $180.000 COP',
    includes: [
      'Iluminación profesional',
      'Dirección de poses',
      'Producción controlada',
      '10 a 30 fotos editadas'
    ],
    addOns: [
      { id: 'estudio-sesion-foto-maquillaje', label: 'Maquillaje profesional', priceLabel: '$180.000 COP', price: 180000 },
      { id: 'estudio-sesion-foto-fotobook', label: 'Fotobook', priceLabel: '$250.000 COP', price: 250000 },
      { id: 'estudio-sesion-foto-cuadro', label: 'Cuadro en madera', priceLabel: '$110.000 COP', price: 110000 }
    ],
    notes: [
      'Alquiler de estudio: costo variable'
    ],
    image: 'assets/images/fotos/M&D-31.jpg'
  },
  {
    id: 'estudio-video',
    category: 'estudio',
    name: 'Video en estudio',
    shortDescription: 'Un video limpio, profesional y sin distracciones.',
    description:
      'Ideal para presentaciones, contenido o comunicación clara en un entorno controlado.',
    basePrice: 320000,
    priceLabel: 'Desde $320.000 COP',
    includes: [
      'Grabación en estudio',
      'Iluminación y audio controlado',
      'Video adaptado a necesidad',
      'Formatos para web, redes o presentación',
      'Entrega en 7 días hábiles'
    ],
    image: 'assets/images/galery/M&D-18.jpg'
  },

  // ── MOMENTOS ──────────────────────────────────────────────────
  {
    id: 'momentos-pareja',
    category: 'momentos',
    name: 'Sesión de pareja',
    shortDescription: 'Fotos naturales que capturan su conexión real.',
    description:
      'Una experiencia pensada para ustedes, donde se documenta su relación de forma auténtica y emocional.',
    basePrice: 280000,
    priceLabel: 'Desde $280.000 COP',
    includes: [
      'Sesión de 1.5 a 2 horas',
      'Dirección natural (sin poses forzadas)',
      '25 fotografías editadas listas para imprimir y compartir',
      'Locación sugerida según estilo de pareja',
      'Entrega en 7 días hábiles'
    ],
    image: 'assets/images/galery/M&D-21.jpg'
  },
  {
    id: 'momentos-cumpleanos',
    category: 'momentos',
    name: 'Sesión de cumpleaños',
    shortDescription: 'Convierte tu día en recuerdos que sí vas a querer guardar.',
    description:
      'Captura tu celebración con fotos pensadas para recordar el momento y compartirlo.',
    basePrice: 200000,
    priceLabel: 'Desde $200.000 COP',
    includes: [
      'Sesión de 1 a 1.5 horas',
      '20 fotos editadas del cumpleañero y momentos clave',
      'Enfoque en emoción y ambiente',
      'Entrega en 5 días hábiles'
    ],
    image: 'assets/images/galery/M&D-19.jpg'
  },
  {
    id: 'momentos-sorpresa',
    category: 'momentos',
    name: 'Sesión sorpresa',
    shortDescription: 'Captura el momento justo cuando todo pasa.',
    description:
      'Ideal para propuestas, sorpresas o momentos especiales donde todo debe salir perfecto sin perder naturalidad.',
    basePrice: 250000,
    priceLabel: 'Desde $250.000 COP',
    includes: [
      'Planeación previa contigo',
      'Cobertura discreta del momento clave',
      '20 fotografías editadas del instante real',
      'Entrega rápida en 3 días hábiles'
    ],
    notes: ['Cuéntanos el plan con anticipación para coordinar bien la logística.'],
    image: 'assets/images/galery/M&D-15.jpg'
  }
];
