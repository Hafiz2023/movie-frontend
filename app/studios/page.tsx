/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Studios" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Camera } from 'lucide-react';
import StudioCard from '@/components/studios/StudioCard';

export default function StudiosPage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground relative">
            <Sidebar />
            <main className="flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden pt-4 sm:pt-6 lg:ml-64">
                <div className="max-w-[1800px] mx-auto space-y-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Camera className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Top Studios</h1>
                    </div>
                    <p className="text-muted-foreground">Discover content from the best studios in the industry.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                        {[
                            { id: '1', name: 'Brazzers', videoCount: 15420 },
                            { id: '2', name: 'Naughty America', videoCount: 8390 },
                            { id: '3', name: 'Reality Kings', videoCount: 6510 },
                            { id: '4', name: 'Bang Bros', videoCount: 11200 },
                            { id: '5', name: 'Evil Angel', videoCount: 4320 },
                            { id: '6', name: 'Digital Playground', videoCount: 3100 },
                        ].map((studio) => (
                            <StudioCard key={studio.id} {...studio} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
