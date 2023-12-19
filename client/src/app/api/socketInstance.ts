import { io } from 'socket.io-client';
import { getAuthToken } from '../../auth/data/token';

const PORT = 3000;
const URI = `ws://localhost:${PORT}`;
export const ioClient = io(URI, {
    autoConnect: false,
    auth: {
        token: getAuthToken(),
    },
    // extraHeaders: {
    //     Authorization: `Bearer ${getAuthToken()}`,
    // },
});

export const connectSocket = () => {
    ioClient.connect();
};
