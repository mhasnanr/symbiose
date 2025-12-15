import { createContext, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
  const socket = useMemo(() => io(import.meta.env.VITE_API_URL), []);

  useEffect(() => {
    const onConnect = () => console.log('[socket] connected', socket.id);
    const onDisconnect = (reason) =>
      console.log('[socket] disconnected', reason);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.close();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
