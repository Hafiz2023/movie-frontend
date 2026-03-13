'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles, Video as VideoIcon } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { toast } from 'react-toastify';
import { VideoTable, VideoFormDialog, DeleteConfirmDialog } from '@/components/admin';
import { AdminVideo, VideoFormData } from '@/types';
import { motion } from 'framer-motion';

export default function StudioTab() {
    const { user, token } = useAuthStore();
    const [userVideos, setUserVideos] = useState<AdminVideo[]>([]);

    // Dialog States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [currentVideo, setCurrentVideo] = useState<AdminVideo | null>(null);
    const [formData, setFormData] = useState<VideoFormData>({
        title: '',
        description: '',
        category: 'Vlog',
        thumbnail_url: '',
        video_url: ''
    });

    useEffect(() => {
        const fetchVideos = async () => {
            if (!user?.id) return;
            try {
                // Ideally this would fetch AdminVideo formatted objects
                const res = await fetch(`/api/videos?userId=${user.id}`);
                if (res.ok) {
                    const data = await res.json();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const mappedData = data.map((v: any) => ({
                        ...v,
                        category: typeof v.category === 'object' && v.category !== null ? v.category.name || 'Uncategorized' : v.category || 'Uncategorized',
                        author: typeof v.user === 'object' && v.user !== null ? v.user.name : v.author
                    }));
                    setUserVideos(mappedData);
                }
            } catch (error) {
                console.error("Failed to fetch videos", error);
                toast.error("Failed to load your videos");
            }
        };

        if (user) {
            fetchVideos();
        }
    }, [user]);

    const handleOpenAdd = () => {
        setCurrentVideo(null);
        setFormData({ title: '', description: '', category: 'Vlog', thumbnail_url: '', video_url: '' });
        setIsFormOpen(true);
    };

    const handleOpenEdit = (video: AdminVideo) => {
        setCurrentVideo(video);
        setFormData({
            title: video.title,
            description: video.description || '',
            category: video.category || 'Vlog',
            thumbnail_url: video.thumbnail_url || '',
            video_url: video.video_url || ''
        });
        setIsFormOpen(true);
    };

    const handleOpenDelete = (video: AdminVideo) => {
        setCurrentVideo(video);
        setIsDeleteOpen(true);
    };

    const handleSaveVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        setIsLoading(true);

        try {
            const method = currentVideo ? 'PUT' : 'POST';
            const url = currentVideo ? `/api/videos/${currentVideo.id}` : '/api/videos';

            const payload = {
                ...formData,
                categoryId: 1, // Optional: dynamic category handling
            };

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to save video');

            const savedVideo = await res.json();

            if (currentVideo) {
                setUserVideos(prev => prev.map(v => v.id === currentVideo.id ? savedVideo : v));
                toast.success('Video updated successfully! 🎬');
            } else {
                setUserVideos(prev => [savedVideo, ...prev]);
                toast.success('Video uploaded successfully! 🎉');
            }
            setIsFormOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteVideo = async () => {
        if (!currentVideo || !token) return;
        setIsLoading(true);

        try {
            const res = await fetch(`/api/videos/${currentVideo.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Delete failed');

            setUserVideos(prev => prev.filter(v => v.id !== currentVideo.id));
            toast.success('Video deleted from Studio');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete video');
        } finally {
            setIsLoading(false);
            setIsDeleteOpen(false);
        }
    };

    return (
        <div className="space-y-6 lg:space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/40 p-6 rounded-2xl border border-border/50 backdrop-blur-md relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl border border-primary/30">
                        <VideoIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-4 h-4 text-primary/70" />
                            <h2 className="text-sm font-bold uppercase tracking-widest text-primary/70">Content Studio</h2>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            Manage Your Videos
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Upload, edit, and organize all your creative content in one place.
                        </p>
                    </div>
                </div>
                <Button onClick={handleOpenAdd} className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold relative z-10">
                    <Upload className="w-4 h-4" /> Upload Video
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full relative"
            >
                <VideoTable
                    videos={userVideos}
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                />
            </motion.div>

            <VideoFormDialog
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                currentVideo={currentVideo}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSaveVideo}
                isLoading={isLoading}
            />

            <DeleteConfirmDialog
                isOpen={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                title={currentVideo?.title || 'Video'}
                onDelete={handleDeleteVideo}
                isLoading={isLoading}
            />
        </div>
    );
}
