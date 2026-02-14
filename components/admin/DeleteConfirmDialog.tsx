
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    onDelete: () => void;
    isLoading: boolean;
}

export default function DeleteConfirmDialog({
    isOpen,
    onOpenChange,
    title,
    onDelete,
    isLoading
}: DeleteConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the video
                        <span className="font-semibold text-foreground"> {title}</span>.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
                        {isLoading ? 'Deleting...' : 'Delete Video'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
