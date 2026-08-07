# Especificación Completa de Base de Datos y CMS (TECNOJACK)

Este documento contiene la **totalidad de los datos estáticos** de la aplicación TECNOJACK (textos, paquetes, configuraciones, categorías). Está pensado para que el equipo de Desarrollo Backend pueda migrar toda esta información a una base de datos relacional (SQL) o no relacional (NoSQL), y crear un panel de administración (CMS).

---

## 1. Categorías de Servicios
```json
[
  {
    "id": "bodas",
    "title": "Bodas",
    "description": "Historias de boda con estética elegante y lectura emocional del momento.",
    "image": "assets/images/fotos/default-cover.png",
    "href": "/portfolio/bodas",
    "ctaLabel": "Ver paquetes",
    "points": [
      "Foto + video",
      "Color cinematográfico",
      "Entrega para redes y archivo final"
    ]
  },
  {
    "id": "quinces",
    "title": "15 años",
    "description": "Cobertura visual para celebrar con retratos, clips y momentos clave.",
    "image": "assets/images/galery/M&D-22.jpg",
    "href": "/portfolio/quinces",
    "ctaLabel": "Ver paquetes",
    "points": [
      "Retratos de gala",
      "Clips verticales",
      "Cobertura de ceremonia y fiesta"
    ]
  },
  {
    "id": "grados",
    "title": "Grados",
    "description": "Ceremonias y promociones con una cobertura limpia, clara y bien presentada.",
    "image": "assets/images/galery/M&D-15.jpg",
    "href": "/portfolio/grados",
    "ctaLabel": "Ver paquetes",
    "points": [
      "Llamado individual",
      "Fotos familiares",
      "Paquetes por estudiante o grupo"
    ]
  },
  {
    "id": "preboda",
    "title": "Preboda",
    "description": "Sesiones previas con dirección sutil, narrativa visual y una estética íntima.",
    "image": "assets/images/galery/M&D-32.jpg",
    "href": "/portfolio/preboda",
    "ctaLabel": "Ver paquetes",
    "points": [
      "Dirección creativa",
      "Sesión exterior",
      "Contenido emocional"
    ]
  },
  {
    "id": "videos",
    "title": "Videos",
    "description": "Producción de video musical, corporativo y creativo con enfoque narrativo.",
    "image": "assets/images/galery/M&D-29.jpg",
    "href": "/portfolio/videos",
    "ctaLabel": "Ver paquetes",
    "points": [
      "Videos musicales",
      "Corporativo y marca",
      "Cortometrajes y creativos"
    ]
  },
  {
    "id": "corporativos",
    "title": "Corporativos",
    "description": "Contenido visual para marcas, equipos y eventos de empresa.",
    "image": "assets/images/galery/M&D-23.jpg",
    "href": "/portfolio/corporativos",
    "ctaLabel": "Ver paquetes",
    "points": [
      "Cobertura de marca",
      "Clips para redes",
      "Registro institucional"
    ]
  },
  {
    "id": "solutions",
    "title": "Soluciones",
    "description": "Páginas y experiencias digitales pensadas para convertir visitas en consultas reales, con una propuesta visual clara y enfocada en ventas.",
    "image": "assets/images/fotos/default-cover.png",
    "href": "/soluciones",
    "ctaLabel": "Ver soluciones",
    "points": [
      "Landing pages de conversión",
      "Presentación de servicios",
      "Contacto directo por WhatsApp"
    ]
  }
]
```

---

## 2. Configuración de Páginas (SEO, Headers)
```json
{
  "bodas": {
    "category": "bodas",
    "label": "Bodas",
    "shellSubtitle": "Bodas",
    "hero": {
      "eyebrow": "Servicio premium",
      "title": "Bodas con dirección cinematográfica",
      "description": "Historias reales contadas con estética, emoción y precisión visual.",
      "backgroundImage": "assets/images/fotos/M&D-31.jpg",
      "highlights": [
        "Foto + video",
        "Color cinematográfico",
        "Dirección artística"
      ],
      "whatsappMessage": "Hola TECNOJACK, quiero información sobre cobertura de boda."
    },
    "packageEyebrow": "Presentación de paquetes",
    "packageTitle": "Paquetes de boda, de Esencial a Exclusivo",
    "packageLead": "Elige tu paquete, compara cobertura y entregables, y cuando tengas tu favorito envíanos la fecha y la ciudad para armar la propuesta y reservar tu cupo.",
    "storiesTitle": "Historias reales",
    "storiesLead": "Eventos que ya hemos transformado en piezas visuales.",
    "stories": [
      {
        "clientName": "María & Daniel",
        "location": "Medellín, Antioquia",
        "title": "María & Daniel",
        "subtitle": "Ceremonia, retratos y recepción",
        "images": [
          {
            "src": "assets/images/galery/M&D-29.jpg",
            "alt": "Pareja abrazándose durante la boda"
          },
          {
            "src": "assets/images/fotos/M&D-31.jpg",
            "alt": "Retrato editorial de novios durante la recepción"
          },
          {
            "src": "assets/images/fotos/default-cover.png",
            "alt": "Retrato de pareja en exterior"
          }
        ]
      },
      {
        "clientName": "Valentina & Samuel",
        "location": "Envigado, Antioquia",
        "title": "Preparativos con intención",
        "subtitle": "Cobertura completa del día",
        "images": [
          {
            "src": "assets/images/fotos/M&D-10.jpg",
            "alt": "Preparativos de boda con luz natural"
          },
          {
            "src": "assets/images/fotos/M&D-11.jpg",
            "alt": "Momento emocional en preparativos"
          },
          {
            "src": "assets/images/fotos/M&D-26.jpg",
            "alt": "Detalle elegante de boda"
          }
        ]
      },
      {
        "clientName": "Laura & Esteban",
        "location": "Rionegro, Antioquia",
        "title": "Recepción editorial",
        "subtitle": "Detalles, pareja y atmósfera",
        "images": [
          {
            "src": "assets/images/galery/M&D-22.jpg",
            "alt": "Detalle elegante de recepción de boda"
          },
          {
            "src": "assets/images/fotos/M&D-16.jpg",
            "alt": "Retrato de pareja durante la celebración"
          },
          {
            "src": "assets/images/galery/M&D-30.jpg",
            "alt": "Ambiente de recepción con estética cinematográfica"
          }
        ]
      }
    ]
  },
  "quinces": {
    "category": "quinces",
    "label": "Quinces",
    "shellSubtitle": "Quinces",
    "hero": {
      "eyebrow": "Servicio premium",
      "title": "Quinceañeros con una puesta en escena memorable",
      "description": "Retratos, cobertura y clips diseñados para una celebración con presencia visual.",
      "backgroundImage": "assets/images/galery/M&D-23.jpg",
      "highlights": [
        "Retratos de gala",
        "Cobertura del evento",
        "Contenido social"
      ],
      "whatsappMessage": "Hola TECNOJACK, quiero información sobre cobertura de quinceañeros."
    },
    "packageEyebrow": "Presentación de paquetes",
    "packageTitle": "Paquetes de quince, listos para lucir",
    "packageLead": "Selecciona el paquete, revisa qué incluye en retratos, evento y piezas para redes, y comparte fecha y ciudad para confirmar disponibilidad y enviarte la propuesta.",
    "storiesTitle": "Historias reales",
    "storiesLead": "Eventos que ya hemos transformado en piezas visuales.",
    "stories": [
      {
        "clientName": "Sofía Hernández",
        "location": "Medellín, Antioquia",
        "title": "Celebración de gala",
        "subtitle": "Retratos y sesión previa",
        "images": [
          {
            "src": "assets/images/galery/M&D-23.jpg",
            "alt": "Retrato principal de quinceañera"
          },
          {
            "src": "assets/images/galery/M&D-22.jpg",
            "alt": "Detalle elegante de vestido y celebración"
          },
          {
            "src": "assets/images/fotos/M&D-12.jpg",
            "alt": "Momento espontáneo de celebración juvenil"
          }
        ]
      },
      {
        "clientName": "Mariana López",
        "location": "Bello, Antioquia",
        "title": "Entrada y ceremonia",
        "subtitle": "Cobertura del evento",
        "images": [
          {
            "src": "assets/images/fotos/M&D-16.jpg",
            "alt": "Entrada de evento con iluminación cuidada"
          },
          {
            "src": "assets/images/fotos/M&D-10.jpg",
            "alt": "Retrato en ceremonia de quinceaños"
          },
          {
            "src": "assets/images/fotos/M&D-11.jpg",
            "alt": "Momento emocional durante la celebración"
          }
        ]
      },
      {
        "clientName": "Isabella Restrepo",
        "location": "Itagüí, Antioquia",
        "title": "Fiesta y detalle",
        "subtitle": "Contenido listo para redes",
        "images": [
          {
            "src": "assets/images/fotos/M&D-26.jpg",
            "alt": "Detalle de fiesta y decoración"
          },
          {
            "src": "assets/images/galery/M&D-29.jpg",
            "alt": "Baile y celebración con ritmo visual"
          },
          {
            "src": "assets/images/galery/M&D-23.jpg",
            "alt": "Retrato final de quinceañera"
          }
        ]
      }
    ]
  },
  "grados": {
    "category": "grados",
    "label": "Grados",
    "shellSubtitle": "Grados",
    "hero": {
      "eyebrow": "Servicio premium",
      "title": "Grados con imagen limpia y valor de recuerdo",
      "description": "Ceremonias y promociones cubiertas con orden, claridad y dirección visual.",
      "backgroundImage": "assets/images/galery/M&D-15.jpg",
      "highlights": [
        "Retratos individuales",
        "Fotos familiares",
        "Entrega ágil"
      ],
      "whatsappMessage": "Hola TECNOJACK, quiero información sobre cobertura de grados."
    },
    "packageEyebrow": "Presentación de paquetes",
    "packageTitle": "Paqueticos de grados (claros y rápidos)",
    "packageLead": "Escoge tu opción base, define si quieres sumar video como adicional, y envíanos fecha y ciudad para cotizar según tu plan y asegurar disponibilidad.",
    "storiesTitle": "Historias reales",
    "storiesLead": "Eventos que ya hemos transformado en piezas visuales.",
    "stories": [
      {
        "clientName": "Prom 2025 San José",
        "location": "Medellín, Antioquia",
        "title": "Promoción memorable",
        "subtitle": "Llamado, retratos y familia",
        "images": [
          {
            "src": "assets/images/galery/M&D-15.jpg",
            "alt": "Retrato principal de graduación"
          },
          {
            "src": "assets/images/galery/M&D-19.jpg",
            "alt": "Retrato editorial en ceremonia de grado"
          },
          {
            "src": "assets/images/galery/M&D-21.jpg",
            "alt": "Retrato con directivos docentes"
          }
        ]
      },
      {
        "clientName": "Prom 2025 Santa María",
        "location": "Sabaneta, Antioquia",
        "title": "Ceremonia completa",
        "subtitle": "Cobertura limpia y clara",
        "images": [
          {
            "src": "assets/images/galery/M&D-14.jpg",
            "alt": "Foto grupal de curso"
          },
          {
            "src": "assets/images/galery/M&D-5.jpg",
            "alt": "Llamado individual durante la ceremonia"
          },
          {
            "src": "assets/images/galery/M&D-3.jpg",
            "alt": "Imposición de bata en la graduación"
          }
        ]
      },
      {
        "clientName": "Prom 2025 Nuevo Horizonte",
        "location": "La Estrella, Antioquia",
        "title": "Recuerdos compartidos",
        "subtitle": "Grupo, amigos y detalles",
        "images": [
          {
            "src": "assets/images/fotos/M&D-10.jpg",
            "alt": "Foto familiar en graduación"
          },
          {
            "src": "assets/images/galery/M&D-18.jpg",
            "alt": "Foto con amigos al finalizar el evento"
          },
          {
            "src": "assets/images/galery/M&D-22.jpg",
            "alt": "Detalle de ceremonia de graduación"
          }
        ]
      }
    ]
  },
  "preboda": {
    "category": "preboda",
    "label": "Preboda",
    "shellSubtitle": "Preboda",
    "hero": {
      "eyebrow": "Servicio premium",
      "title": "Preboda con narrativa íntima y editorial",
      "description": "Sesiones previas diseñadas para contar la historia con estética y emoción.",
      "backgroundImage": "assets/images/galery/M&D-32.jpg",
      "highlights": [
        "Dirección creativa",
        "Sesión exterior",
        "Contenido emocional"
      ],
      "whatsappMessage": "Hola TECNOJACK, quiero información sobre una sesión preboda."
    },
    "packageEyebrow": "Presentación de paquetes",
    "packageTitle": "Sesiones preboda con intención editorial",
    "packageLead": "Elige tu nivel, revisa entregables y estilo de la sesión, y cuando estés listo envíanos fecha, ciudad y tu idea para confirmar agenda y preparar la propuesta.",
    "storiesTitle": "Historias reales",
    "storiesLead": "Eventos que ya hemos transformado en piezas visuales.",
    "stories": [
      {
        "clientName": "María & Daniel",
        "location": "Guatapé, Antioquia",
        "title": "Sesión exterior",
        "subtitle": "Narrativa íntima de pareja",
        "images": [
          {
            "src": "assets/images/fotos/default-cover.png",
            "alt": "Sesión preboda en exterior con luz natural"
          },
          {
            "src": "assets/images/galery/M&D-32.jpg",
            "alt": "Escena romántica en sesión preboda"
          },
          {
            "src": "assets/images/galery/M&D-18.jpg",
            "alt": "Retrato íntimo de pareja antes de la boda"
          }
        ]
      },
      {
        "clientName": "Juliana & Mateo",
        "location": "Santa Elena, Antioquia",
        "title": "Luz natural y dirección",
        "subtitle": "Frames para invitaciones y redes",
        "images": [
          {
            "src": "assets/images/galery/M&D-29.jpg",
            "alt": "Retrato de pareja con dirección sutil"
          },
          {
            "src": "assets/images/fotos/M&D-31.jpg",
            "alt": "Frame editorial de pareja"
          },
          {
            "src": "assets/images/fotos/M&D-26.jpg",
            "alt": "Detalle visual de sesión en exterior"
          }
        ]
      },
      {
        "clientName": "Catalina & Andrés",
        "location": "El Retiro, Antioquia",
        "title": "Escenas previas al gran día",
        "subtitle": "Contenido emocional y editorial",
        "images": [
          {
            "src": "assets/images/galery/M&D-18.jpg",
            "alt": "Pareja caminando en sesión preboda"
          },
          {
            "src": "assets/images/galery/M&D-32.jpg",
            "alt": "Escena íntima previa a la boda"
          },
          {
            "src": "assets/images/galery/M&D-19.jpg",
            "alt": "Retrato elegante de pareja"
          }
        ]
      }
    ]
  },
  "corporativos": {
    "category": "corporativos",
    "label": "Corporativos",
    "shellSubtitle": "Corporativos",
    "hero": {
      "eyebrow": "Servicio premium",
      "title": "Producción corporativa con intención comercial",
      "description": "Contenido visual para marcas, equipos y eventos con estética limpia y narrativa clara.",
      "backgroundImage": "assets/images/galery/M&D-23.jpg",
      "highlights": [
        "Foto + video",
        "Contenido para redes",
        "Cobertura institucional"
      ],
      "whatsappMessage": "Hola TECNOJACK, quiero información sobre producción corporativa."
    },
    "packageEyebrow": "Presentación de paquetes",
    "packageTitle": "Producción corporativa por tipo de entrega",
    "packageLead": "Selecciona el tipo de producción, revisa entregables y alcance, y compártenos objetivo, fecha y ciudad para cotizar con claridad y planear la ejecución.",
    "storiesTitle": "Casos / muestras",
    "storiesLead": "Una selección de estilo visual para contenidos institucionales y comerciales.",
    "stories": []
  },
  "videos": {
    "category": "videos",
    "label": "Videos",
    "shellSubtitle": "Videos",
    "hero": {
      "eyebrow": "Portafolio audiovisual",
      "title": "Producción audiovisual con enfoque cinéfilo.",
      "description": "Videos musicales, bodas y proyectos creativos con dirección, color grading y entrega profesional.",
      "backgroundImage": "assets/images/galery/M&D-30.jpg",
      "highlights": [
        "Videos musicales",
        "Bodas & eventos",
        "Cortometrajes",
        "Contenido para redes"
      ],
      "whatsappMessage": "Hola TECNOJACK, quiero información sobre los paquetes de video."
    },
    "packageEyebrow": "Paquetes de video",
    "packageTitle": "Elige una base y ajustamos según tu idea",
    "packageLead": "Selecciona una base para comenzar y la adaptaremos según la complejidad, locaciones y concepto de tu proyecto visual.",
    "storiesTitle": "Trabajos destacados",
    "storiesLead": "Explora algunas de nuestras producciones audiovisuales.",
    "stories": []
  }
}
```

---

## 3. Paquetes Base (Listados principales)
```json
[
  {
    "name": "Cobertura selecta",
    "price": "Desde COP 180.000",
    "summary": "Una base comercial flexible para eventos sociales y ceremonias puntuales.",
    "features": [
      "Cobertura por bloque de horas",
      "Entrega digital optimizada",
      "Selección de las mejores fotografías",
      "Soporte por WhatsApp",
      "Escalable con extras y video"
    ]
  },
  {
    "name": "Experiencia Foto + Video",
    "price": "Desde COP 450.000",
    "summary": "Ideal para clientes que buscan una propuesta audiovisual más aspiracional y comercial.",
    "featured": true,
    "features": [
      "Cobertura foto + video",
      "Reel vertical para redes",
      "Edición premium",
      "Entrega web o privada",
      "Apoyo para narrativa visual",
      "Opciones para ampliar la cobertura"
    ]
  },
  {
    "name": "Producción extendida",
    "price": "A medida",
    "summary": "Para jornadas completas, grupos grandes o eventos que necesitan cobertura estratégica.",
    "features": [
      "Preproducción básica",
      "Equipo ampliado",
      "Material para prensa o redes",
      "Entregables múltiples",
      "Cotización personalizada"
    ]
  }
]
```

---

## 4. Paquetes de Foto (Fotografía)
```json
[
  {
    "name": "Recuerdo Esencial",
    "priceCop": "60.000 COP",
    "summary": "Pensado para grados y ceremonias donde necesitas un recuerdo puntual, rápido y bien presentado.",
    "features": [
      "Todas las fotos digitales",
      "12 fotografías editadas en JPG"
    ]
  },
  {
    "name": "Recuerdo Plus",
    "priceCop": "120.000 COP",
    "summary": "Una versión más completa para quien quiere variedad, retratos y una entrega con más detalle.",
    "featured": true,
    "features": [
      "Todas las fotos digitales",
      "25 fotografías editadas en JPG",
      "Mini selección prioritaria para compartir"
    ]
  },
  {
    "name": "Recuerdo Integral",
    "priceCop": "220.000 COP",
    "summary": "Cobertura superior con mejor narrativa para familias, promociones y clientes que quieren material amplio.",
    "features": [
      "Todas las fotos digitales",
      "40 fotografías editadas en JPG",
      "Cobertura extendida y apoyo en poses"
    ]
  }
]
```

---

