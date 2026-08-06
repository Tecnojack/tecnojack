import { ContractDocument } from '../models/contract.model';
import { ContractPdfViewModel } from '../models/contract-pdf.model';
import { CURRENT_CONTRACT_TEMPLATE_VERSION, CURRENT_PRIVACY_VERSION, CURRENT_TERMS_VERSION } from './contract-template-builder.util';

export function mapContractDocumentToPdfViewModel(c: ContractDocument, isWatermarkPreview = false): ContractPdfViewModel {
  const now = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  const signedAtFormatted = c.signature?.signedAt
    ? new Date(c.signature.signedAt).toLocaleString('es-CO')
    : (c.snapshot?.lockedAt ? new Date(c.snapshot.lockedAt).toLocaleString('es-CO') : undefined);

  // Parsear el texto completo de las cláusulas a objetos individuales
  const rawText = c.snapshot?.contractText || '';
  const paragraphs = rawText.split('\n').map((p) => p.trim()).filter(Boolean);

  const clauses: Array<{ number: number; title: string; body: string }> = [];
  let clauseIndex = 1;
  let currentTitle = '';
  let currentBody: string[] = [];

  for (const para of paragraphs) {
    const isClauseHeader = /^(CLÁUSULA|PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMA|\d+\.)/i.test(para);
    if (isClauseHeader) {
      if (currentTitle) {
        clauses.push({
          number: clauseIndex++,
          title: currentTitle,
          body: currentBody.join(' '),
        });
        currentBody = [];
      }
      currentTitle = para;
    } else {
      if (!currentTitle) {
        currentTitle = `CLÁUSULA GENERAL`;
      }
      currentBody.push(para);
    }
  }

  if (currentTitle) {
    clauses.push({
      number: clauseIndex,
      title: currentTitle,
      body: currentBody.join(' '),
    });
  }

  const statusMap: Record<string, string> = {
    draft: 'Borrador',
    ready_to_sign: 'Listo para firma',
    opened: 'En revisión',
    signed: 'Firmado e Inmutabilizado',
    completed: 'Completado',
    cancelled: 'Cancelado',
    expired: 'Expirado',
  };

  return {
    contractNumber: c.contractNumber || 'TJ-GENERICO',
    status: statusMap[c.status] || 'Borrador',
    generatedAt: now,
    signedAt: signedAtFormatted,
    isWatermarkPreview,

    company: {
      name: 'TECNOJACK · Producción Audiovisual',
      representative: 'Jackson Palacios',
      document: 'NIT / C.C. Oficial TECNOJACK',
      email: 'tecnojack.films@gmail.com',
      website: 'https://tecnojack.co',
      whatsapp: '+57 314 5406467',
    },

    client: {
      fullName: c.client.fullName || 'Cliente Contratante',
      documentType: c.client.documentType || 'CC',
      documentNumber: c.client.documentNumber || 'Pendiente',
      email: c.client.email || 'correo@ejemplo.com',
      phone: c.client.phone || '300 000 0000',
      city: c.client.city || 'Medellín',
      address: c.client.address || '',
    },

    service: {
      packageName: c.service.packageName || 'Servicio Audiovisual',
      date: c.service.eventDate || 'Por definir',
      location: c.service.location || 'Por definir',
      features: c.service.features || [],
      deliverables: c.service.deliverables || [],
      additionalServices: (c.service.additionalServices || []).map((a) => ({
        name: a.name,
        value: a.value,
      })),
    },

    payment: {
      currency: c.payment.currency || 'COP',
      baseAmount: c.payment.baseAmount || 0,
      extrasAmount: c.payment.extrasAmount || 0,
      transportAmount: c.payment.transportAmount || 0,
      discountAmount: c.payment.discountAmount || 0,
      totalAmount: c.payment.totalAmount || 0,
      paidAmount: c.payment.paidAmount || 0,
      paidPercentage: c.payment.paidPercentage || 40,
      remainingAmount: c.payment.remainingAmount || 0,
    },

    acceptances: {
      terms: !!c.acceptances?.termsAccepted,
      privacy: !!c.acceptances?.privacyAccepted,
      accuracy: !!c.acceptances?.informationAccuracyAccepted,
      electronicSignature: !!c.acceptances?.electronicSignatureAccepted,
      imageUseChoice: c.acceptances?.imageUseChoice || 'authorized',
      imageUseRestrictions: c.acceptances?.imageUseRestrictions || '',
    },

    clauses: clauses.length > 0 ? clauses : [
      {
        number: 1,
        title: 'CLÁUSULA PRIMERA - OBJETO DEL CONTRATO',
        body: c.snapshot?.contractText || 'Prestación de servicios de cobertura fotográfica y videográfica profesional.',
      },
    ],

    signature: c.signature
      ? {
          method: c.signature.method || 'Firma electrónica trazable',
          signerName: c.signature.signerName || c.client.fullName || 'Cliente Contratante',
          signerDocument: c.signature.signerDocument || `${c.client.documentType} ${c.client.documentNumber}`,
          imageDataOrUrl: c.signature.signatureDataUrl,
          signedAt: signedAtFormatted || new Date().toLocaleString('es-CO'),
          ipAddress: c.signature.ipAddress,
        }
      : undefined,

    integrity: {
      sha256: c.pdf?.sha256 || undefined,
      contractVersion: c.templateVersion || CURRENT_CONTRACT_TEMPLATE_VERSION,
      termsVersion: c.termsVersion || CURRENT_TERMS_VERSION,
      privacyVersion: c.privacyVersion || CURRENT_PRIVACY_VERSION,
      recordId: c.id,
    },
  };
}
