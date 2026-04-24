import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

export type ServiceRequestStatus = 'new' | 'contacted' | 'closed';

export interface ServiceRequestInput {
  name: string;
  phone: string;
  email?: string;
  service: string;
  package?: string;
  message?: string;
  eventDate?: string;
  location?: string;
  businessName?: string;
  type?: string;
  need?: string;
  date?: string;
  budgetRange?: string;
}

export interface ServiceRequestDocument extends ServiceRequestInput {
  id: string;
  status: ServiceRequestStatus;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ServiceRequestService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore = getFirestore(this.app);

  async createRequest(data: ServiceRequestInput): Promise<string> {
    console.log('[FIRESTORE_REQUEST] createRequest:start', {
      service: data.service,
      hasName: !!data.name?.trim(),
      hasPhone: !!data.phone?.trim(),
      hasEventDate: !!data.eventDate?.trim(),
      hasDate: !!data.date?.trim(),
      hasLocation: !!data.location?.trim(),
      hasMessage: !!data.message?.trim(),
      hasEmail: !!data.email?.trim(),
      hasPackage: !!data.package?.trim(),
      hasBusinessName: !!data.businessName?.trim(),
      hasType: !!data.type?.trim(),
      hasNeed: !!data.need?.trim(),
      hasBudgetRange: !!data.budgetRange?.trim(),
    });

    const now = new Date().toISOString();
    const cleanValue = (value?: string): string | undefined => {
      const normalized = (value ?? '').trim();
      return normalized.length ? normalized : undefined;
    };
    const normalizeEventDate = (value?: string): string | undefined => {
      const normalized = cleanValue(value);
      if (!normalized) {
        return undefined;
      }

      if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
        return normalized;
      }

      const isoMatch = normalized.match(/^(\d{4}-\d{2}-\d{2})/);
      if (isoMatch?.[1]) {
        return isoMatch[1];
      }

      const dmyMatch = normalized.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
      if (dmyMatch) {
        const day = dmyMatch[1].padStart(2, '0');
        const month = dmyMatch[2].padStart(2, '0');
        const year = dmyMatch[3];
        return `${year}-${month}-${day}`;
      }

      return undefined;
    };

    const collectionRef = collection(this.firestore, 'service_requests');
    const requestRef = doc(collectionRef);

    // Firestore no acepta undefined — solo incluir campos con valor
    const required = {
      id: requestRef.id,
      name: data.name.trim(),
      phone: data.phone.trim(),
      service: data.service.trim(),
      status: 'new' as ServiceRequestStatus,
      createdAt: now,
      updatedAt: now,
    };

    const optional: Partial<ServiceRequestInput> = {};
    const email = cleanValue(data.email);
    const pkg = cleanValue(data.package);
    const message = cleanValue(data.message);
    const normalizedDate = normalizeEventDate(data.date);
    const eventDate = normalizeEventDate(data.eventDate) ?? normalizedDate;
    const location = cleanValue(data.location);
    const businessName = cleanValue(data.businessName);
    const type = cleanValue(data.type);
    const need = cleanValue(data.need);
    const budgetRange = cleanValue(data.budgetRange);
    if (email) optional.email = email;
    if (pkg) optional.package = pkg;
    if (message) optional.message = message;
    if (eventDate) optional.eventDate = eventDate;
    if (location) optional.location = location;
    if (businessName) optional.businessName = businessName;
    if (type) optional.type = type;
    if (need) optional.need = need;
    if (normalizedDate) optional.date = normalizedDate;
    if (budgetRange) optional.budgetRange = budgetRange;

    const payload: ServiceRequestDocument = { ...required, ...optional };

    console.log('[FIRESTORE_REQUEST] createRequest:payload', {
      id: payload.id,
      service: payload.service,
      keys: Object.keys(payload),
    });

    await setDoc(requestRef, payload);
    console.log('[FIRESTORE_REQUEST] createRequest:success', { id: requestRef.id });
    return requestRef.id;
  }
}
