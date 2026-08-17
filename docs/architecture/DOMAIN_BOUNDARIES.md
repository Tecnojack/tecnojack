# Límites de dominio del frontend

## Mapa objetivo

| Dominio frontend | Responsabilidad | Backend futuro |
| --- | --- | --- |
| identity | sesión, usuario, permisos, tenant | `/auth`, `/access` |
| people / CRM | personas, organizaciones, leads y oportunidades | `/persons`, `/organizations`, `/crm/opportunities` |
| events | evento como eje operativo | `/events` |
| production | readiness, tareas, call sheet, shot list | contrato por consolidar |
| crew / equipment | asignaciones y recursos | contrato por consolidar |
| contracts | documentos y firma | `/contracts` |
| payments | obligaciones, pagos y conciliación | `/payments` |
| media | asset audiovisual y metadata | `/media-assets` |
| galleries | experiencia curada y colecciones | `/galleries` |
| deliverables | paquetes de entrega | `/deliverables` |
| invitations | diseño, invitados y RSVP | `/invitations` |
| notifications | avisos y acciones | `/notifications` |
| client portal | proyección autorizada para cliente | `/client-portal` |
| administration | usuarios, políticas, catálogos y CMS | `/admin` y `/access` |

## Reglas de propiedad

- Event es el eje, pero no es dueño de pagos, contratos, media o personas.
- Storage representa bytes; MediaAsset representa archivo y metadata; Gallery representa curaduría. Una GalleryItem referencia un MediaAsset y no duplica el archivo.
- El frontend consume contratos HTTP/OpenAPI. Nunca importa Prisma ni replica entidades internas sin adaptación.
- Un dominio no accede al repository de otro: consume una facade pública o un view model compuesto.
- Las capacidades Angular actuales de CMS, contratos, invitaciones y media se preservan hasta tener un reemplazo funcional validado.

## Compatibilidad temporal de People

El modelo Angular `Client` existente pertenece al portafolio: contiene servicio, slug público, carpeta de Storage, portada y conteo de galería. No se considera equivalente a `PersonResponseDto` del backend, que posee código, nombre estructurado, documentos, contactos, estado y auditoría.

Durante la Fase 2 se expone una proyección de solo lectura:

```text
ClientAdminService (Firebase heredado)
  → LegacyClientDirectoryAdapter
  → PeopleDirectoryPort
  → PeopleDirectoryFacade
  → People UI
```

La proyección oculta rutas de Storage y no permite editar. El futuro adaptador HTTP implementará el mismo port con `/persons`; la migración y deduplicación Client → Person requiere una decisión de datos separada.

## Compatibilidad temporal de Identity

El shell consume `ErpIdentityPort`, no Firebase Auth. El adaptador actual normaliza la sesión Firebase existente. No se activa guard de `/app` todavía porque falta acordar federación/intercambio de identidad con NestJS, claims, tenant y estrategia de transición. Esto evita bloquear el ERP con una política provisional.

## Certeza del backend

El workspace NestJS tiene documentación y una expansión local considerable sin consolidar. Sus ~140 rutas documentadas sirven para planificar, pero antes de integrar cada dominio se debe contrastar controlador ejecutable, OpenAPI generado, autorización y rama consolidada. No debe asumirse que todo el catálogo está listo para producción.
