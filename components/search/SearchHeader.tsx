'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SearchHeaderProps {
    query: string;
    resultCount: number;
}

export default function SearchHeader({ query, resultCount }: SearchHeaderProps) {
    return (
        <div className="bg-background/95 border-b border-border sticky top-14 md:top-16 z-40 py-4 px-4 shadow-lg shadow-black/5">
            <div className="container mx-auto flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        Search Results for <span className="text-primary">&quot;{query}&quot;</span>
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        Found {resultCount} videos matching your search
                    </p>
                </div>
            </div>
        </div>
    );
}
