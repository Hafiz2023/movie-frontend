'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, MoreHorizontal, Share2, Send } from 'lucide-react';
import { Post } from '@/types';

interface PostCardProps {
    post: Post;
    onLike: (id: number) => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<{ id: number; user: string; text: string; time: string }[]>([]);

    const handleLike = () => {
        if (!liked) {
            setLikeCount(prev => prev + 1);
            onLike(post.id);
        } else {
            setLikeCount(prev => prev - 1);
        }
        setLiked(!liked);
    };

    const handleAddComment = () => {
        if (!commentText.trim()) return;
        setComments(prev => [...prev, {
            id: Date.now(),
            user: 'You',
            text: commentText.trim(),
            time: 'Just now'
        }]);
        setCommentText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAddComment();
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card border border-border rounded-xl p-3 sm:p-4 md:p-5 hover:border-primary/30 transition-colors group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-secondary to-background flex items-center justify-center font-bold text-primary text-xs sm:text-sm border border-border shrink-0">
                        {post.avatar}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                            <h3 className="font-bold text-xs sm:text-sm text-foreground hover:underline cursor-pointer hover:text-primary transition-colors truncate">{post.user}</h3>
                            <span className="text-[9px] sm:text-[10px] text-muted-foreground">• {post.time}</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-blue-500 font-medium cursor-pointer hover:underline truncate">@{post.user.toLowerCase()}</p>
                    </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-secondary transition-colors shrink-0">
                    <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="mb-3 sm:mb-4 pl-10 sm:pl-[52px]">
                <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{post.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-[9px] sm:text-[10px] bg-secondary text-primary/80 px-1.5 sm:px-2 py-0.5 rounded-full border border-border">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 pl-10 sm:pl-[52px] border-t border-border pt-2 sm:pt-3">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 sm:gap-2 transition-colors text-[10px] sm:text-xs font-medium group/btn ${liked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                    <div className="p-1 sm:p-1.5 rounded-full group-hover/btn:bg-primary/10 transition-colors">
                        <ThumbsUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${liked ? 'fill-current' : ''}`} />
                    </div>
                    {likeCount} <span className="hidden sm:inline">Likes</span>
                </button>

                <button
                    onClick={() => setShowCommentInput(!showCommentInput)}
                    className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-blue-500 transition-colors text-[10px] sm:text-xs font-medium group/btn"
                >
                    <div className="p-1 sm:p-1.5 rounded-full group-hover/btn:bg-blue-500/10 transition-colors">
                        <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    {post.comments + comments.length} <span className="hidden sm:inline">Comments</span>
                </button>

                <button className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-green-500 transition-colors text-[10px] sm:text-xs font-medium group/btn ml-auto">
                    <div className="p-1 sm:p-1.5 rounded-full group-hover/btn:bg-green-500/10 transition-colors">
                        <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="hidden sm:inline">Share</span>
                </button>
            </div>

            {/* Comments Section */}
            {(showCommentInput || comments.length > 0) && (
                <div className="mt-3 sm:mt-4 pl-10 sm:pl-[52px] space-y-3">
                    {/* Existing user comments */}
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-2 items-start animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[9px] sm:text-[10px] font-bold shrink-0">
                                {comment.user[0]}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <span className="font-bold text-[10px] sm:text-xs text-foreground">{comment.user}</span>
                                    <span className="text-[9px] sm:text-[10px] text-muted-foreground">{comment.time}</span>
                                </div>
                                <p className="text-[10px] sm:text-xs text-foreground/80 break-words">{comment.text}</p>
                            </div>
                        </div>
                    ))}

                    {/* Comment input */}
                    {showCommentInput && (
                        <div className="flex gap-2 items-center">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[9px] sm:text-[10px] font-bold shrink-0">
                                U
                            </div>
                            <div className="flex-1 flex gap-1.5 sm:gap-2 items-center bg-secondary/50 rounded-full px-3 py-1.5 sm:py-2 border border-border/40">
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Write a comment..."
                                    className="flex-1 bg-transparent text-[10px] sm:text-xs text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
                                />
                                <button
                                    onClick={handleAddComment}
                                    disabled={!commentText.trim()}
                                    className="text-primary hover:text-primary/80 disabled:opacity-30 transition-all"
                                >
                                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}
