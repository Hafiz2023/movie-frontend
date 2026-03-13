import React from 'react';
import { Camera } from 'lucide-react';
import Link from 'next/link';

interface StudioCardProps {
    id: string;
    name: string;
    videoCount: number;
}

export default function StudioCard({ id, name, videoCount }: StudioCardProps) {
    return (
        <Link href={`/studios/${id}`} className="block group">
            <div className="bg-card/50 rounded-xl p-6 border border-white/5 group-hover:border-primary/50 group-hover:bg-card/80 transition-all text-center group-hover:-translate-y-1">
                <div className="w-20 h-20 bg-secondary/50 group-hover:bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center transition-colors">
                    <Camera className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{videoCount.toLocaleString()} Videos</p>
            </div>
        </Link>
    );
}
