'use client';

import React, { useCallback } from 'react';
import { Users, Video, MessageSquare, Mail } from 'lucide-react';
import StatCard, { type StatCardData } from './StatCard';

interface AdminStatsProps {
    usersCount: number;
    videosCount: number;
    postsCount: number;
    messagesCount: number;
}

export default function AdminStats({ usersCount, videosCount, postsCount, messagesCount }: AdminStatsProps) {
    const getStatsData = useCallback((): StatCardData[] => [
        {
            label: 'Total Users',
            value: usersCount,
            icon: Users,
            change: 20.1,
            changeLabel: 'from last month',
            gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
            iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
            shadowColor: 'hover:shadow-blue-500/10',
        },
        {
            label: 'Total Videos',
            value: videosCount,
            icon: Video,
            change: 12.5,
            changeLabel: 'updated now',
            gradient: 'bg-gradient-to-r from-violet-500 to-purple-500',
            iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
            shadowColor: 'hover:shadow-violet-500/10',
        },
        {
            label: 'Active Posts',
            value: postsCount,
            icon: MessageSquare,
            change: 5.2,
            changeLabel: '+5 today',
            gradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
            iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
            shadowColor: 'hover:shadow-amber-500/10',
        },
        {
            label: 'New Messages',
            value: messagesCount,
            icon: Mail,
            change: -2.3,
            changeLabel: 'from last week',
            gradient: 'bg-gradient-to-r from-emerald-500 to-teal-500',
            iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
            shadowColor: 'hover:shadow-emerald-500/10',
        },
    ], [usersCount, videosCount, postsCount, messagesCount]);

    const stats = getStatsData();

    return (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
                <StatCard key={stat.label} data={stat} index={index} />
            ))}
        </div>
    );
}
