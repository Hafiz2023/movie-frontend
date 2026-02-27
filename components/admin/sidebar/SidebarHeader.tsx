'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Shield } from 'lucide-react';

interface SidebarHeaderProps {
    showClose: boolean;
    onClose: () => void;
}

export default function SidebarHeader({ showClose, onClose }: SidebarHeaderProps) {
    return (
        <div className="flex items-center justify-between p-5 border-b border-border/50">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                    <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                    <h2 className="text-base font-bold text-foreground tracking-tight">Admin Panel</h2>
                    <p className="text-[11px] text-muted-foreground">Management Console</p>
                </div>
            </div>
            {showClose && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                >
                    <X className="h-5 w-5" />
                </Button>
            )}
        </div>
    );
}
