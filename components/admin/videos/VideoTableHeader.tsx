'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortKey = 'title' | 'category' | 'views';
export type SortOrder = 'asc' | 'desc';

interface VideoTableHeaderProps {
    sortKey: SortKey;
    onSort: (key: SortKey) => void;
}

interface SortableColumnProps {
    label: string;
    columnKey: SortKey;
    currentSortKey: SortKey;
    onSort: (key: SortKey) => void;
    className?: string;
}

function SortableColumn({ label, columnKey, currentSortKey, onSort, className = '' }: SortableColumnProps) {
    return (
        <th scope="col" className={`px-4 sm:px-6 py-3.5 ${className}`}>
            <button
                onClick={() => onSort(columnKey)}
                className="flex items-center gap-1.5 font-semibold hover:text-foreground transition-colors group"
            >
                {label}
                <ArrowUpDown
                    className={`h-3 w-3 transition-colors ${currentSortKey === columnKey
                            ? 'text-primary'
                            : 'text-muted-foreground/40 group-hover:text-muted-foreground'
                        }`}
                />
            </button>
        </th>
    );
}

export default function VideoTableHeader({ sortKey, onSort }: VideoTableHeaderProps) {
    return (
        <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
            <tr>
                <SortableColumn
                    label="Title"
                    columnKey="title"
                    currentSortKey={sortKey}
                    onSort={onSort}
                />
                <SortableColumn
                    label="Category"
                    columnKey="category"
                    currentSortKey={sortKey}
                    onSort={onSort}
                    className="hidden md:table-cell"
                />
                <SortableColumn
                    label="Views"
                    columnKey="views"
                    currentSortKey={sortKey}
                    onSort={onSort}
                    className="hidden sm:table-cell"
                />
                <th scope="col" className="px-4 sm:px-6 py-3.5 hidden lg:table-cell font-semibold">
                    Status
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3.5 text-right font-semibold">
                    Actions
                </th>
            </tr>
        </thead>
    );
}
