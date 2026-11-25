# Propuesta · Portal de galerías de clientes (selección y entrega)

Estado: **propuesta para decisión** · Fecha: 2026-11-23 · Autor: análisis asistido

## 1. Qué se quiere construir

Un portal separado del sitio comercial, alojado bajo el dominio `tecnojack.co`, donde:

- **El estudio** (panel administrativo) crea eventos, sube fotos y videos, los organiza por momentos, publica galerías y gestiona todo el sitio.
- **El cliente** entra con un enlace privado y:
  - en una **galería de selección** elige qué fotos quiere editadas (con límite, comentarios y envío final);
  - en una **galería de entrega** ve las fotos finales por momentos (Getting ready, Ceremonia, Recepción…), en calidad web, y descarga en alta resolución (una, varias, un momento, favoritas o todo), además de videos.

## 2. Referencias del mercado

| Producto | En qué destaca | Qué tomar como referencia |
| --- | --- | --- |
| **Pic-Time** | Presentación premium de bodas, galerías por "escenas", ventas de impresión automatizadas | Portada a pantalla completa, navegación por momentos, estética editorial |
| **Pixieset** | UX simple; favoritos en listas; PIN de descarga; tamaños web (640/1024/2048 px) vs alta resolución; plugin de Lightroom | Ajustes de descarga, flujo de favoritos → "notificar al fotógrafo", exportar selección a Lightroom |
| **ShootProof** | Orientado a ventas, emails y upsells | Recordatorios por email de expiración |
| **Picdrop / Picflow** | Proofing moderno: etiquetas de color, comentarios, aprobación con límite | Galería de selección con contador "32 / 80" y envío final |
| **CloudSpot** | Galerías + CRM ligero | Unir galería con evento, contrato y pago |
| **HoneyBook, Dubsado, Studio Ninja, VSCO Workspace (antes Táve)** | CRM: leads, contratos, facturas, agenda | Ya cubierto por el ERP (`/app`) y los módulos `crm`, `contracts`, `payments` del backend |

Se toman como referencia de **patrones de uso**, no de marca ni diseño literal. El repo ya contiene un paquete de diseño de galerías hecho en Figma Make (`docs/gpt sugerencias/`: lista de galerías, builder de 3 paneles, revisión de selección, estados Draft → Selection Required → Selection Submitted → Delivered → Expired). Ese paquete es el punto de partida visual.

### Funciones mínimas que todas comparten (y que debe tener el portal)

1. Enlace privado + PIN/contraseña opcional; acceso por email para saber quién descarga.
2. Colecciones por momentos y portada.
3. Vista web rápida (miniaturas + tamaño web); descarga en alta resolución u original.
4. Descarga individual, por colección, favoritas o completa (ZIP).
5. Favoritos y listas.
6. Fecha de expiración y recordatorios.
7. Registro de actividad: visitas, favoritos, descargas.
8. Proofing: límite de selección, comentarios por foto, envío que bloquea la selección y exportación de nombres de archivo para Lightroom/Capture One.
9. Videos: reproducción en calidad web y descarga del archivo final.

## 3. Situación actual (lo que ya existe)

- **Sitio público**: Angular 17 en **Vercel** (`www.tecnojack.co`), DNS en Namecheap, CMS/media sobre Firebase (Firestore + Storage).
- **ERP**: ya existe el contenedor `/app` (lazy, shell propio) en este mismo proyecto.
- **Backend NestJS** (`D:\TECNOJACK WORKSPACE`, PostgreSQL + Prisma) ya tiene módulos `gallery`, `deliverables`, `client-portal`, `media`, `storage` (con puerto `StorageProviderPort`, hoy proveedor `local`), `crm`, `events`, `contracts`, `payments`.
- El modelo `GalleryModel` ya cubre estado, visibilidad, contraseña, álbumes y permisos de descarga/favoritos/comentarios. **Falta**: tipo selección/entrega, límite de selección, expiración, PIN, variantes de imagen, visitantes, favoritos, envíos de selección y auditoría de descargas.

## 4. Dominio: ¿hace falta comprar otro?

**No.** Los subdominios de `tecnojack.co` son gratis y se crean en el DNS de Namecheap:

| Experiencia | URL propuesta | Notas |
| --- | --- | --- |
| Sitio comercial (actual) | `www.tecnojack.co` | Sin cambios |
| Galerías de clientes | `galeria.tecnojack.co` (o `clientes.`) | App nueva, ligera, pensada para móvil |
| Panel del estudio / ERP | `tecnojack.co/app` hoy; opcional `estudio.tecnojack.co` más adelante | Sin mover URLs existentes |
| API | `api.tecnojack.co` | Backend NestJS |
| Archivos | `media.tecnojack.co` | Dominio propio del bucket (R2) |

> Nota: `tecnojack.crm` no es posible (no es un subdominio, sería otro dominio). El equivalente gratis es `crm.tecnojack.co`.

