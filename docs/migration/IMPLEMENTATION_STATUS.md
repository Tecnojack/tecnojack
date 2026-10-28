# Estado de implementaci√≥n de la migraci√≥n ERP

√öltima actualizaci√≥n: 2026-10-18.

## DONE

- Rama `feature/tecnojack-erp-frontend` creada desde `main` en `88675c1`.
- Auditor√≠a de Angular, React/Figma Make y backend NestJS realizada.
- Build Angular de l√≠nea base exitoso.
- Matriz de migraci√≥n, arquitectura, routing, estado, dominios, design system y roadmap documentados.
- Regla confirmada: React es referencia; Angular contin√∫a siendo el producto.
- Fase 1, bloque foundation inicial: tokens Orbit scoped, tema ERP, ruta lazy `/app`, shell responsive y dashboard neutral.
- `/app` se a√≠sla del travel shell p√∫blico mediante clase de ruta propia.
- Navegaci√≥n de dominios del ERP habilitada en su totalidad con rutas lazy independientes:
  - `/app/dashboard` (Dashboard inicial)
  - `/app/people` (Personas y Clientes)
  - `/app/pipeline` (Pipeline CRM / Kanban)
  - `/app/quotations` (Cotizaciones y Propuestas)
  - `/app/events` (Gesti√≥n de Eventos)
  - `/app/production` (Production Workspace, Call Sheet, Shot List)
  - `/app/crew` (Directorio de Equipo y Roles)
  - `/app/equipment` (Inventario de Equipamiento)
  - `/app/media` (Media Library y Almacenamiento)
  - `/app/galleries` (Galer√≠as de Clientes)
  - `/app/deliverables` (Seguimiento de Entregables)
  - `/app/contracts` (Contratos y Firma Digital)
  - `/app/payments` (Control de Pagos y Recibos)
  - `/app/invitations` (Invitaciones Digitales y RSVP)
- Shell refinado con iconograf√≠a Font Awesome, breadcrumbs, sidebar colapsable y soporte responsive en tablet/m√≥vil.
- `docs/architecture/IDENTITY_STRATEGY_ADR.md` creado documentando el flujo de federaci√≥n Firebase Auth ‚Üî NestJS API Gateway.
- Adaptador HTTP de People (`HttpPeopleDirectoryAdapter`) e interfaces DTO de NestJS (`PersonResponseDto`, `PersonNameDto`, `ContactInformationDto`) creados para el consumo de backend.
- Implementaci√≥n completa de la nueva invitaci√≥n digital de 15 a√±os (`/invitations/xv/:guestSlug`, `/xv/:guestSlug`).
  - Configuraci√≥n centralizada de las 55 invitaciones oficiales y 98 cupos.
  - Sorteo singular/plural din√°mico, lista completa de invitados sin ocultar nombres y tratamiento especial de Sara Zapata + (baby).
  - WhatsApp RSVP din√°mico con mensajes prellenados por grupo/invitado a `+57 301 747 7950`.
  - Countdown en tiempo real desacoplado con RxJS hacia el 4 de octubre de 2026.
  - Secci√≥n visual de vestido con colores restringidos (verde, azul, morado) y secci√≥n sutil de lluvia de sobres.
  - Integraci√≥n pura en Angular manteniendo arquitectura, routing y compatibilidad con invitaciones de boda existentes.

## ALINEACI√ìN VISUAL REACT / FIGMA MAKE

