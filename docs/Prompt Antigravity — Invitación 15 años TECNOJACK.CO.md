# IMPLEMENTAR NUEVA INVITACIÓN DIGITAL DE 15 AÑOS EN TECNOJACK.CO

Trabaja directamente sobre el proyecto Angular existente de **TECNOJACK.CO**.

Necesito crear una nueva página/tipo de invitación digital para una celebración de **15 años**, tomando como base técnica y funcional las invitaciones de boda que YA existen dentro del proyecto.

Esta tarea debe implementarse completamente.

NO quiero una maqueta aislada ni una página HTML independiente. Debe quedar integrada correctamente dentro de la arquitectura actual de TECNOJACK.CO.

---

# 1. PRIMERO: ANALIZA LA IMPLEMENTACIÓN ACTUAL

ANTES DE ESCRIBIR CÓDIGO:

1. Revisa la estructura completa del proyecto.
2. Localiza las invitaciones digitales de boda existentes.
3. Identifica exactamente cómo funcionan actualmente:
   - Routing.
   - Parámetros de URL.
   - Slugs.
   - Identificación de invitados.
   - Archivos de configuración.
   - Modelos/interfaces.
   - Componentes.
   - Servicios.
   - Assets.
   - Personalización por invitado.
   - Invitaciones individuales.
   - Invitaciones grupales.
   - Cupos.
   - Countdown.
   - WhatsApp.
   - Ubicación/mapas.
   - Animaciones.
   - Responsive.
   - Manejo de errores.
   - Metadata.
   - Cualquier componente compartido.
4. Reutiliza la arquitectura, patrones, helpers y componentes existentes siempre que sea razonable.
5. NO rompas ni alteres el comportamiento de las invitaciones de boda existentes.
6. NO hagas refactors generales que no sean necesarios para esta tarea.
7. Respeta la versión actual de Angular y las convenciones del repositorio.
8. NO actualices Angular ni dependencias mayores.

La invitación de 15 años debe convertirse en una nueva variante/tipo dentro del sistema existente, no en un sistema paralelo innecesario.

---

# 2. OBJETIVO

Crear una invitación digital personalizada para una celebración de **15 años**.

Cada invitación debe tener una URL personalizada que permita determinar qué persona o grupo está invitado.

Debe soportar:

- Invitaciones individuales.
- Invitaciones grupales.
- Cantidad de cupos.
- Todos los nombres correspondientes a cada invitación.
- Lenguaje dinámico singular/plural.
- Fecha y hora.
- Countdown.
- Ubicación.
- Dress code/restricción de colores.
- Lluvia de sobres.
- Confirmación por WhatsApp.
- Fecha límite de confirmación.
- Diseño completamente responsive.
- Una única fotografía.

---

# 3. REGLA FUNDAMENTAL: INDIVIDUAL VS. GRUPAL

Esta regla es OBLIGATORIA y debe resolverse desde los datos, no duplicando templates.

## INVITACIÓN INDIVIDUAL

Cuando una invitación tenga **1 persona**, utilizar lenguaje singular.

Ejemplo:

**Esta invitación ha sido preparada especialmente para ti.**

Mostrar:

**Elizabeth Villada**

Y:

**Invitación para 1 persona**

Los mensajes, CTA y textos personalizados deben utilizar singular cuando corresponda.

---

## INVITACIÓN GRUPAL

Cuando una invitación tenga **2 o más personas**, utilizar lenguaje plural.

Ejemplo:

**Esta invitación ha sido preparada especialmente para ustedes.**

Además:

### MOSTRAR LOS NOMBRES DE TODOS LOS INVITADOS.

Por ejemplo, para:

- Fiorella Alvarez
- Noa Zambrano

NO mostrar únicamente:

**Fiorella Alvarez**

Debe mostrarse claramente:

**Fiorella Alvarez**  
**Noa Zambrano**

Y:

**Invitación para 2 personas**

Otro ejemplo:

