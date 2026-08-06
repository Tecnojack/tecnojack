import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

import {
  ContractClientInfo,
  ContractDocument,
  ContractPaymentInfo,
  ContractServiceInfo,
  ContractStatus,
} from '../models/contract.model';
import { calculatePaymentInfo, CalculatePaymentInput } from '../utils/contract-financial.util';
import {
  buildContractText,
  CURRENT_CONTRACT_TEMPLATE_VERSION,
  CURRENT_PRIVACY_VERSION,
  CURRENT_TERMS_VERSION,
} from '../utils/contract-template-builder.util';

export interface CreateContractInput {
  client: ContractClientInfo;
  service: ContractServiceInfo;
  paymentInput: CalculatePaymentInput;
  tokenExpirationDays?: number;
}

@Injectable({ providedIn: 'root' })
export class ContractAdminService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore = getFirestore(this.app);

  async getAllContracts(): Promise<ContractDocument[]> {
    const colRef = collection(this.firestore, 'contracts');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ContractDocument));
  }

  async getContractById(id: string): Promise<ContractDocument | null> {
    const docRef = doc(this.firestore, 'contracts', id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return null;
    }

    return { id: snap.id, ...snap.data() } as ContractDocument;
  }

  async createContract(input: CreateContractInput, adminEmail = 'admin@tecnojack.co'): Promise<string> {
    const colRef = collection(this.firestore, 'contracts');
    const newDocRef = doc(colRef);

    const contractNumber = await this.generateContractNumber();
    const token = this.generateSecureToken();

    const expirationDays = input.tokenExpirationDays || 30;
    const expiresAt = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    const payment: ContractPaymentInfo = calculatePaymentInfo(input.paymentInput);

    const contractText = buildContractText({
      contractNumber,
      client: input.client,
      service: input.service,
      payment,
    });

    const isReadyToSign = payment.paidPercentage >= 39.99 || (payment.belowMinimumOverride && !!payment.overrideReason);
    const initialStatus: ContractStatus = isReadyToSign ? 'ready_to_sign' : 'draft';

    const payload: ContractDocument = {
      id: newDocRef.id,
      contractNumber,
      token,
      tokenExpiresAt: expiresAt,
      status: initialStatus,
      templateVersion: CURRENT_CONTRACT_TEMPLATE_VERSION,
      termsVersion: CURRENT_TERMS_VERSION,
      privacyVersion: CURRENT_PRIVACY_VERSION,
      client: input.client,
      service: input.service,
      payment,
      snapshot: {
        contractText,
        termsText: 'Términos y Condiciones generales incorporados de https://tecnojack.co/terminos-y-condiciones',
        privacyText: 'Política de Tratamiento de Datos Personales de TECNOJACK.',
        serviceSnapshot: input.service,
        paymentSnapshot: payment,
        locked: false,
      },
      audit: [
        {
          action: 'CONTRACT_CREATED',
          at: now,
          actorType: 'admin',
          actorId: adminEmail,
          metadata: { initialStatus, paidPercentage: payment.paidPercentage },
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(newDocRef, payload);
    return newDocRef.id;
  }

  async updateDraftContract(
    id: string,
    input: CreateContractInput,
    adminEmail = 'admin@tecnojack.co',
  ): Promise<void> {
    const docRef = doc(this.firestore, 'contracts', id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      throw new Error('Contrato no encontrado.');
    }

    const current = snap.data() as ContractDocument;

    if (current.status === 'signed' || current.status === 'completed' || current.snapshot.locked) {
      throw new Error('No se puede modificar un contrato ya firmado o bloqueado.');
    }

    const now = new Date().toISOString();
    const payment: ContractPaymentInfo = calculatePaymentInfo(input.paymentInput);

    const contractText = buildContractText({
      contractNumber: current.contractNumber,
      client: input.client,
      service: input.service,
      payment,
    });

    const isReadyToSign = payment.paidPercentage >= 39.99 || (payment.belowMinimumOverride && !!payment.overrideReason);
    const updatedStatus: ContractStatus = isReadyToSign ? 'ready_to_sign' : 'draft';

    const auditTrail = current.audit || [];
    auditTrail.push({
      action: 'CONTRACT_UPDATED',
      at: now,
      actorType: 'admin',
      actorId: adminEmail,
    });

    await updateDoc(docRef, {
      client: input.client,
      service: input.service,
      payment,
      status: updatedStatus,
      'snapshot.contractText': contractText,
      'snapshot.serviceSnapshot': input.service,
      'snapshot.paymentSnapshot': payment,
      audit: auditTrail,
      updatedAt: now,
    });
  }

  async cancelContract(id: string, reason: string, adminEmail = 'admin@tecnojack.co'): Promise<void> {
    const docRef = doc(this.firestore, 'contracts', id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      throw new Error('Contrato no encontrado.');
    }

    const current = snap.data() as ContractDocument;
    const now = new Date().toISOString();
    const auditTrail = current.audit || [];

    auditTrail.push({
      action: 'CONTRACT_CANCELLED',
      at: now,
      actorType: 'admin',
      actorId: adminEmail,
      metadata: { reason },
    });

    await updateDoc(docRef, {
      status: 'cancelled',
      audit: auditTrail,
      updatedAt: now,
    });
  }

  async generateShareableLink(token: string): Promise<string> {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://tecnojack.co';
    return `${origin}/contratar/${token}`;
  }

  private async generateContractNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const colRef = collection(this.firestore, 'contracts');
    const snap = await getDocs(colRef);
    const count = snap.size + 1;
    const padded = count.toString().padStart(3, '0');
    return `TJ-${year}-${padded}`;
  }

  private generateSecureToken(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return `${crypto.randomUUID()}-${Date.now().toString(36)}`;
    }
    const rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return `${rand}-${Date.now().toString(36)}`;
  }
}
