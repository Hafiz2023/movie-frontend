export interface User {
    id: number;
    email: string;
    role: 'admin' | 'user';
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export interface Movie {
    id: number;
    title: string;
    description: string;
    genre: string;
    release_year: number;
    rating: number;
    image_url?: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: User;
}
