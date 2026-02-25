'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export const MediaContact = () => {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-card to-card/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.08] via-transparent to-transparent" />

            {/* Top/bottom borders */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
                <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
                    {/* Icon with pulse ring */}
                    <div className="relative inline-flex mb-8">
                        <div className="absolute inset-0 animate-ping bg-primary/20 rounded-2xl" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        Media Inquiries
                    </h2>
                    <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
                        For press inquiries, interview requests, or media kits, please
                        reach out to our press team. We typically respond within 24
                        hours.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="gap-2.5 font-bold w-full sm:w-auto group"
                            >
                                <Mail className="w-4 h-4" />
                                Contact Press Team
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2.5 w-full sm:w-auto border-border/60 hover:border-primary/30"
                        >
                            <Download className="w-4 h-4" />
                            Download Media Kit
                        </Button>
                    </div>

                    {/* Email shortcut */}
                    <p className="mt-8 text-sm text-muted-foreground">
                        Or email us directly at{' '}
                        <a
                            href="mailto:press@movieapp.com"
                            className="text-primary hover:underline font-semibold"
                        >
                            press@movieapp.com
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