**Sandra Yepes**  
**John Jairo Bermudez**  
**Samuel Bermudez**  
**Eliana Bermudez**

**Invitación para 4 personas**

La misma regla aplica para grupos de 2, 3, 4 o 5 personas.

No utilizar expresiones incorrectas como:

- "Invitación para 1 personas."
- "Te esperamos" para un grupo.
- "Esta invitación es para ti" cuando hay varias personas.
- Mostrar solamente el primer nombre de un grupo.

Toda la experiencia personalizada debe respetar correctamente singular/plural.

---

# 4. DATOS DEL EVENTO

## Evento

**Celebración de 15 años**

## Fecha

**4 de octubre de 2026**

## Hora

**07:00 PM**

## Lugar

**Aves de Jerusalen**

Mantener el nombre proporcionado por la cliente.

## Fecha límite de confirmación

**10 de septiembre de 2026**

## WhatsApp para confirmaciones

**3017477950**

Para generar el enlace de WhatsApp utilizar código internacional colombiano:

**+57 301 747 7950**

---

# 5. TEXTO PRINCIPAL OFICIAL

Este es el contenido suministrado por la cliente:

> Mis 15 años son un sueño que quiero compartir con mi familia y mis amigos, porque cada uno de ustedes ha sido parte de mi historia, de mis alegrías y de tantos momentos que guardaré siempre en mi corazón.
>
> Por eso, con mucha ilusión quiero invitarte a celebrar conmigo esta noche tan especial.
>
> Tu presencia será, sin duda, el regalo más bonito.
>
> Si deseas tener un detalle conmigo, hemos elegido la modalidad de lluvia de sobres, que recibiremos con muchísimo cariño y gratitud.
>
> Esta invitación es personal e intransferible y ha sido preparada especialmente para ti. Agradezco de corazón que nos acompañes y seas parte de este recuerdo tan inolvidable.
>
> Con todo mi cariño,
>
> ¡Te espero para celebrar mis 15 años!

IMPORTANTE:

Este texto es la fuente original, pero cuando la invitación sea grupal debe adaptarse gramaticalmente donde corresponda.

Por ejemplo:

Individual:

**Esta invitación es personal e intransferible y ha sido preparada especialmente para ti.**

Grupal:

**Esta invitación es personal e intransferible y ha sido preparada especialmente para ustedes.**

Individual:

**¡Te espero para celebrar mis 15 años!**

Grupal:

**¡Los espero para celebrar mis 15 años!**

Hacer las adaptaciones necesarias manteniendo el significado y tono original.

No es obligatorio mostrar todo como un párrafo gigantesco.

Distribuir el contenido elegantemente a través de la experiencia.

---

# 6. DRESS CODE / RESTRICCIÓN DE COLORES

Agregar una sección visual específica de vestimenta.

Texto oficial:

> Les pedimos amablemente evitar los tonos verde, azul y morado en la vestimenta, ya que han sido reservados para la celebración.

Esta información debe tener suficiente importancia visual para que los invitados la vean antes del evento.

Mostrar visualmente los tres colores reservados:

- Verde
- Azul
- Morado

Puede utilizarse una representación elegante mediante círculos/swatches de color acompañados de sus nombres.

Debe quedar CLARO que estos colores deben evitarse en la vestimenta.

No interpretar esto como que el dress code completo es verde/azul/morado. Es justamente lo contrario:

**son colores reservados para la celebración y los invitados deben evitarlos.**

No inventar un código de vestimenta como "formal", "cocktail", "black tie", etc., porque la cliente no lo indicó.

---

# 7. LLUVIA DE SOBRES

Debe existir una sección dedicada a:

## Lluvia de sobres

Utilizar este contenido:

> Tu presencia será, sin duda, el regalo más bonito. Si deseas tener un detalle conmigo, hemos elegido la modalidad de lluvia de sobres, que recibiremos con muchísimo cariño y gratitud.

La presentación debe ser elegante y sutil.

No debe parecer una solicitud agresiva de dinero.

