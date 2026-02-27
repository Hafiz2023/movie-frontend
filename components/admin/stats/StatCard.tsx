'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimatedCount } from './useAnimatedCount';

export interface StatCardData {
    label: string;
    value: number;
    icon: React.ElementType;
    change: number;
    changeLabel: string;
    gradient: string;
    iconBg: string;
    shadowColor: string;
}

interface StatCardProps {
    data: StatCardData;
    index: number;
}

export default function StatCard({ data, index }: StatCardProps) {
    const animatedValue = useAnimatedCount(data.value);
    const isPositive = data.change >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
            whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.2 },
            }}
            className="group"
        >
            <Card className={`relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:border-border transition-all duration-300 hover:shadow-lg ${data.shadowColor}`}>
                {/* Gradient accent on top */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${data.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                    }}
                />

                <CardContent className="p-4 sm:p-5 relative">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl ${data.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                            <data.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 rounded-lg hover:bg-muted/50">
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {data.label}
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums">
                            {animatedValue.toLocaleString()}
                        </p>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5">
                        <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md ${isPositive
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                            }`}>
                            {isPositive ? (
                                <TrendingUp className="h-3 w-3" />
                            ) : (
                                <TrendingDown className="h-3 w-3" />
                            )}
                            {isPositive ? '+' : ''}{data.change}%
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                            {data.changeLabel}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
