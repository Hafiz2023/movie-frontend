'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface AdminFilterSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    className?: string;
}

export default function AdminFilterSelect({
    value,
    onChange,
    options,
    className = '',
}: AdminFilterSelectProps) {
    return (
        <div className={`relative ${className}`}>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="h-9 w-full sm:w-auto pl-9 pr-8 rounded-md border border-border/50 bg-muted/30 text-sm text-foreground appearance-none cursor-pointer hover:border-primary/30 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all duration-200"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
