declare module 'socket.io' {
  interface Socket {
    userId?: string; // Add your custom property (optional with ?)
  }
}