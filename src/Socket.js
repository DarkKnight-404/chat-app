import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:9000';
export const Socket = io(URL, {
    autoConnect: false,
});