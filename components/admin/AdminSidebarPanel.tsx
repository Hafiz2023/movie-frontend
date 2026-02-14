
import React from 'react';
import { Button } from '@/components/ui/button';
import { Video, MessageSquare, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminSidebarPanelProps {
    activeTab: 'videos' | 'community' | 'messages';
    setActiveTab: (tab: 'videos' | 'community' | 'messages') => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function AdminSidebarPanel({
    activeTab,
    setActiveTab,
    isSidebarOpen,
    setIsSidebarOpen
}: AdminSidebarPanelProps) {
    return (
        <>
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-end p-4 md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-6 text-primary">Admin Panel</h2>
                    <nav className="space-y-2">
                        <Button
                            variant={activeTab === 'videos' ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('videos')}
                        >
                            <Video className="mr-2 h-4 w-4" /> Videos
                        </Button>
                        <Button
                            variant={activeTab === 'community' ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('community')}
                        >
                            <MessageSquare className="mr-2 h-4 w-4" /> Community
                        </Button>
                        <Button
                            variant={activeTab === 'messages' ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('messages')}
                        >
                            <Mail className="mr-2 h-4 w-4" /> Messages
                        </Button>
                    </nav>
                </div>
            </div>
        </>
    );
}
