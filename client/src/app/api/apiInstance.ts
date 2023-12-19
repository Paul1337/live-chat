import axios from 'axios';
import { getAuthToken } from '../../auth/data/token';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
