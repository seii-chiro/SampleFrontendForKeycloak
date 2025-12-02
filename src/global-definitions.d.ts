export interface AuditTimestamps {
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

export interface AuditUsers {
  created_by: string;
  updated_by: string;
}

// Optional: A combined audit type
export interface AuditTrails extends AuditTimestamps, AuditUsers {}

export interface User {
  keycloak_id: string;
  username: string;
  email: string;
  given_name: string;
  family_name: string;
  roles: string[];
}

export interface Address extends AuditTrails {
  id: number;
  region: string;
  province: string;
  city_or_municipality: string;
  barangay: string;
  street: string;
  postal_code: string;
  patient: number;
}

export interface Patient extends AuditTrails {
  id: number;
  user: User;
  address: Address;
  gender_display: string;
  date_of_birth: string; // ISO date
  place_of_birth: string;
  office_of_assignment: string;
  rank: string;
  patient_image: string;
  gender: number;
}

export interface Dentist extends AuditTrails {
  id: number;
  user: User;
  gender_display: string;
  rank: string;
  gender: number;
}

export interface Me extends User {
  patient_profile: Patient | null;
  dentist_profile: Dentist | null;
}

export type MeType = Me & AuditTrails;

export interface Gender extends AuditTrails {
  id: string;
  gender: string;
  description: string;
}