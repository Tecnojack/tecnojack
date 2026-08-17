export interface PersonNameDto {
  givenNames: string;
  familyNames?: string | null;
  displayName: string;
  prefix?: string | null;
  suffix?: string | null;
}

export interface ContactInformationDto {
  type: 'EMAIL' | 'PHONE' | 'WHATSAPP' | 'ADDRESS' | 'WEBSITE' | 'SOCIAL_MEDIA';
  value: string;
  label?: string | null;
  isPrimary: boolean;
}

export interface PersonResponseDto {
  id: string;
  code: string;
  name: PersonNameDto;
  status: 'ACTIVE' | 'INACTIVE';
  contactPoints?: ContactInformationDto[];
  createdAt: string;
  updatedAt: string;
}

export interface QueryPersonsDto {
  search?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  page?: number;
  limit?: number;
}
