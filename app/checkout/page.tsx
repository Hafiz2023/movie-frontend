
'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import PersonalInfoForm from '@/components/checkout/PersonalInfoForm';
import PaymentSection from '@/components/checkout/PaymentSection';
import OrderSummary from '@/components/checkout/OrderSummary';

const PLANS: Record<string, { name: string; price: number }> = {
    'fan': { name: 'Fan Club', price: 9.99 },
    'vip': { name: 'VIP Access', price: 29.99 },
    'basic': { name: 'Basic', price: 0 }
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const planId = searchParams.get('plan') || 'vip';
    const cycle = searchParams.get('cycle') || 'monthly';

    const selectedPlan = PLANS[planId] || PLANS['vip'];
    const finalPrice = cycle === 'yearly' ? (selectedPlan.price * 10).toFixed(2) : selectedPlan.price;

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('card'); // Default to card to avoid empty state issues

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
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
            console.error(error);
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
                    <CheckoutSteps step={step} />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <PersonalInfoForm
                                formData={formData}
                                onChange={handleInputChange}
                                onNext={() => setStep(2)}
                            />
                        )}

                        {step === 2 && (
                            <PaymentSection
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                handlePayment={handlePayment}
                                loading={loading}
                                finalPrice={finalPrice}
                                onBack={() => setStep(1)}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Order Summary */}
                <OrderSummary
                    planName={selectedPlan.name}
                    cycle={cycle}
                    price={finalPrice}
                />
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading checkout...</div>}>
            <CheckoutContent />
        </React.Suspense>
    );
}
