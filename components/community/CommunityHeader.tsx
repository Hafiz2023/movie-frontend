
import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';

interface CommunityHeaderProps {
    onCreatePost: () => void;
}

export default function CommunityHeader({ onCreatePost }: CommunityHeaderProps) {
    return (
        <div className="bg-background/80 backdrop-blur-md border-b border-border sticky top-14 md:top-0 z-30 py-6 px-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
                        <MessageSquare className="w-8 h-8 text-primary" />
                        Community Hub
                    </h1>
                    <p className="text-muted-foreground text-sm">Join the conversation. Share your thoughts, polls, and updates.</p>
                </div>

                <button
                    onClick={onCreatePost}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-primary/20 transform hover:scale-105"
                >
                    <Plus className="w-5 h-5" /> Create Post
                </button>
            </div>
        </div>
    );
}
