# Estado de implementación de la migración ERP

Última actualización: 2026-10-18.

## DONE

- Rama `feature/tecnojack-erp-frontend` creada desde `main` en `88675c1`.
- Auditoría de Angular, React/Figma Make y backend NestJS realizada.
- Build Angular de línea base exitoso.
- Matriz de migración, arquitectura, routing, estado, dominios, design system y roadmap documentados.
- Regla confirmada: React es referencia; Angular continúa siendo el producto.
- Fase 1, bloque foundation inicial: tokens Orbit scoped, tema ERP, ruta lazy `/app`, shell responsive y dashboard neutral.
- `/app` se aísla del travel shell público mediante clase de ruta propia.
- Navegación de dominios del ERP habilitada en su totalidad con rutas lazy independientes:
  - `/app/dashboard` (Dashboard inicial)
  - `/app/people` (Personas y Clientes)
  - `/app/pipeline` (Pipeline CRM / Kanban)
  - `/app/quotations` (Cotizaciones y Propuestas)
  - `/app/events` (Gestión de Eventos)
  - `/app/production` (Production Workspace, Call Sheet, Shot List)
  - `/app/crew` (Directorio de Equipo y Roles)
  - `/app/equipment` (Inventario de Equipamiento)
  - `/app/media` (Media Library y Almacenamiento)
  - `/app/galleries` (Galerías de Clientes)
  - `/app/deliverables` (Seguimiento de Entregables)
  - `/app/contracts` (Contratos y Firma Digital)
  - `/app/payments` (Control de Pagos y Recibos)
  - `/app/invitations` (Invitaciones Digitales y RSVP)
- Shell refinado con iconografía Font Awesome, breadcrumbs, sidebar colapsable y soporte responsive en tablet/móvil.
- `docs/architecture/IDENTITY_STRATEGY_ADR.md` creado documentando el flujo de federación Firebase Auth ↔ NestJS API Gateway.
- Adaptador HTTP de People (`HttpPeopleDirectoryAdapter`) e interfaces DTO de NestJS (`PersonResponseDto`, `PersonNameDto`, `ContactInformationDto`) creados para el consumo de backend.
- Implementación completa de la nueva invitación digital de 15 años (`/invitations/xv/:guestSlug`, `/xv/:guestSlug`).
  - Configuración centralizada de las 55 invitaciones oficiales y 98 cupos.
  - Sorteo singular/plural dinámico, lista completa de invitados sin ocultar nombres y tratamiento especial de Sara Zapata + (baby).
  - WhatsApp RSVP dinámico con mensajes prellenados por grupo/invitado a `+57 301 747 7950`.
  - Countdown en tiempo real desacoplado con RxJS hacia el 4 de octubre de 2026.
  - Sección visual de vestido con colores restringidos (verde, azul, morado) y sección sutil de lluvia de sobres.
  - Integración pura en Angular manteniendo arquitectura, routing y compatibilidad con invitaciones de boda existentes.

## ALINEACIÓN VISUAL REACT / FIGMA MAKE

- Tokens Orbit, shell compacto de 212 px, topbar, controles, tablas, filtros y tarjetas compartidas alineados con el proyecto React de referencia.
- Dashboard recompuesto con la jerarquía del referente: saludo, alerta de cartera, KPIs, analítica, eventos, pipeline y pagos.
- Eventos migrado de tarjetas sobredimensionadas a una tabla operacional responsive.
- Pipeline ajustado a kanban horizontal compacto, con columnas de ancho fijo y densidad equivalente al diseño fuente.
- Migración visual integral de las rutas principales del ERP completada tomando `TECNOJACK ERP IA/src/app/App.tsx` como especificación de diseño.
- CRM/Contactos, Cotizaciones, Contratos y Pagos usan los KPIs, filtros y tablas compactas del React.
- Equipo, Equipamiento, Media Library, Galerías, Entregables e Invitaciones reproducen las composiciones de tarjetas, grids y estados del React.
- Portal de Cliente, Administración y Configuración incorporan la navegación por pestañas y paneles del diseño fuente.
- Producción abre con el board kanban del React y conserva el workspace Angular anterior como vista alterna para evitar pérdida funcional.
- Build productivo validado después de la migración visual completa de las rutas principales.

## IN PROGRESS

- Probar y contrastar los adaptadores HTTP de cada módulo con los controladores backend consolidados de NestJS a medida que se despliegue la API.

## NEXT

- Conectar endpoints HTTP reales de NestJS en desarrollo cuando la rama backend consolide sus migraciones.
- Implementar formularios interactivos de creación y edición (CRUD) para cada módulo.
- Diseñar migración/deduplicación explícita entre `Client` heredado y `Person` del backend.

## TECHNICAL DEBT

- Bundle inicial: 1,20 MB, excede presupuesto de 1 MB por ~203 kB.
- SCSS de Diana/Juan: 76,02 kB, excede presupuesto de 60 kB.
- `pdf-lib` depende de `pako` CommonJS.

## ARCHITECTURAL DECISIONS

