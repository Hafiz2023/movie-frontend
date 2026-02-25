'use client';

import React from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Facebook, Globe, type LucideIcon } from 'lucide-react';

const Brand = () => {
    return (
        <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center tracking-tighter group w-fit">
                <span className="text-foreground font-bold text-4xl mr-1 tracking-tight">MOVIE</span>
                <span className="bg-primary text-primary-foreground font-bold text-4xl px-2 rounded-[6px] flex items-center justify-center shadow-[0_0_20px_rgba(250,157,5,0.4)] transition-transform group-hover:scale-105">APP</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-sm">
                The premier destination for high-quality adult entertainment. Detailed scheduling, exclusive content, and a community like no other.
            </p>

            <div className="flex items-center gap-4 pt-2">
                <SocialIcon icon={Twitter} href="#" label="Twitter" />
                <SocialIcon icon={Instagram} href="#" label="Instagram" />
                <SocialIcon icon={Facebook} href="#" label="Facebook" />
                <SocialIcon icon={Globe} href="#" label="Website" />
            </div>

            <div className="flex flex-wrap gap-2 text-[10px] items-center text-muted-foreground mt-4 font-mono uppercase tracking-wider">
                <span className="border border-border/50 bg-secondary/30 px-2 py-1 rounded text-primary">RTA</span>
                <span>Restricted to Adults 18+</span>
            </div>
        </div>
    );
};

function SocialIcon({ icon: Icon, href, label }: { icon: LucideIcon, href: string, label: string }) {
    return (
        <Link
            href={href}
            aria-label={label}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-primary/50"
        >
            <Icon className="w-4 h-4" />
        </Link>
    );
}

export default Brand;
