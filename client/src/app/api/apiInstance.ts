import axios from 'axios';
import { getAuthToken } from '../../auth/data/token';

console.log('base', import.meta.env.VITE_REST_BASE_URL);

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REST_BASE_URL,
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