## 5. Detalles de Paquetes (Vistas profundas y Cotizaciones)
```json
[
  {
    "category": "bodas",
    "slug": "esencial-hibrido-foto-video",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "HÍBRIDA - Tu historia en foto y video",
    "packageTypeLabel": "Foto + video",
    "packageGroup": "photo-video",
    "eyebrow": "Paquete de boda · foto + video",
    "lead": "Cobertura equilibrada que combina fotografía y video para conservar los momentos más importantes del día de una forma natural, elegante y emotiva. Ideal para bodas pequeñas o parejas que desean conservar los recuerdos esenciales sin perder calidad.",
    "image": "assets/images/galery/M&D-16.jpg",
    "priceLines": [
      "1'900.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "esencial-hibrido-foto-video-cop",
        "label": "1'900.000 COP",
        "amountCop": 1900000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de hasta 6 horas",
          "1 fotógrafo",
          "1 videógrafo",
          "Dirección básica",
          "Edición profesional",
          "Colorización cinematográfica ligera",
          "Audio ambiente"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 180 fotografías editadas",
          "Video resumen (Highlight Film) de 4 a 6 minutos",
          "1 Reel vertical para redes sociales",
          "Galería privada durante 3 meses",
          "Entrega digital mediante Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Ceremonia",
          "Momentos importantes",
          "Recepción parcial"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "esencial-hibrido-foto-video-section-1-1",
            "label": "Cobertura de hasta 6 horas",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-1-2",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-1-3",
            "label": "1 videógrafo",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-1-4",
            "label": "Dirección básica",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-1-5",
            "label": "Edición profesional",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-1-6",
            "label": "Colorización cinematográfica ligera",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-1-7",
            "label": "Audio ambiente",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "esencial-hibrido-foto-video-section-2-1",
            "label": "Hasta 180 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-2-2",
            "label": "Video resumen (Highlight Film) de 4 a 6 minutos",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-2-3",
            "label": "1 Reel vertical para redes sociales",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-2-4",
            "label": "Galería privada durante 3 meses",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-2-5",
            "label": "Entrega digital mediante Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "esencial-hibrido-foto-video-section-3-1",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-3-2",
            "label": "Momentos importantes",
            "selectedByDefault": true
          },
          {
            "id": "esencial-hibrido-foto-video-section-3-3",
            "label": "Recepción parcial",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "esencial-hibrido-foto-video-addon-1",
            "label": "Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-2",
            "label": "Fotobook de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-3",
            "label": "Reel para redes||Video corto optimizado para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-6",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-7",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-8",
            "label": "Maquillaje profesional de novia||Maquillaje de larga duración profesional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-9",
            "label": "Peinado profesional||Estilo acorde al evento y maquillaje",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-10",
            "label": "Pianista en vivo||Música elegante en vivo para tu evento",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-11",
            "label": "Saxofonista||Ambiente sofisticado con saxofón en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-12",
            "label": "Violinista||Toque clásico y emocional para tu boda",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-13",
            "label": "Guitarrista||Acompañamiento musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "esencial-hibrido-foto-video-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "esencial-hibrido-foto-video-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "esencial-hibrido-foto-video-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "esencial-hibrido-foto-video-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "esencial-hibrido-foto-video-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "esencial-hibrido-foto-video-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "esencial-hibrido-foto-video-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "esencial-hibrido-foto-video-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "esencial-hibrido-foto-video-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "esencial-hibrido-foto-video-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "esencial-hibrido-foto-video-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "esencial-hibrido-foto-video-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "esencial-hibrido-foto-video-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "esencial-hibrido-foto-video-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "esencial-hibrido-foto-video-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20H%C3%8DBRIDA%20-%20Tu%20historia%20en%20foto%20y%20video%20de%20boda."
  },
  {
    "category": "bodas",
    "slug": "completo-hibrido-foto-video",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "HÍBRIDA - La historia completa de tu boda",
    "packageTypeLabel": "Foto + video",
    "packageGroup": "photo-video",
    "eyebrow": "Paquete de boda · foto + video",
    "lead": "Cobertura completa que documenta el desarrollo de la boda desde los preparativos hasta los momentos más importantes de la celebración. Diseñado para parejas que desean revivir su historia completa.",
    "image": "assets/images/galery/M&D-29.jpg",
    "priceLines": [
      "2'800.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "completo-hibrido-foto-video-cop",
        "label": "2'800.000 COP",
        "amountCop": 2800000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de hasta 8 horas",
          "1 fotógrafo",
          "1 videógrafo",
          "Apoyo logístico cuando sea necesario",
          "Dirección durante el evento",
          "Tomas creativas",
          "Audio profesional de consola",
          "Gimbal"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 300 fotografías editadas",
          "15 fotografías impresas",
          "1 fotografía ampliada",
          "Video resumen (Highlight Film) de 6 a 8 minutos",
          "Película documental de 15 a 25 minutos",
          "1 Reel vertical",
          "Galería privada durante 6 meses",
          "Entrega digital"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparativos",
          "Ceremonia",
          "Sesión de pareja",
          "Recepción",
          "Inicio de fiesta"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "completo-hibrido-foto-video-section-1-1",
            "label": "Cobertura de hasta 8 horas",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-1-2",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-1-3",
            "label": "1 videógrafo",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-1-4",
            "label": "Apoyo logístico cuando sea necesario",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-1-5",
            "label": "Dirección durante el evento",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-1-6",
            "label": "Tomas creativas",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-1-7",
            "label": "Audio profesional de consola",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-1-8",
            "label": "Gimbal",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "completo-hibrido-foto-video-section-2-1",
            "label": "Hasta 300 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-2-2",
            "label": "15 fotografías impresas",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-2-3",
            "label": "1 fotografía ampliada",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-2-4",
            "label": "Video resumen (Highlight Film) de 6 a 8 minutos",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-2-5",
            "label": "Película documental de 15 a 25 minutos",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-2-6",
            "label": "1 Reel vertical",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-2-7",
            "label": "Galería privada durante 6 meses",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-2-8",
            "label": "Entrega digital",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "completo-hibrido-foto-video-section-3-1",
            "label": "Preparativos",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-3-2",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-3-3",
            "label": "Sesión de pareja",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-3-4",
            "label": "Recepción",
            "selectedByDefault": true
          },
          {
            "id": "completo-hibrido-foto-video-section-3-5",
            "label": "Inicio de fiesta",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "completo-hibrido-foto-video-addon-1",
            "label": "Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-2",
            "label": "Fotobook de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-3",
            "label": "Reel para redes||Video corto optimizado para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-6",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-7",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-8",
            "label": "Maquillaje profesional de novia||Maquillaje de larga duración profesional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-9",
            "label": "Peinado profesional||Estilo acorde al evento y maquillaje",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-10",
            "label": "Pianista en vivo||Música elegante en vivo para tu evento",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-11",
            "label": "Saxofonista||Ambiente sofisticado con saxofón en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-12",
            "label": "Violinista||Toque clásico y emocional para tu boda",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-13",
            "label": "Guitarrista||Acompañamiento musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "completo-hibrido-foto-video-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "completo-hibrido-foto-video-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "completo-hibrido-foto-video-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "completo-hibrido-foto-video-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "completo-hibrido-foto-video-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "completo-hibrido-foto-video-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "completo-hibrido-foto-video-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "completo-hibrido-foto-video-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "completo-hibrido-foto-video-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "completo-hibrido-foto-video-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "completo-hibrido-foto-video-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "completo-hibrido-foto-video-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "completo-hibrido-foto-video-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "completo-hibrido-foto-video-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "completo-hibrido-foto-video-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20H%C3%8DBRIDA%20-%20La%20historia%20completa%20de%20tu%20boda%20de%20boda."
  },
  {
    "category": "bodas",
    "slug": "premium-cinematico-foto-video",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "HÍBRIDA - Experiencia cinematográfica",
    "packageTypeLabel": "Foto + video",
    "packageGroup": "photo-video",
    "eyebrow": "Paquete de boda · foto + video",
    "lead": "Experiencia completa que combina fotografía artística y producción cinematográfica para contar la historia del día con una narrativa mucho más cuidada. Este es nuestro paquete recomendado.",
    "image": "assets/images/fotos/M&D-31.jpg",
    "priceLines": [
      "3'900.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "premium-cinematico-foto-video-cop",
        "label": "3'900.000 COP",
        "amountCop": 3900000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de hasta 10 horas",
          "Fotógrafo principal",
          "Videógrafo principal",
          "Segundo operador o asistente según logística",
          "Dirección creativa",
          "Gimbal",
          "Tomas con dron cuando sea posible",
          "Audio profesional dedicado",
          "Iluminación de apoyo",
          "Corrección de color cinematográfica",
          "Sesión preboda incluida"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 450 fotografías editadas",
          "20 fotografías impresas",
          "1 fotografía ampliada",
          "Álbum fotográfico",
          "Tráiler cinematográfico",
          "Video resumen (Highlight Film) de 8 a 12 minutos",
          "Película documental de 25 a 40 minutos",
          "2 Reels para redes",
          "Galería privada durante 1 año",
          "Entrega digital"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparativos completos",
          "Primer encuentro a solas (First Look)",
          "Ceremonia",
          "sesión artística de pareja",
          "Recepción",
          "Fiesta"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "premium-cinematico-foto-video-section-1-1",
            "label": "Cobertura de hasta 10 horas",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-2",
            "label": "Fotógrafo principal",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-3",
            "label": "Videógrafo principal",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-4",
            "label": "Segundo operador o asistente según logística",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-5",
            "label": "Dirección creativa",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-6",
            "label": "Gimbal",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-7",
            "label": "Tomas con dron cuando sea posible",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-8",
            "label": "Audio profesional dedicado",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-9",
            "label": "Iluminación de apoyo",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-10",
            "label": "Corrección de color cinematográfica",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-1-11",
            "label": "Sesión preboda incluida",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "premium-cinematico-foto-video-section-2-1",
            "label": "Hasta 450 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-2-2",
            "label": "20 fotografías impresas",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-2-3",
            "label": "1 fotografía ampliada",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-2-4",
            "label": "Álbum fotográfico",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-2-5",
            "label": "Tráiler cinematográfico",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-2-6",
            "label": "Video resumen (Highlight Film) de 8 a 12 minutos",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-2-7",
            "label": "Película documental de 25 a 40 minutos",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-2-8",
            "label": "2 Reels para redes",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-2-9",
            "label": "Galería privada durante 1 año",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-2-10",
            "label": "Entrega digital",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "premium-cinematico-foto-video-section-3-1",
            "label": "Preparativos completos",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-3-2",
            "label": "Primer encuentro a solas (First Look)",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-3-3",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-3-4",
            "label": "sesión artística de pareja",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-3-5",
            "label": "Recepción",
            "selectedByDefault": true
          },
          {
            "id": "premium-cinematico-foto-video-section-3-6",
            "label": "Fiesta",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "premium-cinematico-foto-video-addon-1",
            "label": "Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-2",
            "label": "Fotobook de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-3",
            "label": "Reel para redes||Video corto optimizado para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-6",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-7",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-8",
            "label": "Maquillaje profesional de novia||Maquillaje de larga duración profesional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-9",
            "label": "Peinado profesional||Estilo acorde al evento y maquillaje",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-10",
            "label": "Pianista en vivo||Música elegante en vivo para tu evento",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-11",
            "label": "Saxofonista||Ambiente sofisticado con saxofón en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-12",
            "label": "Violinista||Toque clásico y emocional para tu boda",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-13",
            "label": "Guitarrista||Acompañamiento musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "premium-cinematico-foto-video-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "premium-cinematico-foto-video-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "premium-cinematico-foto-video-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "premium-cinematico-foto-video-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "premium-cinematico-foto-video-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "premium-cinematico-foto-video-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "premium-cinematico-foto-video-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "premium-cinematico-foto-video-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "premium-cinematico-foto-video-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "premium-cinematico-foto-video-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "premium-cinematico-foto-video-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "premium-cinematico-foto-video-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "premium-cinematico-foto-video-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "premium-cinematico-foto-video-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "premium-cinematico-foto-video-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20H%C3%8DBRIDA%20-%20Experiencia%20cinematogr%C3%A1fica%20de%20boda."
  },
  {
    "category": "bodas",
    "slug": "luxury-cinematico-foto-video",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "HÍBRIDA - The Wedding Film Experience",
    "packageTypeLabel": "Foto + video",
    "packageGroup": "photo-video",
    "eyebrow": "Paquete de boda · foto + video",
    "lead": "La experiencia audiovisual más completa de TECNOJACK. Pensada para parejas que desean transformar su boda en una producción cinematográfica de alto nivel con un enfoque de autor sumamente exclusivo.",
    "image": "assets/images/galery/M&D-32.jpg",
    "priceLines": [
      "6'100.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "luxury-cinematico-foto-video-cop",
        "label": "6'100.000 COP",
        "amountCop": 6100000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 4,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de hasta 12 horas",
          "2 fotógrafos",
          "2 videógrafos",
          "Asistente de producción",
          "Reunión creativa, planeación, cronograma, tablero de inspiración (moodboard) y lista de fotos deseadas",
          "Asesoría de locaciones y de iluminación",
          "Cobertura simultánea de ambos preparativos",
          "Dirección audiovisual completa",
          "Tomas con dron",
          "Gimbal",
          "Audio profesional de consola y micrófonos inalámbricos",
          "Iluminación profesional de apoyo",
          "Tomas artísticas, de decoración y de la locación",
          "Sesión Preboda Premium y Sesión Postboda Premium"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Más de 600 fotografías editadas con selección personalizada de las mejores tomas",
          "30 fotografías impresas",
          "2 ampliaciones",
          "Álbum Premium XL",
          "Caja de presentación",
          "Tráiler cinematográfico",
          "Video resumen (Highlight Film) de 10 a 15 minutos",
          "Película documental de 45 a 75 minutos",
          "4 Reels para redes",
          "Tráiler vertical",
          "Sesión Preboda Premium",
          "Sesión Postboda Premium",
          "Galería privada durante 2 años con entrega prioritaria",
          "Adelanto rápido de 20 fotografías durante las primeras 72 horas"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Cobertura simultánea de ambos preparativos",
          "Dirección audiovisual completa",
          "Tomas con dron",
          "Gimbal",
          "Audio profesional",
          "Iluminación profesional",
          "Tomas artísticas",
          "Tomas de decoración",
          "Tomas de la locación"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "luxury-cinematico-foto-video-section-1-1",
            "label": "Cobertura de hasta 12 horas",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-2",
            "label": "2 fotógrafos",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-3",
            "label": "2 videógrafos",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-4",
            "label": "Asistente de producción",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-5",
            "label": "Reunión creativa, planeación, cronograma, tablero de inspiración (moodboard) y lista de fotos deseadas",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-6",
            "label": "Asesoría de locaciones y de iluminación",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-7",
            "label": "Cobertura simultánea de ambos preparativos",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-8",
            "label": "Dirección audiovisual completa",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-9",
            "label": "Tomas con dron",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-10",
            "label": "Gimbal",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-11",
            "label": "Audio profesional de consola y micrófonos inalámbricos",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-12",
            "label": "Iluminación profesional de apoyo",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-13",
            "label": "Tomas artísticas, de decoración y de la locación",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-1-14",
            "label": "Sesión Preboda Premium y Sesión Postboda Premium",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "luxury-cinematico-foto-video-section-2-1",
            "label": "Más de 600 fotografías editadas con selección personalizada de las mejores tomas",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-2",
            "label": "30 fotografías impresas",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-3",
            "label": "2 ampliaciones",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-4",
            "label": "Álbum Premium XL",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-5",
            "label": "Caja de presentación",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-6",
            "label": "Tráiler cinematográfico",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-7",
            "label": "Video resumen (Highlight Film) de 10 a 15 minutos",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-8",
            "label": "Película documental de 45 a 75 minutos",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-9",
            "label": "4 Reels para redes",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-10",
            "label": "Tráiler vertical",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-11",
            "label": "Sesión Preboda Premium",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-12",
            "label": "Sesión Postboda Premium",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-13",
            "label": "Galería privada durante 2 años con entrega prioritaria",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-2-14",
            "label": "Adelanto rápido de 20 fotografías durante las primeras 72 horas",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "luxury-cinematico-foto-video-section-3-1",
            "label": "Cobertura simultánea de ambos preparativos",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-3-2",
            "label": "Dirección audiovisual completa",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-3-3",
            "label": "Tomas con dron",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-3-4",
            "label": "Gimbal",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-3-5",
            "label": "Audio profesional",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-3-6",
            "label": "Iluminación profesional",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-3-7",
            "label": "Tomas artísticas",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-3-8",
            "label": "Tomas de decoración",
            "selectedByDefault": true
          },
          {
            "id": "luxury-cinematico-foto-video-section-3-9",
            "label": "Tomas de la locación",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-cinematico-foto-video-addon-1",
            "label": "Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-2",
            "label": "Fotobook de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-3",
            "label": "Reel para redes||Video corto optimizado para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-6",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-7",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-8",
            "label": "Maquillaje profesional de novia||Maquillaje de larga duración profesional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-9",
            "label": "Peinado profesional||Estilo acorde al evento y maquillaje",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-10",
            "label": "Pianista en vivo||Música elegante en vivo para tu evento",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-11",
            "label": "Saxofonista||Ambiente sofisticado con saxofón en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-12",
            "label": "Violinista||Toque clásico y emocional para tu boda",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-13",
            "label": "Guitarrista||Acompañamiento musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-cinematico-foto-video-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "luxury-cinematico-foto-video-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "luxury-cinematico-foto-video-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-cinematico-foto-video-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "luxury-cinematico-foto-video-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "luxury-cinematico-foto-video-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-cinematico-foto-video-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "luxury-cinematico-foto-video-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "luxury-cinematico-foto-video-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "luxury-cinematico-foto-video-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-cinematico-foto-video-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "luxury-cinematico-foto-video-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "luxury-cinematico-foto-video-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-cinematico-foto-video-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-cinematico-foto-video-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20H%C3%8DBRIDA%20-%20The%20Wedding%20Film%20Experience%20de%20boda."
  },
  {
    "category": "bodas",
    "slug": "sencilla-solo-fotos",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "Esencial – Recuerdo esencial de tu boda",
    "packageTypeLabel": "Solo fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Paquete de boda · solo fotografía",
    "lead": "Cobertura fotográfica ideal para capturar los momentos más importantes de tu boda de forma natural y emotiva.",
    "image": "assets/images/galery/M&D-22.jpg",
    "priceLines": [
      "900.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "sencilla-solo-fotos-cop",
        "label": "900.000 COP",
        "amountCop": 900000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de hasta 4 horas",
          "1 fotógrafo",
          "Dirección básica de poses",
          "Edición con estilo limpio y natural"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 150 fotografías editadas",
          "10 fotografías impresas",
          "Galería digital privada por 3 meses",
          "Entrega digital en alta resolución"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Ceremonia",
          "Momentos clave"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "sencilla-solo-fotos-section-1-1",
            "label": "Cobertura de hasta 4 horas",
            "selectedByDefault": true
          },
          {
            "id": "sencilla-solo-fotos-section-1-2",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "sencilla-solo-fotos-section-1-3",
            "label": "Dirección básica de poses",
            "selectedByDefault": true
          },
          {
            "id": "sencilla-solo-fotos-section-1-4",
            "label": "Edición con estilo limpio y natural",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "sencilla-solo-fotos-section-2-1",
            "label": "Hasta 150 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "sencilla-solo-fotos-section-2-2",
            "label": "10 fotografías impresas",
            "selectedByDefault": true
          },
          {
            "id": "sencilla-solo-fotos-section-2-3",
            "label": "Galería digital privada por 3 meses",
            "selectedByDefault": true
          },
          {
            "id": "sencilla-solo-fotos-section-2-4",
            "label": "Entrega digital en alta resolución",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "sencilla-solo-fotos-section-3-1",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "sencilla-solo-fotos-section-3-2",
            "label": "Momentos clave",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Complementa el paquete con piezas extra para la entrega.",
        "selectable": true,
        "options": [
          {
            "id": "sencilla-solo-fotos-addon-1",
            "label": "Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-2",
            "label": "Fotobook de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-3",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-4",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-5",
            "label": "Maquillaje profesional de novia||Maquillaje de larga duración profesional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-6",
            "label": "Peinado profesional||Estilo acorde al evento y maquillaje",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-7",
            "label": "Pianista en vivo||Música elegante en vivo para tu evento",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-8",
            "label": "Saxofonista||Ambiente sofisticado con saxofón en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-9",
            "label": "Violinista||Toque clásico y emocional para tu boda",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-10",
            "label": "Guitarrista||Acompañamiento musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-addon-11",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "sencilla-solo-fotos-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "sencilla-solo-fotos-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "sencilla-solo-fotos-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "sencilla-solo-fotos-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "sencilla-solo-fotos-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "sencilla-solo-fotos-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "sencilla-solo-fotos-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "sencilla-solo-fotos-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "sencilla-solo-fotos-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "sencilla-solo-fotos-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "sencilla-solo-fotos-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "sencilla-solo-fotos-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "sencilla-solo-fotos-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "sencilla-solo-fotos-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "sencilla-solo-fotos-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Esencial%20%E2%80%93%20Recuerdo%20esencial%20de%20tu%20boda%20de%20boda."
  },
  {
    "category": "bodas",
    "slug": "completa-solo-fotos",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "Completa – La historia completa de tu día",
    "packageTypeLabel": "Solo fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Paquete de boda · solo fotografía",
    "lead": "Cobertura más amplia que documenta tu boda con mayor detalle, acompañamiento y enfoque emocional.",
    "image": "assets/images/galery/M&D-29.jpg",
    "priceLines": [
      "1'650.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "completa-solo-fotos-cop",
        "label": "1'650.000 COP",
        "amountCop": 1650000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de hasta 7 horas",
          "1 fotógrafo principal",
          "1 asistente de fotografía",
          "Dirección y acompañamiento durante el evento",
          "Edición profesional con estilo natural"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 280 fotografías editadas",
          "20 fotografías impresas",
          "1 fotografía ampliada",
          "Galería digital privada por 6 meses",
          "Entrega digital en alta resolución"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparativos",
          "Ceremonia",
          "Sesión de fotos",
          "Recepción"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "completa-solo-fotos-section-1-1",
            "label": "Cobertura de hasta 7 horas",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-1-2",
            "label": "1 fotógrafo principal",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-1-3",
            "label": "1 asistente de fotografía",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-1-4",
            "label": "Dirección y acompañamiento durante el evento",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-1-5",
            "label": "Edición profesional con estilo natural",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "completa-solo-fotos-section-2-1",
            "label": "Hasta 280 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-2-2",
            "label": "20 fotografías impresas",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-2-3",
            "label": "1 fotografía ampliada",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-2-4",
            "label": "Galería digital privada por 6 meses",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-2-5",
            "label": "Entrega digital en alta resolución",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "completa-solo-fotos-section-3-1",
            "label": "Preparativos",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-3-2",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-3-3",
            "label": "Sesión de fotos",
            "selectedByDefault": true
          },
          {
            "id": "completa-solo-fotos-section-3-4",
            "label": "Recepción",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Complementa el paquete con piezas extra para la entrega.",
        "selectable": true,
        "options": [
          {
            "id": "completa-solo-fotos-addon-1",
            "label": "Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-2",
            "label": "Fotobook de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-3",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-4",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-5",
            "label": "Maquillaje profesional de novia||Maquillaje de larga duración profesional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-6",
            "label": "Peinado profesional||Estilo acorde al evento y maquillaje",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-7",
            "label": "Pianista en vivo||Música elegante en vivo para tu evento",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-8",
            "label": "Saxofonista||Ambiente sofisticado con saxofón en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-9",
            "label": "Violinista||Toque clásico y emocional para tu boda",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-10",
            "label": "Guitarrista||Acompañamiento musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-addon-11",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "completa-solo-fotos-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "completa-solo-fotos-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "completa-solo-fotos-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "completa-solo-fotos-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "completa-solo-fotos-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "completa-solo-fotos-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "completa-solo-fotos-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "completa-solo-fotos-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "completa-solo-fotos-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "completa-solo-fotos-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "completa-solo-fotos-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "completa-solo-fotos-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "completa-solo-fotos-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "completa-solo-fotos-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "completa-solo-fotos-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Completa%20%E2%80%93%20La%20historia%20completa%20de%20tu%20d%C3%ADa%20de%20boda."
  },
  {
    "category": "bodas",
    "slug": "premium-solo-fotos",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "Premium – Experiencia fotográfica completa",
    "packageTypeLabel": "Solo fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Paquete de boda · solo fotografía",
    "lead": "Experiencia completa que combina cobertura total, dirección creativa y fotografía con acabado artístico. Nuestro paquete recomendado.",
    "image": "assets/images/fotos/M&D-31.jpg",
    "priceLines": [
      "2'650.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "premium-solo-fotos-cop",
        "label": "2'650.000 COP",
        "amountCop": 2650000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura completa del evento (preparativos y fiesta)",
          "1 o 2 fotógrafos",
          "1 asistente",
          "Dirección creativa con enfoque artístico",
          "Sesión preboda incluida",
          "Edición profesional avanzada"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 450 fotografías editadas",
          "20 fotografías impresas",
          "Álbum fotográfico",
          "Adelanto rápido de fotografías",
          "Galería digital privada por 1 año",
          "Entrega digital en alta resolución"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparativos",
          "Ceremonia",
          "Sesión de fotos",
          "Recepción",
          "Fiesta"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "premium-solo-fotos-section-1-1",
            "label": "Cobertura completa del evento (preparativos y fiesta)",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-1-2",
            "label": "1 o 2 fotógrafos",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-1-3",
            "label": "1 asistente",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-1-4",
            "label": "Dirección creativa con enfoque artístico",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-1-5",
            "label": "Sesión preboda incluida",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-1-6",
            "label": "Edición profesional avanzada",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "premium-solo-fotos-section-2-1",
            "label": "Hasta 450 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-2-2",
            "label": "20 fotografías impresas",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-2-3",
            "label": "Álbum fotográfico",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-2-4",
            "label": "Adelanto rápido de fotografías",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-2-5",
            "label": "Galería digital privada por 1 año",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-2-6",
            "label": "Entrega digital en alta resolución",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "premium-solo-fotos-section-3-1",
            "label": "Preparativos",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-3-2",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-3-3",
            "label": "Sesión de fotos",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-3-4",
            "label": "Recepción",
            "selectedByDefault": true
          },
          {
            "id": "premium-solo-fotos-section-3-5",
            "label": "Fiesta",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Complementa el paquete con piezas extra para la entrega.",
        "selectable": true,
        "options": [
          {
            "id": "premium-solo-fotos-addon-1",
            "label": "Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-2",
            "label": "Fotobook de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-3",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-4",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-5",
            "label": "Maquillaje profesional de novia||Maquillaje de larga duración profesional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-6",
            "label": "Peinado profesional||Estilo acorde al evento y maquillaje",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-7",
            "label": "Pianista en vivo||Música elegante en vivo para tu evento",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-8",
            "label": "Saxofonista||Ambiente sofisticado con saxofón en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-9",
            "label": "Violinista||Toque clásico y emocional para tu boda",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-10",
            "label": "Guitarrista||Acompañamiento musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-addon-11",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "premium-solo-fotos-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "premium-solo-fotos-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "premium-solo-fotos-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "premium-solo-fotos-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "premium-solo-fotos-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "premium-solo-fotos-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "premium-solo-fotos-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "premium-solo-fotos-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "premium-solo-fotos-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "premium-solo-fotos-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "premium-solo-fotos-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "premium-solo-fotos-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "premium-solo-fotos-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "premium-solo-fotos-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "premium-solo-fotos-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Premium%20%E2%80%93%20Experiencia%20fotogr%C3%A1fica%20completa%20de%20boda."
  },
  {
    "category": "bodas",
    "slug": "luxury-solo-fotos",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "Exclusivo – Producción fotográfica de autor",
    "packageTypeLabel": "Solo fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Paquete de boda · solo fotografía",
    "lead": "Experiencia fotográfica de autor de alto nivel. Diseñada para parejas que buscan una estética artística y de autor, con un registro exclusivo y diferente de su boda.",
    "image": "assets/images/galery/M&D-32.jpg",
    "priceLines": [
      "4'100.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "luxury-solo-fotos-cop",
        "label": "4'100.000 COP",
        "amountCop": 4100000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 4,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de hasta 12 horas",
          "2 fotógrafos",
          "Asistente",
          "Sesión Preboda Premium y Sesión Postboda Premium incluidas",
          "Planeación creativa y tablero de inspiración (moodboard)",
          "Dirección creativa avanzada",
          "Iluminación profesional"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 600 fotografías editadas",
          "Álbum Premium XL",
          "Caja de presentación",
          "Sesión Preboda Premium",
          "Sesión Postboda Premium",
          "Adelanto rápido de 20 fotografías",
          "Galería privada durante 2 años",
          "Entrega prioritaria"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparativos de ambos novios",
          "Ceremonia",
          "Sesión de fotos artística",
          "Recepción",
          "Fiesta",
          "Detalles y decoración"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "luxury-solo-fotos-section-1-1",
            "label": "Cobertura de hasta 12 horas",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-1-2",
            "label": "2 fotógrafos",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-1-3",
            "label": "Asistente",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-1-4",
            "label": "Sesión Preboda Premium y Sesión Postboda Premium incluidas",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-1-5",
            "label": "Planeación creativa y tablero de inspiración (moodboard)",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-1-6",
            "label": "Dirección creativa avanzada",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-1-7",
            "label": "Iluminación profesional",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "luxury-solo-fotos-section-2-1",
            "label": "Hasta 600 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-2-2",
            "label": "Álbum Premium XL",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-2-3",
            "label": "Caja de presentación",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-2-4",
            "label": "Sesión Preboda Premium",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-2-5",
            "label": "Sesión Postboda Premium",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-2-6",
            "label": "Adelanto rápido de 20 fotografías",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-2-7",
            "label": "Galería privada durante 2 años",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-2-8",
            "label": "Entrega prioritaria",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "luxury-solo-fotos-section-3-1",
            "label": "Preparativos de ambos novios",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-3-2",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-3-3",
            "label": "Sesión de fotos artística",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-3-4",
            "label": "Recepción",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-3-5",
            "label": "Fiesta",
            "selectedByDefault": true
          },
          {
            "id": "luxury-solo-fotos-section-3-6",
            "label": "Detalles y decoración",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Complementa el paquete con piezas extra para la entrega.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-solo-fotos-addon-1",
            "label": "Cuadro en madera 70cm||Recuerdo elegante para decorar tu hogar",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-2",
            "label": "Fotobook de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-3",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-4",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-5",
            "label": "Maquillaje profesional de novia||Maquillaje de larga duración profesional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-6",
            "label": "Peinado profesional||Estilo acorde al evento y maquillaje",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-7",
            "label": "Pianista en vivo||Música elegante en vivo para tu evento",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-8",
            "label": "Saxofonista||Ambiente sofisticado con saxofón en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-9",
            "label": "Violinista||Toque clásico y emocional para tu boda",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-10",
            "label": "Guitarrista||Acompañamiento musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-addon-11",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-solo-fotos-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "luxury-solo-fotos-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "luxury-solo-fotos-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-solo-fotos-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "luxury-solo-fotos-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "luxury-solo-fotos-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-solo-fotos-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "luxury-solo-fotos-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "luxury-solo-fotos-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "luxury-solo-fotos-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-solo-fotos-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "luxury-solo-fotos-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "luxury-solo-fotos-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "luxury-solo-fotos-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "luxury-solo-fotos-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Exclusivo%20%E2%80%93%20Producci%C3%B3n%20fotogr%C3%A1fica%20de%20autor%20de%20boda."
  },
  {
    "category": "bodas",
    "slug": "video-bodas-elemental",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "Esencial – Recuerdo esencial de tu boda",
    "packageTypeLabel": "Video de bodas",
    "packageGroup": "custom",
    "eyebrow": "Paquete de boda · video",
    "lead": "Cobertura sencilla y emotiva grabada en resolución 4K para conservar los momentos más importantes de tu boda.",
    "image": "assets/images/galery/M&D-16.jpg",
    "priceLines": [
      "850.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "video-bodas-elemental-cop",
        "label": "850.000 COP",
        "amountCop": 850000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Cobertura parcial del evento (hasta 4 horas)",
          "1 videógrafo",
          "Grabación en resolución 4K",
          "Audio ambiente",
          "Tomas espontáneas"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Highlight Film de 4 a 6 minutos",
          "1 Reel vertical para redes sociales",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "video-bodas-elemental-section-1-1",
            "label": "Cobertura parcial del evento (hasta 4 horas)",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-elemental-section-1-2",
            "label": "1 videógrafo",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-elemental-section-1-3",
            "label": "Grabación en resolución 4K",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-elemental-section-1-4",
            "label": "Audio ambiente",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-elemental-section-1-5",
            "label": "Tomas espontáneas",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "video-bodas-elemental-section-2-1",
            "label": "Highlight Film de 4 a 6 minutos",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-elemental-section-2-2",
            "label": "1 Reel vertical para redes sociales",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-elemental-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-elemental-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "video-bodas-elemental-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "video-bodas-elemental-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-elemental-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "video-bodas-elemental-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "video-bodas-elemental-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-elemental-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "video-bodas-elemental-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "video-bodas-elemental-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "video-bodas-elemental-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-elemental-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "video-bodas-elemental-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "video-bodas-elemental-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-elemental-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "video-bodas-elemental-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "video-bodas-elemental-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Esencial%20%E2%80%93%20Recuerdo%20esencial%20de%20tu%20boda%20(video%20de%20bodas)."
  },
  {
    "category": "bodas",
    "slug": "video-bodas-completo",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "Completo – La historia de tu día",
    "packageTypeLabel": "Video de bodas",
    "packageGroup": "custom",
    "eyebrow": "Paquete de boda · video",
    "lead": "Narrativa completa de tu boda con dos cámaras y audio dedicado para capturar cada emoción.",
    "image": "assets/images/galery/M&D-29.jpg",
    "priceLines": [
      "1'650.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "video-bodas-completo-cop",
        "label": "1'650.000 COP",
        "amountCop": 1650000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Cobertura amplia (ceremonia y recepción parcial)",
          "2 cámaras",
          "Gimbal para tomas estabilizadas",
          "Captura de audio de votos y discursos",
          "Tomas creativas",
          "Edición narrativa"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Highlight Film",
          "Película documental",
          "1 Reel vertical para redes sociales",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "video-bodas-completo-section-1-1",
            "label": "Cobertura amplia (ceremonia y recepción parcial)",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-completo-section-1-2",
            "label": "2 cámaras",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-completo-section-1-3",
            "label": "Gimbal para tomas estabilizadas",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-completo-section-1-4",
            "label": "Captura de audio de votos y discursos",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-completo-section-1-5",
            "label": "Tomas creativas",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-completo-section-1-6",
            "label": "Edición narrativa",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "video-bodas-completo-section-2-1",
            "label": "Highlight Film",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-completo-section-2-2",
            "label": "Película documental",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-completo-section-2-3",
            "label": "1 Reel vertical para redes sociales",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-completo-section-2-4",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-completo-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "video-bodas-completo-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "video-bodas-completo-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-completo-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "video-bodas-completo-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "video-bodas-completo-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-completo-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "video-bodas-completo-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "video-bodas-completo-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "video-bodas-completo-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-completo-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "video-bodas-completo-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "video-bodas-completo-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-completo-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "video-bodas-completo-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "video-bodas-completo-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Completo%20%E2%80%93%20La%20historia%20de%20tu%20d%C3%ADa%20(video%20de%20bodas)."
  },
  {
    "category": "bodas",
    "slug": "video-bodas-premium",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "Premium – Experiencia cinematográfica",
    "packageTypeLabel": "Video de bodas",
    "packageGroup": "custom",
    "eyebrow": "Paquete de boda · video",
    "lead": "Producción audiovisual con enfoque cinematográfico, tomas aéreas y cobertura completa de tu boda.",
    "image": "assets/images/galery/M&D-30.jpg",
    "priceLines": [
      "2'800.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "video-bodas-premium-cop",
        "label": "2'800.000 COP",
        "amountCop": 2800000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Cobertura completa del evento (preparativos y fiesta)",
          "2 a 3 cámaras",
          "Tomas estabilizadas (gimbal)",
          "Tomas aéreas con drone (si aplica)",
          "Audio profesional dedicado",
          "Colorización cinematográfica"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Highlight Film",
          "Película documental",
          "2 Reels para redes sociales",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "video-bodas-premium-section-1-1",
            "label": "Cobertura completa del evento (preparativos y fiesta)",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-premium-section-1-2",
            "label": "2 a 3 cámaras",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-premium-section-1-3",
            "label": "Tomas estabilizadas (gimbal)",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-premium-section-1-4",
            "label": "Tomas aéreas con drone (si aplica)",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-premium-section-1-5",
            "label": "Audio profesional dedicado",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-premium-section-1-6",
            "label": "Colorización cinematográfica",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "video-bodas-premium-section-2-1",
            "label": "Highlight Film",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-premium-section-2-2",
            "label": "Película documental",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-premium-section-2-3",
            "label": "2 Reels para redes sociales",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-premium-section-2-4",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-premium-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "video-bodas-premium-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "video-bodas-premium-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-premium-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "video-bodas-premium-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "video-bodas-premium-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-premium-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "video-bodas-premium-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "video-bodas-premium-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "video-bodas-premium-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-premium-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "video-bodas-premium-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "video-bodas-premium-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-premium-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "video-bodas-premium-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "video-bodas-premium-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Premium%20%E2%80%93%20Experiencia%20cinematogr%C3%A1fica%20(video%20de%20bodas)."
  },
  {
    "category": "bodas",
    "slug": "video-bodas-luxury",
    "categoryLabel": "Bodas",
    "categoryHref": "/portfolio/bodas",
    "title": "Exclusivo – The Wedding Film Experience",
    "packageTypeLabel": "Video de bodas",
    "packageGroup": "custom",
    "eyebrow": "Paquete de boda · video",
    "lead": "Experiencia premium de autor que transforma tu boda en una película con narrativa cinematográfica, diseño sonoro e iluminación profesional.",
    "image": "assets/images/galery/M&D-32.jpg",
    "priceLines": [
      "4'500.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "video-bodas-luxury-cop",
        "label": "4'500.000 COP",
        "amountCop": 4500000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 4,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Cobertura completa desde preparativos hasta la fiesta",
          "Reunión de dirección, cronograma de producción, tablero de inspiración (moodboard) y desarrollo de narrativa",
          "3 a 4 cámaras",
          "2 videógrafos principales + Asistente",
          "Tomas avanzadas con gimbal y dron",
          "Audio profesional y multicámara con micrófonos dedicados",
          "Esquemas de iluminación profesional",
          "Corrección de color (color grading) cinematográfica avanzada",
          "Diseño de sonido (Sound Design) cinematográfico"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Tráiler cinematográfico",
          "Wedding Film principal",
          "Película documental larga",
          "3 a 4 Reels para redes",
          "Edición prioritaria",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "video-bodas-luxury-section-1-1",
            "label": "Cobertura completa desde preparativos hasta la fiesta",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-1-2",
            "label": "Reunión de dirección, cronograma de producción, tablero de inspiración (moodboard) y desarrollo de narrativa",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-1-3",
            "label": "3 a 4 cámaras",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-1-4",
            "label": "2 videógrafos principales + Asistente",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-1-5",
            "label": "Tomas avanzadas con gimbal y dron",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-1-6",
            "label": "Audio profesional y multicámara con micrófonos dedicados",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-1-7",
            "label": "Esquemas de iluminación profesional",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-1-8",
            "label": "Corrección de color (color grading) cinematográfica avanzada",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-1-9",
            "label": "Diseño de sonido (Sound Design) cinematográfico",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "video-bodas-luxury-section-2-1",
            "label": "Tráiler cinematográfico",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-2-2",
            "label": "Wedding Film principal",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-2-3",
            "label": "Película documental larga",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-2-4",
            "label": "3 a 4 Reels para redes",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-2-5",
            "label": "Edición prioritaria",
            "selectedByDefault": true
          },
          {
            "id": "video-bodas-luxury-section-2-6",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-luxury-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "video-bodas-luxury-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "video-bodas-luxury-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-luxury-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "video-bodas-luxury-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "video-bodas-luxury-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-luxury-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "video-bodas-luxury-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "video-bodas-luxury-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "video-bodas-luxury-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-luxury-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "video-bodas-luxury-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "video-bodas-luxury-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "video-bodas-luxury-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "video-bodas-luxury-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "video-bodas-luxury-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Exclusivo%20%E2%80%93%20The%20Wedding%20Film%20Experience%20(video%20de%20bodas)."
  },
  {
    "category": "bodas",
    "slug": "civil-esencial",
    "categoryLabel": "Boda civil",
    "categoryHref": "/portfolio/bodas",
    "title": "Civil Esencial",
    "packageTypeLabel": "Boda civil",
    "packageGroup": "custom",
    "eyebrow": "Boda civil",
    "lead": "Una cobertura cercana y precisa para conservar los momentos esenciales de tu ceremonia civil.",
    "image": "assets/images/stock/boda-civil/civil-esencial.jpg",
    "priceLines": [
      "550.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "civil-esencial-cop",
        "label": "550.000 COP",
        "amountCop": 550000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo",
          "Duración de 2 horas",
          "Dirección de pareja y fotografías familiares"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 50 fotografías finales, seleccionadas y editadas",
          "Galería digital privada por 1 mes",
          "Entrega final en alta resolución por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Ceremonia civil",
          "Firma de documentos y anillos",
          "Familiares",
          "Sesión breve de pareja"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "civil-esencial-section-1-1",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "civil-esencial-section-1-2",
            "label": "Duración de 2 horas",
            "selectedByDefault": true
          },
          {
            "id": "civil-esencial-section-1-3",
            "label": "Dirección de pareja y fotografías familiares",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "civil-esencial-section-2-1",
            "label": "Hasta 50 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "civil-esencial-section-2-2",
            "label": "Galería digital privada por 1 mes",
            "selectedByDefault": true
          },
          {
            "id": "civil-esencial-section-2-3",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "civil-esencial-section-3-1",
            "label": "Ceremonia civil",
            "selectedByDefault": true
          },
          {
            "id": "civil-esencial-section-3-2",
            "label": "Firma de documentos y anillos",
            "selectedByDefault": true
          },
          {
            "id": "civil-esencial-section-3-3",
            "label": "Familiares",
            "selectedByDefault": true
          },
          {
            "id": "civil-esencial-section-3-4",
            "label": "Sesión breve de pareja",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Amplía la cobertura o suma entregables sin cambiar el paquete base.",
        "selectable": true,
        "options": [
          {
            "id": "civil-esencial-addon-1",
            "label": "Hora adicional||Extiende la cobertura de la ceremonia o celebración",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "civil-esencial-addon-2",
            "label": "Grabación continua de la ceremonia||Registro completo de la ceremonia civil con audio",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "civil-esencial-addon-3",
            "label": "Reel adicional para redes",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "civil-esencial-addon-4",
            "label": "Video extendido||Versión más amplia de la historia audiovisual",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "civil-esencial-addon-5",
            "label": "Cuadro fotográfico adicional 60 x 40 cm",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "civil-esencial-addon-6",
            "label": "Fotobook de lujo",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "civil-esencial-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "civil-esencial-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "civil-esencial-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "civil-esencial-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "civil-esencial-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "civil-esencial-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "civil-esencial-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "civil-esencial-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "civil-esencial-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "civil-esencial-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "civil-esencial-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "civil-esencial-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "civil-esencial-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Civil%20Esencial."
  },
  {
    "category": "bodas",
    "slug": "civil-completa",
    "categoryLabel": "Boda civil",
    "categoryHref": "/portfolio/bodas",
    "title": "Civil Completa",
    "packageTypeLabel": "Boda civil",
    "packageGroup": "custom",
    "eyebrow": "Boda civil",
    "lead": "Una narrativa más completa que acompaña la llegada, la ceremonia y una celebración breve.",
    "image": "assets/images/stock/boda-civil/civil-completa.jpg",
    "priceLines": [
      "850.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "civil-completa-cop",
        "label": "850.000 COP",
        "amountCop": 850000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo",
          "Duración de 3 horas",
          "Dirección creativa de pareja y grupos"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 100 fotografías finales, seleccionadas y editadas",
          "Reel vertical de 30 a 45 segundos",
          "1 cuadro fotográfico de 60 x 40 cm",
          "Galería digital privada por 3 meses",
          "Entrega final en alta resolución por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Llegada",
          "Ceremonia civil",
          "Firma de documentos y anillos",
          "Familiares e invitados",
          "Sesión dirigida de pareja",
          "Brindis o recepción breve"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "civil-completa-section-1-1",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-1-2",
            "label": "Duración de 3 horas",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-1-3",
            "label": "Dirección creativa de pareja y grupos",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "civil-completa-section-2-1",
            "label": "Hasta 100 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-2-2",
            "label": "Reel vertical de 30 a 45 segundos",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-2-3",
            "label": "1 cuadro fotográfico de 60 x 40 cm",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-2-4",
            "label": "Galería digital privada por 3 meses",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-2-5",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "civil-completa-section-3-1",
            "label": "Llegada",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-3-2",
            "label": "Ceremonia civil",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-3-3",
            "label": "Firma de documentos y anillos",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-3-4",
            "label": "Familiares e invitados",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-3-5",
            "label": "Sesión dirigida de pareja",
            "selectedByDefault": true
          },
          {
            "id": "civil-completa-section-3-6",
            "label": "Brindis o recepción breve",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Amplía la cobertura o suma entregables sin cambiar el paquete base.",
        "selectable": true,
        "options": [
          {
            "id": "civil-completa-addon-1",
            "label": "Hora adicional||Extiende la cobertura de la ceremonia o celebración",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "civil-completa-addon-2",
            "label": "Grabación continua de la ceremonia||Registro completo de la ceremonia civil con audio",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "civil-completa-addon-3",
            "label": "Reel adicional para redes",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "civil-completa-addon-4",
            "label": "Video extendido||Versión más amplia de la historia audiovisual",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "civil-completa-addon-5",
            "label": "Cuadro fotográfico adicional 60 x 40 cm",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "civil-completa-addon-6",
            "label": "Fotobook de lujo",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "civil-completa-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "civil-completa-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "civil-completa-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "civil-completa-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "civil-completa-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "civil-completa-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "civil-completa-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "civil-completa-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "civil-completa-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "civil-completa-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "civil-completa-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "civil-completa-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "civil-completa-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Civil%20Completa."
  },
  {
    "category": "bodas",
    "slug": "civil-hibrida",
    "categoryLabel": "Boda civil",
    "categoryHref": "/portfolio/bodas",
    "title": "Civil Híbrida",
    "packageTypeLabel": "Boda civil",
    "packageGroup": "custom",
    "eyebrow": "Boda civil",
    "lead": "Fotografía y video coordinados para contar la ceremonia civil con una mirada más completa.",
    "image": "assets/images/stock/boda-civil/civil-hibrida.jpg",
    "priceLines": [
      "1'350.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "civil-hibrida-cop",
        "label": "1'350.000 COP",
        "amountCop": 1350000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo y 1 videógrafo",
          "Duración de 4 horas",
          "Reunión breve de planeación",
          "Dirección audiovisual"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 120 fotografías finales, seleccionadas y editadas",
          "Reel vertical de 45 a 60 segundos",
          "Video principal de 3 a 5 minutos",
          "Galería digital privada por 6 meses",
          "Entrega final en alta resolución por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Llegada o preparación breve",
          "Ceremonia civil",
          "Firma de documentos y anillos",
          "Familiares e invitados",
          "Sesión de pareja",
          "Brindis o recepción"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "civil-hibrida-section-1-1",
            "label": "1 fotógrafo y 1 videógrafo",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-1-2",
            "label": "Duración de 4 horas",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-1-3",
            "label": "Reunión breve de planeación",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-1-4",
            "label": "Dirección audiovisual",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "civil-hibrida-section-2-1",
            "label": "Hasta 120 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-2-2",
            "label": "Reel vertical de 45 a 60 segundos",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-2-3",
            "label": "Video principal de 3 a 5 minutos",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-2-4",
            "label": "Galería digital privada por 6 meses",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-2-5",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "civil-hibrida-section-3-1",
            "label": "Llegada o preparación breve",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-3-2",
            "label": "Ceremonia civil",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-3-3",
            "label": "Firma de documentos y anillos",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-3-4",
            "label": "Familiares e invitados",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-3-5",
            "label": "Sesión de pareja",
            "selectedByDefault": true
          },
          {
            "id": "civil-hibrida-section-3-6",
            "label": "Brindis o recepción",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Amplía la cobertura o suma entregables sin cambiar el paquete base.",
        "selectable": true,
        "options": [
          {
            "id": "civil-hibrida-addon-1",
            "label": "Hora adicional||Extiende la cobertura de la ceremonia o celebración",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "civil-hibrida-addon-2",
            "label": "Grabación continua de la ceremonia||Registro completo de la ceremonia civil con audio",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "civil-hibrida-addon-3",
            "label": "Reel adicional para redes",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "civil-hibrida-addon-4",
            "label": "Video extendido||Versión más amplia de la historia audiovisual",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "civil-hibrida-addon-5",
            "label": "Cuadro fotográfico adicional 60 x 40 cm",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "civil-hibrida-addon-6",
            "label": "Fotobook de lujo",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Documenta el comienzo de la historia antes de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "civil-hibrida-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "civil-hibrida-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "civil-hibrida-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "civil-hibrida-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "civil-hibrida-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "civil-hibrida-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "civil-hibrida-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Sesión postboda",
        "description": "Extiende la historia con una sesión después de la celebración.",
        "selectable": true,
        "options": [
          {
            "id": "civil-hibrida-related-postboda-esencial",
            "label": "Postboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-esencial"
          },
          {
            "id": "civil-hibrida-related-postboda-completa",
            "label": "Postboda Completa",
            "priceLabel": "650.000 COP",
            "priceAmountCop": 650000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-completa"
          },
          {
            "id": "civil-hibrida-related-postboda-premium",
            "label": "Postboda Editorial",
            "priceLabel": "950.000 COP",
            "priceAmountCop": 950000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "postboda-premium"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "civil-hibrida-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "civil-hibrida-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "civil-hibrida-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Civil%20H%C3%ADbrida."
  },
  {
    "category": "bodas",
    "slug": "peticion-esencial",
    "categoryLabel": "Petición de mano",
    "categoryHref": "/portfolio/bodas",
    "title": "Petición Esencial",
    "packageTypeLabel": "Petición de mano",
    "packageGroup": "custom",
    "eyebrow": "Petición de mano",
    "lead": "Capturamos la sorpresa con discreción y cerramos la experiencia con una sesión breve de pareja.",
    "image": "assets/images/stock/peticion-de-mano/peticion-esencial.jpg",
    "priceLines": [
      "450.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "peticion-esencial-cop",
        "label": "450.000 COP",
        "amountCop": 450000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo",
          "Duración de 2 horas",
          "Reunión breve de planeación",
          "Coordinación de ubicación y momento clave"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 50 fotografías finales, seleccionadas y editadas",
          "Galería digital privada por 1 mes",
          "Entrega final en alta resolución por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Llegada discreta",
          "Momento de la petición",
          "Reacciones",
          "Sesión breve de pareja"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "peticion-esencial-section-1-1",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "peticion-esencial-section-1-2",
            "label": "Duración de 2 horas",
            "selectedByDefault": true
          },
          {
            "id": "peticion-esencial-section-1-3",
            "label": "Reunión breve de planeación",
            "selectedByDefault": true
          },
          {
            "id": "peticion-esencial-section-1-4",
            "label": "Coordinación de ubicación y momento clave",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "peticion-esencial-section-2-1",
            "label": "Hasta 50 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "peticion-esencial-section-2-2",
            "label": "Galería digital privada por 1 mes",
            "selectedByDefault": true
          },
          {
            "id": "peticion-esencial-section-2-3",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "peticion-esencial-section-3-1",
            "label": "Llegada discreta",
            "selectedByDefault": true
          },
          {
            "id": "peticion-esencial-section-3-2",
            "label": "Momento de la petición",
            "selectedByDefault": true
          },
          {
            "id": "peticion-esencial-section-3-3",
            "label": "Reacciones",
            "selectedByDefault": true
          },
          {
            "id": "peticion-esencial-section-3-4",
            "label": "Sesión breve de pareja",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Personaliza el registro audiovisual sin modificar el paquete base.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-esencial-addon-1",
            "label": "Hora adicional||Amplía la preparación, sesión o celebración",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-esencial-addon-2",
            "label": "Videógrafo adicional||Suma registro profesional de video al equipo",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-esencial-addon-3",
            "label": "Reel adicional para redes",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-esencial-addon-4",
            "label": "Video extendido||Versión más amplia de la petición y sus reacciones",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-esencial-addon-5",
            "label": "Cuadro fotográfico adicional 60 x 40 cm",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-esencial-addon-6",
            "label": "Edición prioritaria",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-esencial-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "peticion-esencial-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "peticion-esencial-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-esencial-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "peticion-esencial-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "peticion-esencial-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "peticion-esencial-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Cobertura principal de boda",
        "description": "Continúa con uno de los paquetes protagonistas de foto y video.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-esencial-related-esencial-hibrido-foto-video",
            "label": "HÍBRIDA - Tu historia en foto y video",
            "priceLabel": "1'900.000 COP",
            "priceAmountCop": 1900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "esencial-hibrido-foto-video"
          },
          {
            "id": "peticion-esencial-related-completo-hibrido-foto-video",
            "label": "HÍBRIDA - La historia completa de tu boda",
            "priceLabel": "2'800.000 COP",
            "priceAmountCop": 2800000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "completo-hibrido-foto-video"
          },
          {
            "id": "peticion-esencial-related-premium-cinematico-foto-video",
            "label": "HÍBRIDA - Experiencia cinematográfica",
            "priceLabel": "3'900.000 COP",
            "priceAmountCop": 3900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "premium-cinematico-foto-video"
          },
          {
            "id": "peticion-esencial-related-luxury-cinematico-foto-video",
            "label": "HÍBRIDA - The Wedding Film Experience",
            "priceLabel": "6'100.000 COP",
            "priceAmountCop": 6100000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "luxury-cinematico-foto-video"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-esencial-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-esencial-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-esencial-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Petici%C3%B3n%20Esencial."
  },
  {
    "category": "bodas",
    "slug": "peticion-completa",
    "categoryLabel": "Petición de mano",
    "categoryHref": "/portfolio/bodas",
    "title": "Petición Completa",
    "packageTypeLabel": "Petición de mano",
    "packageGroup": "custom",
    "eyebrow": "Petición de mano",
    "lead": "Una cobertura más cuidada para documentar la preparación, la sorpresa y la celebración posterior.",
    "image": "assets/images/stock/peticion-de-mano/peticion-completa.jpg",
    "priceLines": [
      "750.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "peticion-completa-cop",
        "label": "750.000 COP",
        "amountCop": 750000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo y 1 asistente",
          "Duración de 3 horas",
          "Reunión de planeación",
          "Apoyo de iluminación y coordinación discreta"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 80 fotografías finales, seleccionadas y editadas",
          "Reel vertical de 30 a 45 segundos",
          "1 cuadro fotográfico de 60 x 40 cm",
          "Galería digital privada por 3 meses",
          "Entrega final en alta resolución por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparación del momento",
          "Llegada discreta",
          "Petición y reacciones",
          "Sesión dirigida de pareja",
          "Brindis o celebración breve"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "peticion-completa-section-1-1",
            "label": "1 fotógrafo y 1 asistente",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-1-2",
            "label": "Duración de 3 horas",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-1-3",
            "label": "Reunión de planeación",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-1-4",
            "label": "Apoyo de iluminación y coordinación discreta",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "peticion-completa-section-2-1",
            "label": "Hasta 80 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-2-2",
            "label": "Reel vertical de 30 a 45 segundos",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-2-3",
            "label": "1 cuadro fotográfico de 60 x 40 cm",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-2-4",
            "label": "Galería digital privada por 3 meses",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-2-5",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "peticion-completa-section-3-1",
            "label": "Preparación del momento",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-3-2",
            "label": "Llegada discreta",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-3-3",
            "label": "Petición y reacciones",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-3-4",
            "label": "Sesión dirigida de pareja",
            "selectedByDefault": true
          },
          {
            "id": "peticion-completa-section-3-5",
            "label": "Brindis o celebración breve",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Personaliza el registro audiovisual sin modificar el paquete base.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-completa-addon-1",
            "label": "Hora adicional||Amplía la preparación, sesión o celebración",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-completa-addon-2",
            "label": "Videógrafo adicional||Suma registro profesional de video al equipo",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-completa-addon-3",
            "label": "Reel adicional para redes",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-completa-addon-4",
            "label": "Video extendido||Versión más amplia de la petición y sus reacciones",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-completa-addon-5",
            "label": "Cuadro fotográfico adicional 60 x 40 cm",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-completa-addon-6",
            "label": "Edición prioritaria",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-completa-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "peticion-completa-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "peticion-completa-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-completa-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "peticion-completa-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "peticion-completa-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "peticion-completa-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Cobertura principal de boda",
        "description": "Continúa con uno de los paquetes protagonistas de foto y video.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-completa-related-esencial-hibrido-foto-video",
            "label": "HÍBRIDA - Tu historia en foto y video",
            "priceLabel": "1'900.000 COP",
            "priceAmountCop": 1900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "esencial-hibrido-foto-video"
          },
          {
            "id": "peticion-completa-related-completo-hibrido-foto-video",
            "label": "HÍBRIDA - La historia completa de tu boda",
            "priceLabel": "2'800.000 COP",
            "priceAmountCop": 2800000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "completo-hibrido-foto-video"
          },
          {
            "id": "peticion-completa-related-premium-cinematico-foto-video",
            "label": "HÍBRIDA - Experiencia cinematográfica",
            "priceLabel": "3'900.000 COP",
            "priceAmountCop": 3900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "premium-cinematico-foto-video"
          },
          {
            "id": "peticion-completa-related-luxury-cinematico-foto-video",
            "label": "HÍBRIDA - The Wedding Film Experience",
            "priceLabel": "6'100.000 COP",
            "priceAmountCop": 6100000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "luxury-cinematico-foto-video"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-completa-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-completa-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-completa-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Petici%C3%B3n%20Completa."
  },
  {
    "category": "bodas",
    "slug": "peticion-hibrida",
    "categoryLabel": "Petición de mano",
    "categoryHref": "/portfolio/bodas",
    "title": "Petición Híbrida",
    "packageTypeLabel": "Petición de mano",
    "packageGroup": "custom",
    "eyebrow": "Petición de mano",
    "lead": "Fotografía y video coordinados para convertir la sorpresa en una historia audiovisual completa.",
    "image": "assets/images/stock/peticion-de-mano/peticion-hibrida.jpg",
    "priceLines": [
      "1'150.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "peticion-hibrida-cop",
        "label": "1'150.000 COP",
        "amountCop": 1150000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo, 1 videógrafo y 1 asistente",
          "Duración de 4 horas",
          "Planeación audiovisual",
          "Coordinación discreta del equipo"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 100 fotografías finales, seleccionadas y editadas",
          "Reel vertical de 45 a 60 segundos",
          "Video principal de 2 a 4 minutos",
          "Galería digital privada por 6 meses",
          "Entrega final en alta resolución por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparación y detalles",
          "Llegada discreta",
          "Petición y reacciones",
          "Sesión de pareja",
          "Brindis o celebración"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "peticion-hibrida-section-1-1",
            "label": "1 fotógrafo, 1 videógrafo y 1 asistente",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-1-2",
            "label": "Duración de 4 horas",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-1-3",
            "label": "Planeación audiovisual",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-1-4",
            "label": "Coordinación discreta del equipo",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "peticion-hibrida-section-2-1",
            "label": "Hasta 100 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-2-2",
            "label": "Reel vertical de 45 a 60 segundos",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-2-3",
            "label": "Video principal de 2 a 4 minutos",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-2-4",
            "label": "Galería digital privada por 6 meses",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-2-5",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "peticion-hibrida-section-3-1",
            "label": "Preparación y detalles",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-3-2",
            "label": "Llegada discreta",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-3-3",
            "label": "Petición y reacciones",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-3-4",
            "label": "Sesión de pareja",
            "selectedByDefault": true
          },
          {
            "id": "peticion-hibrida-section-3-5",
            "label": "Brindis o celebración",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Personaliza el registro audiovisual sin modificar el paquete base.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-hibrida-addon-1",
            "label": "Hora adicional||Amplía la preparación, sesión o celebración",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-hibrida-addon-2",
            "label": "Videógrafo adicional||Suma registro profesional de video al equipo",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-hibrida-addon-3",
            "label": "Reel adicional para redes",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-hibrida-addon-4",
            "label": "Video extendido||Versión más amplia de la petición y sus reacciones",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-hibrida-addon-5",
            "label": "Cuadro fotográfico adicional 60 x 40 cm",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-hibrida-addon-6",
            "label": "Edición prioritaria",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Añade una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-hibrida-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "peticion-hibrida-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "peticion-hibrida-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Sesión de preboda",
        "description": "Crea fotografías de pareja antes del día de la boda.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-hibrida-related-preboda-esencial",
            "label": "Preboda Esencial",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-esencial"
          },
          {
            "id": "peticion-hibrida-related-preboda-completa",
            "label": "Preboda Completa",
            "priceLabel": "580.000 COP",
            "priceAmountCop": 580000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-completa"
          },
          {
            "id": "peticion-hibrida-related-preboda-editorial",
            "label": "Preboda Editorial",
            "priceLabel": "780.000 COP",
            "priceAmountCop": 780000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-editorial"
          },
          {
            "id": "peticion-hibrida-related-preboda-premium",
            "label": "Preboda Cinematográfica",
            "priceLabel": "1.150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "preboda",
            "linkedPackageSlug": "preboda-premium"
          }
        ]
      },
      {
        "title": "Cobertura principal de boda",
        "description": "Continúa con uno de los paquetes protagonistas de foto y video.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-hibrida-related-esencial-hibrido-foto-video",
            "label": "HÍBRIDA - Tu historia en foto y video",
            "priceLabel": "1'900.000 COP",
            "priceAmountCop": 1900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "esencial-hibrido-foto-video"
          },
          {
            "id": "peticion-hibrida-related-completo-hibrido-foto-video",
            "label": "HÍBRIDA - La historia completa de tu boda",
            "priceLabel": "2'800.000 COP",
            "priceAmountCop": 2800000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "completo-hibrido-foto-video"
          },
          {
            "id": "peticion-hibrida-related-premium-cinematico-foto-video",
            "label": "HÍBRIDA - Experiencia cinematográfica",
            "priceLabel": "3'900.000 COP",
            "priceAmountCop": 3900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "premium-cinematico-foto-video"
          },
          {
            "id": "peticion-hibrida-related-luxury-cinematico-foto-video",
            "label": "HÍBRIDA - The Wedding Film Experience",
            "priceLabel": "6'100.000 COP",
            "priceAmountCop": 6100000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "luxury-cinematico-foto-video"
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "peticion-hibrida-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-hibrida-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "peticion-hibrida-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Petici%C3%B3n%20H%C3%ADbrida."
  },
  {
    "category": "bodas",
    "slug": "postboda-esencial",
    "categoryLabel": "Sesión postboda",
    "categoryHref": "/portfolio/bodas",
    "title": "Postboda Esencial",
    "packageTypeLabel": "Sesión postboda",
    "packageGroup": "session",
    "eyebrow": "Postboda · sesión fotográfica",
    "lead": "Sesión sencilla y emotiva para capturar momentos naturales como recién casados sin el estrés del evento.",
    "image": "assets/images/galery/M&D-15.jpg",
    "priceLines": [
      "400.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "postboda-esencial-cop",
        "label": "400.000 COP",
        "amountCop": 400000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "1 fotógrafo",
          "1 locación",
          "Duración de 2 horas",
          "1 vestuario",
          "Dirección de pareja",
          "Sesión en exterior"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 50 fotografías finales, seleccionadas y editadas",
          "Galería digital privada por 1 mes",
          "Entrega final en alta resolución por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "postboda-esencial-section-1-1",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "postboda-esencial-section-1-2",
            "label": "1 locación",
            "selectedByDefault": true
          },
          {
            "id": "postboda-esencial-section-1-3",
            "label": "Duración de 2 horas",
            "selectedByDefault": true
          },
          {
            "id": "postboda-esencial-section-1-4",
            "label": "1 vestuario",
            "selectedByDefault": true
          },
          {
            "id": "postboda-esencial-section-1-5",
            "label": "Dirección de pareja",
            "selectedByDefault": true
          },
          {
            "id": "postboda-esencial-section-1-6",
            "label": "Sesión en exterior",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "postboda-esencial-section-2-1",
            "label": "Hasta 50 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "postboda-esencial-section-2-2",
            "label": "Galería digital privada por 1 mes",
            "selectedByDefault": true
          },
          {
            "id": "postboda-esencial-section-2-3",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "postboda-esencial-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "postboda-esencial-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "postboda-esencial-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Postboda%20Esencial%20(sesi%C3%B3n%20postboda)."
  },
  {
    "category": "bodas",
    "slug": "postboda-completa",
    "categoryLabel": "Sesión postboda",
    "categoryHref": "/portfolio/bodas",
    "title": "Postboda Completa",
    "packageTypeLabel": "Sesión postboda",
    "packageGroup": "session",
    "eyebrow": "Postboda · sesión fotográfica",
    "lead": "Sesión más elaborada que permite explorar diferentes escenarios y lograr fotografías más cuidadas y expresivas.",
    "image": "assets/images/galery/M&D-21.jpg",
    "priceLines": [
      "650.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "postboda-completa-cop",
        "label": "650.000 COP",
        "amountCop": 650000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "1 fotógrafo",
          "1 a 2 locaciones cercanas",
          "Duración de 3 horas",
          "Hasta 2 vestuarios",
          "Dirección creativa"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 80 fotografías finales, seleccionadas y editadas",
          "1 cuadro fotográfico de 60 x 40 cm",
          "Galería digital privada por 3 meses",
          "Entrega final en alta calidad por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "postboda-completa-section-1-1",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "postboda-completa-section-1-2",
            "label": "1 a 2 locaciones cercanas",
            "selectedByDefault": true
          },
          {
            "id": "postboda-completa-section-1-3",
            "label": "Duración de 3 horas",
            "selectedByDefault": true
          },
          {
            "id": "postboda-completa-section-1-4",
            "label": "Hasta 2 vestuarios",
            "selectedByDefault": true
          },
          {
            "id": "postboda-completa-section-1-5",
            "label": "Dirección creativa",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "postboda-completa-section-2-1",
            "label": "Hasta 80 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "postboda-completa-section-2-2",
            "label": "1 cuadro fotográfico de 60 x 40 cm",
            "selectedByDefault": true
          },
          {
            "id": "postboda-completa-section-2-3",
            "label": "Galería digital privada por 3 meses",
            "selectedByDefault": true
          },
          {
            "id": "postboda-completa-section-2-4",
            "label": "Entrega final en alta calidad por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "postboda-completa-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "postboda-completa-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "postboda-completa-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Postboda%20Completa%20(sesi%C3%B3n%20postboda)."
  },
  {
    "category": "bodas",
    "slug": "postboda-premium",
    "categoryLabel": "Sesión postboda",
    "categoryHref": "/portfolio/bodas",
    "title": "Postboda Editorial",
    "packageTypeLabel": "Sesión postboda",
    "packageGroup": "session",
    "eyebrow": "Postboda · sesión fotográfica",
    "lead": "Sesión diseñada para crear imágenes impactantes con estética artística en locaciones especiales.",
    "image": "assets/images/galery/M&D-22.jpg",
    "priceLines": [
      "950.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "postboda-premium-cop",
        "label": "950.000 COP",
        "amountCop": 950000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "1 fotógrafo y 1 asistente",
          "Hasta 2 locaciones",
          "Duración de 4 horas",
          "Hasta 3 vestuarios",
          "Reunión breve de planeación",
          "Concepto visual",
          "dirección creativa avanzada avanzada",
          "Apoyo de iluminación y logística durante la sesión"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 120 fotografías finales, seleccionadas y editadas",
          "Reel vertical de 30 a 45 segundos",
          "1 cuadro fotográfico de 60 x 40 cm",
          "Galería digital privada por 6 meses",
          "Entrega final en alta resolución por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "postboda-premium-section-1-1",
            "label": "1 fotógrafo y 1 asistente",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-1-2",
            "label": "Hasta 2 locaciones",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-1-3",
            "label": "Duración de 4 horas",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-1-4",
            "label": "Hasta 3 vestuarios",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-1-5",
            "label": "Reunión breve de planeación",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-1-6",
            "label": "Concepto visual",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-1-7",
            "label": "dirección creativa avanzada avanzada",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-1-8",
            "label": "Apoyo de iluminación y logística durante la sesión",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "postboda-premium-section-2-1",
            "label": "Hasta 120 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-2-2",
            "label": "Reel vertical de 30 a 45 segundos",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-2-3",
            "label": "1 cuadro fotográfico de 60 x 40 cm",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-2-4",
            "label": "Galería digital privada por 6 meses",
            "selectedByDefault": true
          },
          {
            "id": "postboda-premium-section-2-5",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu boda con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "postboda-premium-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "postboda-premium-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "postboda-premium-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "\"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente.\"",
      "\"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos.\"",
      "\"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje.\""
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Postboda%20Editorial%20(sesi%C3%B3n%20postboda)."
  },
  {
    "category": "quinces",
    "slug": "quince-esencial-recuerdos",
    "categoryLabel": "Fotografía de quince",
    "categoryHref": "/portfolio/quinces",
    "title": "Esencial – Recuerdos de tus quince",
    "packageTypeLabel": "Solo fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Fotografía de quince",
    "lead": "Cobertura fotográfica enfocada en capturar los momentos más importantes de tu celebración de forma natural y elegante.",
    "image": "assets/images/galery/M&D-22.jpg",
    "priceLines": [
      "650.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-esencial-recuerdos-cop",
        "label": "650.000 COP",
        "amountCop": 650000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura del evento de 3 a 4 horas",
          "Asistencia básica en dirección de poses",
          "Enfoque documental para los momentos clave"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "80 a 120 fotografías con edición profesional",
          "1 ampliación fotográfica de 50 cm",
          "Entrega final en alta resolución por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Llegada de la quinceañera",
          "Ceremonia",
          "Vals de honor",
          "Brindis",
          "Sesión corta con núcleo familiar"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-esencial-recuerdos-section-1-1",
            "label": "Cobertura del evento de 3 a 4 horas",
            "selectedByDefault": true
          },
          {
            "id": "quince-esencial-recuerdos-section-1-2",
            "label": "Asistencia básica en dirección de poses",
            "selectedByDefault": true
          },
          {
            "id": "quince-esencial-recuerdos-section-1-3",
            "label": "Enfoque documental para los momentos clave",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-esencial-recuerdos-section-2-1",
            "label": "80 a 120 fotografías con edición profesional",
            "selectedByDefault": true
          },
          {
            "id": "quince-esencial-recuerdos-section-2-2",
            "label": "1 ampliación fotográfica de 50 cm",
            "selectedByDefault": true
          },
          {
            "id": "quince-esencial-recuerdos-section-2-3",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-esencial-recuerdos-section-3-1",
            "label": "Llegada de la quinceañera",
            "selectedByDefault": true
          },
          {
            "id": "quince-esencial-recuerdos-section-3-2",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-esencial-recuerdos-section-3-3",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-esencial-recuerdos-section-3-4",
            "label": "Brindis",
            "selectedByDefault": true
          },
          {
            "id": "quince-esencial-recuerdos-section-3-5",
            "label": "Sesión corta con núcleo familiar",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-esencial-recuerdos-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-esencial-recuerdos-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-esencial-recuerdos-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Esencial%20%E2%80%93%20Recuerdos%20de%20tus%20quince%20(fotograf%C3%ADa%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-completa-historia",
    "categoryLabel": "Fotografía de quince",
    "categoryHref": "/portfolio/quinces",
    "title": "Completa – Historia en fotografía",
    "packageTypeLabel": "Solo fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Fotografía de quince",
    "lead": "Una cobertura más amplia y artística que permite capturar desde tus preparativos hasta el inicio de la gran fiesta.",
    "image": "assets/images/fotos/M&D-12.jpg",
    "priceLines": [
      "1'250.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-completa-historia-cop",
        "label": "1'250.000 COP",
        "amountCop": 1250000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura del evento de 6 a 7 horas",
          "Dirección de poses y fotografía artística",
          "Asistente de iluminación dedicado para tomas más dramáticas",
          "Mayor enfoque en la estética visual del evento"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "150 a 200 fotografías con edición profesional",
          "1 ampliación fotográfica de 50 cm",
          "10 fotografías impresas en calidad museo (15 cm)",
          "Galería digital privada e interactiva",
          "Entrega final en alta resolución"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Arreglos y preparativos",
          "Llegada al evento",
          "Sesión de retratos de la quinceañera",
          "Ceremonia",
          "Vals de honor",
          "Fotos con invitados",
          "Inicio de recepción"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-completa-historia-section-1-1",
            "label": "Cobertura del evento de 6 a 7 horas",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-1-2",
            "label": "Dirección de poses y fotografía artística",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-1-3",
            "label": "Asistente de iluminación dedicado para tomas más dramáticas",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-1-4",
            "label": "Mayor enfoque en la estética visual del evento",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-completa-historia-section-2-1",
            "label": "150 a 200 fotografías con edición profesional",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-2-2",
            "label": "1 ampliación fotográfica de 50 cm",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-2-3",
            "label": "10 fotografías impresas en calidad museo (15 cm)",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-2-4",
            "label": "Galería digital privada e interactiva",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-2-5",
            "label": "Entrega final en alta resolución",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-completa-historia-section-3-1",
            "label": "Arreglos y preparativos",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-3-2",
            "label": "Llegada al evento",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-3-3",
            "label": "Sesión de retratos de la quinceañera",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-3-4",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-3-5",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-3-6",
            "label": "Fotos con invitados",
            "selectedByDefault": true
          },
          {
            "id": "quince-completa-historia-section-3-7",
            "label": "Inicio de recepción",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-completa-historia-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-completa-historia-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-completa-historia-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Completa%20%E2%80%93%20Historia%20en%20fotograf%C3%ADa%20(fotograf%C3%ADa%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-premium-experiencia-fotografica",
    "categoryLabel": "Fotografía de quince",
    "categoryHref": "/portfolio/quinces",
    "title": "Premium – Experiencia fotográfica",
    "packageTypeLabel": "Solo fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Fotografía de quince",
    "lead": "Nuestra opción más recomendada. Una experiencia integral con estilo artístico, cubriendo todo el evento y una sesión previa inolvidable.",
    "image": "assets/images/galery/M&D-23.jpg",
    "priceLines": [
      "1'850.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-premium-experiencia-fotografica-cop",
        "label": "1'850.000 COP",
        "amountCop": 1850000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura del evento de 8 a 10 horas",
          "Dirección creativa avanzada con equipos de iluminación de estudio",
          "Narrativa visual y estética de alto nivel cinematográfico",
          "Uso de tomas aéreas (dron) durante la sesión Pre 15"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 300 fotografías con edición artística y retoque de piel",
          "Sesión Pre 15 incluida (1 locación)",
          "Fotobook clásico de alta durabilidad (20 páginas)",
          "2 ampliaciones fotográficas de 50 cm listas para enmarcar",
          "15 fotografías impresas calidad museo (15 cm)",
          "Galería digital privada"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Sesión Pre 15 con dron",
          "Preparativos y arreglos personales",
          "Llegada y entrada al evento",
          "Ceremonia",
          "Vals de honor",
          "Sesión de retratos con familia y amigas",
          "Recepción y fiesta completa",
          "Brindis y detalles especiales"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-premium-experiencia-fotografica-section-1-1",
            "label": "Cobertura del evento de 8 a 10 horas",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-1-2",
            "label": "Dirección creativa avanzada con equipos de iluminación de estudio",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-1-3",
            "label": "Narrativa visual y estética de alto nivel cinematográfico",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-1-4",
            "label": "Uso de tomas aéreas (dron) durante la sesión Pre 15",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-premium-experiencia-fotografica-section-2-1",
            "label": "Hasta 300 fotografías con edición artística y retoque de piel",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-2-2",
            "label": "Sesión Pre 15 incluida (1 locación)",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-2-3",
            "label": "Fotobook clásico de alta durabilidad (20 páginas)",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-2-4",
            "label": "2 ampliaciones fotográficas de 50 cm listas para enmarcar",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-2-5",
            "label": "15 fotografías impresas calidad museo (15 cm)",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-2-6",
            "label": "Galería digital privada",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-premium-experiencia-fotografica-section-3-1",
            "label": "Sesión Pre 15 con dron",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-3-2",
            "label": "Preparativos y arreglos personales",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-3-3",
            "label": "Llegada y entrada al evento",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-3-4",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-3-5",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-3-6",
            "label": "Sesión de retratos con familia y amigas",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-3-7",
            "label": "Recepción y fiesta completa",
            "selectedByDefault": true
          },
          {
            "id": "quince-premium-experiencia-fotografica-section-3-8",
            "label": "Brindis y detalles especiales",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-premium-experiencia-fotografica-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-premium-experiencia-fotografica-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-premium-experiencia-fotografica-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Premium%20%E2%80%93%20Experiencia%20fotogr%C3%A1fica%20(fotograf%C3%ADa%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-luxury-experiencia-exclusiva",
    "categoryLabel": "Fotografía de quince",
    "categoryHref": "/portfolio/quinces",
    "title": "Luxury – Experiencia exclusiva",
    "packageTypeLabel": "Solo fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Fotografía de quince",
    "lead": "El más alto nivel de producción para capturar la magia de tus quince. Fotografía de autor con locaciones ilimitadas, vestuarios y un acabado verdaderamente lujoso.",
    "image": "assets/images/galery/M&D-25.jpg",
    "priceLines": [
      "3'200.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-luxury-experiencia-exclusiva-cop",
        "label": "3'200.000 COP",
        "amountCop": 3200000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 4,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura completa (sin límite de horas)",
          "Hasta 4 locaciones diferentes y cambios de vestuario ilimitados",
          "Dirección creativa, iluminación avanzada y asistentes"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Más de 400 fotografías con edición artística de autor",
          "Fotolibro de lujo premium",
          "2 retablos fotográficos en madera (60x40 cm)",
          "20 fotografías impresas tamaño 15 cm",
          "Sesión Pre 15 y Sesión Post 15 incluidas",
          "Entrega en memoria USB de lujo y Galería digital"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Sesión Pre 15 (múltiples locaciones)",
          "Preparativos completos de la quinceañera",
          "Llegada y entrada triunfal",
          "Ceremonia",
          "Vals de honor",
          "Sesión artística de retratos",
          "Recepción y fiesta hasta el final",
          "Sesión Post 15 (cierre fotográfico)"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-luxury-experiencia-exclusiva-section-1-1",
            "label": "Cobertura completa (sin límite de horas)",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-1-2",
            "label": "Hasta 4 locaciones diferentes y cambios de vestuario ilimitados",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-1-3",
            "label": "Dirección creativa, iluminación avanzada y asistentes",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-luxury-experiencia-exclusiva-section-2-1",
            "label": "Más de 400 fotografías con edición artística de autor",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-2-2",
            "label": "Fotolibro de lujo premium",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-2-3",
            "label": "2 retablos fotográficos en madera (60x40 cm)",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-2-4",
            "label": "20 fotografías impresas tamaño 15 cm",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-2-5",
            "label": "Sesión Pre 15 y Sesión Post 15 incluidas",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-2-6",
            "label": "Entrega en memoria USB de lujo y Galería digital",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-luxury-experiencia-exclusiva-section-3-1",
            "label": "Sesión Pre 15 (múltiples locaciones)",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-3-2",
            "label": "Preparativos completos de la quinceañera",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-3-3",
            "label": "Llegada y entrada triunfal",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-3-4",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-3-5",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-3-6",
            "label": "Sesión artística de retratos",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-3-7",
            "label": "Recepción y fiesta hasta el final",
            "selectedByDefault": true
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-section-3-8",
            "label": "Sesión Post 15 (cierre fotográfico)",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-luxury-experiencia-exclusiva-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-luxury-experiencia-exclusiva-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Luxury%20%E2%80%93%20Experiencia%20exclusiva%20(fotograf%C3%ADa%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-mixta-esencial-foto-video",
    "categoryLabel": "Cobertura mixta",
    "categoryHref": "/portfolio/quinces",
    "title": "Esencial – Foto + Video",
    "packageTypeLabel": "Foto + video",
    "packageGroup": "photo-video",
    "eyebrow": "Cobertura mixta",
    "lead": "Cobertura básica que combina fotografía y video para capturar los momentos principales.",
    "image": "assets/images/galery/M&D-23.jpg",
    "priceLines": [
      "1'250.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-mixta-esencial-foto-video-cop",
        "label": "1'250.000 COP",
        "amountCop": 1250000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de 4 a 5 horas",
          "Fotógrafo y videógrafo",
          "Dirección básica de poses y tomas",
          "Grabación en alta calidad"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "100 a 140 fotografías editadas",
          "Video principal de 3 a 5 minutos",
          "Entrega final por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Ceremonia",
          "Vals de honor",
          "Sesión de fotos",
          "Brindis"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-esencial-foto-video-section-1-1",
            "label": "Cobertura de 4 a 5 horas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-esencial-foto-video-section-1-2",
            "label": "Fotógrafo y videógrafo",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-esencial-foto-video-section-1-3",
            "label": "Dirección básica de poses y tomas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-esencial-foto-video-section-1-4",
            "label": "Grabación en alta calidad",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-esencial-foto-video-section-2-1",
            "label": "100 a 140 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-esencial-foto-video-section-2-2",
            "label": "Video principal de 3 a 5 minutos",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-esencial-foto-video-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-esencial-foto-video-section-3-1",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-esencial-foto-video-section-3-2",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-esencial-foto-video-section-3-3",
            "label": "Sesión de fotos",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-esencial-foto-video-section-3-4",
            "label": "Brindis",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-mixta-esencial-foto-video-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-mixta-esencial-foto-video-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-esencial-foto-video-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Esencial%20%E2%80%93%20Foto%20%2B%20Video%20(cobertura%20mixta%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-mixta-completa-experiencia",
    "categoryLabel": "Cobertura mixta",
    "categoryHref": "/portfolio/quinces",
    "title": "Completa – Experiencia combinada",
    "packageTypeLabel": "Foto + video",
    "packageGroup": "photo-video",
    "eyebrow": "Cobertura mixta",
    "lead": "Cobertura equilibrada que permite capturar tanto fotografía como video con mayor detalle.",
    "image": "assets/images/galery/M&D-19.jpg",
    "priceLines": [
      "1'800.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-mixta-completa-experiencia-cop",
        "label": "1'800.000 COP",
        "amountCop": 1800000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de 5 a 7 horas",
          "Fotógrafo y videógrafo dedicados",
          "Dirección creativa durante el evento",
          "Tomas dinámicas con movimiento"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "140 a 200 fotografías editadas",
          "Video principal de 5 a 10 minutos",
          "Tráiler de 30 a 60 segundos",
          "Fotobook básico",
          "Entrega final por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparativos",
          "Llegada al evento",
          "Sesión de fotos",
          "Ceremonia",
          "Vals de honor",
          "Inicio de recepción"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-completa-experiencia-section-1-1",
            "label": "Cobertura de 5 a 7 horas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-1-2",
            "label": "Fotógrafo y videógrafo dedicados",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-1-3",
            "label": "Dirección creativa durante el evento",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-1-4",
            "label": "Tomas dinámicas con movimiento",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-completa-experiencia-section-2-1",
            "label": "140 a 200 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-2-2",
            "label": "Video principal de 5 a 10 minutos",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-2-3",
            "label": "Tráiler de 30 a 60 segundos",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-2-4",
            "label": "Fotobook básico",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-2-5",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-completa-experiencia-section-3-1",
            "label": "Preparativos",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-3-2",
            "label": "Llegada al evento",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-3-3",
            "label": "Sesión de fotos",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-3-4",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-3-5",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-completa-experiencia-section-3-6",
            "label": "Inicio de recepción",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-mixta-completa-experiencia-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-mixta-completa-experiencia-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-completa-experiencia-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Completa%20%E2%80%93%20Experiencia%20combinada%20(cobertura%20mixta%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-mixta-premium-produccion-completa",
    "categoryLabel": "Cobertura mixta",
    "categoryHref": "/portfolio/quinces",
    "title": "Premium – Producción completa de quince",
    "packageTypeLabel": "Foto + video",
    "packageGroup": "photo-video",
    "eyebrow": "Cobertura mixta",
    "lead": "Experiencia completa que combina fotografía, video y producción avanzada para un resultado cinematográfico.",
    "image": "assets/images/galery/M&D-29.jpg",
    "priceLines": [
      "2'900.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-mixta-premium-produccion-completa-cop",
        "label": "2'900.000 COP",
        "amountCop": 2900000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de 7 a 10 horas",
          "Equipo de 2 a 3 personas",
          "Tomas con dron (cuando sea posible)",
          "Dirección creativa avanzada",
          "Corrección de color cinematográfica",
          "Audio profesional de consola"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 300 fotografías editadas",
          "Video principal de 10 a 20 minutos",
          "Tráiler de 1 a 2 minutos",
          "1 reel vertical para redes",
          "Fotobook de lujo",
          "Set de fotografías impresas",
          "Entrega final por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparativos y arreglos personales",
          "Sesión artística previa",
          "Llegada y entrada al evento",
          "Ceremonia",
          "Vals de honor",
          "Sesión de retratos con familia y amigas",
          "Fiesta completa",
          "Brindis y detalles especiales"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-premium-produccion-completa-section-1-1",
            "label": "Cobertura de 7 a 10 horas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-1-2",
            "label": "Equipo de 2 a 3 personas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-1-3",
            "label": "Tomas con dron (cuando sea posible)",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-1-4",
            "label": "Dirección creativa avanzada",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-1-5",
            "label": "Corrección de color cinematográfica",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-1-6",
            "label": "Audio profesional de consola",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-premium-produccion-completa-section-2-1",
            "label": "Hasta 300 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-2-2",
            "label": "Video principal de 10 a 20 minutos",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-2-3",
            "label": "Tráiler de 1 a 2 minutos",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-2-4",
            "label": "1 reel vertical para redes",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-2-5",
            "label": "Fotobook de lujo",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-2-6",
            "label": "Set de fotografías impresas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-2-7",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-premium-produccion-completa-section-3-1",
            "label": "Preparativos y arreglos personales",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-3-2",
            "label": "Sesión artística previa",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-3-3",
            "label": "Llegada y entrada al evento",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-3-4",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-3-5",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-3-6",
            "label": "Sesión de retratos con familia y amigas",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-3-7",
            "label": "Fiesta completa",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-premium-produccion-completa-section-3-8",
            "label": "Brindis y detalles especiales",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-mixta-premium-produccion-completa-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-mixta-premium-produccion-completa-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-premium-produccion-completa-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Premium%20%E2%80%93%20Producci%C3%B3n%20completa%20de%20quince%20(cobertura%20mixta%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-mixta-luxury-experiencia-exclusiva",
    "categoryLabel": "Cobertura mixta",
    "categoryHref": "/portfolio/quinces",
    "title": "Luxury – Producción exclusiva de quince",
    "packageTypeLabel": "Foto + video",
    "packageGroup": "photo-video",
    "eyebrow": "Cobertura mixta",
    "lead": "Nuestra propuesta más completa y lujosa. Fotografía y cinematografía del más alto nivel con múltiples locaciones, vestuarios y un resultado deslumbrante.",
    "image": "assets/images/galery/M&D-30.jpg",
    "priceLines": [
      "4'500.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-mixta-luxury-experiencia-exclusiva-cop",
        "label": "4'500.000 COP",
        "amountCop": 4500000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 4,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura completa (sin límite de horas)",
          "Equipo audiovisual completo (múltiples cámaras)",
          "Tomas con dron (cuando sea posible)",
          "Hasta 4 locaciones diferentes y cambios de vestuario",
          "Dirección cinematográfica y estilismo avanzado",
          "Corrección de color cinematográfica y audio profesional"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Más de 400 fotografías con edición artística",
          "Video principal cinematográfico",
          "Tráiler y múltiples reels para redes",
          "Fotolibro de lujo premium",
          "2 impresiones en retablo de madera (60x40 cm)",
          "Sesión Pre 15 (foto y video)",
          "Sesión Post 15 (foto y video)",
          "Entrega final en alta resolución por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Sesión Pre 15 (múltiples locaciones y vestuarios)",
          "Preparativos y arreglos personales",
          "Llegada y entrada al evento",
          "Ceremonia",
          "Vals de honor",
          "Sesión de retratos",
          "Recepción y fiesta completa",
          "Sesión Post 15 (cierre fotográfico)"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-1-1",
            "label": "Cobertura completa (sin límite de horas)",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-1-2",
            "label": "Equipo audiovisual completo (múltiples cámaras)",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-1-3",
            "label": "Tomas con dron (cuando sea posible)",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-1-4",
            "label": "Hasta 4 locaciones diferentes y cambios de vestuario",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-1-5",
            "label": "Dirección cinematográfica y estilismo avanzado",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-1-6",
            "label": "Corrección de color cinematográfica y audio profesional",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-2-1",
            "label": "Más de 400 fotografías con edición artística",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-2-2",
            "label": "Video principal cinematográfico",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-2-3",
            "label": "Tráiler y múltiples reels para redes",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-2-4",
            "label": "Fotolibro de lujo premium",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-2-5",
            "label": "2 impresiones en retablo de madera (60x40 cm)",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-2-6",
            "label": "Sesión Pre 15 (foto y video)",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-2-7",
            "label": "Sesión Post 15 (foto y video)",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-2-8",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-3-1",
            "label": "Sesión Pre 15 (múltiples locaciones y vestuarios)",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-3-2",
            "label": "Preparativos y arreglos personales",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-3-3",
            "label": "Llegada y entrada al evento",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-3-4",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-3-5",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-3-6",
            "label": "Sesión de retratos",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-3-7",
            "label": "Recepción y fiesta completa",
            "selectedByDefault": true
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-section-3-8",
            "label": "Sesión Post 15 (cierre fotográfico)",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-mixta-luxury-experiencia-exclusiva-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Luxury%20%E2%80%93%20Producci%C3%B3n%20exclusiva%20de%20quince%20(cobertura%20mixta%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-video-esencial",
    "categoryLabel": "Video de quince",
    "categoryHref": "/portfolio/quinces",
    "title": "Esencial – Video de tus quince",
    "packageTypeLabel": "Video de quince",
    "packageGroup": "custom",
    "eyebrow": "Video de quince",
    "lead": "Video resumen que captura los momentos más importantes de tu celebración.",
    "image": "assets/images/galery/M&D-29.jpg",
    "priceLines": [
      "700.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-video-esencial-cop",
        "label": "700.000 COP",
        "amountCop": 700000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de 3 a 4 horas",
          "Grabación en alta calidad",
          "Enfoque en momentos clave",
          "Edición profesional"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Video principal de 3 a 5 minutos en 4K",
          "Entrega final por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Ceremonia",
          "Vals de honor",
          "Brindis",
          "Momentos destacados"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-video-esencial-section-1-1",
            "label": "Cobertura de 3 a 4 horas",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-esencial-section-1-2",
            "label": "Grabación en alta calidad",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-esencial-section-1-3",
            "label": "Enfoque en momentos clave",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-esencial-section-1-4",
            "label": "Edición profesional",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-video-esencial-section-2-1",
            "label": "Video principal de 3 a 5 minutos en 4K",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-esencial-section-2-2",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-video-esencial-section-3-1",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-esencial-section-3-2",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-esencial-section-3-3",
            "label": "Brindis",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-esencial-section-3-4",
            "label": "Momentos destacados",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-video-esencial-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-video-esencial-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-esencial-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Esencial%20%E2%80%93%20Video%20de%20tus%20quince%20(video%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-video-completa",
    "categoryLabel": "Video de quince",
    "categoryHref": "/portfolio/quinces",
    "title": "Completa – Historia en video",
    "packageTypeLabel": "Video de quince",
    "packageGroup": "custom",
    "eyebrow": "Video de quince",
    "lead": "Cobertura más completa que permite contar tu historia con mayor profundidad y calidad visual.",
    "image": "assets/images/galery/M&D-19.jpg",
    "priceLines": [
      "1'200.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-video-completa-cop",
        "label": "1'200.000 COP",
        "amountCop": 1200000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de 5 a 6 horas",
          "Grabación profesional con mejor narrativa",
          "Tomas dinámicas con movimiento",
          "Edición con corrección de color"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Video principal de 5 a 10 minutos en 4K",
          "Tráiler de 30 a 60 segundos",
          "Entrega final por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparativos",
          "Llegada al evento",
          "Ceremonia",
          "Vals de honor",
          "Recepción e inicio de fiesta"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-video-completa-section-1-1",
            "label": "Cobertura de 5 a 6 horas",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-completa-section-1-2",
            "label": "Grabación profesional con mejor narrativa",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-completa-section-1-3",
            "label": "Tomas dinámicas con movimiento",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-completa-section-1-4",
            "label": "Edición con corrección de color",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-video-completa-section-2-1",
            "label": "Video principal de 5 a 10 minutos en 4K",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-completa-section-2-2",
            "label": "Tráiler de 30 a 60 segundos",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-completa-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-video-completa-section-3-1",
            "label": "Preparativos",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-completa-section-3-2",
            "label": "Llegada al evento",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-completa-section-3-3",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-completa-section-3-4",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-completa-section-3-5",
            "label": "Recepción e inicio de fiesta",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-video-completa-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-video-completa-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-completa-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Completa%20%E2%80%93%20Historia%20en%20video%20(video%20de%20quince)."
  },
  {
    "category": "quinces",
    "slug": "quince-video-premium-cinematica",
    "categoryLabel": "Video de quince",
    "categoryHref": "/portfolio/quinces",
    "title": "Premium – Experiencia cinematográfica",
    "packageTypeLabel": "Video de quince",
    "packageGroup": "custom",
    "eyebrow": "Video de quince",
    "lead": "Producción audiovisual de alto nivel con enfoque cinematográfico para tus quince años.",
    "image": "assets/images/galery/M&D-23.jpg",
    "priceLines": [
      "2'000.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "quince-video-premium-cinematica-cop",
        "label": "2'000.000 COP",
        "amountCop": 2000000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Cobertura de 7 a 10 horas",
          "Tomas con dron (cuando sea posible)",
          "Equipo de grabación profesional",
          "Dirección creativa avanzada",
          "Corrección de color cinematográfica",
          "Audio profesional de consola"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Video principal de 10 a 20 minutos en 4K",
          "Tráiler de 2 a 3 minutos",
          "1 reel vertical para redes",
          "Entrega final por Google Drive"
        ]
      },
      {
        "title": "Incluye momentos",
        "items": [
          "Preparativos y arreglos",
          "Sesión de fotos previa",
          "Llegada y entrada al evento",
          "Ceremonia",
          "Vals de honor",
          "Sesión de retratos",
          "Fiesta completa",
          "Detalles y decoración"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "quince-video-premium-cinematica-section-1-1",
            "label": "Cobertura de 7 a 10 horas",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-1-2",
            "label": "Tomas con dron (cuando sea posible)",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-1-3",
            "label": "Equipo de grabación profesional",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-1-4",
            "label": "Dirección creativa avanzada",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-1-5",
            "label": "Corrección de color cinematográfica",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-1-6",
            "label": "Audio profesional de consola",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "quince-video-premium-cinematica-section-2-1",
            "label": "Video principal de 10 a 20 minutos en 4K",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-2-2",
            "label": "Tráiler de 2 a 3 minutos",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-2-3",
            "label": "1 reel vertical para redes",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-2-4",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Incluye momentos",
        "selectable": false,
        "options": [
          {
            "id": "quince-video-premium-cinematica-section-3-1",
            "label": "Preparativos y arreglos",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-3-2",
            "label": "Sesión de fotos previa",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-3-3",
            "label": "Llegada y entrada al evento",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-3-4",
            "label": "Ceremonia",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-3-5",
            "label": "Vals de honor",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-3-6",
            "label": "Sesión de retratos",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-3-7",
            "label": "Fiesta completa",
            "selectedByDefault": true
          },
          {
            "id": "quince-video-premium-cinematica-section-3-8",
            "label": "Detalles y decoración",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Suma extras para personalizar la entrega final.",
        "selectable": true,
        "options": [
          {
            "id": "quince-video-premium-cinematica-addon-1",
            "label": "Sesión Pre 15||Sesión previa para capturar tu esencia antes del evento",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-2",
            "label": "Sesión Post 15||Sesión posterior para fotos más artísticas sin presión",
            "priceLabel": "500.000 COP",
            "priceAmountCop": 500000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-3",
            "label": "Reel para redes||Video corto ideal para redes sociales",
            "priceLabel": "140.000 COP",
            "priceAmountCop": 140000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-4",
            "label": "Video extendido||Versión más completa del evento",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-5",
            "label": "Trailer cinematográfico||Resumen emocional tipo cine",
            "priceLabel": "180.000 COP",
            "priceAmountCop": 180000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-6",
            "label": "Fotolibro de lujo||Álbum premium con acabados de alta calidad",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-7",
            "label": "Fotografía en madera (60x40)||Impresión lista para exhibir",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-8",
            "label": "Hora adicional||Extiende la cobertura del evento",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-9",
            "label": "Retoque de maquillaje||Ajustes durante sesión o evento",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-10",
            "label": "Maquillaje profesional||Maquillaje completo de larga duración",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-11",
            "label": "Peinado profesional||Peinado acorde al estilo del evento",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-12",
            "label": "Saxofonista||Ambiente moderno con música en vivo",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-13",
            "label": "Violinista||Toque clásico y elegante",
            "priceLabel": "400.000 COP",
            "priceAmountCop": 400000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-14",
            "label": "Vocalista||Interpretación en vivo para momentos especiales",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-addon-15",
            "label": "Guitarrista||Ambiente musical cálido",
            "priceLabel": "300.000 COP",
            "priceAmountCop": 300000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Invitaciones web para tu evento",
        "description": "Agrega una invitación digital alojada por TECNOJACK para presentar tu quince con una experiencia más atractiva y compartible.",
        "selectable": true,
        "options": [
          {
            "id": "quince-video-premium-cinematica-web-invite-1",
            "label": "Invitación web básica (1-2 fotos)||Página-invitación alojada por TECNOJACK, enfocada en textos, diseño dinámico y presentación elegante",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-web-invite-2",
            "label": "Invitación web completa (hasta 10 fotos)||Incluye imágenes en secciones específicas, mini galería y lista personalizada de invitados",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "quince-video-premium-cinematica-web-invite-3",
            "label": "Invitación web premium (hasta 20 fotos)||Galería amplia, links por invitado, cupos por invitación y personalización visual por tipo de invitado",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Precios ajustables",
      "Condiciones Medellín"
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Premium%20%E2%80%93%20Experiencia%20cinematogr%C3%A1fica%20(video%20de%20quince)."
  },
  {
    "category": "grados",
    "slug": "plan-esencial",
    "categoryLabel": "Grados",
    "categoryHref": "/portfolio/grados",
    "title": "Plan Esencial",
    "packageTypeLabel": "Fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Paquete de graduación",
    "lead": "La opción más directa para quien quiere asegurar un recuerdo limpio y bien entregado de su grado, con 50 fotos digitales listas para compartir.",
    "image": "assets/images/galery/M&D-15.jpg",
    "priceLines": [
      "250.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "plan-esencial-base",
        "label": "Plan Esencial · 250.000 COP",
        "amountCop": 250000,
        "selectedByDefault": true
      }
    ],
    "accent": "gold",
    "sortOrder": 1,
    "sections": [
      {
        "title": "Características",
        "items": [
          "Sesión fotográfica individual profesional",
          "Acompañamiento básico durante la sesión",
          "Dirección de poses sencilla",
          "Iluminación adecuada para retrato",
          "Presencia durante toda la ceremonia de grado",
          "Captura individual durante el llamado a grado",
          "Toma grupal del curso",
          "Momentos espontáneos del evento",
          "Selección curada de fotografías del evento",
          "Edición básica de color, iluminación y encuadre"
        ]
      },
      {
        "title": "Entregables del paquete",
        "items": [
          "50 fotografías digitales en alta calidad",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Características",
        "selectable": false,
        "options": [
          {
            "id": "plan-esencial-section-1-1",
            "label": "Sesión fotográfica individual profesional",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-1-2",
            "label": "Acompañamiento básico durante la sesión",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-1-3",
            "label": "Dirección de poses sencilla",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-1-4",
            "label": "Iluminación adecuada para retrato",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-1-5",
            "label": "Presencia durante toda la ceremonia de grado",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-1-6",
            "label": "Captura individual durante el llamado a grado",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-1-7",
            "label": "Toma grupal del curso",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-1-8",
            "label": "Momentos espontáneos del evento",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-1-9",
            "label": "Selección curada de fotografías del evento",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-1-10",
            "label": "Edición básica de color, iluminación y encuadre",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables del paquete",
        "selectable": false,
        "options": [
          {
            "id": "plan-esencial-section-2-1",
            "label": "50 fotografías digitales en alta calidad",
            "selectedByDefault": true
          },
          {
            "id": "plan-esencial-section-2-2",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Adicionales disponibles",
        "description": "Suma extras para personalizar tu recuerdo de grado.",
        "selectable": true,
        "options": [
          {
            "id": "plan-esencial-addon-1",
            "label": "Cuadro en madera 70 cm||Impresión en formato grande sobre madera, ideal para decoración",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "plan-esencial-addon-2",
            "label": "Fotobook adicional||Álbum fotográfico de lujo con diseño personalizado",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "plan-esencial-addon-3",
            "label": "12 fotos impresas||Impresiones físicas en alta calidad para recuerdo",
            "priceLabel": "30.000 COP",
            "priceAmountCop": 30000,
            "selectedByDefault": false
          },
          {
            "id": "plan-esencial-addon-4",
            "label": "Reel de grado (1 minuto)||Video corto optimizado para redes con momentos destacados",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "plan-esencial-addon-5",
            "label": "Video de grado personalizado||Producción audiovisual íntima con enfoque emocional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "plan-esencial-addon-6",
            "label": "Fotos adicionales (paquete de 20)||Selección extra de fotografías editadas",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "plan-esencial-addon-7",
            "label": "Edición prioritaria||Entrega más rápida del material final",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Cada paquete parte de una base cerrada para que la elección sea más rápida y clara.",
      "Los adicionales se pueden anexar a cualquier plan y se confirman al enviar la solicitud."
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Plan%20Esencial%20para%20grados."
  },
  {
    "category": "grados",
    "slug": "plan-marco",
    "categoryLabel": "Grados",
    "categoryHref": "/portfolio/grados",
    "title": "Plan Marco",
    "packageTypeLabel": "Fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Paquete de graduación",
    "lead": "Pensado para quienes quieren el recuerdo digital completo y además una pieza física protagonista para exhibir el logro.",
    "image": "assets/images/galery/M&D-21.jpg",
    "priceLines": [
      "350.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "plan-marco-base",
        "label": "Plan Marco · 350.000 COP",
        "amountCop": 350000,
        "selectedByDefault": true
      }
    ],
    "accent": "gold",
    "sortOrder": 2,
    "sections": [
      {
        "title": "Características",
        "items": [
          "Incluye todo lo del Plan Esencial",
          "Sesión fotográfica con enfoque en retrato destacado",
          "Mejor dirección de poses",
          "Cuidado en composición visual para impresión",
          "Toma con familiares y acompañantes",
          "Edición mejorada en imágenes seleccionadas",
          "Optimización de archivos para impresión"
        ]
      },
      {
        "title": "Entregables del paquete",
        "items": [
          "50 fotografías digitales en alta calidad",
          "Cuadro fotográfico en madera de 70 cm",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Características",
        "selectable": false,
        "options": [
          {
            "id": "plan-marco-section-1-1",
            "label": "Incluye todo lo del Plan Esencial",
            "selectedByDefault": true
          },
          {
            "id": "plan-marco-section-1-2",
            "label": "Sesión fotográfica con enfoque en retrato destacado",
            "selectedByDefault": true
          },
          {
            "id": "plan-marco-section-1-3",
            "label": "Mejor dirección de poses",
            "selectedByDefault": true
          },
          {
            "id": "plan-marco-section-1-4",
            "label": "Cuidado en composición visual para impresión",
            "selectedByDefault": true
          },
          {
            "id": "plan-marco-section-1-5",
            "label": "Toma con familiares y acompañantes",
            "selectedByDefault": true
          },
          {
            "id": "plan-marco-section-1-6",
            "label": "Edición mejorada en imágenes seleccionadas",
            "selectedByDefault": true
          },
          {
            "id": "plan-marco-section-1-7",
            "label": "Optimización de archivos para impresión",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables del paquete",
        "selectable": false,
        "options": [
          {
            "id": "plan-marco-section-2-1",
            "label": "50 fotografías digitales en alta calidad",
            "selectedByDefault": true
          },
          {
            "id": "plan-marco-section-2-2",
            "label": "Cuadro fotográfico en madera de 70 cm",
            "selectedByDefault": true
          },
          {
            "id": "plan-marco-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Adicionales disponibles",
        "description": "Suma extras para personalizar tu recuerdo de grado.",
        "selectable": true,
        "options": [
          {
            "id": "plan-marco-addon-1",
            "label": "Cuadro en madera 70 cm||Impresión en formato grande sobre madera, ideal para decoración",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "plan-marco-addon-2",
            "label": "Fotobook adicional||Álbum fotográfico de lujo con diseño personalizado",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "plan-marco-addon-3",
            "label": "12 fotos impresas||Impresiones físicas en alta calidad para recuerdo",
            "priceLabel": "30.000 COP",
            "priceAmountCop": 30000,
            "selectedByDefault": false
          },
          {
            "id": "plan-marco-addon-4",
            "label": "Reel de grado (1 minuto)||Video corto optimizado para redes con momentos destacados",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "plan-marco-addon-5",
            "label": "Video de grado personalizado||Producción audiovisual íntima con enfoque emocional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "plan-marco-addon-6",
            "label": "Fotos adicionales (paquete de 20)||Selección extra de fotografías editadas",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "plan-marco-addon-7",
            "label": "Edición prioritaria||Entrega más rápida del material final",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Cada paquete parte de una base cerrada para que la elección sea más rápida y clara.",
      "Los adicionales se pueden anexar a cualquier plan y se confirman al enviar la solicitud."
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Plan%20Marco%20para%20grados."
  },
  {
    "category": "grados",
    "slug": "plan-memoria",
    "categoryLabel": "Grados",
    "categoryHref": "/portfolio/grados",
    "title": "Plan Memoria",
    "packageTypeLabel": "Fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Paquete de graduación",
    "lead": "Una propuesta ideal para conservar el grado en formato digital y también en un fotobook breve, práctico y fácil de mostrar.",
    "image": "assets/images/galery/M&D-22.jpg",
    "priceLines": [
      "450.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "plan-memoria-base",
        "label": "Plan Memoria · 450.000 COP",
        "amountCop": 450000,
        "selectedByDefault": true
      }
    ],
    "accent": "gold",
    "sortOrder": 3,
    "sections": [
      {
        "title": "Características",
        "items": [
          "Incluye todo lo del Plan Esencial",
          "Cobertura fotográfica más enfocada en momentos emocionales",
          "Selección narrativa de imágenes",
          "Enfoque en recuerdo visual del evento",
          "Toma con familiares y acompañantes",
          "Diseño básico del fotobook",
          "Edición mejorada para impresión"
        ]
      },
      {
        "title": "Entregables del paquete",
        "items": [
          "50 fotografías digitales en alta calidad",
          "Fotobook de 5 páginas",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Características",
        "selectable": false,
        "options": [
          {
            "id": "plan-memoria-section-1-1",
            "label": "Incluye todo lo del Plan Esencial",
            "selectedByDefault": true
          },
          {
            "id": "plan-memoria-section-1-2",
            "label": "Cobertura fotográfica más enfocada en momentos emocionales",
            "selectedByDefault": true
          },
          {
            "id": "plan-memoria-section-1-3",
            "label": "Selección narrativa de imágenes",
            "selectedByDefault": true
          },
          {
            "id": "plan-memoria-section-1-4",
            "label": "Enfoque en recuerdo visual del evento",
            "selectedByDefault": true
          },
          {
            "id": "plan-memoria-section-1-5",
            "label": "Toma con familiares y acompañantes",
            "selectedByDefault": true
          },
          {
            "id": "plan-memoria-section-1-6",
            "label": "Diseño básico del fotobook",
            "selectedByDefault": true
          },
          {
            "id": "plan-memoria-section-1-7",
            "label": "Edición mejorada para impresión",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables del paquete",
        "selectable": false,
        "options": [
          {
            "id": "plan-memoria-section-2-1",
            "label": "50 fotografías digitales en alta calidad",
            "selectedByDefault": true
          },
          {
            "id": "plan-memoria-section-2-2",
            "label": "Fotobook de 5 páginas",
            "selectedByDefault": true
          },
          {
            "id": "plan-memoria-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Adicionales disponibles",
        "description": "Suma extras para personalizar tu recuerdo de grado.",
        "selectable": true,
        "options": [
          {
            "id": "plan-memoria-addon-1",
            "label": "Cuadro en madera 70 cm||Impresión en formato grande sobre madera, ideal para decoración",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "plan-memoria-addon-2",
            "label": "Fotobook adicional||Álbum fotográfico de lujo con diseño personalizado",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "plan-memoria-addon-3",
            "label": "12 fotos impresas||Impresiones físicas en alta calidad para recuerdo",
            "priceLabel": "30.000 COP",
            "priceAmountCop": 30000,
            "selectedByDefault": false
          },
          {
            "id": "plan-memoria-addon-4",
            "label": "Reel de grado (1 minuto)||Video corto optimizado para redes con momentos destacados",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "plan-memoria-addon-5",
            "label": "Video de grado personalizado||Producción audiovisual íntima con enfoque emocional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "plan-memoria-addon-6",
            "label": "Fotos adicionales (paquete de 20)||Selección extra de fotografías editadas",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "plan-memoria-addon-7",
            "label": "Edición prioritaria||Entrega más rápida del material final",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Cada paquete parte de una base cerrada para que la elección sea más rápida y clara.",
      "Los adicionales se pueden anexar a cualquier plan y se confirman al enviar la solicitud."
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Plan%20Memoria%20para%20grados."
  },
  {
    "category": "grados",
    "slug": "plan-legado",
    "categoryLabel": "Grados",
    "categoryHref": "/portfolio/grados",
    "title": "Plan Legado",
    "packageTypeLabel": "Fotografía",
    "packageGroup": "photo-only",
    "eyebrow": "Paquete de graduación",
    "lead": "La versión más completa de grados: fotos digitales, fotobook y cuadro, pensada para quien quiere guardar el recuerdo en varios formatos.",
    "image": "assets/images/galery/M&D-19.jpg",
    "priceLines": [
      "550.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "plan-legado-base",
        "label": "Plan Legado · 550.000 COP",
        "amountCop": 550000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "accent": "gold",
    "sortOrder": 4,
    "sections": [
      {
        "title": "Características",
        "items": [
          "Incluye todo lo del Plan Esencial",
          "Cobertura completa del momento de grado",
          "Dirección más detallada durante la sesión",
          "Enfoque en recuerdo integral (digital + físico)",
          "Toma con familiares y acompañantes",
          "Edición optimizada para impresión"
        ]
      },
      {
        "title": "Entregables del paquete",
        "items": [
          "50 fotografías digitales en alta calidad",
          "Fotobook de 5 páginas",
          "Cuadro fotográfico en madera de 70 cm",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Características",
        "selectable": false,
        "options": [
          {
            "id": "plan-legado-section-1-1",
            "label": "Incluye todo lo del Plan Esencial",
            "selectedByDefault": true
          },
          {
            "id": "plan-legado-section-1-2",
            "label": "Cobertura completa del momento de grado",
            "selectedByDefault": true
          },
          {
            "id": "plan-legado-section-1-3",
            "label": "Dirección más detallada durante la sesión",
            "selectedByDefault": true
          },
          {
            "id": "plan-legado-section-1-4",
            "label": "Enfoque en recuerdo integral (digital + físico)",
            "selectedByDefault": true
          },
          {
            "id": "plan-legado-section-1-5",
            "label": "Toma con familiares y acompañantes",
            "selectedByDefault": true
          },
          {
            "id": "plan-legado-section-1-6",
            "label": "Edición optimizada para impresión",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables del paquete",
        "selectable": false,
        "options": [
          {
            "id": "plan-legado-section-2-1",
            "label": "50 fotografías digitales en alta calidad",
            "selectedByDefault": true
          },
          {
            "id": "plan-legado-section-2-2",
            "label": "Fotobook de 5 páginas",
            "selectedByDefault": true
          },
          {
            "id": "plan-legado-section-2-3",
            "label": "Cuadro fotográfico en madera de 70 cm",
            "selectedByDefault": true
          },
          {
            "id": "plan-legado-section-2-4",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Adicionales disponibles",
        "description": "Suma extras para personalizar tu recuerdo de grado.",
        "selectable": true,
        "options": [
          {
            "id": "plan-legado-addon-1",
            "label": "Cuadro en madera 70 cm||Impresión en formato grande sobre madera, ideal para decoración",
            "priceLabel": "110.000 COP",
            "priceAmountCop": 110000,
            "selectedByDefault": false
          },
          {
            "id": "plan-legado-addon-2",
            "label": "Fotobook adicional||Álbum fotográfico de lujo con diseño personalizado",
            "priceLabel": "250.000 COP",
            "priceAmountCop": 250000,
            "selectedByDefault": false
          },
          {
            "id": "plan-legado-addon-3",
            "label": "12 fotos impresas||Impresiones físicas en alta calidad para recuerdo",
            "priceLabel": "30.000 COP",
            "priceAmountCop": 30000,
            "selectedByDefault": false
          },
          {
            "id": "plan-legado-addon-4",
            "label": "Reel de grado (1 minuto)||Video corto optimizado para redes con momentos destacados",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "plan-legado-addon-5",
            "label": "Video de grado personalizado||Producción audiovisual íntima con enfoque emocional",
            "priceLabel": "350.000 COP",
            "priceAmountCop": 350000,
            "selectedByDefault": false
          },
          {
            "id": "plan-legado-addon-6",
            "label": "Fotos adicionales (paquete de 20)||Selección extra de fotografías editadas",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "plan-legado-addon-7",
            "label": "Edición prioritaria||Entrega más rápida del material final",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "notes": [
      "Cada paquete parte de una base cerrada para que la elección sea más rápida y clara.",
      "Los adicionales se pueden anexar a cualquier plan y se confirman al enviar la solicitud."
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Plan%20Legado%20para%20grados."
  },
  {
    "category": "preboda",
    "slug": "preboda-esencial",
    "categoryLabel": "Preboda",
    "categoryHref": "/portfolio/preboda",
    "title": "Preboda Esencial",
    "packageTypeLabel": "Sesión preboda",
    "packageGroup": "session",
    "eyebrow": "Paquete de preboda",
    "lead": "Sesión íntima y natural para capturar la esencia de la pareja antes del gran día.",
    "image": "assets/images/galery/M&D-18.jpg",
    "priceLines": [
      "400.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "preboda-esencial-base",
        "label": "400.000 COP",
        "amountCop": 400000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo",
          "1 locación",
          "Duración de 2 horas",
          "1 vestuario",
          "Dirección de pareja",
          "Sesión en exterior"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 50 fotografías finales, seleccionadas y editadas",
          "Galería digital privada por 1 mes",
          "Entrega final en alta resolución por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "preboda-esencial-section-1-1",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "preboda-esencial-section-1-2",
            "label": "1 locación",
            "selectedByDefault": true
          },
          {
            "id": "preboda-esencial-section-1-3",
            "label": "Duración de 2 horas",
            "selectedByDefault": true
          },
          {
            "id": "preboda-esencial-section-1-4",
            "label": "1 vestuario",
            "selectedByDefault": true
          },
          {
            "id": "preboda-esencial-section-1-5",
            "label": "Dirección de pareja",
            "selectedByDefault": true
          },
          {
            "id": "preboda-esencial-section-1-6",
            "label": "Sesión en exterior",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "preboda-esencial-section-2-1",
            "label": "Hasta 50 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "preboda-esencial-section-2-2",
            "label": "Galería digital privada por 1 mes",
            "selectedByDefault": true
          },
          {
            "id": "preboda-esencial-section-2-3",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Complementos opcionales",
        "description": "Añade entregables o extras para ampliar la sesión.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-esencial-addon-1",
            "label": "Reel adicional para redes",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-esencial-addon-2",
            "label": "Cambio extra de vestuario",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-esencial-addon-3",
            "label": "Película extendida",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-esencial-addon-4",
            "label": "Foto impresa adicional",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Cobertura principal de boda",
        "description": "Continúa con uno de nuestros paquetes protagonistas de foto y video.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-esencial-related-esencial-hibrido-foto-video",
            "label": "HÍBRIDA - Tu historia en foto y video",
            "priceLabel": "1'900.000 COP",
            "priceAmountCop": 1900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "esencial-hibrido-foto-video"
          },
          {
            "id": "preboda-esencial-related-completo-hibrido-foto-video",
            "label": "HÍBRIDA - La historia completa de tu boda",
            "priceLabel": "2'800.000 COP",
            "priceAmountCop": 2800000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "completo-hibrido-foto-video"
          },
          {
            "id": "preboda-esencial-related-premium-cinematico-foto-video",
            "label": "HÍBRIDA - Experiencia cinematográfica",
            "priceLabel": "3'900.000 COP",
            "priceAmountCop": 3900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "premium-cinematico-foto-video"
          },
          {
            "id": "preboda-esencial-related-luxury-cinematico-foto-video",
            "label": "HÍBRIDA - The Wedding Film Experience",
            "priceLabel": "6'100.000 COP",
            "priceAmountCop": 6100000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "luxury-cinematico-foto-video"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Conecta la preboda con una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-esencial-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "preboda-esencial-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "preboda-esencial-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Consulta los paquetes disponibles para documentar también la petición.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-esencial-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "preboda-esencial-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "preboda-esencial-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Preboda%20Esencial%20de%20preboda."
  },
  {
    "category": "preboda",
    "slug": "preboda-completa",
    "categoryLabel": "Preboda",
    "categoryHref": "/portfolio/preboda",
    "title": "Preboda Completa",
    "packageTypeLabel": "Sesión preboda",
    "packageGroup": "session",
    "eyebrow": "Paquete de preboda",
    "lead": "Sesión más elaborada que permite explorar diferentes escenarios y lograr una narrativa más completa de la pareja.",
    "image": "assets/images/galery/M&D-32.jpg",
    "priceLines": [
      "580.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "preboda-completa-base",
        "label": "580.000 COP",
        "amountCop": 580000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo",
          "1 a 2 locaciones cercanas",
          "Duración de 3 horas",
          "Hasta 2 vestuarios",
          "Dirección creativa"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 70 fotografías finales, seleccionadas y editadas",
          "1 cuadro fotográfico de 60 x 40 cm",
          "Galería digital privada por 3 meses",
          "Entrega final en alta calidad por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "preboda-completa-section-1-1",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "preboda-completa-section-1-2",
            "label": "1 a 2 locaciones cercanas",
            "selectedByDefault": true
          },
          {
            "id": "preboda-completa-section-1-3",
            "label": "Duración de 3 horas",
            "selectedByDefault": true
          },
          {
            "id": "preboda-completa-section-1-4",
            "label": "Hasta 2 vestuarios",
            "selectedByDefault": true
          },
          {
            "id": "preboda-completa-section-1-5",
            "label": "Dirección creativa",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "preboda-completa-section-2-1",
            "label": "Hasta 70 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "preboda-completa-section-2-2",
            "label": "1 cuadro fotográfico de 60 x 40 cm",
            "selectedByDefault": true
          },
          {
            "id": "preboda-completa-section-2-3",
            "label": "Galería digital privada por 3 meses",
            "selectedByDefault": true
          },
          {
            "id": "preboda-completa-section-2-4",
            "label": "Entrega final en alta calidad por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Complementos opcionales",
        "description": "Añade entregables o extras para ampliar la sesión.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-completa-addon-1",
            "label": "Reel adicional para redes",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-completa-addon-2",
            "label": "Cambio extra de vestuario",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-completa-addon-3",
            "label": "Película extendida",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-completa-addon-4",
            "label": "Foto impresa adicional",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Cobertura principal de boda",
        "description": "Continúa con uno de nuestros paquetes protagonistas de foto y video.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-completa-related-esencial-hibrido-foto-video",
            "label": "HÍBRIDA - Tu historia en foto y video",
            "priceLabel": "1'900.000 COP",
            "priceAmountCop": 1900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "esencial-hibrido-foto-video"
          },
          {
            "id": "preboda-completa-related-completo-hibrido-foto-video",
            "label": "HÍBRIDA - La historia completa de tu boda",
            "priceLabel": "2'800.000 COP",
            "priceAmountCop": 2800000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "completo-hibrido-foto-video"
          },
          {
            "id": "preboda-completa-related-premium-cinematico-foto-video",
            "label": "HÍBRIDA - Experiencia cinematográfica",
            "priceLabel": "3'900.000 COP",
            "priceAmountCop": 3900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "premium-cinematico-foto-video"
          },
          {
            "id": "preboda-completa-related-luxury-cinematico-foto-video",
            "label": "HÍBRIDA - The Wedding Film Experience",
            "priceLabel": "6'100.000 COP",
            "priceAmountCop": 6100000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "luxury-cinematico-foto-video"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Conecta la preboda con una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-completa-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "preboda-completa-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "preboda-completa-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Consulta los paquetes disponibles para documentar también la petición.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-completa-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "preboda-completa-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "preboda-completa-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Preboda%20Completa%20de%20preboda."
  },
  {
    "category": "preboda",
    "slug": "preboda-editorial",
    "categoryLabel": "Preboda",
    "categoryHref": "/portfolio/preboda",
    "title": "Preboda Editorial",
    "packageTypeLabel": "Sesión preboda",
    "packageGroup": "session",
    "eyebrow": "Paquete de preboda",
    "lead": "Sesión con planeación visual y dirección creativa avanzada para crear una historia de pareja con mayor intención estética.",
    "image": "assets/images/galery/M&D-32.jpg",
    "priceLines": [
      "780.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "preboda-editorial-base",
        "label": "780.000 COP",
        "amountCop": 780000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo",
          "Hasta 2 locaciones",
          "Duración de 3 horas",
          "Hasta 3 vestuarios",
          "Planeación visual",
          "Dirección creativa personalizada"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 80 fotografías finales, seleccionadas y editadas",
          "Reel vertical de 30 a 45 segundos",
          "1 cuadro fotográfico de 60 x 40 cm",
          "Galería digital privada por 6 meses",
          "Entrega final en alta resolución por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "preboda-editorial-section-1-1",
            "label": "1 fotógrafo",
            "selectedByDefault": true
          },
          {
            "id": "preboda-editorial-section-1-2",
            "label": "Hasta 2 locaciones",
            "selectedByDefault": true
          },
          {
            "id": "preboda-editorial-section-1-3",
            "label": "Duración de 3 horas",
            "selectedByDefault": true
          },
          {
            "id": "preboda-editorial-section-1-4",
            "label": "Hasta 3 vestuarios",
            "selectedByDefault": true
          },
          {
            "id": "preboda-editorial-section-1-5",
            "label": "Planeación visual",
            "selectedByDefault": true
          },
          {
            "id": "preboda-editorial-section-1-6",
            "label": "Dirección creativa personalizada",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "preboda-editorial-section-2-1",
            "label": "Hasta 80 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "preboda-editorial-section-2-2",
            "label": "Reel vertical de 30 a 45 segundos",
            "selectedByDefault": true
          },
          {
            "id": "preboda-editorial-section-2-3",
            "label": "1 cuadro fotográfico de 60 x 40 cm",
            "selectedByDefault": true
          },
          {
            "id": "preboda-editorial-section-2-4",
            "label": "Galería digital privada por 6 meses",
            "selectedByDefault": true
          },
          {
            "id": "preboda-editorial-section-2-5",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Complementos opcionales",
        "description": "Añade entregables o extras para ampliar la sesión.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-editorial-addon-1",
            "label": "Reel adicional para redes",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-editorial-addon-2",
            "label": "Cambio extra de vestuario",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-editorial-addon-3",
            "label": "Película extendida",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-editorial-addon-4",
            "label": "Foto impresa adicional",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Cobertura principal de boda",
        "description": "Continúa con uno de nuestros paquetes protagonistas de foto y video.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-editorial-related-esencial-hibrido-foto-video",
            "label": "HÍBRIDA - Tu historia en foto y video",
            "priceLabel": "1'900.000 COP",
            "priceAmountCop": 1900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "esencial-hibrido-foto-video"
          },
          {
            "id": "preboda-editorial-related-completo-hibrido-foto-video",
            "label": "HÍBRIDA - La historia completa de tu boda",
            "priceLabel": "2'800.000 COP",
            "priceAmountCop": 2800000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "completo-hibrido-foto-video"
          },
          {
            "id": "preboda-editorial-related-premium-cinematico-foto-video",
            "label": "HÍBRIDA - Experiencia cinematográfica",
            "priceLabel": "3'900.000 COP",
            "priceAmountCop": 3900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "premium-cinematico-foto-video"
          },
          {
            "id": "preboda-editorial-related-luxury-cinematico-foto-video",
            "label": "HÍBRIDA - The Wedding Film Experience",
            "priceLabel": "6'100.000 COP",
            "priceAmountCop": 6100000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "luxury-cinematico-foto-video"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Conecta la preboda con una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-editorial-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "preboda-editorial-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "preboda-editorial-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Consulta los paquetes disponibles para documentar también la petición.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-editorial-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "preboda-editorial-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "preboda-editorial-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Preboda%20Editorial%20de%20preboda."
  },
  {
    "category": "preboda",
    "slug": "preboda-premium",
    "categoryLabel": "Preboda",
    "categoryHref": "/portfolio/preboda",
    "title": "Preboda Cinematográfica",
    "packageTypeLabel": "Sesión preboda",
    "packageGroup": "session",
    "eyebrow": "Paquete de preboda",
    "lead": "Producción audiovisual de preboda con fotografía, video y una narrativa planeada para contar la historia antes del gran día.",
    "image": "assets/images/fotos/M&D-31.jpg",
    "priceLines": [
      "1.150.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "preboda-premium-base",
        "label": "1.150.000 COP",
        "amountCop": 1150000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 4,
    "accent": "rose",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "1 fotógrafo y 1 videógrafo",
          "Hasta 2 locaciones",
          "Duración de 4 horas",
          "Hasta 3 vestuarios",
          "Reunión de planeación",
          "Concepto visual y narrativa",
          "Dirección creativa avanzada"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Hasta 100 fotografías finales, seleccionadas y editadas",
          "Reel vertical de 45 a 60 segundos",
          "Película preboda de 2 a 3 minutos",
          "1 cuadro fotográfico de 60 x 40 cm",
          "Galería digital privada por 1 año",
          "Entrega final en alta resolución por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "preboda-premium-section-1-1",
            "label": "1 fotógrafo y 1 videógrafo",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-1-2",
            "label": "Hasta 2 locaciones",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-1-3",
            "label": "Duración de 4 horas",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-1-4",
            "label": "Hasta 3 vestuarios",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-1-5",
            "label": "Reunión de planeación",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-1-6",
            "label": "Concepto visual y narrativa",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-1-7",
            "label": "Dirección creativa avanzada",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "preboda-premium-section-2-1",
            "label": "Hasta 100 fotografías finales, seleccionadas y editadas",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-2-2",
            "label": "Reel vertical de 45 a 60 segundos",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-2-3",
            "label": "Película preboda de 2 a 3 minutos",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-2-4",
            "label": "1 cuadro fotográfico de 60 x 40 cm",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-2-5",
            "label": "Galería digital privada por 1 año",
            "selectedByDefault": true
          },
          {
            "id": "preboda-premium-section-2-6",
            "label": "Entrega final en alta resolución por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Complementos opcionales",
        "description": "Añade entregables o extras para ampliar la sesión.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-premium-addon-1",
            "label": "Reel adicional para redes",
            "priceLabel": "150.000 COP",
            "priceAmountCop": 150000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-premium-addon-2",
            "label": "Cambio extra de vestuario",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-premium-addon-3",
            "label": "Película extendida",
            "priceLabel": "220.000 COP",
            "priceAmountCop": 220000,
            "selectedByDefault": false
          },
          {
            "id": "preboda-premium-addon-4",
            "label": "Foto impresa adicional",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          }
        ]
      },
      {
        "title": "Cobertura principal de boda",
        "description": "Continúa con uno de nuestros paquetes protagonistas de foto y video.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-premium-related-esencial-hibrido-foto-video",
            "label": "HÍBRIDA - Tu historia en foto y video",
            "priceLabel": "1'900.000 COP",
            "priceAmountCop": 1900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "esencial-hibrido-foto-video"
          },
          {
            "id": "preboda-premium-related-completo-hibrido-foto-video",
            "label": "HÍBRIDA - La historia completa de tu boda",
            "priceLabel": "2'800.000 COP",
            "priceAmountCop": 2800000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "completo-hibrido-foto-video"
          },
          {
            "id": "preboda-premium-related-premium-cinematico-foto-video",
            "label": "HÍBRIDA - Experiencia cinematográfica",
            "priceLabel": "3'900.000 COP",
            "priceAmountCop": 3900000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "premium-cinematico-foto-video"
          },
          {
            "id": "preboda-premium-related-luxury-cinematico-foto-video",
            "label": "HÍBRIDA - The Wedding Film Experience",
            "priceLabel": "6'100.000 COP",
            "priceAmountCop": 6100000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "luxury-cinematico-foto-video"
          }
        ]
      },
      {
        "title": "Boda civil",
        "description": "Conecta la preboda con una cobertura independiente para la ceremonia civil.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-premium-related-civil-esencial",
            "label": "Civil Esencial",
            "priceLabel": "550.000 COP",
            "priceAmountCop": 550000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-esencial"
          },
          {
            "id": "preboda-premium-related-civil-completa",
            "label": "Civil Completa",
            "priceLabel": "850.000 COP",
            "priceAmountCop": 850000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-completa"
          },
          {
            "id": "preboda-premium-related-civil-hibrida",
            "label": "Civil Híbrida",
            "priceLabel": "1'350.000 COP",
            "priceAmountCop": 1350000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "civil-hibrida"
          }
        ]
      },
      {
        "title": "Petición de mano",
        "description": "Consulta los paquetes disponibles para documentar también la petición.",
        "selectable": true,
        "options": [
          {
            "id": "preboda-premium-related-peticion-esencial",
            "label": "Petición Esencial",
            "priceLabel": "450.000 COP",
            "priceAmountCop": 450000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-esencial"
          },
          {
            "id": "preboda-premium-related-peticion-completa",
            "label": "Petición Completa",
            "priceLabel": "750.000 COP",
            "priceAmountCop": 750000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-completa"
          },
          {
            "id": "preboda-premium-related-peticion-hibrida",
            "label": "Petición Híbrida",
            "priceLabel": "1'150.000 COP",
            "priceAmountCop": 1150000,
            "selectedByDefault": false,
            "linkedPackageCategory": "bodas",
            "linkedPackageSlug": "peticion-hibrida"
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Preboda%20Cinematogr%C3%A1fica%20de%20preboda."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-video-institucional-esencial",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Esencial – Presentación corporativa",
    "packageTypeLabel": "Video institucional",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · video institucional",
    "lead": "Video institucional claro y profesional para presentar tu empresa.",
    "image": "assets/images/galery/M&D-23.jpg",
    "priceLines": [
      "620000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-video-institucional-esencial-cop",
        "label": "620000",
        "amountCop": 620000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Hasta 4 horas de grabación",
          "1 locación",
          "Grabación en 4K",
          "Tomas de apoyo (B-roll)"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Video institucional principal de 1 a 2 minutos",
          "Archivo final horizontal",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-video-institucional-esencial-section-1-1",
            "label": "Hasta 4 horas de grabación",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-esencial-section-1-2",
            "label": "1 locación",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-esencial-section-1-3",
            "label": "Grabación en 4K",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-esencial-section-1-4",
            "label": "Tomas de apoyo (B-roll)",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-video-institucional-esencial-section-2-1",
            "label": "Video institucional principal de 1 a 2 minutos",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-esencial-section-2-2",
            "label": "Archivo final horizontal",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-esencial-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Esencial%20%E2%80%93%20Presentaci%C3%B3n%20corporativa%20(video%20institucional)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-video-institucional-completo",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Completo – Comunicación de marca",
    "packageTypeLabel": "Video institucional",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · video institucional",
    "lead": "Producción audiovisual con mayor profundidad para comunicar tu marca.",
    "image": "assets/images/galery/M&D-29.jpg",
    "priceLines": [
      "1100000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-video-institucional-completo-cop",
        "label": "1100000",
        "amountCop": 1100000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Hasta 6 horas de grabación",
          "1 a 2 locaciones",
          "Dirección básica",
          "Mayor variedad de tomas"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Video institucional principal de 2 a 4 minutos",
          "Versión corta de 30 a 60 segundos",
          "Archivos finales en formato horizontal y vertical",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-video-institucional-completo-section-1-1",
            "label": "Hasta 6 horas de grabación",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-completo-section-1-2",
            "label": "1 a 2 locaciones",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-completo-section-1-3",
            "label": "Dirección básica",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-completo-section-1-4",
            "label": "Mayor variedad de tomas",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-video-institucional-completo-section-2-1",
            "label": "Video institucional principal de 2 a 4 minutos",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-completo-section-2-2",
            "label": "Versión corta de 30 a 60 segundos",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-completo-section-2-3",
            "label": "Archivos finales en formato horizontal y vertical",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-completo-section-2-4",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Completo%20%E2%80%93%20Comunicaci%C3%B3n%20de%20marca%20(video%20institucional)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-video-institucional-premium",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Premium – Producción corporativa",
    "packageTypeLabel": "Video institucional",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · video institucional",
    "lead": "Producción completa con enfoque cinematográfico y alto impacto visual.",
    "image": "assets/images/fotos/default-cover.png",
    "priceLines": [
      "1900000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-video-institucional-premium-cop",
        "label": "1900000",
        "amountCop": 1900000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Hasta 10 horas de grabación",
          "Múltiples locaciones",
          "Dirección creativa",
          "Tomas con drone (si aplica)"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "Video principal de 3 a 5 minutos",
          "2 a 3 videos cortos",
          "2 a 3 cortes adaptados para redes sociales",
          "Archivos finales en formato horizontal y vertical",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-video-institucional-premium-section-1-1",
            "label": "Hasta 10 horas de grabación",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-premium-section-1-2",
            "label": "Múltiples locaciones",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-premium-section-1-3",
            "label": "Dirección creativa",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-premium-section-1-4",
            "label": "Tomas con drone (si aplica)",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-video-institucional-premium-section-2-1",
            "label": "Video principal de 3 a 5 minutos",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-premium-section-2-2",
            "label": "2 a 3 videos cortos",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-premium-section-2-3",
            "label": "2 a 3 cortes adaptados para redes sociales",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-premium-section-2-4",
            "label": "Archivos finales en formato horizontal y vertical",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-video-institucional-premium-section-2-5",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Premium%20%E2%80%93%20Producci%C3%B3n%20corporativa%20(video%20institucional)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-redes-start",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Base – Contenido esencial",
    "packageTypeLabel": "Contenido para redes",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · contenido para redes",
    "lead": "Producción de contenido simple para comenzar en redes sociales.",
    "image": "assets/images/galery/M&D-22.jpg",
    "priceLines": [
      "420000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-redes-start-cop",
        "label": "420000",
        "amountCop": 420000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Sesión de grabación de 3 a 4 horas",
          "Producción básica"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "5 piezas de contenido en formato vertical",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-redes-start-section-1-1",
            "label": "Sesión de grabación de 3 a 4 horas",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-redes-start-section-1-2",
            "label": "Producción básica",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-redes-start-section-2-1",
            "label": "5 piezas de contenido en formato vertical",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-redes-start-section-2-2",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Base%20%E2%80%93%20Contenido%20esencial%20(contenido%20para%20redes)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-redes-creator",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Constante – Presencia activa",
    "packageTypeLabel": "Contenido para redes",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · contenido para redes",
    "lead": "Contenido constante para mantener presencia activa en redes.",
    "image": "assets/images/galery/M&D-15.jpg",
    "priceLines": [
      "790000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-redes-creator-cop",
        "label": "790000",
        "amountCop": 790000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Jornada de hasta 6 horas",
          "Planeación básica de contenido"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "10 piezas de contenido listas para publicar",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-redes-creator-section-1-1",
            "label": "Jornada de hasta 6 horas",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-redes-creator-section-1-2",
            "label": "Planeación básica de contenido",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-redes-creator-section-2-1",
            "label": "10 piezas de contenido listas para publicar",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-redes-creator-section-2-2",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Constante%20%E2%80%93%20Presencia%20activa%20(contenido%20para%20redes)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-redes-pro-content",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Estratégico – Producción audiovisual",
    "packageTypeLabel": "Contenido para redes",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · contenido para redes",
    "lead": "Producción avanzada con enfoque estratégico para redes.",
    "image": "assets/images/galery/M&D-18.jpg",
    "priceLines": [
      "1450000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-redes-pro-content-cop",
        "label": "1450000",
        "amountCop": 1450000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Producción estructurada",
          "Dirección creativa"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "15 a 20 piezas de contenido",
          "Piezas para formatos educativo, promocional y branding",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-redes-pro-content-section-1-1",
            "label": "Producción estructurada",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-redes-pro-content-section-1-2",
            "label": "Dirección creativa",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-redes-pro-content-section-2-1",
            "label": "15 a 20 piezas de contenido",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-redes-pro-content-section-2-2",
            "label": "Piezas para formatos educativo, promocional y branding",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-redes-pro-content-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Estrat%C3%A9gico%20%E2%80%93%20Producci%C3%B3n%20audiovisual%20(contenido%20para%20redes)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-eventos-esencial",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Esencial – Cobertura básica",
    "packageTypeLabel": "Eventos corporativos",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · eventos",
    "lead": "Cobertura básica para eventos empresariales.",
    "image": "assets/images/galery/M&D-19.jpg",
    "priceLines": [
      "520000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-eventos-esencial-cop",
        "label": "520000",
        "amountCop": 520000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura del evento",
        "items": [
          "Hasta 4 horas de cobertura"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "60 a 80 fotografías editadas",
          "Galería digital privada",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura del evento",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-eventos-esencial-section-1-1",
            "label": "Hasta 4 horas de cobertura",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-eventos-esencial-section-2-1",
            "label": "60 a 80 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-esencial-section-2-2",
            "label": "Galería digital privada",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-esencial-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Esencial%20%E2%80%93%20Cobertura%20b%C3%A1sica%20(eventos%20corporativos)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-eventos-completo",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Completo – Cobertura profesional",
    "packageTypeLabel": "Eventos corporativos",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · eventos",
    "lead": "Cobertura completa con fotografía y video.",
    "image": "assets/images/galery/M&D-32.jpg",
    "priceLines": [
      "950000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-eventos-completo-cop",
        "label": "950000",
        "amountCop": 950000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura del evento",
        "items": [
          "Hasta 6 horas de cobertura",
          "Mayor cobertura de momentos"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "100 a 150 fotografías editadas",
          "Video resumen de 1 a 2 minutos",
          "Galería digital privada",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura del evento",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-eventos-completo-section-1-1",
            "label": "Hasta 6 horas de cobertura",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-completo-section-1-2",
            "label": "Mayor cobertura de momentos",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-eventos-completo-section-2-1",
            "label": "100 a 150 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-completo-section-2-2",
            "label": "Video resumen de 1 a 2 minutos",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-completo-section-2-3",
            "label": "Galería digital privada",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-completo-section-2-4",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Completo%20%E2%80%93%20Cobertura%20profesional%20(eventos%20corporativos)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-eventos-premium",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Premium – Cobertura integral",
    "packageTypeLabel": "Eventos corporativos",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · eventos",
    "lead": "Cobertura completa con equipo ampliado y contenido para redes.",
    "image": "assets/images/galery/M&D-18.jpg",
    "priceLines": [
      "1750000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-eventos-premium-cop",
        "label": "1750000",
        "amountCop": 1750000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura del evento",
        "items": [
          "Jornada completa",
          "Equipo ampliado"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "150 a 250 fotografías editadas",
          "Video resumen de 2 a 4 minutos",
          "Reel para redes",
          "Galería digital privada",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura del evento",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-eventos-premium-section-1-1",
            "label": "Jornada completa",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-premium-section-1-2",
            "label": "Equipo ampliado",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-eventos-premium-section-2-1",
            "label": "150 a 250 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-premium-section-2-2",
            "label": "Video resumen de 2 a 4 minutos",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-premium-section-2-3",
            "label": "Reel para redes",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-premium-section-2-4",
            "label": "Galería digital privada",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-eventos-premium-section-2-5",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Premium%20%E2%80%93%20Cobertura%20integral%20(eventos%20corporativos)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-marca-personal-esencial",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Esencial – Presencia profesional",
    "packageTypeLabel": "Marca personal",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · marca personal",
    "lead": "Sesión básica para mejorar tu imagen profesional.",
    "image": "assets/images/galery/M&D-22.jpg",
    "priceLines": [
      "350000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-marca-personal-esencial-cop",
        "label": "350000",
        "amountCop": 350000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Sesión fotográfica"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "20 fotografías editadas",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-marca-personal-esencial-section-1-1",
            "label": "Sesión fotográfica",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-marca-personal-esencial-section-2-1",
            "label": "20 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-marca-personal-esencial-section-2-2",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Esencial%20%E2%80%93%20Presencia%20profesional%20(marca%20personal)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-marca-personal-completo",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Completo – Imagen y contenido",
    "packageTypeLabel": "Marca personal",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · marca personal",
    "lead": "Combinación de fotografía y video para redes.",
    "image": "assets/images/galery/M&D-29.jpg",
    "priceLines": [
      "690000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-marca-personal-completo-cop",
        "label": "690000",
        "amountCop": 690000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Sesión foto + video"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "40 fotografías editadas",
          "3 reels",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-marca-personal-completo-section-1-1",
            "label": "Sesión foto + video",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-marca-personal-completo-section-2-1",
            "label": "40 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-marca-personal-completo-section-2-2",
            "label": "3 reels",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-marca-personal-completo-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Completo%20%E2%80%93%20Imagen%20y%20contenido%20(marca%20personal)."
  },
  {
    "category": "corporativos",
    "slug": "corporativos-marca-personal-premium",
    "categoryLabel": "Corporativos",
    "categoryHref": "/portfolio/corporativos",
    "title": "Premium – Marca personal completa",
    "packageTypeLabel": "Marca personal",
    "packageGroup": "custom",
    "eyebrow": "Corporativos · marca personal",
    "lead": "Producción completa con dirección de imagen.",
    "image": "assets/images/fotos/M&D-31.jpg",
    "priceLines": [
      "1250000"
    ],
    "baseQuoteOptions": [
      {
        "id": "corporativos-marca-personal-premium-cop",
        "label": "1250000",
        "amountCop": 1250000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Incluye",
        "items": [
          "Producción completa",
          "Dirección creativa"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "60 fotografías editadas",
          "6 a 10 videos cortos",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Incluye",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-marca-personal-premium-section-1-1",
            "label": "Producción completa",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-marca-personal-premium-section-1-2",
            "label": "Dirección creativa",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "corporativos-marca-personal-premium-section-2-1",
            "label": "60 fotografías editadas",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-marca-personal-premium-section-2-2",
            "label": "6 a 10 videos cortos",
            "selectedByDefault": true
          },
          {
            "id": "corporativos-marca-personal-premium-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Premium%20%E2%80%93%20Marca%20personal%20completa%20(marca%20personal)."
  },
  {
    "category": "videos",
    "slug": "video-esencial",
    "categoryLabel": "Videos",
    "categoryHref": "/portfolio/videos",
    "title": "Video Esencial",
    "packageTypeLabel": "Producción audiovisual",
    "packageGroup": "custom",
    "eyebrow": "Video · Producción audiovisual",
    "lead": "Producción directa, limpia y profesional para artistas que buscan un resultado de calidad sin producción compleja.",
    "image": "assets/images/galery/M&D-30.jpg",
    "priceLines": [
      "400.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "video-esencial-cop",
        "label": "400.000 COP",
        "amountCop": 400000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 1,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Grabación en locación natural o entorno básico",
          "Iluminación básica",
          "Producción de hasta 4 horas",
          "Equipo compacto",
          "Asesoría creativa previa a la grabación",
          "Planeación básica de escenas"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "1 video musical final de hasta 4 minutos en 4K",
          "1 archivo final en formato horizontal",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "video-esencial-section-1-1",
            "label": "Grabación en locación natural o entorno básico",
            "selectedByDefault": true
          },
          {
            "id": "video-esencial-section-1-2",
            "label": "Iluminación básica",
            "selectedByDefault": true
          },
          {
            "id": "video-esencial-section-1-3",
            "label": "Producción de hasta 4 horas",
            "selectedByDefault": true
          },
          {
            "id": "video-esencial-section-1-4",
            "label": "Equipo compacto",
            "selectedByDefault": true
          },
          {
            "id": "video-esencial-section-1-5",
            "label": "Asesoría creativa previa a la grabación",
            "selectedByDefault": true
          },
          {
            "id": "video-esencial-section-1-6",
            "label": "Planeación básica de escenas",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "video-esencial-section-2-1",
            "label": "1 video musical final de hasta 4 minutos en 4K",
            "selectedByDefault": true
          },
          {
            "id": "video-esencial-section-2-2",
            "label": "1 archivo final en formato horizontal",
            "selectedByDefault": true
          },
          {
            "id": "video-esencial-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Personaliza la producción sumando estos servicios extra.",
        "selectable": true,
        "options": [
          {
            "id": "video-esencial-addon-1",
            "label": "Tomas con drone||Planos aéreos para ampliar el impacto visual y la escala del proyecto",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "video-esencial-addon-2",
            "label": "Reel adicional para redes||Versión extra en formato vertical pensada para Instagram, TikTok y estados",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-esencial-addon-3",
            "label": "Miniatura para YouTube / Spotify||Miniatura optimizada para YouTube y portada visual para Spotify",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "video-esencial-addon-4",
            "label": "Creación de guión||Desarrollo estructurado de la narrativa del video con enfoque profesional",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "video-esencial-addon-5",
            "label": "Conceptualización y storytelling||Construcción de idea creativa, estética y narrativa del video",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "video-esencial-addon-6",
            "label": "Video de referencia previo||Video guía con referencias visuales para definir el resultado final antes de grabar",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "video-esencial-addon-7",
            "label": "Dirección creativa extendida||Acompañamiento completo en la dirección artística durante todo el rodaje",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "video-esencial-addon-8",
            "label": "Planificación de escenas||Organización de tomas y estructura visual para optimizar la grabación",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-esencial-addon-9",
            "label": "Scouting de locación||Búsqueda y selección de locaciones adecuadas para el proyecto",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Video%20Esencial%20(video)."
  },
  {
    "category": "videos",
    "slug": "video-pro",
    "categoryLabel": "Videos",
    "categoryHref": "/portfolio/videos",
    "title": "Video Pro",
    "packageTypeLabel": "Producción audiovisual",
    "packageGroup": "custom",
    "eyebrow": "Video · Producción audiovisual",
    "lead": "Producción con mayor impacto visual, ideal para artistas que buscan calidad superior y contenido para redes.",
    "image": "assets/images/galery/M&D-31.jpg",
    "priceLines": [
      "560.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "video-pro-cop",
        "label": "560.000 COP",
        "amountCop": 560000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 2,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Tomas con drone",
          "Iluminación mejorada",
          "Dirección básica",
          "Mayor control de escena",
          "Producción de hasta 6 horas",
          "Asesoría creativa previa a la grabación",
          "Definición de concepto visual",
          "Dirección creativa durante rodaje",
          "Referencia visual previa del proyecto",
          "Definición de estilo visual y ritmo del video"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "1 video musical final de hasta 6 minutos en 4K",
          "2 a 3 reels verticales para redes",
          "1 portada para Spotify",
          "1 miniatura para YouTube",
          "Archivos finales en formato horizontal y vertical",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "video-pro-section-1-1",
            "label": "Tomas con drone",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-1-2",
            "label": "Iluminación mejorada",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-1-3",
            "label": "Dirección básica",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-1-4",
            "label": "Mayor control de escena",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-1-5",
            "label": "Producción de hasta 6 horas",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-1-6",
            "label": "Asesoría creativa previa a la grabación",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-1-7",
            "label": "Definición de concepto visual",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-1-8",
            "label": "Dirección creativa durante rodaje",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-1-9",
            "label": "Referencia visual previa del proyecto",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-1-10",
            "label": "Definición de estilo visual y ritmo del video",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "video-pro-section-2-1",
            "label": "1 video musical final de hasta 6 minutos en 4K",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-2-2",
            "label": "2 a 3 reels verticales para redes",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-2-3",
            "label": "1 portada para Spotify",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-2-4",
            "label": "1 miniatura para YouTube",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-2-5",
            "label": "Archivos finales en formato horizontal y vertical",
            "selectedByDefault": true
          },
          {
            "id": "video-pro-section-2-6",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Personaliza la producción sumando estos servicios extra.",
        "selectable": true,
        "options": [
          {
            "id": "video-pro-addon-1",
            "label": "Tomas con drone||Planos aéreos para ampliar el impacto visual y la escala del proyecto",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "video-pro-addon-2",
            "label": "Reel adicional para redes||Versión extra en formato vertical pensada para Instagram, TikTok y estados",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-pro-addon-3",
            "label": "Miniatura para YouTube / Spotify||Miniatura optimizada para YouTube y portada visual para Spotify",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "video-pro-addon-4",
            "label": "Creación de guión||Desarrollo estructurado de la narrativa del video con enfoque profesional",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "video-pro-addon-5",
            "label": "Conceptualización y storytelling||Construcción de idea creativa, estética y narrativa del video",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "video-pro-addon-6",
            "label": "Video de referencia previo||Video guía con referencias visuales para definir el resultado final antes de grabar",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "video-pro-addon-7",
            "label": "Dirección creativa extendida||Acompañamiento completo en la dirección artística durante todo el rodaje",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "video-pro-addon-8",
            "label": "Planificación de escenas||Organización de tomas y estructura visual para optimizar la grabación",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-pro-addon-9",
            "label": "Scouting de locación||Búsqueda y selección de locaciones adecuadas para el proyecto",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Video%20Pro%20(video)."
  },
  {
    "category": "videos",
    "slug": "video-cinematico",
    "categoryLabel": "Videos",
    "categoryHref": "/portfolio/videos",
    "title": "Video Cinemático",
    "packageTypeLabel": "Producción audiovisual",
    "packageGroup": "custom",
    "eyebrow": "Video · Producción audiovisual",
    "lead": "Producción narrativa con enfoque cinematográfico para proyectos de alto nivel visual.",
    "image": "assets/images/galery/M&D-32.jpg",
    "priceLines": [
      "850.000 COP"
    ],
    "baseQuoteOptions": [
      {
        "id": "video-cinematico-cop",
        "label": "850.000 COP",
        "amountCop": 850000,
        "selectedByDefault": true
      }
    ],
    "featured": true,
    "sortOrder": 3,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Múltiples locaciones",
          "Storytelling",
          "Dirección creativa",
          "Producción más elaborada",
          "Asesoría creativa previa a la grabación",
          "Definición de concepto visual",
          "Construcción de storytelling",
          "Desarrollo de idea narrativa",
          "Dirección creativa durante rodaje",
          "Planeación básica de escenas",
          "Acompañamiento en elección de locación",
          "Referencia visual previa del proyecto",
          "Definición de estilo visual y ritmo del video"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "1 video final de hasta 7 minutos en 4K",
          "1 archivo final en formato horizontal",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "video-cinematico-section-1-1",
            "label": "Múltiples locaciones",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-2",
            "label": "Storytelling",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-3",
            "label": "Dirección creativa",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-4",
            "label": "Producción más elaborada",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-5",
            "label": "Asesoría creativa previa a la grabación",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-6",
            "label": "Definición de concepto visual",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-7",
            "label": "Construcción de storytelling",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-8",
            "label": "Desarrollo de idea narrativa",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-9",
            "label": "Dirección creativa durante rodaje",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-10",
            "label": "Planeación básica de escenas",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-11",
            "label": "Acompañamiento en elección de locación",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-12",
            "label": "Referencia visual previa del proyecto",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-1-13",
            "label": "Definición de estilo visual y ritmo del video",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "video-cinematico-section-2-1",
            "label": "1 video final de hasta 7 minutos en 4K",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-2-2",
            "label": "1 archivo final en formato horizontal",
            "selectedByDefault": true
          },
          {
            "id": "video-cinematico-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Personaliza la producción sumando estos servicios extra.",
        "selectable": true,
        "options": [
          {
            "id": "video-cinematico-addon-1",
            "label": "Tomas con drone||Planos aéreos para ampliar el impacto visual y la escala del proyecto",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "video-cinematico-addon-2",
            "label": "Reel adicional para redes||Versión extra en formato vertical pensada para Instagram, TikTok y estados",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-cinematico-addon-3",
            "label": "Miniatura para YouTube / Spotify||Miniatura optimizada para YouTube y portada visual para Spotify",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "video-cinematico-addon-4",
            "label": "Creación de guión||Desarrollo estructurado de la narrativa del video con enfoque profesional",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "video-cinematico-addon-5",
            "label": "Conceptualización y storytelling||Construcción de idea creativa, estética y narrativa del video",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "video-cinematico-addon-6",
            "label": "Video de referencia previo||Video guía con referencias visuales para definir el resultado final antes de grabar",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "video-cinematico-addon-7",
            "label": "Dirección creativa extendida||Acompañamiento completo en la dirección artística durante todo el rodaje",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "video-cinematico-addon-8",
            "label": "Planificación de escenas||Organización de tomas y estructura visual para optimizar la grabación",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-cinematico-addon-9",
            "label": "Scouting de locación||Búsqueda y selección de locaciones adecuadas para el proyecto",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Video%20Cinem%C3%A1tico%20(video)."
  },
  {
    "category": "videos",
    "slug": "video-personalizado",
    "categoryLabel": "Videos",
    "categoryHref": "/portfolio/videos",
    "title": "Video Personalizado",
    "packageTypeLabel": "Producción audiovisual",
    "packageGroup": "custom",
    "eyebrow": "Video · Producción audiovisual",
    "lead": "Producción completamente adaptada a las necesidades del cliente.",
    "image": "assets/images/galery/M&D-29.jpg",
    "priceLines": [
      "250.000 COP (Base)"
    ],
    "baseQuoteOptions": [
      {
        "id": "video-personalizado-cop",
        "label": "250.000 COP (Base)",
        "amountCop": 250000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 4,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Configuración personalizada",
          "Escalable según presupuesto",
          "Selección libre de servicios",
          "Asesoría creativa previa a la grabación",
          "Definición de concepto visual",
          "Desarrollo de idea narrativa",
          "Acompañamiento en elección de locación",
          "Definición de estilo visual y ritmo del video"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "1 video final con duración acordada en la cotización",
          "Archivos finales en la resolución y formato definidos en la propuesta",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "video-personalizado-section-1-1",
            "label": "Configuración personalizada",
            "selectedByDefault": true
          },
          {
            "id": "video-personalizado-section-1-2",
            "label": "Escalable según presupuesto",
            "selectedByDefault": true
          },
          {
            "id": "video-personalizado-section-1-3",
            "label": "Selección libre de servicios",
            "selectedByDefault": true
          },
          {
            "id": "video-personalizado-section-1-4",
            "label": "Asesoría creativa previa a la grabación",
            "selectedByDefault": true
          },
          {
            "id": "video-personalizado-section-1-5",
            "label": "Definición de concepto visual",
            "selectedByDefault": true
          },
          {
            "id": "video-personalizado-section-1-6",
            "label": "Desarrollo de idea narrativa",
            "selectedByDefault": true
          },
          {
            "id": "video-personalizado-section-1-7",
            "label": "Acompañamiento en elección de locación",
            "selectedByDefault": true
          },
          {
            "id": "video-personalizado-section-1-8",
            "label": "Definición de estilo visual y ritmo del video",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "video-personalizado-section-2-1",
            "label": "1 video final con duración acordada en la cotización",
            "selectedByDefault": true
          },
          {
            "id": "video-personalizado-section-2-2",
            "label": "Archivos finales en la resolución y formato definidos en la propuesta",
            "selectedByDefault": true
          },
          {
            "id": "video-personalizado-section-2-3",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Personaliza la producción sumando estos servicios extra.",
        "selectable": true,
        "options": [
          {
            "id": "video-personalizado-addon-1",
            "label": "Tomas con drone||Planos aéreos para ampliar el impacto visual y la escala del proyecto",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "video-personalizado-addon-2",
            "label": "Reel adicional para redes||Versión extra en formato vertical pensada para Instagram, TikTok y estados",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-personalizado-addon-3",
            "label": "Miniatura para YouTube / Spotify||Miniatura optimizada para YouTube y portada visual para Spotify",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "video-personalizado-addon-4",
            "label": "Creación de guión||Desarrollo estructurado de la narrativa del video con enfoque profesional",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "video-personalizado-addon-5",
            "label": "Conceptualización y storytelling||Construcción de idea creativa, estética y narrativa del video",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          },
          {
            "id": "video-personalizado-addon-6",
            "label": "Video de referencia previo||Video guía con referencias visuales para definir el resultado final antes de grabar",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "video-personalizado-addon-7",
            "label": "Dirección creativa extendida||Acompañamiento completo en la dirección artística durante todo el rodaje",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "video-personalizado-addon-8",
            "label": "Planificación de escenas||Organización de tomas y estructura visual para optimizar la grabación",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-personalizado-addon-9",
            "label": "Scouting de locación||Búsqueda y selección de locaciones adecuadas para el proyecto",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Video%20Personalizado%20(video)."
  },
  {
    "category": "videos",
    "slug": "video-cortometraje",
    "categoryLabel": "Videos",
    "categoryHref": "/portfolio/videos",
    "title": "Video Cortometraje",
    "packageTypeLabel": "Producción audiovisual",
    "packageGroup": "custom",
    "eyebrow": "Video · Producción audiovisual",
    "lead": "Producción narrativa para cortometrajes, storytelling o proyectos creativos no musicales.",
    "image": "assets/images/galery/M&D-33.jpg",
    "priceLines": [
      "300.000 COP (Base)"
    ],
    "baseQuoteOptions": [
      {
        "id": "video-cortometraje-cop",
        "label": "300.000 COP (Base)",
        "amountCop": 300000,
        "selectedByDefault": true
      }
    ],
    "sortOrder": 5,
    "accent": "gold",
    "sections": [
      {
        "title": "Cobertura y servicio incluido",
        "items": [
          "Desarrollo de concepto",
          "Dirección creativa",
          "Producción personalizada",
          "Asesoría creativa previa a la grabación"
        ]
      },
      {
        "title": "Entregables",
        "items": [
          "1 cortometraje o pieza narrativa final",
          "Duración definida en la propuesta escrita",
          "Archivo final en resolución acordada para entrega",
          "Entrega final por Google Drive"
        ]
      }
    ],
    "requestOptionGroups": [
      {
        "title": "Cobertura y servicio incluido",
        "selectable": false,
        "options": [
          {
            "id": "video-cortometraje-section-1-1",
            "label": "Desarrollo de concepto",
            "selectedByDefault": true
          },
          {
            "id": "video-cortometraje-section-1-2",
            "label": "Dirección creativa",
            "selectedByDefault": true
          },
          {
            "id": "video-cortometraje-section-1-3",
            "label": "Producción personalizada",
            "selectedByDefault": true
          },
          {
            "id": "video-cortometraje-section-1-4",
            "label": "Asesoría creativa previa a la grabación",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Entregables",
        "selectable": false,
        "options": [
          {
            "id": "video-cortometraje-section-2-1",
            "label": "1 cortometraje o pieza narrativa final",
            "selectedByDefault": true
          },
          {
            "id": "video-cortometraje-section-2-2",
            "label": "Duración definida en la propuesta escrita",
            "selectedByDefault": true
          },
          {
            "id": "video-cortometraje-section-2-3",
            "label": "Archivo final en resolución acordada para entrega",
            "selectedByDefault": true
          },
          {
            "id": "video-cortometraje-section-2-4",
            "label": "Entrega final por Google Drive",
            "selectedByDefault": true
          }
        ]
      },
      {
        "title": "Servicios adicionales",
        "description": "Personaliza la producción sumando estos servicios extra.",
        "selectable": true,
        "options": [
          {
            "id": "video-cortometraje-addon-1",
            "label": "Guión o estructura narrativa||Desarrollo del guión o estructura narrativa del cortometraje",
            "priceLabel": "50.000 COP",
            "priceAmountCop": 50000,
            "selectedByDefault": false
          },
          {
            "id": "video-cortometraje-addon-2",
            "label": "Múltiples locaciones||Rodaje en 2 o más locaciones distintas",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "video-cortometraje-addon-3",
            "label": "Construcción de storytelling||Desarrollo de arco narrativo y estructura emocional del relato",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-cortometraje-addon-4",
            "label": "Desarrollo de idea narrativa||Conceptualización de la historia a contar antes del rodaje",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          },
          {
            "id": "video-cortometraje-addon-5",
            "label": "Dirección creativa durante rodaje||Acompañamiento artístico completo durante todo el día de grabación",
            "priceLabel": "100.000 COP",
            "priceAmountCop": 100000,
            "selectedByDefault": false
          },
          {
            "id": "video-cortometraje-addon-6",
            "label": "Planificación de escenas||Organización de tomas y estructura visual para optimizar la grabación",
            "priceLabel": "70.000 COP",
            "priceAmountCop": 70000,
            "selectedByDefault": false
          },
          {
            "id": "video-cortometraje-addon-7",
            "label": "Acompañamiento en elección de locación||Scouting y selección del lugar ideal para el proyecto",
            "priceLabel": "60.000 COP",
            "priceAmountCop": 60000,
            "selectedByDefault": false
          },
          {
            "id": "video-cortometraje-addon-8",
            "label": "Video de referencia previo||Video guía con referencias visuales para definir el resultado final antes de grabar",
            "priceLabel": "80.000 COP",
            "priceAmountCop": 80000,
            "selectedByDefault": false
          },
          {
            "id": "video-cortometraje-addon-9",
            "label": "Tomas con drone||Planos aéreos para ampliar la escala visual del cortometraje",
            "priceLabel": "120.000 COP",
            "priceAmountCop": 120000,
            "selectedByDefault": false
          }
        ]
      }
    ],
    "whatsappHref": "https://wa.me/573145406467?text=Hola%20TECNOJACK%2C%20quiero%20informaci%C3%B3n%20sobre%20Video%20Cortometraje%20(video)."
  }
]
```

