'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PressReleaseCard, type PressRelease } from './PressReleaseCard';

const pressReleases: PressRelease[] = [
    {
        date: 'January 15, 2026',
        title: 'MovieApp Reaches 10 Million Active Users Globally',
        excerpt:
            'We are proud to announce a major milestone in our journey — 10 million active users and counting. This achievement reflects our commitment to providing the best streaming experience.',
        category: 'Milestone',
    },
    {
        date: 'December 3, 2025',
        title: 'MovieApp Launches Creator Monetization Program',
        excerpt:
            'Content creators can now earn revenue directly through our new Creator Monetization Program, empowering artists to monetize their work independently.',
        category: 'Product',
    },
    {
        date: 'October 20, 2025',
        title: 'Introducing 4K Ultra HD Streaming',
        excerpt:
            'Experience cinema-quality streaming with our new 4K Ultra HD playback support across all devices. The future of entertainment starts here.',
        category: 'Technology',
    },
    {
        date: 'August 8, 2025',
        title: 'MovieApp Partners with Leading Studios for Exclusive Content',
        excerpt:
            'We have secured partnerships with top studios to bring you exclusive, never-before-seen content, creating a premium entertainment destination.',
        category: 'Partnership',
    },
    {
        date: 'June 15, 2025',
        title: 'Expanding to 50 New Markets Across Asia and Europe',
        excerpt:
            'MovieApp is going global. Our platform is now available in 50 new markets, bringing world-class entertainment to millions more users.',
        category: 'Expansion',
    },
    {
        date: 'April 2, 2025',
        title: 'New AI-Powered Content Recommendations Engine',
        excerpt:
            'Our new machine learning recommendation engine delivers highly personalized content suggestions tailored to each viewer\'s unique preferences.',
        category: 'Technology',
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export const PressReleaseList = () => {
    return (
        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div {...fadeInUp} className="text-center mb-14">
                    <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">
                        Latest Updates
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        Press Releases
                    </h2>
                </motion.div>

                <div className="space-y-5">
                    {pressReleases.map((release, index) => (
                        <PressReleaseCard
                            key={release.title}
                            release={release}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
