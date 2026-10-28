# Mapa funcional Angular ↔ Backend TECNOJACK

Fuente backend: `D:\TECNOJACK WORKSPACE\src\modules`.

## Principio de integración

- Angular conserva estado de UI mediante Signals.
- Cada dominio expone una facade de aplicación.
- La facade seleccionará un adapter mock/local mientras la API no esté disponible y un adapter HTTP al habilitar el backend.
- Ningún componente se conecta directamente a Prisma, Firebase o controladores NestJS.

## Correspondencia por vista

| Vista Angular | Recurso backend | Operaciones principales |
|---|---|---|
| Personas / CRM | `/persons`, `/organizations` | crear, listar, consultar, actualizar, eliminar y restaurar contactos |
| Pipeline | `/crm/opportunities` | crear oportunidad, cambiar etapa, convertir, cotizar, registrar actividad y completar tareas |
| Cotizaciones | `/crm/opportunities/:id/quotations` | crear, aprobar y rechazar cotizaciones dentro de una oportunidad |
| Eventos | `/events` | crear, listar, editar, activar, cambiar fase, completar, cancelar, restaurar y añadir sesiones |
| Producción | Eventos + Entregables + Media | board derivado de fase del evento, sesiones, responsables, activos y entregables |
| Contratos | `/contracts` | crear, editar, publicar, ejecutar, versionar, añadir partes, eliminar y restaurar |
| Pagos | `/payments` | crear plan, registrar transacciones/cuotas, marcar vencido, eliminar y restaurar |
| Media | `/media-assets` | registrar, listar, consultar, actualizar, eliminar y restaurar activos |
| Galerías | `/galleries` | crear, publicar, despublicar, administrar álbumes y asociar/quitar activos |
| Entregables | `/deliverables` | crear, editar, marcar listo/entregado, administrar items y restaurar |
| Invitaciones | `/invitations` | crear, duplicar, publicar, secciones, agenda, invitados y RSVP |
| Portal Cliente | `/client-portal/events/:eventIdentifier/*` | dashboard, resumen, timeline, galerías y entregables del cliente |
| Administración | `/admin`, `/access` | settings, feature flags, catálogos, widgets, roles, permisos, sesiones y API keys |
| Configuración | `/admin/settings` | consultar y actualizar configuración global |

## Estado actual

- API prevista: `http://localhost:3000/api/v1`.
- El backend no está escuchando actualmente en el puerto `3000`.
- El shell Angular ya expone búsqueda global, creación contextual y diálogos de acciones.
- Mientras la API esté desconectada, las confirmaciones se mantienen como borradores locales y muestran el endpoint futuro; no simulan una persistencia inexistente.

## Orden de conexión recomendado

1. Personas y organizaciones.
2. Oportunidades, actividades, tareas y cotizaciones.
3. Eventos y sesiones.
4. Contratos y pagos.
5. Media, galerías y entregables.
6. Invitaciones y Portal Cliente.
7. Administración, roles y configuración.
