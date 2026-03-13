import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

export interface VideoItem {
    id: number;
    title: string;
    status: string;
    date: string;
    views: number;
}

export interface VideoListProps {
    videos: VideoItem[];
    onEdit: (video: VideoItem) => void;
    onDelete: (id: number) => void;
}

export default function VideoList({ videos, onEdit, onDelete }: VideoListProps) {
    return (
        <div className="rounded-md border border-border bg-card">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border font-medium text-muted-foreground text-sm">
                <div className="col-span-6">Video</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Views</div>
                <div className="col-span-2 text-right">Actions</div>
            </div>
            <div className="divide-y divide-border/50">
                {videos.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No videos uploaded yet. Start creating!</div>
                ) : (
                    videos.map((video) => (
                        <div key={video.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-secondary/20 transition-colors">
                            <div className="col-span-6 flex gap-4">
                                <div className="min-w-0">
                                    <p className="font-semibold truncate">{video.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${video.status === 'Published' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                            {video.status}
                                        </span>
                                        <span className="text-xs text-muted-foreground truncate hidden sm:block">ID: {video.id}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 text-sm text-muted-foreground">{video.date}</div>
                            <div className="col-span-2 text-sm font-medium">{video.views.toLocaleString()}</div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" onClick={() => onEdit(video)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete(video.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
