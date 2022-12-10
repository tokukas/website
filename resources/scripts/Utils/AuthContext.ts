import { User } from '@/Entities/User';
import { createContext } from 'react';

export type AuthContextType = {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export default AuthContext;