Puede utilizarse un ícono de sobre/regalo si encaja con el lenguaje visual.

---

# 8. PERSONALIZACIÓN DE LA INVITACIÓN

Debe existir una sección protagonista donde se muestre claramente a quién pertenece la invitación.

Ejemplo individual:

**Esta invitación ha sido preparada especialmente para ti**

### Elizabeth Villada

**1 persona**

Ejemplo grupal:

**Esta invitación ha sido preparada especialmente para ustedes**

### Fiorella Alvarez
### Noa Zambrano

**2 personas**

Para grupos grandes, distribuir los nombres de manera elegante y responsive.

NO esconder integrantes dentro de un "+3" ni mostrar solamente el nombre principal.

TODOS los nombres deben estar visibles.

---

# 9. LISTA OFICIAL DE INVITACIONES

La cliente indica un total de **98 personas**.

IMPORTANTE:

Cada bloque `(N)` representa **UNA invitación** con `N` cupos/personas.

No generar una URL independiente por cada nombre dentro de un mismo grupo.

Por ejemplo:

```text
(4)
Sandra Yepes
John Jairo Bermudez
Samuel Bermudez
Eliana Bermudez
```

representa UNA invitación para cuatro personas.

---

## INVITACIÓN 01 — 2 PERSONAS

- Fiorella Alvarez
- Noa Zambrano

## INVITACIÓN 02 — 1 PERSONA

- Elizabeth Villada

## INVITACIÓN 03 — 1 PERSONA

- Valentina Ruiz

## INVITACIÓN 04 — 2 PERSONAS

- Sofia Fernandez
- Emely Fernandez

## INVITACIÓN 05 — 1 PERSONA

- Valeria Requena

## INVITACIÓN 06 — 1 PERSONA

- Alina Gutierrez

## INVITACIÓN 07 — 1 PERSONA

- Ana Isabel Giraldo

## INVITACIÓN 08 — 1 PERSONA

- Mailen Feria

## INVITACIÓN 09 — 1 PERSONA

- Maria Fernanda Quintero

## INVITACIÓN 10 — 1 PERSONA

- Santiago Deossa

## INVITACIÓN 11 — 1 PERSONA

- Juanes Diaz

## INVITACIÓN 12 — 1 PERSONA

- Lina Soler

## INVITACIÓN 13 — 1 PERSONA

- Mariana Osorio

## INVITACIÓN 14 — 1 PERSONA

- Juanita Torres

## INVITACIÓN 15 — 1 PERSONA

- Juan Bocanegra

## INVITACIÓN 16 — 1 PERSONA

- Juan Camilo Baquero

## INVITACIÓN 17 — 2 PERSONAS

- Juanes Millan
- Dana Millan

## INVITACIÓN 18 — 4 PERSONAS

- Sandra Yepes
- John Jairo Bermudez
- Samuel Bermudez
- Eliana Bermudez

## INVITACIÓN 19 — 3 PERSONAS

- Mariana Garzon
- Matias Holguin
- Wilson Gómez

## INVITACIÓN 20 — 2 PERSONAS

- Elvia Elena Yepes
- Mateo Garzón

## INVITACIÓN 21 — 2 PERSONAS

- Felipe Garzón
- Valentina Martinez

## INVITACIÓN 22 — 3 PERSONAS

- Arelis Molina
- Elkin Barros
- Santiago Barros

## INVITACIÓN 23 — 2 PERSONAS

- Carolina Arrubla
- Diana Rios

## INVITACIÓN 24 — 3 PERSONAS

- Elizabeth Cano
- Fany Mejia
- Dario Ospina

## INVITACIÓN 25 — 2 PERSONAS

- Diana Ospina
- Bernabe Bustamante

## INVITACIÓN 26 — 1 PERSONA

- Natalia Ospina

## INVITACIÓN 27 — 4 PERSONAS

- Daniel Ospina
- Doria Arrieta
- Juan Pablo Ospina
- Andres Felie Ospina

