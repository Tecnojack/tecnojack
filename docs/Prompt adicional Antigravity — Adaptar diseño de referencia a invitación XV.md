# ACTUALIZACIÓN DE LA TAREA — USAR CÓDIGO FUENTE ADJUNTO COMO REFERENCIA VISUAL

Para la implementación de la invitación de 15 años descrita anteriormente, te proporcionaré adicionalmente un archivo `.md` que contiene el **código fuente de una invitación de 15 años existente cuyo diseño, estructura y experiencia visual me gustaron**.

IMPORTANTE:

Este nuevo archivo NO reemplaza los requerimientos funcionales, datos, invitados, textos, reglas de singular/plural ni arquitectura especificados en el prompt anterior.

El archivo debe utilizarse como **REFERENCIA PRINCIPAL DE DISEÑO, COMPOSICIÓN, UX, ANIMACIONES Y ESTRUCTURA VISUAL**.

La arquitectura existente de las invitaciones de TECNOJACK.CO sigue siendo la referencia para:

- Angular.
- Routing.
- Personalización por slug.
- Modelos.
- Servicios.
- Invitados.
- Configuración.
- Reutilización de componentes.
- Integración dentro del proyecto.

En resumen:

**TECNOJACK.CO = referencia técnica y arquitectónica.**

**Código fuente adjunto = referencia visual, compositiva y de experiencia.**

**Información del prompt anterior = fuente oficial de contenido y datos.**

---

# 1. ANALIZA EL ARCHIVO COMPLETO ANTES DE IMPLEMENTAR

Lee COMPLETAMENTE el archivo `.md` con el código fuente de referencia.

No analices únicamente las primeras líneas.

Identifica:

- Estructura general de la página.
- Orden de secciones.
- Hero.
- Tipografías.
- Paleta.
- Fondos.
- Decoraciones.
- Formas.
- Espaciados.
- Jerarquía visual.
- Contenedores.
- Secciones full-width.
- Secciones centradas.
- Cards.
- Countdown.
- Información del evento.
- Cómo llegar.
- Dress code.
- Regalos.
- Confirmación de asistencia.
- Modales.
- Botones.
- Iconografía.
- Animaciones.
- Transiciones.
- Loader/preloader.
- Comportamiento durante scroll.
- Elementos flotantes.
- Comportamientos JavaScript.
- Responsive.
- Breakpoints.
- Cualquier comportamiento interactivo.

También identifica qué partes dependen de:

- Bootstrap.
- jQuery.
- Slick.
- Fancybox.
- CSS externos.
- JavaScript externo.
- Plugins.
- APIs o servicios propios del sitio original.

Haz este análisis ANTES de escribir la implementación Angular.

---

# 2. NO COPIAR EL SITIO DE FORMA CIEGA

NO quiero que simplemente copies y pegues el HTML dentro de un componente Angular.

Tampoco quiero:

```ts
innerHTML
```

para renderizar toda la página.

NO utilizar:

- iframe.
- WebView.
- HTML remoto.
- Scripts externos del sitio original.
- CSS remoto del sitio original.
- APIs privadas del sitio original.
- Endpoints de confirmación del sitio original.
- Dependencias runtime hacia el dominio original.

La nueva invitación debe funcionar como parte NATIVA de TECNOJACK.CO.

---

# 3. RECREAR LA EXPERIENCIA EN ANGULAR

Toma el diseño original como referencia y reconstruye la experiencia utilizando:

- Angular.
- TypeScript.
- HTML semántico.
- SCSS/CSS del proyecto.
- Componentes Angular.
- Servicios/helpers existentes cuando corresponda.

Si el original utiliza jQuery para una animación sencilla, NO agregues jQuery.

Reimplementa ese comportamiento utilizando Angular, CSS moderno o APIs nativas del navegador.

Ejemplo:

Original:

```js
$('.element').fadeIn();
```

Adaptación:

