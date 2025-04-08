import { Socket as OriginalSocket } from 'socket.io';
import 'socket.io';

declare module 'socket.io' {
  interface Socket {
    userId?: string; // Add your custom property (optional with ?)
  }
}