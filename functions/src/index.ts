import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { generateContractPdf } from './services/pdf-generator.service';
import { sendContractSignedEmails } from './services/email-sender.service';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const storage = admin.storage();

export interface SignContractPayload {
  token: string;
  clientInfo: {
    fullName: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phone: string;
    city?: string;
    address?: string;
  };
  acceptances: {
    termsAccepted: boolean;
    privacyAccepted: boolean;
    electronicSignatureAccepted: boolean;
    imageUseChoice: 'authorized' | 'not_authorized' | 'restricted';
    imageUseRestrictions?: string;
    informationAccuracyAccepted: boolean;
  };
  signature: {
    method: 'typed' | 'drawn' | 'uploaded';
    signerName: string;
    signerDocument: string;
    signatureDataUrl?: string;
  };
}

export const generateContractPdfAndSign = functions.https.onCall(async (data: SignContractPayload, context) => {
  const { token, clientInfo, acceptances, signature } = data || {};

  if (!token || typeof token !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Token de contrato no suministrado.');
  }

  if (!acceptances?.termsAccepted || !acceptances?.privacyAccepted || !acceptances?.electronicSignatureAccepted || !acceptances?.informationAccuracyAccepted) {
    throw new functions.https.HttpsError('failed-precondition', 'Todas las aceptaciones legales obligatorias deben ser marcadas.');
  }

  if (!signature?.signerName?.trim() || !signature?.signerDocument?.trim()) {
    throw new functions.https.HttpsError('invalid-argument', 'Los datos de la firma no están completos.');
  }

  // Buscar el contrato por token
  const snapshotQuery = await db.collection('contracts').where('token', '==', token).limit(1).get();

  if (snapshotQuery.empty) {
    throw new functions.https.HttpsError('not-found', 'Contrato no encontrado o enlace inválido.');
  }

  const contractDoc = snapshotQuery.docs[0];
  const contractData = contractDoc.data();
  const contractId = contractDoc.id;

  if (contractData.status === 'signed' || contractData.status === 'completed' || contractData.status === 'pdf_generated') {
    throw new functions.https.HttpsError('already-exists', 'Este contrato ya ha sido firmado previamente y no se puede modificar.');
  }

  if (contractData.status === 'cancelled' || contractData.status === 'expired') {
    throw new functions.https.HttpsError('failed-precondition', 'El contrato se encuentra cancelado o expirado.');
  }

  if (contractData.tokenExpiresAt && new Date(contractData.tokenExpiresAt).getTime() < Date.now()) {
    throw new functions.https.HttpsError('deadline-exceeded', 'El enlace de firma del contrato ha expirado.');
  }

  const payment = contractData.payment || {};
  if (!payment.confirmedManually || (!payment.belowMinimumOverride && (payment.paidPercentage || 0) < 39.99)) {
    throw new functions.https.HttpsError('failed-precondition', 'El pago anticipado no ha sido verificado o no cumple el mínimo requerido.');
  }

  const signedAt = new Date().toISOString();
  const year = new Date().getFullYear().toString();

  // Guardar firma si viene en base64
  let signatureStoragePath: string | undefined;
  if (signature.signatureDataUrl && signature.signatureDataUrl.startsWith('data:image/')) {
    const bucket = storage.bucket();
    const sigPath = `contracts/${year}/${contractId}/signature.png`;
    const sigFile = bucket.file(sigPath);
    const base64Data = signature.signatureDataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    await sigFile.save(buffer, {
      contentType: 'image/png',
      metadata: { contractId, signedAt },
    });
    signatureStoragePath = sigPath;
  }

  // Generar PDF definitivo
  const contractText = contractData.snapshot?.contractText || '';
  const { pdfBytes, sha256 } = await generateContractPdf({
    contractNumber: contractData.contractNumber,
    clientName: clientInfo.fullName,
    clientDocument: `${clientInfo.documentType} ${clientInfo.documentNumber}`,
    contractText,
    totalAmountText: `${payment.totalAmount} ${payment.currency}`,
    paidAmountText: `${payment.paidAmount} ${payment.currency}`,
    remainingAmountText: `${payment.remainingAmount} ${payment.currency}`,
    signatureDataUrl: signature.signatureDataUrl,
    signedAt,
    isWatermarkPreview: false,
  });

  // Guardar PDF en Firebase Storage
  const bucket = storage.bucket();
  const pdfStoragePath = `contracts/${year}/${contractId}/contract-signed.pdf`;
  const pdfFile = bucket.file(pdfStoragePath);

  await pdfFile.save(Buffer.from(pdfBytes), {
    contentType: 'application/pdf',
    metadata: {
      contractId,
      sha256,
      signedAt,
    },
  });

  const [downloadUrl] = await pdfFile.getSignedUrl({
    action: 'read',
    expires: '03-01-2035',
  });

  // Transacción en Firestore para actualizar el contrato a firmado
  await db.runTransaction(async (transaction) => {
    const ref = db.collection('contracts').doc(contractId);
    const latestDoc = await transaction.get(ref);

    if (!latestDoc.exists) {
      throw new Error('Contrato no encontrado durante la transacción.');
    }

    const latestData = latestDoc.data();
    if (latestData?.status === 'signed' || latestData?.status === 'completed') {
      throw new Error('Contrato ya firmado por otra transacción concurrente.');
    }

    const auditTrail = latestData?.audit || [];
    auditTrail.push({
      action: 'CONTRACT_SIGNED',
      at: signedAt,
      actorType: 'client',
      metadata: {
        ip: context.rawRequest?.ip || 'no-ip',
        sha256,
      },
    });

    transaction.update(ref, {
      status: 'signed',
      'client.fullName': clientInfo.fullName,
      'client.documentType': clientInfo.documentType,
      'client.documentNumber': clientInfo.documentNumber,
      'client.email': clientInfo.email,
      'client.phone': clientInfo.phone,
      'client.city': clientInfo.city || '',
      'client.address': clientInfo.address || '',
      acceptances: {
        termsAccepted: acceptances.termsAccepted,
        termsAcceptedAt: signedAt,
        privacyAccepted: acceptances.privacyAccepted,
        privacyAcceptedAt: signedAt,
        electronicSignatureAccepted: acceptances.electronicSignatureAccepted,
        electronicSignatureAcceptedAt: signedAt,
        imageUseChoice: acceptances.imageUseChoice,
        imageUseRestrictions: acceptances.imageUseRestrictions || '',
        imageUseAcceptedAt: signedAt,
        informationAccuracyAccepted: acceptances.informationAccuracyAccepted,
        informationAccuracyAcceptedAt: signedAt,
      },
      signature: {
        method: signature.method,
        signerName: signature.signerName,
        signerDocument: signature.signerDocument,
        signatureStoragePath,
        signedAt,
        ipAddress: context.rawRequest?.ip || '',
        userAgent: context.rawRequest?.headers['user-agent'] || '',
      },
      'snapshot.locked': true,
      'snapshot.lockedAt': signedAt,
      pdf: {
        finalStoragePath: pdfStoragePath,
        downloadUrl,
        sha256,
        generatedAt: signedAt,
      },
      audit: auditTrail,
      updatedAt: signedAt,
    });
  });

  // Enviar correos por separado en segundo plano
  try {
    await sendContractSignedEmails({
      toEmail: clientInfo.email,
      clientName: clientInfo.fullName,
      contractNumber: contractData.contractNumber,
      packageName: contractData.service?.packageName || 'Servicio Audiovisual',
      totalAmountText: `${payment.totalAmount} ${payment.currency}`,
      paidAmountText: `${payment.paidAmount} ${payment.currency}`,
      remainingAmountText: `${payment.remainingAmount} ${payment.currency}`,
      signedAt,
      pdfBytes,
    });
  } catch (err) {
    console.error('[INDEX_FUNCTION] Error al enviar los correos de firma:', err);
  }

  return {
    success: true,
    contractId,
    downloadUrl,
    sha256,
    signedAt,
  };
});
