'use client';

import React from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
    return (
        <div className="lg:col-span-2 space-y-6">
            <h4 className="text-foreground font-extrabold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Newsletter
            </h4>
            <p className="text-xs text-muted-foreground">Subscribe for weekly updates and exclusive offers.</p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                />
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs py-2 rounded-lg transition-all shadow-lg shadow-primary/20">
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default Newsletter;
