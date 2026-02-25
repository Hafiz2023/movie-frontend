'use client';

import React from 'react';

interface ShortsGridSkeletonProps {
    count?: number;
}

const ShortsGridSkeleton: React.FC<ShortsGridSkeletonProps> = ({ count = 12 }) => {
    return (
        <div className="space-y-6">
            {/* Title Skeleton */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/50 animate-pulse" />
                    <div className="space-y-2">
                        <div className="w-40 h-6 rounded-lg bg-secondary/50 animate-pulse" />
                        <div className="w-56 h-3 rounded-md bg-secondary/30 animate-pulse" />
                    </div>
                </div>
                <div className="hidden sm:block w-24 h-8 rounded-full bg-secondary/40 animate-pulse" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden rounded-2xl bg-secondary/30 aspect-[9/16] border border-white/5"
                        style={{
                            animationDelay: `${i * 100}ms`,
                        }}
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary/40 to-secondary/20" />
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"
                            style={{
                                animationDuration: '1.5s',
                                animationIterationCount: 'infinite',
                                animationTimingFunction: 'ease-in-out',
                            }}
                        />

                        {/* Bottom Content Placeholder */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                            <div className="w-16 h-5 rounded-lg bg-white/10 animate-pulse" />
                            <div className="w-full h-4 rounded-md bg-white/10 animate-pulse" />
                            <div className="w-2/3 h-4 rounded-md bg-white/8 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShortsGridSkeleton;
