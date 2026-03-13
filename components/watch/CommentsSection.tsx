'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useInteractionStore from '@/store/interactionStore';

interface CommentsSectionProps {
    videoId: number;
}

export default function CommentsSection({ videoId }: CommentsSectionProps) {
    const [commentText, setCommentText] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');
    const [showAllComments, setShowAllComments] = useState(false);

    const {
        getComments,
        addComment,
        deleteComment,
        toggleCommentLike,
        toggleCommentDislike,
    } = useInteractionStore();

    const comments = getComments(videoId);

    const sortedComments = [...comments].sort((a, b) => {
        if (sortBy === 'top') return b.likes - a.likes;
        return b.id - a.id; // newest first by ID (higher ID = newer)
    });

    const displayedComments = showAllComments ? sortedComments : sortedComments.slice(0, 5);

    const handleSubmitComment = () => {
        if (!commentText.trim()) return;
        addComment(videoId, 'You', commentText.trim());
        setCommentText('');
        setShowInput(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment();
        }
    };

    return (
        <div className="pt-4 sm:pt-6 md:pt-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold">{comments.length} Comments</h3>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`text-xs sm:text-sm rounded-full ${sortBy === 'top' ? 'text-foreground font-bold bg-secondary/50' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setSortBy('top')}
                    >
                        Top
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`text-xs sm:text-sm rounded-full ${sortBy === 'newest' ? 'text-foreground font-bold bg-secondary/50' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setSortBy('newest')}
                    >
                        Newest
                    </Button>
                </div>
            </div>

            {/* Comment Input */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                <Avatar className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs sm:text-sm">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                    <textarea
                        value={commentText}
                        onChange={(e) => {
                            setCommentText(e.target.value);
                            if (!showInput) setShowInput(true);
                        }}
                        onFocus={() => setShowInput(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a public comment..."
                        rows={showInput ? 3 : 1}
                        className="w-full bg-transparent border-b border-border/40 focus:border-primary focus:outline-none pb-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground transition-all resize-none"
                    />
                    {showInput && (
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full text-xs sm:text-sm h-8 sm:h-9"
                                onClick={() => { setShowInput(false); setCommentText(''); }}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                className="rounded-full px-4 sm:px-6 text-xs sm:text-sm h-8 sm:h-9 bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                onClick={handleSubmitComment}
                                disabled={!commentText.trim()}
                            >
                                Comment
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Comment Items */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {displayedComments.map((comment) => (
                    <div key={comment.id} className="flex gap-2 sm:gap-3 md:gap-4 group animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                        <Avatar className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border border-white/5 shrink-0">
                            <AvatarFallback className="text-xs sm:text-sm">{comment.initials}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-1 sm:gap-2 text-xs flex-wrap">
                                <span className="font-bold text-xs sm:text-sm text-foreground">{comment.name}</span>
                                <span className="text-muted-foreground text-[10px] sm:text-xs">{comment.time}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed break-words">
                                {comment.text}
                            </p>
                            <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground mt-1 sm:mt-2">
                                <button
                                    onClick={() => toggleCommentLike(videoId, comment.id)}
                                    className={`flex items-center gap-1 sm:gap-1.5 transition-colors group/like ${comment.isLiked ? 'text-primary' : 'hover:text-primary'}`}
                                >
                                    <ThumbsUp className={`w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/like:scale-110 transition-transform ${comment.isLiked ? 'fill-current' : ''}`} />
                                    <span className="text-[10px] sm:text-xs">{comment.likes}</span>
                                </button>
                                <button
                                    onClick={() => toggleCommentDislike(videoId, comment.id)}
                                    className={`transition-colors ${comment.isDisliked ? 'text-primary' : 'hover:text-destructive opacity-0 group-hover:opacity-100'}`}
                                >
                                    <ThumbsDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${comment.isDisliked ? 'fill-current' : ''}`} />
                                </button>
                                {comment.name === 'You' && (
                                    <button
                                        onClick={() => deleteComment(videoId, comment.id)}
                                        className="hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 ml-1"
                                        title="Delete comment"
                                    >
                                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More / Show Less */}
            {sortedComments.length > 5 && (
                <div className="mt-4 sm:mt-6 flex justify-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => setShowAllComments(!showAllComments)}
                    >
                        {showAllComments ? (
                            <>Show Less <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /></>
                        ) : (
                            <>Show {sortedComments.length - 5} More Comments <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" /></>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}
