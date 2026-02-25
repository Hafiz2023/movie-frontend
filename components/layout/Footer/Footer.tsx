'use client';

import React from 'react';
import Brand from './Brand';
import LinksColumn from './LinksColumn';
import Newsletter from './Newsletter';
import TrendingSearches from './TrendingSearches';
import FooterBottom from './FooterBottom';

const Footer = () => {
    const informationLinks = [
        { label: 'About Us', href: '/about' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'DMCA', href: '/dmca' },
        { label: '2257 Exemption', href: '/2257' },
        { label: 'Cookie Policy', href: '/cookies' },
    ];

    const workWithUsLinks = [
        { label: 'Content Partners', href: '/contact' },
        { label: 'Advertise', href: '/contact' },
        { label: 'Webmasters', href: '/contact' },
        { label: 'Model Program', href: '/contact' },
        { label: 'Press', href: '/press' },
    ];

    const supportLinks = [
        { label: 'Feedback', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact Support', href: '/contact' },
        { label: 'Billing', href: '/billing' },
        { label: 'Trust & Safety', href: '/trust' },
    ];

    return (
        <footer className="w-full bg-card border-t border-border mt-auto relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-primary/20 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
                    {/* Brand Column */}
                    <Brand />

                    {/* Links Columns */}
                    <LinksColumn title="Information" links={informationLinks} className="lg:col-span-2" />
                    <LinksColumn title="Work With Us" links={workWithUsLinks} className="lg:col-span-2" />
                    <LinksColumn title="Support" links={supportLinks} className="lg:col-span-2" />

                    {/* Newsletter */}
                    <Newsletter />
                </div>

                {/* Popular Searches */}
                <TrendingSearches />

                {/* Footer Bottom */}
                <FooterBottom />
            </div>
        </footer>
    );
};

export default Footer;