- Tokens Orbit, shell compacto de 212 px, topbar, controles, tablas, filtros y tarjetas compartidas alineados con el proyecto React de referencia.
- Dashboard recompuesto con la jerarqu√≠a del referente: saludo, alerta de cartera, KPIs, anal√≠tica, eventos, pipeline y pagos.
- Eventos migrado de tarjetas sobredimensionadas a una tabla operacional responsive.
- Pipeline ajustado a kanban horizontal compacto, con columnas de ancho fijo y densidad equivalente al dise√±o fuente.
- Migraci√≥n visual integral de las rutas principales del ERP completada tomando `TECNOJACK ERP IA/src/app/App.tsx` como especificaci√≥n de dise√±o.
- CRM/Contactos, Cotizaciones, Contratos y Pagos usan los KPIs, filtros y tablas compactas del React.
- Equipo, Equipamiento, Media Library, Galer√≠as, Entregables e Invitaciones reproducen las composiciones de tarjetas, grids y estados del React.
- Portal de Cliente, Administraci√≥n y Configuraci√≥n incorporan la navegaci√≥n por pesta√±as y paneles del dise√±o fuente.
- Producci√≥n abre con el board kanban del React y conserva el workspace Angular anterior como vista alterna para evitar p√©rdida funcional.
- Build productivo validado despu√©s de la migraci√≥n visual completa de las rutas principales.

## IN PROGRESS

- Probar y contrastar los adaptadores HTTP de cada m√≥dulo con los controladores backend consolidados de NestJS a medida que se despliegue la API.

## NEXT

- Conectar endpoints HTTP reales de NestJS en desarrollo cuando la rama backend consolide sus migraciones.
- Implementar formularios interactivos de creaci√≥n y edici√≥n (CRUD) para cada m√≥dulo.
- Dise√±ar migraci√≥n/deduplicaci√≥n expl√≠cita entre `Client` heredado y `Person` del backend.

## TECHNICAL DEBT

- Bundle inicial: 1,20 MB, excede presupuesto de 1 MB por ~203 kB.
- SCSS de Diana/Juan: 76,02 kB, excede presupuesto de 60 kB.
- `pdf-lib` depende de `pako` CommonJS.

## ARCHITECTURAL DECISIONS

- ADR F0-01: migraci√≥n incremental/strangler, sin React embebido.
- ADR F0-02: `/app` es el namespace del ERP; no reutilizar `/admin`.
- ADR F0-03: Signals + RxJS + Reactive Forms; sin NgRx por defecto.
- ADR F0-04: Firebase se preserva y se encapsula gradualmente; NestJS se consume por HTTP/OpenAPI.
- ADR F0-05: Design System Orbit se implementar√° scoped al ERP para evitar regresiones visuales p√∫blicas.
- ADR F2-01: `Client` heredado no se renombra ni reutiliza como `Person`; se proyecta mediante adapter de solo lectura.
- ADR F2-02: `docs/architecture/IDENTITY_STRATEGY_ADR.md` ‚Äî Firebase Auth es IDP primario y NestJS verifica ID Tokens.

## Baseline reproducible

## Galleries ‚Äî fase de consolidaci√≥n

- Creado `GalleryRepository` como fuente frontend compartida para Manager, Builder y Client Gallery.
- A√±adidos modelos de dominio para Gallery, GalleryCollection, GalleryMediaReference y GallerySettings.
- Builder y Client Gallery resuelven la galer√≠a principal mediante el repositorio compartido.
- Pendiente: migrar completamente colecciones, fotos, selecciones, descargas y persistencia del Manager al repositorio.

- Build: `npm.cmd run build` ‚Äî exitoso.

## Sesiones Fotogr√°ficas ‚Äî auditor√≠a e implementaci√≥n inicial

- Auditor√≠a completada sobre cat√°logo de paquetes, patr√≥n de Grados, detalle est√°ndar de Portfolio, tokens p√∫blicos, solicitud y WhatsApp.
- A√±adida la categor√≠a p√∫blica `/portfolio/sesiones` con dos grupos: Sesiones personales y Sesiones familiares.
- A√±adidos ocho paquetes centralizados (cuatro por grupo) con precios, beneficios, im√°genes y rutas de detalle `/portfolio/sesiones/:package`.
- Reutilizado `PortfolioServiceCategoryPageComponent` y `PortfolioPackageDetailPageComponent`; no se cre√≥ un flujo paralelo ni se modificaron referencias React/backend.
- A√±adidos adicionales configurables de reel, video extendido y dron, con nota de no duplicar dron al seleccionar video extendido.
- A√±adida la modalidad de estudio como opci√≥n cotizable (m√≠nimo 2 horas, alquiler de 80.000 COP/h y descuento base de 50.000 COP).
- Validaci√≥n: `npm.cmd run build` exitoso; se mantienen warnings preexistentes de presupuesto de bundle, SCSS de invitaci√≥n y CommonJS `pako`.

