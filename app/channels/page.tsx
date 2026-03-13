'use client';

/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Channels" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */


import React, { useState } from 'react';
import { Search, Video } from 'lucide-react';
import ChannelCard from '@/components/channels/ChannelCard';

const MOCK_CHANNELS = [
    { id: 1, name: 'Brazzers', avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200', banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800', subscribers: '4M', videos: 1540, isVerified: true },
    { id: 2, name: 'RealityKings', avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200', banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800', subscribers: '3.2M', videos: 1210, isVerified: true },
    { id: 3, name: 'Blacked', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800', subscribers: '2.8M', videos: 890, isVerified: true },
    { id: 4, name: 'NaughtyAmerica', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200', banner: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800', subscribers: '3.6M', videos: 1800, isVerified: true },
    { id: 5, name: 'DigitalPlayground', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', banner: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=800', subscribers: '1.9M', videos: 950, isVerified: true },
    { id: 6, name: 'Vixen', avatar: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200', banner: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=800', subscribers: '2.1M', videos: 480, isVerified: true },
];

export default function ChannelsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('Trending');

    const filteredChannels = MOCK_CHANNELS.filter(channel =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header Section */}
            <div className="bg-background/80 backdrop-blur-md border-b border-border sticky top-16 z-30 py-4 sm:py-6 px-4">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
                            <Video className="w-8 h-8 text-primary" />
                            Official Channels & Studios
                        </h1>
                        <p className="text-muted-foreground text-sm">Follow your favorite studios and never miss their daily updates.</p>
                    </div>

                    <div className="flex bg-secondary/80 rounded-full border border-border p-1">
                        {['Trending', 'Most Subscribers', 'Newest'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${filter === f ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Search Inputs */}
                <div className="mb-8 max-w-xl mx-auto md:mx-0">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search studios & channels..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-secondary text-white rounded-full pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-white/5"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredChannels.map((channel, idx) => (
                        <ChannelCard key={channel.id} channel={channel} index={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
}
