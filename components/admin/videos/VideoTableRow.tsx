'use client';

import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AdminVideo } from '@/types';

interface VideoTableRowProps {
    video: AdminVideo;
    index: number;
    onEdit: (video: AdminVideo) => void;
    onDelete: (video: AdminVideo) => void;
}

export default function VideoTableRow({ video, index, onEdit, onDelete }: VideoTableRowProps) {
    return (
        <motion.tr
            key={video.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: index * 0.05 }}
            className="group hover:bg-muted/40 transition-colors duration-200"
        >
            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-3.5 font-medium text-foreground">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative w-10 h-7 sm:w-12 sm:h-8 md:w-14 md:h-9 bg-muted rounded-md sm:rounded-lg overflow-hidden border border-border/30 shrink-0 group-hover:border-primary/30 transition-colors">
                        <Image
                            src={video.thumbnail_url}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Eye className="h-3.5 w-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                    <div className="min-w-0">
                        <span className="line-clamp-1 text-sm font-medium">{video.title}</span>
                        <span className="text-[11px] text-muted-foreground md:hidden block">
                            {video.category}
                        </span>
                    </div>
                </div>
            </td>
            <td className="px-4 sm:px-6 py-3.5 hidden md:table-cell">
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-medium border border-primary/15">
                    {video.category}
                </span>
            </td>
            <td className="px-4 sm:px-6 py-3.5 hidden sm:table-cell">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="text-sm font-medium tabular-nums">
                        {typeof video.views === 'number' ? video.views.toLocaleString() : video.views}
                    </span>
                </div>
            </td>
            <td className="px-4 sm:px-6 py-3.5 hidden lg:table-cell">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-600 dark:text-emerald-400">Published</span>
                </span>
            </td>
            <td className="px-4 sm:px-6 py-3.5 text-right">
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(video)}
                        className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-500 transition-all duration-200"
                        title="Edit video"
                    >
                        <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(video)}
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                        title="Delete video"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </td>
        </motion.tr>
    );
}
