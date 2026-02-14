import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { AdminVideo } from '@/types';

interface VideoTableProps {
    videos: AdminVideo[];
    onEdit: (video: AdminVideo) => void;
    onDelete: (video: AdminVideo) => void;
}

export default function VideoTable({ videos, onEdit, onDelete }: VideoTableProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Videos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-left text-sm text-foreground">
                        <thead className="bg-secondary/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium">Title</th>
                                <th scope="col" className="px-6 py-4 font-medium hidden md:table-cell">Category</th>
                                <th scope="col" className="px-6 py-4 font-medium hidden sm:table-cell">Views</th>
                                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {videos.map((video) => (
                                <tr key={video.id} className="hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-6 bg-slate-800 rounded overflow-hidden hidden sm:block relative">
                                                <Image src={video.thumbnail_url} alt="" fill className="object-cover" />
                                            </div>
                                            <span className="line-clamp-1">{video.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                                            {video.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell text-muted-foreground">
                                        {video.views.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => onEdit(video)} className="h-8 w-8 hover:text-blue-500">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => onDelete(video)} className="h-8 w-8 hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
