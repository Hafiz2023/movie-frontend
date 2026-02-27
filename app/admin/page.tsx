'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MOCK_VIDEOS } from '@/utils/mockData';
import {
    Plus,
    Menu,
    Bell,
    Search,
    Clock,
    Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useCommunityStore } from '@/store/communityStore';
import {
    AdminSidebarPanel,
    AdminStats,
    CommunityManager,
    MessagesInbox,
    VideoTable,
    VideoFormDialog,
    DeleteConfirmDialog,
} from '@/components/admin';
import { motion, AnimatePresence } from 'framer-motion';

import { AdminVideo } from '@/types';

function CurrentTime() {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
        };
        update();
        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-medium">{time}</span>
            <span className="text-muted-foreground/50">•</span>
            <span>{date}</span>
        </div>
    );
}

const tabLabels: Record<string, { title: string; description: string }> = {
    videos: { title: 'Video Management', description: 'Upload, edit, and organize your video content.' },
    community: { title: 'Community Hub', description: 'Manage community posts and interactions.' },
    messages: { title: 'Messages Inbox', description: 'Review and respond to user messages.' },
};

export default function AdminPage() {
    const [videos, setVideos] = useState<AdminVideo[]>(MOCK_VIDEOS as unknown as AdminVideo[]);
    const { posts } = useCommunityStore();
    const [activeTab, setActiveTab] = useState<'videos' | 'community' | 'messages'>('videos');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Modal State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<AdminVideo | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form State for Videos
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        thumbnail_url: '',
        video_url: '',
    });

    const usersCount = 50;
    const statsMessagesCount = 10;

    // Handlers
    const handleOpenAdd = () => {
        setFormData({ title: '', category: '', thumbnail_url: '', video_url: '' });
        setCurrentVideo(null);
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (video: AdminVideo) => {
        setFormData({
            title: video.title,
            category: video.category,
            thumbnail_url: video.thumbnail_url,
            video_url: video.video_url || '',
        });
        setCurrentVideo(video);
        setIsDialogOpen(true);
    };

    const handleOpenDelete = (video: AdminVideo) => {
        setCurrentVideo(video);
        setIsDeleteDialogOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (currentVideo) {
            setVideos(prev =>
                prev.map(v => (v.id === currentVideo.id ? { ...v, ...formData } : v))
            );
            toast.success('Video updated successfully! 🎬');
        } else {
            const newVideo = {
                id: Math.max(...videos.map(v => v.id)) + 1,
                ...formData,
                views: '0',
                likes: '0',
                author: 'Admin',
                author_avatar: 'https://github.com/shadcn.png',
                date: 'Just now',
                duration: '10:00',
                description: 'Uploaded via Admin Panel',
                tags: [],
            };
            setVideos(prev => [newVideo, ...prev]);
            toast.success('Video uploaded successfully! 🎉');
        }

        setIsLoading(false);
        setIsDialogOpen(false);
    };

    const handleDelete = async () => {
        if (!currentVideo) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setVideos(prev => prev.filter(v => v.id !== currentVideo.id));
        toast.success('Video deleted successfully');

        setIsLoading(false);
        setIsDeleteDialogOpen(false);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'n' && activeTab === 'videos') {
                    e.preventDefault();
                    handleOpenAdd();
                }
            }
            // Tab navigation with Alt + number
            if (e.altKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        setActiveTab('videos');
                        break;
                    case '2':
                        e.preventDefault();
                        setActiveTab('community');
                        break;
                    case '3':
                        e.preventDefault();
                        setActiveTab('messages');
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const currentTabInfo = tabLabels[activeTab];

    return (
        <ProtectedRoute requiredRole="admin">
            <div className="flex h-screen overflow-hidden bg-background">
                <AdminSidebarPanel
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <main className="flex-1 overflow-y-auto scrollbar-hide">
                    {/* Top Bar */}
                    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50">
                        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden h-9 w-9 hover:bg-muted/50"
                                    onClick={() => setIsSidebarOpen(true)}
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                                <CurrentTime />
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative h-9 w-9 hover:bg-muted/50"
                                >
                                    <Bell className="h-4.5 w-4.5" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                                </Button>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-xs font-bold text-primary-foreground shadow-sm">
                                    A
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
                        {/* Page Header */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="h-4 w-4 text-primary/60" />
                                    <span className="text-xs font-medium uppercase tracking-widest text-primary/60">
                                        Dashboard
                                    </span>
                                </div>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                    {currentTabInfo.title}
                                </h1>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">
                                    {currentTabInfo.description}
                                </p>
                            </div>
                            {activeTab === 'videos' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Button
                                        onClick={handleOpenAdd}
                                        size="sm"
                                        className="gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group w-full sm:w-auto text-xs sm:text-sm"
                                    >
                                        <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                                        Upload Video
                                        <kbd className="hidden lg:inline-flex ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-primary-foreground/20 rounded text-primary-foreground/80">
                                            Ctrl+N
                                        </kbd>
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Stats Grid */}
                        <AdminStats
                            usersCount={usersCount}
                            videosCount={videos.length}
                            postsCount={posts.length}
                            messagesCount={statsMessagesCount}
                        />

                        {/* Content Area with animated transition */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'videos' ? (
                                    <VideoTable
                                        videos={videos}
                                        onEdit={handleOpenEdit}
                                        onDelete={handleOpenDelete}
                                    />
                                ) : activeTab === 'community' ? (
                                    <CommunityManager />
                                ) : (
                                    <MessagesInbox />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>

                <VideoFormDialog
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    currentVideo={currentVideo}
                    formData={formData}
                    setFormData={setFormData}
                    onSave={handleSave}
                    isLoading={isLoading}
                />

                <DeleteConfirmDialog
                    isOpen={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                    title={currentVideo?.title || 'Video'}
                    onDelete={handleDelete}
                    isLoading={isLoading}
                />
            </div>
        </ProtectedRoute>
    );
}
