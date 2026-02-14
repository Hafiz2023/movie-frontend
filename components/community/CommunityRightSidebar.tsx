
import React from 'react';

export default function CommunityRightSidebar() {
    return (
        <div className="hidden lg:block space-y-6">
            <div className="bg-gradient-to-b from-primary/10 to-transparent rounded-xl p-6 border border-primary/20 sticky top-28">
                <h3 className="font-bold text-foreground mb-2">Community Guidelines</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Please be respectful to other members. No hate speech, spam, or illegal content.
                </p>
                <button className="w-full bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold py-2 rounded transition-colors border border-border">
                    Read Full Rules
                </button>
            </div>
        </div>
    );
}
