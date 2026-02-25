'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AuthFormWrapperProps {
    children: React.ReactNode;
}

const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AuthFormWrapper({ children }: AuthFormWrapperProps) {
    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-30">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md space-y-6"
            >
                {React.Children.map(children, (child) => (
                    <motion.div variants={itemVariants}>{child}</motion.div>
                ))}
            </motion.div>
        </div>
    );
}
