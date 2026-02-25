'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface AuthFooterLinkProps {
    text: string;
    linkText: string;
    href: string;
}

export default function AuthFooterLink({
    text,
    linkText,
    href,
}: AuthFooterLinkProps) {
    return (
        <p className="text-center text-sm text-muted-foreground pt-2">
            {text}{' '}
            <Link
                href={href}
                className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-all group"
            >
                {linkText}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
        </p>
    );
}
