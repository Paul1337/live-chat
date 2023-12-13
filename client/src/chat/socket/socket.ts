import { io } from 'socket.io-client';

const PORT = 3000;
const url = `ws://localhost:${PORT}`;
export const ioClient = io(url);
