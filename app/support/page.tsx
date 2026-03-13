import React from 'react';
import { HelpCircle, Mail, MessageSquare, PhoneCall } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <HelpCircle className="w-16 h-16 text-primary mb-4" />
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">Help & Support</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        We are here 24/7 to help you with any questions or issues. Explore our knowledge base or contact our team directly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-card/40 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors">
                        <Mail className="w-8 h-8 text-primary mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Email Support</h2>
                        <p className="text-muted-foreground mb-6">
                            Drop us an email anytime and our team will get back to you within 24 hours.
                        </p>
                        <a href="mailto:support@example.com" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                            support@example.com
                        </a>
                    </div>

                    <div className="bg-card/40 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors">
                        <MessageSquare className="w-8 h-8 text-primary mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Live Chat</h2>
                        <p className="text-muted-foreground mb-6">
                            Talk to our support team right now via our secure, anonymous live chat (Premium Members).
                        </p>
                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors font-bold">
                            Start Chat
                        </button>
                    </div>

                    <div className="bg-card/40 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors">
                        <PhoneCall className="w-8 h-8 text-primary mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Billing & Payments</h2>
                        <p className="text-muted-foreground mb-6">
                            Need help with a charge on your card, an active subscription, or invoice queries?
                        </p>
                        <a href="/billing" className="text-primary hover:underline font-medium">Go to Billing Portal &rarr;</a>
                    </div>

                    <div className="bg-card/40 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors">
                        <HelpCircle className="w-8 h-8 text-primary mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">FAQ & Knowledge Base</h2>
                        <p className="text-muted-foreground mb-6">
                            Browse quick answers about your account, features, and site settings.
                        </p>
                        <a href="/faq" className="text-primary hover:underline font-medium">Read FAQs &rarr;</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
