export type ContractStatus =
  | 'draft'
  | 'ready_to_sign'
  | 'opened'
  | 'reviewed'
  | 'signed'
  | 'pdf_generated'
  | 'completed'
  | 'expired'
  | 'cancelled';

export interface ContractClientInfo {
  fullName: string;
  documentType: 'CC' | 'CE' | 'PASAPORTE' | 'NIT' | string;
  documentNumber: string;
  email: string;
  phone: string;
  city?: string;
  address?: string;
  businessName?: string;
}

export interface ContractServiceAddOn {
  id?: string;
  name: string;
  description?: string;
  value: number;
}

export interface ContractServiceInfo {
  page: string;
  category?: string;
  packageId?: string;
  packageName: string;
  description?: string;
  eventDate?: string;
  location?: string;
  coverageHours?: number;
  features: string[];
  deliverables: string[];
  additionalServices: ContractServiceAddOn[];
  specialConditions?: string[];
}

export interface ContractPaymentInfo {
  currency: 'COP' | 'USD' | 'MXN' | string;
  baseAmount: number;
  extrasAmount: number;
  transportAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  paidPercentage: number;
  remainingAmount: number;
  selectedOption: 40 | 80 | 100 | 'custom';
  method?: string;
  reference?: string;
  paidAt?: string;
  confirmedManually: boolean;
  confirmedBy: string;
  confirmedAt: string;
  belowMinimumOverride?: boolean;
  overrideReason?: string;
}

export interface ContractAcceptances {
  termsAccepted: boolean;
  termsAcceptedAt?: string;

  privacyAccepted: boolean;
  privacyAcceptedAt?: string;

  electronicSignatureAccepted: boolean;
  electronicSignatureAcceptedAt?: string;

  imageUseChoice: 'authorized' | 'not_authorized' | 'restricted';
  imageUseAcceptedAt?: string;
  imageUseRestrictions?: string;

  informationAccuracyAccepted: boolean;
  informationAccuracyAcceptedAt?: string;
}

export interface ContractSignatureInfo {
  method: 'typed' | 'drawn' | 'uploaded';
  signerName: string;
  signerDocument: string;
  signatureStoragePath?: string;
  signatureDataUrl?: string;
  signatureDataHash?: string;
  signedAt: string;
  ipAddress?: string;
  userAgent?: string;
  platform?: string;
  timezone?: string;
}

export interface ContractSnapshotInfo {
  contractText: string;
  termsText: string;
  privacyText: string;
  serviceSnapshot: ContractServiceInfo;
  paymentSnapshot: ContractPaymentInfo;
  locked: boolean;
  lockedAt?: string;
}

export interface ContractPdfInfo {
  previewStoragePath?: string;
  finalStoragePath?: string;
  downloadUrl?: string;
  sha256?: string;
  generatedAt?: string;
}

export interface ContractAuditItem {
  action: string;
  at: string;
  actorType: 'admin' | 'client' | 'system';
  actorId?: string;
  metadata?: Record<string, unknown>;
}

export interface ContractDocument {
  id: string;
  contractNumber: string;
  token: string;
  tokenExpiresAt: string;

  status: ContractStatus;
  templateVersion: string;
  termsVersion: string;
  privacyVersion: string;

  client: ContractClientInfo;
  service: ContractServiceInfo;
  payment: ContractPaymentInfo;
  acceptances?: ContractAcceptances;
  signature?: ContractSignatureInfo;
  snapshot: ContractSnapshotInfo;
  pdf?: ContractPdfInfo;
  audit: ContractAuditItem[];

  createdAt: string;
  updatedAt: string;
}
