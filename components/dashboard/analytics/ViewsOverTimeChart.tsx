import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ViewsOverTimeChart() {
    return (
        <Card className="h-96 relative overflow-hidden bg-card/50 border-white/10 group transition-colors hover:border-white/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 group-hover:bg-primary/10" />
            <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <LineChart className="w-5 h-5 text-primary" /> Views Over Time
                </CardTitle>
            </CardHeader>
            <CardContent className="h-full relative font-mono text-center pt-24 z-10">
                {/* Mock Chart Visual with Framer Motion */}
                <div className="absolute bottom-4 left-4 right-4 h-48 border-b border-l border-white/20 flex items-end justify-between px-2 group-hover:bg-white/[0.02] transition-colors overflow-hidden">
                    {[40, 60, 45, 80, 50, 90, 100, 75, 85, 95].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className="w-[8%] bg-primary/40 rounded-t-sm group-hover:bg-primary/80 transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
