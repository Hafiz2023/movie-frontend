import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function RecentPayouts() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-white/5 bg-card/40 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 group-hover:bg-green-500/10" />
                <CardHeader className="relative z-10">
                    <CardTitle className="text-xl">Recent Payouts</CardTitle>
                    <CardDescription>Your last 5 withdrawal summaries.</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="space-y-4">
                        {[
                            { id: '1', date: 'Oct 01, 2024', amount: '$2,100.00', status: 'Completed', method: 'Bank Transfer' },
                            { id: '2', date: 'Sep 01, 2024', amount: '$1,850.50', status: 'Completed', method: 'PayPal' },
                            { id: '3', date: 'Aug 01, 2024', amount: '$1,420.00', status: 'Completed', method: 'Crypto (BTC)' },
                        ].map((payout, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.1) }}
                                key={payout.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-white/5 hover:border-white/20 hover:bg-secondary/50 transition-all shadow-sm"
                            >
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 font-bold border border-green-500/20">
                                        $
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-foreground">{payout.method}</h4>
                                        <p className="text-xs text-muted-foreground">{payout.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-foreground text-lg">{payout.amount}</div>
                                    <div className="text-xs font-bold text-green-400 bg-green-500/10 inline-block px-2 py-0.5 rounded-full mt-1">
                                        {payout.status}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
