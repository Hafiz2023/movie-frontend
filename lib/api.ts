import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Adjust if your backend port differs
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Video {
    id: number;
    title: string;
    description?: string;
    video_url: string;
    thumbnail_url: string;
    duration: string;
    views: number;
    likes: number;
    category_id: number;
    created_at: string;
    // Add other fields as needed matching schema
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    thumbnail_url?: string;
}

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
    // We need to implement this route in backend strictly speaking, 
    // but for now let's assume it exists or we mock it if backend isn't fully ready with it
    const response = await api.get<Category[]>('/categories');
    return response.data;
}

export default api;
