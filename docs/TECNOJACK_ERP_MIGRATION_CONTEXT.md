# TECNOJACK ERP — contexto maestro y siguientes fases

Última actualización: 2026-08-12  
Repositorio productivo: `D:\TECNOJACK`  
Rama de trabajo: `feature/tecnojack-erp-frontend`

## 1. Propósito

Este documento permite continuar la migración del nuevo TECNOJACK ERP sin perder decisiones, límites ni estado de implementación.

El objetivo es incorporar progresivamente la experiencia diseñada en React/Figma Make dentro del producto Angular existente. No se realiza una conversión automática ni se reemplaza la aplicación actual. Angular sigue siendo el producto final y React funciona como especificación visual y funcional.

## 2. Los tres contextos del proyecto

### Frontend Angular productivo

Ruta: `D:\TECNOJACK`

Es la única aplicación que se modifica. Contiene el sitio público, portafolio, servicios, bodas, invitaciones, clientes, contratos, CMS, administración, media y Firebase.

### Referencia React/Figma Make

Ruta: `C:\Users\Jackson Palacios\Downloads\TECNOJACK ERP IA`

Es de solo lectura. Contiene la referencia visual del ERP, navegación, componentes, estados y flujos. No se copian JSX, hooks, React Router, Tailwind, Radix, shadcn, MUI ni estado React dentro de Angular.

Su implementación central está concentrada en un `App.tsx` de aproximadamente 3.182 líneas y utiliza datos simulados. Debe interpretarse como especificación, no como arquitectura productiva.

### Backend NestJS previsto

Ruta: `D:\TECNOJACK WORKSPACE`

Es de solo lectura desde este repositorio. Usa NestJS, Prisma y PostgreSQL. Su documentación y controladores orientan los futuros contratos HTTP/OpenAPI.

El workspace backend tiene numerosos cambios locales todavía no consolidados. No se debe asumir que todos sus endpoints están listos para producción sin revisar controladores, OpenAPI, autorización, migraciones y rama consolidada.

## 3. Estado técnico encontrado

- Angular 17.3 y TypeScript 5.4.
- Componentes standalone y `bootstrapApplication`.
- Routing lazy mediante `loadComponent` y `loadChildren`.
- AngularFire con Auth, Firestore y Storage.
- RxJS para flujos asíncronos.
- Angular CDK disponible.
- Font Awesome disponible.
- No existe NgRx.
- No existe Angular Material.
- No existe script de lint en `package.json`.

Las rutas dinámicas `/:wedding`, `/:wedding/:guest` y `/:wedding/:guest/:count` son especialmente sensibles. Toda nueva ruta de primer nivel debe declararse antes de ellas.

## 4. Estrategia arquitectónica

La migración utiliza strangler pattern:

```text
Angular existente
├── Sitio público
├── Portafolio y servicios
├── Invitaciones
├── Contratos
├── CMS y Media Admin
└── Nuevo ERP bajo /app
    ├── Shell
    ├── Dashboard
    ├── People
    └── Dominios futuros
```

Los componentes de UI no acceden directamente a Firebase, Firestore, Storage, Prisma ni controladores HTTP. La estructura esperada es:

```text
Page / Feature Component
        ↓
Facade / Application Service
        ↓
Frontend Port
        ↓
Firebase Adapter | HTTP Adapter | Mock explícito
```

Esto permite sustituir progresivamente Firebase por APIs NestJS sin reconstruir las pantallas.

## 5. Trabajo completado

### Fase 0 — Auditoría

- Estado Git y línea base revisados.
- Rama `feature/tecnojack-erp-frontend` creada desde `main` en `88675c1`.
- Angular, React y backend auditados.
- Arquitectura frontend documentada.
- Sistema visual y routing objetivo documentados.
- Matriz React → Angular creada.
- Roadmap y estado de implementación creados.
- `AGENTS.md` creado con reglas de preservación y validación.

### Fase 1 — Frontend Foundation

- Ruta lazy `/app` creada.
- `/app` redirige a `/app/dashboard`.
- Tema Orbit oscuro aislado mediante `.tj-erp` y `erp-route`.
- El travel shell público no se renderiza dentro del ERP.
- Tokens de color, superficie, texto, estados, bordes, radios y tipografía definidos.
- ERP Shell responsive implementado.
- Sidebar expandido, colapsado y drawer móvil implementados.
- Topbar, búsqueda visual, notificaciones preliminares y perfil implementados.
- Navegación inferior móvil implementada.
- Breadcrumbs implementados.
- Dashboard inicial implementado sin presentar datos demo como datos reales.
- Módulos no implementados aparecen deshabilitados.
- Iconografía Font Awesome reutilizada; no se agregó otra dependencia.

### Fase 2 — Identity + People, primer bloque

