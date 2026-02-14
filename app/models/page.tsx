'use client';
import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { MOCK_MODELS } from '@/utils/mockData';

export default function ModelsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <div className="bg-background/95 border-b border-border py-8 px-4 sticky top-16 z-30 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Top Pornstars</h1>
                        <p className="text-muted-foreground">The most popular creators ranked by views and popularity.</p>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <button className="px-4 py-2 bg-secondary rounded hover:bg-accent transition-colors text-sm font-bold border border-border">Trending</button>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm font-bold">Top Rated</button>
                        <button className="px-4 py-2 bg-secondary rounded hover:bg-accent transition-colors text-sm font-bold border border-border">Newest</button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {MOCK_MODELS.map((model) => (
                        <Link href={`/models/${model.id}`} key={model.id} className="group flex flex-col items-center">
                            {/* Avatar Circle */}
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-secondary to-secondary group-hover:from-primary group-hover:to-orange-500 cursor-pointer transition-all duration-300">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-background relative">
                                    <Image
                                        src={model.avatar}
                                        alt={model.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                {/* Rank Badge */}
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground font-bold w-7 h-7 flex items-center justify-center rounded-full text-xs shadow-lg border-2 border-background z-10">
                                    #{model.rank}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center mt-3">
                                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center justify-center gap-1">
                                    {model.name}
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
                                </h3>
                                <div className="text-xs text-muted-foreground mt-1 flex flex-col gap-0.5">
                                    <span>{model.videos} videos</span>
                                    <span className="text-muted-foreground/80">{model.views} views</span>
                                </div>
                            </div>

                            {/* Subscribe Button (Hover) */}
                            <button className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-[10px] uppercase font-bold px-4 py-1.5 rounded-full border border-border">
                                Subscribe
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
