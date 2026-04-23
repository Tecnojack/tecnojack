# Informe general del proyecto

Fecha: 18 de abril de 2026

## Resumen ejecutivo

El proyecto está en una fase funcional y compilable sobre Angular 17, con una arquitectura híbrida que combina experiencia pública, panel admin y persistencia progresiva en Firebase sin romper el patrón Repository ni los modelos existentes.

Actualmente el sistema ya tiene:

- frontend público operativo para invitaciones, passport, wedding page y portfolio
- módulo admin autenticado con Firebase Auth
- CMS con store central y repositorios desacoplados
- persistencia progresiva en Firebase para colecciones clave del CMS
- subida de media a Firebase Storage
- portfolio público conectado a contenido dinámico del CMS
- base de edición visual sobre la experiencia pública del portfolio cuando el admin está autenticado

El build de producción compila correctamente. El proyecto mantiene warnings de budgets en estilos y bundle inicial, pero no errores fatales de compilación.

## Stack y base técnica

- Angular 17 standalone
- TypeScript estricto
- Angular Router
- AngularFire
- Firebase Auth
- Firestore
- Firebase Storage
- RxJS
- SCSS

Scripts principales definidos en package.json:

- npm run start
- npm run build
- npm run test
- npm run firebase:seed:cms
- npm run firebase:seed:cms:dry-run
- npm run firebase:seed:cms:reset
- npm run firebase:seed:weddings
- npm run firebase:seed:weddings:dry-run
- npm run firebase:seed:weddings:reset

## Estructura funcional del proyecto

### 1. Experiencia pública

La aplicación pública incluye varias experiencias visuales:

- invitación
- passport
- wedding page
- portfolio

El portfolio es hoy la parte más avanzada del sistema CMS porque ya no depende solo de datos estáticos, sino de contenido derivado desde el store del CMS y de Firebase.

### 2. Módulo admin

El admin ya cuenta con:

- login protegido con Firebase Auth
- dashboard
- CRUD para entidades CMS
- gestión de páginas, secciones, servicios, paquetes y media
- subida de archivos
- navegación hacia vistas públicas editables

La idea arquitectónica vigente es que el admin deje de ser el lugar donde “se diseña” el contenido y pase a ser más bien el punto de acceso, listado y gestión estructural, mientras la edición visual ocurre sobre la propia UI pública.

### 3. Datos y persistencia

La persistencia está desacoplada mediante contratos y repositorios. Eso permite mantener:

- compatibilidad con mock
- integración progresiva con Firebase
- store central reutilizable por admin y portfolio

Se preservó el patrón Repository y no se conectó Firestore directamente desde componentes visuales.

## Estado actual de Firebase

La integración con Firebase ya cubre piezas importantes del CMS:

- autenticación de admin
- repositorios Firebase para varias entidades del CMS
- adaptadores Firestore a modelos existentes
- subida de media a Storage
- scripts de seed para CMS y bodas/invitados

Estado operativo conocido:

- build exitoso
- el último intento de npm run firebase:seed:cms en terminal terminó con exit code 1 y no fue corregido en esta iteración

Eso significa que la capa de aplicación compila, pero el flujo de seed CMS todavía requiere revisión puntual si se quiere dejar operativo de extremo a extremo.

## Estado actual del portfolio

El portfolio ya está migrado a una capa de contenido dinámico más seria. Entre lo que ya quedó resuelto:

- páginas de categorías activas: bodas, quinces, grados y preboda
- vista de detalle de paquetes
- mapeo real de relaciones entre paquetes, servicios, adicionales y features
- corrección previa para que paquetes creados desde admin sí aparezcan bien en la vista pública
- headings y secciones principales obtenidas desde el CMS

Documentación relacionada ya existente:

- exports/portfolio-contenido-e-implementacion.md
- exports/portfolio-firebase-crud-admin.md
- exports/informe-implementacion-firebase.md

## Edición visual CMS en el portfolio

En esta fase se implementó una base real de edición visual sobre la página pública cuando el admin está autenticado.

### Lo que ya existe

