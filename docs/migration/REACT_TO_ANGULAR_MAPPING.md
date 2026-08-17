# Matriz React → Angular

## Criterio

React/Figma Make es especificación visual. El prototipo central tiene 3.182 líneas en `App.tsx`, navegación por estado local, datos demo y componentes shadcn/Radix. Por eso `ADAPT` y `REBUILD` significan reimplementar, no convertir código.

| React Screen/Component | Angular Existing Equivalent | Action | Destination | Risk |
| --- | --- | --- | --- | --- |
| ERP Shell, Sidebar, Topbar, command palette | No equivalente integral | NEW | `shell/erp` | Alto: responsive, permisos y rutas |
| Dashboard | Métricas parciales en admin | REBUILD | `features/dashboard` | Medio: datos hoy simulados |
| Eventos | Invitaciones/wedding y solicitudes no equivalen al workspace | NEW | `features/events` | Alto: agregado central y API |
| CRM / Personas | Clientes públicos y admin de clientes | MERGE | `features/people`, `features/crm` | Alto: evitar duplicar Client/Person |
| Pipeline Kanban | No equivalente | NEW | `features/crm` | Medio: transiciones y drag/drop accesible |
| Cotizaciones + builder | Paquetes/solicitudes, sin builder ERP | NEW | `features/quotations` | Alto: precios y versionado |
| Contratos + firma | Feature contracts y `/contratar/:token` | KEEP/ADAPT | `features/contracts` | Alto: flujo productivo existente |
| Pagos | Sin feature dedicada | NEW | `features/payments` | Alto: precisión y permisos |
| Producción Kanban | No equivalente | NEW | `features/production` | Alto: modelo aún por consolidar |
| Call Sheet | No equivalente | NEW | `features/production` | Medio |
| Shot List | No equivalente | NEW | `features/production` | Medio |
| Equipo | Sin ERP de crew | NEW | `features/crew` | Medio |
| Equipamiento | Sin ERP dedicado | NEW | `features/equipment` | Medio |
| Media Library/uploader | `media-admin`, Storage y servicios media | MERGE | evolución de `features/media-admin`/nuevo `media` | Alto: Storage y permisos |
| Galerías | Portfolio/client detail no es Gallery domain | NEW | `features/galleries` | Alto: dominio nuevo |
| Gallery Builder | No equivalente | NEW | `features/galleries` | Alto: interacción compleja |
| Client Gallery | Client detail/portfolio reutilizable parcialmente | ADAPT | `features/client-gallery` | Alto: tokens, privacidad, descargas |
| Entregables | Contratos/media relacionados, sin feature propia | NEW | `features/deliverables` | Alto |
| Invitaciones | Varias features Angular productivas | KEEP/MERGE | features de invitación existentes | Alto: URLs compartidas |
| Portal Cliente | `/clientes/**` público, sin portal integral | NEW/MERGE | `features/client-portal` | Alto: auth y proyecciones |
| Administración | CMS/admin/media-admin existentes | KEEP/ADAPT | features actuales + módulos graduales | Alto: no sustituir CMS |
| Configuración | No equivalente integral | NEW | `features/settings` | Medio |
| Login/registro/onboarding React | Auth AngularFire en admins | ADAPT | `core/auth`, futuro `features/auth` | Alto: múltiples superficies |
| Notificaciones | Sin centro global | NEW | `core/notifications` + feature | Medio |
| Cards, badge, tabs, dialog, drawer | Implementaciones locales/CDK parciales | ADAPT | `shared/ui`, solo bajo demanda | Medio |
| Tables, pagination, filter bar | Patrones locales | ADAPT | `shared/ui` + componentes de dominio | Medio |
| Calendario | `angular-calendar` instalado | REUSE/ADAPT | events/production | Medio |
| Charts Recharts | No biblioteca Angular de charts | REBUILD | dashboard/reportes | Medio: elegir después de requisitos |
| Tokens Orbit | Estilos globales propios del sitio | MERGE | estilos scoped del ERP | Alto: evitar fuga al sitio público |
| Empty/loading/error states | Componentes y patrones dispersos | ADAPT | `shared/ui` | Bajo |
| Quick actions móvil | Speed dial público existente, propósito diferente | REBUILD | ERP shell móvil | Medio |

## Elementos que no se migran

- React Router, hooks, Context, JSX y estado dentro de `App.tsx`.
- MUI, Radix, shadcn, Tailwind y Recharts como copia automática.
- Arrays demo como datos productivos.
- Duplicados/variantes exploratorias (`Dashboard*`, `Clients*`, `Productions*`) sin seleccionar primero la especificación canónica.

