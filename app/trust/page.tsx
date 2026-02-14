'use client';

import React from 'react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';
import { ShieldCheck, UserCheck, EyeOff, Lock } from 'lucide-react';

export default function TrustPage() {
    return (
        <InfoPageLayout title="Trust & Safety">
            <p className="lead text-center max-w-2xl mx-auto mb-12">
                We are committed to maintaining a safe, respectful, and consensual environment for our community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 border border-border rounded-xl bg-card hover:border-primary/50 transition-colors">
                    <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Content Moderation</h3>
                    <p className="text-muted-foreground text-sm">
                        Our dedicated Trust & Safety team reviews content 24/7 to ensure it complies with our strict community guidelines and legal requirements. We use both automated tools and human review.
                    </p>
                </div>

                <div className="p-6 border border-border rounded-xl bg-card hover:border-primary/50 transition-colors">
                    <UserCheck className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Age Verification</h3>
                    <p className="text-muted-foreground text-sm">
                        We strictly enforce age verification for all content creators. Every individual appearing in content on our platform must be verified as 18+ through a government-issued ID.
                    </p>
                </div>

                <div className="p-6 border border-border rounded-xl bg-card hover:border-primary/50 transition-colors">
                    <EyeOff className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Non-Consensual Content</h3>
                    <p className="text-muted-foreground text-sm">
                        We have a zero-tolerance policy for non-consensual content (NCC). Any such content is removed immediately, and verify accounts are permanently banned. We work with industry partners to stop the spread of NCC.
                    </p>
                </div>

                <div className="p-6 border border-border rounded-xl bg-card hover:border-primary/50 transition-colors">
                    <Lock className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Data Privacy</h3>
                    <p className="text-muted-foreground text-sm">
                        Your privacy is paramount. We employ advanced security measures to protect your personal data and do not sell your personal information to third parties.
                    </p>
                </div>
            </div>

            <div className="bg-secondary/20 p-8 rounded-xl text-center">
                <h3 className="text-xl font-bold mb-4">Report an Issue</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    If you see content that violates our policies or makes you uncomfortable, please report it immediately. Our team investigates every report.
                </p>
                <a href="/contact" className="inline-block bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    File a Report
                </a>
            </div>
        </InfoPageLayout>
    );
}
