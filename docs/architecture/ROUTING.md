# Routing y compatibilidad de URLs

## Estado actual

El router standalone carga casi todas las páginas de forma lazy. Las rutas públicas incluyen `/brand`, `/portfolio/**`, `/soluciones`, `/otros`, `/clientes`, `/contratar`, `/media-admin` e invitaciones. Al final existen rutas dinámicas muy amplias `/:wedding...`, seguidas por `**`.

## Riesgo principal

Cualquier ruta nueva de primer nivel debe declararse antes de `:wedding`; de lo contrario será interpretada como invitación. Cambiar el orden o semántica de estas rutas puede romper enlaces compartidos externamente.

## Evolución objetivo

| Superficie | Prefijo objetivo | Estrategia |
| --- | --- | --- |
| Sitio público | rutas actuales | KEEP |
| ERP | `/app/**` | NEW, lazy y antes de rutas dinámicas |
| Portal cliente | `/portal/**` | NEW/MERGE; preservar `/clientes/**` |
| Galería privada | `/gallery/:token` | NEW |
| Invitaciones | actuales y futuro `/invitation/:slug` | ADAPT con compatibilidad |
| Auth | `/auth/**` | NEW/ADAPT |

La Fase 1 añadirá inicialmente solo el contenedor `/app` y su shell, sin redirects desde `/admin` o `/media-admin`. Cada dominio tendrá su archivo de rutas y se cargará cuando se implemente.

## Reglas

- No reutilizar `/admin`: hoy redirige a `/media-admin` y puede estar enlazado.
- Mantener deep links tras autenticación.
- Distinguir 401, 403, 404 y recursos archivados; no redirigir silenciosamente a dashboard.
- Usar guards/adaptadores existentes antes de crear reemplazos.
- Probar una matriz de URLs públicas antes de integrar cada bloque de rutas.

