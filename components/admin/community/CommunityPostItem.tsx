'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Heart, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post } from '@/types';

interface CommunityPostItemProps {
    post: Post;
    index: number;
    onDelete: (id: number) => void;
}

export default function CommunityPostItem({ post, index, onDelete }: CommunityPostItemProps) {
    return (
        <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 hover:bg-muted/30 transition-all duration-200 group"
        >
            <div className="flex gap-2.5 sm:gap-3 md:gap-4 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-bold text-primary text-xs sm:text-sm shrink-0 border border-primary/20 group-hover:scale-105 transition-transform duration-200">
                    {post.avatar}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">{post.user}</span>
                        <span className="text-[11px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">{post.time}</span>
                    </div>
                    <p className="text-sm text-foreground/80 mb-2.5 leading-relaxed">{post.content}</p>
                    <div className="flex flex-wrap items-center gap-2">
                        {post.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/15 hover:bg-primary/20 transition-colors cursor-default"
                            >
                                #{tag}
                            </span>
                        ))}
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1 ml-2">
                            <Heart className="h-3 w-3" /> {post.likes}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" /> {post.comments}
                        </span>
                    </div>
                </div>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(post.id)}
                className="shrink-0 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 gap-1.5 self-start sm:opacity-0 sm:group-hover:opacity-100"
            >
                <Trash2 className="w-3.5 h-3.5" /> Delete
            </Button>
        </motion.div>
    );
}
