'use client';

import React from 'react';
import { Chrome, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialLoginButtonsProps {
    loading: boolean;
    onGoogleClick: () => void;
    onGithubClick?: () => void;
    dividerText?: string;
}

export default function SocialLoginButtons({
    loading,
    onGoogleClick,
    onGithubClick,
    dividerText = 'Or continue with',
}: SocialLoginButtonsProps) {
    return (
        <>
            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                        {dividerText}
                    </span>
                </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
                <motion.button
                    type="button"
                    onClick={onGoogleClick}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-input rounded-lg bg-card hover:bg-secondary/50 transition-all text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/30"
                    whileHover={!loading ? { scale: 1.02, y: -1 } : undefined}
                    whileTap={!loading ? { scale: 0.98 } : undefined}
                >
                    <Chrome className="h-5 w-5 text-blue-500" />
                    Google
                </motion.button>
                <motion.button
                    type="button"
                    onClick={onGithubClick}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-input rounded-lg bg-card hover:bg-secondary/50 transition-all text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/30"
                    whileHover={!loading ? { scale: 1.02, y: -1 } : undefined}
                    whileTap={!loading ? { scale: 0.98 } : undefined}
                >
                    <Github className="h-5 w-5" />
                    GitHub
                </motion.button>
            </div>
        </>
    );
}
