import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SubscriberList() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-white/10 shadow-lg bg-card/40 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 group-hover:bg-yellow-500/10" />
                <CardHeader className="border-b border-white/5 pb-4 relative z-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-xl">Subscriber List</CardTitle>
                        <Input className="w-full sm:w-64 h-10 bg-background/50 border-white/10 focus:ring-yellow-500/50" placeholder="Search fans by name..." />
                    </div>
                </CardHeader>
                <CardContent className="pt-6 relative z-10">
                    <div className="space-y-4">
                        {[
                            { id: 1, name: 'Alex Hunter', tier: 'VIP Gold', months: 6, avatar: '11', spend: '$450' },
                            { id: 2, name: 'Sammie99', tier: 'Standard', months: 2, avatar: '12', spend: '$30' },
                            { id: 3, name: 'TheBigBoss', tier: 'VIP Bronze', months: 12, avatar: '13', spend: '$1,200' },
                            { id: 4, name: 'NightOwl', tier: 'Standard', months: 1, avatar: '14', spend: '$15' },
                            { id: 5, name: 'CoolGuy23', tier: 'VIP Gold', months: 8, avatar: '15', spend: '$600' },
                        ].map((fan, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.1) }}
                                key={fan.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 hover:bg-secondary/40 border border-transparent hover:border-white/10 transition-all group/item shadow-sm"
                            >
                                <div className="flex gap-4 items-center">
                                    <Avatar className="w-12 h-12 border border-white/10 group-hover/item:border-primary/50 transition-colors">
                                        <AvatarImage src={`https://avatar.vercel.sh/${fan.avatar}.png`} />
                                        <AvatarFallback>{fan.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-sm text-foreground flex items-center gap-2 group-hover/item:text-primary transition-colors">
                                            {fan.name}
                                            {fan.tier.includes('VIP') && <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">Subscribed for {fan.months} months</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <div className="text-sm font-bold text-primary">{fan.spend}</div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Spend</div>
                                    </div>
                                    <span className={`text-xs px-3 py-1 font-bold rounded-full border shadow-inner ${fan.tier.includes('Gold') ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : fan.tier.includes('Bronze') ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-white/5 text-muted-foreground border-white/10'}`}>
                                        {fan.tier}
                                    </span>
                                    <Button variant="ghost" size="icon" className="hover:bg-white/10 hover:text-white transition-colors">
                                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
