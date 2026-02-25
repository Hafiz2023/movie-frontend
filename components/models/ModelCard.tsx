import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Star } from 'lucide-react';
import { Model } from '@/types';

interface ModelCardProps {
    model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
    return (
        <Link href={`/models/${model.id}`} className="group relative flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-white/5 mx-auto w-full max-w-[180px] sm:max-w-[200px]">
            {/* Avatar Circle Container */}
            <div className="relative mb-4">
                {/* Animated Gradient Border */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-transparent via-primary to-purple-500 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />

                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-secondary to-secondary group-hover:from-primary group-hover:to-orange-500 transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-background relative bg-muted">
                        <Image
                            src={model.avatar}
                            alt={model.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    </div>
                </div>

                {/* Rank Badge - Floating with Glow */}
                <div className="absolute -top-1 -right-1 bg-gradient-to-br from-primary to-orange-500 text-white font-bold w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[10px] sm:text-xs shadow-[0_0_15px_rgba(var(--primary),0.5)] border-2 border-background z-10 group-hover:scale-110 transition-transform duration-300">
                    <span className="drop-shadow-sm">#{model.rank}</span>
                </div>

                {/* Online/Status Indicator (Optional addition for 'advance' feel) */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-background rounded-full z-10" />
            </div>

            {/* Info Section */}
            <div className="text-center w-full space-y-2">
                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors flex items-center justify-center gap-1.5 truncate">
                    {model.name}
                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/10 shrink-0" />
                </h3>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/80 font-medium">
                    <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        4.9
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground w-full pt-2 border-t border-border/50">
                    <div className="flex flex-col">
                        <span className="font-bold text-foreground text-xs">{model.videos}</span>
                        <span>Videos</span>
                    </div>
                    <div className="flex flex-col border-l border-border/50">
                        <span className="font-bold text-foreground text-xs">{model.views}</span>
                        <span>Views</span>
                    </div>
                </div>
            </div>

            {/* Subscribe Button (Slide up effect) */}
            <div className="absolute inset-x-0 bottom-20 sm:bottom-24 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-center pointer-events-none">
                <button className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg pointer-events-auto hover:bg-primary active:scale-95 transition-all">
                    Subscribe
                </button>
            </div>
        </Link>
    );
}
