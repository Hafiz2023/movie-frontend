import React from 'react';
import { Tag } from 'lucide-react';
import Link from 'next/link';

interface TagCardProps {
    name: string;
    videoCount: number;
    trending?: boolean;
}

export default function TagCard({ name, videoCount, trending }: TagCardProps) {
    return (
        <Link href={`/?tag=${name}`} className="block group">
            <div className="bg-card/30 rounded-xl p-4 sm:p-5 border border-white/5 group-hover:bg-card/60 group-hover:border-primary/40 transition-all flex items-center justify-between group-hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${trending ? 'bg-primary/20 text-primary' : 'bg-secondary/40 text-muted-foreground'} group-hover:text-primary transition-colors`}>
                        <Tag className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white group-hover:text-primary transition-colors">{name}</span>
                </div>
                <span className="text-xs text-muted-foreground bg-black/20 px-2 py-1 rounded-full">
                    {videoCount.toLocaleString()}
                </span>
            </div>
        </Link>
    );
}
