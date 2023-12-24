import { io } from 'socket.io-client';
import { getAuthToken } from '../../auth/data/token';

const URI = import.meta.env.VITE_REST_BASE_URL;
export const ioClient = io(URI, {
    autoConnect: false,
    auth: {
        token: getAuthToken(),
    },
});

export const connectSocket = () => {
    ioClient.connect();
};
