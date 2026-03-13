import React, { useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UploadForm() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="bg-card/50 rounded-2xl p-6 sm:p-8 border border-white/5 space-y-8">
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Upload New Content</h2>
                <p className="text-muted-foreground text-sm">Share your videos with the community.</p>
            </div>

            <div
                className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all ${dragActive ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-primary/50'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleChange}
                    accept="video/*"
                />
                <div className="flex flex-col items-center gap-4 pointer-events-none">
                    {file ? (
                        <>
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <div>
                                <p className="font-bold text-white">{file.name}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center">
                                <UploadCloud className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <p className="font-bold text-white mb-1">Drag & Drop your video here</p>
                                <p className="text-sm text-muted-foreground">or click to browse from your device</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Video Title</Label>
                    <Input id="title" placeholder="Enter a catchy title..." className="bg-background" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="desc">Description</Label>
                    <textarea
                        id="desc"
                        className="w-full flex min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell viewers what your video is about..."
                    ></textarea>
                </div>
                <Button className="w-full sm:w-auto mt-4 px-8" disabled={!file}>
                    Start Upload
                </Button>
            </div>
        </div>
    );
}
