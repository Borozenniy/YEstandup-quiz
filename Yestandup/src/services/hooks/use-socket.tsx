import { useContext } from 'react';
import { SocketContext } from '../../socket/socket-provider';
export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketContext');
  }
  return socket;
};
