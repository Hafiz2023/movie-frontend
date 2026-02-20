'use client';
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Photo } from '@/types';

interface LightboxHeaderProps {
    photo: Photo;
}

export function LightboxHeader({ photo }: LightboxHeaderProps) {
    return (
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                        <span className="font-bold text-lg">{photo.user[0]}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-base leading-none hover:text-primary cursor-pointer transition-colors">
                        {photo.user}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">Following</span>
                </div>
            </div>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </button>
        </div>
    );
}
