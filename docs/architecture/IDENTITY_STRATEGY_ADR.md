# ADR F2-02: Estrategia de Identidad y Autenticación Firebase Auth ↔ NestJS Backend

## Estado
Aprobado

## Contexto y Problema
Actualmente, TECNOJACK utiliza **Firebase Authentication** en el frontend Angular para la autenticación de administradores (`media-admin`, `admin`). El futuro backend de microservicios/monolito modular está construido en **NestJS + PostgreSQL (Prisma)**. 

Se requiere definir cómo se gestionará la identidad del usuario en el ERP (`/app`) garantizando:
1. No romper la sesión ni los inicios de sesión existentes en Firebase Auth.
2. Permitir que el frontend Angular consuma las APIs protegidas de NestJS.
3. Propagar roles, permisos y contexto de tenant/organización sin duplicar credenciales.

## Decisiones Tomadas

### 1. Firebase Auth como Proveedor de Identidad Primario (IDP)
Firebase Auth continuará siendo el proveedor principal de autenticación (Identity Provider). Los usuarios inician sesión mediante sus credenciales (Email/Password, Google OAuth, etc.) contra Firebase.

### 2. Validación de Firebase ID Tokens en NestJS (Token Exchange / Verification)
NestJS actuará como API Gateway y servidor de recursos protegidos.
- Las solicitudes HTTP enviadas por Angular hacia NestJS incluirán el token ID de Firebase en la cabecera `Authorization: Bearer <firebase_id_token>`.
- El módulo de autenticación de NestJS (`AuthModule`) utilizará el SDK de administración de Firebase (`firebase-admin`) para verificar la firma, vigencia y validez del ID Token de Firebase.

### 3. Mapeo de Usuario Firebase ↔ Person / User Backend
Una vez verificado el ID Token:
- NestJS extraerá el `uid` y el `email`.
- Consultará en el dominio de identidades (`PEOPLE` / `AUTH`) el registro correspondiente para resolver roles, permisos internos (`permissions`), código de persona (`personCode`) y tenant.
- En caso de primer acceso, un servicio de aprovisionamiento (*Just-In-Time Provisioning*) registrará la identidad en el backend.

### 4. Estrategia Hexagonal en Frontend Angular (`ErpIdentityPort`)
- La aplicación Angular interactúa únicamente con la abstracción `ErpIdentityPort` a través de `ErpIdentityFacade`.
- La implementación `FirebaseErpIdentityAdapter` provee la sesión actual de Firebase Auth a los componentes del ERP.
- Un HttpInterceptor (`ErpAuthInterceptor`) adjuntará automáticamente el `Bearer Token` de Firebase Auth a las peticiones hacia la URL base del backend NestJS.

## Consecuencias y Ventajas
- **Sin migración dolorosa de contraseñas:** Se evita almacenar contraseñas en PostgreSQL o gestionar hash/salts manualmente.
- **Transición transparente:** El usuario mantiene su cuenta y credenciales habituales.
- **Desacoplamiento total:** Los componentes UI de Angular no conocen Firebase ni NestJS directamente, usando únicamente Signals y el Facade de Identidad.
