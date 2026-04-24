# Portfolio TECNOJACK: contenido actual e implementación

## Alcance

Este documento describe el estado actual del módulo `features/portfolio` dentro del proyecto Angular.

Incluye:

- Las rutas activas del portfolio.
- Las secciones que se renderizan actualmente.
- Los textos visibles actuales.
- La forma en que el portfolio está implementado técnicamente.
- Las estructuras de datos que existen pero no se muestran hoy en la landing principal.

## Rutas activas del portfolio

Las rutas del portfolio están definidas en `src/app/app.routes.ts`.

- `/portfolio`
  Landing principal del portfolio.

- `/portfolio/bodas`
  Página de paquetes de boda.

- `/portfolio/quinces`
  Página de paquetes de quinceañeros.

- `/portfolio/grados`
  Página de paquetes grupales de graduación.

- `/portfolio/preboda`
  Página de paquetes de preboda.

- `/portfolio/bodas/:package`
  Vista detalle compartida para paquetes de boda.

- `/portfolio/quinces/:package`
  Vista detalle compartida para paquetes de quinceañeros.

- `/portfolio/grados/:package`
  Vista detalle compartida para el paquete de grados.

- `/portfolio/preboda/:package`
  Vista detalle compartida para paquetes de preboda.

## Estructura general de páginas

### 1. Shell compartido

Todas las páginas del portfolio usan `PortfolioShellComponent`.

Elementos comunes actuales:

- Marca: `TECNOJACK`
- Subtítulo por defecto: `Audiovisual Studio`
- CTA del header por defecto: `Solicitar info`
- Enlace flotante: `WhatsApp`
- Footer por defecto: `TECNOJACK Studio · fotografía y cine de bodas con dirección editorial.`

Navegación principal actual:

- `Inicio`
- `Bodas`
- `Quinces`
- `Grados`
- `Preboda`
- `WhatsApp`

## Landing principal `/portfolio`

La landing principal renderiza estas secciones, en este orden:

1. Hero
2. Sobre la marca
3. Servicios
4. Galería
5. Video
6. Contacto

### Hero

Textos visibles:

- Eyebrow: `TECNOJACK Studio`
- Título: `Capturamos momentos que se convierten en eternidad`
- Lead: `Fotografía y video profesional para bodas, 15 años, grados y eventos especiales`

Botones:

- `Ver servicios`
- `Ver portafolio`

Tarjeta lateral:

- Kicker: `Disponibilidad`
- Texto: `Fechas limitadas por temporada. Agenda pronto para asegurar cobertura y propuesta.`
- CTA: `Cotizar por WhatsApp`

Stats actuales:

- `10+` — `años de experiencia`
- `4K` — `acabado cinematográfico`
- `100%` — `enfoque artístico`

Highlights actuales:

- `Producción audiovisual con una mirada emocional, elegante y cinematográfica.`
- `Fotografía y video profesional para bodas, 15 años, grados y eventos especiales.`
- `Una marca pensada para convertir momentos importantes en piezas memorables.`

### Sobre la marca

Encabezado:

- Kicker: `Sobre la marca`
- Título: `Transformamos ideas en arte y hacemos de cada momento el más especial`
- Lead:
  `TECNOJACK es una marca audiovisual creada para narrar con intención. Combinamos experiencia, calidad técnica y sensibilidad artística para convertir cada evento en una pieza memorable, elegante y con identidad propia.`

Pilares visibles:

- `Experiencia que guía`
  `Cada cobertura nace de la experiencia en set, dirección visual y sensibilidad para leer el momento correcto.`

- `Calidad que permanece`
  `Trabajamos color, composición, ritmo y detalle para entregar imágenes con valor emocional y acabado profesional.`

- `Arte con intención`
  `Transformamos ideas en arte y hacemos de cada momento el más especial desde una mirada auténtica y cuidada.`

### Servicios

Encabezado:

- Kicker: `Servicios`
- Título: `Servicios visuales pensados para vender tu marca sin mostrar precios en la landing.`

Servicios visibles:

- `Bodas`
  `Cobertura cinematográfica para parejas que quieren una historia elegante, emotiva y visualmente sólida.`
  Puntos:
  - `Foto + video`
  - `Color cinematográfico`
  - `Entrega social y full quality`
  CTA: `Ver paquetes`

- `15 años`
  `Producción audiovisual para una celebración inolvidable con retratos, clips y momentos icónicos del evento.`
  Puntos:
  - `Retratos de gala`
  - `Clips verticales`
  - `Cobertura de ceremonia y fiesta`
  CTA: `Ver paquetes`