IMPORTANTE: conservar el nombre exactamente como fue proporcionado: **Andres Felie Ospina**. No corregirlo automáticamente.

## INVITACIÓN 28 — 2 PERSONAS

- Socorro Bermudez
- Jhon Jairo Giraldo

## INVITACIÓN 29 — 2 PERSONAS

- Mauricio Giraldo
- Joan Torres

## INVITACIÓN 30 — 4 PERSONAS

- Arlen Restrepo
- Tatian Aleman
- Jose David Restrepo
- Manuela Restrepo

## INVITACIÓN 31 — 1 PERSONA

- Jose Bermudez

## INVITACIÓN 32 — 2 PERSONAS

- Saul Bermudez
- Dexcy Coromoto

## INVITACIÓN 33 — 2 PERSONAS

- Duvan Bermudez
- Leidy Zapata

## INVITACIÓN 34 — 3 PERSONAS

- Robinson Bermudez
- Sandra Castaño
- Miguel Angel Bermudez

## INVITACIÓN 35 — 1 PERSONA

- Arley Bermudez

## INVITACIÓN 36 — 3 PERSONAS

- Solangel Londoño
- Luz Adriana Bermudez
- Jhon Alexander Bermudez

## INVITACIÓN 37 — 2 PERSONAS

- Lina Garcia
- Luciana Galeano

## INVITACIÓN 38 — 3 PERSONAS

- Carlos Bermudez
- Elcy Quiroz
- Johana Bermudez

## INVITACIÓN 39 — 5 PERSONAS

- Xiomara Bermudez
- Elkin Angel
- Julian Angel
- Veronica Angel
- Martin Angel

## INVITACIÓN 40 — 1 PERSONA

- Kedwin Gonzalez

## INVITACIÓN 41 — 2 PERSONAS

- Sara Garcia
- Brian Garcia

## INVITACIÓN 42 — 2 PERSONAS + REFERENCIA A BABY

- Sara Zapata + (baby)
- Jeferson Orozco

IMPORTANTE:

La cliente marcó este bloque como `(2)`.

Por lo tanto:

- `guestCount` debe continuar siendo **2**.
- NO convertir automáticamente `(baby)` en un tercer cupo.
- Mantener la referencia a `baby` asociada a Sara Zapata.
- Mostrar esta información de manera natural y elegante.
- No generar una tercera persona ficticia.
- No cambiar el número de cupos a 3.

## INVITACIÓN 43 — 2 PERSONAS

- Maria Fernanda Horta
- Nicolas Useche

## INVITACIÓN 44 — 3 PERSONAS

- Sindy Giraldo
- David Rodriguez
- Nicolas Castrillon

## INVITACIÓN 45 — 1 PERSONA

- Yesenia Gomez

## INVITACIÓN 46 — 1 PERSONA

- Valentina Aristizabal

## INVITACIÓN 47 — 1 PERSONA

- Camila Arbelaez

## INVITACIÓN 48 — 1 PERSONA

- Michel Rodas

## INVITACIÓN 49 — 1 PERSONA

- Isabel Sierra

## INVITACIÓN 50 — 1 PERSONA

- Rosa Gomez

## INVITACIÓN 51 — 1 PERSONA

- Catalina Londoño

## INVITACIÓN 52 — 1 PERSONA

- Edwar Ospina

## INVITACIÓN 53 — 1 PERSONA

- Marlon Duque

## INVITACIÓN 54 — 1 PERSONA

- Daniela Quintero

## INVITACIÓN 55 — 2 PERSONAS

- Nancy Rueda
- Alejandro Echeverri

---

# 10. VALIDACIÓN DE LA LISTA

Antes de terminar:

1. Construye los datos de las 55 invitaciones.
2. Calcula programáticamente la suma de `guestCount`.
3. Compara el resultado contra el total informado de **98 personas**.
4. NO alteres cupos para forzar artificialmente el resultado.
5. Si existe alguna discrepancia entre la suma matemática de los bloques `(N)` suministrados y el total declarado de 98, repórtala claramente en el informe final.
6. La fuente de verdad para cada invitación individual debe ser el `(N)` suministrado por la cliente.

