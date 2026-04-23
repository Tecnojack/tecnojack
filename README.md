# TecnojackWeddingEngine

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Seed CMS a Firebase

El repo incluye un importador para cargar el estado actual del CMS a Cloud Firestore usando Admin SDK.

Requisitos:

- credencial de servicio de Firebase con acceso a Firestore
- variables de entorno `GOOGLE_APPLICATION_CREDENTIALS` o `FIREBASE_SERVICE_ACCOUNT_PATH`

Comandos:

- `npm run firebase:seed:cms:dry-run`
- `npm run firebase:seed:cms`
- `npm run firebase:seed:cms:reset`
- `npm run firebase:seed:cms -- --only=categories,pages,sections`

## Seed bodas e invitados a Firebase

El repo también incluye un importador para llevar `src/assets/data/weddings.json` y `src/assets/data/guests/*.json` a Firestore.

Comandos:

- `npm run firebase:seed:weddings:dry-run`
- `npm run firebase:seed:weddings`
- `npm run firebase:seed:weddings:reset`
- `npm run firebase:seed:weddings -- --only=maria-nicolas`

Notas:

- las bodas se guardan en `weddings/{slug}`
- los invitados se guardan en `weddings/{slug}/guests/{guestSlug}`
- el script soporta tanto el formato legacy `Guest[]` como el formato agrupado `GrupoInvitado[]`

Notas:

- el importador usa el seed actual definido en `src/app/features/admin/data/admin-cms.seed.ts`
- `--reset` elimina primero los documentos existentes de las colecciones seleccionadas
- sin `--reset`, el script hace upsert por `id` y conserva documentos extra que ya existan en Firestore
