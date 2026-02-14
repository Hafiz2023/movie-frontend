'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Star, Shield, Zap, Info, CreditCard, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Image from 'next/image';

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

const FAQS = [
    { q: "Can I cancel anytime?", a: "Yes! You can cancel your subscription at any time. Your access will remain active until the end of your billing period." },
    { q: "Is the payment secure?", a: "Absolutely. We use industry-standard encryption (SSL) and process payments securely via Stripe." },
    { q: "What is 4K Ultra HD?", a: "4K offers four times the resolution of standard HD, providing crystal clear visuals for the ultimate viewing experience." },
];

export default function PremiumPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock Payment Handler
    // Mock Payment Handler
    const router = useRouter();

    const handleSubscribe = (planId: string) => {
        if (planId === 'basic') return;
        router.push(`/checkout?plan=${planId}&cycle=${billingCycle}`);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-20" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[128px] opacity-20" />
            </div>

            {/* Hero Section */}
            <div className="relative pt-20 pb-12 text-center container mx-auto px-4 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-500 text-xs font-bold border border-yellow-500/30 mb-6 tracking-wide uppercase">
                        Upgrade Your Experience
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                        Unlock the <span className="text-primary">Ultimate</span> Collection
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join thousands of members enjoying exclusive 4K content, ad-free streaming, and private access to top creators.
                    </p>
                </motion.div>

                {/* Billing Toggle */}
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

                {/* Pricing Cards */}
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
            </div>

            {/* Features Grid */}
            <div className="bg-[#111] py-24 border-y border-[#222]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 mb-6 border border-blue-500/30">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                            <p className="text-gray-400 max-w-sm">Optimized global CDN ensures buffer-free streaming anywhere in the world.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center text-primary mb-6 border border-primary/30">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
                            <p className="text-gray-400 max-w-sm">Your data is encrypted. Anonymous billing options available for VIP members.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-green-400 mb-6 border border-green-500/30">
                                <Lock className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Exclusive Access</h3>
                            <p className="text-gray-400 max-w-sm">Get early access to new releases and member-only behind the scenes content.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="container mx-auto px-4 py-24 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <div key={i} className="bg-[#161616] border border-[#222] rounded-xl overflow-hidden">
                            <details className="group">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-bold text-lg">{faq.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-[#222] pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="container mx-auto px-4 pb-20 text-center">
                <div className="bg-gradient-to-r from-[#222] via-[#1a1a1a] to-[#222] p-12 rounded-3xl border border-[#333] relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join the fastest growing community today and unlock the full potential of your viewing experience.</p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-gray-200 transition-colors shadow-xl"
                        >
                            View Plans Again
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                </div>
            </div>
        </div>
    );
}
