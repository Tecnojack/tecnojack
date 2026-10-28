# Estrategia de estado

## Decisión

No se introduce NgRx en la fundación. Angular 17 ofrece Signals para estado síncrono de UI y RxJS ya forma parte de los servicios Firebase y flujos asíncronos.

## Selección por necesidad

| Necesidad | Herramienta |
| --- | --- |
| Estado local, selección, panel abierto, filtros | Signal |
| Estado derivado | `computed` |
| Efecto de UI delimitado | `effect` con cleanup |
| HTTP, Firebase, eventos y composición async | RxJS |
| Formularios complejos | Reactive Forms tipados |
| Estado representable en URL | Router params/query params |
| Caché/datos de feature | Facade o feature store ligero |

## Límites

- No globalizar estado de una pantalla.
- No mantener dos fuentes de verdad entre formulario y signal.
- No transportar los `useState`/`useEffect` del React uno a uno.
- No almacenar DTO del backend directamente si la vista necesita otro contrato.
- Los mocks del prototipo serán adaptadores temporales identificados y sustituibles.

NgRx solo se reconsiderará con evidencia: edición colaborativa compleja, múltiples features escribiendo el mismo agregado, historial/undo transversal o requisitos fuertes de depuración y efectos.

## Aplicación en People

`PeopleDirectoryFacade` mantiene búsqueda y filtro mediante Signals, deriva resultados/totales con `computed` y recibe la colección heredada como Observable mediante un port. La UI no conoce Firebase ni el modelo `Client`.
