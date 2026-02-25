'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut, LayoutDashboard } from 'lucide-react';
import useAuthStore from '@/store/authStore';

const UserActions = () => {
    const { user, isAuthenticated, logout, _hasHydrated } = useAuthStore();

    return (
        <div className="flex items-center gap-2 sm:gap-4 text-foreground shrink-0">
            <Link
                href="/premium"
                className="hidden lg:flex items-center gap-1 text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 text-sm font-bold border border-primary/50 px-4 py-1.5 rounded-full uppercase tracking-wide shadow-[0_0_10px_rgba(250,157,5,0.2)] hover:shadow-[0_0_20px_rgba(250,157,5,0.5)]"
            >
                Premium
            </Link>

            {_hasHydrated && isAuthenticated ? (
                <div className="flex items-center gap-3 ml-2">
                    <Link
                        href="/dashboard"
                        className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                    </Link>

                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-primary-foreground font-bold text-sm border-2 border-background ring-2 ring-primary/20 cursor-pointer shadow-lg transition-transform hover:scale-110">
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
                    <Link
                        href="/auth/login"
                        className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 whitespace-nowrap"
                    >
                        Login
                    </Link>
                    <Link
                        href="/auth/register"
                        className="text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 px-4 py-1.5 rounded-md transition-all whitespace-nowrap shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserActions;
