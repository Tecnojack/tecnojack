export interface ContractPdfViewModel {
  contractNumber: string;
  status: string;
  generatedAt: string;
  signedAt?: string;
  isWatermarkPreview?: boolean;

  company: {
    name: string;
    representative: string;
    document: string;
    email: string;
    website: string;
    whatsapp: string;
  };

  client: {
    fullName: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phone: string;
    city?: string;
    address?: string;
  };

  service: {
    packageName: string;
    date?: string;
    location?: string;
    features: string[];
    deliverables: string[];
    additionalServices: Array<{
      name: string;
      value: number;
    }>;
  };

  payment: {
    currency: string;
    baseAmount: number;
    extrasAmount: number;
    transportAmount: number;
    discountAmount: number;
    totalAmount: number;
    paidAmount: number;
    paidPercentage: number;
    remainingAmount: number;
  };

  acceptances: {
    terms: boolean;
    privacy: boolean;
    accuracy: boolean;
    electronicSignature: boolean;
    imageUseChoice: 'authorized' | 'not_authorized' | 'restricted';
    imageUseRestrictions?: string;
  };

  clauses: Array<{
    number: number;
    title: string;
    body: string;
  }>;

  signature?: {
    method: string;
    signerName: string;
    signerDocument: string;
    imageDataOrUrl?: string;
    signedAt: string;
    ipAddress?: string;
    userAgent?: string;
    platform?: string;
    timezone?: string;
  };

  integrity?: {
    sha256?: string;
    contractVersion?: string;
    termsVersion?: string;
    privacyVersion?: string;
    recordId?: string;
    termsAcceptedAt?: string;
    privacyAcceptedAt?: string;
  };
}
