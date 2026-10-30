# Estado de implementaciÃ³n de la migraciÃ³n ERP

Ãšltima actualizaciÃ³n: 2026-10-18.

## DONE

- Rama `feature/tecnojack-erp-frontend` creada desde `main` en `88675c1`.
- AuditorÃ­a de Angular, React/Figma Make y backend NestJS realizada.
- Build Angular de lÃ­nea base exitoso.
- Matriz de migraciÃ³n, arquitectura, routing, estado, dominios, design system y roadmap documentados.
- Regla confirmada: React es referencia; Angular continÃºa siendo el producto.
- Fase 1, bloque foundation inicial: tokens Orbit scoped, tema ERP, ruta lazy `/app`, shell responsive y dashboard neutral.
- `/app` se aÃ­sla del travel shell pÃºblico mediante clase de ruta propia.
- NavegaciÃ³n de dominios del ERP habilitada en su totalidad con rutas lazy independientes:
  - `/app/dashboard` (Dashboard inicial)
  - `/app/people` (Personas y Clientes)
  - `/app/pipeline` (Pipeline CRM / Kanban)
  - `/app/quotations` (Cotizaciones y Propuestas)
  - `/app/events` (GestiÃ³n de Eventos)
  - `/app/production` (Production Workspace, Call Sheet, Shot List)
  - `/app/crew` (Directorio de Equipo y Roles)
  - `/app/equipment` (Inventario de Equipamiento)
  - `/app/media` (Media Library y Almacenamiento)
  - `/app/galleries` (GalerÃ­as de Clientes)
  - `/app/deliverables` (Seguimiento de Entregables)
  - `/app/contracts` (Contratos y Firma Digital)
  - `/app/payments` (Control de Pagos y Recibos)
  - `/app/invitations` (Invitaciones Digitales y RSVP)
- Shell refinado con iconografÃ­a Font Awesome, breadcrumbs, sidebar colapsable y soporte responsive en tablet/mÃ³vil.
- `docs/architecture/IDENTITY_STRATEGY_ADR.md` creado documentando el flujo de federaciÃ³n Firebase Auth â†” NestJS API Gateway.
- Adaptador HTTP de People (`HttpPeopleDirectoryAdapter`) e interfaces DTO de NestJS (`PersonResponseDto`, `PersonNameDto`, `ContactInformationDto`) creados para el consumo de backend.
- ImplementaciÃ³n completa de la nueva invitaciÃ³n digital de 15 aÃ±os (`/invitations/xv/:guestSlug`, `/xv/:guestSlug`).
  - ConfiguraciÃ³n centralizada de las 55 invitaciones oficiales y 98 cupos.
  - Sorteo singular/plural dinÃ¡mico, lista completa de invitados sin ocultar nombres y tratamiento especial de Sara Zapata + (baby).
  - WhatsApp RSVP dinÃ¡mico con mensajes prellenados por grupo/invitado a `+57 301 747 7950`.
  - Countdown en tiempo real desacoplado con RxJS hacia el 4 de octubre de 2026.
  - SecciÃ³n visual de vestido con colores restringidos (verde, azul, morado) y secciÃ³n sutil de lluvia de sobres.
  - IntegraciÃ³n pura en Angular manteniendo arquitectura, routing y compatibilidad con invitaciones de boda existentes.

## ALINEACIÃ“N VISUAL REACT / FIGMA MAKE

- Internacionalización Integral (i18n ES / EN en toda la página de portafolio y categorías):
  - Integración reactiva de `I18nService` en todas las secciones: Hero, Manifiesto/Filosofía, Obra Seleccionada, Catálogo de Servicios, Transición Cinemática, Experiencias Insignia, Perfil Profesional, Contacto, Header, Navegación Móvil, Menú Flotante, Footer y Acordeones de Paquetes.
  - Conmutador `ES / EN` dinámico con actualización reactiva instantánea sin recarga.
  - Textos de navegación, etiquetas de paquetes, badges de colecciones, modales de Destination y formularios traducidos al 100%.
