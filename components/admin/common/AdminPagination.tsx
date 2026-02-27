'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    /** 'full' shows numbered buttons, 'compact' shows page/total */
    variant?: 'full' | 'compact';
}

export default function AdminPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    variant = 'full',
}: AdminPaginationProps) {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Auto-compact on mobile when too many pages
    const effectiveVariant = variant === 'full' && totalPages > 5 ? 'compact' : variant;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
                Showing{' '}
                <span className="font-medium text-foreground">{startItem}</span> to{' '}
                <span className="font-medium text-foreground">{endItem}</span> of{' '}
                <span className="font-medium text-foreground">{totalItems}</span>
            </p>

            <div className="flex items-center gap-2 order-1 sm:order-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary hover:border-primary/30 disabled:opacity-40 transition-all"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {effectiveVariant === 'full' ? (
                    <>
                        {/* Show numbered buttons, hidden on very small screens if many pages */}
                        <div className="hidden sm:flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => onPageChange(page)}
                                    className={`h-8 w-8 p-0 text-xs transition-all ${currentPage === page
                                        ? 'shadow-md shadow-primary/20'
                                        : 'hover:bg-primary/10 hover:text-primary hover:border-primary/30'
                                        }`}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                        {/* Compact fallback on mobile */}
                        <span className="text-xs text-muted-foreground px-2 sm:hidden">
                            {currentPage} / {totalPages}
                        </span>
                    </>
                ) : (
                    <span className="text-xs text-muted-foreground px-2">
                        {currentPage} / {totalPages}
                    </span>
                )}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary hover:border-primary/30 disabled:opacity-40 transition-all"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
