import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Comment interface
export interface Comment {
    id: number;
    videoId: number;
    name: string;
    initials: string;
    text: string;
    time: string;
    likes: number;
    isLiked: boolean;
    isDisliked: boolean;
    parentId?: number; // For replies
    replies?: Comment[];
}

// Video interaction state
interface VideoInteraction {
    isLiked: boolean;
    isDisliked: boolean;
    likeCount: number;
}

// Photo interaction state
interface PhotoInteraction {
    isLiked: boolean;
    likeCount: number;
}

// State shape
interface InteractionState {
    // Video likes/dislikes keyed by video ID
    videoInteractions: Record<number, VideoInteraction>;
    // Photo likes keyed by photo ID
    photoInteractions: Record<number, PhotoInteraction>;
    // Comments keyed by video ID
    comments: Record<number, Comment[]>;
    // Community post likes
    communityLikes: Record<number, boolean>;

    // Actions
    toggleVideoLike: (videoId: number, defaultLikes?: number) => void;
    toggleVideoDislike: (videoId: number, defaultLikes?: number) => void;
    togglePhotoLike: (photoId: number, defaultLikes?: number) => void;
    addComment: (videoId: number, name: string, text: string) => void;
    deleteComment: (videoId: number, commentId: number) => void;
    toggleCommentLike: (videoId: number, commentId: number) => void;
    toggleCommentDislike: (videoId: number, commentId: number) => void;
    getVideoInteraction: (videoId: number) => VideoInteraction;
    getPhotoInteraction: (photoId: number) => PhotoInteraction;
    getComments: (videoId: number) => Comment[];
}

// Default seed comments for videos
const SEED_COMMENTS: Comment[] = [
    {
        id: 1, videoId: 0, name: 'John Doe', initials: 'JD', time: '3 days ago',
        text: "This is hands down one of the best scenes I've watched recently. The quality is insane! 4K really makes a difference. Keep coming with these uploads.",
        likes: 42, isLiked: false, isDisliked: false
    },
    {
        id: 2, videoId: 0, name: 'AlexStorm', initials: 'AS', time: '1 day ago',
        text: 'The cinematography in this one is top-notch. Love the lighting setup!',
        likes: 18, isLiked: false, isDisliked: false
    },
    {
        id: 3, videoId: 0, name: 'VIPMember', initials: 'VM', time: '5 hours ago',
        text: 'Premium content like this is exactly why I subscribed. Worth every penny.',
        likes: 7, isLiked: false, isDisliked: false
    },
];

const useInteractionStore = create<InteractionState>()(
    persist(
        (set, get) => ({
            videoInteractions: {},
            photoInteractions: {},
            comments: {},
            communityLikes: {},

            toggleVideoLike: (videoId, defaultLikes = 0) => set((state) => {
                const current = state.videoInteractions[videoId] || { isLiked: false, isDisliked: false, likeCount: defaultLikes };
                const wasLiked = current.isLiked;
                return {
                    videoInteractions: {
                        ...state.videoInteractions,
                        [videoId]: {
                            isLiked: !wasLiked,
                            isDisliked: false,
                            likeCount: wasLiked ? current.likeCount - 1 : current.likeCount + 1,
                        }
                    }
                };
            }),

            toggleVideoDislike: (videoId, defaultLikes = 0) => set((state) => {
                const current = state.videoInteractions[videoId] || { isLiked: false, isDisliked: false, likeCount: defaultLikes };
                const wasDisliked = current.isDisliked;
                const wasLiked = current.isLiked;
                return {
                    videoInteractions: {
                        ...state.videoInteractions,
                        [videoId]: {
                            isLiked: false,
                            isDisliked: !wasDisliked,
                            likeCount: wasLiked ? current.likeCount - 1 : current.likeCount,
                        }
                    }
                };
            }),

            togglePhotoLike: (photoId, defaultLikes = 0) => set((state) => {
                const current = state.photoInteractions[photoId] || { isLiked: false, likeCount: defaultLikes };
                const wasLiked = current.isLiked;
                return {
                    photoInteractions: {
                        ...state.photoInteractions,
                        [photoId]: {
                            isLiked: !wasLiked,
                            likeCount: wasLiked ? current.likeCount - 1 : current.likeCount + 1,
                        }
                    }
                };
            }),

            addComment: (videoId, name, text) => set((state) => {
                const existing = state.comments[videoId] || SEED_COMMENTS.map(c => ({ ...c, videoId }));
                const newComment: Comment = {
                    id: Date.now(),
                    videoId,
                    name,
                    initials: name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
                    text,
                    time: 'Just now',
                    likes: 0,
                    isLiked: false,
                    isDisliked: false,
                };
                return {
                    comments: {
                        ...state.comments,
                        [videoId]: [newComment, ...existing],
                    }
                };
            }),

            deleteComment: (videoId, commentId) => set((state) => {
                const existing = state.comments[videoId] || [];
                return {
                    comments: {
                        ...state.comments,
                        [videoId]: existing.filter(c => c.id !== commentId),
                    }
                };
            }),

            toggleCommentLike: (videoId, commentId) => set((state) => {
                const existing = state.comments[videoId] || SEED_COMMENTS.map(c => ({ ...c, videoId }));
                return {
                    comments: {
                        ...state.comments,
                        [videoId]: existing.map(c =>
                            c.id === commentId
                                ? { ...c, isLiked: !c.isLiked, isDisliked: false, likes: c.isLiked ? c.likes - 1 : c.likes + 1 }
                                : c
                        ),
                    }
                };
            }),

            toggleCommentDislike: (videoId, commentId) => set((state) => {
                const existing = state.comments[videoId] || SEED_COMMENTS.map(c => ({ ...c, videoId }));
                return {
                    comments: {
                        ...state.comments,
                        [videoId]: existing.map(c =>
                            c.id === commentId
                                ? {
                                    ...c,
                                    isDisliked: !c.isDisliked,
                                    isLiked: false,
                                    likes: c.isLiked ? c.likes - 1 : c.likes
                                }
                                : c
                        ),
                    }
                };
            }),

            getVideoInteraction: (videoId) => {
                return get().videoInteractions[videoId] || { isLiked: false, isDisliked: false, likeCount: 0 };
            },

            getPhotoInteraction: (photoId) => {
                return get().photoInteractions[photoId] || { isLiked: false, likeCount: 0 };
            },

            getComments: (videoId) => {
                return get().comments[videoId] || SEED_COMMENTS.map(c => ({ ...c, videoId }));
            },
        }),
        {
            name: 'interaction-storage',
        }
    )
);

export default useInteractionStore;
