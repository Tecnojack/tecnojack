export interface CatalogPackageOption {
  id: string;
  category: string;
  categoryLabel: string;
  packageName: string;
  priceAmountCop: number;
  description: string;
  features: string[];
  deliverables: string[];
}

export interface CatalogCategory {
  id: string;
  label: string;
  packages: CatalogPackageOption[];
}

export const CONTRACT_CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: 'bodas',
    label: '💍 Bodas y Petición de Mano',
    packages: [
      {
        id: 'boda-esencial',
        category: 'bodas',
        categoryLabel: 'Bodas',
        packageName: 'Boda Esencial (Foto + Video Base)',
        priceAmountCop: 2500000,
        description: 'Cobertura audiovisual esencial para ceremonias y recepción.',
        features: [
          'Cobertura de hasta 6 horas continuas de evento',
          '1 Fotógrafo principal + 1 Videógrafo dedicado',
          'Dirección estética de momentos destacados (preparativos, ceremonia, brindis)',
          'Equipos de cámara full frame y lentes luminosos para baja luz',
        ],
        deliverables: [
          'Galería digital privada con 350+ fotografías editadas en alta resolución',
          'Video Highlight / Teaser de 3 a 5 minutos en HD/4K',
          'Derechos de uso personal y descarga digital sin marcas de agua',
        ],
      },
      {
        id: 'boda-clasica',
        category: 'bodas',
        categoryLabel: 'Bodas',
        packageName: 'Boda Clásica (Foto + Video Completo + Dron)',
        priceAmountCop: 3800000,
        description: 'Cobertura completa desde los preparativos hasta la fiesta.',
        features: [
          'Cobertura completa de hasta 9 horas de evento',
          '2 Fotógrafos + 1 Videógrafo principal',
          'Tomas aéreas con Dron profesional (sujeto a regulaciones del lugar)',
          'Grabación de audio profesional directo de consola para votos y discursos',
        ],
        deliverables: [
          'Galería digital privada con 600+ fotografías profesionalmente retocadas',
          'Video Película de Boda (Film Documental 12-15 min) en 4K',
          'Teaser dinámico de 1 minuto para Instagram/Reels',
          'Álbum o Photobook impreso encuadernado de lujo',
        ],
      },
      {
        id: 'boda-premium',
        category: 'bodas',
        categoryLabel: 'Bodas',
        packageName: 'Boda Premium Cinema (Foto, Video Cinema, Dron & Preboda)',
        priceAmountCop: 5200000,
        description: 'La experiencia cinematográfica más completa con sesión de preboda incluida.',
        features: [
          'Cobertura ilimitada el día del evento (hasta 12 horas)',
          'Equipo completo de 4 profesionales (2 Fotógrafos, 2 Videógrafos + Operador Dron)',
          'Sesión Fotográfica de Preboda incluida (en locación a elección)',
          'Iluminación cinematográfica de apoyo para fiesta y recepción',
        ],
        deliverables: [
          'Galería digital privada con 800+ fotografías en máxima resolución',
          'Film Cinematográfico de Boda (20-25 min) con corrección de color cine',
          'Teaser de Boda 60 seg en 4K',
          'Caja con USB de madera grabada + 30 impresiones fine art',
        ],
      },
      {
        id: 'boda-solo-foto',
        category: 'bodas',
        categoryLabel: 'Bodas',
        packageName: 'Boda Solo Fotografía (Cobertura Completa)',
        priceAmountCop: 2200000,
        description: 'Enfoque exclusivo en reportería gráfica y retratos de boda.',
        features: [
          'Cobertura fotográfica de hasta 8 horas de evento',
          '2 Fotógrafos profesionales',
          'Retratos de novios, familia e invitados',
        ],
        deliverables: [
          'Galería digital privada con 500+ fotos retocadas en alta definición',
          'Entrega digital sin límite de descargas',
        ],
      },
      {
        id: 'boda-civil',
        category: 'bodas',
        categoryLabel: 'Bodas',
        packageName: 'Boda Civil (Ceremonia + Brindis Íntimo)',
        priceAmountCop: 1200000,
        description: 'Cobertura ideal para matrimonios civiles o bodas íntimas.',
        features: [
          'Cobertura de hasta 3 horas (Notaría / Juzgado + Brindis o Almuerzo)',
          '1 Fotógrafo + 1 Videógrafo',
        ],
        deliverables: [
          'Galería digital con 200+ fotografías editadas',
          'Video Resumen de 2 a 3 minutos en HD',
        ],
      },
      {
        id: 'peticion-mano',
        category: 'bodas',
        categoryLabel: 'Bodas',
        packageName: 'Petición de Mano / Propuesta de Matrimonio',
        priceAmountCop: 950000,
        description: 'Fotografía y cine sorpresa de incógnito para la propuesta.',
        features: [
          'Planeación logística previa de ocultamiento y ángulos clave',
          'Cobertura de 2 horas (Momento sorpresa + Sesión de novios posterior)',
          '1 Fotógrafo + 1 Videógrafo de incógnito',
        ],
        deliverables: [
          'Galería digital privada con 120+ fotos emotivas',
          'Video Teaser del momento del ¡SÍ! (1 a 2 min)',
        ],
      },
    ],
  },
  {
    id: 'quinces',
    label: '👑 Quince Años',
    packages: [
      {
        id: 'quinces-esencial',
        category: 'quinces',
        categoryLabel: 'Quince Años',
        packageName: 'Quinces Esencial (Fiesta + Sesión Pre-Quinces)',
        priceAmountCop: 2200000,
        description: 'Cobertura de fiesta de quinceañera y sesión exterior previa.',
        features: [
          'Sesión fotográfica de Pre-Quinces en locación externa (2 horas)',
          'Cobertura de la fiesta de hasta 6 horas',
          '1 Fotógrafo principal + 1 Videógrafo',
        ],
        deliverables: [
          'Galería digital con 400+ fotografías editadas',
          'Video Resumen de la Fiesta (5 a 8 min)',
          'Cuadro o ampliación retocada para la fiesta',
        ],
      },
      {
        id: 'quinces-clasico',
        category: 'quinces',
        categoryLabel: 'Quince Años',
        packageName: 'Quinces Clásico (Fiesta, Sesión + Photobook)',
        priceAmountCop: 3500000,
        description: 'Cobertura completa con álbum impreso de lujo incluido.',
        features: [
          'Sesión de Pre-Quinces con 2 cambios de vestuario',
          'Cobertura de fiesta de hasta 8 horas (Protocolo + Vals + Hora Loca)',
          '2 Fotógrafos + 1 Videógrafo',
        ],
        deliverables: [
          'Galería digital con 600+ fotografías en alta resolución',
          'Video Película de Quinces (10-12 min) en 4K',
          'Photobook impreso personalizado de 30x30 cm',
          'Teaser de 1 minuto para Instagram',
        ],
      },
      {
        id: 'quinces-premium',
        category: 'quinces',
        categoryLabel: 'Quince Años',
        packageName: 'Quinces Premium Cinema (Foto, Video Cinema & Dron)',
        priceAmountCop: 4800000,
        description: 'La máxima experiencia para la fiesta de 15 años.',
        features: [
          'Sesión previa en estudio o locación campestre',
          'Cobertura ilimitada de la recepción (hasta 10 horas)',
          'Tomas con Dron en locación campestre',
          'Equipo completo de 4 profesionales',
        ],
        deliverables: [
          'Galería digital con 800+ fotografías profesionalmente editadas',
          'Video Cinematográfico en 4K con edición rítmica moderna',
          'Photobook Luxury + 2 minibooks para padres/padrinos',
          'Caja personalizada USB',
        ],
      },
    ],
  },
  {
    id: 'grados',
    label: '🎓 Grados y Graduaciones',
    packages: [
      {
        id: 'grado-individual',
        category: 'grados',
        categoryLabel: 'Grados',
        packageName: 'Grado Individual (Sesión Toga + Cobertura Ceremonia)',
        priceAmountCop: 850000,
        description: 'Cobertura personal para el graduando y su familia.',
        features: [
          'Sesión fotográfica individual previa con toga y diploma',
          'Cobertura durante la ceremonia de graduación y recepción familiar (3 horas)',
          '1 Fotógrafo profesional',
        ],
        deliverables: [
          'Galería digital con 150+ fotos editadas',
          'Fotos de retratos familiares e individuales en alta resolución',
        ],
      },
      {
        id: 'grado-grupal',
        category: 'grados',
        categoryLabel: 'Grados',
        packageName: 'Grado Grupal / Promoción Institucional',
        priceAmountCop: 1800000,
        description: 'Fotografía y video grupal para colegios y universidades.',
        features: [
          'Cobertura de la ceremonia oficial de graduación',
          'Fotografía grupal de la promoción y mesa de honor',
          '1 Fotógrafo + 1 Videógrafo',
        ],
        deliverables: [
          'Galería digital compartida para la promoción',
          'Video resumen de la ceremonia institucional',
        ],
      },
    ],
  },
  {
    id: 'preboda',
    label: '📸 Preboda, Postboda y Parejas',
    packages: [
      {
        id: 'sesion-preboda-standard',
        category: 'preboda',
        categoryLabel: 'Preboda',
        packageName: 'Sesión de Pareja / Preboda Standard',
        priceAmountCop: 850000,
        description: 'Sesión de fotos romántica al aire libre.',
        features: [
          'Duración de 2 horas en locación seleccionada',
          'Hasta 2 cambios de vestuario',
          '1 Fotógrafo especializado',
        ],
        deliverables: [
          'Galería digital con 80+ fotos profesionalmente retocadas',
          'Entrega en máxima resolución para invitaciones o impresión',
        ],
      },
      {
        id: 'sesion-preboda-deluxe',
        category: 'preboda',
        categoryLabel: 'Preboda',
        packageName: 'Sesión Preboda Deluxe (Locación Externa + Dron)',
        priceAmountCop: 1400000,
        description: 'Sesión cinematográfica de fotos y video con dron.',
        features: [
          'Duración de 4 horas en entorno natural o viaje',
          'Cobertura con Fotografía + Video corto + Dron',
          '3 cambios de vestuario',
        ],
        deliverables: [
          'Galería digital con 150+ fotografías retocadas',
          'Video Reel / Teaser de Pareja en 4K (1-2 min)',
        ],
      },
      {
        id: 'sesion-postboda',
        category: 'preboda',
        categoryLabel: 'Postboda',
        packageName: 'Sesión Postboda / Trash The Dress',
        priceAmountCop: 950000,
        description: 'Fotografía artística relajada después del matrimonio.',
        features: [
          'Sesión de 2.5 horas en playa, bosque o locación icónica',
          '1 Fotógrafo principal',
        ],
        deliverables: ['Galería digital con 100+ fotos de alto impacto visual'],
      },
    ],
  },
  {
    id: 'videos',
    label: '🎥 Videos y Eventos Corporativos',
    packages: [
      {
        id: 'video-corporativo',
        category: 'corporativo',
        categoryLabel: 'Corporativo',
        packageName: 'Video Institucional / Corporativo',
        priceAmountCop: 2500000,
        description: 'Producción audiovisual publicitaria o empresarial.',
        features: [
          'Jornada de rodaje de hasta 6 horas',
          'Director de videografía + Iluminación + Audio lavalier',
          'Entrevistas e imágenes B-Roll de instalaciones/procesos',
        ],
        deliverables: [
          'Video Institucional de 2 a 3 minutos editado y sonorizado',
          'Versión corta adaptada para redes sociales',
        ],
      },
      {
        id: 'evento-social-fiesta',
        category: 'corporativo',
        categoryLabel: 'Eventos',
        packageName: 'Cobertura de Evento Social / Fiesta Cumpleaños',
        priceAmountCop: 1800000,
        description: 'Fotografía y video dinámico para eventos especiales.',
        features: [
          'Cobertura de hasta 5 horas de evento',
          '1 Fotógrafo + 1 Videógrafo',
        ],
        deliverables: [
          'Galería digital con 300+ fotografías',
          'Video Resumen del Evento de 4 a 6 min',
        ],
      },
    ],
  },
];