---

## 6. Planes de Boda (Wedding Plans)
```json
[
  {
    "name": "Plan Sencilla",
    "priceCop": "1'250.000 COP",
    "priceUsd": "Foto + video",
    "summary": "Una cobertura sobria para parejas que buscan resolver su boda con buena estética y sin excesos.",
    "features": [
      "6-8 horas",
      "120 fotos editadas",
      "Video 3-10 min",
      "1 foto impresa 50cm"
    ]
  },
  {
    "name": "Plan Completa",
    "priceCop": "1'750.000 COP",
    "priceUsd": "Foto + video",
    "summary": "Plan equilibrado para cubrir todo el evento con más material, más narrativa y mejor entrega social.",
    "features": [
      "Todo el evento",
      "200 fotos editadas",
      "Video 4K",
      "Reel redes sociales",
      "Video tráiler"
    ]
  },
  {
    "name": "Plan Premium",
    "priceCop": "2'800.000 COP",
    "priceUsd": "Foto + video",
    "summary": "La propuesta más potente: pensada para parejas que quieren una experiencia cinematográfica completa.",
    "featured": true,
    "features": [
      "Preboda incluida",
      "Dron",
      "400 fotos",
      "Equipo completo",
      "Efectos especiales",
      "Trailer + Reel"
    ]
  }
]
```

