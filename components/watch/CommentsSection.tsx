'use client';

import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function CommentsSection() {
    return (
        <div className="pt-6 sm:pt-8">
            <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-bold">245 Comments</h3>
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="text-foreground font-bold">Top</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Newest</Button>
                </div>
            </div>

            {/* Comment Input */}
            <div className="flex gap-3 sm:gap-4 mb-8">
                <Avatar className="w-9 h-9 sm:w-10 sm:h-10">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                    <input
                        type="text"
                        placeholder="Add a public comment..."
                        className="w-full bg-transparent border-b border-border/40 focus:border-primary focus:outline-none pb-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors"
                    />
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="rounded-full">Cancel</Button>
                        <Button size="sm" className="rounded-full px-6 bg-secondary text-secondary-foreground hover:bg-primary hover:text-white transition-colors">Comment</Button>
                    </div>
                </div>
            </div>

            {/* Comment Items */}
            <div className="space-y-6">
                {MOCK_COMMENTS.map((comment) => (
                    <div key={comment.id} className="flex gap-3 sm:gap-4 group">
                        <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border border-white/5">
                            <AvatarFallback>{comment.initials}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-xs">
                                <span className="font-bold text-sm text-foreground">{comment.name}</span>
                                <span className="text-muted-foreground">{comment.time}</span>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                {comment.text}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                <button className="flex items-center gap-1.5 hover:text-primary transition-colors group/like">
                                    <ThumbsUp className="w-3.5 h-3.5 group-hover/like:scale-110 transition-transform" />
                                    <span>{comment.likes}</span>
                                </button>
                                <button className="hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                                    <ThumbsDown className="w-3.5 h-3.5" />
                                </button>
                                <button className="font-bold hover:text-white ml-2">Reply</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Mock comments data
const MOCK_COMMENTS = [
    { id: 1, name: 'John Doe', initials: 'JD', time: '3 days ago', text: "This is hands down one of the best scenes I've watched recently. The quality is insane! 4K really makes a difference. Keep coming with these uploads.", likes: 42 },
    { id: 2, name: 'AlexStorm', initials: 'AS', time: '1 day ago', text: 'The cinematography in this one is top-notch. Love the lighting setup!', likes: 18 },
    { id: 3, name: 'VIPMember', initials: 'VM', time: '5 hours ago', text: 'Premium content like this is exactly why I subscribed. Worth every penny.', likes: 7 },
];
