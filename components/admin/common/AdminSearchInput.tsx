'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AdminSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function AdminSearchInput({
    value,
    onChange,
    placeholder = 'Search...',
    className = '',
}: AdminSearchInputProps) {
    return (
        <div className={`relative flex-1 ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="pl-10 bg-muted/30 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-200"
            />
        </div>
    );
}
