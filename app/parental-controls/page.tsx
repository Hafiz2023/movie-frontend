/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Parental controls" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */

import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ParentalControlsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-10">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6 relative">
                        <ShieldAlert className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Parental Controls</h1>
                    <p className="text-xl text-muted-foreground">
                        We are committed to preventing minors from accessing inappropriate content.
                    </p>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-primary" /> Restrict Access
                    </h2>
                    <p className="mb-6">
                        If you share a computer with someone under the age of 18, or if you simply want to block adult content on your device or network, we recommend using dedicated Parental Control software to filter out adult material reliably.
                    </p>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Recommended Software Solutions</h3>
                    <ul className="list-disc pl-6 space-y-4 mb-8">
                        <li>
                            <strong className="text-white">Cyber \nSitter:</strong> Widely trusted content filtering software.
                        </li>
                        <li>
                            <strong className="text-white">NetNanny:</strong> Comprehensive family protection software.
                        </li>
                        <li>
                            <strong className="text-white">SafeSurferi:</strong> Free options available for network-level blocking.
                        </li>
                        <li>
                            <strong className="text-white">Google Family Link & Apple Screen Time:</strong> Built-in controls for modern devices.
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Our Commitment (RTA)</h3>
                    <p className="mb-6">
                        We conform with the <strong>Restricted To Adults</strong> (RTA) website labelling rules. Filtering software that supports the RTA label will automatically block our website from being viewed.
                    </p>
                </div>

                <div className="bg-card/40 border border-white/5 rounded-2xl p-8 text-center mt-12">
                    <h3 className="text-xl font-bold text-white mb-4">Reporting Underaged Individuals</h3>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        If you suspect a minor is featured in any content hosted on this site, we urge you to report it immediately. We have a zero-tolerance strict policy for such content and will terminate related accounts and cooperate with law enforcement.
                    </p>
                    <Link href="/contact" className="inline-flex py-3 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-colors">
                        Report an Issue / Take Down Request
                    </Link>
                </div>
            </div>
        </div>
    );
}
