import React from 'react';
import StatCard from '@/components/dashboard/core/StatCard';
import { Users, Star, Gift, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FanStats() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 sm:grid-cols-3"
        >
            <StatCard
                className="bg-primary/5 hover:bg-primary/10 transition-colors border-primary/20 shadow-lg shadow-primary/5"
                title="Total Subscribers"
                value="1,248"
                icon={Users}
                iconClassName="text-primary"
                description={
                    <span className="text-green-500 flex items-center font-bold">
                        <TrendingUp className="w-3 h-3 mr-1" /> +48 this week
                    </span>
                }
            />
            <StatCard
                title="Active VIPs"
                value="156"
                icon={Star}
                iconClassName="text-yellow-500"
                description="Top tier members"
            />
            <StatCard
                title="Gifts Received"
                value="342"
                icon={Gift}
                iconClassName="text-pink-500"
                description="From 89 distinct fans"
            />
        </motion.div>
    );
}
