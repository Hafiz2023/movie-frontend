'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, LayoutDashboard, Home, Film, List, Radio, Star, Users, Image as ImageIcon, Glasses } from 'lucide-react';
import { cn } from '@/lib/utils';
import useAuthStore from '@/store/authStore';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Videos', href: '/videos', icon: Film },
    { name: 'Categories', href: '/categories', icon: List },
    { name: 'Live Cams', href: '/live', icon: Radio },
    { name: 'Pornstars', href: '/models', icon: Star },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Photos', href: '/photos', icon: ImageIcon },
    { name: 'VR', href: '/videos/vr', icon: Glasses },
];

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const pathname = usePathname();
    const { isAuthenticated, logout, _hasHydrated } = useAuthStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] lg:hidden"
                    />
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-[280px] bg-card border-r border-border z-[101] lg:hidden overflow-y-auto"
                    >
                        <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
                            <span className="text-xl font-bold text-foreground flex items-center gap-2">
                                <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-[4px]">TUBE</span>
                                Menu
                            </span>
                            <button
                                onClick={onClose}
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
                                        onClick={onClose}
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
                                        <Link href="/dashboard" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                                            <LayoutDashboard className="w-5 h-5" /> Dashboard
                                        </Link>

                                        <button
                                            onClick={() => { logout(); onClose(); }}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10"
                                        >
                                            <LogOut className="w-5 h-5" /> Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3 px-2">
                                        <Link href="/auth/login" onClick={onClose} className="w-full flex justify-center py-2.5 border border-border rounded-md text-sm font-bold text-foreground hover:bg-secondary transition-colors">
                                            Log In
                                        </Link>
                                        <Link href="/auth/register" onClick={onClose} className="w-full flex justify-center py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
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
    );
};

export default MobileMenu;
