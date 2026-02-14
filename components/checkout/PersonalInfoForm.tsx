
import React from 'react';
import { User, Mail, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PersonalInfoFormProps {
    formData: {
        name: string;
        email: string;
        phone: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNext: () => void;
}

export default function PersonalInfoForm({ formData, onChange, onNext }: PersonalInfoFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <motion.form
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit}
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
                            onChange={onChange}
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
                            onChange={onChange}
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
                        onChange={onChange}
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
    );
}
