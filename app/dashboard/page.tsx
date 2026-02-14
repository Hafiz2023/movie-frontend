'use client';

import React from 'react';
import useAuthStore from '@/store/authStore';
import { MOCK_VIDEOS } from '@/utils/mockData';
import { Play, Clock, Heart, Settings, User, History, CreditCard, Shield, Bell, ListVideo, LogOut, Video, Edit, Trash2, Upload, Plus, MessageSquare, Send, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import VideoCard from '@/components/VideoCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function DashboardPage() {
    const router = useRouter();
    const { user, token, logout } = useAuthStore();

    // State for user videos
    const [userVideos, setUserVideos] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [currentVideo, setCurrentVideo] = React.useState<any>(null);
    const [formData, setFormData] = React.useState({ title: '', description: '', category: 'Vlog', thumbnail: '', video_url: '' });

    // State for Contact/Support
    const [tickets, setTickets] = React.useState<any[]>([]);
    const [ticketForm, setTicketForm] = React.useState({ subject: 'General Inquiry', message: '', phone: '' });
    const [sendingTicket, setSendingTicket] = React.useState(false);
    const [selectedTicket, setSelectedTicket] = React.useState<any>(null);
    const [isTicketDialogOpen, setIsTicketDialogOpen] = React.useState(false);
    const [orders, setOrders] = React.useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
    const [isOrderDialogOpen, setIsOrderDialogOpen] = React.useState(false);

    React.useEffect(() => {
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
            } finally {
                setLoading(false);
            }
        };

        const fetchTickets = async () => {
            try {
                // In a real app, we would filter by user ID. 
                // For this mock, we fetch all and filter in frontend or just show all.
                const res = await fetch('/api/contact');
                if (res.ok) {
                    const data = await res.json();
                    setTickets(data);
                }
            } catch (error) {
                console.error("Failed to fetch tickets");
            }
        };

        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (e) {
                console.error("Failed to fetch orders");
            }
        };

        if (user) {
            fetchVideos();
            fetchTickets();
            fetchOrders();
        }
    }, [user]);

    const handleOpenDialog = (video: any = null) => {
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

            // For now assuming category ID 1 exists or handling it on backend. 
            // In a real app we would select category ID. 
            // Let's assume category ID 1 for now or pass category name if API supports it.
            // Our Schema requires categoryId. Let's send 1 for now or fetch categories.
            // Simplified for this step: sending categoryId: 1.
            const payload = {
                ...formData,
                categoryId: 1,
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
            toast.error('Operation failed');
        }
    };

    const handleSendTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        setSendingTicket(true);
        try {
            const payload = {
                name: user?.name || 'User',
                email: user?.email || 'user@example.com',
                subject: ticketForm.subject,
                message: ticketForm.message,
                phone: ticketForm.phone,
                date: new Date().toISOString() // Ensure date is added
            };

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const newTicket = await res.json();
                setTickets(prev => [newTicket, ...prev]);
                toast.success("Message sent successfully!");
                setTicketForm(prev => ({ ...prev, message: '', phone: '' }));
            } else {
                toast.error("Failed to send message.");
            }
        } catch (err) {
            toast.error("Error sending message.");
        } finally {
            setSendingTicket(false);
        }
    };

    const handleViewTicket = (ticket: any) => {
        setSelectedTicket(ticket);
        setIsTicketDialogOpen(true);
    };

    const handleViewOrder = (order: any) => {
        setSelectedOrder(order);
        setIsOrderDialogOpen(true);
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
            toast.error('Failed to delete video');
        }
    };

    const displayUser = user || { name: 'Guest User', email: 'guest@example.com' };
    const historyVideos = MOCK_VIDEOS.slice(0, 4);
    const likedVideos = MOCK_VIDEOS.slice(2, 6);

    return (
        <div className="container mx-auto px-4 py-8 max-w-[1600px]">
            {/* Header Profile Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-background shadow-md">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="text-lg">U</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{displayUser.name}</h1>
                        <p className="text-muted-foreground">{displayUser.email}</p>
                        <div className="flex gap-2 mt-2">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                Premium Member
                            </span>
                            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                                Member since 2024
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2" onClick={() => {
                        logout();
                        router.push('/');
                        toast.info('Signed out successfully');
                    }}>
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                    <Button className="gap-2" onClick={() => toast.info('Upgrade plan feature coming soon!')}>
                        <Shield className="w-4 h-4" />
                        Upgrade Plan
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="bg-card w-full justify-start h-auto p-2 gap-2 border border-border overflow-x-auto">
                    <TabsTrigger value="overview" className="gap-2 px-4 py-2">
                        <User className="w-4 h-4" /> Overview
                    </TabsTrigger>
                    <TabsTrigger value="library" className="gap-2 px-4 py-2">
                        <ListVideo className="w-4 h-4" /> My Library
                    </TabsTrigger>
                    <TabsTrigger value="studio" className="gap-2 px-4 py-2">
                        <Video className="w-4 h-4" /> My Studio
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="gap-2 px-4 py-2">
                        <CreditCard className="w-4 h-4" /> Billing & Plan
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2 px-4 py-2">
                        <Settings className="w-4 h-4" /> Settings
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="gap-2 px-4 py-2">
                        <MessageSquare className="w-4 h-4" /> Contact
                    </TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-8">
                    {/* Stats Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
                                <Play className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">124</div>
                                <p className="text-xs text-muted-foreground">+12 this week</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">45h 20m</div>
                                <p className="text-xs text-muted-foreground">+5h this week</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Liked Videos</CardTitle>
                                <Heart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">38</div>
                                <p className="text-xs text-muted-foreground">+3 this week</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Comments</CardTitle>
                                <Bell className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">156</div>
                                <p className="text-xs text-muted-foreground">+24 new interactions</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity (Mock) */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>You watched 4 hours of content today.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={`https://avatar.vercel.sh/${i}.png`} alt="Avatar" />
                                                <AvatarFallback>OM</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">Watched "Cinematic Masterpiece"</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Category: Action • 2 hours ago
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium text-xs text-primary">+10pts</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Recommended</CardTitle>
                                <CardDescription>Based on your recent history.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {MOCK_VIDEOS.slice(0, 3).map((video) => (
                                    <div key={video.id} className="flex items-center gap-3 group cursor-pointer hover:bg-secondary/50 p-2 rounded-lg transition-colors">
                                        <div className="h-16 w-28 rounded-md overflow-hidden bg-muted relative">
                                            <img src={video.thumbnail_url} alt={video.title} className="object-cover w-full h-full" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium leading-none truncate group-hover:text-primary transition-colors">{video.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{video.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* LIBRARY TAB */}
                <TabsContent value="library" className="space-y-8">
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">Continue Watching</h2>
                                <p className="text-sm text-muted-foreground">Pick up where you left off.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {historyVideos.map((video) => (
                                <div key={video.id} className="relative group">
                                    <VideoCard video={video} />
                                    <div className="absolute bottom-[88px] left-0 right-0 h-1 bg-background/50 mx-3 rounded-full overflow-hidden z-10">
                                        <div className="h-full bg-primary w-[45%]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">Liked Videos</h2>
                                <p className="text-sm text-muted-foreground">Your collection of favorites.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {likedVideos.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    </section>
                </TabsContent>

                {/* STUDIO TAB (CRUD) */}
                <TabsContent value="studio" className="space-y-6">
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
                            <DialogContent className="sm:max-w-[500px] bg-card border-border">
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
                                        <Label htmlFor="category">Category</Label>
                                        <Input
                                            id="category"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                                            <div className="h-16 w-28 rounded-md overflow-hidden bg-muted relative shrink-0">
                                                <img src={video.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} alt={video.title} className="object-cover w-full h-full" />
                                            </div>
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
                </TabsContent>

                {/* BILLING TAB */}
                <TabsContent value="billing" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>You are currently on the <span className="font-bold text-primary">Premium Plan</span>.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/10">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary/20 rounded-full text-primary">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Professional Plan</p>
                                        <p className="text-sm text-muted-foreground">$12.00 / month</p>
                                    </div>
                                </div>
                                <Button variant="outline" onClick={() => toast.info('Billing portal coming soon!')}>Manage Subscription</Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <p>Next billing date is <span className="font-medium text-foreground">March 1, 2026</span>.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>Manage your payment details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4 p-4 border rounded-lg">
                                <CreditCard className="w-6 h-6 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="font-medium">Visa ending in 4242</p>
                                    <p className="text-xs text-muted-foreground">Expiry 12/2028</p>
                                </div>
                                <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>Your recent transactions and subscriptions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {orders.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No orders found.</p>
                                ) : (
                                    <div className="border rounded-md divide-y divide-border">
                                        {orders.map((order, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                                <div className="flex-1">
                                                    <p className="font-medium">{order.plan} ({order.cycle})</p>
                                                    <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">${order.price}</p>
                                                    <span className="text-[10px] uppercase font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full block w-fit ml-auto mb-1">
                                                        {order.status || 'Paid'}
                                                    </span>
                                                    <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => handleViewOrder(order)}>View Details</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SETTINGS TAB */}
                <TabsContent value="settings" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your account's profile information and email address.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input id="name" defaultValue={displayUser.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue={displayUser.email} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>Change your password securely.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary">Update Password</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                {/* CONTACT/SUPPORT TAB */}
                <TabsContent value="contact" className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-12">
                        {/* Contact Form */}
                        <Card className="md:col-span-5 lg:col-span-4">
                            <CardHeader>
                                <CardTitle>Contact</CardTitle>
                                <CardDescription>Send us a message or report an issue.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSendTicket} className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <select
                                            id="subject"
                                            value={ticketForm.subject}
                                            onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Technical Issue">Technical Issue</option>
                                            <option value="Billing Support">Billing Support</option>
                                            <option value="Feature Request">Feature Request</option>
                                        </select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={ticketForm.phone}
                                            onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                                            placeholder="+1 (555) 000-0000"
                                            className="bg-background border-input"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="message">Message</Label>
                                        <textarea
                                            id="message"
                                            value={ticketForm.message}
                                            onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Describe your issue or question..."
                                            required
                                        />
                                    </div>
                                    <Button type="submit" disabled={sendingTicket || !ticketForm.message} className="w-full gap-2">
                                        {sendingTicket ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Ticket History */}
                        <Card className="md:col-span-7 lg:col-span-8">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Contact History</CardTitle>
                                    <CardDescription>Your previous messages and their status.</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon"><Search className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon"><Filter className="w-4 h-4" /></Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {tickets.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-12">No contact history available.</p>
                                    ) : (
                                        tickets.map((ticket, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-semibold text-primary">ID #{1000 + idx}</span>
                                                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase">
                                                            SENT
                                                        </span>
                                                        {(ticket.createdAt || ticket.date) && <span className="text-xs text-muted-foreground ml-auto sm:ml-0">{new Date(ticket.createdAt || ticket.date).toLocaleString()}</span>}
                                                    </div>
                                                    <h4 className="font-bold text-sm mb-1">{ticket.subject}</h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">{ticket.message}</p>
                                                </div>
                                                <div className="flex items-center sm:flex-col justify-between sm:justify-center gap-2 border-t sm:border-t-0 sm:border-l border-border pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
                                                    <div className="text-xs text-center">
                                                        <div className="font-medium">Status</div>
                                                        <div className="text-muted-foreground">Open</div>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleViewTicket(ticket)}>View</Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Ticket Details Dialog */}
                <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
                    <DialogContent className="sm:max-w-[500px] bg-card border-border">
                        <DialogHeader>
                            <DialogTitle>Message Details</DialogTitle>
                            <DialogDescription>
                                View the details of your submitted message.
                            </DialogDescription>
                        </DialogHeader>
                        {selectedTicket && (
                            <div className="space-y-4 py-4">
                                <div className="grid gap-1">
                                    <span className="text-sm font-semibold text-muted-foreground">Subject</span>
                                    <p className="font-medium text-foreground text-lg">{selectedTicket.subject}</p>
                                </div>
                                <div className="grid gap-1">
                                    <span className="text-sm font-semibold text-muted-foreground">Date Sent</span>
                                    <p className="text-sm text-foreground">{(selectedTicket.createdAt || selectedTicket.date) ? new Date(selectedTicket.createdAt || selectedTicket.date).toLocaleString() : 'Just now'}</p>
                                </div>
                                {selectedTicket.phone && (
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Phone Number</span>
                                        <p className="text-sm text-foreground">{selectedTicket.phone}</p>
                                    </div>
                                )}
                                <div className="grid gap-1">
                                    <span className="text-sm font-semibold text-muted-foreground">Message Body</span>
                                    <div className="p-4 bg-secondary/20 rounded-lg text-sm leading-relaxed border border-border/50 max-h-[300px] overflow-y-auto">
                                        {selectedTicket.message}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
                                    <span className="text-sm font-semibold text-muted-foreground">Admin Response</span>
                                    <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                                        <p className="text-sm text-foreground italic">Thank you for contacting us. Your message has been received and is being reviewed by our support team.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsTicketDialogOpen(false)}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Order Details Dialog */}
                <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
                    <DialogContent className="sm:max-w-[500px] bg-card border-border">
                        <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>
                                Transaction details for your subscription.
                            </DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                            <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Plan</span>
                                        <p className="font-medium text-foreground">{selectedOrder.plan} <span className="text-xs text-muted-foreground capitalize">({selectedOrder.cycle})</span></p>
                                    </div>
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Amount</span>
                                        <p className="font-medium text-foreground">${selectedOrder.price}</p>
                                    </div>
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Date</span>
                                        <p className="text-sm text-foreground">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Status</span>
                                        <span className="text-xs uppercase font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded w-fit">
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t border-border/50 pt-4 space-y-3">
                                    <h4 className="font-semibold text-sm text-foreground">Payment Information</h4>
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Method</span>
                                        <p className="text-sm text-foreground capitalize">{selectedOrder.paymentMethod === 'card' ? 'Credit Card' : selectedOrder.paymentMethod}</p>
                                    </div>
                                    {selectedOrder.paymentMethod === 'card' && (selectedOrder.user?.cardNumber || selectedOrder.userInfo?.cardNumber) && (
                                        <div className="grid gap-1">
                                            <span className="text-sm font-semibold text-muted-foreground">Card Number</span>
                                            <p className="text-sm text-foreground font-mono">**** **** **** {(selectedOrder.user?.cardNumber || selectedOrder.userInfo?.cardNumber).slice(-4) || '****'}</p>
                                        </div>
                                    )}
                                    {(selectedOrder.paymentMethod === 'easypaisa' || selectedOrder.paymentMethod === 'jazzcash') && (selectedOrder.user?.phone || selectedOrder.userInfo?.phone) && (
                                        <div className="grid gap-1">
                                            <span className="text-sm font-semibold text-muted-foreground">Account Number</span>
                                            <p className="text-sm text-foreground font-mono">{selectedOrder.user?.phone || selectedOrder.userInfo?.phone}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="border-t border-border/50 pt-4 space-y-3">
                                    <h4 className="font-semibold text-sm text-foreground">Billing Contact</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="grid gap-1">
                                            <span className="text-sm font-semibold text-muted-foreground">Name</span>
                                            <p className="text-sm text-foreground">{selectedOrder.user?.name || selectedOrder.userInfo?.name || 'N/A'}</p>
                                        </div>
                                        <div className="grid gap-1">
                                            <span className="text-sm font-semibold text-muted-foreground">Email</span>
                                            <p className="text-sm text-foreground">{selectedOrder.user?.email || selectedOrder.userInfo?.email || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Tabs>
        </div>
    );
}
