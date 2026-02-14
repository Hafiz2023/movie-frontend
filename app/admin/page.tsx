
'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MOCK_VIDEOS } from '@/utils/mockData';
import { Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useCommunityStore } from '@/store/communityStore';
import AdminSidebarPanel from '@/components/admin/AdminSidebarPanel';
import AdminStats from '@/components/admin/AdminStats';
import CommunityManager from '@/components/admin/CommunityManager';
import MessagesInbox from '@/components/admin/MessagesInbox';
import VideoTable from '@/components/admin/VideoTable';
import VideoFormDialog from '@/components/admin/VideoFormDialog';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

import { AdminVideo } from '@/types';

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
        video_url: ''
    });

    const usersCount = 50;
    const statsMessagesCount = 10; // Or fetch real count

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
            video_url: video.video_url || ''
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
            setVideos(prev => prev.map(v => v.id === currentVideo.id ? { ...v, ...formData } : v));
            toast.success('Video updated successfully');
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
                tags: []
            };
            setVideos(prev => [newVideo, ...prev]);
            toast.success('Video uploaded successfully');
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

    return (
        <ProtectedRoute requiredRole="admin">
            <div className="flex h-screen overflow-hidden bg-background">
                <AdminSidebarPanel
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background scrollbar-hide">
                    <div className="max-w-[1600px] mx-auto flex flex-col gap-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
                                    <Menu className="h-6 w-6" />
                                </Button>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                                    <p className="text-muted-foreground">Manage your content and users.</p>
                                </div>
                            </div>
                            {activeTab === 'videos' && (
                                <Button onClick={handleOpenAdd} className="gap-2 shadow-lg hover:shadow-primary/20">
                                    <Plus className="h-4 w-4" />
                                    Upload New Video
                                </Button>
                            )}
                        </div>

                        {/* Stats Grid */}
                        <AdminStats
                            usersCount={usersCount}
                            videosCount={videos.length}
                            postsCount={posts.length}
                            messagesCount={statsMessagesCount}
                        />

                        {/* Content Area */}
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

