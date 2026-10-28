# TECNOJACK Galleries — FULL FIGMA PARITY PACKAGE

Esta versión se reconstruyó usando como fuente primaria el código real devuelto por Figma Make (`App.tsx`), no solo una interpretación visual.

## Alcance incluido

### 1. Gallery List
- Encabezado y copy exactos.
- 4 KPIs.
- búsqueda y filtro de estados.
- cards con cover, estado, título, métricas, metadata, previews y menú contextual.
- acciones Abrir / Vista cliente / Editar / Duplicar / Copiar enlace / Archivar-Restaurar.
- wizard Nueva Galería de 4 pasos.
- estados Draft / Preparing / Ready / Published / Selection Required / Selection Submitted / Delivered / Expired / Archived.

### 2. Gallery Builder
- top toolbar.
- estado y alerta de selección enviada.
- Preview cliente / Compartir / Publicar / Despublicar.
- workspace de 3 paneles.
- colecciones, crear/eliminar/seleccionar.
- canvas masonry.
- selección múltiple y acciones Mover / Portada / Eliminar.
- inspector General / Acceso / Entrega.
- uploader + cola.
- Media Library picker.
- Publish flow.
- Selection Review.
- confirmaciones y feedback.

### 3. Client Gallery
- portada cinematográfica.
- access gate / password / expiración.
- navegación por colecciones.
- favoritos.
- modo selección con límite.
- masonry.
- lightbox fullscreen + teclado.
- revisión de selección.
- confirmación de envío.
- estado submitted.
- descarga de foto / alta resolución / ZIP.
- preparing / ready.
- responsive desktop/tablet/mobile.

### 4. Componentes adicionales
- `gallery-feedback.component.ts`: toast/feedback visual consistente con Figma.
- `gallery-state.component.ts`: empty/loading/error.
- `gallery-figma-tokens.scss`: contrato visual del feature.

## Carpeta `_figma-reference`
Contiene los tres bloques React reales extraídos del Figma Make. No son para compilar en Angular: sirven para auditar texto por texto, acción por acción y vista por vista.

## Integración
1. Sustituir los archivos homónimos actuales del feature Galleries.
2. Importar `gallery-figma-tokens.scss` una sola vez en el stylesheet raíz del feature o ERP.
3. Mantener Montserrat + Inter.
4. Conservar los tokens globales `--erp-*`; los estilos existentes ya los reutilizan.
5. Si se desea feedback sin `window.confirm`, importar `GalleryFeedbackComponent`/`GalleryFeedbackService` y montar `<tj-gallery-feedback />` una vez en el shell de Galleries.

## Criterio de aceptación
No validar solo la pantalla inicial. Recorrer:
Gallery List → New Gallery steps 1-4 → Builder → cada inspector → Upload → Media Library → Publish → Client Preview → Favorites → Selection → Review → Submit → Download → responsive.
