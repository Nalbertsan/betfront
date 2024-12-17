import {
  createContext,
  ReactNode,
  useMemo,
  useState,
} from 'react';

export type AuthType = {
  name: string,
  email: string,
} | null;

export type AuthContextType = {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
};

const initialAuthContext: AuthContextType = {
  auth: null,
  setAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface ProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: ProviderProps) {
  const [auth, setAuth] = useState<AuthType>(null);

  const authContextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
