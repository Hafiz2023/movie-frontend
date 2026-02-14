'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, CreditCard, User, Mail, Smartphone, ArrowRight, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const PLANS = {
    'fan': { name: 'Fan Club', price: 9.99 },
    'vip': { name: 'VIP Access', price: 29.99 },
    'basic': { name: 'Basic', price: 0 }
};

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const planId = searchParams.get('plan') || 'vip';
    const cycle = searchParams.get('cycle') || 'monthly';

    // @ts-ignore
    const selectedPlan = PLANS[planId] || PLANS['vip'];
    const finalPrice = cycle === 'yearly' ? (selectedPlan.price * 10).toFixed(2) : selectedPlan.price;

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock API Call
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    plan: selectedPlan.name,
                    price: finalPrice,
                    cycle: cycle,
                    paymentMethod: paymentMethod,
                    user: formData
                })
            });

            if (res.ok) {
                toast.success('Payment Successful! Welcome to Premium.');
                // In a real app, redirect or update user session
            } else {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-3xl font-bold mb-6">Checkout</h1>

                    {/* Steps Indicator */}
                    <div className="flex items-center gap-4 mb-8 text-sm">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-gray-500'}`}>
                            <div className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-black font-bold text-xs">1</div>
                            Personal Info
                        </div>
                        <div className="w-12 h-0.5 bg-[#333]" />
                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-gray-500'}`}>
                            <div className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-black font-bold text-xs">2</div>
                            Payment
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={(e) => { e.preventDefault(); setStep(2); }}
                                className="space-y-4"
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#111] border border-[#333] rounded-lg py-3 px-4 pl-10 focus:border-primary outline-none transition-colors"
                                                placeholder="John Doe"
                                            />
                                            <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400">Email Address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#111] border border-[#333] rounded-lg py-3 px-4 pl-10 focus:border-primary outline-none transition-colors"
                                                placeholder="john@example.com"
                                            />
                                            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">Phone Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#111] border border-[#333] rounded-lg py-3 px-4 pl-10 focus:border-primary outline-none transition-colors"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                        <Smartphone className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors mt-4 flex items-center justify-center gap-2"
                                >
                                    Continue to Payment <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.form>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="font-bold text-lg mb-4">Select Payment Method</h3>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {[
                                        { id: 'card', name: 'Credit Card', icon: CreditCard },
                                        { id: 'easypaisa', name: 'EasyPaisa', icon: Smartphone }, // Mock icon
                                        { id: 'jazzcash', name: 'JazzCash', icon: Smartphone }, // Mock icon
                                    ].map(method => (
                                        <button
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === method.id
                                                ? 'bg-primary/10 border-primary text-primary'
                                                : 'bg-[#111] border-[#333] text-gray-400 hover:border-gray-500'
                                                }`}
                                        >
                                            <method.icon className="w-6 h-6" />
                                            <span className="text-xs font-bold">{method.name}</span>
                                        </button>
                                    ))}
                                </div>

                                {paymentMethod === 'card' && (
                                    <form onSubmit={handlePayment} className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            className="w-full bg-[#111] border border-[#333] rounded-lg py-3 px-4 focus:border-primary outline-none"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full bg-[#111] border border-[#333] rounded-lg py-3 px-4 focus:border-primary outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVC"
                                                className="w-full bg-[#111] border border-[#333] rounded-lg py-3 px-4 focus:border-primary outline-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            {loading ? 'Processing...' : `Pay $${finalPrice}`}
                                        </button>
                                    </form>
                                )}

                                {(paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && (
                                    <div className="bg-[#111] p-6 rounded-xl border border-[#333] text-center">
                                        <p className="mb-4 text-gray-400 text-sm">Please send <strong>${finalPrice}</strong> to the following number:</p>
                                        <div className="text-2xl font-bold text-primary mb-2">0300-1234567</div>
                                        <p className="text-xs text-gray-500 mb-6">Account Title: Movie App Inc.</p>

                                        <input
                                            type="text"
                                            placeholder="Enter 11-digit Transaction ID"
                                            className="w-full bg-[#222] border border-[#333] rounded-lg py-3 px-4 focus:border-primary outline-none mb-4 text-center"
                                        />
                                        <button
                                            onClick={handlePayment}
                                            disabled={loading}
                                            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-lg transition-colors"
                                        >
                                            {loading ? 'Verifying...' : 'Verify Payment'}
                                        </button>
                                    </div>
                                )}

                                <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-white underline">
                                    Back to Personal Info
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Order Summary */}
                <div className="bg-[#111] p-6 h-fit rounded-xl border border-[#333] sticky top-24">
                    <h3 className="font-bold text-xl mb-6">Order Summary</h3>

                    <div className="flex justify-between mb-4 pb-4 border-b border-[#222]">
                        <div>
                            <div className="font-bold text-white">{selectedPlan.name} Plan</div>
                            <div className="text-xs text-gray-500 capitalize">{cycle} Billing</div>
                        </div>
                        <div className="font-bold">${finalPrice}</div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Subtotal</span>
                            <span>${finalPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Tax (0%)</span>
                            <span>$0.00</span>
                        </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold text-white pt-4 border-t border-[#222] mb-6">
                        <span>Total Due</span>
                        <span className="text-primary">${finalPrice}</span>
                    </div>

                    <div className="text-xs text-gray-500 leading-relaxed bg-[#1a1a1a] p-3 rounded">
                        <Shield className="w-3 h-3 inline mr-1" />
                        By proceeding, you agree to our Terms of Service. Your subscription will renew automatically.
                    </div>
                </div>
            </div>
        </div>
    );
}
