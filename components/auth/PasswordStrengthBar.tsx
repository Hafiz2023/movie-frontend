'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { PasswordStrength } from '@/hooks/useRegisterForm';

interface PasswordStrengthBarProps {
    password: string;
    strength: PasswordStrength;
}

const criteriaLabels: Record<string, string> = {
    length: '8+ characters',
    uppercase: 'Uppercase letter',
    lowercase: 'Lowercase letter',
    number: 'Number',
    special: 'Special character',
};

export default function PasswordStrengthBar({
    password,
    strength,
}: PasswordStrengthBarProps) {
    if (!password) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 pt-1"
        >
            {/* Strength Bar */}
            <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-secondary/50 rounded-full overflow-hidden flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`flex-1 rounded-full transition-colors duration-300 ${i < strength.score ? strength.color : 'bg-secondary/30'
                                }`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: i < strength.score ? 1 : 0.3 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                        />
                    ))}
                </div>
                <span
                    className={`text-xs font-semibold min-w-[72px] text-right transition-colors duration-300 ${strength.score <= 1
                            ? 'text-red-400'
                            : strength.score <= 3
                                ? 'text-orange-400'
                                : 'text-emerald-400'
                        }`}
                >
                    {strength.label}
                </span>
            </div>

            {/* Criteria Checklist */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {Object.entries(strength.checks).map(([key, passed]) => (
                    <motion.div
                        key={key}
                        className="flex items-center gap-1.5"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {passed ? (
                            <Check className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                        ) : (
                            <X className="h-3 w-3 text-muted-foreground/50 flex-shrink-0" />
                        )}
                        <span
                            className={`text-[11px] transition-colors duration-200 ${passed ? 'text-emerald-400' : 'text-muted-foreground/60'
                                }`}
                        >
                            {criteriaLabels[key]}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
