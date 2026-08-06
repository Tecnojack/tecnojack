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

  const fullContractTitle = `CONTRATO DE SERVICIOS AUDIOVISUALES TECNOJACK - ${service.packageName || 'SERVICIO'} - CC ${client.documentNumber || ''}`;

  return `${fullContractTitle}
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

5. CONDICIONES Y POLÍTICAS DE ENTREGA
- TECNOJACK entregará los productos finales acordados en los plazos establecidos tras la fecha de realización del evento.
- El saldo restante deberá cancelarse en su totalidad el día del evento o antes de la entrega del material final.
- EL CLIENTE declara conocer y aceptar que el material sin editar (RAW) no se incluye en la entrega estándar a menos que se estipule explícitamente como adicional contratado.

6. AUTORIZACIÓN Y PROPIEDAD INTELECTUAL
- EL CLIENTE conserva los derechos de uso personal sobre el material entregado.
- De conformidad con la opción seleccionada por EL CLIENTE en el formulario de contratación digital respecto al uso de imagen, TECNOJACK queda facultado o restringido para exhibir extractos del trabajo en su portafolio comercial o redes sociales.

7. COMPROBANTE Y FIRMA ELECTRÓNICA
- Este contrato se suscribe digitalmente mediante mecanismo de firma electrónica con comprobante de integridad SHA-256 e inmutabilidad de registro.`;
}
