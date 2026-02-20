'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface BillingToggleProps {
    billingCycle: 'monthly' | 'yearly';
    setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ billingCycle, setBillingCycle }) => {
    return (
        <div className="flex justify-center mb-16">
            <div className="bg-[#1a1a1a] p-1.5 rounded-full border border-[#333] inline-flex relative">
                <motion.div
                    className="absolute inset-y-1.5 rounded-full bg-[#333] shadow-sm"
                    layoutId="billing-highlight"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                        width: '50%',
                        left: billingCycle === 'monthly' ? '4px' : '50%'
                    }}
                />
                <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-colors z-10 ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-colors z-10 flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Yearly
                    <span className="bg-primary text-black text-[10px] px-1.5 py-0.5 rounded font-extrabold uppercase ml-1">-20%</span>
                </button>
            </div>
        </div>
    );
};
