import React from 'react';
import { CreditCard } from 'lucide-react';

export default function SubscriptionPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
                <CreditCard className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Subscription Plans</h1>
            <p className="text-gray-400 max-w-md mx-auto">
                Upgrade to Premium to access exclusive content and remove ads.
            </p>
            {/* Add pricing plans here */}
        </div>
    );
}
