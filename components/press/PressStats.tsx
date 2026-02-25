'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Film, CalendarDays, type LucideIcon } from 'lucide-react';

interface StatItem {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
}

const stats: StatItem[] = [
    { label: 'Active Users', value: '10M+', icon: Users, color: 'from-blue-500 to-cyan-400' },
    { label: 'Countries', value: '150+', icon: Globe, color: 'from-emerald-500 to-green-400' },
    { label: 'Videos', value: '500K+', icon: Film, color: 'from-primary to-rose-400' },
    { label: 'Founded', value: '2023', icon: CalendarDays, color: 'from-amber-500 to-yellow-400' },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export const PressStats = () => {
    return (
        <section className="py-16 border-y border-border/50 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            {...fadeInUp}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative text-center p-6 rounded-2xl border border-border/30 bg-card/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 space-y-3">
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
