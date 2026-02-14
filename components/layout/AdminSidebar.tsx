'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Film, Users, Settings, LogOut } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
    const pathname = usePathname();
    const logout = useAuthStore((state) => state.logout);

    const links = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Movies', href: '/admin/movies', icon: Film }, // Route doesn't exist but for UI demo
        { name: 'Users', href: '/admin/users', icon: Users }, // Route doesn't exist
        { name: 'Settings', href: '/admin/settings', icon: Settings }, // Route doesn't exist
    ];

    return (
        <div className="flex flex-col h-full w-full bg-card p-4">
            <div className="space-y-4">
                <div className="py-2">
                    <h2 className="px-4 text-lg font-semibold tracking-tight text-foreground">
                        Admin Panel
                    </h2>
                </div>
                <nav className="space-y-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                            )}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="py-2">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
