'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react';

export const ContactInfo = () => {
    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Us',
            description: 'Our friendly team is here to help.',
            value: 'support@movie.com',
            link: 'mailto:support@movie.com'
        },
        {
            icon: MessageSquare,
            title: 'Live Chat',
            description: 'Available for VIP members.',
            value: 'Start a chat',
            link: '#'
        },
        {
            icon: MapPin,
            title: 'Office',
            description: 'Come say hello at our office HQ.',
            value: '100 Smith Street, Melbourne VIC 3000 AU',
            link: '#'
        },
        {
            icon: Clock,
            title: 'Working Hours',
            description: 'We are available 24/7.',
            value: 'Mon-Sun: 24 Hours',
            link: null
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
        >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactMethods.map((method, idx) => (
                    <div
                        key={idx}
                        className="bg-[#111] border border-[#222] p-6 rounded-2xl hover:border-primary/30 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-primary mb-4 group-hover:bg-primary/10 transition-colors">
                            <method.icon className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg mb-1">{method.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                        {method.link ? (
                            <a href={method.link} className="font-bold text-white hover:text-primary transition-colors inline-flex items-center gap-1">
                                {method.value}
                            </a>
                        ) : (
                            <span className="font-bold text-white">{method.value}</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Additional Help */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] p-8 rounded-3xl border border-[#222] text-center mt-4">
                <h4 className="text-xl font-bold mb-2">Need immediate help?</h4>
                <p className="text-gray-400 text-sm mb-6">Check out our Knowledge Base for quick answers to common questions.</p>
                <a href="/faq" className="inline-block bg-[#222] hover:bg-[#333] text-white font-bold py-3 px-6 rounded-xl border border-[#333] transition-colors text-sm">
                    Visit Knowledge Base
                </a>
            </div>
        </motion.div>
    );
};
