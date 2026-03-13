'use client';

/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Upload" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */


import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { UploadCloud } from 'lucide-react';
import UploadForm from '@/components/upload/UploadForm';

export default function UploadPage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground relative">
            <Sidebar />
            <main className="flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden pt-4 sm:pt-6 lg:ml-64">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center gap-3 mb-6">
                        <UploadCloud className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Upload Video</h1>
                    </div>
                    <p className="text-muted-foreground mb-8">
                        Please make sure that the content you upload does not violate our Terms of Service.
                    </p>
                    <UploadForm />
                </div>
            </main>
        </div>
    );
}
