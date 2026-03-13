import React from 'react';
import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EarningsStats, RecentPayouts } from './earnings';
import { motion } from 'framer-motion';

export default function EarningsTab() {
    return (
        <div className="space-y-8 pb-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/40 p-6 rounded-2xl border border-border/50 backdrop-blur-md relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
                        <DollarSign className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-green-500/70">Monetization</h2>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            Earnings & Payouts
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                            Track your content monetization and manage payouts securely.
                        </p>
                    </div>
                </div>
                <Button className="gap-2 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:bg-green-600 bg-green-500 text-white transition-all font-semibold relative z-10">
                    <DollarSign className="w-4 h-4" />
                    Request Payout
                </Button>
            </motion.div>

            <EarningsStats />
            <RecentPayouts />
        </div>
    );
}
