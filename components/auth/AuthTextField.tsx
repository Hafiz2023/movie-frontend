'use client';

import React, { useState } from 'react';
import { LucideIcon, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthTextFieldProps {
    id: string;
    name: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    icon: LucideIcon;
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    isPassword?: boolean;
    labelExtra?: React.ReactNode;
    error?: string;
    children?: React.ReactNode;
    autoComplete?: string;
}

export default function AuthTextField({
    id,
    name,
    label,
    type = 'text',
    value,
    onChange,
    onBlur,
    icon: Icon,
    placeholder,
    required = true,
    minLength,
    isPassword = false,
    labelExtra,
    error,
    children,
    autoComplete,
}: AuthTextFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="relative group space-y-2">
            {/* Label Row */}
            {labelExtra ? (
                <div className="flex items-center justify-between">
                    <Label htmlFor={id}>{label}</Label>
                    {labelExtra}
                </div>
            ) : (
                <Label htmlFor={id}>{label}</Label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Focus Ring Glow */}
                <motion.div
                    className="absolute -inset-0.5 rounded-lg bg-primary/20 blur-sm"
                    animate={{ opacity: isFocused ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                />

                <div className="relative">
                    {/* Left Icon */}
                    <div
                        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${isFocused ? 'text-primary' : error ? 'text-red-400' : 'text-muted-foreground'
                            }`}
                    >
                        <Icon className="h-5 w-5" />
                    </div>

                    {/* Input */}
                    <Input
                        id={id}
                        name={name}
                        type={inputType}
                        required={required}
                        minLength={minLength}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            onBlur?.();
                        }}
                        className={`${isPassword ? 'pl-10 pr-10' : 'pl-10'} ${error ? 'border-red-400/50 focus-visible:ring-red-400/30' : ''
                            } transition-all duration-200`}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                    />

                    {/* Password Toggle */}
                    {isPassword && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none p-0.5 rounded hover:bg-secondary/50"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                tabIndex={-1}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={showPassword ? 'hide' : 'show'}
                                        initial={{ opacity: 0, rotateY: 90 }}
                                        animate={{ opacity: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, rotateY: -90 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        id={`${id}-error`}
                        role="alert"
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1.5 text-red-400 overflow-hidden"
                    >
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="text-xs font-medium">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Extra Content (e.g., PasswordStrengthBar) */}
            {children}
        </div>
    );
}
