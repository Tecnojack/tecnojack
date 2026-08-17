# Estado de implementación de la migración ERP

Última actualización: 2026-08-12.

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

- Build: `npm.cmd run build` — exitoso.
