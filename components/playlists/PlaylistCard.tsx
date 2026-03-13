import React from 'react';
import { motion } from 'framer-motion';
import { ListVideo, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PlaylistCardProps {
    playlist: {
        id: number;
        title: string;
        thumbnail: string;
        videoCount: number;
        author: string;
        updatedAt: string;
    };
    index: number;
}

export default function PlaylistCard({ playlist, index }: PlaylistCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative cursor-pointer"
        >
            <Link href={`/playlists/${playlist.id}`} className="absolute inset-0 z-10" />

            {/* Thumbnail Stack Effect */}
            <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-muted">
                {/* Back layers for stacked effect */}
                <div className="absolute inset-x-4 -top-2 h-full bg-secondary/60 rounded-xl sm:rounded-2xl -z-20 transition-transform group-hover:-translate-y-1" />
                <div className="absolute inset-x-2 -top-1 h-full bg-secondary/80 rounded-xl sm:rounded-2xl -z-10 transition-transform group-hover:-translate-y-0.5" />

                <Image
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50"
                    unoptimized
                />

                {/* Video Count Badge overlay */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center border-l border-white/10 group-hover:w-full group-hover:bg-primary/80 transition-all duration-300">
                    <ListVideo className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2" />
                    <span className="text-white font-bold text-sm sm:text-base">{playlist.videoCount}</span>
                    <span className="text-white/80 text-[10px] sm:text-xs uppercase tracking-widest mt-1">Videos</span>
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 p-4 rounded-full backdrop-blur-md border border-white/20 transform scale-50 group-hover:scale-100 transition-all duration-300 delay-100">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-3 px-1">
                <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 group-hover:text-primary transition-colors">
                    {playlist.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-[10px] sm:text-xs text-muted-foreground">
                    <span className="hover:text-white transition-colors relative z-20">by {playlist.author}</span>
                    <span>•</span>
                    <span>Updated {playlist.updatedAt}</span>
                </div>
            </div>
        </motion.div>
    );
}
