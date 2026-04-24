# Portfolio TECNOJACK: plan para mover contenido a Firebase y gestionarlo con CRUD

## Objetivo

Este documento enumera todo el contenido del portfolio que hoy vive en frontend y que sí se puede mover a Firebase para gestionarlo desde un módulo admin.

La idea es separar:

- Contenido editable por admin.
- Estructura técnica que puede seguir viviendo en Angular.
- Relación recomendada entre Firestore, Firebase Storage y el módulo admin.

## Alcance real del portfolio actual

Hoy el portfolio está montado principalmente desde [src/app/features/portfolio/portfolio.data.ts](src/app/features/portfolio/portfolio.data.ts).

Esto significa que casi todo el contenido visible ya está modelado como data. Por eso es perfectamente viable migrarlo a Firebase.

Las rutas del portfolio están definidas en [src/app/app.routes.ts](src/app/app.routes.ts) y actualmente incluyen:

- `/portfolio`
- `/portfolio/videos`
- `/portfolio/bodas`
- `/portfolio/quinces`
- `/portfolio/grados`
- `/portfolio/preboda`
- `/portfolio/bodas/:package`
- `/portfolio/quinces/:package`
- `/portfolio/grados/:package`
- `/portfolio/preboda/:package`

Las rutas no hace falta guardarlas en Firebase como tal. Lo que sí debe ir al backend es el contenido que alimenta esas rutas.

## Qué sí conviene mover a Firebase

### 1. Configuración general del portfolio

Esto corresponde a datos globales de marca y navegación.

Campos candidatos:

- marca principal del portfolio
- subtítulo del shell
- texto del footer
- CTA principal del header
- teléfono base de WhatsApp
- mensaje por defecto de WhatsApp
- links sociales
- items de navegación del portfolio
- navegación de la landing

Actualmente esto sale de estructuras como:

- `socialLinks`
- `portfolioWhatsappHref`
- `portfolioNavItems`
- `portfolioLandingNavItems`
- `portfolioContactLinks`

Recomendación en Firestore:

- `siteSettings/portfolio`

Ejemplo de campos:

```json
{
  "brandName": "TECNOJACK",
  "shellSubtitle": "Audiovisual Studio",
  "footerText": "TECNOJACK Studio · fotografía y cine de bodas con dirección editorial.",
  "whatsapp": {
    "phone": "573145406467",
    "defaultMessage": "Hola TECNOJACK, quiero información para fotografía y video de boda."
  },
  "socialLinks": {
    "instagram": "https://www.instagram.com/tecnojack",
    "facebook": "https://www.facebook.com/tecnojack.pc",
    "tiktok": "https://www.tiktok.com/@tecnojackyt",
    "whatsapp": "https://wa.me/573145406467"
  },
  "headerCtaLabel": "WhatsApp"
}
```

CRUD recomendado en admin:

- editar branding global
- editar CTA principal
- editar enlaces sociales
- reordenar navegación
- activar/desactivar ítems de menú

### 2. Contenido de la landing principal

La landing renderiza estas secciones en [src/app/features/portfolio/portfolio-page.component.html](src/app/features/portfolio/portfolio-page.component.html):

- hero
- about brand
- professional profile
- services
- gallery
- video
- contact

Todo ese contenido puede gestionarse desde backend.

#### 2.1 Hero

Actualmente el contenido está repartido en estructuras como:

- `portfolioHeroStats`
- `portfolioHeroHighlights`

Y además hay copy fijo en los componentes de hero.

Conviene guardar en Firebase:

- eyebrow
- title
- lead
- imagen principal
- CTA 1
- CTA 2
- tarjeta lateral de disponibilidad
- stats
- highlights
- orden y activación de bloques

Recomendación en Firestore:

- `landingSections/hero`

Ejemplo:

```json
{
  "eyebrow": "TECNOJACK Studio",
  "title": "Capturamos momentos que se convierten en eternidad",
  "lead": "Fotografía y cine para bodas, eventos y marcas.",
  "backgroundImage": "gs://.../portfolio/hero/main.jpg",
  "primaryCta": {
    "label": "Ver servicios",
    "href": "#services"
  },
  "secondaryCta": {
    "label": "Ver portafolio",
    "href": "#gallery"
  },
  "availabilityCard": {
    "kicker": "Disponibilidad",
    "text": "Fechas limitadas por temporada. Agenda con anticipación.",
    "ctaLabel": "Cotizar por WhatsApp"
  },
  "stats": [
    { "value": "10+ años", "label": "Experiencia real en eventos", "order": 1 },
    { "value": "4K", "label": "Calidad cinematográfica", "order": 2 },
    { "value": "100%", "label": "Dirección artística", "order": 3 }
  ],
  "highlights": [
    { "text": "Estética cinematográfica.", "order": 1 },
    { "text": "Cobertura para eventos y marcas.", "order": 2 },
    { "text": "Dirección visual con intención.", "order": 3 }
  ]
}
```

