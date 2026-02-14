
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CreditCard } from 'lucide-react';
import { LiveStream } from '@/types';

interface SubscriptionModalProps {
    stream: LiveStream | null;
    onClose: () => void;
}

export default function SubscriptionModal({ stream, onClose }: SubscriptionModalProps) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    if (!stream) return null;

    const getPrice = (basePrice: number) => {
        if (billingCycle === 'monthly') return basePrice;
        return (basePrice * 10).toFixed(2); // 12 months for price of 10
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Modal Header with Profile */}
                    <div className="relative h-32 bg-gradient-to-b from-primary/20 to-background">
                        <Image src={stream.thumbnail} alt="cover" fill className="object-cover opacity-20" />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full border-4 border-background overflow-hidden relative shadow-xl">
                                <Image src={stream.thumbnail} alt="avatar" fill className="object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 pb-8 px-6 text-center">
                        <h2 className="text-2xl font-bold text-foreground mb-1">{stream.user}</h2>
                        <div className="flex justify-center gap-2 mb-6">
                            {stream.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded border border-border">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-lg font-bold text-muted-foreground mb-4">Choose Your Access Plan</h3>

                        {/* Billing Toggle */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-secondary p-1 rounded-lg flex items-center">
                                <button
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-background text-foreground shadow' : 'text-muted-foreground'}`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle('yearly')}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${billingCycle === 'yearly' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
                                >
                                    Yearly (-20%)
                                </button>
                            </div>
                        </div>

                        {/* Plan Card */}
                        <div className="bg-gradient-to-br from-card to-background border border-primary/30 rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors mb-6 text-left">
                            <div className="absolute top-0 right-0 bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                RECOMMENDED
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="font-bold text-foreground text-lg">Premium Access</div>
                                    <div className="text-xs text-muted-foreground">Unlock current stream & archives</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-primary">
                                        ${getPrice(stream.price)}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground">
                                        / {billingCycle === 'monthly' ? 'month' : 'year'}
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-2 mb-0">
                                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-primary" /> 1080p / 4K Stream Quality
                                </li>
                                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-primary" /> Ad-free Experience
                                </li>
                                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-primary" /> Private Chat Badge
                                </li>
                            </ul>
                        </div>

                        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20">
                            <CreditCard className="w-4 h-4" />
                            Proceed to Payment
                        </button>
                        <p className="text-[10px] text-muted-foreground/60 mt-4">
                            Recurring billing. Cancel anytime. Secure payment via Stripe.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
