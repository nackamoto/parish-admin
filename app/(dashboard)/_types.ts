/* eslint-disable @typescript-eslint/no-explicit-any */
export type ResetPasswordErrorType = {
  status: string;
  status_code: number;
  message: string;
  errors: {
    detail: {
      [key: string]: string[];
    };
  };
};
type User = {
  id: string;
  membership_number: string | null;
  age: string;
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string | null;
  gender: string;
  phone_number: string;
  email: string | null;
  country: string;
  city: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  is_active: boolean;
  account_type: string;
  phone_number_changed: boolean;
  previous_account_type: string;
};

export type UsersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};

interface Address {
  id: string;
  member: string;
  address_line1: string;
  address_line2: string;
  city: number | null;
  region: number | null;
  country: string;
  postal_code: string;
  digital_address: string;
}

interface Occupation {
  id: string;
  industry: number;
  institution_of_employment: string;
  job_title: number;
  start_date: string;
  end_date: string | null;
  member: string;
}

interface EmergencyContact {
  id: number;
  member: string;
  relationship: string;
  other_relationship: string;
  is_member: boolean;
  contact_member: string | null;
  first_name: string;
  last_name: string;
  phone_number: string;
  other_phone: string | null;
}

export interface Member {
  id: string;
  membership_number: string;
  user: string;
  age: string;
  title: string | null;
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string;
  place_of_birth: string;
  gender: string;
  phone_number: string;
  other_phone_number: string | null;
  email: string | null;
  address: Address;
  nationality: string;
  occupations: Occupation[];
  hometown: string;
  is_user: boolean;
  deceased: boolean;
  marital_status: string;
  maiden_name: string;
  photo: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  family_members: any[];
  emergency_contacts: EmergencyContact[];
  create_user: boolean;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface MembersData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Member[];
}

export interface MembersResponse {
  status: string;
  status_code: number;
  message: string;
  data: MembersData;
}

export type FailedCreateMemberType = ResetPasswordErrorType & {
  data: Array<any>;
  error?: string;
};
