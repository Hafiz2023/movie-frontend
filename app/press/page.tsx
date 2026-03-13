'use client';

/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Press" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */


import React from 'react';
import {
    PressHero,
    PressStats,
    PressReleaseList,
    MediaCoverage,
    BrandAssets,
    PressFAQ,
    MediaContact,
} from '@/components/press';

export default function PressPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <PressHero />

            {/* Key Stats */}
            <PressStats />

            {/* Press Releases */}
            <PressReleaseList />

            {/* Media Coverage / In the News */}
            <MediaCoverage />

            {/* Brand & Media Kit Downloads */}
            <BrandAssets />

            {/* Press FAQ */}
            <PressFAQ />

            {/* Media Contact CTA */}
            <MediaContact />
        </div>
    );
}
