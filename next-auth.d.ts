import { type DefaultSession } from "next-auth";


type ExtendNextAuthSession = LoginResponse & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: ExtendNextAuthSession;
  }
}

type Tokens = {
  access: string;
  refresh: string;
};

export type User = {
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

export type LoginResponse = {
  status: string;
  tokens: Tokens;
  user: User;
};