No inventar invitados para completar 98.

---

# 11. MODELO DE DATOS

Analiza primero el modelo existente de las invitaciones de boda y reutilízalo cuando sea posible.

Conceptualmente cada invitación necesita representar:

```ts
{
  id: string;
  slug: string;
  guests: string[];
  guestCount: number;
}
```

Ejemplo:

```ts
{
  id: 'inv-018',
  slug: 'sandra-yepes',
  guests: [
    'Sandra Yepes',
    'John Jairo Bermudez',
    'Samuel Bermudez',
    'Eliana Bermudez'
  ],
  guestCount: 4
}
```

Esto es únicamente conceptual.

NO crees esta interfaz si el proyecto ya dispone de un modelo apropiado.

---

# 12. SLUGS Y URLS

Cada GRUPO debe tener una URL única.

NO cada persona.

Ejemplo conceptual:

`/invitations/xv/:guestSlug`

o la convención que ya utilice TECNOJACK.CO.

Ejemplo:

`/invitations/xv/sandra-yepes`

debe abrir la invitación correspondiente a:

- Sandra Yepes
- John Jairo Bermudez
- Samuel Bermudez
- Eliana Bermudez

con 4 cupos.

Los slugs deben ser:

- Únicos.
- URL-safe.
- Sin espacios.
- Sin tildes.
- Sin caracteres problemáticos.
- Estables.

Los nombres mostrados en UI sí deben conservar la escritura proporcionada.

---

# 13. WHATSAPP

Número:

**+57 301 747 7950**

CTA:

**Confirmar asistencia**

Fecha límite:

**10 de septiembre de 2026**

Al pulsar el botón debe abrirse WhatsApp con mensaje prellenado.

NO enviar automáticamente.

## INDIVIDUAL

Ejemplo:

> Hola, confirmo mi asistencia a la celebración de 15 años del 4 de octubre. Soy Elizabeth Villada.

## GRUPAL

Ejemplo:

> Hola, confirmamos nuestra asistencia a la celebración de 15 años del 4 de octubre. Esta invitación corresponde a Fiorella Alvarez y Noa Zambrano, para 2 personas.

Para grupos mayores incluir los nombres de todos los integrantes si el mensaje sigue siendo razonable.

La generación del mensaje debe ser dinámica.

Codificar correctamente el mensaje utilizando `encodeURIComponent` o el mecanismo existente del proyecto.

---

# 14. UNA SOLA FOTOGRAFÍA

Para esta invitación existe **UNA SOLA IMAGEN**.

Diseñar toda la experiencia considerando esta restricción.

NO:

- Crear galería.
- Crear carrusel.
- Inventar fotografías.
- Usar fotografías stock.
- Reutilizar fotos de otras bodas.
- Duplicar la fotografía para simular una galería.
- Mostrar placeholders como si fueran fotografías definitivas.

Buscar primero si la imagen ya existe dentro de los assets del proyecto.

Si existe, utilizarla.

Si todavía no existe, preparar una ruta clara para reemplazarla posteriormente.

La fotografía debe ser protagonista, especialmente en el Hero.

---

# 15. IDENTIDAD VISUAL

La página debe sentirse como una invitación premium de **15 años**, no como una boda modificada superficialmente.

Dirección visual:

- Elegante.
- Juvenil.
- Femenina.
- Sofisticada.
- Moderna.
- Emotiva.
- Fotográfica.
- Premium.

Evitar:

- Diseño infantil.
- Exceso de rosa.
- Corazones.
- Coronas cliché.
- Mariposas excesivas.
- Brillos exagerados.
- Plantilla genérica de quinceañera.
- Estética excesivamente matrimonial.

Analizar la única fotografía disponible para construir una paleta que armonice con ella.

