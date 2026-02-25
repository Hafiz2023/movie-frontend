/**
 * Legacy API helper - now delegates to the central axios instance.
 * Use `@/services` for new code instead of importing from here.
 */

import api from './axios';
import { Video, Category } from '@/types';

export const fetchVideos = async (category_id?: number) => {
    const params = category_id ? { category_id } : {};
    const response = await api.get<Video[]>('/videos', { params });
    return response.data;
};

export const fetchVideo = async (id: number) => {
    const response = await api.get<Video>(`/videos/${id}`);
    return response.data;
};

export const fetchCategories = async () => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
};

export default api;
