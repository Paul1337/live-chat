export interface ResponseUserData {
    email: string;
    username: string;
    id: string;
}

export interface LoginResponse {
    authToken: string;
    userData: ResponseUserData;
}
