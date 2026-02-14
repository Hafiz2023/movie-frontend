
'use client';
import React, { useState } from 'react';
import { useCommunityStore } from '@/store/communityStore';

import CommunityHeader from '@/components/community/CommunityHeader';
import CommunitySidebar from '@/components/community/CommunitySidebar';
import CommunityFeed from '@/components/community/CommunityFeed';
import CommunityRightSidebar from '@/components/community/CommunityRightSidebar';
import CreatePostModal from '@/components/community/CreatePostModal';

export default function CommunityPage() {
    const { posts, addPost, likePost } = useCommunityStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [filter, setFilter] = useState('Trending');

    const handleCreatePost = (content: string, tags: string[]) => {
        addPost({
            user: "CurrentUser", // Mock user
            content: content,
            tags: tags
        });
        setIsCreateModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <CommunityHeader onCreatePost={() => setIsCreateModalOpen(true)} />

            <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar - Filters */}
                <CommunitySidebar filter={filter} setFilter={setFilter} />

                {/* Main Feed */}
                <CommunityFeed
                    filter={filter}
                    setFilter={setFilter}
                    posts={posts}
                    onLike={likePost}
                />

                {/* Right Sidebar - Info/Ads */}
                <CommunityRightSidebar />
            </div>

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onPost={handleCreatePost}
            />
        </div>
    );
}