#### 2.2 Sobre la marca

Actualmente viene de:

- `portfolioBrandPillars`

Y parte del copy está fijo en el componente.

Se puede mover a Firebase:

- eyebrow
- title
- lead
- pilares de marca

Recomendación:

- `landingSections/aboutBrand`

#### 2.3 Perfil profesional

Actualmente viene de:

- `portfolioProfessionalProfile`

Se puede gestionar desde backend:

- eyebrow
- title
- lead
- label lateral
- puntos de valor
- CTA

Recomendación:

- `landingSections/professionalProfile`

#### 2.4 Servicios

Actualmente viene de:

- `portfolioServices`

Esto claramente debe vivir en backend porque es contenido tipo catálogo.

Campos sugeridos:

- id
- slug
- title
- description
- image
- href
- ctaLabel
- points
- order
- active
- featured

Recomendación:

- colección `services`

#### 2.5 Galería

Actualmente viene de:

- `portfolioGalleryItems`

Esto es ideal para CRUD.

Campos sugeridos:

- id
- title
- category
- alt
- imageUrl
- variant
- order
- active
- tags opcionales

Recomendación:

- colección `galleryItems`

Además las imágenes deben vivir en Firebase Storage.

#### 2.6 Video landing

Actualmente existe una sección simple de video basada en:

- `portfolioVideoItems`

Esto también puede pasar a backend.

Campos sugeridos:

- title
- description
- duration
- youtubeId
- format
- order
- active

Recomendación:

- colección `landingVideos`

#### 2.7 Contacto

Actualmente se alimenta con:

- `portfolioContactLinks`
- `socialLinks`

Además hay textos fijos en la sección de contacto.

Conviene mover a Firebase:

- eyebrow
- title
- lead
- texto secundario del panel
- listado de links sociales
- orden de esos links
- si un link se muestra o no

Recomendación:

- `landingSections/contact`

## Qué conviene mover para las páginas por categoría

### 3. Configuración de páginas de servicio

Actualmente esto vive en:

- `portfolioServicePageConfigs`

Ese bloque contiene por categoría:

- label
- shellSubtitle
- hero
- packageEyebrow
- packageTitle
- packageLead
- storiesTitle
- storiesLead
- stories

Esto debe ir a backend porque es exactamente contenido editorial por categoría.

Recomendación:

- colección `servicePages`
- documento por categoría: `bodas`, `quinces`, `grados`, `preboda`

Ejemplo:

```json
{
  "id": "bodas",
  "label": "Bodas",
  "shellSubtitle": "Bodas",
  "hero": {
    "eyebrow": "Servicio premium",
    "title": "Bodas con dirección cinematográfica",
    "description": "Historias reales contadas con estética, emoción y precisión visual.",
    "backgroundImage": "gs://.../portfolio/categories/bodas/hero.jpg",
    "highlights": ["Foto + video", "Color cinematográfico", "Dirección artística"],
    "whatsappMessage": "Hola TECNOJACK, quiero información sobre cobertura de boda."
  },
  "packageEyebrow": "Presentación de paquetes",
  "packageTitle": "Propuestas pensadas para cubrir la boda completa con claridad y lujo visual.",
  "packageLead": "Cada plan muestra solo lo más vendedor.",
  "storiesTitle": "Historias reales",
  "storiesLead": "Eventos que ya hemos transformado en piezas visuales.",
  "active": true
}
```

### 4. Historias o galerías de clientes por categoría

Hoy vienen dentro de `portfolioServicePageConfigs`, pero para admin es mejor tratarlas como entidad separada.

Cada historia tiene:

- clientName
- location
- title
- subtitle
- images

Recomendación:

- subcolección `servicePages/{category}/stories`

Campos adicionales recomendados:

- coverImage
- order
- active
- eventDate opcional
- tags

Las imágenes deben vivir en Firebase Storage.

## Qué conviene mover para paquetes y detalle de servicios

### 5. Catálogo principal de paquetes

La entidad más importante para CRUD es:

- `portfolioPackageDetails`

Esto ya contiene casi todo lo que necesita un backend administrable.

Cada paquete hoy tiene:

