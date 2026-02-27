'use client';

import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface AdminSectionHeaderProps {
    icon?: LucideIcon;
    title: string;
    subtitle?: string;
    badge?: number;
    children?: React.ReactNode;
}

export default function AdminSectionHeader({
    icon: Icon,
    title,
    subtitle,
    badge,
    children,
}: AdminSectionHeaderProps) {
    return (
        <div className="p-5 sm:p-6 border-b border-border/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        {Icon && <Icon className="h-5 w-5 text-primary" />}
                        {title}
                        {badge !== undefined && badge > 0 && (
                            <span className="ml-1 min-w-[22px] h-5 flex items-center justify-center px-1.5 text-[10px] font-bold rounded-full bg-primary text-primary-foreground">
                                {badge}
                            </span>
                        )}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                    )}
                </div>
                {children && <div className="self-start sm:self-auto">{children}</div>}
            </div>
        </div>
    );
}
