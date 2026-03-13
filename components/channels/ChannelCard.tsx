import React from 'react';
import { motion } from 'framer-motion';
import { Film, Users, Play, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ChannelCardProps {
    channel: {
        id: number;
        name: string;
        avatar: string;
        banner: string;
        subscribers: string;
        videos: number;
        isVerified?: boolean;
    };
    index: number;
}

export default function ChannelCard({ channel, index }: ChannelCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group block relative overflow-hidden bg-card rounded-2xl border border-white/5 hover:border-primary/50 transition-colors"
        >
            <Link href={`/channels/${channel.id}`} className="absolute inset-0 z-10" />

            {/* Banner Image */}
            <div className="relative h-24 sm:h-32 w-full overflow-hidden">
                <Image
                    src={channel.banner}
                    alt={channel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Content Info */}
            <div className="px-4 pb-4 pt-2 -mt-10 relative z-20 flex flex-col items-center">
                {/* Avatar */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-card relative overflow-hidden bg-background">
                    <Image
                        src={channel.avatar}
                        alt={channel.name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mt-2 flex items-center gap-1">
                    {channel.name}
                    {channel.isVerified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                </h3>

                <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {channel.subscribers}</span>
                    <span className="flex items-center gap-1.5"><Film className="w-4 h-4" /> {channel.videos} vids</span>
                </div>

                <div className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-bold bg-secondary/50 py-2 rounded-lg text-white group-hover:bg-primary transition-colors">
                    <Play className="w-4 h-4" /> Browse Content
                </div>
            </div>
        </motion.div>
    );
}
