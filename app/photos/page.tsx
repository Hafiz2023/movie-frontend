'use client';
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { PhotoCard, Photo } from '@/components/photos/PhotoCard';
import { PhotoFilter } from '@/components/photos/PhotoFilter';
import { PhotoLightbox } from '@/components/photos/PhotoLightbox';

const MOCK_PHOTOS: Photo[] = [
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
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
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

                    {/* Filter Tabs Component */}
                    <div className="w-full md:w-auto">
                        <PhotoFilter currentFilter={filter} setFilter={setFilter} />
                    </div>
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                    {MOCK_PHOTOS.map((photo, index) => (
                        <PhotoCard
                            key={photo.id}
                            photo={photo}
                            index={index}
                            onClick={setSelectedPhoto}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox Modal Component */}
            <PhotoLightbox
                photo={selectedPhoto}
                onClose={() => setSelectedPhoto(null)}
            />
        </div>
    );
}
