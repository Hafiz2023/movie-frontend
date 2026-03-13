import React from 'react';
import { Eye } from 'lucide-react';
import AnalyticsStats from './analytics/AnalyticsStats';
import ViewsOverTimeChart from './analytics/ViewsOverTimeChart';
import TrafficSourcesChart from './analytics/TrafficSourcesChart';
import { motion } from 'framer-motion';

export default function AnalyticsTab() {
    return (
        <div className="space-y-8 pb-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/40 p-6 rounded-2xl border border-border/50 backdrop-blur-md relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl border border-primary/30">
                        <Eye className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-primary/70">Performance</h2>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            Channel Analytics
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                            Deep dive into your video performance and audience metrics.
                        </p>
                    </div>
                </div>
            </motion.div>

            <AnalyticsStats />

            <div className="grid gap-6 lg:grid-cols-2">
                <ViewsOverTimeChart />
                <TrafficSourcesChart />
            </div>
        </div>
    );
}