- category
- slug
- categoryLabel
- categoryHref
- title
- packageTypeLabel
- packageGroup
- eyebrow
- lead
- image
- priceLines
- baseQuoteOptions
- featured
- sortOrder
- accent
- sections
- requestOptionGroups
- notes
- visualsTitle
- visuals
- whatsappHref

Esto conviene pasarlo a una colección de Firestore.

Recomendación:

- colección `packages`

Campos clave sugeridos:

- `id`
- `category`
- `slug`
- `title`
- `eyebrow`
- `lead`
- `packageTypeLabel`
- `packageGroup`
- `coverImage`
- `priceLines`
- `baseQuoteOptions`
- `featured`
- `sortOrder`
- `accent`
- `notes`
- `visualsTitle`
- `active`
- `published`
- `seoTitle`
- `seoDescription`
- `createdAt`
- `updatedAt`

Y como arreglos o subcolecciones:

- `sections`
- `requestOptionGroups`
- `visuals`

Si quieres un admin más simple, estos tres pueden ir embebidos dentro del documento del paquete.

Si quieres un admin más escalable, puedes usar:

- `packages/{packageId}/sections`
- `packages/{packageId}/requestOptionGroups`
- `packages/{packageId}/visuals`

### 6. Opciones de cotización y personalización

Hoy los modales de solicitud dependen de:

- `baseQuoteOptions`
- `requestOptionGroups`
- `PortfolioRequestOption`

Esto también debe ir a backend si el admin va a cambiar:

- precios base
- adicionales
- etiquetas de precio
- opciones incluidas por defecto
- grupos de servicios

Recomendación:

- dejarlo embebido dentro de cada documento de `packages`

Ejemplo:

```json
{
  "slug": "premium-foto-video",
  "category": "bodas",
  "title": "Plan Premium",
  "baseQuoteOptions": [
    {
      "id": "premium-foto-video-cop",
      "label": "2'800.000 COP",
      "amountCop": 2800000,
      "selectedByDefault": true
    }
  ],
  "requestOptionGroups": [
    {
      "title": "Servicios incluidos",
      "description": "Esta modalidad conserva el contenido completo del paquete base seleccionado.",
      "selectable": false,
      "options": [
        {
          "id": "premium-foto-video-service-1",
          "label": "Cubrimiento audiovisual completo de todo el evento",
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
          "id": "premium-foto-video-addon-1",
          "label": "Fotobook de lujo",
          "priceLabel": "250.000 COP",
          "priceAmountCop": 250000,
          "selectedByDefault": false
        }
      ]
    }
  ]
}
```

### 7. Visuales y material de apoyo por paquete

Algunos paquetes usan:

- `visualsTitle`
- `visuals`

Esto también puede ser CRUD desde admin.

Útil para:

- subir fotos ejemplo por paquete
- mostrar moodboards
- cambiar títulos de visuales

Recomendación:

- embebido en `packages` o subcolección `packages/{id}/visuals`

## Qué conviene mover para la página de videos

### 8. Categorías de videos y playlists

La página `/portfolio/videos` depende de:

- `portfolioVideoCategories`

Cada categoría tiene:

- key
- title
- playlistId
- playlistUrl
- summary
- videos

Esto es claramente administrable desde backend.

Recomendación:

- colección `videoCategories`

Con campos:

- key
- title
- playlistId
- playlistUrl
- summary
- coverImage opcional
- order
- active

### 9. Videos dentro de cada categoría

Cada video tiene:

- title
- videoId
- thumbnail

Conviene gestionarlo como subcolección:

- `videoCategories/{categoryId}/videos`

Campos sugeridos:

- title
- videoId
- thumbnail
- order
- active
- featured

Si después quieres separar los destacados del hero de videos, agrega:

- `isFeatured`

## Qué más se puede mover aunque hoy no sea prioritario

En [src/app/features/portfolio/portfolio.data.ts](src/app/features/portfolio/portfolio.data.ts) también existen estructuras que pueden pasar a backend si planeas reutilizarlas o exponerlas en admin:

- `portfolioPackages`
- `portfolioPhotoPackages`
- `portfolioSuggestedShots`
- `portfolioWeddingPlans`
- `portfolioAdditionalServices`
- `groupGraduationPackage`
- `groupGraduationSuggestedShots`
- `weddingMainPlans`
- `weddingPhotoOnlyPlans`
- `quinceMainPlans`
- `quinceAdditionalItems`
- `preweddingPlans`
- `portfolioProcess`
- `portfolioEventOptions`

Mi recomendación técnica es esta:

