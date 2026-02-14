'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Video, Category, ShortVideo } from '@/types';
import { MOCK_VIDEOS, MOCK_SHORTS } from '@/utils/mockData';

interface ContentState {
    featuredVideo: Video | null;
    videos: Video[];
    shorts: ShortVideo[];
    categories: Category[];
    trendingVideos: Video[];

    // Actions - these could be functions
    // For simplicity in this demo, we just expose the state
}

// Define the store actions and state combined if needed, or just state
interface ContentStore extends ContentState {
    setVideos: (videos: Video[]) => void;
    setShorts: (shorts: ShortVideo[]) => void;
    setCategories: (categories: Category[]) => void;
    fetchContent: () => Promise<void>;
}

const useContentStore = create<ContentStore>()(
    persist(
        (set) => ({
            featuredVideo: null,
            videos: [],
            shorts: [],
            categories: [], // Initialize with empty array
            trendingVideos: [],

            setVideos: (videos) => set({ videos }),
            setShorts: (shorts) => set({ shorts }),
            setCategories: (categories) => set({ categories }),

            fetchContent: async () => {
                // In a real app, this would be an API call.
                // For now, we load from mock data and adapt it to our new schema.

                // Simulating API delay
                await new Promise(resolve => setTimeout(resolve, 500));

                // Adapt MOCK_VIDEOS to Video type (partial adaptation)
                // The mock data structure (MOCK_VIDEOS) and the store's expected Video type might differ slightly
                const adaptedMovies: any[] = MOCK_VIDEOS.map(m => ({
                    id: m.id,
                    title: m.title,
                    description: m.description,
                    thumbnail_url: m.thumbnail_url,
                    video_url: m.video_url,
                    hls_master_url: "", // Not in mock
                    creator_id: 1, // Mock
                    category_id: 1, // Mock
                    is_premium: false,
                    views: typeof m.views === 'string' ? 0 : m.views, // Handle '1.2M' vs number
                    created_at: new Date().toISOString(),
                    tags: m.tags
                }));

                const adaptedShorts: any[] = MOCK_SHORTS.map(s => ({
                    ...s,
                }));

                // Extract categories from mock data
                const uniqueCategories: string[] = Array.from(new Set([
                    ...MOCK_VIDEOS.map(m => m.category),
                    ...MOCK_SHORTS.map(s => s.category)
                ]));

                const categories: Category[] = uniqueCategories.map((name, index) => ({
                    id: index + 1,
                    name: name,
                    created_at: new Date().toISOString()
                }));

                set({
                    videos: adaptedMovies,
                    shorts: adaptedShorts,
                    categories: categories,
                    featuredVideo: adaptedMovies[0] || null,
                    trendingVideos: adaptedMovies.slice(0, 5)
                });
            }
        }),
        {
            name: 'content-storage',
            // storage: createJSONStorage(() => localStorage), // Removed explicit storage to use default which is safer for SSR/hydration mismatch often
        }
    )
);

export default useContentStore;
