/**
 * API Service Layer
 * Centralized API calls for all data operations.
 * Uses the configured axios instance with interceptors.
 */

import api from '@/lib/axios';
import { Video, User, Category, LoginResponse } from '@/types';

// ─── Auth Services ──────────────────────────────────────
export const AuthService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const res = await api.post('/auth/login', { email, password });
        return res.data;
    },

    register: async (name: string, email: string, password: string) => {
        const res = await api.post('/auth/register', { name, email, password });
        return res.data;
    },

    getProfile: async (): Promise<User> => {
        const res = await api.get('/auth/user');
        return res.data;
    },
};

// ─── Video Services ─────────────────────────────────────
export const VideoService = {
    getAll: async (params?: { category_id?: number; search?: string; page?: number; limit?: number }) => {
        const res = await api.get<Video[]>('/videos', { params });
        return res.data;
    },

    getById: async (id: number): Promise<Video> => {
        const res = await api.get<Video>(`/videos/${id}`);
        return res.data;
    },

    create: async (data: FormData) => {
        const res = await api.post('/videos', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    },

    update: async (id: number, data: Partial<Video>) => {
        const res = await api.put(`/videos/${id}`, data);
        return res.data;
    },

    delete: async (id: number) => {
        const res = await api.delete(`/videos/${id}`);
        return res.data;
    },

    like: async (id: number) => {
        const res = await api.post(`/videos/${id}/like`);
        return res.data;
    },
};

// ─── Category Services ──────────────────────────────────
export const CategoryService = {
    getAll: async (): Promise<Category[]> => {
        const res = await api.get<Category[]>('/categories');
        return res.data;
    },

    getById: async (id: number): Promise<Category> => {
        const res = await api.get<Category>(`/categories/${id}`);
        return res.data;
    },
};

// ─── Contact/Messages Services ──────────────────────────
export const ContactService = {
    send: async (data: { name: string; email: string; subject: string; message: string }) => {
        const res = await api.post('/contact', data);
        return res.data;
    },

    getAll: async () => {
        const res = await api.get('/contact');
        return res.data;
    },
};

// ─── Order/Subscription Services ────────────────────────
export const OrderService = {
    create: async (data: { plan: string; paymentMethod: string; amount: number }) => {
        const res = await api.post('/orders', data);
        return res.data;
    },

    getAll: async () => {
        const res = await api.get('/orders');
        return res.data;
    },

    subscribe: async (data: { planId: string; paymentDetails: Record<string, string> }) => {
        const res = await api.post('/premium/subscribe', data);
        return res.data;
    },
};

// ─── User Services ──────────────────────────────────────
export const UserService = {
    updateProfile: async (data: Partial<User>) => {
        const res = await api.put('/auth/user', data);
        return res.data;
    },

    updatePassword: async (data: { currentPassword: string; newPassword: string }) => {
        const res = await api.put('/auth/user/password', data);
        return res.data;
    },

    getWatchHistory: async () => {
        const res = await api.get('/user/history');
        return res.data;
    },

    getFavorites: async () => {
        const res = await api.get('/user/favorites');
        return res.data;
    },
};
