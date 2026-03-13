import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
    title: string;
    value: string | number;
    description?: React.ReactNode;
    icon: LucideIcon;
    iconClassName?: string;
    className?: string;
}

export default function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconClassName,
    className,
}: StatCardProps) {
    return (
        <Card className={cn('transition-colors border-white/10 hover:border-primary/30 group', className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{title}</CardTitle>
                <Icon className={cn('h-4 w-4', iconClassName || 'text-muted-foreground group-hover:text-primary transition-colors')} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{value}</div>
                {description && (
                    <div className="text-xs mt-1 font-medium">{description}</div>
                )}
            </CardContent>
        </Card>
    );
}
