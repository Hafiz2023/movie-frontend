import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
    role: string;
    sub: string;
    exp: number;
}

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

export const setToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

export const clearToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}

export const isTokenValid = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (error) {
        return false;
    }
}

export const getUserRole = (token: string): string | null => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.role;
    } catch (error) {
        return null;
    }
}
