'use client';

import React from 'react';
import { Video, MessageSquare, Mail } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import SidebarContent from './SidebarContent';
import { type NavItemConfig } from './SidebarNavItem';

interface AdminSidebarPanelProps {
    activeTab: 'videos' | 'community' | 'messages';
    setActiveTab: (tab: 'videos' | 'community' | 'messages') => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const navItems: NavItemConfig[] = [
    { id: 'videos', label: 'Videos', icon: Video, badge: null },
    { id: 'community', label: 'Community', icon: MessageSquare, badge: null },
    { id: 'messages', label: 'Messages', icon: Mail, badge: 3 },
];

const sidebarVariants: Variants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
        x: '-100%',
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

export default function AdminSidebarPanel({
    activeTab,
    setActiveTab,
    isSidebarOpen,
    setIsSidebarOpen,
}: AdminSidebarPanelProps) {
    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-card/80 backdrop-blur-xl border-r border-border/50 relative z-30">
                <SidebarContent
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    showClose={false}
                    onClose={() => { }}
                    navItems={navItems}
                />
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-y-0 left-0 z-50 w-72 bg-card/95 backdrop-blur-xl border-r border-border/50 md:hidden shadow-2xl"
                    >
                        <SidebarContent
                            activeTab={activeTab}
                            setActiveTab={(tab) => {
                                setActiveTab(tab);
                                setIsSidebarOpen(false);
                            }}
                            showClose
                            onClose={() => setIsSidebarOpen(false)}
                            navItems={navItems}
                        />
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
