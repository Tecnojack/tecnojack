// @ts-nocheck
import * as fs from 'fs';
import * as path from 'path';
import * as data from './src/app/features/portfolio/portfolio.data';

const outPath = 'C:\\Users\\Jackson Palacios\\.gemini\\antigravity\\brain\\29e49dc6-d64b-46ce-a6da-a143deb7a8c1\\backend_schema_completo.md';

let md = `# Especificación Completa de Base de Datos y CMS (TECNOJACK)

Este documento contiene la **totalidad de los datos estáticos** de la aplicación TECNOJACK (textos, paquetes, configuraciones, categorías). Está pensado para que el equipo de Desarrollo Backend pueda migrar toda esta información a una base de datos relacional (SQL) o no relacional (NoSQL), y crear un panel de administración (CMS).

---

## 1. Categorías de Servicios
\`\`\`json
${JSON.stringify(data.portfolioServices || [], null, 2)}
\`\`\`

---

## 2. Configuración de Páginas (SEO, Headers)
\`\`\`json
${JSON.stringify(data.portfolioServicePageConfigs || {}, null, 2)}
\`\`\`

---

## 3. Paquetes Base (Listados principales)
\`\`\`json
${JSON.stringify(data.portfolioPackages || [], null, 2)}
\`\`\`

---

## 4. Paquetes de Foto (Fotografía)
\`\`\`json
${JSON.stringify(data.portfolioPhotoPackages || [], null, 2)}
\`\`\`

---

## 5. Detalles de Paquetes (Vistas profundas y Cotizaciones)
\`\`\`json
${JSON.stringify(data.portfolioPackageDetails || [], null, 2)}
\`\`\`

---

## 6. Planes de Boda (Wedding Plans)
\`\`\`json
${JSON.stringify(data.portfolioWeddingPlans || [], null, 2)}
\`\`\`

---

## 7. Servicios Adicionales (Extras)
\`\`\`json
${JSON.stringify(data.portfolioAdditionalServices || [], null, 2)}
\`\`\`

---

## 8. Elementos de Galería (Portafolio Fotográfico)
\`\`\`json
${JSON.stringify(data.portfolioGalleryItems || [], null, 2)}
\`\`\`

---

## 9. Elementos de Video (Portafolio Videográfico)
\`\`\`json
${JSON.stringify(data.portfolioVideoItems || [], null, 2)}
\`\`\`

---

## 10. Información Global (Contacto, Perfil, Promesas de Marca)
### Redes de Contacto
\`\`\`json
${JSON.stringify(data.portfolioContactLinks || [], null, 2)}
\`\`\`

### Perfil Profesional
\`\`\`json
${JSON.stringify(data.portfolioProfessionalProfile || {}, null, 2)}
\`\`\`

### Pilares de Marca
\`\`\`json
${JSON.stringify(data.portfolioBrandPillars || [], null, 2)}
\`\`\`

---

## 11. Estructura para Invitaciones (Módulo Independiente)
Actualmente el proyecto cuenta con un módulo de **Invitaciones Interactivas** (ej. \`/diana-juan-invitation\`). 
Para el backend, se requiere una colección \`Invitations\` con la siguiente estructura sugerida:

\`\`\`json
{
  "slug": "diana-y-juan",
  "groomName": "Juan",
  "brideName": "Diana",
  "date": "2024-12-15T15:00:00Z",
  "ceremony": {
    "time": "15:00",
    "place": "Parroquia San José",
    "address": "Calle 123 #45-67",
    "mapUrl": "https://maps.google.com/..."
  },
  "reception": {
    "time": "17:00",
    "place": "Hacienda El Bosque",
    "address": "Km 5 Vía Principal",
    "mapUrl": "https://maps.google.com/..."
  },
  "dressCode": "Formal - Traje oscuro",
  "giftOptions": [
    {
      "type": "Lluvia de sobres",
      "description": "El mejor regalo es tu presencia, pero si deseas..."
    },
    {
      "type": "Transferencia",
      "bank": "Bancolombia",
      "accountType": "Ahorros",
      "accountNumber": "123456789",
      "ownerName": "Juan Pérez"
    }
  ],
  "guests": [
    { "name": "Pedro", "confirmed": true, "companions": 2 },
    { "name": "María", "confirmed": false, "companions": 0 }
  ]
}
\`\`\`

---
*Reporte generado automáticamente a partir del código fuente de TECNOJACK.*
`;

fs.writeFileSync(outPath, md, 'utf-8');
console.log('Report generated at:', outPath);
