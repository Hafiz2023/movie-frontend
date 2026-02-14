
import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentSectionProps {
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    handlePayment: (e: React.FormEvent) => void;
    loading: boolean;
    finalPrice: string | number;
    onBack: () => void;
}

export default function PaymentSection({
    paymentMethod,
    setPaymentMethod,
    handlePayment,
    loading,
    finalPrice,
    onBack
}: PaymentSectionProps) {

    const methods = [
        { id: 'card', name: 'Credit Card', icon: CreditCard },
        { id: 'easypaisa', name: 'EasyPaisa', icon: Smartphone },
        { id: 'jazzcash', name: 'JazzCash', icon: Smartphone },
    ];

    return (
        <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <h3 className="font-bold text-lg mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
                {methods.map(method => (
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
                        required
                        className="w-full bg-[#111] border border-[#333] rounded-lg py-3 px-4 focus:border-primary outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="MM/YY"
                            required
                            className="w-full bg-[#111] border border-[#333] rounded-lg py-3 px-4 focus:border-primary outline-none"
                        />
                        <input
                            type="text"
                            placeholder="CVC"
                            required
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

            <button onClick={onBack} className="text-sm text-gray-500 hover:text-white underline">
                Back to Personal Info
            </button>
        </motion.div>
    );
}
