'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface TermsCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    termsHref?: string;
    privacyHref?: string;
    error?: string;
}

export default function TermsCheckbox({
    checked,
    onChange,
    termsHref = '/terms',
    privacyHref = '/privacy',
    error,
}: TermsCheckboxProps) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-start gap-3">
                <div className="relative mt-0.5">
                    <input
                        id="agree-terms"
                        name="agree-terms"
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        className="peer h-4 w-4 rounded border-input bg-secondary/50 text-primary focus:ring-primary/20 focus:ring-2 cursor-pointer transition-all"
                        aria-invalid={!!error}
                    />
                    <motion.div
                        className="absolute inset-0 rounded bg-primary/20 pointer-events-none"
                        animate={{ scale: checked ? [1, 1.5, 0] : 0, opacity: checked ? [1, 0] : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <label
                    htmlFor="agree-terms"
                    className={`text-sm cursor-pointer select-none leading-tight transition-colors duration-200 ${error ? 'text-red-400' : 'text-muted-foreground'
                        }`}
                >
                    I agree to the{' '}
                    <Link
                        href={termsHref}
                        className="text-primary hover:text-primary/80 font-medium underline-offset-2 hover:underline"
                    >
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                        href={privacyHref}
                        className="text-primary hover:text-primary/80 font-medium underline-offset-2 hover:underline"
                    >
                        Privacy Policy
                    </Link>
                </label>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-1.5 text-red-400 overflow-hidden pl-7"
                    >
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="text-xs font-medium">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