- Si esos datasets ya no se renderizan directamente, no los migres primero.
- Migra primero solo lo que hoy sí pinta UI.
- Luego, si el admin necesita editar también contenido legacy o plantillas internas, se agregan en una segunda fase.

## Qué no hace falta guardar en Firebase

Estas piezas pueden quedarse en frontend porque son estructura o lógica derivada:

- `buildPortfolioWhatsappHref()`
- `buildPortfolioPackageHref()`
- `getPortfolioPackageDetail()`
- `getPortfolioPackageDetailsByCategory()`
- `getPortfolioServicePageConfig()`
- componentes Angular standalone
- layouts y estilos SCSS
- reglas de ordenamiento que pueden derivarse desde `sortOrder`

Tampoco hace falta guardar en Firebase:

- rutas Angular como código
- clases CSS
- animaciones
- iconos importados desde librería

## Propuesta recomendada de Firestore

Una estructura clara para empezar sería:

```text
siteSettings/
  portfolio

landingSections/
  hero
  aboutBrand
  professionalProfile
  contact

services/
  {serviceId}

galleryItems/
  {galleryItemId}

landingVideos/
  {landingVideoId}

servicePages/
  bodas
  quinces
  grados
  preboda

servicePages/{categoryId}/stories/
  {storyId}

packages/
  {packageId}

videoCategories/
  {categoryId}

videoCategories/{categoryId}/videos/
  {videoId}
```

## Propuesta recomendada de Firebase Storage

Para medios visuales:

```text
portfolio/
  hero/
  services/
  gallery/
  categories/
    bodas/
    quinces/
    grados/
    preboda/
  packages/
    bodas/
    quinces/
    grados/
    preboda/
  stories/
    bodas/
    quinces/
    grados/
    preboda/
  videos/
    thumbnails/
```

Conviene guardar en Firestore solo URLs y metadatos, no el archivo binario.

## Qué CRUD debería tener el módulo admin

### Módulo 1. Ajustes globales

- editar branding del portfolio
- editar CTA global
- editar WhatsApp principal
- editar links sociales
- editar footer
- editar navegación

### Módulo 2. Landing

- editar hero
- editar about brand
- editar perfil profesional
- CRUD de servicios
- CRUD de galería
- CRUD de videos de landing
- editar sección de contacto

### Módulo 3. Páginas por categoría

- editar hero por categoría
- editar textos de paquetes por categoría
- CRUD de historias de clientes

### Módulo 4. Paquetes

- CRUD de paquetes
- cambiar categoría
- cambiar slug
- editar portada
- editar precios
- editar badges
- editar secciones
- editar adicionales
- editar base quote options
- editar visuales
- ordenar paquetes
- activar/desactivar paquetes

### Módulo 5. Videos

- CRUD de categorías de video
- CRUD de videos por categoría
- ordenar videos
- marcar destacados

### Módulo 6. Medios

- subir imágenes
- reemplazar imágenes
- borrar medios no usados
- asociar medios a servicios, galería, historias y paquetes

## Campos transversales recomendados en casi todas las colecciones

Para que el admin sea serio y mantenible, casi todas las entidades deberían tener:

- `id`
- `slug` cuando aplique
- `title`
- `order`
- `active`
- `published`
- `createdAt`
- `updatedAt`
- `createdBy`
- `updatedBy`

Y si el módulo admin va a tener vista previa o borrado seguro:

- `deletedAt`
- `archived`

## Recomendación de implementación por fases

### Fase 1

Mover primero a Firebase:

- configuración global
- hero
- servicios
- galería
- contacto
- páginas de categoría
- paquetes
- historias de clientes
- categorías y videos del módulo videos

### Fase 2

Mover después:

- contenido legacy no renderizado hoy
- métricas o dashboards
- formularios de leads
- SEO editable por página

### Fase 3

Agregar en admin:

- roles y permisos
- historial de cambios
- previsualización antes de publicar
- control de versiones

## Conclusión

Sí, el portfolio actual de TECNOJACK se puede llevar casi completo a Firebase.

Lo más importante es esto:

- La estructura visual puede quedarse en Angular.
- El contenido editorial, comercial, multimedia y de catálogo debe pasar a Firestore.
- Las imágenes y thumbnails deben ir a Firebase Storage.
- El módulo admin debería centrarse en settings, landing, categorías, paquetes, historias, galería y videos.

Si se implementa así, podrás hacer CRUD prácticamente de todo el portfolio sin volver a tocar el archivo [src/app/features/portfolio/portfolio.data.ts](src/app/features/portfolio/portfolio.data.ts).
