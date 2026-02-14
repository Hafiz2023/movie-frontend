'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { LogOut, Menu, X, Search, Video, User, Bell, LayoutDashboard, Home, Film, List, Radio, Star, Users, Image as ImageIcon, Glasses } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import useUIStore from '@/store/uiStore';

const Navbar = () => {
    const { user, isAuthenticated, logout, _hasHydrated } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Videos', href: '/videos', icon: Film },
        { name: 'Categories', href: '/categories', icon: List },
        { name: 'Live Cams', href: '/live', icon: Radio, active: true },
        { name: 'Pornstars', href: '/models', icon: Star, active: true },
        { name: 'Community', href: '/community', icon: Users },
        { name: 'Photos', href: '/photos', icon: ImageIcon },
        { name: 'VR', href: '/videos/vr', icon: Glasses },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
            {/* Top Bar: Logo, Search, User Actions */}
            <div className="bg-background border-b border-border h-16 w-full shrink-0">
                <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">

                    {/* Left: Logo & Menu */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            className="text-foreground hover:bg-secondary p-2 rounded-md lg:hidden transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <Link href="/" className="flex items-center gap-1 group">
                            <span className="bg-primary text-primary-foreground font-bold text-2xl px-2 py-0.5 rounded-[4px] flex items-center justify-center tracking-tighter shadow-[0_0_15px_rgba(250,157,5,0.4)]">
                                TUBE
                            </span>
                        </Link>
                    </div>

                    {/* Center: Search Bar */}
                    <div className="flex-1 max-w-xl hidden md:flex items-center mx-6">
                        <form onSubmit={handleSearch} className="relative w-full flex group">
                            <input
                                type="text"
                                placeholder="Search videos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-secondary/50 border border-input text-foreground px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground rounded-l-md h-10"
                            />
                            <button type="submit" className="bg-secondary px-6 border border-l-0 border-input hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all h-10 flex items-center justify-center rounded-r-md group-hover:text-primary">
                                <Search className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 sm:gap-4 text-foreground shrink-0">


                        <Link href="/premium" className="hidden lg:flex items-center gap-1 text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 text-sm font-bold border border-primary/50 px-4 py-1.5 rounded-full uppercase tracking-wide shadow-[0_0_10px_rgba(250,157,5,0.2)] hover:shadow-[0_0_20px_rgba(250,157,5,0.5)]">
                            Premium
                        </Link>

                        {_hasHydrated && isAuthenticated ? (
                            <div className="flex items-center gap-3 ml-2">
                                <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full">
                                    <LayoutDashboard className="w-5 h-5" />
                                </Link>

                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-primary-foreground font-bold text-sm border-2 border-background ring-2 ring-primary/20 cursor-pointer shadow-lg">
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </div>

                                <button
                                    onClick={() => logout()}
                                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 ml-2">
                                <Link href="/auth/login" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 whitespace-nowrap">
                                    Login
                                </Link>
                                <Link href="/auth/register" className="text-sm font-bold bg-[hsl(var(--blue))] text-white hover:opacity-90 px-4 py-1.5 rounded-md transition-all whitespace-nowrap shadow-lg shadow-[hsl(var(--blue))]/20 hover:shadow-[hsl(var(--blue))]/40 transform hover:-translate-y-0.5">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Removed due to overlap with Sidebar */}
            {/* The Sidebar in page.tsx now handles desktop navigation */}


            {/* Mobile Search (Visible only on mobile) */}
            <div className="md:hidden bg-background border-b border-border p-3">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-secondary text-foreground px-4 py-2.5 pl-10 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary/50"
                    />
                    <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                </form>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-card border-r border-border z-50 lg:hidden overflow-y-auto"
                        >
                            <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
                                <span className="text-xl font-bold text-foreground flex items-center gap-2">
                                    <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-[4px]">TUBE</span>
                                    Menu
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-4 space-y-6">
                                {/* Navigation Links */}
                                <div className="space-y-1">
                                    <h3 className="px-2 text-xs font-bold text-muted-foreground uppercase mb-2 tracking-wider">Browse</h3>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                                                pathname === link.href
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                            )}
                                        >
                                            <link.icon className={cn("w-5 h-5", pathname === link.href ? "text-primary" : "text-muted-foreground")} />
                                            {link.name}
                                            {link.name === 'Live Cams' && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-auto" />}
                                        </Link>
                                    ))}
                                </div>

                                {/* User Actions Mobile */}
                                <div className="pt-4 border-t border-border">
                                    <h3 className="px-2 text-xs font-bold text-muted-foreground uppercase mb-2 tracking-wider">Account</h3>
                                    {_hasHydrated && isAuthenticated ? (
                                        <div className="space-y-1">
                                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                                                <LayoutDashboard className="w-5 h-5" /> Dashboard
                                            </Link>

                                            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10">
                                                <LogOut className="w-5 h-5" /> Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3 px-2">
                                            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex justify-center py-2.5 border border-border rounded-md text-sm font-bold text-foreground hover:bg-secondary transition-colors">
                                                Log In
                                            </Link>
                                            <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex justify-center py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                                                Sign Up Free
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
