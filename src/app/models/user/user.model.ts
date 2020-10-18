export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
}

export interface UserRole {
  id: string;
  name: string;
}
