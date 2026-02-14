'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MOCK_VIDEOS } from '@/utils/mockData';
import { Users, Plus, Activity, Video, Menu, X, MessageSquare, Trash2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import AdminSidebar from '@/components/layout/AdminSidebar';
import VideoTable from '@/components/admin/VideoTable';
import VideoFormDialog from '@/components/admin/VideoFormDialog';
import { useCommunityStore } from '@/store/communityStore';
import axios from 'axios';

export default function AdminPage() {
    const [videos, setVideos] = useState(MOCK_VIDEOS);
    const { posts, deletePost } = useCommunityStore();
    const [activeTab, setActiveTab] = useState<'videos' | 'community' | 'messages'>('videos');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    // Modal State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form State for Videos
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        thumbnail_url: '',
        video_url: ''
    });

    const usersCount = 50;
    const reportsCount = 10;

    useEffect(() => {
        if (activeTab === 'messages') {
            fetchMessages();
        }
    }, [activeTab]);

    const fetchMessages = async () => {
        try {
            const res = await axios.get('/api/contact');
            setMessages(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch messages");
        }
    };

    // Handlers
    const handleOpenAdd = () => {
        setFormData({ title: '', category: '', thumbnail_url: '', video_url: '' });
        setCurrentVideo(null);
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (video: any) => {
        setFormData({
            title: video.title,
            category: video.category,
            thumbnail_url: video.thumbnail_url,
            video_url: video.video_url || ''
        });
        setCurrentVideo(video);
        setIsDialogOpen(true);
    };

    const handleOpenDelete = (video: any) => {
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
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setVideos(prev => prev.filter(v => v.id !== currentVideo.id));
        toast.success('Video deleted successfully');

        setIsLoading(false);
        setIsDeleteDialogOpen(false);
    };

    const handleDeletePost = (id: number) => {
        if (confirm("Are you sure you want to delete this post?")) {
            deletePost(id);
            toast.success("Post deleted from Community.");
        }
    }

    return (
        <ProtectedRoute requiredRole="admin">
            <div className="flex h-screen overflow-hidden bg-background">
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
                    {/* Admin Sidebar Content would go here, simplified for now */}
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
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <motion.div whileHover={{ y: -5 }}>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{usersCount}</div>
                                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div whileHover={{ y: -5 }}>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                                        <Video className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{videos.length}</div>
                                        <p className="text-xs text-muted-foreground">Updated just now</p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div whileHover={{ y: -5 }}>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Active Posts</CardTitle>
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{posts.length}</div>
                                        <p className="text-xs text-muted-foreground">+5 today</p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div whileHover={{ y: -5 }}>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">New Messages</CardTitle>
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{messages.length}</div>
                                        <p className="text-xs text-muted-foreground">Inbox</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Content Area */}
                        {activeTab === 'videos' ? (
                            <VideoTable
                                videos={videos}
                                onEdit={handleOpenEdit}
                                onDelete={handleOpenDelete}
                            />
                        ) : activeTab === 'community' ? (
                            <div className="bg-card rounded-lg border border-border overflow-hidden">
                                <div className="p-6 border-b border-border">
                                    <h2 className="text-xl font-bold">Community Posts Manager</h2>
                                </div>
                                <div className="divide-y divide-border">
                                    {posts.map(post => (
                                        <div key={post.id} className="p-4 flex items-start justify-between hover:bg-muted/50 transition-colors">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                                    {post.avatar}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-sm">{post.user}</span>
                                                        <span className="text-xs text-muted-foreground">{post.time}</span>
                                                    </div>
                                                    <p className="text-sm text-foreground/80 mb-2">{post.content}</p>
                                                    <div className="flex gap-2">
                                                        {post.tags.map(tag => (
                                                            <span key={tag} className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground">#{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeletePost(post.id)}
                                                className="shrink-0"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    ))}
                                    {posts.length === 0 && (
                                        <div className="p-8 text-center text-muted-foreground">
                                            No posts found.
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-card rounded-lg border border-border overflow-hidden">
                                <div className="p-6 border-b border-border flex justify-between items-center">
                                    <h2 className="text-xl font-bold">Support Inbox</h2>
                                    <Button variant="outline" size="sm" onClick={fetchMessages}>Refresh</Button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
                                            <tr>
                                                <th className="px-6 py-3">Date</th>
                                                <th className="px-6 py-3">Name</th>
                                                <th className="px-6 py-3">Email</th>
                                                <th className="px-6 py-3">Subject</th>
                                                <th className="px-6 py-3">Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {messages.length > 0 ? (
                                                messages.map((msg: any) => (
                                                    <tr key={msg.id} className="border-b border-border hover:bg-muted/50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                                            {new Date(msg.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium">{msg.name}</td>
                                                        <td className="px-6 py-4">{msg.email}</td>
                                                        <td className="px-6 py-4">
                                                            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs border border-primary/20">
                                                                {msg.subject}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 max-w-md truncate" title={msg.message}>
                                                            {msg.message}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                                        No messages found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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

                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete the video
                                <span className="font-semibold text-foreground"> {currentVideo?.title}</span>.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                                {isLoading ? 'Deleting...' : 'Delete Video'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </ProtectedRoute>
    );
}
