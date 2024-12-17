import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

// Tipagem para o valor do servidor
type ServerValue = 1 | 2 | 3;

// Tipagem para o contexto
interface ServerContextType {
  server: ServerValue;
  setServer: (value: ServerValue) => void;
}

const initialServerContext: ServerContextType = {
  server: 1,
  setServer: () => {}  
};

// Cria o contexto com um valor inicial opcional
const ServerContext = createContext<ServerContextType>(initialServerContext);

// Provedor do contexto
export function ServerProvider({ children }: { children: ReactNode }) {
  const [server, setServer] = useState<ServerValue>(1);

  const serverContextValue = useMemo(() => ({ server, setServer }), [server, setServer]);

  return (
    <ServerContext.Provider value={serverContextValue}>
      {children}
    </ServerContext.Provider>
  );
};

// Hook para utilizar o contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useServer = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServer must be used within a ServerProvider');
  }
  return context;
};

