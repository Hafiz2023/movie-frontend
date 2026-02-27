'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface NavItemConfig {
    id: 'videos' | 'community' | 'messages';
    label: string;
    icon: React.ElementType;
    badge: number | null;
}

interface SidebarNavItemProps {
    item: NavItemConfig;
    isActive: boolean;
    index: number;
    onClick: () => void;
}

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.08, duration: 0.3 },
    }),
};

export default function SidebarNavItem({ item, isActive, index, onClick }: SidebarNavItemProps) {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
        >
            <button
                onClick={onClick}
                className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200 group relative overflow-hidden
                    ${isActive
                        ? 'bg-primary/10 text-primary shadow-sm border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                `}
            >
                {/* Active indicator pill */}
                {isActive && (
                    <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                )}

                <item.icon className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                <span className="flex-1 text-left">{item.label}</span>

                {/* Notification badge */}
                {item.badge && (
                    <span className="min-w-[20px] h-5 flex items-center justify-center px-1.5 text-[10px] font-bold rounded-full bg-destructive text-destructive-foreground animate-pulse">
                        {item.badge}
                    </span>
                )}

                {/* Active chevron */}
                {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-primary/60" />
                )}
            </button>
        </motion.div>
    );
}
