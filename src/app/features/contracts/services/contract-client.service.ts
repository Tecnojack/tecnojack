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
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { ContractAcceptances, ContractDocument, ContractSignatureInfo } from '../models/contract.model';

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

  async signContract(payload: ClientSignContractPayload): Promise<{ success: boolean; downloadUrl?: string; sha256?: string }> {
    try {
      const callable = httpsCallable<ClientSignContractPayload, { success: boolean; downloadUrl?: string; sha256?: string }>(
        this.functions,
        'generateContractPdfAndSign',
      );
      const res = await callable(payload);
      return res.data;
    } catch (err) {
      console.warn('[CONTRACT_CLIENT_SERVICE] Cloud Function no disponible o error. Ejecutando fallback de cliente...', err);
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

    const docRef = doc(this.firestore, 'contracts', contract.id);
    const now = new Date().toISOString();
    const auditTrail = contract.audit || [];

    auditTrail.push({
      action: 'CONTRACT_SIGNED',
      at: now,
      actorType: 'client',
      metadata: { fallback: true },
    });

    await updateDoc(docRef, {
      status: 'signed',
      client: {
        ...contract.client,
        ...payload.clientInfo,
      },
      acceptances: payload.acceptances,
      signature: payload.signature,
      'snapshot.locked': true,
      'snapshot.lockedAt': now,
      audit: auditTrail,
      updatedAt: now,
    });

    return {
      success: true,
      signedAt: now,
    } as any;
  }
}
