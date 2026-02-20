'use client';
import React from 'react';
import { Photo } from '@/types';
import { LightboxHeader } from './LightboxHeader';
import { LightboxContent } from './LightboxContent';
import { LightboxFooter } from './LightboxFooter';

interface LightboxSidebarProps {
    photo: Photo;
    onClose: () => void;
}

export function LightboxSidebar({ photo, onClose }: LightboxSidebarProps) {
    return (
        <div className="w-full md:w-[400px] bg-card border-l border-border flex flex-col max-h-[50vh] md:max-h-full overflow-y-auto rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">
            <LightboxHeader photo={photo} />
            <LightboxContent photo={photo} />
            <LightboxFooter onClose={onClose} />
        </div>
    );
}
