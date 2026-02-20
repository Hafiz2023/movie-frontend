'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeroSection } from '@/components/premium/HeroSection';
import { BillingToggle } from '@/components/premium/BillingToggle';
import { PricingPlans } from '@/components/premium/PricingPlans';
import { FeaturesSection } from '@/components/premium/FeaturesSection';
import { FAQSection } from '@/components/premium/FAQSection';
import { PremiumCTA } from '@/components/premium/PremiumCTA';

export default function PremiumPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

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
            <HeroSection />

            {/* Billing Toggle */}
            <BillingToggle
                billingCycle={billingCycle}
                setBillingCycle={setBillingCycle}
            />

            {/* Pricing Cards */}
            <PricingPlans
                billingCycle={billingCycle}
                selectedPlan={selectedPlan}
                isProcessing={isProcessing}
                handleSubscribe={handleSubscribe}
            />

            {/* Features Grid */}
            <FeaturesSection />

            {/* FAQs */}
            <FAQSection />

            {/* Bottom CTA */}
            <PremiumCTA />
        </div>
    );
}