- Angular.
- CSS transitions.
- CSS animations.
- IntersectionObserver.
- Clases dinámicas.

El objetivo es obtener la misma sensación visual sin arrastrar tecnología legacy innecesaria.

---

# 4. FIDELIDAD VISUAL AL DISEÑO DE REFERENCIA

Quiero una adaptación con **alta fidelidad visual** al diseño proporcionado.

Analiza especialmente:

- Proporciones.
- Ritmo vertical.
- Tamaños relativos.
- Composición.
- Jerarquía.
- Separación entre secciones.
- Uso de espacios negativos.
- Tipografía.
- Distribución de textos.
- Tratamiento de imágenes.
- Elementos ornamentales.
- Countdown.
- Cards.
- Botones.
- Bordes.
- Sombras.
- Animaciones.
- Transiciones entre secciones.

No quiero simplemente:

> "Inspirado en el diseño"

y terminar con una página completamente diferente.

La intención es que, al comparar ambas páginas, se reconozca claramente la misma **dirección visual y experiencia general**, adaptada al evento real de TECNOJACK.

---

# 5. NO HACER UNA COPIA 1:1 DE MARCA O CONTENIDO

Aunque la referencia visual debe ser fuerte, NO copiar:

- Logos.
- Marca del proveedor original.
- Nombre de la quinceañera de ejemplo.
- Invitados del ejemplo.
- Datos del evento original.
- Teléfonos.
- Direcciones.
- Redes sociales.
- URLs.
- Textos específicos que no pertenezcan a nuestro evento.
- Copyright/footer del proveedor.
- Analytics.
- IDs de tracking.
- Servicios externos.
- Formularios del proveedor.
- Datos ocultos.
- Integraciones propietarias.

Toda la información debe sustituirse por los datos oficiales suministrados para nuestra invitación.

---

# 6. LOS DATOS DEL PROMPT ANTERIOR TIENEN PRIORIDAD

Si existe cualquier contradicción entre el código fuente de referencia y el prompt anterior:

**GANA EL PROMPT ANTERIOR.**

Por ejemplo:

Si la referencia tiene:

- Otra fecha.
- Otro lugar.
- Otro nombre.
- Otro WhatsApp.
- Otra cantidad de invitados.
- Otro dress code.
- Otra modalidad de regalos.
- Otro RSVP.
- Otra ubicación.

IGNORAR esos datos.

Los datos oficiales siguen siendo los proporcionados en el prompt anterior.

---

# 7. NO INVENTAR EL NOMBRE DE LA QUINCEAÑERA

El código fuente de referencia puede contener el nombre de OTRA quinceañera.

Ese nombre pertenece al sitio de referencia.

NO reutilizarlo.

NO asumir que ese es el nombre de nuestra quinceañera.

Nuestra implementación debe seguir funcionando con:

**Mis 15 años**

**XV**

o el mecanismo definido en el prompt anterior hasta que exista un nombre oficial.

---

# 8. ADAPTACIÓN DEL HERO

Estudia específicamente cómo funciona el Hero/portada de la referencia.

Quiero conservar en la medida de lo posible:

- Impacto visual.
- Distribución.
- Jerarquía.
- Tratamiento de fotografía.
- Tipografía.
- Decoraciones.
- Entrada inicial.
- Sensación premium.
- Relación entre imagen y texto.

Pero recuerda que nosotros tenemos:

**UNA SOLA FOTOGRAFÍA.**

Por tanto, adapta el Hero a esa restricción.

NO inventes más fotografías.

---

# 9. UNA SOLA FOTOGRAFÍA

Aunque la referencia tenga múltiples imágenes, nuestra invitación dispone únicamente de UNA.

Por lo tanto:

NO crear:

- Carrusel falso.
- Galería falsa.
- Múltiples fotografías stock.
- Fotografías tomadas del sitio de referencia.
- Imágenes de otras quinceañeras.

