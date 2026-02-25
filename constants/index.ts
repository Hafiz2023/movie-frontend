export const SITE_CONFIG = {
    name: 'MovieStream',
    description: 'Premium Video Streaming Platform',
    url: 'https://moviestream.com',
    ogImage: 'https://moviestream.com/og.jpg',
    links: {
        twitter: 'https://twitter.com/moviestream',
        github: 'https://github.com/moviestream',
    },
};

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        USER: '/api/auth/user',
    },
    VIDEOS: {
        LIST: '/api/videos',
        DETAIL: (id: string) => `/api/videos/${id}`,
        CATEGORIES: '/api/videos/categories',
        TAGS: '/api/videos/tags',
    },
    USER: {
        PROFILE: '/api/user/profile',
        LIBRARY: '/api/user/library',
        SETTINGS: '/api/user/settings',
    },
};

export const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Videos', href: '/videos' },
    { label: 'Categories', href: '/categories' },
    { label: 'Community', href: '/community' },
    { label: 'Models', href: '/models' },
    { label: 'Premium', href: '/premium' },
    { label: 'Live', href: '/live' },
];

export const CATEGORIES = [
    'Amateur',
    'Teen',
    'Milf',
    'Hentai',
    'Interracial',
    'POV',
    'BDSM',
    'Lesbian',
    'Anal',
    'Big Tits',
];

export const SORT_OPTIONS = [
    { label: 'Newest', value: 'newest' },
    { label: 'Most Viewed', value: 'views' },
    { label: 'Top Rated', value: 'rating' },
    { label: 'Most Liked', value: 'likes' },
];
