
import React from 'react';
import { Shield } from 'lucide-react';

interface OrderSummaryProps {
    planName: string;
    cycle: string;
    price: number | string;
}

export default function OrderSummary({ planName, cycle, price }: OrderSummaryProps) {
    return (
        <div className="bg-[#111] p-6 h-fit rounded-xl border border-[#333] sticky top-24">
            <h3 className="font-bold text-xl mb-6">Order Summary</h3>

            <div className="flex justify-between mb-4 pb-4 border-b border-[#222]">
                <div>
                    <div className="font-bold text-white">{planName} Plan</div>
                    <div className="text-xs text-gray-500 capitalize">{cycle} Billing</div>
                </div>
                <div className="font-bold">${price}</div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span>${price}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                    <span>Tax (0%)</span>
                    <span>$0.00</span>
                </div>
            </div>

            <div className="flex justify-between text-lg font-bold text-white pt-4 border-t border-[#222] mb-6">
                <span>Total Due</span>
                <span className="text-primary">${price}</span>
            </div>

            <div className="text-xs text-gray-500 leading-relaxed bg-[#1a1a1a] p-3 rounded">
                <Shield className="w-3 h-3 inline mr-1" />
                By proceeding, you agree to our Terms of Service. Your subscription will renew automatically.
            </div>
        </div>
    );
}
