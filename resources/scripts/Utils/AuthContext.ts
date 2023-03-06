import { User } from '@/Entities/User';
import { createContext } from 'react';

export type AuthContextType = {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

if (import.meta.env.DEV) {
  AuthContext.displayName = 'AuthContext';
}

export default AuthContext;
