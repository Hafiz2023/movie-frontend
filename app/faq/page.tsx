'use client';

import React from 'react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


export default function FAQPage() {
    return (
        <InfoPageLayout title="Frequently Asked Questions">
            <p className="lead mb-8">
                Find answers to common questions about MovieApp, our premium services, and account management.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border border-border/50 rounded-lg px-4 bg-secondary/10">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-primary">Is MovieApp really free?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        Yes! You can watch thousands of videos for free. We also offer a Premium subscription that unlocks exclusive 4K content, removes ads, and provides faster streaming speeds.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-border/50 rounded-lg px-4 bg-secondary/10">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-primary">How do I cancel my subscription?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        You can cancel your subscription at any time from your Account Settings page under the &quot;Billing&quot; tab. Your access will continue until the end of your current billing period.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-border/50 rounded-lg px-4 bg-secondary/10">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-primary">Why is the video buffering?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        Buffering can happen due to a slow internet connection. We recommend a speed of at least 5 Mbps for HD content and 25 Mbps for 4K content. Try lowering the video quality if you&apos;re experiencing issues.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-border/50 rounded-lg px-4 bg-secondary/10">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-primary">Is my payment information secure?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        Absolutely. We use industry-standard encryption and processed by secure payment gateways like Stripe and PayPal. We do not store your full card details on our servers.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border border-border/50 rounded-lg px-4 bg-secondary/10">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-primary">How do I upload videos?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        To upload videos, you need to apply for our Content Partner Program or verify your account as an Amateur model. Once verified, you&apos;ll see an &quot;Upload&quot; button in your dashboard.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </InfoPageLayout>
    );
}
