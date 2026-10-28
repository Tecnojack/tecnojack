# Arquitectura frontend objetivo

## Estado observado

El producto usa Angular 17.3, TypeScript 5.4, componentes standalone, `bootstrapApplication`, Router con `loadComponent`/`loadChildren`, RxJS y AngularFire. No usa NgRx ni Angular Material. La aplicación actual mezcla sitio público, portafolio, invitaciones, contratos, CMS y administración, pero ya tiene separación básica en `core`, `shared`, `services` y `features`.

## Contextos del sistema

| Contexto | Función | Autoridad |
| --- | --- | --- |
| Angular `D:\TECNOJACK` | Producto ejecutable y funcionalidades actuales | Fuente técnica del frontend |
| React/Figma Make | Referencia visual, UX, estados y flujos del ERP | Especificación, no código productivo |
| NestJS `D:\TECNOJACK WORKSPACE` | Backend futuro, dominios y API | Contratos HTTP/OpenAPI, no Prisma |

## Arquitectura incremental

```text
src/app/
  core/       infraestructura y adaptadores singleton
  shared/     UI, directivas, pipes, tipos y utilidades agnósticos
  shell/      layouts public, ERP, portal, gallery, invitation y auth
  features/   capacidades por dominio
```

La estructura existente se conserva. `shell/` y los nuevos dominios se agregan únicamente cuando comienza su fase. Cada feature podrá contener `pages`, `components`, `data-access`, `models` y rutas, pero solo las carpetas que tengan contenido real.

## Capas de una feature

```text
Page / feature components
        ↓
Facade o application service
        ↓
Repository/port del frontend
        ↓
Firebase adapter | HTTP API adapter | mock explícito
```

Los componentes no conocerán Firestore, Storage, Prisma ni DTO internos del backend. Durante la convivencia, los adaptadores actuales de Firebase siguen funcionando; el API NestJS se incorpora por feature y con mapeadores entre DTO y view model.

## Estado y formularios

- Signals y `computed` para estado de vista y feature de alcance local.
- RxJS para streams, HTTP, Firebase y coordinación asíncrona.
- Reactive Forms tipados para CRM, eventos, cotizaciones, contratos, pagos y administración.
- No introducir NgRx hasta demostrar estado compartido complejo, trazabilidad o coordinación transversal que lo justifique.

## Experiencias

- Public: rutas y navegación actuales, sin ERP shell.
- ERP: futuro prefijo `/app`, shell propio y dominios lazy.
- Client Portal: futuro `/portal`, identidad visual orientada al cliente.
- Client Gallery: futuro `/gallery/:token`, independiente del ERP.
- Invitations: conservar URLs actuales y layout inmersivo.
- Auth: layout independiente; reutiliza autenticación existente mediante abstracción.

## Restricciones de evolución

- No eliminar funcionalidades ausentes en React.
- No modificar rutas dinámicas de invitaciones sin pruebas de precedencia.
- No construir todos los componentes shadcn/Radix en Angular.
- No usar el gran `App.tsx` como modelo arquitectónico: se descompone por dominio y caso de uso.

