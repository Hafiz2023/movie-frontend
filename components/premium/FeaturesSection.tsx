'use client';
import React from 'react';
import { Zap, Shield, Lock } from 'lucide-react';

export const FeaturesSection = () => {
    return (
        <div className="bg-[#111] py-24 border-y border-[#222]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 mb-6 border border-blue-500/30">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                        <p className="text-gray-400 max-w-sm">Optimized global CDN ensures buffer-free streaming anywhere in the world.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center text-primary mb-6 border border-primary/30">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
                        <p className="text-gray-400 max-w-sm">Your data is encrypted. Anonymous billing options available for VIP members.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-green-400 mb-6 border border-green-500/30">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Exclusive Access</h3>
                        <p className="text-gray-400 max-w-sm">Get early access to new releases and member-only behind the scenes content.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
