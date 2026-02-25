'use client';

import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubmitButtonProps {
    loading: boolean;
    label: string;
    disabled?: boolean;
}

export default function SubmitButton({
    loading,
    label,
    disabled = false,
}: SubmitButtonProps) {
    const isDisabled = loading || disabled;

    return (
        <motion.button
            type="submit"
            disabled={isDisabled}
            className="group relative w-full flex justify-center py-3.5 px-4 text-sm font-semibold rounded-lg text-white bg-primary overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-primary/30"
            whileHover={!isDisabled ? { scale: 1.01 } : undefined}
            whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        >
            {/* Hover Gradient Overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-rose-600 to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-[shimmer_2s_linear_infinite]" />

            {/* Button Content */}
            <span className="relative flex items-center gap-2">
                {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                        {label}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                )}
            </span>
        </motion.button>
    );
}
