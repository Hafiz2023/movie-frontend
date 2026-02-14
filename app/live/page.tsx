
'use client';
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LiveHeader from '@/components/live/LiveHeader';
import LiveStreamCard from '@/components/live/LiveStreamCard';
import SubscriptionModal from '@/components/live/SubscriptionModal';
import { LiveStream } from '@/types';

// Expanded Mock Data
const MOCK_LIVE_STREAMS: LiveStream[] = [
    { id: 1, user: "KittenQueen", viewers: 12405, thumbnail: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop", description: "Chatting and chill vibes 💕", tags: ["English", "Teen"], price: 9.99 },
    { id: 2, user: "GamerGirl_99", viewers: 8300, thumbnail: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=600&auto=format&fit=crop", description: "Private show available!", tags: ["CamShow", "Roleplay"], price: 14.99 },
    { id: 3, user: "FitnessSarah", viewers: 5100, thumbnail: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop", description: "Morning Yoga session 🧘‍♀️", tags: ["Yoga", "Strip Tease"], price: 19.99 },
    { id: 4, user: "ChefMike", viewers: 3200, thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=600&auto=format&fit=crop", description: "Cooking up something hot! 🍳", tags: ["Oil Show", "Solo"], price: 4.99 },
    { id: 5, user: "TravelWithMe", viewers: 2900, thumbnail: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=600&auto=format&fit=crop", description: "Exploring the streets of Tokyo 🇯🇵", tags: ["Public", "Real Life"], price: 24.99 },
    { id: 6, user: "TechTalks", viewers: 1500, thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop", description: "Reviewing the new toys", tags: ["Toy Control", "Review"], price: 0 }, // Free
    { id: 7, user: "AliceInWonder", viewers: 4200, thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", description: "Just Chatting & Singing 🎤", tags: ["Dancing", "Chat"], price: 12.99 },
    { id: 8, user: "DarkSoul_X", viewers: 1800, thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop", description: "Horror Game Night 👻", tags: ["Hardcore", "Gothic"], price: 6.99 },
];

export default function LivePage() {
    const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header Section */}
            <LiveHeader />

            {/* Live Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {MOCK_LIVE_STREAMS.map((stream, idx) => (
                        <LiveStreamCard
                            key={stream.id}
                            stream={stream}
                            index={idx}
                            onSelect={setSelectedStream}
                        />
                    ))}
                </div>
            </div>

            {/* Subscription Modal */}
            <AnimatePresence>
                {selectedStream && (
                    <SubscriptionModal
                        stream={selectedStream}
                        onClose={() => setSelectedStream(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
