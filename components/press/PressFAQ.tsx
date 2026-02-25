'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const PRESS_FAQS = [
    {
        q: 'How can I request an interview with a MovieApp executive?',
        a: 'Please send your interview request to our press team via the contact form or email press@movieapp.com. Include your publication, deadline, and topic of interest. We typically respond within 24 hours.',
    },
    {
        q: 'Can I use MovieApp logos and screenshots in my article?',
        a: 'Yes! Our brand assets are available for download in the Media Kit section above. Please follow the guidelines included in the brand guideline document for proper usage.',
    },
    {
        q: 'Where can I find MovieApp company statistics?',
        a: 'Key company statistics are available on this page and in our downloadable Fact Sheet. For additional data or specific metrics, please contact our press team directly.',
    },
    {
        q: 'Does MovieApp offer exclusive quotes for press?',
        a: 'We are happy to provide official statements and executive quotes for accredited media. Please reach out with your publication details and article context.',
    },
    {
        q: 'How do I get added to the MovieApp press mailing list?',
        a: 'Contact our press team with your name, publication, and email address. We\'ll add you to our list for all future press releases and announcements.',
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export const PressFAQ = () => {
    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-card/30 to-transparent">
            <div className="container mx-auto px-4 max-w-3xl">
                <motion.div {...fadeInUp} className="text-center mb-14">
                    <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">
                        Questions
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        Press FAQ
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {PRESS_FAQS.map((faq, i) => (
                        <motion.div
                            key={faq.q}
                            {...fadeInUp}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/20 transition-all duration-300"
                        >
                            <details className="group/details">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                                    <span className="font-bold text-lg text-foreground pr-4">
                                        {faq.q}
                                    </span>
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-open/details:rotate-180 group-open/details:bg-primary/20">
                                        <ChevronDown className="w-4 h-4 text-primary" />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
