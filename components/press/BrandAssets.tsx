'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileImage, FileText, Palette, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssetItem {
    icon: LucideIcon;
    name: string;
    description: string;
    fileType: string;
    size: string;
}

const brandAssets: AssetItem[] = [
    {
        icon: FileImage,
        name: 'Logo Pack',
        description: 'Full logo suite in SVG, PNG, and EPS formats for light and dark backgrounds.',
        fileType: 'ZIP',
        size: '4.2 MB',
    },
    {
        icon: Palette,
        name: 'Brand Guidelines',
        description: 'Complete brand guidelines including colors, typography, and usage rules.',
        fileType: 'PDF',
        size: '12 MB',
    },
    {
        icon: FileText,
        name: 'Fact Sheet',
        description: 'Company overview, key statistics, leadership bios, and key milestones.',
        fileType: 'PDF',
        size: '2.1 MB',
    },
    {
        icon: FileImage,
        name: 'Product Screenshots',
        description: 'High-resolution screenshots of the platform across desktop and mobile devices.',
        fileType: 'ZIP',
        size: '28 MB',
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export const BrandAssets = () => {
    return (
        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4">
                <motion.div {...fadeInUp} className="text-center mb-14">
                    <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">
                        Resources
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        Brand & Media Kit
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Download official logos, brand guidelines, and media assets for editorial use.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    {brandAssets.map((asset, index) => (
                        <motion.div
                            key={asset.name}
                            {...fadeInUp}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative p-6 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 flex flex-col"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col flex-1">
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                                    <asset.icon className="w-6 h-6 text-primary" />
                                </div>

                                {/* Name */}
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {asset.name}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                                    {asset.description}
                                </p>

                                {/* File info & download */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground font-mono">
                                        {asset.fileType} · {asset.size}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10 p-2 h-auto"
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
