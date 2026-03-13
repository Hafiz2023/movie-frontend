import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_VIDEOS } from '@/utils/mockData';
import { motion } from 'framer-motion';

export default function RecommendedCarousel() {
    return (
        <Card className="col-span-1 lg:col-span-3 bg-card/40 border-white/5 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 group-hover:bg-secondary/10" />
            <CardHeader className="relative z-10">
                <CardTitle className="text-xl font-bold">Recommended</CardTitle>
                <CardDescription>Based on your recent history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
                {MOCK_VIDEOS.slice(0, 3).map((video, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={video.id}
                        className="flex items-center gap-3 group/item cursor-pointer hover:bg-secondary/50 p-2 rounded-lg transition-colors border border-transparent hover:border-white/5"
                    >
                        <div className="h-16 w-28 rounded-md overflow-hidden bg-muted relative border border-white/5 group-hover/item:border-primary/50 transition-colors">
                            <Image
                                src={video.thumbnail_url}
                                alt={video.title}
                                fill
                                className="object-cover group-hover/item:scale-105 transition-transform duration-500"
                                sizes="112px"
                                unoptimized
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold leading-none truncate group-hover/item:text-primary transition-colors text-foreground">{video.title}</p>
                            <p className="text-xs text-muted-foreground mt-1.5">{video.author}</p>
                        </div>
                    </motion.div>
                ))}
            </CardContent>
        </Card>
    );
}