IMPORTANTE:

Aunque la página puede tener una paleta visual coherente con la fotografía, tener presente que **verde, azul y morado están reservados para la celebración**.

La sección de restricción de vestuario debe comunicar esto claramente.

---

# 16. HERO

Crear un Hero de alto impacto utilizando la fotografía disponible.

Debe comunicar inmediatamente:

**Mis 15 años**

o una composición equivalente con:

**XV**

Incluir:

- Fotografía.
- Identidad de XV años.
- Fecha.
- Elementos decorativos elegantes.
- Entrada/animación sutil.
- Indicador de scroll si mejora la experiencia.

NO inventar el nombre de la quinceañera.

Si el nombre ya existe de manera inequívoca en los assets/configuración/contexto del proyecto para este evento, utilizarlo.

De lo contrario, dejar una variable claramente identificada:

```ts
celebrantName
```

o equivalente.

Mientras el nombre no esté disponible, el diseño debe funcionar perfectamente utilizando:

**Mis 15 años**

o:

**XV**

No asumir que Eliana es la quinceañera simplemente porque suministró la información.

---

# 17. COUNTDOWN

Implementar/reutilizar el countdown existente hacia:

**4 de octubre de 2026 — 07:00 PM**

Mostrar:

- Días
- Horas
- Minutos
- Segundos

Debe funcionar correctamente en móvil.

Reutilizar la estrategia existente del proyecto si ya hay countdown en las invitaciones de boda.

Limpiar correctamente timers/subscriptions.

---

# 18. SECCIÓN DEL EVENTO

Mostrar claramente:

### 4 de octubre de 2026

### 07:00 PM

### Aves de Jerusalen

Debe ser una de las secciones más fáciles de consultar.

---

# 19. UBICACIÓN

Lugar:

**Aves de Jerusalen**

Si las invitaciones actuales soportan mapa/Google Maps/Waze, reutilizar esa funcionalidad.

No inventar coordenadas.

Si no hay dirección o coordenadas suficientes para generar navegación confiable, NO crear una ubicación falsa.

Dejar la configuración preparada y reportar el dato faltante.

---

# 20. SECCIÓN DE VESTIMENTA

Crear una sección visual elegante dedicada a esta información:

### Colores reservados

> Les pedimos amablemente evitar los tonos verde, azul y morado en la vestimenta, ya que han sido reservados para la celebración.

Representar visualmente:

🟢 Verde  
🔵 Azul  
🟣 Morado

Los emojis anteriores son únicamente una representación conceptual.

En la UI final utilizar elementos visuales acordes con el diseño, no necesariamente emojis.

Debe entenderse rápidamente:

**NO utilizar estos colores en la vestimenta.**

---

# 21. ESTRUCTURA UX SUGERIDA

Construir una experiencia narrativa.

Como referencia:

1. Hero.
2. Introducción / "Mis 15 años".
3. Mensaje emocional.
4. Invitación personalizada.
5. Nombre(s) de invitado(s).
6. Número de cupos.
7. Countdown.
8. Fecha y hora.
9. Lugar.
10. Ubicación / Cómo llegar si existe información suficiente.
11. Dress code / colores reservados.
12. Lluvia de sobres.
13. Mensaje de invitación personal e intransferible.
14. Confirmación de asistencia.
15. Fecha límite RSVP.
16. CTA WhatsApp.
17. Cierre emocional.

Puedes modificar el orden si existe una mejor solución UX, pero NO omitas ninguna sección/información.

---

# 22. MOBILE FIRST

La invitación será distribuida principalmente por WhatsApp.

Por lo tanto:

**DISEÑAR MOBILE FIRST.**

Probar como mínimo:

- 320 px.
- 360 px.
- 375 px.
- 390 px.
- 414 px.
- Tablet.
- Desktop.

Especial atención a las invitaciones de 4 y 5 personas, donde todos los nombres deben seguir siendo visibles sin romper el diseño.

NO debe existir:

