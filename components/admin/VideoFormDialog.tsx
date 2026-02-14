import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AdminVideo, VideoFormData } from '@/types';

interface VideoFormDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    currentVideo: AdminVideo | null;
    formData: VideoFormData;
    setFormData: (data: VideoFormData) => void;
    onSave: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export default function VideoFormDialog({
    isOpen,
    onOpenChange,
    currentVideo,
    formData,
    setFormData,
    onSave,
    isLoading
}: VideoFormDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{currentVideo ? 'Edit Video' : 'Upload New Video'}</DialogTitle>
                    <DialogDescription>
                        {currentVideo ? 'Make changes to your video details here.' : 'Add a new video to your collection.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSave} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                        <Input
                            id="thumbnail_url"
                            value={formData.thumbnail_url}
                            onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                            placeholder="https://"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="video_url">Video URL</Label>
                        <Input
                            id="video_url"
                            value={formData.video_url}
                            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                            placeholder="https://"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