- estado global de modo edición
- toolbar flotante de edición visual
- acciones inline reutilizables
- propagación del estado editable a shell y páginas del portfolio
- edición inline de varias secciones públicas
- edición de servicios sobre la propia landing
- edición de paquetes desde el modal público de detalle

### Secciones ya adaptadas

Se añadió capacidad de edición inline en varias secciones del portfolio público, entre ellas:

- hero
- about brand
- professional profile
- services
- gallery heading
- video heading
- contact

### Cambio importante en UX del modal de paquetes

La edición del paquete fue simplificada respecto a una versión previa más compleja.

Ahora el comportamiento es:

- al pulsar Editar se usa el mismo modal de detalle
- no aparece un panel alterno separado
- el mismo layout del detalle pasa a modo editable
- la imagen principal del paquete se puede cambiar desde el mismo modal
- las secciones como Qué incluye, Cobertura del evento, Entregables y Extras incluidos funcionan con selección simple por clic
- el botón Añadir abre opciones disponibles para agregarlas a la sección correspondiente
- los elementos seleccionados se pueden quitar también con un clic

Este enfoque está alineado con el objetivo definido para el proyecto: evitar duplicar UI de edición y aprovechar la misma interfaz pública como superficie editable.

## Servicios técnicos clave ya creados o reforzados

### Capa admin / CMS

- src/app/features/admin/services/mock-cms-store.service.ts
- src/app/features/admin/services/cms-visual-editor.service.ts
- src/app/features/admin/firebase/admin-auth.service.ts
- src/app/features/admin/firebase/admin-auth.guard.ts
- src/app/features/admin/firebase/firebase-cms-media-upload.service.ts

### Capa portfolio

- src/app/features/portfolio/services/portfolio-content.service.ts
- src/app/features/portfolio/portfolio-page.component.ts
- src/app/features/portfolio/portfolio-shell.component.ts
- src/app/features/portfolio/pages/portfolio-service-category-page.component.ts

### UI reutilizable

- src/app/features/admin/components/cms-inline-actions.component.ts
- src/app/features/admin/components/cms-visual-edit-toolbar.component.ts

## Estado de calidad actual

### Correcto ahora mismo

- compilación de producción exitosa
- tipos estabilizados tras la reparación de portfolio-content.service.ts
- bindings Angular limpios en la capa nueva del portfolio editable
- el flujo de modal simplificado ya compila y quedó integrado

### Riesgos o pendientes visibles

- warnings de budgets en bundle inicial y varios SCSS
- el seed del CMS en Firebase no quedó validado al final de esta iteración
- la edición visual simplificada quedó aplicada al modal de categoría, pero no necesariamente replicada todavía en todas las vistas standalone de detalle
- falta validación manual fina de UX autenticada en navegador para revisar microinteracciones, consistencia y posibles casos borde

## Decisiones arquitectónicas vigentes

Estas decisiones se han mantenido de forma consistente durante la evolución reciente del proyecto:

- no romper modelos existentes
- no romper el patrón Repository
- no mover la lógica de persistencia a componentes visuales
- reutilizar componentes y modales existentes antes que crear variantes duplicadas
- usar Firebase como capa progresiva, no como reescritura destructiva
- hacer que el admin autenticado pueda editar sobre la interfaz pública

## Recomendaciones de siguiente fase

El siguiente tramo razonable del proyecto sería:

1. Validar y corregir el flujo de npm run firebase:seed:cms.
2. Extender el mismo patrón de edición inline al detalle standalone del paquete si se quiere consistencia total.
3. Hacer una pasada de QA visual con sesión admin autenticada sobre portfolio para pulir la experiencia.
4. Reducir budgets de estilos y bundle si se quiere dejar la build más limpia.

## Estado general final

En términos generales, el proyecto ya no está en fase de maqueta. La base actual es la de un CMS visual híbrido real sobre Angular, con autenticación, persistencia progresiva en Firebase, contenido público conectado a CMS y una primera capa funcional de edición inline directamente sobre el portfolio público.

La arquitectura principal sigue sana y el proyecto compila. Lo que queda ya no es reconstrucción base, sino consolidación operativa, pulido de UX y cierre de flujos pendientes como seeds y cobertura total de edición visual.