'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Grid, ImageIcon, Info, Activity, LucideIcon } from 'lucide-react';
import type { ProfileTab } from '@/hooks/useModelProfile';

interface ProfileTabsProps {
    activeTab: ProfileTab;
    onTabChange: (tab: ProfileTab) => void;
    videosCount?: number;
}

interface TabConfig {
    key: ProfileTab;
    label: string;
    icon: LucideIcon;
    count?: number;
}

export default function ProfileTabs({
    activeTab,
    onTabChange,
    videosCount,
}: ProfileTabsProps) {
    const tabs: TabConfig[] = [
        { key: 'videos', label: 'Videos', icon: Grid, count: videosCount },
        { key: 'photos', label: 'Photos', icon: ImageIcon },
        { key: 'about', label: 'About', icon: Info },
        { key: 'activity', label: 'Activity', icon: Activity },
    ];

    return (
        <div className="border-b border-[#222] mb-6 sm:mb-8 flex items-center justify-start md:justify-start gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;

                return (
                    <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={`relative pb-2.5 sm:pb-3 px-3 sm:px-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium capitalize transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isActive
                                ? 'bg-primary/20 text-primary'
                                : 'bg-[#222] text-gray-500'
                                }`}>
                                {tab.count}
                            </span>
                        )}

                        {/* Active Indicator */}
                        {isActive && (
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                                layoutId="profileTabIndicator"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