- Curaduría y corrección total de imágenes de portafolio con Firebase Storage:
  - Eliminación completa de `default-cover.png` y reemplazo por imágenes de alta resolución categorizadas:
    - Bodas: portadas oficiales de bodas (`servicios/bodas/cover.jpg`, `hibridas/luxury/cover.jpg`, `hibridas/premium/cover.jpg`).
    - Quinces: portadas y sesiones de gala (`servicios/quinces/cover.jpg`, `fotografia-de-quince/premium/cover.jpg`, `clientes/sofia-colorado`).
    - Grados: portadas de grado y retratos solemnes (`servicios/grados/estudiantes/plan-legado/cover.jpg`, `plan-memoria/cover.jpg`, `clientes/sara-villamizar`).
    - Video: portada oficial de producción audiovisual 4K (`servicios/video/cover.jpg`).
  - Galerías de `portfolioServices` y `portfolioGalleryItems` alineadas exactamente a sus categorías correspondientes.

- Migración y aislamiento de imágenes de clientes de invitaciones (`M&D-*`):
  - 100% de las imágenes privadas de la invitación María & Daniel eliminadas de vistas de portafolio público, paquetes y perfiles.
  - Reemplazo completo por imágenes oficiales de Firebase Storage (`servicios/bodas/...`, `servicios/quinces/...`, `servicios/grados/...`, `servicios/video/...`, `servicios/prebodas/...`).
  - Fotografía de perfil del autor Jackson Palacios actualizada con la imagen profesional oficial (`assets/images/profile/Jackson Palacios.jpg`).
  - 0 fugas de imágenes de invitación en rutas de portafolio verificadas con tests automatizados y auditoría CDP en vivo.
- Slider de paquetes estilo Apple:
  - Soporte de 3 tarjetas visibles simultáneas en desktop con la activa centrada.
  - Visualización 1 a 1 fluida en mobile (375-430px) con swipe táctil y navegación por gestos.
  - Indicador flotante "+ VIÁTICOS" y precio en una sola línea sin solapamiento de textos.
  - Modo oscuro activado por defecto con alto contraste y scrollbar estilizado.
  - Modales (incluyendo Destination Modal) adaptados a la nueva identidad visual.

- Tokens Orbit, shell compacto de 212 px, topbar, controles, tablas, filtros y tarjetas compartidas alineados con el proyecto React de referencia.
- Dashboard recompuesto con la jerarquÃ­a del referente: saludo, alerta de cartera, KPIs, analÃ­tica, eventos, pipeline y pagos.
- Eventos migrado de tarjetas sobredimensionadas a una tabla operacional responsive.
- Pipeline ajustado a kanban horizontal compacto, con columnas de ancho fijo y densidad equivalente al diseÃ±o fuente.
- MigraciÃ³n visual integral de las rutas principales del ERP completada tomando `TECNOJACK ERP IA/src/app/App.tsx` como especificaciÃ³n de diseÃ±o.
- CRM/Contactos, Cotizaciones, Contratos y Pagos usan los KPIs, filtros y tablas compactas del React.
- Equipo, Equipamiento, Media Library, GalerÃ­as, Entregables e Invitaciones reproducen las composiciones de tarjetas, grids y estados del React.
- Portal de Cliente, AdministraciÃ³n y ConfiguraciÃ³n incorporan la navegaciÃ³n por pestaÃ±as y paneles del diseÃ±o fuente.
- ProducciÃ³n abre con el board kanban del React y conserva el workspace Angular anterior como vista alterna para evitar pÃ©rdida funcional.
- Build productivo validado despuÃ©s de la migraciÃ³n visual completa de las rutas principales.

## IN PROGRESS

- Probar y contrastar los adaptadores HTTP de cada mÃ³dulo con los controladores backend consolidados de NestJS a medida que se despliegue la API.

## NEXT

- Conectar endpoints HTTP reales de NestJS en desarrollo cuando la rama backend consolide sus migraciones.
- Implementar formularios interactivos de creaciÃ³n y ediciÃ³n (CRUD) para cada mÃ³dulo.
- DiseÃ±ar migraciÃ³n/deduplicaciÃ³n explÃ­cita entre `Client` heredado y `Person` del backend.

## TECHNICAL DEBT

- Bundle inicial: 1,20 MB, excede presupuesto de 1 MB por ~203 kB.
- SCSS de Diana/Juan: 76,02 kB, excede presupuesto de 60 kB.
- `pdf-lib` depende de `pako` CommonJS.

