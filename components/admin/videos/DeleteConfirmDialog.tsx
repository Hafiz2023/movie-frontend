'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    onDelete: () => void;
    isLoading: boolean;
}

export default function DeleteConfirmDialog({ isOpen, onOpenChange, title, onDelete, isLoading }: DeleteConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-border/50">
                <div className="h-1 bg-gradient-to-r from-destructive via-red-500 to-orange-500" />
                <div className="p-4 sm:p-6">
                    <DialogHeader className="flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 border border-destructive/20">
                            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                        </div>
                        <div className="text-left">
                            <DialogTitle className="text-base sm:text-lg">Delete Video</DialogTitle>
                            <DialogDescription className="mt-2 leading-relaxed">
                                This action <span className="font-semibold text-destructive">cannot be undone</span>.
                                This will permanently delete the video
                                <span className="font-semibold text-foreground"> &quot;{title}&quot;</span> and remove all associated data.
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <div className="mt-5 p-3 rounded-lg bg-destructive/5 border border-destructive/10 flex items-start gap-2.5">
                        <AlertTriangle className="h-4 w-4 text-destructive/70 mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            All views, likes, and comments associated with this video will be permanently removed. This action is irreversible.
                        </p>
                    </div>

                    <DialogFooter className="mt-4 sm:mt-6 gap-2 flex-col-reverse sm:flex-row">
                        <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading} className="hover:bg-muted/50 transition-all w-full sm:w-auto">Cancel</Button>
                        <Button variant="destructive" onClick={onDelete} disabled={isLoading} className="gap-2 shadow-md shadow-destructive/20 hover:shadow-lg hover:shadow-destructive/30 transition-all duration-200 disabled:shadow-none w-full sm:w-auto">
                            {isLoading ? (<><Loader2 className="h-4 w-4 animate-spin" />Deleting...</>) : (<><Trash2 className="h-4 w-4" />Delete Video</>)}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
