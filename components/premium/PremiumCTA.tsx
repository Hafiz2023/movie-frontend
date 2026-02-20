'use client';
import React from 'react';

export const PremiumCTA = () => {
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="container mx-auto px-4 pb-20 text-center">
            <div className="bg-gradient-to-r from-[#222] via-[#1a1a1a] to-[#222] p-12 rounded-3xl border border-[#333] relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Join the fastest growing community today and unlock the full potential of your viewing experience.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-gray-200 transition-colors shadow-xl"
                    >
                        View Plans Again
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            </div>
        </div>
    );
};