Si alguna sección del diseño original depende completamente de una segunda fotografía, reinterpreta esa sección utilizando:

- Tipografía.
- Espacio.
- Ornamentos.
- Fondos.
- Texturas CSS.
- Formas.
- Gradientes.
- Elementos decorativos.

La experiencia debe seguir viéndose completa.

---

# 10. ASSETS DEL SITIO ORIGINAL

IMPORTANTE:

El código fuente puede contener URLs hacia imágenes, SVG, CSS, fuentes, JavaScript u otros assets alojados en el dominio original.

NO asumir que tenemos derecho o que debemos depender de esos assets.

Clasifica los recursos encontrados.

## A. Recursos estructurales

Por ejemplo:

- Layout.
- CSS patterns.
- Animaciones.
- Posicionamiento.

Estos pueden REIMPLEMENTARSE.

## B. Recursos genéricos reemplazables

Por ejemplo:

- Icono de ubicación.
- Icono de calendario.
- Sobre.
- Vestido.
- Regalo.
- Música.

Reemplazarlos utilizando:

- Iconografía ya disponible en TECNOJACK.
- CSS.
- SVG propios/genéricos disponibles en el proyecto.

## C. Recursos específicos del sitio original

Por ejemplo:

- Fotografías.
- Logos.
- Ilustraciones propietarias.
- Branding.

NO copiarlos.

---

# 11. TIPOGRAFÍA

Analiza las fuentes utilizadas por la referencia.

No agregues automáticamente todas las fuentes externas que encuentres.

Determina:

- Qué función cumple cada fuente.
- Fuente display.
- Fuente script.
- Fuente de lectura.
- Pesos utilizados.

Después reproduce una combinación visual equivalente utilizando preferiblemente:

1. Fuentes ya existentes en TECNOJACK.
2. Fuentes libres que ya estén configuradas.
3. Una nueva fuente solamente si realmente es necesaria.

Evitar cargar muchas familias tipográficas.

---

# 12. PALETA

Extrae conceptualmente la paleta del diseño de referencia:

- Background principal.
- Background secundario.
- Texto.
- Accent.
- Botones.
- Ornamentos.

Adáptala teniendo en cuenta la fotografía real que tenemos disponible.

No copiar ciegamente colores que no funcionen con nuestra fotografía.

Además, recuerda:

**Verde, azul y morado son colores reservados que los invitados deben evitar en su vestimenta.**

La sección de vestuario debe comunicarlo correctamente.

---

# 13. COUNTDOWN

Si la referencia tiene un countdown visualmente atractivo, reproducir su dirección visual.

Pero utilizar nuestra fecha:

**4 de octubre de 2026 — 07:00 PM**

Debe mostrar:

- Días.
- Horas.
- Minutos.
- Segundos.

La lógica debe ser nuestra.

NO utilizar servicios o JavaScript del sitio original.

---

# 14. EVENTO / FECHA / UBICACIÓN

Adaptar las secciones equivalentes del diseño de referencia utilizando:

**Fecha:** 4 de octubre de 2026  
**Hora:** 07:00 PM  
**Lugar:** Aves de Jerusalen

Si el diseño original tiene botón:

**¿Cómo llegar?**

podemos conservar ese patrón visual.

Sin embargo, NO generar una ubicación falsa.

Si no existe información suficiente para navegación confiable, dejar el CTA preparado/configurable.

---

# 15. DRESS CODE

Si la referencia tiene una sección de vestuario, utilizarla como base visual.

Nuestro contenido real es:

> Les pedimos amablemente evitar los tonos verde, azul y morado en la vestimenta, ya que han sido reservados para la celebración.

Debe mostrarse visualmente:

- Verde.
- Azul.
- Morado.

Pero dejando completamente claro que:

**SON COLORES QUE LOS INVITADOS DEBEN EVITAR.**

No son los colores recomendados.

---

# 16. LLUVIA DE SOBRES

Si el diseño de referencia contiene una sección de regalos, reutilizar su estructura visual.

