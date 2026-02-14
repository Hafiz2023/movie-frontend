'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MOCK_VIDEOS, MOCK_SHORTS } from '@/utils/mockData';
import { ArrowLeft, Filter, Play, Clock, Heart, Eye } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function CategoryDetailPage() {
    const params = useParams();
    // Decode and handle potentially undefined slug
    const slug = typeof params?.slug === 'string' ? decodeURIComponent(params.slug) : '';

    // Filter content
    const categoryVideos = MOCK_VIDEOS.filter(v => v.category === slug);
    const categoryShorts = MOCK_SHORTS.filter(v => v.category === slug);
    const allContent = [...categoryVideos, ...categoryShorts];

    if (!slug) return <div className="p-8 text-center">Category not found</div>;

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Header / Hero */}
            <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                {/* Background Image (Using first video thumbnail or fallback) */}
                <Image
                    src={allContent[0]?.thumbnail_url || 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1920&auto=format&fit=crop'}
                    alt={slug}
                    fill
                    className="object-cover opacity-60 blur-sm scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-8">
                    <Link href="/categories" className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition-colors mb-4 group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Categories
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 capitalize mb-2"
                    >
                        {slug}
                    </motion.h1>
                    <p className="text-gray-400 text-lg flex items-center gap-2">
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/30">
                            {allContent.length} Titles
                        </span>
                        <span>Curated collection of top-rated content</span>
                    </p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="container mx-auto px-4 py-12">
                {/* Filters Row (Mock) */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#222]">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-[#1a1a1a] text-white border border-[#333] rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors">
                            Most Popular
                        </button>
                        <button className="px-4 py-2 bg-transparent text-gray-400 border border-[#222] rounded-full text-xs font-bold hover:border-white transition-colors">
                            Newest First
                        </button>
                    </div>
                </div>

                {allContent.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allContent.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative bg-[#111] rounded-xl overflow-hidden border border-[#222] hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10"
                            >
                                <Link href={`/watch/${item.id}`}>
                                    <div className="aspect-video relative overflow-hidden">
                                        <Image
                                            src={item.thumbnail_url}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                                <Play className="w-5 h-5 fill-current" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                                            {item.duration}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-bold text-white text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-3 h-3" />
                                                {item.views.toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>2 days ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No videos found in this category yet.</p>
                        <Link href="/categories" className="text-primary hover:underline mt-4 inline-block">
                            Browse other categories
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
