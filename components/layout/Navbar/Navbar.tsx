'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserActions from './UserActions';
import MobileMenu from './MobileMenu';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
            {/* Top Bar: Logo, Search, User Actions */}
            <div className="bg-background/80 backdrop-blur-md border-b border-border h-16 w-full shrink-0">
                <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">

                    {/* Left: Logo & Menu Toggle */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            className="text-foreground hover:bg-secondary p-2 rounded-md lg:hidden transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <Logo />
                    </div>

                    {/* Center: Search Bar (Desktop) */}
                    <SearchBar />

                    {/* Right: Actions */}
                    <UserActions />
                </div>
            </div>

            {/* Mobile Search (Visible only on mobile) */}
            <SearchBar isMobile className="md:hidden" onSearch={() => setIsMobileMenuOpen(false)} />

            {/* Mobile Navigation Drawer */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
