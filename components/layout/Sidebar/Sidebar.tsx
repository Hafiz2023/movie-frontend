'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    Home as HomeIcon,
    Film,
    Clock,
    ThumbsUp,
    Users,
    Star,
    Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    const searchParams = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const tagFilter = searchParams.get('tag');

    const mainLinks = [
        { name: 'Home', href: '/', icon: HomeIcon, active: !categoryFilter && !tagFilter },
        { name: 'All Videos', href: '/videos', icon: Film },
        { name: 'History', href: '/dashboard', icon: Clock },
        { name: 'Top Rated', href: '/categories', icon: ThumbsUp },
    ];

    const categories = [
        'Amateur', 'Couple', 'Threesome', 'Group', 'Milf', 'Teen',
        'Hentai', 'Asian', 'Ebony', 'Latina', 'Lesbian', 'VR'
    ];

    const networkLinks = [
        { name: 'Community', href: '/community', icon: Users },
        { name: 'Pornstars', href: '/models', icon: Star },
        { name: 'Live Cams', href: '/live', icon: Flame, pulse: true },
    ];

    return (
        <aside
            className={cn(
                "hidden lg:block fixed top-16 left-0 bottom-0 z-40 w-64 bg-card/50 backdrop-blur-xl border-r border-border overflow-y-auto no-scrollbar shrink-0 h-[calc(100vh-4rem)]",
                className
            )}
        >
            <div className="p-4 space-y-6">
                <div className="space-y-1">
                    {mainLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all",
                                link.active
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                            )}
                        >
                            <link.icon className="w-5 h-5" /> {link.name}
                        </Link>
                    ))}
                </div>

                <div className="pt-4 border-t border-white/5">
                    <h3 className="px-4 text-xs font-bold text-muted-foreground/70 uppercase mb-3 tracking-wider">Categories</h3>
                    <div className="space-y-1">
                        {categories.map(cat => (
                            <Link
                                key={cat}
                                href={`/?category=${cat}`}
                                className={cn(
                                    "block px-4 py-2 text-sm rounded-lg transition-all",
                                    categoryFilter === cat
                                        ? 'bg-primary/20 text-primary font-bold'
                                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                )}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                    <h3 className="px-4 text-xs font-bold text-muted-foreground/70 uppercase mb-3 tracking-wider">Network</h3>
                    <div className="space-y-1">
                        {networkLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-all hover:bg-white/5 rounded-lg"
                            >
                                <link.icon className={cn("w-4 h-4", link.pulse && "text-primary animate-pulse")} /> {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
