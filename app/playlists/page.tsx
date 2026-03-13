'use client';

import React, { useState } from 'react';
import { ListVideo, Search, TrendingUp } from 'lucide-react';
import PlaylistCard from '@/components/playlists/PlaylistCard';

const MOCK_PLAYLISTS = [
    { id: 1, title: 'Best of 2025: Editor Picks', thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600', videoCount: 24, author: 'AdminPicks', updatedAt: '2 hours ago' },
    { id: 2, title: 'Late Night Selection', thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600', videoCount: 15, author: 'NightOwl', updatedAt: '1 day ago' },
    { id: 3, title: 'Premium 4K Showcase', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600', videoCount: 42, author: 'HQ_Master', updatedAt: '3 days ago' },
    { id: 4, title: 'Story Driven Series', thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600', videoCount: 8, author: 'PlotWatcher', updatedAt: '1 week ago' },
    { id: 5, title: 'Classic Rewinds', thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=600', videoCount: 56, author: 'VintageLover', updatedAt: '2 weeks ago' },
    { id: 6, title: 'Top Rated Models', thumbnail: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=600', videoCount: 31, author: 'PopCulture', updatedAt: '4 hours ago' },
    { id: 7, title: 'Intense Scenes', thumbnail: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=600', videoCount: 19, author: 'ActionPack', updatedAt: 'Just now' },
    { id: 8, title: 'Hidden Gems', thumbnail: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600', videoCount: 12, author: 'Explorer', updatedAt: '1 month ago' },
];

export default function PlaylistsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPlaylists = MOCK_PLAYLISTS.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header Section */}
            <div className="bg-background/80 backdrop-blur-xl border-b border-border sticky top-16 z-30 py-4 sm:py-6 px-4">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2 mb-1">
                            <ListVideo className="w-8 h-8 text-primary" />
                            Curated Playlists
                        </h1>
                        <p className="text-muted-foreground text-sm">Discover thematic collections spanning across thousands of videos.</p>
                    </div>

                    <div className="flex bg-secondary/80 rounded-full border border-border p-1">
                        <button className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-full bg-primary text-white shadow-md transition-all flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Trending
                        </button>
                        <button className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-full text-muted-foreground hover:text-white transition-all">
                            Newest
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Search Bar */}
                <div className="mb-8 max-w-xl mx-auto md:mx-0">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Find playlists by name or mood..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-secondary text-white rounded-full pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-white/5"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                    {filteredPlaylists.map((playlist, idx) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} index={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
}
