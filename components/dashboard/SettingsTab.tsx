'use client';

import React from 'react';
import useAuthStore from '@/store/authStore';
import { ProfileSettings, PasswordSettings } from './settings';
import { motion } from 'framer-motion';
import { Settings, Sparkles } from 'lucide-react';

export default function SettingsTab() {
    const { user } = useAuthStore();
    const displayUser = {
        name: user?.name || 'Guest User',
        email: user?.email || 'guest@example.com'
    };

    return (
        <div className="space-y-6 lg:space-y-8 pb-10">
            {/* Header section with same premium styling as StudioTab */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/40 p-6 rounded-2xl border border-border/50 backdrop-blur-md relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4 w-full">
                    <div className="p-3 bg-primary/20 rounded-xl border border-primary/30 shrink-0">
                        <Settings className="w-8 h-8 text-primary animate-[spin_10s_linear_infinite]" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-4 h-4 text-primary/70" />
                            <h2 className="text-sm font-bold uppercase tracking-widest text-primary/70">Account Preferences</h2>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            Settings
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                            Update your personal information and secure your account.
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-6 lg:gap-8 lg:grid-cols-2"
            >
                <ProfileSettings displayUser={displayUser} />
                <PasswordSettings />
            </motion.div>
        </div>
    );
}
