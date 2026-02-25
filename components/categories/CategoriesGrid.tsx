'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CategoryFolder from '@/components/CategoryFolder';

interface CategoryGridItem {
    name: string;
    count: number;
    thumbnailUrl: string;
}

interface CategoriesGridProps {
    categories: CategoryGridItem[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {categories.map((category, index) => (
                <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <Link href={`/categories/${category.name}`}>
                        <div className="group cursor-pointer">
                            <CategoryFolder
                                category={category.name}
                                count={category.count}
                                thumbnailUrl={category.thumbnailUrl}
                                onClick={() => { }}
                                isSelected={false}
                            />
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