- Overflow horizontal.
- Texto cortado.
- Nombres truncados.
- Botones fuera de viewport.
- Imágenes deformadas.
- Texto ilegible.
- Layout roto por nombres largos.

---

# 23. ANIMACIONES

Reutilizar la estrategia existente cuando sea posible.

Agregar animaciones sutiles:

- Fade.
- Reveal.
- Entrada suave.
- Scroll reveal.
- Movimiento decorativo mínimo.

NO saturar la experiencia.

Respetar:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 24. ACCESIBILIDAD

Implementar:

- HTML semántico.
- Contraste adecuado.
- Alt de fotografía.
- Focus visible.
- Botones accesibles.
- `aria-label` cuando corresponda.
- Tamaños táctiles apropiados.
- Compatibilidad con `prefers-reduced-motion`.

---

# 25. PERFORMANCE

La fotografía debe estar optimizada.

Considerar:

- Formato moderno.
- Tamaño adecuado.
- Evitar CLS.
- `object-fit`.
- `object-position`.
- Dimensiones definidas.
- Preload/prioridad si corresponde al LCP.
- Lazy loading solamente donde tenga sentido.

No agregar librerías pesadas para resolver animaciones sencillas.

---

# 26. FUENTE ÚNICA DE DATOS

NO repetir información del evento en múltiples componentes.

Crear/reutilizar una configuración central para:

- Fecha.
- Hora.
- Lugar.
- Fecha límite RSVP.
- WhatsApp.
- Imagen.
- Textos.
- Dress code.
- Invitados.
- Lluvia de sobres.

Ejemplo conceptual:

```ts
eventConfig = {
  date: ...,
  time: ...,
  venue: ...,
  rsvpDeadline: ...,
  whatsapp: ...,
  reservedColors: [...],
  giftMode: ...
}
```

Adaptarlo a la arquitectura real del proyecto.

---

# 27. MANEJO DE ERRORES

Una URL inválida no debe producir errores técnicos visibles.

Si el slug no existe, mostrar algo coherente como:

**No pudimos encontrar esta invitación. Verifica que hayas abierto el enlace que recibiste.**

Reutilizar el manejo existente si ya existe.

---

# 28. PRIVACIDAD / INDEXACIÓN

Las invitaciones personalizadas no deberían indexarse como páginas públicas.

Si la arquitectura actual permite metadata por ruta, utilizar:

```html
<meta name="robots" content="noindex, nofollow">
```

o la estrategia existente.

NO afectar el SEO del resto de TECNOJACK.CO.

---

# 29. NO INVENTAR INFORMACIÓN

No inventar:

- Nombre de la quinceañera.
- Invitados adicionales.
- Cupos adicionales.
- Dirección no proporcionada.
- Coordenadas.
- Segunda fotografía.
- Dress code adicional.
- Código de vestimenta formal/cocktail.
- Itinerario.
- Redes sociales.
- Hashtag.
- Cuenta bancaria.
- Mesa de regalos.
- Padres/anfitriones.
- Música.
- Información religiosa.
- Información no suministrada.

---

# 30. NO ROMPER TECNOJACK.CO

La implementación NO debe afectar:

- Landing.
- Portafolio.
- Paquetes.
- Admin.
- Invitaciones de boda.
- Rutas existentes.
- i18n.
- Firebase utilizado actualmente por otras funcionalidades.
- Build.
- Deploy de Vercel.

No realizar refactors fuera del alcance.

---

# 31. CALIDAD DEL CÓDIGO

Mantener:

- TypeScript estricto según configuración existente.
- Interfaces claras.
- Componentes mantenibles.
- Sin `any` innecesarios.
- Sin duplicación.
- Sin logs temporales.
- Sin código muerto.
- Sin dependencias innecesarias.
- Manejo correcto de subscriptions/timers.
- Convenciones actuales del repositorio.

---

# 32. VALIDACIONES OBLIGATORIAS

Antes de terminar:

