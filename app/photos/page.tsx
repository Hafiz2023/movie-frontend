'use client';
import React, { useState } from 'react';
import { Camera, Heart, MessageSquare, X, Download, Share2, ZoomIn, Film } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_PHOTOS = [
    { id: 1, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200", likes: 1200, comments: 45, user: "SarahJ", title: "Golden Hour Glow", tags: ["Portrait", "Outdoor"] },
    { id: 2, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200", likes: 890, comments: 23, user: "ModelX", title: "Urban Vibes", tags: ["Street", "Fashion"] },
    { id: 3, src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200", likes: 3400, comments: 120, user: "VogueLife", title: "Studio Session", tags: ["Studio", "Professional"] },
    { id: 4, src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200", likes: 560, comments: 12, user: "Fashionista", title: "Boho Style", tags: ["Nature", "Style"] },
    { id: 5, src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200", likes: 2300, comments: 89, user: "UrbanStyle", title: "City Lights", tags: ["Night", "Urban"] },
    { id: 6, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200", likes: 4500, comments: 210, user: "BeautyQueen", title: "Fresh Face", tags: ["Beauty", "Closeup"] },
    { id: 7, src: "https://images.unsplash.com/photo-1503104891248-eb5a3533646e?q=80&w=1200", likes: 670, comments: 34, user: "WildSoul", title: "Dark Aesthetic", tags: ["Moody", "Art"] },
    { id: 8, src: "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1200", likes: 980, comments: 41, user: "ChicLook", title: "Summer Breeze", tags: ["Summer", "Lifestyle"] },
    // Doubling data for masonry effect
    { id: 9, src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200", likes: 1100, comments: 55, user: "RunwayStar", title: "High Fashion", tags: ["Fashion", "Runway"] },
    { id: 10, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200", likes: 2200, comments: 110, user: "KPopStyle", title: "Seoul Street", tags: ["Street", "Colors"] },
    { id: 11, src: "https://images.unsplash.com/photo-1529139574466-a302d20525b5?q=80&w=1200", likes: 880, comments: 20, user: "IndieSpirit", title: "Festival Look", tags: ["Music", "Festival"] },
    { id: 12, src: "https://images.unsplash.com/photo-1485290334039-a3c69043e541?q=80&w=1200", likes: 310, comments: 15, user: "MartialArts", title: "Motion Blur", tags: ["Action", "Sport"] },
];

export default function PhotosPage() {
    const [selectedPhoto, setSelectedPhoto] = useState<typeof MOCK_PHOTOS[0] | null>(null);
    const [filter, setFilter] = useState('Trending');

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header Section */}
            <div className="bg-background/80 backdrop-blur-md border-b border-border sticky top-14 md:top-0 z-30 py-6 px-4">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
                            <Camera className="w-8 h-8 text-primary" />
                            Photo Galleries
                        </h1>
                        <p className="text-muted-foreground text-sm">Exclusive high-resolution 4K photos from top creators.</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex bg-secondary p-1 rounded-lg">
                        {['Trending', 'Newest', 'Top Rated', 'Exclusive'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === tab
                                    ? 'bg-primary text-primary-foreground shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                    {MOCK_PHOTOS.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            layoutId={`photo-${photo.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="relative group break-inside-avoid rounded-xl overflow-hidden bg-card cursor-zoom-in border border-transparent hover:border-primary/50 transition-colors"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                width={600}
                                height={800}
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                                loading="lazy"
                            />

                            {/* Premium Badge */}
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/20">
                                4K
                            </div>

                            {/* Overlay Details */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="font-bold text-white text-lg leading-tight mb-1">{photo.title}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">
                                        {photo.user[0]}
                                    </div>
                                    <span className="text-sm text-gray-300">@{photo.user}</span>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                                    <div className="flex items-center gap-4 text-xs font-medium text-gray-300">
                                        <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                            <Heart className="w-3.5 h-3.5" /> {photo.likes}
                                        </div>
                                        <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                            <MessageSquare className="w-3.5 h-3.5" /> {photo.comments}
                                        </div>
                                    </div>
                                    <button className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full backdrop-blur-sm transition-colors">
                                        <ZoomIn className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            layoutId={`photo-${selectedPhoto.id}`}
                            className="relative max-w-5xl w-full h-full flex flex-col md:flex-row bg-card rounded-2xl overflow-hidden shadow-2xl border border-border"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Image Section */}
                            <div className="flex-1 relative h-[50vh] md:h-full bg-black flex items-center justify-center">
                                <Image
                                    src={selectedPhoto.src}
                                    alt={selectedPhoto.title}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </div>

                            {/* Sidebar Info Section */}
                            <div className="w-full md:w-80 lg:w-96 bg-card p-6 flex flex-col border-l border-border">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-orange-600 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                                        {selectedPhoto.user[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-lg">{selectedPhoto.user}</h3>
                                        <span className="text-xs text-primary font-medium">Verified Creator</span>
                                    </div>
                                </div>

                                <div className="space-y-6 flex-1">
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground mb-2">{selectedPhoto.title}</h2>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            Exclusive behind the scenes from my latest shoot. Styled in custom {selectedPhoto.tags[0]} wear.
                                            Unlock the full set in my premium gallery!
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {selectedPhoto.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-secondary border border-border rounded text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-border border-b">
                                        <div className="text-center">
                                            <span className="block font-bold text-xl text-foreground">{selectedPhoto.likes}</span>
                                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Likes</span>
                                        </div>
                                        <div className="text-center border-l border-border">
                                            <span className="block font-bold text-xl text-foreground">{selectedPhoto.comments}</span>
                                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Comments</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto space-y-3 pt-6">
                                    <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-colors">
                                        <Download className="w-4 h-4" /> Download 4K Wallpaper
                                    </button>
                                    <button className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground font-medium py-3 rounded-lg transition-colors border border-border">
                                        <Share2 className="w-4 h-4" /> Share Photo
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
