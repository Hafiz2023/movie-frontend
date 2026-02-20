'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const PLANS = [
    {
        id: 'basic',
        name: 'Basic',
        price: { monthly: 0, yearly: 0 },
        features: ['SD Streaming', 'Ad-Supported', 'Public Videos Only'],
        cta: 'Current Plan',
        popular: false
    },
    {
        id: 'fan',
        name: 'Fan Club',
        price: { monthly: 9.99, yearly: 99.99 },
        features: ['HD Streaming (1080p)', 'Ad-Free Experience', 'Unlock 1 Model Specific Content', 'Private Messaging'],
        cta: 'Join Fan Club',
        popular: false,
        savings: 'Save 17%'
    },
    {
        id: 'vip',
        name: 'VIP Access',
        price: { monthly: 29.99, yearly: 299.99 },
        features: ['4K Ultra HD Streaming', 'Completely Ad-Free', 'Full Access to All Models', 'Priority Support', 'Offline Downloads', 'VR Content Access'],
        cta: 'Get VIP Access',
        popular: true,
        savings: 'Save 20%'
    }
];

interface PricingPlansProps {
    billingCycle: 'monthly' | 'yearly';
    selectedPlan: string | null;
    isProcessing: boolean;
    handleSubscribe: (planId: string) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({
    billingCycle,
    selectedPlan,
    isProcessing,
    handleSubscribe
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PLANS.map((plan, idx) => (
                <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative flex flex-col p-8 rounded-2xl border ${plan.popular
                        ? 'bg-[#161616] border-primary/50 shadow-[0_0_50px_-12px_rgba(255,153,0,0.3)] transform md:-translate-y-4'
                        : 'bg-[#111] border-[#222]'
                        }`}
                >
                    {plan.popular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black font-bold px-4 py-1 rounded-full text-sm shadow-lg shadow-primary/20 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-black" /> MOST POPULAR
                        </div>
                    )}

                    <div className="mb-8 text-left">
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-extrabold text-white">
                                ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                            </span>
                            <span className="text-gray-500 font-medium">
                                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                            </span>
                        </div>
                        {billingCycle === 'yearly' && plan.savings && (
                            <p className="text-green-500 text-sm font-bold mt-2">{plan.savings}</p>
                        )}
                    </div>

                    <ul className="space-y-4 mb-8 flex-1 text-left">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                <div className={`mt-0.5 p-0.5 rounded-full ${plan.popular ? 'bg-primary text-black' : 'bg-gray-800 text-gray-400'}`}>
                                    <Check className="w-3 h-3" />
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => handleSubscribe(plan.id)}
                        disabled={plan.id === 'basic' || isProcessing}
                        className={`w-full py-4 rounded-xl font-bold transition-all transform active:scale-95 ${plan.id === 'basic'
                            ? 'bg-[#222] text-gray-500 cursor-not-allowed border border-[#333]'
                            : plan.popular
                                ? 'bg-primary hover:bg-primary/90 text-black shadow-lg shadow-primary/20'
                                : 'bg-white hover:bg-gray-200 text-black'
                            }`}
                    >
                        {isProcessing && selectedPlan === plan.id ? (
                            <span className="flex items-center justify-center gap-2">
                                Processing...
                            </span>
                        ) : (
                            plan.cta
                        )}
                    </button>
                </motion.div>
            ))}
        </div>
    );
};
