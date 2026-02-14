
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import MobileFilters from '@/components/community/MobileFilters';
import PostCard from '@/components/community/PostCard';
import { Post } from '@/types';

interface CommunityFeedProps {
    filter: string;
    setFilter: (filter: string) => void;
    posts: Post[];
    onLike: (id: number) => void;
}

export default function CommunityFeed({ filter, setFilter, posts, onLike }: CommunityFeedProps) {
    return (
        <div className="lg:col-span-2 space-y-6">
            <MobileFilters filter={filter} setFilter={setFilter} />

            <AnimatePresence mode='popLayout'>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} onLike={onLike} />
                ))}
            </AnimatePresence>
        </div>
    );
}
