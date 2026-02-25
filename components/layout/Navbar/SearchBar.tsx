'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
    className?: string;
    isMobile?: boolean;
    onSearch?: () => void;
}

const SearchBar = ({ className, isMobile, onSearch }: SearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            if (onSearch) onSearch();
        }
    };

    if (isMobile) {
        return (
            <div className={cn("bg-background p-3", className)}>
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-secondary text-foreground px-4 py-2.5 pl-10 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary/50"
                    />
                    <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                </form>
            </div>
        );
    }

    return (
        <div className={cn("flex-1 max-w-xl hidden md:flex items-center mx-6", className)}>
            <form onSubmit={handleSearch} className="relative w-full flex group">
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-secondary/50 border border-input text-foreground px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground rounded-l-md h-10"
                />
                <button
                    type="submit"
                    className="bg-secondary px-6 border border-l-0 border-input hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all h-10 flex items-center justify-center rounded-r-md group-hover:text-primary"
                >
                    <Search className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
