'use client';
import React, { useState } from 'react';
import { MOCK_MODELS, MOCK_VIDEOS } from '@/utils/mockData';
import VideoCard from '@/components/VideoCard';
import Image from 'next/image';
import { CheckCircle2, UserPlus, MessageCircle, Share2, Grid } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';

export default function ModelProfilePage() {
    const params = useParams();
    const id = Number(params.id);
    const [activeTab, setActiveTab] = useState('videos');

    // Find the model
    const model = MOCK_MODELS.find(m => m.id === id);

    if (!model) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Model Not Found</h1>
                    <p className="text-gray-400">The model you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    const modelVideos = MOCK_VIDEOS.filter(v => v.author === model.name);
    const displayVideos = modelVideos.length > 0 ? modelVideos : [...MOCK_VIDEOS].splice(0, 4);

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Cover Image */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative group">
                <div className="absolute inset-0 bg-black/20" />
                {/* Mock Cover Photo update button */}
                <button className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white px-3 py-1.5 rounded text-xs font-bold transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10">
                    Change Cover
                </button>
            </div>

            {/* Profile Header */}
            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
                    {/* Avatar */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black bg-gray-900 overflow-hidden shadow-2xl group cursor-pointer">
                        <Image
                            src={model.avatar}
                            alt={model.name}
                            fill
                            className="object-cover group-hover:opacity-90 transition-opacity"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 text-center md:text-left mb-2">
                        <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2 mb-1">
                            {model.name}
                            <CheckCircle2 className="w-6 h-6 text-blue-400 fill-blue-400/10" />
                        </h1>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400 mb-4">
                            <span>{model.views} Views</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <span>{model.videos} Videos</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <span>Rank #{model.rank}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <button className="flex items-center gap-2 bg-primary text-black font-bold px-6 py-2 rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 transform hover:scale-105 duration-200">
                                <UserPlus className="w-4 h-4" /> Subscribe
                            </button>
                            <button className="flex items-center gap-2 bg-[#222] text-white font-medium px-4 py-2 rounded-full hover:bg-[#333] transition-colors border border-[#333]">
                                <MessageCircle className="w-4 h-4" /> Message
                            </button>
                            <button className="p-2 bg-[#222] text-white rounded-full hover:bg-[#333] transition-colors border border-[#333]">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs / Filter */}
                <div className="border-b border-[#222] mb-8 flex items-center justify-center md:justify-start gap-8 text-sm font-medium text-gray-400 overflow-x-auto no-scrollbar">
                    {['videos', 'photos', 'about', 'activity'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-1 flex items-center gap-2 capitalize transition-all border-b-2 ${activeTab === tab
                                ? 'text-primary border-primary'
                                : 'border-transparent hover:text-white'
                                }`}
                        >
                            {tab === 'videos' && <Grid className="w-4 h-4" />}
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'videos' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                Latest Videos
                                <span className="text-xs font-normal text-gray-500 bg-[#222] px-2 py-0.5 rounded-full">{displayVideos.length}</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {displayVideos.map(video => (
                                    <VideoCard key={video.id} video={video} />
                                ))}
                            </div>
                            {displayVideos.length === 0 && (
                                <div className="py-20 text-center text-gray-500">
                                    No videos found for this model yet.
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'photos' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-lg font-bold mb-4">Photo Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {/* Generating some mock photos for the specific model */}
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="group relative aspect-[3/4] bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer">
                                        <Image
                                            src={`https://picsum.photos/seed/${model.id}-${i}/600/800`}
                                            alt={`${model.name} photo ${i + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full font-bold text-sm border border-white/20">
                                                View Full
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="md:col-span-2 space-y-6">
                                <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
                                    <h3 className="text-xl font-bold mb-4 text-white">About {model.name}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Hi loves! Welcome to my official page. I love creating content that captures my wild adventures and intimate moments.
                                        Make sure to subscribe to see exclusive behind-the-scenes footage and daily updates.
                                        I try to reply to all my DMs so don't be shy!
                                        <br /><br />
                                        Posting new videos every Tuesday and Friday! ✨
                                    </p>
                                </div>

                                <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
                                    <h3 className="text-lg font-bold mb-4 text-white">Interests</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Travel', 'Fitness', 'Gaming', 'Cosplay', 'Fashion', 'Beach', 'Photography'].map(tag => (
                                            <span key={tag} className="bg-[#222] text-gray-300 px-3 py-1 rounded-full text-sm border border-[#333]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
                                    <h3 className="text-lg font-bold mb-4 text-white border-b border-[#222] pb-2">Stats</h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Age</span>
                                            <span className="text-white font-medium">24</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Height</span>
                                            <span className="text-white font-medium">5'7"</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Location</span>
                                            <span className="text-white font-medium">Los Angeles, CA</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Joined</span>
                                            <span className="text-white font-medium">Oct 2023</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Relationship</span>
                                            <span className="text-white font-medium">Single</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-primary/20 to-orange-600/10 p-6 rounded-xl border border-primary/20">
                                    <h3 className="text-lg font-bold mb-2 text-primary">Premium Fan Club</h3>
                                    <p className="text-xs text-gray-400 mb-4">Get access to my private Snapchat and exclusive 4K videos.</p>
                                    <button className="w-full bg-primary text-black font-bold py-2 rounded hover:bg-primary/90 transition-colors">
                                        Join Now - $9.99
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-6">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="bg-[#111] p-4 rounded-xl border border-[#222] flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden relative">
                                                <Image src={model.avatar} alt={model.name} fill className="object-cover" />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-white text-sm">{model.name}</span>
                                                <span className="text-xs text-gray-500">• {item * 2} hours ago</span>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-3">
                                                Just uploaded a new vlog from my trip to Bali! Check it out in the videos tab. 🌴☀️
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                                    <CheckCircle2 className="w-4 h-4" /> 1.2k
                                                </button>
                                                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                                    <MessageCircle className="w-4 h-4" /> 84 Comments
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
