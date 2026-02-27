'use client';

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCommunityStore } from '@/store/communityStore';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminSearchInput, AdminFilterSelect, AdminSectionHeader, AdminEmptyState } from '../common';
import CommunityPostItem from './CommunityPostItem';
import CommunityDeleteModal from './CommunityDeleteModal';

export default function CommunityManager() {
    const { posts, deletePost } = useCommunityStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string>('all');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

    const filteredPosts = posts.filter(post => {
        const matchSearch =
            !searchQuery ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.user.toLowerCase().includes(searchQuery.toLowerCase());
        const matchTag = selectedTag === 'all' || post.tags.includes(selectedTag);
        return matchSearch && matchTag;
    });

    const handleDeletePost = (id: number) => {
        setDeletingId(id);
    };

    const confirmDelete = () => {
        if (deletingId !== null) {
            deletePost(deletingId);
            toast.success('Post deleted from Community.');
            setDeletingId(null);
        }
    };

    const tagOptions = [
        { value: 'all', label: 'All Tags' },
        ...allTags.map(tag => ({ value: tag, label: `#${tag}` })),
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden"
        >
            <AdminSectionHeader
                icon={MessageSquare}
                title="Community Posts"
                subtitle={`${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''}`}
            />

            {/* Search & Filter */}
            <div className="px-5 sm:px-6 py-4 border-b border-border/50">
                <div className="flex flex-col sm:flex-row gap-3">
                    <AdminSearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search posts or users..."
                    />
                    <AdminFilterSelect
                        value={selectedTag}
                        onChange={setSelectedTag}
                        options={tagOptions}
                    />
                </div>
            </div>

            {/* Posts List */}
            <div className="divide-y divide-border/30">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.length === 0 ? (
                        <AdminEmptyState
                            icon={MessageSquare}
                            title="No posts found"
                            description="Try adjusting your search or filter"
                        />
                    ) : (
                        filteredPosts.map((post, idx) => (
                            <CommunityPostItem
                                key={post.id}
                                post={post}
                                index={idx}
                                onDelete={handleDeletePost}
                            />
                        ))
                    )}
                </AnimatePresence>
            </div>

            <CommunityDeleteModal
                isOpen={deletingId !== null}
                onCancel={() => setDeletingId(null)}
                onConfirm={confirmDelete}
            />
        </motion.div>
    );
}
