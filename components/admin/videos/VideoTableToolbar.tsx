'use client';

import React from 'react';
import { AdminSearchInput, AdminFilterSelect } from '../common';

interface VideoTableToolbarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    categories: string[];
}

export default function VideoTableToolbar({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
}: VideoTableToolbarProps) {
    const categoryOptions = categories.map(cat => ({
        value: cat,
        label: cat === 'all' ? 'All Categories' : cat,
    }));

    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <AdminSearchInput
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search by title or category..."
            />
            <div className="flex gap-2 flex-wrap">
                <AdminFilterSelect
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    options={categoryOptions}
                />
            </div>
        </div>
    );
}
