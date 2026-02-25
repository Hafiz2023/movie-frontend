
export interface User {
    id: number;
    email: string;
    password_hash?: string; // Optional on frontend, usually not sent
    role: 'admin' | 'user' | 'creator';
    is_verified?: boolean;
    name?: string;
    avatar?: string;
    bio?: string;
    created_at?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

// Database Schema Interfaces
export interface Category {
    id: number;
    name: string;
    created_at: string;
}

export interface Plan {
    id: number;
    name: string;
    price: number;
    stripe_price_id: string;
    duration: string; // e.g., 'month', 'year'
}

export interface Subscription {
    id: number;
    user_id: number;
    stripe_customer_id: string;
    stripe_subscription_id: string;
    plan_id: number;
    plan?: Plan;
    status: 'active' | 'canceled' | 'past_due' | 'incomplete';
    current_period_end: string;
}

export interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    video_url?: string; // Standard video URL (mp4/webm)
    hls_master_url: string;
    creator_id: number;
    creator?: User;
    category_id: number;
    category?: Category;
    is_premium: boolean;
    views: number;
    created_at: string;
    tags?: string[]; // M-to-M relation flattened for UI
}

export interface Favorite {
    id: number;
    user_id: number;
    video_id: number;
    video?: Video;
}

export interface WatchHistory {
    id: number;
    user_id: number;
    video_id: number;
    video?: Video;
    progress_seconds: number;
    last_watched_at: string;
}

// UI Specific Interfaces (Refining/Keeping for backward compatibility)
export interface Review {
    id: number;
    user_id: number;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
}



export interface ShortVideo extends Omit<Partial<Video>, 'category'> {
    id: number;
    title: string;
    video_url: string; // Maps to hls_master_url
    thumbnail_url: string;
    category: string; // Maps to Category.name
    views: number;
    likes: number; // Not in DB schema explicitly, maybe count Favorites?
    duration?: string; // Add optional duration for UI display
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface AdminVideo {
    id: number;
    title: string;
    description?: string;
    category: string;
    thumbnail_url: string;
    video_url?: string;
    views: string | number;
    likes?: string | number;
    author?: string;
    author_avatar?: string;
    date?: string;
    duration?: string;
    tags?: string[];
    status?: string;
}

export interface VideoFormData {
    title: string;
    category: string;
    thumbnail_url: string;
    video_url: string;
}

export interface Post {
    id: number;
    user: string;
    avatar: string;
    time: string;
    content: string;
    tags: string[];
    likes: number;
    comments: number;
}

export interface LiveStream {
    id: number;
    user: string;
    viewers: number;
    thumbnail: string;
    description: string;
    tags: string[];
    price: number;
}

export interface Model {
    id: number;
    name: string;
    rank: number;
    videos: number;
    views: string;
    avatar: string;
}

export interface Photo {
    id: number;
    src: string;
    likes: number;
    comments: number;
    user: string;
    title: string;
    tags: string[];
}

/**
 * Represents the shape of mock video data used for UI demos.
 * Differs from the database `Video` type (e.g., views/likes are strings, has author fields).
 */
export interface MockVideo {
    id: number;
    title: string;
    thumbnail_url: string;
    duration: string;
    author: string;
    author_avatar: string;
    views: string;
    date: string;
    category: string;
    likes: string;
    video_url: string;
    description: string;
    tags: string[];
}
