'use client';
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MoreHorizontal, Share2, Plus, TrendingUp, Clock, Star, Search, X, Trash2 } from 'lucide-react';
import { useCommunityStore } from '@/store/communityStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommunityPage() {
    const { posts, addPost, likePost } = useCommunityStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostTags, setNewPostTags] = useState('');
    const [filter, setFilter] = useState('Trending');

    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        addPost({
            user: "CurrentUser", // Mock user
            content: newPostContent,
            tags: newPostTags.split(',').map(t => t.trim()).filter(Boolean)
        });

        setNewPostContent('');
        setNewPostTags('');
        setIsCreateModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
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
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-primary/20 transform hover:scale-105"
                    >
                        <Plus className="w-5 h-5" /> Create Post
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar - Filters */}
                <div className="hidden lg:block space-y-6">
                    <div className="bg-card rounded-xl p-4 border border-border sticky top-28">
                        <h3 className="font-bold text-muted-foreground mb-4 px-2 uppercase text-xs tracking-wider">Feeds</h3>
                        <div className="space-y-1">
                            {[
                                { name: 'Trending', icon: TrendingUp },
                                { name: 'Newest', icon: Clock },
                                { name: 'Top Rated', icon: Star },
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => setFilter(item.name)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${filter === item.name
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        <h3 className="font-bold text-muted-foreground mt-8 mb-4 px-2 uppercase text-xs tracking-wider">Popular Tags</h3>
                        <div className="flex flex-wrap gap-2 px-2">
                            {['#Teen', '#Milf', '#Amateur', '#Asian', '#Hentai', '#Hardcore'].map(tag => (
                                <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded hover:text-primary cursor-pointer transition-colors border border-border">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Mobile Filters */}
                    <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {['Trending', 'Newest', 'Top Rated'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${filter === tab
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-card text-muted-foreground border-border'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode='popLayout'>
                        {posts.map((post) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors group"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-background flex items-center justify-center font-bold text-primary border border-border">
                                            {post.avatar}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-sm text-foreground hover:underline cursor-pointer hover:text-primary transition-colors">{post.user}</h3>
                                                <span className="text-[10px] text-muted-foreground">• {post.time}</span>
                                            </div>
                                            <p className="text-xs text-blue-500 font-medium cursor-pointer hover:underline">@{post.user.toLowerCase()}</p>
                                        </div>
                                    </div>
                                    <button className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-secondary transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="mb-4 pl-[52px]">
                                    <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] bg-secondary text-primary/80 px-2 py-0.5 rounded-full border border-border">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-6 pl-[52px] border-t border-border pt-3">
                                    <button
                                        onClick={() => likePost(post.id)}
                                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-medium group"
                                    >
                                        <div className="p-1.5 rounded-full group-hover:bg-primary/10 transition-colors">
                                            <ThumbsUp className={`w-4 h-4 ${post.likes > 0 ? '' : ''}`} />
                                        </div>
                                        {post.likes} <span className="hidden sm:inline">Likes</span>
                                    </button>

                                    <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors text-xs font-medium group">
                                        <div className="p-1.5 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        {post.comments} <span className="hidden sm:inline">Comments</span>
                                    </button>

                                    <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors text-xs font-medium group ml-auto">
                                        <div className="p-1.5 rounded-full group-hover:bg-green-500/10 transition-colors">
                                            <Share2 className="w-4 h-4" />
                                        </div>
                                        <span className="hidden sm:inline">Share</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Right Sidebar - Info/Ads */}
                <div className="hidden lg:block space-y-6">
                    <div className="bg-gradient-to-b from-primary/10 to-transparent rounded-xl p-6 border border-primary/20 sticky top-28">
                        <h3 className="font-bold text-foreground mb-2">Community Guidelines</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                            Please be respectful to other members. No hate speech, spam, or illegal content.
                        </p>
                        <button className="w-full bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold py-2 rounded transition-colors border border-border">
                            Read Full Rules
                        </button>
                    </div>
                </div>
            </div>

            {/* Create Post Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <h3 className="font-bold text-foreground">Create New Post</h3>
                                <button onClick={() => setIsCreateModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreatePost} className="p-4">
                                <div className="flex gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground border border-primary">
                                        U
                                    </div>
                                    <textarea
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        placeholder="What's on your mind?"
                                        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[120px]"
                                        autoFocus
                                    />
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={newPostTags}
                                        onChange={(e) => setNewPostTags(e.target.value)}
                                        placeholder="Add tags (comma separated)..."
                                        className="w-full bg-secondary text-sm text-foreground px-3 py-2 rounded border border-border focus:border-primary focus:outline-none transition-colors"
                                    />
                                </div>

                                <div className="flex justify-end pt-2 border-t border-border">
                                    <button
                                        type="submit"
                                        disabled={!newPostContent.trim()}
                                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-bold px-6 py-2 rounded-full transition-colors"
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