---

## 7. Servicios Adicionales (Extras)
```json
[
  {
    "title": "Fotobook de lujo",
    "price": "Desde 250.000 COP",
    "description": "Álbum premium con selección detallada y acabado elegante."
  },
  {
    "title": "Video tráiler",
    "price": "Desde 150.000 COP",
    "description": "Pieza corta de alto impacto para compartir fácilmente en redes o por WhatsApp."
  },
  {
    "title": "Reel para redes",
    "price": "Desde 150.000 COP",
    "description": "Versión vertical lista para Instagram, TikTok y estados."
  },
  {
    "title": "Fotografía en madera",
    "price": "Desde 120.000 COP",
    "description": "Impresión decorativa con un acabado más memorable."
  }
]
```

---

## 8. Elementos de Galería (Portafolio Fotográfico)
```json
[
  {
    "src": "assets/images/fotos/default-cover.png",
    "alt": "Retrato editorial de pareja en exterior",
    "title": "Luz natural y dirección sutil",
    "category": "Preboda",
    "variant": "tall"
  },
  {
    "src": "assets/images/galery/M&D-29.jpg",
    "alt": "Pareja abrazándose durante la sesión de boda",
    "title": "Emoción real",
    "category": "Bodas"
  },
  {
    "src": "assets/images/galery/M&D-22.jpg",
    "alt": "Detalle elegante de una celebración especial",
    "title": "Detalles con intención",
    "category": "15 años"
  },
  {
    "src": "assets/images/galery/M&D-15.jpg",
    "alt": "Ceremonia capturada con estilo cinematográfico",
    "title": "Ceremonias con atmósfera",
    "category": "Grados",
    "variant": "wide"
  },
  {
    "src": "assets/images/fotos/M&D-31.jpg",
    "alt": "Retrato creativo de novios en recepción",
    "title": "Mirada de autor",
    "category": "Bodas"
  },
  {
    "src": "assets/images/fotos/M&D-12.jpg",
    "alt": "Momento espontáneo durante una boda",
    "title": "Movimiento y textura",
    "category": "15 años"
  },
  {
    "src": "assets/images/galery/M&D-18.jpg",
    "alt": "Sesión íntima de pareja antes del evento",
    "title": "Narrativa de pareja",
    "category": "Preboda"
  },
  {
    "src": "assets/images/galery/M&D-19.jpg",
    "alt": "Retrato elegante durante celebración de grado",
    "title": "Retratos de ceremonia",
    "category": "Grados"
  },
  {
    "src": "assets/images/galery/M&D-23.jpg",
    "alt": "Composición visual para una celebración juvenil",
    "title": "Celebraciones memorables",
    "category": "15 años"
  },
  {
    "src": "assets/images/galery/M&D-32.jpg",
    "alt": "Escena romántica en sesión previa a boda",
    "title": "Escenas previas al gran día",
    "category": "Preboda",
    "variant": "wide"
  }
]
```

