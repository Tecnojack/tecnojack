export interface ErpIdentitySession {
  id: string;
  email: string;
  displayName: string;
  photoUrl: string | null;
  provider: 'firebase';
}

