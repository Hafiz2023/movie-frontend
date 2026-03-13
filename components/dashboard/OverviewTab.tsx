import React from 'react';
import { OverviewStats, RecentActivity, RecommendedCarousel } from './overview';

export default function OverviewTab() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <OverviewStats />

            {/* Recent Activity & Recommended (Mock) */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <RecentActivity />
                <RecommendedCarousel />
            </div>
        </div>
    );
}