---

## 9. Elementos de Video (Portafolio Videográfico)
```json
[
  {
    "title": "Wedding Films",
    "description": "Historias de boda editadas con ritmo, emoción y acabado cinematográfico.",
    "duration": "4 - 6 min",
    "youtubeId": "ysz5S6PUM-U",
    "format": "Wedding film"
  },
  {
    "title": "Event Recaps",
    "description": "Coberturas ágiles para eventos, shows y piezas pensadas para difusión rápida.",
    "duration": "1 - 2 min",
    "youtubeId": "ScMzIvxBSi4",
    "format": "Event recap"
  },
  {
    "title": "Social Edits",
    "description": "Ediciones verticales y cortas para captar atención en redes sociales.",
    "duration": "30 - 45 s",
    "youtubeId": "M7lc1UVf-VE",
    "format": "Social teaser"
  }
]
```

---

## 10. Información Global (Contacto, Perfil, Promesas de Marca)
### Redes de Contacto
```json
[
  {
    "platform": "whatsapp",
    "title": "WhatsApp",
    "description": "Consulta disponibilidad, inversión y tiempos de entrega.",
    "href": "https://wa.me/573145406467"
  },
  {
    "platform": "instagram",
    "title": "Instagram",
    "description": "Explora trabajos recientes, reels y contenido detrás de cámaras.",
    "href": "https://www.instagram.com/tecnojack"
  },
  {
    "platform": "facebook",
    "title": "Facebook",
    "description": "Revisa publicaciones, álbumes y novedades del estudio.",
    "href": "https://www.facebook.com/tecnojack.pc"
  },
  {
    "platform": "tiktok",
    "title": "TikTok",
    "description": "Mira clips cortos, tendencias y piezas rápidas del portafolio.",
    "href": "https://www.tiktok.com/@tecnojackyt"
  }
]
```