- `ErpIdentityPort` creado.
- `FirebaseErpIdentityAdapter` normaliza la sesión existente.
- `ErpIdentityFacade` desacopla el shell de Firebase Auth.
- No se agregó guard a `/app`; la política Firebase ↔ NestJS sigue pendiente.
- Ruta lazy `/app/people` creada.
- Directorio People responsive implementado.
- Búsqueda por nombre, servicio o ubicación.
- Búsqueda normalizada con y sin acentos.
- Filtro por estado publicado/borrador.
- Totales derivados mediante Signals.
- Vista tabla en escritorio y tarjetas en tablet/móvil.
- Creación y edición deshabilitadas hasta disponer de identidad, permisos y backend confiable.

## 6. Decisión importante sobre Client y Person

El modelo Angular `Client` actual pertenece al portafolio y contiene:

- slug público;
- tipo de servicio;
- carpeta de Storage;
- portada;
- conteo de galería;
- estado de publicación.

No equivale a `PersonResponseDto` del backend, que contiene:

- código de persona;
- nombre estructurado;
- documento;
- información de contacto;
- estado de dominio;
- auditoría.

Por eso no se renombró ni reutilizó `Client` como `Person`. La UI actual recibe una proyección de solo lectura:

```text
ClientAdminService
  → LegacyClientDirectoryAdapter
  → PeopleDirectoryPort
  → PeopleDirectoryFacade
  → PeopleDirectoryComponent
```

El adaptador oculta Storage y detalles de persistencia. La migración/deduplicación futura entre Client y Person debe diseñarse como una operación de datos independiente.

## 7. Rutas disponibles para revisión

Después de ejecutar `npm.cmd start`:

| Vista | URL |
| --- | --- |
| ERP | `http://localhost:4200/app` |
| Dashboard | `http://localhost:4200/app/dashboard` |
| Personas y clientes | `http://localhost:4200/app/people` |
| Sitio público | `http://localhost:4200/brand` |
| Portfolio | `http://localhost:4200/portfolio` |
| Media Admin | `http://localhost:4200/media-admin` |

## 8. Validación actual

Comandos:

```powershell
npm.cmd run build
npm.cmd test -- --watch=false --browsers=ChromeHeadless
```

Estado:

- Build exitoso.
- 22 de 23 pruebas aprobadas.
- Pruebas nuevas de ERP y People aprobadas.
- Un único fallo preexistente en `DestinationServiceComponent`: el test espera una redacción anterior.
- No hay script de lint.

Advertencias de build conocidas:

- Bundle inicial cercano a 1,20 MB y por encima del presupuesto configurado.
- SCSS de la invitación Diana/Juan excede su presupuesto.
- `pdf-lib` utiliza `pako` CommonJS.

Estas advertencias no fueron creadas por People y deben tratarse en un bloque técnico separado.

## 9. Reglas para continuar

- No modificar los proyectos React o backend desde este repositorio.
- No reemplazar Firebase sin una decisión explícita.
- No proteger `/app` hasta acordar la estrategia de identidad.
- No conectar componentes directamente a Firebase o HTTP.
- No importar modelos Prisma en Angular.
- No convertir datos demo del React en información productiva.
- No habilitar botones de creación o edición sin persistencia, validación y permisos reales.
- No romper rutas públicas ni cambiar el orden de las rutas dinámicas sin pruebas.
- Ejecutar build después de cada bloque.
- Ejecutar pruebas relevantes y comparar con el único fallo preexistente.
- Actualizar `docs/migration/IMPLEMENTATION_STATUS.md` después de cada avance.

## 10. Fase 2 — trabajo restante

### 2.1 Estrategia de identidad

Definir antes de implementar login ERP:

- si Firebase Auth seguirá siendo proveedor de identidad;
- si NestJS validará tokens Firebase o emitirá sesión propia;
- cómo se intercambiarán tokens;
- cómo se resolverán usuario, tenant, roles, permisos y claims;
- estrategia de refresh y logout;
- almacenamiento seguro de credenciales/tokens;
- recuperación y verificación de correo;
- transición de los logins actuales de admin y media-admin.

Criterio de salida: diagrama y ADR aprobados, contrato verificable y guard ERP sin romper los accesos actuales.

### 2.2 Adaptador HTTP de People

Preparar, pero no activar hasta consolidar backend:

- configuración de URL API por entorno;
- cliente HTTP tipado;
- DTOs frontend independientes de Prisma;
- mapeador `PersonResponseDto → PeopleDirectoryEntry`;
- paginación, búsqueda y filtros server-side;
- loading, empty, error y retry;
- manejo 401, 403 y errores de validación;
- pruebas de contrato.

Criterio de salida: `/persons` verificado contra OpenAPI/controlador y adapter intercambiable con la proyección heredada.

### 2.3 Migración Client → Person

- Detectar duplicados por identidad real, no únicamente por nombre.
- Conservar vínculos a galería y portafolio.
- No mover ni duplicar archivos de Storage.
- Registrar origen y trazabilidad.
- Definir rollback.

Criterio de salida: plan probado sobre una copia de datos y aprobado antes de cualquier escritura productiva.

### 2.4 CRUD People

Implementar después de identidad y backend:

- crear persona;
- ver detalle;
- editar;
- archivar/restaurar;
- contactos múltiples;
- organizaciones;
- permisos y auditoría.

## 11. Fase 3 — CRM + Events

### CRM