Nuestro contenido debe ser:

> Tu presencia será, sin duda, el regalo más bonito. Si deseas tener un detalle conmigo, hemos elegido la modalidad de lluvia de sobres, que recibiremos con muchísimo cariño y gratitud.

No utilizar cuentas bancarias, enlaces de regalos o datos que aparezcan en la referencia.

---

# 17. INVITADOS PERSONALIZADOS

Esta funcionalidad NO debe salir del código de referencia.

Debe salir de nuestra arquitectura TECNOJACK.

Mantener las **55 invitaciones/grupos** definidos en el prompt anterior.

La página debe resolver el grupo mediante el slug.

Ejemplo conceptual:

```text
/invitations/xv/sandra-yepes
```

Debe mostrar:

**Esta invitación ha sido preparada especialmente para ustedes**

Sandra Yepes  
John Jairo Bermudez  
Samuel Bermudez  
Eliana Bermudez

**Invitación para 4 personas**

---

# 18. SINGULAR Y PLURAL

Esto sigue siendo OBLIGATORIO.

El código de referencia NO debe hacer que perdamos esta funcionalidad.

## Individual

Utilizar:

- ti.
- te.
- tu.
- te espero.
- confirmo.
- 1 persona.

## Grupal

Utilizar:

- ustedes.
- los/las esperamos según la redacción neutral más adecuada.
- su invitación.
- confirmamos.
- X personas.

Mostrar SIEMPRE todos los integrantes del grupo.

No esconder nombres.

---

# 19. CONFIRMACIÓN

La referencia puede contener formularios o modales de confirmación.

Puedes utilizar su UX como inspiración.

PERO nuestra implementación debe seguir la funcionalidad definida:

### CTA

**Confirmar asistencia**

### Fecha límite

**10 de septiembre de 2026**

### Destino

WhatsApp:

**+57 301 747 7950**

La confirmación debe abrir WhatsApp con mensaje personalizado.

NO utilizar endpoints/formularios del proveedor original.

NO enviar datos al proveedor original.

---

# 20. MODALES

Si la referencia utiliza modales para:

- Cómo llegar.
- Dress code.
- Confirmación.
- Regalos.
- Información adicional.

Analiza si realmente mejoran nuestra UX.

No copies modales innecesariamente.

Puedes:

- Reproducirlos.
- Convertirlos en secciones.
- Convertirlos en bottom sheets para mobile.
- Simplificarlos.

Siempre priorizando la experiencia mobile.

---

# 21. PRELOADER / ENTRADA

Analiza el preloader del código original.

Si contribuye significativamente a la experiencia, crear una versión propia.

Debe:

- Ser ligera.
- No bloquear innecesariamente.
- No agregar varios segundos artificiales.
- Desaparecer cuando la página esté lista.
- Respetar accesibilidad.
- No afectar negativamente LCP.

Si el loader original es puramente decorativo y empeora performance, recrear únicamente la sensación de entrada mediante animaciones.

---

# 22. MÚSICA

Si el código fuente de referencia contiene música o controles musicales:

NO copiar automáticamente la canción del sitio original.

NO utilizar su archivo de audio.

Si nuestra invitación no tiene canción suministrada, dejar esta funcionalidad fuera o preparada/configurable.

NO inventar una canción.

Además, evitar autoplay con audio no solicitado.

---

# 23. FUNCIONES QUE APAREZCAN EN LA REFERENCIA PERO NO NECESITEMOS

Es posible que el código original incluya:

- Sugerir canción.
- Galería.
- Instagram.
- Hashtag.
- Mesa de regalos.
- Alojamientos.
- Transporte.
- Ceremonia religiosa.
- Segundo evento.
- Formulario propio.
- Idiomas.
- Compartir en redes.
- Información que nuestra cliente no solicitó.

NO copiar funcionalidades simplemente porque existen.

Antes de portar una sección pregúntate:

**¿Esta sección tiene equivalente en los requerimientos reales de nuestra invitación?**

Si no lo tiene, omitirla.

---

# 24. ORDEN DE PRIORIDAD

Cuando tomes decisiones utiliza este orden:

## PRIORIDAD 1 — DATOS Y REQUERIMIENTOS

Prompt anterior.

## PRIORIDAD 2 — ARQUITECTURA

Implementación actual de invitaciones de TECNOJACK.CO.

## PRIORIDAD 3 — DISEÑO

Código fuente `.md` suministrado como referencia.

## PRIORIDAD 4 — DECISIONES NUEVAS

Solo cuando ninguna de las fuentes anteriores resuelva el problema.

---

# 25. RESPONSIVE

Analiza específicamente el CSS responsive del código fuente.

No copies breakpoints ciegamente.

Reproduce el comportamiento visual adaptándolo a nuestro proyecto.

Validar:

- 320px.
- 360px.
- 375px.
- 390px.
- 414px.
- Tablet.
- Desktop.

La prioridad absoluta es MOBILE.

---

# 26. COMPONENTIZACIÓN

NO conviertas cada `<section>` del HTML original automáticamente en un componente Angular.

Componentiza según responsabilidad.

Por ejemplo, conceptualmente podrían existir:

- XV Hero.
- Invitation Message.
- Guest Presentation.
- Countdown.
- Event Details.
- Dress Code.
- Gift / Lluvia de sobres.
- RSVP.

Pero analiza primero qué nivel de componentización es coherente con el proyecto actual.

Evitar tanto:

- Un componente gigantesco.

como:

- 30 componentes diminutos sin valor arquitectónico.

---

# 27. ESTILOS

No copies simplemente miles de líneas del CSS original.

Analiza cuáles estilos realmente producen el diseño.

Reconstruye una hoja de estilos:

- Limpia.
- Organizada.
- Responsive.
- Mantenible.
- Sin reglas muertas.
- Sin selectores provenientes del sitio original que ya no tengan sentido.
- Sin `!important` innecesarios.
- Sin dependencias globales peligrosas.

Evitar contaminar estilos globales de TECNOJACK.CO.

Preferir encapsulación del componente o la estrategia ya utilizada por el proyecto.

---

# 28. ANIMACIONES

Identifica las animaciones del original y clasifícalas:

### Mantener
Animaciones que aportan a la experiencia.

### Simplificar
Animaciones demasiado complejas que pueden lograrse con CSS.

### Eliminar
Animaciones innecesarias, pesadas o que dependan de plugins.

Recrear utilizando preferiblemente:

- CSS.
- Angular.
- IntersectionObserver.
- Web Animations API si ya existe un patrón apropiado.

NO instalar una librería enorme únicamente para un fade/reveal.

---

# 29. ICONOGRAFÍA

Si el sitio original utiliza iconos propios, reemplazarlos.

Utilizar preferentemente la solución de iconografía que ya exista en TECNOJACK.CO.

Mantener equivalencia semántica:

- Calendario.
- Reloj.
- Ubicación.
- Vestimenta.
- Sobre.
- WhatsApp.
- Confirmación.

---

# 30. COMPARACIÓN FINAL

Una vez implementada la invitación, compara mental y técnicamente:

**REFERENCIA vs IMPLEMENTACIÓN**

Revisar:

- Hero.
- Ritmo.
- Tipografía.
- Jerarquía.
- Countdown.
- Cards.
- Ornamentación.
- Espaciados.
- Botones.
- Transiciones.
- Responsive.
- Sensación general.

La implementación debe conservar claramente el carácter visual que hizo atractiva la referencia.

---

# 31. NO SACRIFICAR NUESTRAS FUNCIONALIDADES POR FIDELIDAD VISUAL

La fidelidad visual NO puede romper:

- Slugs.
- Personalización.
- Invitados.
- Cupos.
- Singular/plural.
- WhatsApp.
- Countdown.
- Responsive.
- Accesibilidad.
- Build.
- Invitaciones de boda existentes.

Si existe un conflicto:

**la funcionalidad correcta tiene prioridad.**

---

# 32. IMPLEMENTACIÓN EN DOS FASES INTERNAS

Antes de modificar código, realiza internamente:

## FASE A — ANÁLISIS

Determina:

1. Arquitectura actual TECNOJACK.
2. Arquitectura del HTML de referencia.
3. Secciones equivalentes.
4. Elementos reutilizables.
5. Elementos que deben recrearse.
6. Elementos que deben descartarse.
7. Dependencias externas que NO deben portarse.
8. Estrategia Angular final.

NO necesito que te detengas a pedirme autorización después de este análisis.

Continúa directamente.

## FASE B — IMPLEMENTACIÓN

Implementa la adaptación completa.

---

# 33. NO TE DETENGAS POR ASSETS FALTANTES

Si falta:

- Nombre de la quinceañera.
- Coordenadas.
- Música.
- Algún asset.

No detengas toda la implementación.

Utiliza configuración/placeholder técnico claramente identificado SOLO para el dato faltante.

NO inventes información.

La página debe quedar funcional con todos los datos disponibles.

---

# 34. RESULTADO ESPERADO

Quiero que el resultado final sea:

**La experiencia visual de la invitación de referencia, reinterpretada profesionalmente dentro de TECNOJACK.CO, utilizando Angular y nuestros datos reales.**

NO:

**El HTML original metido dentro de Angular.**

NO:

**Una invitación TECNOJACK genérica que ignore la referencia.**

SÍ:

**Una reconstrucción Angular limpia, mantenible y visualmente muy cercana a la referencia.**

---

# 35. VALIDACIÓN FINAL

Además de todas las validaciones del prompt anterior:

1. Verificar que NO exista dependencia runtime hacia el sitio de referencia.
2. Verificar que no haya URLs del proveedor original.
3. Verificar que no haya nombres/datos del evento de referencia.
4. Verificar que no haya fotografías del evento de referencia.
5. Verificar que no haya endpoints del proveedor.
6. Verificar que no se haya agregado jQuery innecesariamente.
7. Verificar que no se haya agregado Bootstrap si TECNOJACK no lo utiliza.
8. Verificar que no se hayan agregado plugins innecesarios.
9. Verificar que los estilos no afecten otras páginas.
10. Verificar que el diseño conserve alta similitud visual.
11. Verificar mobile.
12. Verificar desktop.
13. Ejecutar build de producción.

---

# 36. INFORME FINAL ADICIONAL

En el informe final agrega una sección:

## ADAPTACIÓN DE LA REFERENCIA

Indica:

### Elementos replicados
Qué elementos visuales/UX del código de referencia fueron recreados.

### Elementos adaptados
Qué elementos tuvieron que cambiar debido a nuestros requerimientos.

### Elementos omitidos
Qué elementos del original fueron descartados y por qué.

### Dependencias reemplazadas
Por ejemplo:

`jQuery → Angular/CSS`

`Slick → no requerido`

`Plugin externo → implementación propia`

### Assets
Indica qué assets del sitio original NO fueron utilizados y con qué fueron reemplazados.

### Fidelidad
Explica brevemente qué decisiones se tomaron para conservar la apariencia original sin copiar infraestructura innecesaria.

### Diferencias
Enumera cualquier diferencia visual importante que haya sido necesaria por:

- Tener una sola fotografía.
- Falta de algún asset.
- Responsive.
- Accesibilidad.
- Performance.
- Datos reales de nuestro evento.

---

Implementa directamente.

No me pidas confirmación entre el análisis y la implementación.

Utiliza el código fuente `.md` como referencia visual principal, las invitaciones existentes de TECNOJACK.CO como referencia arquitectónica y el prompt anterior como fuente oficial de datos y requerimientos.