## 5. Arquitectura frontend: no hacen falta microfrontends

Los microfrontends resuelven el problema de **varios equipos desplegando partes de una misma página**. Aquí hay un equipo y experiencias que no comparten pantalla, así que añadirían complejidad sin beneficio.

**Recomendación: workspace Angular con varias aplicaciones en este mismo repo.**

```
D:\TECNOJACK
├─ src/                    → app actual "site" (www): portafolio, paquetes, ERP /app
├─ projects/
│  └─ gallery/             → app nueva "gallery" (galeria.tecnojack.co)
└─ libs/ (cuando haga falta)
   └─ shared-ui, core-api  → componentes y cliente HTTP compartidos (sin negocio)
```

- Cada app tiene **su propio build y su propio bundle**: el portal de galerías no añade un solo KB al sitio comercial, y viceversa.
- Se despliegan como **dos proyectos de Vercel** apuntando al mismo repo (cada uno con su comando `ng build <app>` y su subdominio).
- Se comparte código a través de `libs/` con path aliases de TypeScript; nada se duplica.
- El panel del estudio (gestión de galerías) vive en el ERP `/app/galerias`, que ya es lazy y no afecta el rendimiento del sitio público.

Alternativa más barata (si se quiere empezar ya): una ruta lazy `/galeria/:token` dentro de la app actual. Funciona, pero comparte el bundle inicial (Firebase, i18n, shell) y los despliegues: un error en el portal tumba el sitio. Se recomienda la app separada.

**Vercel Hobby es solo para uso no comercial.** Como el sitio vende servicios, conviene pasar a Vercel Pro (USD 20/mes) o mover ambas apps a **Cloudflare Pages** (gratis, uso comercial permitido, ancho de banda ilimitado), que además encaja con R2.

## 6. Backend

**Usar el NestJS existente** (`D:\TECNOJACK WORKSPACE`), no crear otro.

- **Hosting**: Google Cloud Run (contenedor; ya hay `Dockerfile`). Escala a cero y su capa gratuita cubre el tráfico inicial. Dominio `api.tecnojack.co`.
- **Responsabilidades nuevas**:
  1. Emitir **URLs firmadas** para subir directo del navegador al bucket (multipart para archivos grandes) y para descargar. El backend nunca transporta los bytes de las fotos.
  2. **Procesar variantes** al terminar cada subida (worker con `sharp`): miniatura 400 px, web 2048 px WebP, y opcionalmente marca de agua para galerías de selección. Para videos: un MP4 720p de vista previa (ffmpeg en un Cloud Run Job).
  3. **ZIPs** por colección/favoritas/todo: generarlos en segundo plano, guardarlos en el bucket y enviar un enlace firmado (no generarlos en cada clic).
  4. **PDF**: hoja de contacto de la selección o de favoritas (miniaturas + nombre de archivo), útil para revisar y aprobar.
  5. Acceso del cliente: token del enlace + PIN + email; sesiones cortas.
  6. Exportar la selección como texto para Lightroom (`IMG_1234 OR IMG_1240 …`) y CSV.
  7. Notificaciones: selección enviada, galería publicada, expira en 7 días.

## 7. Base de datos

**PostgreSQL** (ya modelado con Prisma en el backend).

- Inicio: **Neon** (capa gratuita, escala a cero) o Supabase. Más adelante Cloud SQL si hace falta.
- Firestore se queda para lo que ya usa el sitio público (CMS, paquetes, solicitudes). **No migrar** el sitio a Postgres ahora.

Cambios de esquema propuestos (sobre `gallery.prisma` / `media.prisma`):

- `GalleryModel`: `kind` (`SELECTION` | `DELIVERY`), `selectionLimit`, `expiresAt`, `downloadPinHash`, `downloadSize` (`WEB` | `HIGH` | `ORIGINAL`), `watermark`.
- `MediaAsset`: claves por variante (`originalKey`, `webKey`, `thumbKey`, `previewVideoKey`) y `storageTier` (`HOT` | `ARCHIVED`).
- Nuevas tablas: `GalleryVisitor` (email, primer/último acceso), `GalleryFavorite` (visitante, asset, lista), `SelectionSubmission` (estado, enviado el, notas) y `SelectionItem` (asset, comentario), `DownloadEvent` (quién, qué, tamaño), `ArchiveJob` (ZIP/PDF pendientes y listos).

## 8. Almacenamiento de fotos y videos

### Por qué no servir las galerías desde Google Drive

- Drive tiene **cuotas de descarga** por proyecto y por archivo. La documentación oficial fija un límite diario de egreso por proyecto que no se puede aumentar, y al superarlo devuelve errores 403. Hay límites por archivo que no están documentados.
- Los enlaces públicos de Drive **no son un CDN**: fallan de forma intermitente cuando muchas personas abren la misma galería (por ejemplo, el día después de una boda).
- Con una cuenta Google One personal no hay cuentas de servicio propias del dominio; el backend dependería de un token OAuth de tu cuenta personal.

