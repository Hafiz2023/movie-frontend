'use client';

import React, { useState, useMemo } from 'react';
import { Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminVideo } from '@/types';
import { AdminPagination, AdminEmptyState } from '../common';
import VideoTableToolbar from './VideoTableToolbar';
import VideoTableHeader, { type SortKey, type SortOrder } from './VideoTableHeader';
import VideoTableRow from './VideoTableRow';

interface VideoTableProps {
    videos: AdminVideo[];
    onEdit: (video: AdminVideo) => void;
    onDelete: (video: AdminVideo) => void;
}

const ITEMS_PER_PAGE = 6;

export default function VideoTable({ videos, onEdit, onDelete }: VideoTableProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState<SortKey>('title');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(videos.map(v => v.category));
        return ['all', ...Array.from(cats)];
    }, [videos]);

    // Filter & Sort
    const filteredVideos = useMemo(() => {
        let result = [...videos];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                v => v.title.toLowerCase().includes(q) || v.category.toLowerCase().includes(q)
            );
        }

        if (selectedCategory !== 'all') {
            result = result.filter(v => v.category === selectedCategory);
        }

        result.sort((a, b) => {
            let valA: string | number;
            let valB: string | number;

            if (sortKey === 'views') {
                valA = typeof a.views === 'string' ? parseFloat(a.views.replace(/[^0-9.]/g, '')) || 0 : a.views;
                valB = typeof b.views === 'string' ? parseFloat(b.views.replace(/[^0-9.]/g, '')) || 0 : b.views;
            } else {
                valA = (a[sortKey] || '').toString().toLowerCase();
                valB = (b[sortKey] || '').toString().toLowerCase();
            }

            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [videos, searchQuery, selectedCategory, sortKey, sortOrder]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredVideos.length / ITEMS_PER_PAGE));
    const paginatedVideos = filteredVideos.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    const handleExportCSV = () => {
        const headers = ['Title', 'Category', 'Views'];
        const rows = filteredVideos.map(v => [v.title, v.category, v.views.toString()]);
        const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'videos-export.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">Recent Videos</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleExportCSV}
                            className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 self-start sm:self-auto"
                        >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Export CSV</span>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    <VideoTableToolbar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        categories={categories}
                    />

                    {/* Table */}
                    <div className="relative overflow-x-auto rounded-xl border border-border/50">
                        <table className="w-full text-left text-sm text-foreground">
                            <VideoTableHeader sortKey={sortKey} onSort={handleSort} />
                            <tbody className="divide-y divide-border/50">
                                <AnimatePresence mode="popLayout">
                                    {paginatedVideos.length > 0 ? (
                                        paginatedVideos.map((video, idx) => (
                                            <VideoTableRow
                                                key={video.id}
                                                video={video}
                                                index={idx}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <AdminEmptyState
                                                    icon={Search}
                                                    title="No videos found"
                                                    description="Try adjusting your search or filter"
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    <AdminPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredVideos.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={setCurrentPage}
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
}