- `Grados`
  `Cobertura limpia y profesional para ceremonias, promociones y recuerdos familiares con alto valor visual.`
  Puntos:
  - `Llamado individual`
  - `Fotos familiares`
  - `Paquetes por estudiante o grupo`
  CTA: `Ver paquetes`

- `Preboda`
  `Sesiones previas con narrativa visual, dirección sutil y una estética ideal para contar su historia antes del gran día.`
  Puntos:
  - `Dirección creativa`
  - `Sesión exterior`
  - `Contenido emocional`
  CTA: `Ver paquetes`

### Galería

Encabezado:

- Kicker: `Galería`
- Título: `Una selección visual breve para mostrar estilo, atmósfera y dirección artística.`

Items visibles actualmente en la grilla renderizada:

- `Luz natural y dirección sutil` — categoría `Preboda`
- `Emoción real` — categoría `Bodas`
- `Detalles con intención` — categoría `15 años`
- `Ceremonias con atmósfera` — categoría `Grados`
- `Frames de autor` — categoría `Bodas`
- `Movimiento y textura` — categoría `15 años`

Nota: en `portfolio.data.ts` existen 10 items de galería, pero `GallerySectionComponent` actualmente solo muestra los primeros 6.

### Video

Encabezado:

- Kicker: `Video`
- Título: `Nuestros trabajos en video`

Videos visibles:

- `Highlights de boda`
  `Edición emocional con ritmo cinematográfico para revivir los momentos más importantes del día.`
  Metadatos: `Wedding film · 4 - 6 min`

- `Eventos y shows`
  `Piezas ágiles para celebraciones, presentaciones y contenido de alto impacto para redes.`
  Metadatos: `Event recap · 1 - 2 min`

- `Teasers verticales`
  `Versiones rápidas, modernas y pensadas para captar atención en redes sociales.`
  Metadatos: `Social teaser · 30 - 45 s`

### Contacto

Bloque principal:

- Eyebrow: `CTA final`
- Título: `Haz que tu evento tenga una imagen audiovisual a la altura de lo que representa.`
- Lead:
  `Si quieres llevar tu boda, tus 15 años, tu grado o tu sesión preboda a un nivel más cinematográfico, hablemos por WhatsApp y te compartimos la información completa.`
- CTA principal: `Solicitar información por WhatsApp`

Panel secundario:

- Texto:
  `Cuéntanos tu evento, tu ciudad y la fecha aproximada. Te responderemos con una propuesta orientada a tu tipo de celebración y al estilo visual que quieres proyectar.`

Links visibles:

- `WhatsApp`
  `Consulta disponibilidad, inversión y tiempos de entrega.`

- `Instagram`
  `Explora historias recientes, reels y dirección visual.`

- `YouTube`
  `Mira films completos, teasers y piezas audiovisuales.`

## Página `/portfolio/bodas`

Renderiza:

1. `WeddingPackagesSectionComponent`
2. `ContactSectionComponent`

### Encabezado principal

- Kicker: `Paquetes de boda`
- Título: `Paquetes principales de boda`

### Bloque `Foto + video`

Subtítulo actual:

- `Foto + video`
- Título repetido del bloque: `Paquetes principales de boda`

Planes visibles:

- `PLAN SENCILLA`
  Precio: `320 USD`
  Lead base de detalle:
  `Cobertura foto + video pensada para parejas que quieren una propuesta clara, sensible y completa para registrar su boda sin perder calidad.`

- `PLAN COMPLETA`
  Precios: `680 USD` y `1'250.000 COP`
  Lead base de detalle:
  `Una cobertura más robusta para parejas que quieren una historia mejor construida, más entregables y una presencia audiovisual más completa.`

- `PLAN PREMIUM`
  Precios: `1'750.000 COP` y `2'800.000 COP`
  Lead base de detalle:
  `La propuesta más alta de boda foto + video, pensada para una cobertura editorial, completa y con producción reforzada.`

CTA de cada tarjeta: `Ver detalle`

### Bloque `Solo fotografía`

Subtítulo actual:

- `Solo fotografía`
- Título del bloque: `Paquetes solo fotos`

Planes visibles:

- `PLAN SENCILLA`
  Precios: `170 USD` y `700.000 COP`

- `PLAN COMPLETA`
  Precios: `590 USD` y `1'250.000 COP`

- `PLAN PREMIUM`
  Precio: `2'400.000 COP`

CTA de cada tarjeta: `Ver detalle`

### Notas visibles

