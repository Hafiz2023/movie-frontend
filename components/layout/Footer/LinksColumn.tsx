'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LinksColumnProps {
    title: string;
    links: { label: string; href: string }[];
    className?: string;
}

const LinksColumn = ({ title, links, className }: LinksColumnProps) => {
    return (
        <div className={cn("space-y-6", className)}>
            <h4 className="text-foreground font-extrabold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                {title}
            </h4>
            <ul className="space-y-3 text-muted-foreground text-sm font-medium">
                {links.map((link, idx) => (
                    <li key={idx}>
                        <Link
                            href={link.href}
                            className="hover:text-primary transition-all hover:translate-x-1 inline-block"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LinksColumn;
