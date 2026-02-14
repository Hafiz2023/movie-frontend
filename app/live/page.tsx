'use client';
import React, { useState } from 'react';
import { Signal, User, Lock, CreditCard, X, Check, Star } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded Mock Data
const MOCK_LIVE_STREAMS = [
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
    const [selectedStream, setSelectedStream] = useState<typeof MOCK_LIVE_STREAMS[0] | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    // Calculate Price with discount for yearly
    const getPrice = (basePrice: number) => {
        if (billingCycle === 'monthly') return basePrice;
        return (basePrice * 10).toFixed(2); // 12 months for price of 10
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header Section */}
            <div className="bg-background/95 border-b border-border py-12 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-transparent pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
                        <span className="w-2 h-2 bg-destructive rounded-full" /> LIVE NOW
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Discover Live Models
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Interact in real-time with verified creators. Join exclusive private shows and support your favorite personalities.
                    </p>
                </div>
            </div>

            {/* Live Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {MOCK_LIVE_STREAMS.map((stream, idx) => (
                        <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-[3/4] relative">
                                <Image
                                    src={stream.thumbnail}
                                    alt={stream.user}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Status Badges */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
                                        LIVE
                                    </span>
                                    {stream.price > 0 && (
                                        <span className="bg-black/60 backdrop-blur-md text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1">
                                            <Lock className="w-3 h-3" /> PREMIUM
                                        </span>
                                    )}
                                </div>

                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                                    <h3 className="font-bold text-white text-lg leading-tight mb-1">{stream.user}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                                        <User className="w-3 h-3" /> {stream.viewers.toLocaleString()} viewers
                                    </div>
                                    <button
                                        onClick={() => setSelectedStream(stream)}
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 rounded text-sm transition-all transform active:scale-95 shadow-lg shadow-primary/20"
                                    >
                                        Join Room
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Subscription Modal */}
            <AnimatePresence>
                {selectedStream && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden relative"
                        >
                            <button
                                onClick={() => setSelectedStream(null)}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Modal Header with Profile */}
                            <div className="relative h-32 bg-gradient-to-b from-primary/20 to-background">
                                <Image src={selectedStream.thumbnail} alt="cover" fill className="object-cover opacity-20" />
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                                    <div className="w-20 h-20 rounded-full border-4 border-background overflow-hidden relative shadow-xl">
                                        <Image src={selectedStream.thumbnail} alt="avatar" fill className="object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-12 pb-8 px-6 text-center">
                                <h2 className="text-2xl font-bold text-foreground mb-1">{selectedStream.user}</h2>
                                <div className="flex justify-center gap-2 mb-6">
                                    {selectedStream.tags.map(tag => (
                                        <span key={tag} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded border border-border">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-lg font-bold text-muted-foreground mb-4">Choose Your Access Plan</h3>

                                {/* Billing Toggle */}
                                <div className="flex justify-center mb-6">
                                    <div className="bg-secondary p-1 rounded-lg flex items-center">
                                        <button
                                            onClick={() => setBillingCycle('monthly')}
                                            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-background text-foreground shadow' : 'text-muted-foreground'}`}
                                        >
                                            Monthly
                                        </button>
                                        <button
                                            onClick={() => setBillingCycle('yearly')}
                                            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${billingCycle === 'yearly' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
                                        >
                                            Yearly (-20%)
                                        </button>
                                    </div>
                                </div>

                                {/* Plan Card */}
                                <div className="bg-gradient-to-br from-card to-background border border-primary/30 rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors mb-6 text-left">
                                    <div className="absolute top-0 right-0 bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                        RECOMMENDED
                                    </div>

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="font-bold text-foreground text-lg">Premium Access</div>
                                            <div className="text-xs text-muted-foreground">Unlock current stream & archives</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-primary">
                                                ${getPrice(selectedStream.price)}
                                            </div>
                                            <div className="text-[10px] text-muted-foreground">
                                                / {billingCycle === 'monthly' ? 'month' : 'year'}
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-0">
                                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary" /> 1080p / 4K Stream Quality
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary" /> Ad-free Experience
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary" /> Private Chat Badge
                                        </li>
                                    </ul>
                                </div>

                                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20">
                                    <CreditCard className="w-4 h-4" />
                                    Proceed to Payment
                                </button>
                                <p className="text-[10px] text-muted-foreground/60 mt-4">
                                    Recurring billing. Cancel anytime. Secure payment via Stripe.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