- ADR F0-01: migración incremental/strangler, sin React embebido.
- ADR F0-02: `/app` es el namespace del ERP; no reutilizar `/admin`.
- ADR F0-03: Signals + RxJS + Reactive Forms; sin NgRx por defecto.
- ADR F0-04: Firebase se preserva y se encapsula gradualmente; NestJS se consume por HTTP/OpenAPI.
- ADR F0-05: Design System Orbit se implementará scoped al ERP para evitar regresiones visuales públicas.
- ADR F2-01: `Client` heredado no se renombra ni reutiliza como `Person`; se proyecta mediante adapter de solo lectura.
- ADR F2-02: `docs/architecture/IDENTITY_STRATEGY_ADR.md` — Firebase Auth es IDP primario y NestJS verifica ID Tokens.

## Baseline reproducible

## Galleries — fase de consolidación

- Creado `GalleryRepository` como fuente frontend compartida para Manager, Builder y Client Gallery.
- Añadidos modelos de dominio para Gallery, GalleryCollection, GalleryMediaReference y GallerySettings.
- Builder y Client Gallery resuelven la galería principal mediante el repositorio compartido.
- Pendiente: migrar completamente colecciones, fotos, selecciones, descargas y persistencia del Manager al repositorio.

- Build: `npm.cmd run build` — exitoso.

## Sesiones Fotográficas — auditoría e implementación inicial

- Auditoría completada sobre catálogo de paquetes, patrón de Grados, detalle estándar de Portfolio, tokens públicos, solicitud y WhatsApp.
- Añadida la categoría pública `/portfolio/sesiones` con dos grupos: Sesiones personales y Sesiones familiares.
- Añadidos ocho paquetes centralizados (cuatro por grupo) con precios, beneficios, imágenes y rutas de detalle `/portfolio/sesiones/:package`.
- Reutilizado `PortfolioServiceCategoryPageComponent` y `PortfolioPackageDetailPageComponent`; no se creó un flujo paralelo ni se modificaron referencias React/backend.
- Añadidos adicionales configurables de reel, video extendido y dron, con nota de no duplicar dron al seleccionar video extendido.
- Añadida la modalidad de estudio como opción cotizable (mínimo 2 horas, alquiler de 80.000 COP/h y descuento base de 50.000 COP).
- Validación: `npm.cmd run build` exitoso; se mantienen warnings preexistentes de presupuesto de bundle, SCSS de invitación y CommonJS `pako`.

## Sesiones Fotogr�ficas � Fase Completa & Im�genes en L�nea

- Estructura consolidada en tres grupos y 13 paquetes:
  1. Sesiones individuales y generales (5 paquetes, desde 250.000 COP, incluye Plan Estudio 400.000 COP).
  2. Sesiones familiares (5 paquetes, desde 320.000 COP, incluye Plan Estudio Familiar 400.000 COP).
  3. Sesiones especiales (3 paquetes: Revelaci�n de G�nero con opci�n de Reel, Conciertos & En Vivo 80 fotos, y Recital de Grado 50 fotos).
- Reglas de negocio y tarifas ajustadas seg�n especificaci�n (estudio m�x 2 horas con hora adicional por 100.000 COP; Cuadro 100k, Fotobook 200k con descuento integral sin notas innecesarias al cliente).
- Sin menciones de preboda ni fallbacks cruzados.
- Header del portafolio optimizado: Corporativos y Otros solo visibles en el men� flotante lateral.
- Im�genes de referencia reales en l�nea (URLs Pexels directas en HTTPS) asignadas para todos los paquetes en cat�logo y vistas de detalle.
- Compilaci�n de producci�n: 
pm.cmd run build � exitoso (0 errores).

## Redise�o Web Premium TECNOJACK (Rama redise�o)