## Sesiones Fotogr·ficas ó Fase Completa & Im·genes en LÌnea

- Estructura consolidada en tres grupos y 13 paquetes:
  1. Sesiones individuales y generales (5 paquetes, desde 250.000 COP, incluye Plan Estudio 400.000 COP).
  2. Sesiones familiares (5 paquetes, desde 320.000 COP, incluye Plan Estudio Familiar 400.000 COP).
  3. Sesiones especiales (3 paquetes: RevelaciÛn de GÈnero con opciÛn de Reel, Conciertos & En Vivo 80 fotos, y Recital de Grado 50 fotos).
- Reglas de negocio y tarifas ajustadas seg˙n especificaciÛn (estudio m·x 2 horas con hora adicional por 100.000 COP; Cuadro 100k, Fotobook 200k con descuento integral sin notas innecesarias al cliente).
- Sin menciones de preboda ni fallbacks cruzados.
- Header del portafolio optimizado: Corporativos y Otros solo visibles en el men˙ flotante lateral.
- Im·genes de referencia reales en lÌnea (URLs Pexels directas en HTTPS) asignadas para todos los paquetes en cat·logo y vistas de detalle.
- CompilaciÛn de producciÛn: 
pm.cmd run build ó exitoso (0 errores).

## RediseÒo Web Premium TECNOJACK (Rama rediseÒo)

- Rama creada: ediseÒo.
- Sistema de diseÒo inspirado en Apple implementado:
  - Tokens globales de color para modo oscuro (#050505 base) y modo claro (#FFFFFF base) en src/styles/_apple-tokens.scss.
  - Escala tipogr·fica fluida con clamp(), priorizando Inter, -apple-system y system-ui.
  - SupresiÛn de adornos y neones excesivos, otorgando protagonismo radical a la fotografÌa y el video.
- Motor de Temas (ThemeService):
  - Soporte reactivo con Signals para dark, light y system.
  - DetecciÛn de prefers-color-scheme, sincronizaciÛn en localStorage y prevenciÛn de FOUC en index.html.
- Motor de InternacionalizaciÛn (I18nService):
  - Soporte completo para EspaÒol e InglÈs (es y en) con selector en el Header.
  - Diccionario tipado para navegaciÛn, hero, servicios, paquetes, entregables, CTA y footer.
- Header y NavegaciÛn Premium:
  - Barra sticky de 52px con efecto transl˙cido (ackdrop-filter: blur(20px) saturate(180%)).
  - Selectores integrados de idioma (ES / EN) y tema (?? / ??).
  - Men˙ mÛvil desplegable con desenfoque de cristal y animaciones escalonadas.
- Experiencia de P·ginas y Secciones:
  - Hero cinematogr·fico con "TECNOJACK ó El arte de ser un pro.", subtÌtulo editorial y botones CTA de alto impacto.
  - CuadrÌcula editorial de servicios con im·genes de gran formato y puntos clave.
  - Tarjetas de cat·logo y acordeones (PortfolioCategoryAccordionComponent) con diseÒo refinado tipo producto Apple, preservando el 100% de los precios, entregables y paquetes.
  - Perfil de marca / Linktree (/brand) transformado en ficha tÈcnica Apple Pro.
  - Pie de p·gina editorial de cuatro columnas.
- CompilaciÛn de producciÛn: 
pm.cmd run build ó 100% exitoso (0 errores).
