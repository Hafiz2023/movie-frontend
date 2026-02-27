'use client';

import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import SidebarHeader from './SidebarHeader';
import SidebarNavItem, { type NavItemConfig } from './SidebarNavItem';
import SidebarFooter from './SidebarFooter';

interface SidebarContentProps {
    activeTab: string;
    setActiveTab: (tab: 'videos' | 'community' | 'messages') => void;
    showClose: boolean;
    onClose: () => void;
    navItems: NavItemConfig[];
}

export default function SidebarContent({
    activeTab,
    setActiveTab,
    showClose,
    onClose,
    navItems,
}: SidebarContentProps) {
    return (
        <div className="flex flex-col h-full">
            <SidebarHeader showClose={showClose} onClose={onClose} />

            {/* Overview Link */}
            <div className="px-3 pt-4 pb-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 mb-2">
                    Overview
                </p>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/10 text-primary text-sm font-medium">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 mb-2">
                    Content
                </p>
                <div className="space-y-1">
                    {navItems.map((item, index) => (
                        <SidebarNavItem
                            key={item.id}
                            item={item}
                            isActive={activeTab === item.id}
                            index={index}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </div>
            </nav>

            <SidebarFooter />
        </div>
    );
}
