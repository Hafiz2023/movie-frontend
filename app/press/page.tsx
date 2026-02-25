'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Mail, Download, ExternalLink, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const pressReleases = [
    {
        date: 'January 15, 2026',
        title: 'MovieApp Reaches 10 Million Active Users Globally',
        excerpt: 'We are proud to announce a major milestone in our journey — 10 million active users and counting.',
    },
    {
        date: 'December 3, 2025',
        title: 'MovieApp Launches Creator Monetization Program',
        excerpt: 'Content creators can now earn revenue directly through our new Creator Monetization Program.',
    },
    {
        date: 'October 20, 2025',
        title: 'Introducing 4K Ultra HD Streaming',
        excerpt: 'Experience cinema-quality streaming with our new 4K Ultra HD playback support across all devices.',
    },
    {
        date: 'August 8, 2025',
        title: 'MovieApp Partners with Leading Studios for Exclusive Content',
        excerpt: 'We have secured partnerships with top studios to bring you exclusive, never-before-seen content.',
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export default function PressPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                            <Newspaper className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">Press & Media</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                            Press Center
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Stay updated with the latest news, press releases, and media resources from MovieApp.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-y border-border/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: 'Active Users', value: '10M+', icon: Users },
                            { label: 'Countries', value: '150+', icon: ExternalLink },
                            { label: 'Videos', value: '500K+', icon: Download },
                            { label: 'Founded', value: '2023', icon: Calendar },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                {...fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-2"
                            >
                                <stat.icon className="w-6 h-6 text-primary mx-auto" />
                                <p className="text-3xl md:text-4xl font-black text-foreground">{stat.value}</p>
                                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Press Releases */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.h2
                        {...fadeInUp}
                        className="text-3xl md:text-4xl font-bold mb-12 text-center"
                    >
                        Latest Press Releases
                    </motion.h2>

                    <div className="space-y-6">
                        {pressReleases.map((release, index) => (
                            <motion.div
                                key={index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="group p-6 md:p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                            >
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                    <Calendar className="w-4 h-4" />
                                    {release.date}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                                    {release.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {release.excerpt}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Media Contact */}
            <section className="py-20 bg-card border-t border-border/50">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <motion.div {...fadeInUp}>
                        <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            For press inquiries, interview requests, or media kits, please reach out to our press team. We typically respond within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="gap-2 font-bold">
                                    <Mail className="w-4 h-4" />
                                    Contact Press Team
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="gap-2">
                                <Download className="w-4 h-4" />
                                Download Media Kit
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
