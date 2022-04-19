
export type Role = 'admin' | 'premium' | 'user';

export interface User {
  id?: string;
  name? : string;
  phone?: string;
  email?: string;
  role?: Role;
  imagePath?: string;
}