## ARCHITECTURAL DECISIONS

- ADR F0-01: migraciÃ³n incremental/strangler, sin React embebido.
- ADR F0-02: `/app` es el namespace del ERP; no reutilizar `/admin`.
- ADR F0-03: Signals + RxJS + Reactive Forms; sin NgRx por defecto.
- ADR F0-04: Firebase se preserva y se encapsula gradualmente; NestJS se consume por HTTP/OpenAPI.
- ADR F0-05: Design System Orbit se implementarÃ¡ scoped al ERP para evitar regresiones visuales pÃºblicas.
- ADR F2-01: `Client` heredado no se renombra ni reutiliza como `Person`; se proyecta mediante adapter de solo lectura.
- ADR F2-02: `docs/architecture/IDENTITY_STRATEGY_ADR.md` â€” Firebase Auth es IDP primario y NestJS verifica ID Tokens.

## Baseline reproducible

## Galleries â€” fase de consolidaciÃ³n

- Creado `GalleryRepository` como fuente frontend compartida para Manager, Builder y Client Gallery.
- AÃ±adidos modelos de dominio para Gallery, GalleryCollection, GalleryMediaReference y GallerySettings.
- Builder y Client Gallery resuelven la galerÃ­a principal mediante el repositorio compartido.
- Pendiente: migrar completamente colecciones, fotos, selecciones, descargas y persistencia del Manager al repositorio.

- Build: `npm.cmd run build` â€” exitoso.

## Sesiones FotogrÃ¡ficas â€” auditorÃ­a e implementaciÃ³n inicial

- AuditorÃ­a completada sobre catÃ¡logo de paquetes, patrÃ³n de Grados, detalle estÃ¡ndar de Portfolio, tokens pÃºblicos, solicitud y WhatsApp.
- AÃ±adida la categorÃ­a pÃºblica `/portfolio/sesiones` con dos grupos: Sesiones personales y Sesiones familiares.
- AÃ±adidos ocho paquetes centralizados (cuatro por grupo) con precios, beneficios, imÃ¡genes y rutas de detalle `/portfolio/sesiones/:package`.
- Reutilizado `PortfolioServiceCategoryPageComponent` y `PortfolioPackageDetailPageComponent`; no se creÃ³ un flujo paralelo ni se modificaron referencias React/backend.
- AÃ±adidos adicionales configurables de reel, video extendido y dron, con nota de no duplicar dron al seleccionar video extendido.
- AÃ±adida la modalidad de estudio como opciÃ³n cotizable (mÃ­nimo 2 horas, alquiler de 80.000 COP/h y descuento base de 50.000 COP).
- ValidaciÃ³n: `npm.cmd run build` exitoso; se mantienen warnings preexistentes de presupuesto de bundle, SCSS de invitaciÃ³n y CommonJS `pako`.

## Sesiones Fotográficas — Fase Completa & Imágenes en Línea

- Estructura consolidada en tres grupos y 13 paquetes:
  1. Sesiones individuales y generales (5 paquetes, desde 250.000 COP, incluye Plan Estudio 400.000 COP).
  2. Sesiones familiares (5 paquetes, desde 320.000 COP, incluye Plan Estudio Familiar 400.000 COP).
  3. Sesiones especiales (3 paquetes: Revelación de Género con opción de Reel, Conciertos & En Vivo 80 fotos, y Recital de Grado 50 fotos).
- Reglas de negocio y tarifas ajustadas según especificación (estudio máx 2 horas con hora adicional por 100.000 COP; Cuadro 100k, Fotobook 200k con descuento integral sin notas innecesarias al cliente).
- Sin menciones de preboda ni fallbacks cruzados.
- Header del portafolio optimizado: Corporativos y Otros solo visibles en el menú flotante lateral.
- Imágenes de referencia reales en línea (URLs Pexels directas en HTTPS) asignadas para todos los paquetes en catálogo y vistas de detalle.
- Compilación de producción: 
pm.cmd run build — exitoso (0 errores).

## Rediseño Web Premium TECNOJACK (Rama rediseño)