### Recomendación: almacenamiento en dos capas

| Capa | Servicio | Para qué | Costo aproximado |
| --- | --- | --- | --- |
| **Caliente** (lo que ve y descarga el cliente) | **Cloudflare R2** con dominio `media.tecnojack.co` | Miniaturas, tamaño web, alta resolución, ZIPs, videos de entrega | 10 GB gratis; luego USD 0,015 por GB al mes; **descargas (egreso) gratis** |
| **Fría** (archivo y respaldo) | **Google Drive 5 TB** (ya pagado) | Originales, RAW, proyectos y galerías expiradas | Ya incluido |

- **Por qué R2**: las entregas pesan mucho (una boda de 800 fotos a 15 MB son unos 12 GB, y la descargan varios invitados). En Firebase Storage o Google Cloud Storage se paga cada GB descargado; en R2 no. Además es compatible con S3, así que el puerto `StorageProviderPort` del backend solo necesita un adaptador S3.
- **Uso de Drive**: el backend sincroniza los originales de cada galería publicada a una carpeta `TECNOJACK/Clientes/<año>/<evento>` mediante la API de Drive (subida en segundo plano, que no tiene los problemas de las descargas masivas). Al expirar una galería, sus archivos se borran de R2 y quedan solo en Drive; si el cliente la pide de nuevo, se restaura desde Drive.
- **Ejemplo de costo**: 1 TB activo en R2 son unos USD 15 al mes, con descargas ilimitadas incluidas.

## 9. Flujos

**Selección**
1. Subes las fotos (sin editar, en JPEG liviano o con marca de agua) a una galería de tipo Selección con un límite (por ejemplo, 80).
2. El cliente marca fotos y comenta; ve un contador "32 / 80".
3. Envía la selección; la galería queda bloqueada y recibes un aviso.
4. En el panel ves las fotos elegidas y copias el filtro para Lightroom.

**Entrega**
1. Exportas desde Lightroom en alta resolución y subes por colecciones (arrastrar carpetas: cada carpeta se convierte en un momento).
2. El sistema genera automáticamente las versiones web y miniaturas.
3. Publicas, y el cliente recibe el enlace (y el PIN si lo activas).
4. El cliente ve en calidad web, marca favoritas y descarga en alta resolución (una foto, un momento, sus favoritas o todo en ZIP), y puede generar un PDF de sus favoritas.
5. Al expirar, los archivos pasan a archivo en Drive.

Integración futura con el ERP: vincular la galería al evento, al contrato y al pago (por ejemplo, habilitar descargas en alta resolución solo cuando el saldo está pagado).

## 10. Plan por fases

| Fase | Entrega | Valor |
| --- | --- | --- |
| 0 · Base | Subdominios, bucket R2 + `media.tecnojack.co`, Postgres en Neon, NestJS en Cloud Run (`api.`), app `projects/gallery` vacía desplegada | Infraestructura lista sin tocar el sitio |
| 1 · Entrega (MVP) | Crear galería, subir por colecciones, variantes automáticas, publicar enlace + PIN, ver y descargar (individual y ZIP), favoritas | Lo que más usarás desde el primer día |
| 2 · Selección | Galerías de selección, límite, comentarios, envío, revisión en el panel, exportación para Lightroom | Reemplaza el ida y vuelta por WhatsApp |
| 3 · Profesional | Videos (vista previa + descarga), PDF, expiración y recordatorios, archivo a Drive, estadísticas | Operación completa |
| 4 · CRM | Vinculación con eventos, contratos y pagos del ERP; portal del cliente con todos sus proyectos | Un solo lugar para cada cliente |

## 11. Costos mensuales estimados (inicio)

| Concepto | Costo |
| --- | --- |
| Dominio | USD 0 extra (subdominios) |
| Hosting frontend | USD 0 (Cloudflare Pages) o USD 20 (Vercel Pro) |
| Backend Cloud Run | USD 0 en la capa gratuita con tráfico bajo |
| Postgres Neon | USD 0 en la capa gratuita |
| R2 | USD 0 hasta 10 GB; unos USD 15 por TB activo |
| Google Drive 5 TB | Ya pagado |

## 12. Decisiones pendientes

1. Subdominio del portal: `galeria.` o `clientes.` (hoy existe la ruta `/clientes` del portafolio; si se elige `clientes.`, no hay conflicto porque es otro host).
2. Hosting frontend: quedarse en Vercel (pasar a Pro) o mover a Cloudflare Pages.
3. Confirmar el tipo de cuenta Google: Workspace (con dominio propio) o Google One personal. Esto cambia cómo se conecta el backend a Drive.
4. Política de expiración por defecto (por ejemplo, 6 o 12 meses activa en R2).

Rollback y compatibilidad: todo es aditivo. El sitio actual, sus URLs, Firebase y el ERP `/app` no cambian. El portal vive en otro subdominio, y desactivarlo no afecta `www`.
