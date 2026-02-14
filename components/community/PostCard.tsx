
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, MoreHorizontal, Share2 } from 'lucide-react';
import { Post } from '@/types';

interface PostCardProps {
    post: Post;
    onLike: (id: number) => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
    return (
        <motion.div
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
                    onClick={() => onLike(post.id)}
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
    );
}
