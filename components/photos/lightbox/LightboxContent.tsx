'use client';
import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Photo } from '@/types';

interface LightboxContentProps {
    photo: Photo;
}

export function LightboxContent({ photo }: LightboxContentProps) {
    return (
        <div className="p-6 space-y-6 flex-1">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold">{photo.title}</h2>
                    <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                        2024
                    </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    A stunning 4K capture featuring high-end aesthetics. Explore the full gallery for more exclusive content from this series.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-secondary/50 hover:bg-secondary p-3 rounded-xl transition-colors group">
                    <Heart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" />
                    <span className="font-bold text-sm">{photo.likes.toLocaleString()}</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-secondary/50 hover:bg-secondary p-3 rounded-xl transition-colors">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-sm">{photo.comments.toLocaleString()}</span>
                </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all duration-300"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
