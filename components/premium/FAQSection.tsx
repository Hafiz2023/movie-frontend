'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
    { q: "Can I cancel anytime?", a: "Yes! You can cancel your subscription at any time. Your access will remain active until the end of your billing period." },
    { q: "Is the payment secure?", a: "Absolutely. We use industry-standard encryption (SSL) and process payments securely via Stripe." },
    { q: "What is 4K Ultra HD?", a: "4K offers four times the resolution of standard HD, providing crystal clear visuals for the ultimate viewing experience." },
];

export const FAQSection = () => {
    return (
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
    );
};
