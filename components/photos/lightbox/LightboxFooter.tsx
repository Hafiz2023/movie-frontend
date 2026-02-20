'use client';
import React from 'react';
import { Download, X } from 'lucide-react';

interface LightboxFooterProps {
    onClose: () => void;
}

export function LightboxFooter({ onClose }: LightboxFooterProps) {
    return (
        <div className="p-6 mt-auto border-t border-border bg-secondary/10 space-y-3 sticky bottom-0">
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Wallpaper
            </button>
            <button
                onClick={onClose}
                className="w-full bg-background border border-border hover:bg-secondary text-foreground font-medium py-3 rounded-xl transition-all md:flex hidden items-center justify-center gap-2"
            >
                <X className="w-4 h-4" />
                Close View
            </button>
        </div>
    );
}
