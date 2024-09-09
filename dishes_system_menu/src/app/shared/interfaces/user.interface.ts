export interface User {
  id?: number;
  username: string;
  password: string;
  roles: string[];
  updatedAt?: string;
  createdAt?: string;
}