### Perfil Profesional
```json
{
  "eyebrow": "Perfil profesional",
  "title": "Más que fotografía, una visión completa",
  "lead": "Ingeniero de sistemas y productor audiovisual. Combino tecnología, creatividad y narrativa visual para ofrecer experiencias modernas, interactivas y visualmente impactantes.",
  "supportingLabel": "También desarrollo:",
  "points": [
    "Invitaciones digitales personalizadas",
    "Experiencias web para bodas y eventos",
    "Plataformas visuales interactivas"
  ],
  "ctaLabel": "Ver ejemplos",
  "ctaHref": "/portfolio#gallery"
}
```

### Pilares de Marca
```json
[
  {
    "title": "Experiencia que guía",
    "description": "Cobertura segura, lectura del momento y criterio visual en cada evento."
  },
  {
    "title": "Calidad que permanece",
    "description": "Imagen limpia, color cuidado y entregas con valor real en el tiempo."
  },
  {
    "title": "Arte con intención",
    "description": "Narrativa visual pensada para emocionar, representar y vender mejor."
  }
]
```

---

## 11. Estructura para Invitaciones (Módulo Independiente)
Actualmente el proyecto cuenta con un módulo de **Invitaciones Interactivas** (ej. `/diana-juan-invitation`). 
Para el backend, se requiere una colección `Invitations` con la siguiente estructura sugerida:

```json
{
  "slug": "diana-y-juan",
  "groomName": "Juan",
  "brideName": "Diana",
  "date": "2024-12-15T15:00:00Z",
  "ceremony": {
    "time": "15:00",
    "place": "Parroquia San José",
    "address": "Calle 123 #45-67",
    "mapUrl": "https://maps.google.com/..."
  },
  "reception": {
    "time": "17:00",
    "place": "Hacienda El Bosque",
    "address": "Km 5 Vía Principal",
    "mapUrl": "https://maps.google.com/..."
  },
  "dressCode": "Formal - Traje oscuro",
  "giftOptions": [
    {
      "type": "Lluvia de sobres",
      "description": "El mejor regalo es tu presencia, pero si deseas..."
    },
    {
      "type": "Transferencia",
      "bank": "Bancolombia",
      "accountType": "Ahorros",
      "accountNumber": "123456789",
      "ownerName": "Juan Pérez"
    }
  ],
  "guests": [
    { "name": "Pedro", "confirmed": true, "companions": 2 },
    { "name": "María", "confirmed": false, "companions": 0 }
  ]
}
```

---
*Reporte generado automáticamente a partir del código fuente de TECNOJACK.*
