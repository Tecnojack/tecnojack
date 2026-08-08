import { ContractClientInfo, ContractPaymentInfo, ContractServiceInfo, ContractAcceptances } from '../models/contract.model';
import { formatCurrency } from './contract-financial.util';

export const CURRENT_CONTRACT_TEMPLATE_VERSION = 'v1.0-2026';
export const CURRENT_TERMS_VERSION = 'v1.0-2026';
export const CURRENT_PRIVACY_VERSION = 'v1.0-2026';

export interface BuildContractTextOptions {
  contractNumber: string;
  client: ContractClientInfo;
  service: ContractServiceInfo;
  payment: ContractPaymentInfo;
  acceptances?: ContractAcceptances;
}

export function buildContractText(options: BuildContractTextOptions): string {
  const { contractNumber, client, service, payment, acceptances } = options;

  const deliverablesList = service.deliverables.length
    ? service.deliverables.map((item) => `- ${item}`).join('\n')
    : '- Según propuesta acordada.';

  const featuresList = service.features.length
    ? service.features.map((item) => `- ${item}`).join('\n')
    : '- Según propuesta acordada.';

  const extrasList = service.additionalServices.length
    ? service.additionalServices
        .map((extra) => `- ${extra.name}: ${formatCurrency(extra.value, payment.currency)}`)
        .join('\n')
    : '- Ningún servicio adicional contratado.';

  const fullContractTitle = `Contrato TECNOJACK - ${client.fullName || 'Cliente'} - CC ${client.documentNumber || ''}`;

  // Determinar dinámicamente si es un contrato Corporativo o Personal
  const isCorporate =
    (client.businessName && client.businessName.trim().length > 0) ||
    client.documentType === 'NIT' ||
    service.category === 'corporativos' ||
    /corporativo|empresa|institucional|marca personal|redes/i.test(service.packageName || '');

  const ipLicenseText = isCorporate
    ? 'EL CLIENTE recibe una licencia de uso comercial sobre los productos finales entregados para las actividades propias de su empresa, negocio, marca o proyecto, dentro de los alcances acordados. Los derechos morales que correspondan permanecen en cabeza de sus autores conforme a la legislación aplicable.'
    : 'EL CLIENTE recibe una licencia de uso personal y privado sobre los productos finales entregados, incluyendo su publicación en redes sociales personales, salvo acuerdo diferente. Los derechos morales que correspondan permanecen en cabeza de sus autores conforme a la legislación aplicable.';

  // Determinar dinámicamente el plazo de entrega
  let deliveryPlazoText = 'Como referencia general, las fotografías podrán entregarse entre una (1) y tres (3) semanas y los productos de video entre dos (2) y seis (6) semanas posteriores a la prestación del servicio. Estos tiempos podrán variar según la complejidad del proyecto, cantidad de material, carga de producción o dependencias pendientes por parte de EL CLIENTE.';
  if (service.packageName.toLowerCase().includes('esencial')) {
    deliveryPlazoText = 'Para el paquete Esencial, las fotografías se entregarán en un plazo estimado de una (1) a dos (2) semanas y los productos de video en un plazo estimado de dos (2) a cuatro (4) semanas posteriores a la prestación del servicio.';
  } else if (service.packageName.toLowerCase().includes('completo') || service.packageName.toLowerCase().includes('pro')) {
    deliveryPlazoText = 'Para el paquete Completo/Pro, las fotografías se entregarán en un plazo estimado de dos (2) a tres (3) semanas y los productos de video en un plazo estimado de tres (3) a cinco (5) semanas posteriores a la prestación del servicio.';
  } else if (service.packageName.toLowerCase().includes('premium') || service.packageName.toLowerCase().includes('cinemático')) {
    deliveryPlazoText = 'Para el paquete Premium/Cinemático, las fotografías se entregarán en un plazo estimado de dos (2) a tres (3) semanas y los productos de video en un plazo de cuatro (4) a seis (6) semanas posteriores a la prestación del servicio.';
  }

  // Cláusula de uso de imagen según la elección
  let imageUseText = 'EL CLIENTE autoriza expresamente a TECNOJACK a exhibir extractos, fotografías y videos del material final entregado en su portafolio comercial, redes sociales y sitio web con fines promocionales.';
  if (acceptances) {
    if (acceptances.imageUseChoice === 'not_authorized') {
      imageUseText = 'EL CLIENTE NO autoriza la exhibición ni el uso promocional del material fotográfico o de video en los canales de portafolio o redes de TECNOJACK, por lo cual este material se mantendrá bajo reserva privada.';
    } else if (acceptances.imageUseChoice === 'restricted') {
      imageUseText = `EL CLIENTE autoriza la exhibición promocional del material sujeto a las siguientes restricciones expresas: ${acceptances.imageUseRestrictions || 'Ninguna especificada'}.`;
    }
  }

  return `${fullContractTitle}
CONTRATO N°: ${contractNumber}

1. IDENTIFICACIÓN DE LAS PARTES
Entre los suscritos, por una parte TECNOJACK, representada legalmente por Jackson Isaac Palacios Córdoba, identificado con C.C. 1079096545 de Medellín, Colombia, con correo electrónico tecnojack.films@gmail.com y sitio web https://tecnojack.co (en adelante "TECNOJACK"); y por otra parte ${client.fullName.toUpperCase() || 'EL CLIENTE'}, identificado(a) con ${client.documentType || 'CC'} N° ${client.documentNumber || 'Pendiente'}, residente en la ciudad de ${client.city || 'No especificada'}, correo electrónico ${client.email || 'No especificado'} y teléfono ${client.phone || 'No especificado'} (en adelante "EL CLIENTE"), se celebra el presente contrato de prestación de servicios de conformidad con las siguientes cláusulas:

2. OBJETO
El presente contrato tiene por objeto la prestación por parte de TECNOJACK de los servicios audiovisuales y de producción fotográfica/videográfica para el evento o proyecto denominado "${service.packageName}", a realizarse en la fecha ${service.eventDate || 'Por definir'} en la ciudad o locación ${service.location || 'Por definir'}.

3. ALCANCE DEL SERVICIO
El alcance del servicio comprende:
A. Características del paquete:
${featuresList}

B. Entregables contratados:
${deliverablesList}

C. Adicionales o complementos acordados:
${extrasList}

4. CONDICIONES ECONÓMICAS
Los valores económicos totales y el esquema de pagos se encuentran definidos en el Resumen Económico de este documento y en el Anexo Financiero de la página de liquidación. El valor total pactado incluye el servicio principal y los adicionales seleccionados en la portada.

5. PLAZOS DE ENTREGA Y CONDICIONES DE PAGO
TECNOJACK realizará la entrega de los productos finales dentro de los plazos establecidos. ${deliveryPlazoText} El saldo restante deberá cancelarse en su totalidad el día del evento o antes de la entrega o envío de los archivos finales.

6. CANCELACIÓN Y REPROGRAMACIÓN
El anticipo entregado por EL CLIENTE tiene como finalidad reservar la fecha y permitir el inicio de la planeación y producción del servicio, por lo cual no será reembolsable cuando la cancelación sea imputable a EL CLIENTE, sin perjuicio de las normas imperativas aplicables. Las solicitudes de reprogramación estarán sujetas a disponibilidad de agenda de TECNOJACK y podrán generar costos adicionales cuando impliquen cambios de logística, personal, desplazamientos, reservas, alquileres o proveedores ya contratados. Cuando TECNOJACK deba cancelar definitivamente el servicio por una causa atribuible directamente a sí mismo y no resulte posible reprogramarlo o reemplazar razonablemente al equipo, devolverá los valores recibidos correspondientes al servicio no prestado.

7. FUERZA MAYOR Y CASO FORTUITO
Ninguna de las partes será responsable por incumplimientos o retrasos derivados de situaciones de fuerza mayor o caso fortuito debidamente acreditadas, tales como condiciones climáticas adversas, enfermedad o accidente grave del personal asignado, restricciones de autoridades, situaciones de orden público, cierres de vías, fallas prolongadas de servicios esenciales, restricciones o cierres de locaciones, fallas generalizadas de infraestructura de terceros o cualquier situación imprevisible e irresistible. En estos casos las partes procurarán prioritariamente la reprogramación o una solución razonable según la naturaleza del servicio.

8. LIMITACIÓN DE RESPONSABILIDAD
Cuando legalmente proceda, la responsabilidad económica total de TECNOJACK derivada directamente del servicio contratado se limitará al valor efectivamente pagado por EL CLIENTE en virtud del presente contrato. Esta cláusula no pretende eliminar ni limitar derechos legales irrenunciables del consumidor conforme a la legislación aplicable.

9. CRITERIO CREATIVO
EL CLIENTE declara conocer y aceptar la línea estética, narrativa y técnica de TECNOJACK. Las decisiones relacionadas con encuadre, composición, iluminación, color, selección de material, montaje, ritmo, musicalización y tratamiento visual corresponden al criterio profesional y creativo de TECNOJACK dentro del alcance pactado. Las diferencias exclusivamente subjetivas de gusto que no contradigan expresamente las condiciones contratadas no constituirán por sí mismas un incumplimiento contractual.

10. ARCHIVOS RAW, NEGATIVOS Y MATERIAL DE TRABAJO
Los archivos RAW, negativos digitales, material descartado, proyectos editables (tales como Premiere, DaVinci), sesiones de edición (tales como Lightroom), líneas de tiempo (timelines), archivos fuente, cachés y demás recursos intermedios forman parte del proceso interno de producción y no constituyen entregables del servicio, salvo acuerdo escrito y valoración adicional.

11. REVISIONES Y CAMBIOS
Salvo que el paquete o propuesta indique algo diferente, el servicio incluye una ronda de ajustes menores sobre el material editado. Cambios estructurales, reediciones completas, modificaciones de concepto, sustitución masiva de contenido, nuevos montajes o solicitudes posteriores a una aprobación previa podrán considerarse servicios adicionales y cotizarse por separado.

12. RESPALDO Y CONSERVACIÓN
TECNOJACK conservará una copia de respaldo del material final durante un periodo de noventa (90) días calendario posteriores a la entrega. Cumplido dicho periodo, TECNOJACK podrá eliminar los archivos de sus sistemas sin responsabilidad posterior. EL CLIENTE será responsable de descargar y respaldar oportunamente sus entregables.

13. DEFINICIÓN DE ENTREGA DEL SERVICIO
La entrega se considerará realizada cuando TECNOJACK haya enviado al correo electrónico, teléfono, plataforma o medio previamente acordado el enlace o mecanismo habilitado para acceder al material final.

14. TRANSPORTE, VIÁTICOS Y DESTINATION
Los valores publicados o incluidos en los paquetes no incorporan automáticamente costos de transporte, desplazamientos, viáticos o logística especial, salvo que se indiquen expresamente en el resumen económico. Cuando el servicio requiera desplazamientos fuera del Área Metropolitana de Medellín, otra ciudad, otro país o una locación especial, podrán aplicarse las condiciones correspondientes a la modalidad Destination descritas en los Términos y Condiciones aceptados por EL CLIENTE.

15. HORAS EXTRA Y SERVICIOS ADICIONALES
Toda ampliación de cobertura, tiempo adicional, nuevo entregable, producto físico, edición adicional, nueva locación o servicio no contemplado originalmente deberá ser aprobado por EL CLIENTE y podrá modificar el valor total del servicio.

16. MÚSICA, LICENCIAS Y CONTENIDO DE TERCEROS
TECNOJACK utilizará música, recursos audiovisuales o materiales de terceros licenciados o autorizados cuando corresponda. Si EL CLIENTE solicita expresamente la utilización de una canción, obra o recurso protegido respecto del cual no exista una licencia adecuada, TECNOJACK informará esta condición y EL CLIENTE asumirá las posibles restricciones, bloqueos o reclamaciones derivadas de dicha solicitud.

17. PROPIEDAD INTELECTUAL
${ipLicenseText}

18. AUTORIZACIÓN SOBRE USO DE IMAGEN
${imageUseText}

19. ACEPTACIÓN DE TÉRMINOS Y CONDICIONES
EL CLIENTE declara haber leído y aceptado los Términos y Condiciones de TECNOJACK disponibles en: https://tecnojack.co/terminos-y-condiciones. La versión aceptada durante el proceso de firma (${CURRENT_TERMS_VERSION}) forma parte integral del presente contrato.

20. TRATAMIENTO DE DATOS PERSONALES
TECNOJACK tratará los datos personales suministrados con las finalidades necesarias para gestionar la relación contractual, comunicaciones, prestación del servicio, pagos, entrega, soporte, archivo y cumplimiento de obligaciones legales, conforme a la política de tratamiento de datos vigente (${CURRENT_PRIVACY_VERSION}) aceptada por EL CLIENTE.`;
}
