import { create } from 'zustand';
import { Post } from '@/types';

interface CommunityState {
    posts: Post[];
    addPost: (post: Omit<Post, 'id' | 'avatar' | 'time' | 'likes' | 'comments'>) => void;
    deletePost: (id: number) => void;
    likePost: (id: number) => void;
}

const INITIAL_POSTS: Post[] = [
    {
        id: 1,
        user: "VideoFanatic22",
        avatar: "V",
        time: "2 hours ago",
        content: "Has anyone seen the latest upload by Wanderlust? The cinematography is absolutely insane! 🎥✨",
        likes: 240,
        comments: 45,
        tags: ["Review", "Cinematography"]
    },
    {
        id: 2,
        user: "TechGuru_Official",
        avatar: "T",
        time: "5 hours ago",
        content: "Just dropped a new tutorial on React Server Components. Let me know what you think! Link in bio.",
        likes: 890,
        comments: 120,
        tags: ["Tech", "Programming"]
    },
    {
        id: 3,
        user: "AnimeLover99",
        avatar: "A",
        time: "1 day ago",
        content: "Can we talk about that plot twist in the new series? My mind is blown 🤯 SPOILERS AHEAD in comments!",
        likes: 560,
        comments: 340,
        tags: ["Anime", "Discussion"]
    },
    {
        id: 4,
        user: "GymRat_Dave",
        avatar: "G",
        time: "1 day ago",
        content: "Looking for recommendations for high-energy workout playlists. Drop your favorites below! 👇",
        likes: 120,
        comments: 89,
        tags: ["Fitness", "Music"]
    }
];

export const useCommunityStore = create<CommunityState>((set) => ({
    posts: INITIAL_POSTS,
    addPost: (postData) => set((state) => ({
        posts: [{
            id: Math.max(0, ...state.posts.map(p => p.id)) + 1,
            avatar: postData.user[0].toUpperCase(),
            time: "Just now",
            likes: 0,
            comments: 0,
            ...postData
        }, ...state.posts]
    })),
    deletePost: (id) => set((state) => ({
        posts: state.posts.filter(p => p.id !== id)
    })),
    likePost: (id) => set((state) => ({
        posts: state.posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p)
    }))
}));
