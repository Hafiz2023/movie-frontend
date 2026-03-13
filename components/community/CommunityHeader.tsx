
import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';

interface CommunityHeaderProps {
    onCreatePost: () => void;
}

export default function CommunityHeader({ onCreatePost }: CommunityHeaderProps) {
    return (
        <div className="bg-background/80 backdrop-blur-md border-b border-border sticky top-14 md:top-0 z-30 py-4 sm:py-6 px-3 sm:px-4">
            <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-0.5 sm:mb-1 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                        Community Hub
                    </h1>
                    <p className="text-muted-foreground text-xs sm:text-sm">Join the conversation. Share your thoughts, polls, and updates.</p>
                </div>

                <button
                    onClick={onCreatePost}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-primary/20 transform hover:scale-105 text-xs sm:text-sm shrink-0"
                >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Create Post
                </button>
            </div>
        </div>
    );
}
