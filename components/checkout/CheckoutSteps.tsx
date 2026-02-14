
import React from 'react';

interface CheckoutStepsProps {
    step: number;
}

export default function CheckoutSteps({ step }: CheckoutStepsProps) {
    return (
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
    );
}