- Leads y oportunidades.
- Pipeline Kanban con alternativa accesible al drag and drop.
- Actividades, notas y responsables.
- Relación con Person/Organization sin duplicar información.
- Estados y transiciones gobernados por backend.

### Events

- Evento como eje operativo.
- Listado, calendario y detalle.
- Estado comercial separado del estado operativo.
- Cliente/persona y organización relacionados por referencia.
- Sesiones: petición, preboda, boda, postboda, civil u otras.
- Lugar, agenda, responsables y fechas.

Criterio de salida: contratos CRM/Events verificados, navegación lazy, permisos, responsive y pruebas de transición.

## 12. Fase 4 — Commercial

- Constructor de cotizaciones.
- Versionado y vigencia de propuestas.
- Contratos y firma.
- Pagos, obligaciones, anticipos y conciliación.
- Reutilizar el flujo `/contratar/:token` hasta disponer de reemplazo validado.
- No duplicar precios ni lógica comercial entre portafolio y ERP.

Criterio de salida: cálculos deterministas, firma actual preservada, permisos y trazabilidad financiera.

## 13. Fase 5 — Production

- Production Workspace.
- Crew y asignaciones.
- Equipamiento y disponibilidad.
- Schedule.
- Call Sheet.
- Shot List.
- Checklists y readiness.
- Flujo móvil para trabajo de campo.

Criterio de salida: estados operativos definidos, conflictos detectables y experiencia móvil utilizable.

## 14. Fase 6 — Media

- Media Library.
- Upload resiliente.
- Separación Storage/MediaAsset.
- Metadata, checksum, duplicados y procesamiento.
- Reintento/cancelación.
- Permisos de descarga y acceso.
- Reutilizar infraestructura existente de forma incremental.

Criterio de salida: archivos grandes, errores parciales y permisos verificados sin romper Media Admin.

## 15. Fase 7 — Galleries

- Gallery Manager.
- Gallery Builder.
- Collections configurables.
- Organización y selección de fotografías.
- Preview, publicación y configuración.
- GalleryItem referencia MediaAsset; no duplica archivos.

Criterio de salida: curaduría, privacidad y publicación probadas en escritorio y móvil.

## 16. Fase 8 — Client Experience

- Portal privado del cliente.
- Client Gallery con layout independiente.
- Cover, colecciones, grid y lightbox.
- Favoritos, selecciones, comentarios y descargas.
- Entregables y seguimiento.
- Acceso por cuenta o token según política.

Criterio de salida: no depender visualmente del ERP Shell y proteger correctamente datos privados.

## 17. Fase 9 — Communication

- Centro de notificaciones.
- Preferencias y acciones asociadas.
- Invitaciones digitales.
- Invitados y RSVP.
- Mantener todas las URLs de invitaciones actuales.

Criterio de salida: invitaciones existentes sin regresiones y notificaciones vinculadas a fuentes reales.

## 18. Fase 10 — Administration

- Usuarios.
- Roles y permisos.
- Policies y sesiones.
- API keys cuando corresponda.
- Catálogos.
- Auditoría.
- Configuración.
- Reportes y salud del sistema.
- CMS existente preservado hasta migración explícita.

Criterio de salida: autorización contextual, operaciones auditables y separación clara entre CMS público y administración ERP.

## 19. Prioridad inmediata recomendada

1. Revisar visualmente `/app/dashboard` y `/app/people` en 1440, 1024 y 390 px.
2. Registrar ADR de identidad Firebase ↔ NestJS.
3. Verificar OpenAPI/controladores de `/auth`, `/access`, `/persons` y `/organizations` en una rama backend consolidada.
4. Crear configuración HTTP por entorno y adapter People sin activarlo.
5. Implementar estados loading/error/retry antes del CRUD.
6. Probar una migración Client → Person sobre datos no productivos.
7. Solo después habilitar creación y edición.

## 20. Documentación relacionada

- `AGENTS.md`
- `docs/architecture/FRONTEND_ARCHITECTURE.md`
- `docs/architecture/DESIGN_SYSTEM.md`
- `docs/architecture/ROUTING.md`
- `docs/architecture/STATE_MANAGEMENT.md`
- `docs/architecture/DOMAIN_BOUNDARIES.md`
- `docs/migration/REACT_TO_ANGULAR_MAPPING.md`
- `docs/migration/MIGRATION_ROADMAP.md`
- `docs/migration/IMPLEMENTATION_STATUS.md`

## 21. Prompt breve para retomar

```text
Lee completamente AGENTS.md y docs/TECNOJACK_ERP_MIGRATION_CONTEXT.md.
Trabaja únicamente en D:\TECNOJACK y en la rama feature/tecnojack-erp-frontend.
Los proyectos React/Figma Make y NestJS son solo lectura.
Revisa git status y docs/migration/IMPLEMENTATION_STATUS.md antes de actuar.
Continúa desde la prioridad inmediata indicada en el contexto maestro.
Preserva todas las rutas y funcionalidades existentes.
Implementa un bloque incremental, ejecuta build y pruebas, y actualiza IMPLEMENTATION_STATUS.md.
```

