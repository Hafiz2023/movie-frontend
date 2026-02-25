'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center py-20">
            <div className="rounded-full bg-destructive/10 p-6 text-destructive ring-1 ring-destructive/20 animate-pulse">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-12 w-12"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                </svg>
            </div>
            <div className="space-y-3 max-w-md">
                <h2 className="text-4xl font-black tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">Something went wrong!</h2>
                <p className="text-muted-foreground text-lg">
                    We apologize for the inconvenience. Our team has been notified and we are working to fix this.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button onClick={reset} variant="default" size="lg" className="min-w-40 font-bold">
                    Try again
                </Button>
                <Button onClick={() => (window.location.href = '/')} variant="outline" size="lg" className="min-w-40">
                    Go Home
                </Button>
            </div>
        </div>
    );
}
