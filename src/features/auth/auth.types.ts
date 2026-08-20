export interface AuthenticatedUser {
  username: string;
  email: string | null;
  name: string;
  groups: string[];
  isAdmin: boolean;
}

export type AuthResponse =
  | {
      authenticated: true;
      user: AuthenticatedUser;
    }
  | {
      authenticated: false;
    };
