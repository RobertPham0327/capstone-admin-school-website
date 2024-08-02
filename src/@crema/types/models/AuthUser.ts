export type AuthUserType = {
  id?: number;
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  role?: string[] | string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at?: Date;
  updated_at?: Date | null;
  two_factor_secret?: any;
  two_factor_recovery_codes?: any;
  categories: string[];
};
