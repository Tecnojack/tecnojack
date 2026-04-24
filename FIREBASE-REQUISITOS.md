# Firebase para TECNOJACK

## Objetivo

Este documento define todo lo que se debe crear en Firebase para que la app pueda operar sin depender de:

- localStorage del admin mock
- assets/data/weddings.json
- assets/data/guests/*.json
- contenido estatico de portfolio.data.ts

La meta es cubrir todas las vistas y todas las funciones actuales:

- sitio publico Brand
- portfolio landing
- paginas de categoria: bodas, quinces, grados, preboda
- detalle de paquetes
- modulo de videos
- experiencia de boda dinamica por URL
- admin CMS completo
- carga de imagenes y media real

Importante: el admin actual ya no es un mock simple de localStorage plano. Hoy existe una capa mock con repositorio, validaciones de negocio, soft delete, status editorial y normalizacion de media/categorias. Cuando se conecte Firebase, la idea correcta es reemplazar la persistencia y la fuente de verdad, no redisenar otra vez el modelo ni romper la UI admin.

## Productos Firebase necesarios

Crear y configurar estos productos:

1. Firebase Authentication
2. Cloud Firestore
3. Firebase Storage
4. Firebase Hosting
5. Cloud Functions for Firebase
6. Firebase App Check

Recomendado desde el inicio:

1. Firebase Analytics solo si se va a medir trafico publico
2. Firebase Remote Config solo si se quieren flags visuales o campañas temporales
3. Firebase Emulator Suite para desarrollo local

## Que consume hoy la app

### Admin CMS mock

Hoy el admin trabaja sobre un store mock con estas colecciones:

- generalSettings
- categories
- pages
- pageSnapshots
- sections
- sectionsData
- services
- additionalServices
- packages
- packageFeatures
- galleryItems
- stories
- videoCategories
- videos
- media

### Boda dinamica

Hoy la experiencia de boda lee:

- weddings.json para la boda
- guests/*.json para invitados

### Portfolio publico

Hoy todavia hay contenido duro en portfolio.data.ts. Para que todas las vistas sean administrables, ese contenido debe migrarse a Firestore usando las colecciones CMS existentes y algunos campos avanzados en data y advancedData.

## Arquitectura recomendada

Usar Firestore con colecciones top-level para CMS y una zona separada para bodas:

- generalSettings
- categories
- pages
- pageSnapshots
- sections
- sectionsData
- services
- additionalServices
- packages
- packageFeatures
- galleryItems
- stories
- videoCategories
- videos
- media
- weddings
- adminUsers
- auditLogs

Subcolecciones recomendadas:

- weddings/{weddingId}/guests
- weddings/{weddingId}/guestGroups
- weddings/{weddingId}/rsvps

## Contrato transversal del CMS

Antes de definir cada coleccion, Firebase debe respetar el contrato base que hoy ya usa el CMS mock:

- id: string
- name: string
- active: boolean
- status: draft, published, archived
- publishedAt: timestamp o null
- deletedAt: timestamp o null
- order: number
- createdAt: timestamp
- updatedAt: timestamp

Notas de modelado:

- active ya no representa por si solo el ciclo editorial. El control principal de publicacion es status.
- deletedAt representa soft delete. No conviene borrar fisicamente en primera instancia.
- publishedAt debe poblarse cuando status pase a published.
- todas las lecturas publicas deben filtrar deletedAt == null y status == published.
- media y categorias ya estan normalizadas. La referencia preferida es mediaId, mediaIds y categoryIds.

## Firestore: colecciones obligatorias

## 1. generalSettings

Proposito: configuracion global del sitio, SEO base, footer, redes y enlaces globales.

Documento recomendado: uno solo, por ejemplo generalSettings/main

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre interno |
| siteName | string | si | branding global |
| siteTagline | string | no | tagline global |
| defaultTitle | string | no | SEO por defecto |
| defaultDescription | string | no | SEO por defecto |
| footerText | string | no | footer |
| whatsappPhone | string | no | contacto |
| whatsappMessage | string | no | CTA global |
| instagram | string | no | contacto |
| facebook | string | no | contacto |
| tiktok | string | no | contacto |
| youtube | string | no | contacto |
| featureFlags | map | si | flags globales como enableVideos, enableStories, enableRSVP |
| active | boolean | si | control administrativo |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | compatibilidad con el admin |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 2. categories

Proposito: taxonomias normalizadas para servicios, paquetes y videos.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre visible |
| slug | string | si | slug de la categoria |
| type | string | si | service, package, video |
| active | boolean | si | control administrativo |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

Consultas previstas:

- por type + status + order
- por slug + type

## 3. pages

Proposito: rutas y tipos de pagina.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre visible/admin |
| slug | string | si | identificador SEO |
| routePath | string | si | ruta publica o interna |
| pageType | string | si | brand, landing, service-category, service-detail, video, wedding, admin, custom |
| description | string | no | resumen |
| metaTitle | string | no | SEO |
| metaDescription | string | no | SEO |
| sectionIds | string[] | si | orden logico de secciones |
| active | boolean | si | publicar/ocultar |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden administrativo |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

Consultas previstas:

- por slug
- por routePath
- por status + order
- por pageType + status + order

## 4. pageSnapshots

Proposito: snapshots publicados o derivados por pagina para despliegue, cache o historico editorial.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre interno |
| slug | string | si | slug de pagina relacionado |
| pageId | string | si | referencia a pages |
| data | map | si | snapshot materializado |
| builtAt | timestamp | no | fecha de construccion |
| active | boolean | si | control administrativo |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 5. sections

Proposito: bloques ordenables por pagina.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre interno |
| pageId | string | si | pagina dueña |
| type | string | si | hero, about, profile, services, packages, gallery, stories, videos, contact, invitation, passport, custom |
| enabled | boolean | si | mostrar/ocultar |
| sectionDataId | string | no | contenido asociado |
| entityCollection | string | no | coleccion vinculada |
| entityIds | string[] | si | entidades vinculadas |
| active | boolean | si | control admin |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

Consultas previstas:

- por pageId + status + order
- por pageId + type

## 6. sectionsData

Proposito: copy y configuracion avanzada de cada bloque.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre interno |
| pageId | string | no | pagina relacionada |
| sectionType | string | si | tipo de seccion |
| title | string | no | copy |
| subtitle | string | no | copy |
| body | string | no | copy |
| mediaIds | string[] | no | media vinculada |
| data | map | si | configuracion avanzada por bloque |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

data debe usarse para cubrir contenido que hoy esta duro en portfolio.data.ts, por ejemplo:

- stats del hero
- nav items del portfolio
- brand pillars
- professional profile
- contact cards
- textos largos de introduccion por categoria
- CTA labels y CTA href por seccion
- feature flags visuales o comportamiento de widgets por bloque

## 7. services

Proposito: servicios base por categoria.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre |
| slug | string | si | slug |
| description | string | no | resumen |
| mediaId | string | no | referencia normalizada a media |
| href | string | no | URL interna |
| ctaLabel | string | no | boton |
| points | string[] | no | bullets |
| pageIds | string[] | si | categorias/paginas relacionadas |
| sectionIds | string[] | si | bloques donde aparece |
| categoryIds | string[] | si | categorias normalizadas |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

Consultas previstas:

- array-contains pageIds
- array-contains sectionIds
- array-contains categoryIds
- status + order

## 8. additionalServices

Proposito: upsells y complementos.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre |
| priceLabel | string | no | texto comercial |
| basePrice | number | no | valor numerico |
| description | string | no | copy |
| serviceIds | string[] | si | servicios base asociados |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 9. packageFeatures

Proposito: caracteristicas reutilizables de paquetes.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre |
| description | string | no | detalle |
| categoryIds | string[] | si | categorias normalizadas de paquetes |
| value | string | no | valor interno o display |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 10. packages

Proposito: paquetes comerciales y detalle avanzado.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre |
| slug | string | si | slug |
| categoryIds | string[] | si | categorias normalizadas |
| packageTypeLabel | string | no | tipo visible |
| summary | string | no | resumen |
| mediaId | string | no | media portada |
| priceLabel | string | no | texto comercial |
| basePrice | number | no | valor numerico |
| priceLines | string[] | no | lineas de precio |
| featured | boolean | si | destacado |
| serviceIds | string[] | si | servicios base |
| additionalServiceIds | string[] | si | upsells |
| featureIds | string[] | si | features |
| pageIds | string[] | si | paginas donde aparece |
| sectionIds | string[] | si | bloques donde aparece |
| notes | string[] | no | notas comerciales |
| advancedData | map | si | detalle completo del paquete |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

advancedData debe cubrir lo que hoy existe en portfolio.data.ts para la vista de detalle:

- packageGroup
- eyebrow
- lead
- accent
- baseQuoteOptions
- sections
- requestOptionGroups
- visualsTitle
- visuals
- whatsappHref o whatsappMessage

## 11. galleryItems

Proposito: imagenes del portfolio.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre interno |
| title | string | si | titulo visible |
| categoryIds | string[] | si | categorias normalizadas |
| alt | string | no | accesibilidad |
| mediaId | string | no | media |
| variant | string | no | wide, tall, default |
| tags | string[] | no | filtros futuros |
| pageIds | string[] | si | paginas |
| sectionIds | string[] | si | secciones |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 12. stories

Proposito: historias o casos por categoria.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | titulo interno |
| categoryIds | string[] | si | categorias normalizadas |
| clientName | string | no | cliente |
| location | string | no | ubicacion |
| subtitle | string | no | copy |
| mediaId | string | no | portada principal |
| mediaIds | string[] | no | media |
| pageIds | string[] | si | paginas |
| sectionIds | string[] | si | secciones |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 13. videoCategories

Proposito: categorias y playlists de video.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre visible |
| key | string | si | key unica |
| summary | string | no | copy |
| playlistId | string | no | playlist de YouTube |
| playlistUrl | string | no | URL externa |
| mediaId | string | no | portada normalizada |
| videoIds | string[] | si | videos asociados |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 14. videos

Proposito: videos individuales.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre |
| videoId | string | si | id de YouTube |
| description | string | no | copy |
| duration | string | no | duracion |
| format | string | no | formato |
| mediaId | string | no | thumbnail normalizado |
| categoryIds | string[] | si | categorias |
| featuredOnLanding | boolean | si | landing |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 15. media

Proposito: metadata de Firebase Storage.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| name | string | si | nombre |
| mediaType | string | si | image, video, document, other |
| url | string | si | downloadURL |
| alt | string | no | accesibilidad |
| folder | string | si | carpeta logica |
| mimeType | string | no | tipo MIME |
| sizeLabel | string | no | tamaño visible |
| isMockUpload | boolean | si | debe ser false en prod |
| active | boolean | si | estado |
| status | string | si | draft, published, archived |
| publishedAt | timestamp | no | ciclo editorial |
| deletedAt | timestamp | no | soft delete |
| order | number | si | orden |
| storagePath | string | si | path real en Storage |
| width | number | no | imagen |
| height | number | no | imagen |
| createdBy | string | no | uid admin |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## Firestore: colecciones nuevas para boda dinamica

## 16. weddings

Proposito: fuente de verdad de cada boda dinamica.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| slug | string | si | URL principal |
| theme | string | si | tema visual |
| names | string | si | nombres de la pareja |
| date | string | si | fecha visible |
| rsvpUrl | string | no | enlace de confirmacion |
| rsvpDeadline | string | no | fecha limite |
| location | map | si | name, mapsUrl |
| dressCode | map | si | description, womenNote, reservedColors[] |
| pinterestUrl | string | no | moodboard |
| giftNote | string | no | nota de regalos |
| exclusiveNote | string | no | nota privada |
| coverMediaId | string | no | portada si luego se diseña |
| invitationData | map | no | contenido adicional para la vista invitation |
| passportData | map | no | contenido adicional para la vista passport |
| active | boolean | si | estado |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

Consulta prevista:

- por slug unico

## 17. weddings/{weddingId}/guests

Proposito: invitados individuales resolubles por slug.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| slug | string | si | identificador en URL |
| name | string | si | nombre visible |
| allowedGuests | number | si | cupos permitidos |
| customMessage | string | no | mensaje personalizado |
| childrenCount | number | no | hijos |
| groupId | string | no | referencia logica al grupo |
| active | boolean | si | estado |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 18. weddings/{weddingId}/guestGroups

Proposito: preservar la estructura original tipo grupo/familia/amigos cuando sea necesaria.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| externalId | number | no | id_grupo heredado |
| side | string | no | Novia o Novio |
| type | string | no | Familia o Amigos |
| guestSlugs | string[] | si | miembros del grupo |
| adults | number | no | total adultos |
| children | number | no | total niños |
| total | number | no | total invitados |
| active | boolean | si | estado |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 19. weddings/{weddingId}/rsvps

Proposito: confirmaciones reales, si se quiere cerrar el ciclo en Firebase y no depender de WhatsApp o Forms externos.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| guestSlug | string | si | invitado |
| primaryGuestName | string | si | respaldo |
| confirmedGuests | number | si | cantidad confirmada |
| attending | boolean | si | confirma o rechaza |
| note | string | no | comentario |
| phone | string | no | contacto |
| submittedAt | timestamp | si | trazabilidad |
| source | string | no | web, admin, import |

## 20. adminUsers

Proposito: perfiles de administracion.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| uid | string | si | auth uid |
| email | string | si | login |
| displayName | string | no | perfil |
| role | string | si | superadmin, editor, media-manager |
| active | boolean | si | acceso |
| lastLoginAt | timestamp | no | auditoria |
| createdAt | timestamp | si | auditoria |
| updatedAt | timestamp | si | auditoria |

## 21. auditLogs

Proposito: trazabilidad de cambios del admin.

Campos:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---:|---|
| actorUid | string | si | usuario |
| actorEmail | string | no | usuario |
| action | string | si | create, update, delete, publish |
| collection | string | si | coleccion afectada |
| documentId | string | si | documento |
| before | map | no | snapshot anterior |
| after | map | no | snapshot nuevo |
| createdAt | timestamp | si | auditoria |

## Storage: estructura recomendada

Crear estas carpetas logicas en Firebase Storage:

- brand/
- portfolio/services/
- portfolio/packages/
- portfolio/gallery/
- portfolio/stories/
- portfolio/videos/thumbnails/
- weddings/{weddingSlug}/covers/
- weddings/{weddingSlug}/gallery/
- weddings/{weddingSlug}/documents/
- uploads/tmp/
- audio/
- lottie/

Notas:

- Cada archivo subido debe crear o actualizar un documento en media.
- El campo media.folder debe reflejar esta ruta logica.
- El campo media.storagePath debe guardar el path real del bucket.

## Authentication

Se necesita auth para el admin. Recomendacion minima:

1. proveedor Email/Password
2. opcional Google Sign-In solo para administradores autorizados
3. custom claims por rol

Roles minimos:

- superadmin: control total
- editor: CRUD de contenido
- media-manager: manejo de Storage y media

## Reglas de seguridad recomendadas

## Firestore

Base recomendada:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return signedIn() && request.auth.token.admin == true;
    }

    function isEditor() {
      return signedIn() && (
        request.auth.token.admin == true ||
        request.auth.token.role in ['superadmin', 'editor', 'media-manager']
      );
    }

    match /generalSettings/{docId} {
      allow read: if true;
      allow write: if isEditor();
    }

    match /{collection}/{docId} {
      allow read: if collection in [
        'pages',
        'categories',
        'pageSnapshots',
        'sections',
        'sectionsData',
        'services',
        'additionalServices',
        'packages',
        'packageFeatures',
        'galleryItems',
        'stories',
        'videoCategories',
        'videos',
        'media'
      ];
      allow write: if isEditor();
    }

    match /weddings/{weddingId} {
      allow read: if resource.data.active == true;
      allow write: if isEditor();

      match /guests/{guestId} {
        allow read: if true;
        allow write: if isEditor();
      }

      match /guestGroups/{groupId} {
        allow read: if isEditor();
        allow write: if isEditor();
      }

      match /rsvps/{rsvpId} {
        allow create: if true;
        allow read, update, delete: if isEditor();
      }
    }

    match /adminUsers/{uid} {
      allow read: if isEditor();
      allow write: if isAdmin();
    }

    match /auditLogs/{logId} {
      allow read: if isAdmin();
      allow write: if false;
    }
  }
}
```

Nota: en el modelo actual ya existe status y deletedAt. Para publico, la recomendacion real es endurecer reglas o pasar por una capa server-side para exponer solo documentos con status == 'published' y deletedAt == null.

## Storage

Base recomendada:

```txt
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function signedIn() {
      return request.auth != null;
    }

    function isEditor() {
      return signedIn() && (
        request.auth.token.admin == true ||
        request.auth.token.role in ['superadmin', 'editor', 'media-manager']
      );
    }

    match /portfolio/{allPaths=**} {
      allow read: if true;
      allow write: if isEditor();
    }

    match /brand/{allPaths=**} {
      allow read: if true;
      allow write: if isEditor();
    }

    match /weddings/{allPaths=**} {
      allow read: if true;
      allow write: if isEditor();
    }

    match /audio/{allPaths=**} {
      allow read: if true;
      allow write: if isEditor();
    }

    match /lottie/{allPaths=**} {
      allow read: if true;
      allow write: if isEditor();
    }

    match /uploads/{allPaths=**} {
      allow read: if isEditor();
      allow write: if isEditor();
    }
  }
}
```

## Indices de Firestore recomendados

Crear indices compuestos al menos para:

1. categories: type asc, status asc, order asc
2. pages: pageType asc, status asc, order asc
3. pageSnapshots: pageId asc, status asc, updatedAt desc
4. sections: pageId asc, status asc, order asc
5. services: status asc, order asc
6. services: pageIds array-contains, status asc, order asc
7. services: categoryIds array-contains, status asc, order asc
8. packages: pageIds array-contains, status asc, order asc
9. packages: categoryIds array-contains, status asc, order asc
10. galleryItems: pageIds array-contains, status asc, order asc
11. stories: pageIds array-contains, status asc, order asc
12. videoCategories: status asc, order asc
13. videos: categoryIds array-contains, status asc, order asc
14. videos: featuredOnLanding asc, status asc, order asc

Si se necesita navegacion interna del admin con papelera o archivados, agregar indices complementarios por deletedAt + status + order.

## Cloud Functions necesarias o recomendadas

## Obligatorias para una operacion robusta

1. setAdminClaims
   Asigna custom claims a usuarios del admin.

2. syncMediaMetadata
   Cuando se sube un archivo a Storage, crea o actualiza el documento media correspondiente.

3. enforceUniqueSlugs
   Valida unicidad de slug en pages, services, packages y weddings.

4. writeAuditLog
   Registra cambios del admin en auditLogs.

## Muy recomendadas

1. onDeleteCascade
   Limpia referencias cuando se elimina media, pages, sections o services.

2. normalizeDocuments
   Completa createdAt, updatedAt, order, active y limpia strings vacios.

3. generatePublicThumbs
   Crea miniaturas al subir imagenes grandes.

4. submitRsvp
   Endpoint callable o HTTP para confirmar asistencia con validaciones.

5. publishSnapshot
   Si luego quieres separar borrador y publicado.

## Lo que aun falta migrar para que TODO quede administrable

Estas piezas todavia viven en codigo estatico o derivadas desde seed y deben moverse a Firestore si quieres administrar el 100% desde Firebase:

1. navegación del portfolio
2. hero stats y hero highlights
3. brand pillars
4. professional profile
5. contact links del portfolio
6. configuracion detallada de hero por categoria
7. requestOptionGroups de cada detalle de paquete
8. baseQuoteOptions de cada detalle de paquete
9. visuals y galerias adicionales del detalle de paquete
10. textos de CTA por categoria y por vista
11. categorias y listas de videos hoy declaradas en portfolio.data.ts aunque ya existe un espejo parcial en el modelo CMS mock
12. weddings.json y guests/*.json

Propuesta de ubicacion:

- contenido global en generalSettings
- taxonomias en categories
- cache editorial en pageSnapshots
- bloques especificos en sectionsData.data
- detalle comercial de paquetes en packages.advancedData
- boda dinamica en weddings y subcolecciones

## Flujo funcional esperado con Firebase

1. El admin inicia sesion con Firebase Auth.
2. El admin lee y escribe Firestore en las colecciones CMS.
3. Al subir archivos, el admin guarda en Firebase Storage.
4. Storage genera metadata hacia media.
5. Las vistas publicas leen solo documentos activos.
6. La vista de boda resuelve la boda por slug y el invitado por subcoleccion guests.
7. Si se implementa RSVP interno, la confirmacion escribe en weddings/{weddingId}/rsvps.

## Checklist de implementacion

## Fase 1

1. Crear proyecto Firebase
2. Activar Auth, Firestore, Storage, Hosting, App Check
3. Configurar ambientes Angular
4. Crear reglas iniciales
5. Crear indices base

## Fase 2

1. Migrar CMS mock a Firestore
2. Migrar media mock a Storage + media
3. Reemplazar localStorage del admin
4. Proteger admin con Auth

## Fase 3

1. Migrar weddings.json a weddings
2. Migrar guests/*.json a subcolecciones guests y guestGroups
3. Reemplazar WeddingService y GuestService para leer Firestore

## Fase 4

1. Migrar portfolio.data.ts a Firestore
2. Conectar sectionsData.data y packages.advancedData a las vistas publicas
3. Eliminar contenido duro del front

## Fase 5

1. Agregar auditLogs
2. Agregar Cloud Functions de validacion
3. Agregar RSVP interno si aplica
4. Agregar thumbnails y optimizacion de imagenes

## Criterio de terminado

La migracion a Firebase se puede considerar completa cuando:

1. el admin ya no use localStorage
2. las cargas de imagen usen Storage real
3. weddings y guests no salgan de assets/data
4. portfolio.data.ts deje de ser fuente principal de contenido
5. todas las vistas publicas lean Firestore o Storage
6. el admin tenga autenticacion y permisos reales
7. existan reglas, indices y funciones para operar en produccion
