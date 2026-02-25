'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AuthFormHeaderProps {
    brandName?: string;
    brandHref?: string;
    title: string;
    subtitle: string;
}

export default function AuthFormHeader({
    brandName = 'MovieApp',
    brandHref = '/',
    title,
    subtitle,
}: AuthFormHeaderProps) {
    return (
        <div className="text-center lg:text-left">
            <Link
                href={brandHref}
                className="inline-block text-2xl font-bold bg-gradient-to-r from-primary via-rose-400 to-orange-500 bg-clip-text text-transparent mb-6 hover:opacity-80 transition-opacity"
            >
                <motion.span
                    className="inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {brandName}
                </motion.span>
            </Link>
            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-2">
                {title}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
                {subtitle}
            </p>
        </div>
    );
}
