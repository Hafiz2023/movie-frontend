'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Link2, Type, Tag, Loader2, CheckCircle } from 'lucide-react';
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

const formFields = [
    { id: 'title', label: 'Title', icon: Type, placeholder: 'Enter video title', required: true, key: 'title' as keyof VideoFormData },
    { id: 'category', label: 'Category', icon: Tag, placeholder: 'e.g. Action, Comedy, Drama', required: true, key: 'category' as keyof VideoFormData },
    { id: 'thumbnail_url', label: 'Thumbnail URL', icon: ImageIcon, placeholder: 'https://example.com/thumbnail.jpg', required: true, key: 'thumbnail_url' as keyof VideoFormData },
    { id: 'video_url', label: 'Video URL', icon: Link2, placeholder: 'https://example.com/video.mp4', required: false, key: 'video_url' as keyof VideoFormData },
];

export default function VideoFormDialog({
    isOpen, onOpenChange, currentVideo, formData, setFormData, onSave, isLoading,
}: VideoFormDialogProps) {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const isEdit = !!currentVideo;

    const filledCount = formFields.filter(f => formData[f.key]?.trim()).length;
    const requiredFields = formFields.filter(f => f.required);
    const requiredFilled = requiredFields.filter(f => formData[f.key]?.trim()).length;
    const isFormValid = requiredFilled === requiredFields.length;
    const progressPercent = Math.round((filledCount / formFields.length) * 100);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-border/50 max-h-[90vh] sm:max-h-[85vh] flex flex-col">
                <div className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                    <DialogHeader className="relative">
                        <div className="flex items-center gap-3 mb-1">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm ${isEdit
                                ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20'
                                : 'bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20'
                                }`}>
                                {isEdit ? <Type className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" /> : <Link2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
                            </div>
                            <div>
                                <DialogTitle className="text-base sm:text-lg">{isEdit ? 'Edit Video' : 'Upload New Video'}</DialogTitle>
                                <DialogDescription className="text-xs mt-0.5">
                                    {isEdit ? 'Update the details for this video.' : 'Add a new video to your collection.'}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="mt-4 relative">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Completion</span>
                            <span className="text-[10px] font-semibold text-muted-foreground">{progressPercent}%</span>
                        </div>
                        <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                <form onSubmit={onSave} className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
                    {formFields.map(field => {
                        const isFocused = focusedField === field.id;
                        const hasValue = !!formData[field.key]?.trim();
                        return (
                            <div key={field.id} className="space-y-1.5">
                                <Label
                                    htmlFor={field.id}
                                    className={`text-xs font-medium flex items-center gap-1.5 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                    <field.icon className="h-3.5 w-3.5" />
                                    {field.label}
                                    {field.required && <span className="text-destructive">*</span>}
                                    {hasValue && <CheckCircle className="h-3 w-3 text-emerald-500 ml-auto" />}
                                </Label>
                                <Input
                                    id={field.id}
                                    value={formData[field.key]}
                                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                                    onFocus={() => setFocusedField(field.id)}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    className={`bg-muted/30 border-border/50 transition-all duration-200 ${isFocused ? 'ring-2 ring-primary/20 border-primary/50' : hasValue ? 'border-emerald-500/30' : ''
                                        }`}
                                />
                            </div>
                        );
                    })}

                    {formData.thumbnail_url && (
                        <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/20 p-2">
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium mb-2">Preview</p>
                            <div className="relative w-full h-24 sm:h-32 rounded-md overflow-hidden bg-muted">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={formData.thumbnail_url} alt="Thumbnail preview" className="w-full h-full object-cover"
                                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter className="pt-2 gap-2 flex-col-reverse sm:flex-row">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="hover:bg-muted/50 transition-all w-full sm:w-auto">Cancel</Button>
                        <Button type="submit" disabled={isLoading || !isFormValid} className="gap-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 disabled:shadow-none w-full sm:w-auto">
                            {isLoading ? (<><Loader2 className="h-4 w-4 animate-spin" />Saving...</>) : (<><CheckCircle className="h-4 w-4" />{isEdit ? 'Save Changes' : 'Upload Video'}</>)}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