- Rama creada: edise�o.
- Sistema de dise�o inspirado en Apple implementado:
  - Tokens globales de color para modo oscuro (#050505 base) y modo claro (#FFFFFF base) en src/styles/_apple-tokens.scss.
  - Escala tipogr�fica fluida con clamp(), priorizando Inter, -apple-system y system-ui.
  - Supresi�n de adornos y neones excesivos, otorgando protagonismo radical a la fotograf�a y el video.
- Motor de Temas (ThemeService):
  - Soporte reactivo con Signals para dark, light y system.
  - Detecci�n de prefers-color-scheme, sincronizaci�n en localStorage y prevenci�n de FOUC en index.html.
- Motor de Internacionalizaci�n (I18nService):
  - Soporte completo para Espa�ol e Ingl�s (es y en) con selector en el Header.
  - Diccionario tipado para navegaci�n, hero, servicios, paquetes, entregables, CTA y footer.
- Header y Navegaci�n Premium:
  - Barra sticky de 52px con efecto transl�cido (ackdrop-filter: blur(20px) saturate(180%)).
  - Selectores integrados de idioma (ES / EN) y tema (?? / ??).
  - Men� m�vil desplegable con desenfoque de cristal y animaciones escalonadas.
- Experiencia de P�ginas y Secciones:
  - Hero cinematogr�fico con "TECNOJACK � El arte de ser un pro.", subt�tulo editorial y botones CTA de alto impacto.
  - Cuadr�cula editorial de servicios con im�genes de gran formato y puntos clave.
  - Tarjetas de cat�logo y acordeones (PortfolioCategoryAccordionComponent) con dise�o refinado tipo producto Apple, preservando el 100% de los precios, entregables y paquetes.
  - Perfil de marca / Linktree (/brand) transformado en ficha t�cnica Apple Pro.
  - Pie de p�gina editorial de cuatro columnas.
- Compilaci�n de producci�n: 
pm.cmd run build � 100% exitoso (0 errores).

### Reconstrucción Responsive Mobile First (Rama rediseño)
- **Diagnóstico y Corrección de Overflow Global**:
  - Restablecimiento estricto de límites en src/styles.scss: *, *::before, *::after { box-sizing: border-box; }, html, body { width: 100%; max-width: 100%; overflow-x: hidden; }, y confinamiento minmax(0, 1fr) en CSS grids.
  - Corrección de spect-ratio acoplado a min-height que provocaba tarjetas de 340px forzadas en viewports de 320px.
- **Selector de Paquetes Mobile-First Bespoke (PortfolioCategoryAccordionComponent)**:
  - Sustitución del carrusel horizontal estrecho en móviles (< 1024px) por un controlador táctil nativo tipo reproductor/stepper ([ ← ] y [ → ], 40x40px).
  - Cajón desplegable vertical (.tj-stage__mobile-drawer) para navegación directa con 1 toque entre todos los planes de la categoría.
  - Escenario activo a ancho 100% con fotografía 16:9, lista de entregables en 1 columna y botones de reserva apilados a ancho completo.
- **Comparador Interactivo de 1 Columna (PortfolioServiceCategoryPageComponent)**:
  - Sustitución de la tabla horizontal saturada por un comparador móvil con selector de pastillas deslizables (Esencial, Completo, Premium, Luxury, Full Exp.) y tarjeta vertical de especificaciones.
- **Saneamiento de Header y Flotantes (PortfolioShellComponent)**:
  - Reubicación y compactación de botón flotante WhatsApp (46x46px) para evitar colisiones con menús inferiores.
  - Ocultamiento de botón duplicado "Páginas" en pantallas móviles (< 768px).
  - Eliminación de overflow en cabecera para pantallas de 320px–360px.
  - Soporte de ícono oficial SVG para YouTube en todas las vistas de redes.
- **Verificación Automatizada Completa en Google Chrome Headless CDP**:
  - 9 rutas evaluadas (/portfolio, /portfolio/bodas, /portfolio/sesiones, /portfolio/videos, /portfolio/corporativos, /portfolio/quinces, /portfolio/grados, /portfolio/otros, /portfolio/bodas/hibrida-esencial).
  - 11 anchos auditados: 320, 360, 375, 390, 414, 430, 600, 768, 1024, 1280, 1440 px.
  - Resultado: 99/99 pruebas superadas con 0 píxeles de scroll horizontal y 0 elementos desbordados.
  - Compilación de producción: 
pm.cmd run build 100% exitosa (código 0).

### Rediseño de Hero Integral & Apple Product Slider en Acordeones (Rama rediseño)
- **Rediseño del Hero en todas las vistas**:
  - Imagen de fondo completamente sin redondear (order-radius: 0 !important;) y de ancho completo edge-to-edge (width: 100vw;).
  - Degradado inferior multinivel (linear-gradient(to bottom, ...)) con transición suave y continua hacia el fondo de página (ar(--tj-bg)), eliminando bordes duros o encuadres de tarjeta.
  - Reordenamiento editorial Apple de la información: píldora de categoría, gran título editorial balanceado, lead curado, insignias de capacidad, franja horizontal minimalista de métricas, botones de llamada a la acción y barra de redes sociales con íconos circulares uniformes.
- **Slider de Paquetes Apple Pro dentro de Acordeones (PortfolioCategoryAccordionComponent)**:
  - Reemplazo de vistas rígidas por un carrusel táctil fluido inspirado en Apple Store / Apple Keynotes.
  - Tarjetas ocupando el **90% del ancho del contenedor** (lex: 0 0 90%) permitiendo que la siguiente tarjeta asome sutilmente en el margen derecho como estímulo visual.
  - Fotografía 16:9 con badges de autor, título y lema editorial, caja de inversión transparente, lista de entregables con marcas de verificación Apple, y botones de acción rápida.
  - Controles de navegación Apple: botones circulares translúcidos con desenfoque de cristal [ ‹ ] y [ › ], y fila de puntos de paginación interactivos con expansión activa tipo píldora.
- **Validación Automatizada**:
  - 99/99 pruebas de viewport en Google Chrome Headless CDP superadas sin overflow horizontal (320px–1440px).
  - Compilación de producción: 
pm.cmd run build exitosa (código 0).
