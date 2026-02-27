'use client';

import React from 'react';
import { Settings, LogOut } from 'lucide-react';

export default function SidebarFooter() {
    return (
        <div className="px-3 pb-5 space-y-1 border-t border-border/50 pt-4">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 group">
                <Settings className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                Settings
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200">
                <LogOut className="h-4 w-4" />
                Log Out
            </button>
        </div>
    );
}
