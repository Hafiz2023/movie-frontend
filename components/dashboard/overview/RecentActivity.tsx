import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

export default function RecentActivity() {
    return (
        <Card className="col-span-1 lg:col-span-4 bg-card/40 border-white/5 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 group-hover:bg-primary/10" />
            <CardHeader className="relative z-10">
                <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                <CardDescription>You watched 4 hours of content today.</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="space-y-6">
                    {[1, 2, 3].map((i, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={i}
                            className="flex items-center p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                        >
                            <Avatar className="h-10 w-10 border border-white/10 group-hover/item:border-primary/50 transition-colors">
                                <AvatarImage src={`https://avatar.vercel.sh/${i}.png`} alt="Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-bold leading-none text-foreground group-hover/item:text-primary transition-colors">Watched Cinematic Masterpiece</p>
                                <p className="text-xs text-muted-foreground">
                                    Category: Action • {i + 1} hours ago
                                </p>
                            </div>
                            <div className="ml-auto font-bold text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">+10pts</div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
