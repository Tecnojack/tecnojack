import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  updateDoc,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { ContractAcceptances, ContractDocument, ContractSignatureInfo } from '../models/contract.model';
import { generateClientContractPdf } from '../utils/contract-pdf.util';

export interface ClientSignContractPayload {
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
  acceptances: ContractAcceptances;
  signature: ContractSignatureInfo;
}

@Injectable({ providedIn: 'root' })
export class ContractClientService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore = getFirestore(this.app);
  private readonly storage = getStorage(this.app);
  private readonly functions = getFunctions(this.app);

  async getContractByToken(token: string): Promise<ContractDocument | null> {
    if (!token?.trim()) {
      return null;
    }

    const colRef = collection(this.firestore, 'contracts');
    const q = query(colRef, where('token', '==', token.trim()), limit(1));
    const snap = await getDocs(q);

    if (snap.empty) {
      return null;
    }

    const d = snap.docs[0];
    const contract = { id: d.id, ...d.data() } as ContractDocument;

    // Registrar evento de apertura si está en estado ready_to_sign
    if (contract.status === 'ready_to_sign') {
      try {
        const docRef = doc(this.firestore, 'contracts', contract.id);
        const auditTrail = contract.audit || [];
        const now = new Date().toISOString();
        auditTrail.push({
          action: 'CONTRACT_OPENED',
          at: now,
          actorType: 'client',
          metadata: { userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '' },
        });

        await updateDoc(docRef, {
          status: 'opened',
          audit: auditTrail,
          updatedAt: now,
        });
      } catch (err) {
        console.warn('No se pudo registrar auditoría de apertura de contrato:', err);
      }
    }

    return contract;
  }

  /**
   * Guarda o sube el PDF firmado del contrato a Firebase Storage y Firestore.
   */
  async uploadContractPdfToFirebase(contract: ContractDocument): Promise<{ downloadUrl: string; sha256Hex: string }> {
    const year = new Date().getFullYear().toString();
    const contractId = contract.id || `gen-${Date.now()}`;

    // 1. Generar el PDF completo en cliente
    const pdfRes = await generateClientContractPdf(contract);

    try {
      // 2. Subir PDF a Firebase Storage
      const storagePath = `contracts/${year}/${contractId}/contract-signed.pdf`;
      const storageRef = ref(this.storage, storagePath);
      await uploadBytes(storageRef, pdfRes.blob, {
        contentType: 'application/pdf',
        customMetadata: {
          contractNumber: contract.contractNumber,
          sha256: pdfRes.sha256Hex,
          signedAt: contract.signature?.signedAt || new Date().toISOString(),
        },
      });

      // 3. Obtener URL de descarga pública de Firebase Storage
      const downloadUrl = await getDownloadURL(storageRef);

      // 4. Guardar o actualizar registro en Firestore
      const now = new Date().toISOString();
      const pdfMetadata = {
        finalStoragePath: storagePath,
        downloadUrl,
        sha256: pdfRes.sha256Hex,
        generatedAt: now,
      };

      if (contract.id && contract.id !== 'generico') {
        const docRef = doc(this.firestore, 'contracts', contract.id);
        await updateDoc(docRef, {
          pdf: pdfMetadata,
          updatedAt: now,
        });
      } else {
        // Crear documento en Firestore para contratos genéricos
        const colRef = collection(this.firestore, 'contracts');
        const newDocRef = await addDoc(colRef, {
          ...contract,
          status: 'signed',
          pdf: pdfMetadata,
          createdAt: now,
          updatedAt: now,
        });
        contract.id = newDocRef.id;
      }

      return { downloadUrl, sha256Hex: pdfRes.sha256Hex };
    } catch (err) {
      console.warn('⚠️ No se pudo subir a Firebase Storage/Firestore (usando URL Blob local):', err);
      return { downloadUrl: pdfRes.downloadUrl, sha256Hex: pdfRes.sha256Hex };
    }
  }

  async signContract(payload: ClientSignContractPayload): Promise<{ success: boolean; downloadUrl?: string; sha256?: string }> {
    try {
      const callable = httpsCallable<ClientSignContractPayload, { success: boolean; downloadUrl?: string; sha256?: string }>(
        this.functions,
        'generateContractPdfAndSign',
      );
      const res = await callable(payload);
      return res.data;
    } catch (err) {
      console.warn('[CONTRACT_CLIENT_SERVICE] Cloud Function no disponible. Ejecutando fallback local de cliente y subida a Firebase...', err);
      return this.signContractFallback(payload);
    }
  }

  private async signContractFallback(payload: ClientSignContractPayload): Promise<{ success: boolean; downloadUrl?: string; sha256?: string }> {
    const contract = await this.getContractByToken(payload.token);

    if (!contract) {
      throw new Error('Contrato no encontrado.');
    }

    if (contract.status === 'signed' || contract.status === 'completed') {
      throw new Error('El contrato ya ha sido firmado.');
    }

    const now = new Date().toISOString();
    const updatedDoc: ContractDocument = {
      ...contract,
      status: 'signed',
      client: {
        ...contract.client,
        ...payload.clientInfo,
      },
      acceptances: payload.acceptances,
      signature: payload.signature,
      snapshot: {
        ...contract.snapshot,
        locked: true,
        lockedAt: now,
      },
      updatedAt: now,
    };

    // Subir a Firebase Storage y actualizar Firestore
    const uploadRes = await this.uploadContractPdfToFirebase(updatedDoc);

    return {
      success: true,
      downloadUrl: uploadRes.downloadUrl,
      sha256: uploadRes.sha256Hex,
    };
  }
}
