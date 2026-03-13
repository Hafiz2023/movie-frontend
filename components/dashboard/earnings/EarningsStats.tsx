import React from 'react';
import StatCard from '@/components/dashboard/core/StatCard';
import { DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EarningsStats() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
            <StatCard
                className="bg-gradient-to-br from-primary/20 to-card border-primary/20 shadow-lg shadow-primary/5"
                title="Available Balance"
                value="$4,231.89"
                icon={DollarSign}
                iconClassName="text-primary"
                description={<span className="text-primary/80 font-bold">+15% from last month</span>}
            />
            <StatCard
                title="Monthly Revenue"
                value="$1,245.50"
                icon={TrendingUp}
                description={
                    <span className="text-green-500 flex items-center font-bold">
                        <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5%
                    </span>
                }
            />
            <StatCard
                title="Ad Revenue"
                value="$342.10"
                icon={DollarSign}
                description={
                    <span className="text-green-500 flex items-center font-bold">
                        <ArrowUpRight className="w-3 h-3 mr-1" /> +8.2%
                    </span>
                }
            />
            <StatCard
                title="Tips / Gifts"
                value="$85.00"
                icon={DollarSign}
                description={
                    <span className="text-red-500 flex items-center font-bold">
                        <ArrowDownRight className="w-3 h-3 mr-1" /> -2.4%
                    </span>
                }
            />
        </motion.div>
    );
}