- Rama creada: ediseño.
- Sistema de diseño inspirado en Apple implementado:
  - Tokens globales de color para modo oscuro (#050505 base) y modo claro (#FFFFFF base) en src/styles/_apple-tokens.scss.
  - Escala tipográfica fluida con clamp(), priorizando Inter, -apple-system y system-ui.
  - Supresión de adornos y neones excesivos, otorgando protagonismo radical a la fotografía y el video.
- Motor de Temas (ThemeService):
  - Soporte reactivo con Signals para dark, light y system.
  - Detección de prefers-color-scheme, sincronización en localStorage y prevención de FOUC en index.html.
- Motor de Internacionalización (I18nService):
  - Soporte completo para Español e Inglés (es y en) con selector en el Header.
  - Diccionario tipado para navegación, hero, servicios, paquetes, entregables, CTA y footer.
- Header y Navegación Premium:
  - Barra sticky de 52px con efecto translúcido (ackdrop-filter: blur(20px) saturate(180%)).
  - Selectores integrados de idioma (ES / EN) y tema (?? / ??).
  - Menú móvil desplegable con desenfoque de cristal y animaciones escalonadas.
- Experiencia de Páginas y Secciones:
  - Hero cinematográfico con "TECNOJACK — El arte de ser un pro.", subtítulo editorial y botones CTA de alto impacto.
  - Cuadrícula editorial de servicios con imágenes de gran formato y puntos clave.
  - Tarjetas de catálogo y acordeones (PortfolioCategoryAccordionComponent) con diseño refinado tipo producto Apple, preservando el 100% de los precios, entregables y paquetes.
  - Perfil de marca / Linktree (/brand) transformado en ficha técnica Apple Pro.
  - Pie de página editorial de cuatro columnas.
- Compilación de producción: 
pm.cmd run build — 100% exitoso (0 errores).

### ReconstrucciÃ³n Responsive Mobile First (Rama rediseÃ±o)
- **DiagnÃ³stico y CorrecciÃ³n de Overflow Global**:
  - Restablecimiento estricto de lÃ­mites en src/styles.scss: *, *::before, *::after { box-sizing: border-box; }, html, body { width: 100%; max-width: 100%; overflow-x: hidden; }, y confinamiento minmax(0, 1fr) en CSS grids.
  - CorrecciÃ³n de spect-ratio acoplado a min-height que provocaba tarjetas de 340px forzadas en viewports de 320px.
- **Selector de Paquetes Mobile-First Bespoke (PortfolioCategoryAccordionComponent)**:
  - SustituciÃ³n del carrusel horizontal estrecho en mÃ³viles (< 1024px) por un controlador tÃ¡ctil nativo tipo reproductor/stepper ([ â†� ] y [ â†’ ], 40x40px).
  - CajÃ³n desplegable vertical (.tj-stage__mobile-drawer) para navegaciÃ³n directa con 1 toque entre todos los planes de la categorÃ­a.
  - Escenario activo a ancho 100% con fotografÃ­a 16:9, lista de entregables en 1 columna y botones de reserva apilados a ancho completo.
- **Comparador Interactivo de 1 Columna (PortfolioServiceCategoryPageComponent)**:
  - SustituciÃ³n de la tabla horizontal saturada por un comparador mÃ³vil con selector de pastillas deslizables (Esencial, Completo, Premium, Luxury, Full Exp.) y tarjeta vertical de especificaciones.
- **Saneamiento de Header y Flotantes (PortfolioShellComponent)**:
  - ReubicaciÃ³n y compactaciÃ³n de botÃ³n flotante WhatsApp (46x46px) para evitar colisiones con menÃºs inferiores.
  - Ocultamiento de botÃ³n duplicado "PÃ¡ginas" en pantallas mÃ³viles (< 768px).
  - EliminaciÃ³n de overflow en cabecera para pantallas de 320pxâ€“360px.
  - Soporte de Ã­cono oficial SVG para YouTube en todas las vistas de redes.
- **VerificaciÃ³n Automatizada Completa en Google Chrome Headless CDP**:
  - 9 rutas evaluadas (/portfolio, /portfolio/bodas, /portfolio/sesiones, /portfolio/videos, /portfolio/corporativos, /portfolio/quinces, /portfolio/grados, /portfolio/otros, /portfolio/bodas/hibrida-esencial).
  - 11 anchos auditados: 320, 360, 375, 390, 414, 430, 600, 768, 1024, 1280, 1440 px.
  - Resultado: 99/99 pruebas superadas con 0 pÃ­xeles de scroll horizontal y 0 elementos desbordados.
  - CompilaciÃ³n de producciÃ³n: 
pm.cmd run build 100% exitosa (cÃ³digo 0).

### RediseÃ±o de Hero Integral & Apple Product Slider en Acordeones (Rama rediseÃ±o)
- **RediseÃ±o del Hero en todas las vistas**:
  - Imagen de fondo completamente sin redondear (order-radius: 0 !important;) y de ancho completo edge-to-edge (width: 100vw;).
  - Degradado inferior multinivel (linear-gradient(to bottom, ...)) con transiciÃ³n suave y continua hacia el fondo de pÃ¡gina (ar(--tj-bg)), eliminando bordes duros o encuadres de tarjeta.
  - Reordenamiento editorial Apple de la informaciÃ³n: pÃ­ldora de categorÃ­a, gran tÃ­tulo editorial balanceado, lead curado, insignias de capacidad, franja horizontal minimalista de mÃ©tricas, botones de llamada a la acciÃ³n y barra de redes sociales con Ã­conos circulares uniformes.
- **Slider de Paquetes Apple Pro dentro de Acordeones (PortfolioCategoryAccordionComponent)**:
  - Reemplazo de vistas rÃ­gidas por un carrusel tÃ¡ctil fluido inspirado en Apple Store / Apple Keynotes.
  - Tarjetas ocupando el **90% del ancho del contenedor** (lex: 0 0 90%) permitiendo que la siguiente tarjeta asome sutilmente en el margen derecho como estÃ­mulo visual.
  - FotografÃ­a 16:9 con badges de autor, tÃ­tulo y lema editorial, caja de inversiÃ³n transparente, lista de entregables con marcas de verificaciÃ³n Apple, y botones de acciÃ³n rÃ¡pida.
  - Controles de navegaciÃ³n Apple: botones circulares translÃºcidos con desenfoque de cristal [ â€¹ ] y [ â€º ], y fila de puntos de paginaciÃ³n interactivos con expansiÃ³n activa tipo pÃ­ldora.
- **ValidaciÃ³n Automatizada**:
  - 99/99 pruebas de viewport en Google Chrome Headless CDP superadas sin overflow horizontal (320pxâ€“1440px).
  - CompilaciÃ³n de producciÃ³n: 
pm.cmd run build exitosa (cÃ³digo 0).

### Tarjetas de Paquetes al 100% (Una Activa) & Contraste Total en Tema Claro (Rama rediseño)
- **Slider de Paquetes Apple Pro con Tarjeta Única Activa**:
  - Ajuste de las tarjetas de paquetes (`.tj-apple-card`) a ancho completo del contenedor (`flex: 0 0 100%; width: 100%; max-width: 100%; min-width: 100%; scroll-snap-align: center;`) tanto en móvil como en pantallas grandes.
  - Se visualiza y activa con total protagonismo exactamente una sola tarjeta por slide (`ratio: 0.994–0.998`), con scroll snap suave y botones de navegación Apple.
  - Distribución responsiva interna: cuadrícula de 2 columnas para entregables en pantallas intermedias y escritorio (`min-width: 640px`), y botones de acción lado a lado (`min-width: 520px`).
  - Extracción y centralización del sistema de slider en `src/styles/_apple-slider.scss` compartido entre acordeones de categorías y páginas de video.
- **Auditoría y Corrección de Contraste en Tema Claro (`[data-theme='light']`)**:
  - Eliminación de todos los colores fijos crema/blanco (`rgba(246, 241, 232, ...)`, `#ffffff`) en textos sobre fondos claros.
  - Sustitución por variables semánticas: `var(--portfolio-muted, var(--tj-text-secondary))` para leads y descripciones, y `var(--tj-text-tertiary)` para etiquetas de métricas y metadatos.
  - Ajuste del acento dorado en modo claro a `--tj-gold: #855800` (contraste superior a 6.5:1 sobre blanco, superando WCAG AAA).
  - Inversión cromática de íconos sociales SVG a negro/carbón (`filter: brightness(0); opacity: 0.85;`) en modo claro.
  - Adaptación de tarjetas y paneles en `/portfolio/grados` y paquetes preboda con bordes y fondos superficiales adaptativos (`var(--tj-border)`, `var(--tj-surface-hover)`).
- **Validación Automatizada en Google Chrome CDP**:
  - Auditoría de contraste ejecutada sobre todas las rutas principales (`/portfolio`, `/portfolio/bodas`, `/portfolio/sesiones`, `/portfolio/video`, `/portfolio/grados`, `/portfolio/paquetes/...`).
  - 100% de rutas aprobadas con 0 elementos de bajo contraste detectados.
  - Compilación de producción `npm.cmd run build` exitosa con código 0.

### Swipe Automático Cada 5s & Indicador Visual de Primera Visita (Rama rediseño)
- **Desplazamiento Automático (Autoplay) cada 5 segundos**:
  - Implementación de temporizador de 5000ms en los sliders de paquetes (`PortfolioCategoryAccordionComponent` y `VideoPageComponent`).
  - Navegación circular fluida: al llegar al último paquete, el slider vuelve automáticamente al primero sin interrupción.
  - Pausa inteligente en interacciones: se congela cuando el usuario posa el ratón encima (`mouseenter`), toca la pantalla (`touchstart`) o desliza manualmente, reanudando suavemente tras 2 segundos de inactividad para no interrumpir la lectura.
  - Pausa automática al colapsar el acordeón o salir de la pestaña del navegador para optimizar el rendimiento de la CPU.
- **Indicador Visual de Bienvenida para Invitación al Swipe**:
  - Píldora de diseño Apple con efecto de cristal esmerilado (`.tj-apple-swipe-cue`), ícono animado de mano deslizante (`tjSwipeHandShake`), flechas flotantes laterales y microcopy *"Desliza para explorar paquetes"*.
  - Barra de progreso temporal de 5 segundos (`.tj-apple-swipe-cue__progress`) que muestra visualmente la cuenta regresiva antes de que el slider avance solo.
  - Gestión de estado en sesión (`sessionStorage.getItem('tj_swipe_cue_seen')`): se presenta al primer ingreso y se desvanece suavemente tan pronto el usuario desliza, interactúa o transcurre el primer ciclo, garantizando una experiencia limpia y nada invasiva.
  - Accesibilidad garantizada con soporte de `prefers-reduced-motion: reduce`.
- **Validación**:
  - Verificación en Google Chrome Headless CDP comprobando el avance automático del contador `01` a `02` tras 5.5s y la desaparición natural del indicador.
  - Compilación de producción `npm.cmd run build` exitosa con código 0.

### Slider Híbrido Web (2–3 Paquetes) / Mobile (100%), Cápsula Unificada & Modo Claro Marfil (Rama rediseño)
- **Slider Adaptativo según Dispositivo**:
  - **Móvil (< 768px)**: Mantiene 1 solo paquete activo que ocupa el 100% del ancho del contenedor (`flex: 0 0 100%; width: 100%`) para garantizar lectura y usabilidad vertical completa sin desbordamiento.
  - **Escritorio Web (>= 768px / >= 1100px)**: Muestra de **2 a 3 paquetes visibles simultáneamente** (`cardsVisible: ~2.75` a 1200px) con el paquete activo en primer plano y los adyacentes a los lados con escala y opacidad sutil (`0.68 -> 1.0`), permitiendo navegar tanto por deslizamiento, clic en tarjetas laterales o con el nuevo controlador.
- **Cambiador de Slider en Cápsula Unificada (Fiel a Referencia)**:
  - Diseño en píldora flotante integrada (`.tj-slider-capsule`) inspirada en la referencia provista:
    - Botón circular izquierdo (`44x44px`) con flecha `←`.
    - Fila de puntos con indicador activo en forma de píldora alargada naranja brillante (`#FF4D00`, `32x11px`) con sutil resplandor cálido (`box-shadow: 0 0 14px rgba(255, 77, 0, 0.75)`).
    - Botón circular derecho (`44x44px`) con flecha `→`.
    - Cápsula en cristal esmerilado con borde fino translúcido, ubicada en posición central ergonómica bajo el carrusel.
- **Rediseño del Modo Claro (Anti-Glare / Warm Editorial Alabaster)**:
  - Sustitución del blanco puro chillón `#FFFFFF` de fondo de página por un tono marfil/alabastro cálido (`--tj-bg: #F7F6F2`, `--portfolio-bg: #F7F6F2`), inspirado en diseño editorial y alta gama Apple.
  - El blanco puro `#FFFFFF` se reserva exclusivamente para las tarjetas y paneles elevados, creando jerarquía visual y profundidad natural.
  - Paneles interiores de acordeones en tono anidado suave (`#FAF9F5`), eliminando la sensación plana y monótona.
  - Transición suave del degradado en el Hero en modo claro, integrándose sin cortes ni contrastes turbios.
  - Textos en carbón profundo (`#171718` y `#48484B`) y acento dorado de alto contraste (`#8E5A00`).
- **Validación Automatizada y Compilación**:
  - Capturas y mediciones en Google Chrome Headless CDP confirmando `cardsVisible: 2.75` en 1200px y `100%` en 390px, con activación de cápsula unificada.
  - Compilación de producción `npm.cmd run build` 100% exitosa (código 0).

### Corrección de Superposición de Texto, Layout Web 3 Paquetes Iniciales y Movilidad a Elección del Usuario (Rama rediseño)
- **Corrección Definitiva de Superposición (+ viáticos vs INVERSIÓN)**:
  - Reestructuración de `.tj-apple-card__price-panel` organizando la etiqueta `INVERSIÓN` como encabezado superior (`.tj-apple-card__price-label`, tipografía monoespaciada en mayúsculas, tracking amplio).
  - Colocación del monto de inversión y la píldora flotante `+ viáticos` (`.tj-viaticos-pill`, tono ámbar con borde luminoso) en una fila dedicada (`.tj-apple-card__price-row`) con flujo natural `flex-wrap: wrap` y separación garantizada de `gap: 10px`.
  - Verificación milimétrica por CDP comprobando `overlap: false` con distancia vertical de 44px entre etiqueta y monto, garantizando cero superposición en móvil, tablet y escritorio.
- **Vista Web Inicial con Mínimo 3 Paquetes (Izquierda, Centro, Derecha)**:
  - Configuración responsive de tarjetas en desktop (`@media (min-width: 1024px)`): `--tj-slider-card-w: calc((100% - 48px) / 3)` con `gap: 24px`.
  - En la carga inicial de cada carrusel con 3 o más colecciones, se presentan de forma visible y balanceada los 3 primeros paquetes:
    - Primer paquete ubicado a la izquierda (`x = 73px`).
    - Segundo paquete centrado (`x = 452px`).
    - Tercer paquete ubicado a la derecha (`x = 832px`).
    - Paquetes adicionales (`04`, `05`...) esperando fuera del margen listos para ser explorados.
  - Se eliminaron márgenes ficticios que forzaban una sola tarjeta en el centro, permitiendo que la composición editorial aproveche todo el contenedor con máxima legibilidad (opacidad al 100% en las 3 tarjetas visibles).
- **Movilidad a Elección del Usuario (Sin Avance Automático Forzado)**:
  - Se removió el temporizador de avance automático forzado para permitir una lectura tranquila y sin interrupciones del contenido comercial.
  - La interacción queda 100% en manos del usuario mediante:
    - Desplazamiento táctil fluido (swipe en móvil y tablet).
    - Arrastre natural con cursor (`cursor: grab / grabbing`).
    - Clic directo en cualquiera de las tarjetas visibles.
    - Botones de navegación circular (`←` y `→`) y selector de píldoras en la cápsula.
- **Cápsula Flotante de Control con Resplandor Neón Naranja**:
  - Píldora activa con resplandor neón difuso (`box-shadow: 0 0 16px rgba(255, 77, 0, 0.85), 0 0 30px rgba(255, 77, 0, 0.45)`) idéntico a la referencia visual entregada.
  - Espaciado ergonómico (`padding: 0 16px; gap: 12px`) entre los botones circulares y los puntos indicadores.
- **Validación Automatizada y Compilación**:
  - Auditoría de Chrome Headless CDP validando el despliegue de 3 tarjetas a 1280px y 0 solapamientos en 390px, 768px y 1280px.
  - Compilación de producción `npm.cmd run build` exitosa con código 0.
