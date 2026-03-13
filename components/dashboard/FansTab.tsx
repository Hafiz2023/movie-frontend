import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Star } from 'lucide-react';
import { FanStats, SubscriberList } from './fans';
import { motion } from 'framer-motion';

export default function FansTab() {
    return (
        <div className="space-y-8 pb-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/40 p-6 rounded-2xl border border-border/50 backdrop-blur-md relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-pink-500/20 rounded-xl border border-pink-500/30">
                        <Users className="w-8 h-8 text-pink-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-pink-500/70">Community</h2>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            My Fans & Subscribers
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                            Manage your premium subscribers and interact with top fans.
                        </p>
                    </div>
                </div>
                <Button className="gap-2 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 hover:bg-yellow-600 bg-yellow-500 text-black transition-all font-bold relative z-10">
                    <Star className="w-4 h-4 fill-black text-black" />
                    Create Exclusive Post
                </Button>
            </motion.div>

            <FanStats />
            <SubscriberList />
        </div>
    );
}
