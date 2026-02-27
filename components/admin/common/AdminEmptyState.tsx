'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface AdminEmptyStateProps {
    icon: LucideIcon;
    title: string;
    description?: string;
}

export default function AdminEmptyState({ icon: Icon, title, description }: AdminEmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 text-center"
        >
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">{title}</p>
            {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
        </motion.div>
    );
}
