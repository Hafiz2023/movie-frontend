
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Edit, Trash2 } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { toast } from 'react-toastify';

interface Video {
    id: number;
    title: string;
    description?: string;
    category?: { name: string }; // Handle nested object or string
    thumbnail_url?: string;
    thumbnail?: string;
    video_url?: string;
    status: string;
    date: string;
    views: number;
    author?: string;
}

export default function StudioTab() {
    const { user, token } = useAuthStore();
    const [userVideos, setUserVideos] = useState<Video[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', category: 'Vlog', thumbnail: '', video_url: '' });

    useEffect(() => {
        const fetchVideos = async () => {
            if (!user?.id) return;
            try {
                const res = await fetch(`/api/videos?userId=${user.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setUserVideos(data);
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

    const handleOpenDialog = (video: Video | null = null) => {
        if (video) {
            setCurrentVideo(video);
            setFormData({
                title: video.title,
                description: video.description || '',
                category: video.category?.name || 'Vlog',
                thumbnail: video.thumbnail_url || '',
                video_url: video.video_url || ''
            });
        } else {
            setCurrentVideo(null);
            setFormData({ title: '', description: '', category: 'Vlog', thumbnail: '', video_url: '' });
        }
        setIsDialogOpen(true);
    };

    const handleSaveVideo = async () => {
        if (!token) return;

        try {
            const method = currentVideo ? 'PUT' : 'POST';
            const url = currentVideo ? `/api/videos/${currentVideo.id}` : '/api/videos';

            const payload = {
                ...formData,
                categoryId: 1, // You might want to make this dynamic
                thumbnail_url: formData.thumbnail
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
                toast.success('Video updated!');
            } else {
                setUserVideos(prev => [savedVideo, ...prev]);
                toast.success('Video uploaded!');
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        }
    };

    const handleDeleteVideo = async (id: number) => {
        if (!confirm('Are you sure you want to delete this video?')) return;
        if (!token) return;

        try {
            const res = await fetch(`/api/videos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Delete failed');

            setUserVideos(prev => prev.filter(v => v.id !== id));
            toast.success('Video deleted');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete video');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Content Studio</h2>
                    <p className="text-muted-foreground">Manage your videos and live streams.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()} className="gap-2">
                            <Upload className="w-4 h-4" /> Upload Video
                        </Button>
                    </DialogTrigger>
                    <DialogContent className=" bg-card border-border">
                        <DialogHeader>
                            <DialogTitle>{currentVideo ? 'Edit Video' : 'Upload New Video'}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Video Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter interesting title..."
                                    className="bg-secondary border-border"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                                <Input
                                    id="thumbnail"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    placeholder="https://..."
                                    className="bg-secondary border-border"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="video_url">Video URL</Label>
                                <Input
                                    id="video_url"
                                    value={formData.video_url}
                                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                    placeholder="https://..."
                                    className="bg-secondary border-border"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="bg-secondary border-border"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Video description..."
                                    className="bg-secondary border-border"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSaveVideo}>{currentVideo ? 'Save Changes' : 'Upload'}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border border-border bg-card">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-border font-medium text-muted-foreground text-sm">
                    <div className="col-span-6">Video</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Views</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="divide-y divide-border/50">
                    {userVideos.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">No videos uploaded yet. Start creating!</div>
                    ) : (
                        userVideos.map((video) => (
                            <div key={video.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-secondary/20 transition-colors">
                                <div className="col-span-6 flex gap-4">

                                    <div className="min-w-0">
                                        <p className="font-semibold truncate">{video.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${video.status === 'Published' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                                {video.status}
                                            </span>
                                            <span className="text-xs text-muted-foreground truncate hidden sm:block">ID: {video.id}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 text-sm text-muted-foreground">{video.date}</div>
                                <div className="col-span-2 text-sm font-medium">{video.views.toLocaleString()}</div>
                                <div className="col-span-2 flex justify-end gap-2">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" onClick={() => handleOpenDialog(video)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteVideo(video.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

