import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrafficSourcesChart() {
    return (
        <Card className="h-96 relative overflow-hidden bg-card/50 border-white/10 group transition-colors hover:border-white/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 group-hover:bg-secondary/10" />
            <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <BarChart3 className="w-5 h-5 text-secondary-foreground" /> Traffic Sources
                </CardTitle>
            </CardHeader>
            <CardContent className="h-full relative font-mono text-center pt-24 z-10">
                {/* Mock Chart Visual */}
                <div className="absolute bottom-4 left-4 right-4 h-48 border-b border-l border-white/20 flex flex-col justify-end px-2 group-hover:bg-white/[0.02] transition-colors space-y-4 pb-4">
                    <div className="w-full flex items-center gap-3 text-sm font-semibold">
                        <span className="w-16 text-right text-muted-foreground group-hover:text-foreground transition-colors">Search</span>
                        <div className="flex-1 bg-white/5 h-8 rounded-r-md overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1 }}
                                className="h-full bg-blue-500/50 group-hover:bg-blue-500/80 transition-all duration-300 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]"
                            />
                        </div>
                        <span className="w-12 text-left">60%</span>
                    </div>
                    <div className="w-full flex items-center gap-3 text-sm font-semibold">
                        <span className="w-16 text-right text-muted-foreground group-hover:text-foreground transition-colors">Direct</span>
                        <div className="flex-1 bg-white/5 h-8 rounded-r-md overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 1, delay: 0.1 }}
                                className="h-full bg-purple-500/50 group-hover:bg-purple-500/80 transition-all duration-300 shadow-[inset_0_0_10px_rgba(168,85,247,0.2)]"
                            />
                        </div>
                        <span className="w-12 text-left">25%</span>
                    </div>
                    <div className="w-full flex items-center gap-3 text-sm font-semibold">
                        <span className="w-16 text-right text-muted-foreground group-hover:text-foreground transition-colors">Social</span>
                        <div className="flex-1 bg-white/5 h-8 rounded-r-md overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }} animate={{ width: '15%' }} transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-green-500/50 group-hover:bg-green-500/80 transition-all duration-300 shadow-[inset_0_0_10px_rgba(34,197,94,0.2)]"
                            />
                        </div>
                        <span className="w-12 text-left">15%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
