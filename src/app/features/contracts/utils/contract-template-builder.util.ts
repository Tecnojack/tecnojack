import { ContractClientInfo, ContractPaymentInfo, ContractServiceInfo } from '../models/contract.model';
import { formatCurrency } from './contract-financial.util';

export const CURRENT_CONTRACT_TEMPLATE_VERSION = 'v1.0-2026';
export const CURRENT_TERMS_VERSION = 'v1.0-2026';
export const CURRENT_PRIVACY_VERSION = 'v1.0-2026';

export interface BuildContractTextOptions {
  contractNumber: string;
  client: ContractClientInfo;
  service: ContractServiceInfo;
  payment: ContractPaymentInfo;
}

export function buildContractText(options: BuildContractTextOptions): string {
  const { contractNumber, client, service, payment } = options;

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

  return `CONTRATO DE PRESTACIÓN DE SERVICIOS AUDIOVISUALES Y DE PRODUCCIÓN
CONTRATO N°: ${contractNumber}

1. IDENTIFICACIÓN DE LAS PARTES
Entre los suscritos, por una parte TECNOJACK, representada legalmente por Jackson Isaac Palacios Córdoba, identificado con C.C. 1079096545 de Medellín, Colombia, con correo electrónico tecnojack.films@gmail.com y sitio web https://tecnojack.co (en adelante "TECNOJACK"); y por otra parte ${client.fullName.toUpperCase()}, identificado(a) con ${client.documentType} N° ${client.documentNumber}, residente en la ciudad de ${client.city || 'No especificada'}, correo electrónico ${client.email} y teléfono ${client.phone} (en adelante "EL CLIENTE"), se celebra el presente contrato de prestación de servicios.

2. OBJETO
El presente contrato tiene por objeto la prestación por parte de TECNOJACK de los servicios audiovisuales y de producción fotográfica/videográfica para el evento o proyecto denominado "${service.packageName}", a realizarse en la fecha ${service.eventDate || 'Por confirmar'} en la ciudad o locación ${service.location || 'Por confirmar'}.

3. ALCANCE DEL SERVICIO
El alcance del servicio comprende:
A. Características del paquete:
${featuresList}

B. Entregables contratados:
${deliverablesList}

C. Adicionales o complementos acordados:
${extrasList}

4. VALOR, ANTICIPO RECIBIDO Y SALDO
Las partes acuerdan las siguientes condiciones económicas:
- Valor base del paquete: ${formatCurrency(payment.baseAmount, payment.currency)}
- Servicios adicionales: ${formatCurrency(payment.extrasAmount, payment.currency)}
- Transporte y viáticos: ${formatCurrency(payment.transportAmount, payment.currency)}
- Descuento aplicado: ${formatCurrency(payment.discountAmount, payment.currency)}
- VALOR TOTAL DEL CONTRATO: ${formatCurrency(payment.totalAmount, payment.currency)}
- Anticipo recibido previamente: ${formatCurrency(payment.paidAmount, payment.currency)} (${payment.paidPercentage}% del total)
- SALDO PENDIENTE A LA FIRMA: ${formatCurrency(payment.remainingAmount, payment.currency)}

5. RESERVA Y CONFIRMACIÓN
Las partes declaran que, antes de la firma del presente contrato, EL CLIENTE realizó el pago anticipado indicado en el resumen económico y que TECNOJACK confirmó su recepción. El anticipo corresponde a la reserva de la fecha y al inicio de las actividades necesarias para la prestación del servicio. El valor abonado, el porcentaje correspondiente y el saldo pendiente forman parte integral del contrato. El saldo pendiente deberá ser cancelado antes de la fecha del evento o según el cronograma acordado por escrito.

6. OBLIGACIONES DE TECNOJACK
TECNOJACK se compromete a:
- Disponer del equipo técnico y humano calificado para la cobertura acordada.
- Ejecutar la producción con los estándares de calidad y estilo visual distintivos de la marca.
- Realizar la edición y entrega de los materiales en los plazos y formatos estipulados.

7. OBLIGACIONES DEL CLIENTE
EL CLIENTE se compromete a:
- Suministrar información veraz, oportuna y completa para la logística de producción.
- Facilitar los accesos, permisos y condiciones de seguridad necesarios en la locación.
- Cancelar el saldo pendiente en los plazos establecidos.

8. CONDICIONES DE EJECUCIÓN
La cobertura se limitará a los horarios, momentos y locaciones pactadas. El tiempo de retraso o imprevistos no imputables a TECNOJACK podrá ser computado dentro del tiempo total de cobertura contratado.

9. SELECCIÓN, EDICIÓN Y REVISIONES
Salvo que el anexo indique algo diferente, el servicio incluye una ronda de ajustes menores sobre el material editado. Cambios de enfoque, reediciones completas, sustitución masiva de contenido o solicitudes posteriores a la aprobación se cotizarán por separado.

10. ENTREGA Y CONSERVACIÓN DE ARCHIVOS
La entrega se considera realizada cuando TECNOJACK envía al correo, teléfono o medio acordado el enlace habilitado para acceder al material. TECNOJACK conservará una copia de respaldo del material final durante noventa (90) días calendario posteriores a la entrega. Después de este periodo podrá eliminar los archivos sin responsabilidad. EL CLIENTE es responsable de descargar y respaldar oportunamente sus entregables.

11. ARCHIVOS RAW Y ARCHIVOS FUENTE
Los archivos RAW, negativos digitales, proyectos editables, líneas de tiempo, archivos de trabajo, sesiones, material descartado y demás recursos intermedios forman parte del proceso interno de producción y no se consideran entregables, salvo acuerdo escrito y valoración adicional.

12. CRITERIO CREATIVO
EL CLIENTE declara conocer y aceptar la línea estética, narrativa y técnica de TECNOJACK. Las decisiones de encuadre, iluminación, color, montaje, selección, ritmo, musicalización y tratamiento visual corresponden al criterio profesional y creativo de TECNOJACK, dentro del alcance contratado. Las diferencias de gusto subjetivo que no contradigan expresamente lo pactado no constituyen incumplimiento.

13. MÚSICA, LICENCIAS Y MATERIAL DE TERCEROS
TECNOJACK utilizará licencias musicales y librerías autorizadas para uso comercial o digital. Si EL CLIENTE solicita canciones específicas sujetas a derechos de autor no licenciables, asumirá la responsabilidad por eventuales bloqueos o restricciones en plataformas digitales.

14. PROPIEDAD INTELECTUAL
Los derechos patrimoniales sobre las obras audiovisuales entregadas se transfieren al CLIENTE para su uso personal y no comercial. Los derechos morales permanecen en cabeza de TECNOJACK como autor de la obra.

15. USO DE IMAGEN
El tratamiento y la autorización sobre el uso promocional del material fotográfico y videográfico se regirán por la opción seleccionada explícitamente por EL CLIENTE en el apartado de autorizaciones legales de este contrato.

16. PROTECCIÓN DE DATOS
TECNOJACK tratará los datos personales suministrados conforme a la Ley 1581 de 2012 y su política de privacidad publicada en https://tecnojack.co/terminos-y-condiciones.

17. SERVICIOS DIGITALES Y WEB
Para invitaciones web o desarrollos digitales adicionales, TECNOJACK garantiza la disponibilidad del sitio durante el periodo acordado. No se responde por caídas derivadas de fallas globales de infraestructura de terceros.

18. TRANSPORTE, VIÁTICOS Y MODALIDAD DESTINATION
Los precios de los paquetes ordinarios no incluyen transporte fuera del Área Metropolitana de Medellín. Si el evento requiere desplazamientos nacionales o internacionales, aplicarán las condiciones de la modalidad Destination y los viáticos serán asumidos por EL CLIENTE.

19. SERVICIOS ADICIONALES Y HORAS EXTRA
Cualquier solicitud adicional no contemplada en la propuesta inicial o la extensión de horas de cobertura el día del evento se cotizará y facturará por separado.

20. REPROGRAMACIÓN Y CANCELACIÓN
En caso de cancelación por parte del CLIENTE, el anticipo no será reembolsable debido a la reserva de la fecha. Las solicitudes de reprogramación estarán sujetas a la disponibilidad de agenda de TECNOJACK.

21. FUERZA MAYOR
Ninguna de las partes será responsable por demoras o incumplimientos derivados de eventos de fuerza mayor o caso fortuito debidamente probados.

22. LIMITACIÓN DE RESPONSABILIDAD
Cuando legalmente proceda, la responsabilidad económica total de TECNOJACK derivada del servicio se limitará al valor efectivamente pagado por EL CLIENTE en virtud del contrato correspondiente.

23. FIRMA ELECTRÓNICA Y EVIDENCIA
EL CLIENTE acepta utilizar mecanismos electrónicos para manifestar su consentimiento y reconoce que la identificación suministrada, las aceptaciones registradas, la rúbrica o firma incorporada, la fecha, la hora, el dispositivo, la dirección IP, la versión contractual y la huella digital del documento conforman evidencia del proceso de aceptación.

24. TÉRMINOS Y CONDICIONES INCORPORADOS
EL CLIENTE declara conocer y aceptar los Términos y Condiciones publicados en https://tecnojack.co/terminos-y-condiciones, los cuales forman parte integral del presente contrato.

25. LEY APLICABLE Y SOLUCIÓN DE CONTROVERSIAS
Este contrato se rige por las leyes de la República de Colombia. Cualquier controversia será resuelta en primera instancia mediante arreglo directo entre las partes.

26. ACEPTACIÓN
El presente contrato se entiende firmado e irrevocablemente aceptado con la incorporación de la firma electrónica del CLIENTE y la emisión del comprobante digital correspondientes.

27. ANEXOS
Forman parte de este contrato el resumen del servicio, el desglose económico y la evidencia técnica de la firma electrónica.
`;
}
