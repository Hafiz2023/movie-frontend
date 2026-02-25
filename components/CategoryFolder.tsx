'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Folder, Film } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryFolderProps {
    category: string;
    count: number;
    thumbnailUrl: string;
    onClick: () => void;
    isSelected?: boolean;
}

const CategoryFolder: React.FC<CategoryFolderProps> = ({
    category,
    count,
    thumbnailUrl,
    onClick,
    isSelected
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "cursor-pointer group relative overflow-hidden rounded-xl border border-white/10 bg-card shadow-lg hover:shadow-primary/20",
                isSelected ? "ring-2 ring-primary" : ""
            )}
        >
            {/* Thumbnail Section */}
            <div className="aspect-video relative overflow-hidden">
                {/* Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                <Image
                    src={thumbnailUrl}
                    alt={category}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />


                {/* Center Folder Icon/Play Hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300">
                    <div className="bg-primary/90 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Folder className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-3 sm:p-4 relative bg-card z-20">
                {/* Decorative colored line */}
                <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-primary to-transparent opacity-50" />

                <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">
                        {category}
                    </h3>
                    <Folder className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-gray-300 transition-colors">
                    <Film className="w-3 h-3" />
                    <span>{count} Videos</span>
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryFolder;
