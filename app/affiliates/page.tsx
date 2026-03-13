/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Affiliates" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */

import React from 'react';
import { DollarSign, BarChart, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AffiliatesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        Partner With <span className="text-primary">The Best</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join our industry-leading affiliate program and start earning up to 50% revenue share on all your referrals.
                    </p>
                    <div className="mt-8">
                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">
                            Join Now - It&apos;s Free
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-card/50 p-8 rounded-2xl border border-white/5 text-center">
                        <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <DollarSign className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">High Payouts</h3>
                        <p className="text-muted-foreground">
                            Earn lifetime revenue share. The more traffic you send, the higher your percentage goes.
                        </p>
                    </div>
                    <div className="bg-card/50 p-8 rounded-2xl border border-white/5 text-center">
                        <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BarChart className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Real-time Stats</h3>
                        <p className="text-muted-foreground">
                            Track your clicks, signups, and earnings in real-time with our advanced tracking dashboard.
                        </p>
                    </div>
                    <div className="bg-card/50 p-8 rounded-2xl border border-white/5 text-center">
                        <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Dedicated Support</h3>
                        <p className="text-muted-foreground">
                            Get an exclusive affiliate manager to help optimize your campaigns and maximize your ROI.
                        </p>
                    </div>
                </div>

                <div className="bg-card border border-white/5 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to start earning?</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Sign up in less than 2 minutes and get instant access to our banners, promo tools, and landing pages.
                    </p>
                    <Link href="/auth/register" className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 font-bold py-3 px-8 rounded-full transition-all">
                        Create Affiliate Account <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
