'use client';

import React from 'react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';
import { Shield, Lock, CreditCard, CheckCircle } from 'lucide-react';

export default function BillingPage() {
    return (
        <InfoPageLayout title="Billing & Payments">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-secondary/20 p-6 rounded-xl border border-border">
                    <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Payment Methods
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        We accept all major credit cards (Visa, MasterCard, American Express, Discover) and PayPal. For certain regions, we also support local payment methods.
                    </p>
                    <div className="flex gap-2 opacity-70">
                        {/* Icons placeholders or SVGs */}
                        <div className="bg-white/10 p-2 rounded w-10 h-6"></div>
                        <div className="bg-white/10 p-2 rounded w-10 h-6"></div>
                        <div className="bg-white/10 p-2 rounded w-10 h-6"></div>
                    </div>
                </div>

                <div className="bg-secondary/20 p-6 rounded-xl border border-border">
                    <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                        <Lock className="w-5 h-5 text-primary" />
                        Secure Transactions
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        All transactions are processed using 256-bit SSL encryption. Your billing statement will appear discreetly as "M-Billing" or "Premium Service" to protect your privacy.
                    </p>
                </div>
            </div>

            <h3>Billing FAQ</h3>
            <div className="space-y-6 mt-4">
                <div>
                    <h4 className="font-bold text-foreground">When will I be charged?</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                        For monthly subscriptions, you are charged on the same day each month. For annual plans, you are charged once per year on your anniversary date.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-foreground">Can I get a refund?</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                        We offer a 3-day money-back guarantee for first-time subscribers if you are not satisfied with our service. Please contact support to initiate a refund.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-foreground">How do I update my card?</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                        Go to your Account Settings, select the "Billing" tab, and click "Update Payment Method".
                    </p>
                </div>
            </div>
        </InfoPageLayout>
    );
}