1. Ejecutar build.
2. Verificar compilación TypeScript.
3. Verificar templates Angular.
4. Probar routing.
5. Probar invitación individual.
6. Probar invitación de 2 personas.
7. Probar invitación de 3 personas.
8. Probar invitación de 4 personas.
9. Probar invitación de 5 personas.
10. Confirmar que todos los nombres aparecen.
11. Confirmar singular/plural.
12. Probar Sara Zapata + baby sin incrementar incorrectamente el cupo.
13. Probar slug inválido.
14. Probar countdown.
15. Probar WhatsApp.
16. Comprobar número +57 3017477950.
17. Comprobar RSVP 10 de septiembre de 2026.
18. Comprobar evento 4 de octubre de 2026.
19. Comprobar hora 07:00 PM.
20. Comprobar Aves de Jerusalen.
21. Comprobar sección de lluvia de sobres.
22. Comprobar restricción verde/azul/morado.
23. Probar responsive.
24. Verificar overflow.
25. Verificar consola.
26. Verificar que las bodas existentes continúen funcionando.
27. Ejecutar build de producción.

---

# 33. DATOS OFICIALES

Considerar como fuente oficial:

**Tipo:** 15 años  
**Fecha:** 4 de octubre de 2026  
**Hora:** 07:00 PM  
**Lugar:** Aves de Jerusalen  
**RSVP máximo:** 10 de septiembre de 2026  
**WhatsApp:** 3017477950  
**WhatsApp internacional:** +57 3017477950  
**Regalo:** Lluvia de sobres  
**Colores que deben evitar los invitados:** verde, azul y morado  
**Tipo de invitación:** Personal e intransferible  
**Cantidad informada:** 98 personas  
**Cantidad de bloques/invitaciones proporcionados:** 55  
**Fotografías disponibles:** 1  

---

# 34. INFORME FINAL OBLIGATORIO

Al terminar entrégame un informe técnico con:

## Archivos creados

Ruta + función de cada archivo.

## Archivos modificados

Ruta + modificación realizada.

## Arquitectura reutilizada

Explica qué partes de las invitaciones de boda fueron reutilizadas.

## Ruta

Indica el patrón exacto de URL.

## Ejemplos reales

Proporciona URLs para:

- Invitación individual.
- Invitación de 2 personas.
- Invitación de 3 personas.
- Invitación de 4 personas.
- Invitación de 5 personas.

## Invitados

Indica dónde quedaron almacenadas las 55 invitaciones.

## Validación de cupos

Indica:

- Número de invitaciones.
- Suma programática de `guestCount`.
- Total informado por la cliente: 98.
- Si coinciden o existe discrepancia.

NO modificar los datos para hacerlos coincidir.

## Singular/plural

Confirma cómo se resolvió dinámicamente.

## WhatsApp

Muestra ejemplos de mensaje:

- Individual.
- Grupal.

## Fotografía

Indica exactamente qué asset se utilizó.

Si falta, indica dónde debe colocarse.

## Datos faltantes

Reportar cualquier dato que realmente haga falta.

## Build

Indicar:

- Comando ejecutado.
- Resultado.
- Errores encontrados.
- Errores corregidos.
- Tests realizados.

---

# 35. CRITERIO DE FINALIZACIÓN

NO declares la tarea terminada solamente porque la página "se ve bien".

La tarea está terminada cuando:

- Está integrada en Angular.
- Las 55 invitaciones están configuradas.
- Los grupos funcionan.
- Todos los nombres aparecen.
- Singular/plural funciona.
- Los cupos funcionan.
- WhatsApp funciona.
- Countdown funciona.
- Dress code está presente.
- Lluvia de sobres está presente.
- RSVP está presente.
- La única fotografía se maneja correctamente.
- Mobile funciona.
- Desktop funciona.
- Los slugs inválidos están controlados.
- Las invitaciones de boda existentes no se rompieron.
- El build de producción termina correctamente.

Implementa la solución completa y después entrega el informe técnico.