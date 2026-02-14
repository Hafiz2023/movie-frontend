
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Lock } from 'lucide-react';
import { LiveStream } from '@/types';

interface LiveStreamCardProps {
    stream: LiveStream;
    index: number;
    onSelect: (stream: LiveStream) => void;
}

export default function LiveStreamCard({ stream, index, onSelect }: LiveStreamCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]"
        >
            {/* Thumbnail */}
            <div className="aspect-[3/4] relative">
                <Image
                    src={stream.thumbnail}
                    alt={stream.user}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
                        LIVE
                    </span>
                    {stream.price > 0 && (
                        <span className="bg-black/60 backdrop-blur-md text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> PREMIUM
                        </span>
                    )}
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-bold text-white text-lg leading-tight mb-1">{stream.user}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                        <User className="w-3 h-3" /> {stream.viewers.toLocaleString()} viewers
                    </div>
                    <button
                        onClick={() => onSelect(stream)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 rounded text-sm transition-all transform active:scale-95 shadow-lg shadow-primary/20"
                    >
                        Join Room
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
