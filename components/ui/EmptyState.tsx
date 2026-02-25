'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon = Search,
    title,
    description,
    actionLabel = 'Go Home',
    actionHref = '/',
    className,
}) => {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center py-20 text-center space-y-4",
            className
        )}>
            <div className="bg-secondary/50 p-6 rounded-full">
                <Icon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            {description && (
                <p className="text-muted-foreground max-w-md">{description}</p>
            )}
            <Link href={actionHref}>
                <Button className="mt-4">{actionLabel}</Button>
            </Link>
        </div>
    );
};

export default EmptyState;
