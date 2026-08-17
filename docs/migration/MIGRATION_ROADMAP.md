# Roadmap incremental de migración

## Estrategia

Aplicar strangler pattern: mantener todas las superficies Angular existentes y añadir el ERP bajo un prefijo aislado. Cada fase debe incluir compatibilidad, build, pruebas relevantes, responsive y actualización de estado.

| Fase | Alcance | Gate de salida |
| --- | --- | --- |
| 0 Audit | Git, baseline, arquitectura, mapping y riesgos | Documentos revisados; cero cambios funcionales |
| 1 Foundation | Tokens ERP scoped, tipografía, shell, navegación responsive, `/app` y primitivos mínimos | Rutas existentes intactas, shell usable 1440/1024/390 |
| 2 Identity + People | Abstracción de auth, tenant/studio, personas y clientes | Permisos y adapters definidos; sin romper AngularFire |
| 3 CRM + Events | oportunidades, pipeline y evento | Contratos API verificados, transiciones y estados probados |
| 4 Commercial | cotización, contrato y pago | Firma actual preservada, cálculos y permisos validados |
| 5 Production | workspace, crew, equipment, schedule, call sheet, shot list | Flujos operativos y móvil de campo |
| 6 Media | library, upload, procesamiento y Storage boundary | Reintentos, permisos, archivos grandes y compatibilidad |
| 7 Galleries | manager, builder, colecciones y publicación | No duplicación de assets, preview y privacidad |
| 8 Client experience | portal, gallery, favoritos, selecciones y entregables | Layout independiente y acceso por token/cuenta |
| 9 Communication | invitaciones y notificaciones | URLs históricas y RSVP sin regresión |
| 10 Administration | usuarios, roles, permisos, catálogos, auditoría y reportes | Autorización contextual y operaciones auditables |

## Preparación de Fase 1

1. Crear estilos Orbit exclusivamente bajo el host ERP.
2. Añadir `shell/erp` y una pantalla placeholder funcional, no dominios vacíos.
3. Registrar `/app` antes de las rutas dinámicas de invitación.
4. Implementar sidebar/topbar/mobile nav con Angular CDK y semántica accesible.
5. Crear solo button, icon button, badge y card si el shell realmente los necesita.
6. Verificar las URLs actuales y comparar capturas responsive.

## Bloqueos antes de integrar backend

- Confirmar rama consolidada y estado limpio del backend.
- Generar/revisar OpenAPI ejecutable y autorización por endpoint.
- Resolver política de identidad entre Firebase Auth y NestJS; no asumir sustitución.
- Definir configuración de URL API por entorno sin exponer secretos.