- `"Esta lista de paquetes y precios es completamente ajustable al presupuesto del cliente."`
- `"Nuestro objetivo principal es ofrecer un servicio de calidad y al alcance de todos."`
- `"Para eventos fuera de Medellín, el cliente asume transporte, alimentación y hospedaje."`

## Página `/portfolio/quinces`

Renderiza:

1. `QuincePackagesSectionComponent`
2. `ContactSectionComponent`

### Encabezado principal

- Kicker: `Quinceañeros`
- Título: `PAQUETES DE QUINCEAÑEROS`

### Planes visibles

- `PLAN SENCILLA`
  Precios: `620.000 COP (solo fotos)` y `1'250.000 COP (foto + video)`

- `PLAN COMPLETA`
  Precio: `2'800.000 COP`

- `PLAN PREMIUM`
  Sin precio visible en la tarjeta actual

CTA de cada tarjeta: `Ver detalle`

### Adicionales visibles

- `Fotobook` — `desde 250.000`
- `Video tráiler` — `desde 150.000`
- `Reel redes` — `desde 150.000`
- `Foto en madera` — `desde 120.000`

### Notas visibles

- `Precios ajustables`
- `Condiciones Medellín`

## Página `/portfolio/grados`

Renderiza:

1. `GroupGraduationPackagesSectionComponent`
2. `ContactSectionComponent`

### Encabezado principal

- Kicker: `Paquetes de grados`
- Título: `PAQUETES GRUPALES DE GRADUACIÓN`

### Tarjeta principal

- Tag: `Paquete`
- Título: `PAQUETE 1 – RECUERDO ESENCIAL`
- Precio: `60.000 COP`
- Lead base de detalle:
  `Una propuesta ágil para promociones y ceremonias grupales que necesitan cobertura limpia, retratos claros y una entrega fácil de compartir.`
- Incluye:
  - `Todas las fotos digitales`
  - `12 fotografías editadas en JPG`
- CTA: `Ver detalle`

### Fotos sugeridas a tomar

Encabezado:

- `Fotos sugeridas a tomar:`

Items visibles:

- `Imposición de bata`
- `Foto individual al ser llamado`
- `Foto familiar`
- `Foto con padre / madre o acudiente`
- `Foto grupal de curso`
- `Foto personalizada (como la deseen)`
- `Foto con amigos`
- `Foto con directivos docentes`
- `Foto de detalles de la ceremonia`
- `+3 fotos aleatorias`

## Página `/portfolio/preboda`

Renderiza:

1. `PreweddingPackagesSectionComponent`
2. `ContactSectionComponent`

### Encabezado principal

- Kicker: `Preboda`
- Título: `PAQUETES DE PREBODA 2025`
- Lead:
  `Una propuesta visual romántica para parejas que quieren una sesión con sensibilidad, dirección estética y una memoria fotográfica con intención.`

### Planes visibles

- `PLAN SENCILLA`
  Precio: `280.000`

- `PLAN COMPLETA`
  Precio: `400.000`

- `PLAN ESPECIAL`
  Precio: `470.000`

- `PLAN PREMIUM`
  Precio: `700.000`

CTA de cada tarjeta: `Ver detalle`

## Página detalle compartida `/portfolio/:categoria/:package`

Todas las rutas de detalle usan el mismo componente:

- `PortfolioPackageDetailPageComponent`

### Textos fijos visibles en la vista detalle

En el hero:

- Link superior: `Volver a {{ categoría }}`
- CTA 1: `Solicitud personalizada`
- CTA 2: `Solicitar por WhatsApp`

Bloque de precio:

- Etiqueta: `Costo del servicio`

Bloque de estimado:

- Etiqueta: `Estimado con adicionales`

Bloque de visuales:

- Kicker: `Visual guía`

Estado no encontrado:

- Kicker: `Paquete no encontrado`
- Título: `Esta página no existe o cambió de ruta.`
- CTA: `Volver al portafolio`

### Textos fijos del modal de solicitud

Encabezado del modal:

- Kicker: `Solicitud personalizada`
- Botón: `Cerrar`

Spotlight de precio:

- Etiqueta: `Costo base visible`

Campos del formulario:

- `Nombre`
- `Teléfono`
- `Ciudad`
- `Fecha estimada`
- `Lugar o locación`
- `Cantidad de invitados`
- `Notas adicionales`

Bloques del formulario:

- `Modalidad de solicitud`
- `Base de inversión`
- `Servicios incluidos`
- `Servicios adicionales`
- `Adicionales disponibles`
- `Complementos opcionales`
- `Fotos a priorizar`

Opciones de modalidad:

- `Paquete base`
- `Cotización personalizada`

Resumen lateral:

