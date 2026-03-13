import React from 'react';
import StatCard from '@/components/dashboard/core/StatCard';
import { Eye, TrendingUp, MousePointerClick, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsStats() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
            <StatCard
                className="hover:border-primary/50 cursor-pointer bg-primary/5 shadow-lg shadow-primary/5"
                title="Total Views (28 days)"
                value="148.2K"
                icon={Eye}
                iconClassName="text-primary"
                description={
                    <span className="text-green-500 flex items-center font-bold">
                        <TrendingUp className="w-3 h-3 mr-1" /> +24% vs last 28 days
                    </span>
                }
            />
            <StatCard
                title="Click-Through Rate"
                value="6.8%"
                icon={MousePointerClick}
                description="Avg. across all videos"
            />
            <StatCard
                title="Avg. View Duration"
                value="4m 12s"
                icon={Clock}
                description={
                    <span className="text-green-500 flex items-center font-bold">
                        <TrendingUp className="w-3 h-3 mr-1" /> Target: 3m 45s
                    </span>
                }
            />
        </motion.div>
    );
}
