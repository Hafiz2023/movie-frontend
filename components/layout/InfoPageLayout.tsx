'use client';

import React from 'react';
import Link from 'next/link';

export default function InfoPageLayout({
    title,
    children
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground py-10 md:py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-4">
                    <Link href="/" className="text-primary hover:underline text-sm font-medium">
                        &larr; Back to Home
                    </Link>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 md:p-12 shadow-2xl">
                    <h1 className="text-3xl md:text-5xl font-black mb-8 pb-4 border-b border-border text-foreground tracking-tight">
                        {title}
                    </h1>
                    <div className="prose prose-invert prose-lg max-w-none">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