- `Resumen listo para WhatsApp`
- `Paquete base`
- `Adicionales`
- `Total estimado`

Acciones finales:

- `Explorar más paquetes`
- `Enviar solicitud por WhatsApp`

### Cómo varía el contenido del detalle

El detalle cambia según `category` y `slug`, y se alimenta desde `portfolioPackageDetails` en `portfolio.data.ts`.

Cada item de detalle define:

- `title`
- `eyebrow`
- `lead`
- `image`
- `priceLines`
- `baseQuoteOptions`
- `sections`
- `requestOptionGroups`
- `notes`
- `visualsTitle`
- `visuals`
- `whatsappHref`

## Implementación técnica

### 1. Arquitectura Angular

El portfolio está construido con componentes standalone.

Piezas principales:

- `PortfolioPageComponent`
- `PortfolioShellComponent`
- Secciones standalone para cada bloque visual
- Páginas standalone para categorías
- Un único componente detalle reutilizado para todos los paquetes

### 2. Enrutamiento

Las rutas viven en `src/app/app.routes.ts`.

Patrón actual:

- Landing general en `/portfolio`
- Categorías en `/portfolio/bodas`, `/portfolio/quinces`, `/portfolio/grados`, `/portfolio/preboda`
- Detalle compartido con `data.category` y parámetro `:package`

### 3. Fuente de contenido

La mayor parte del contenido del portfolio vive en `src/app/features/portfolio/portfolio.data.ts`.

Ahí se centralizan:

- navegación del shell
- textos del hero
- pilares de marca
- servicios
- paquetes por categoría
- notas de paquetes
- galería
- videos
- links de contacto
- datos de detalle por paquete
- opciones del modal de cotización

Esto significa que el portfolio es principalmente data-driven.

### 4. Composición de la landing principal

`PortfolioPageComponent` arma la landing usando:

- `HeroSectionComponent`
- `AboutBrandSectionComponent`
- `ServicesSectionComponent`
- `GallerySectionComponent`
- `VideoSectionComponent`
- `ContactSectionComponent`

Además configura SEO básico con `Title` y `Meta`.

### 5. Composición de las páginas por categoría

Cada categoría usa `PortfolioShellComponent` y luego inserta su sección principal más contacto.

Ejemplos:

- bodas: shell + wedding packages + contacto
- quinces: shell + quince packages + contacto
- grados: shell + group graduation packages + contacto
- preboda: shell + prewedding packages + contacto

### 6. Shell compartido

`PortfolioShellComponent` se encarga de:

- header global
- navegación
- CTA superior configurable
- footer configurable
- botón flotante de WhatsApp
- contenedor visual del portfolio

### 7. Vista detalle compartida

`PortfolioPackageDetailPageComponent` resuelve el paquete con:

- `ActivatedRoute`
- `route.data.category`
- `route.paramMap.package`
- `getPortfolioPackageDetail(...)`

Internamente usa señales y `computed` para:

- paquete actual
- modo de solicitud (`base` o `custom`)
- selección de servicios
- base de inversión elegida
- total estimado
- mensaje final de WhatsApp

También actualiza:

- `<title>`
- meta description

Y controla el modal con:

- apertura/cierre
- cierre con tecla Escape
- bloqueo de scroll global al abrir

### 8. Integraciones externas

- Galería:
  usa `PhotoSwipe` con tamaños cargados dinámicamente.

- Video:
  usa iframes de YouTube en dominio `youtube-nocookie.com`.

- Contacto y solicitudes:
  todo termina generando enlaces `wa.me` con texto precargado.

## Estructuras que existen pero no se renderizan hoy en la landing principal

En `portfolio.data.ts` todavía existen estructuras que no se usan en la landing `/portfolio` actual:

- `portfolioPackages`
- `portfolioPhotoPackages`
- `portfolioSuggestedShots`
- `portfolioWeddingPlans`
- `portfolioAdditionalServices`
- `portfolioProcess`
- `portfolioEventOptions`

Estas parecen corresponder a una etapa anterior o a bloques reutilizables que hoy no están montados en la landing principal.

## Resumen ejecutivo

Hoy el portfolio está implementado como un sistema modular y centralizado:

- una landing principal de marca
- páginas por categoría de servicio
- una vista detalle compartida por slug
- textos y paquetes definidos casi por completo desde `portfolio.data.ts`
- CTA final y flujo comercial orientado a WhatsApp

Si se quiere modificar copy, nombres, precios, notas o estructura de muchos paquetes, el punto principal a tocar es `src/app/features/portfolio/portfolio.data.ts`.
