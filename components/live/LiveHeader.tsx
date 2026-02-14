
import React from 'react';

export default function LiveHeader() {
    return (
        <div className="bg-background/95 border-b border-border py-12 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-transparent pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
                    <span className="w-2 h-2 bg-destructive rounded-full" /> LIVE NOW
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Discover Live Models
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    Interact in real-time with verified creators. Join exclusive private shows and support your favorite personalities.
                </p>
            </div>
        </div>
    );
}
