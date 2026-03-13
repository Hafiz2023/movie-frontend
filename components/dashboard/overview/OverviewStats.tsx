import React from 'react';
import { Play, Clock, Heart, Bell } from 'lucide-react';
import StatCard from '@/components/dashboard/core/StatCard';
import { motion } from 'framer-motion';

export default function OverviewStats() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
            <StatCard
                title="Videos Watched"
                icon={Play}
                value="124"
                description={<span className="text-muted-foreground">+12 this week</span>}
            />
            <StatCard
                title="Watch Time"
                icon={Clock}
                value="45h 20m"
                description={<span className="text-muted-foreground">+5h this week</span>}
            />
            <StatCard
                title="Liked Videos"
                icon={Heart}
                value="38"
                description={<span className="text-muted-foreground">+3 this week</span>}
            />
            <StatCard
                title="Comments"
                icon={Bell}
                value="156"
                description={<span className="text-muted-foreground">+24 new interactions</span>}
            />
        </motion.div>
    );
}
