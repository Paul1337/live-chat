import { localStorageConfig } from '../config/localStorageConfig';

export const removeAuthToken = () => {
    localStorage.removeItem(localStorageConfig.AuthTokenKey);
};

export const getAuthToken = () => {
    return localStorage.getItem(localStorageConfig.AuthTokenKey);
};

export const setAuthToken = (authToken: string) => {
    localStorage.setItem(localStorageConfig.AuthTokenKey, authToken);
};
