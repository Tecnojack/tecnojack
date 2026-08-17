# TECNOJACK — guía de trabajo para agentes

## Contexto

- `D:\TECNOJACK` es el frontend Angular productivo y el único destino de esta migración.
- `C:\Users\Jackson Palacios\Downloads\TECNOJACK ERP IA` es una referencia React/Figma Make de UX, pantallas y diseño. Es solo lectura y su código no se copia literalmente.
- `D:\TECNOJACK WORKSPACE` es el backend NestJS/PostgreSQL previsto. Es solo lectura desde este repositorio; sus contratos HTTP/OpenAPI orientan el frontend futuro.

## Reglas innegociables

- Preservar sitio público, portafolio, invitaciones, contratos, CMS, administración, Firebase y URLs existentes.
- No hacer big-bang rewrite, no reemplazar `src/app`, no incrustar React, JSX o iframes.
- Implementar cambios incrementalmente y por dominio en Angular idiomático.
- Mantener separadas las experiencias pública, ERP, portal, galería, invitación y autenticación.
- No acoplar nueva UI a Firebase ni Prisma. Usar facades/servicios de aplicación y adaptadores.
- No crear features vacías ni una biblioteca completa antes de necesitarla.
- No modificar los dos repositorios de referencia desde este workspace.

## Arquitectura

- `core/`: infraestructura singleton, autenticación, configuración y adaptadores globales.
- `shared/`: UI y utilidades sin conocimiento de negocio.
- `shell/`: layouts y navegación de cada experiencia.
- `features/`: capacidades organizadas por dominio y cargadas de forma lazy cuando corresponda.
- Signals para estado local/derivado; RxJS para Firebase, HTTP y flujos asíncronos; Reactive Forms tipados para formularios complejos.

## Git y validación

- Trabajar en una rama de feature; nunca hacer reset de trabajo ajeno ni merge/push sin solicitud.
- Revisar `git status` antes y después de cada bloque.
- Ejecutar `npm.cmd run build` después de cambios de aplicación.
- Ejecutar `npm.cmd test -- --watch=false --browsers=ChromeHeadless` cuando el entorno tenga Chrome.
- No existe script de lint actualmente; no afirmar que lint pasó.
- Actualizar `docs/migration/IMPLEMENTATION_STATUS.md` al completar cada fase.

## Convenciones de migración

- React define intención visual y funcional; Angular define arquitectura y producción.
- Datos demo deben vivir en mocks identificables, nunca en componentes de producción.
- Preservar accesibilidad WCAG 2.2 AA, responsive 1440/1024/390 y lazy loading.
- Antes de cambiar rutas, Firebase o contratos, registrar impacto, compatibilidad y plan de rollback.

