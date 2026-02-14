import React from 'react';
import Link from 'next/link';
import { Flame, Star, Shield, HelpCircle, Twitter, Instagram, Facebook, Send, Globe, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-card border-t border-border mt-auto relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-primary/20 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center tracking-tighter group w-fit">
                            <span className="text-foreground font-bold text-4xl mr-1 tracking-tight">MOVIE</span>
                            <span className="bg-primary text-primary-foreground font-bold text-4xl px-2 rounded-[6px] flex items-center justify-center shadow-[0_0_20px_rgba(250,157,5,0.4)]">APP</span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed text-sm max-w-sm">
                            The premier destination for high-quality adult entertainment. Detailed scheduling, exclusive content, and a community like no other.
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <SocialIcon icon={Twitter} href="#" label="Twitter" />
                            <SocialIcon icon={Instagram} href="#" label="Instagram" />
                            <SocialIcon icon={Facebook} href="#" label="Facebook" />
                            <SocialIcon icon={Globe} href="#" label="Website" />
                        </div>

                        <div className="flex flex-wrap gap-2 text-[10px] items-center text-muted-foreground mt-4 font-mono uppercase tracking-wider">
                            <span className="border border-border/50 bg-secondary/30 px-2 py-1 rounded text-primary">RTA</span>
                            <span>Restricted to Adults 18+</span>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-foreground font-extrabold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full"></span>
                            Information
                        </h4>
                        <ul className="space-y-3 text-muted-foreground text-sm font-medium">
                            <li><FooterLink href="/about">About Us</FooterLink></li>
                            <li><FooterLink href="/terms">Terms & Conditions</FooterLink></li>
                            <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
                            <li><FooterLink href="/dmca">DMCA</FooterLink></li>
                            <li><FooterLink href="/2257">2257 Exemption</FooterLink></li>
                            <li><FooterLink href="/cookies">Cookie Policy</FooterLink></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-foreground font-extrabold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full"></span>
                            Work With Us
                        </h4>
                        <ul className="space-y-3 text-muted-foreground text-sm font-medium">
                            <li><FooterLink href="/contact">Content Partners</FooterLink></li>
                            <li><FooterLink href="/contact">Advertise</FooterLink></li>
                            <li><FooterLink href="/contact">Webmasters</FooterLink></li>
                            <li><FooterLink href="/contact">Model Program</FooterLink></li>
                            <li><FooterLink href="/press">Press</FooterLink></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-foreground font-extrabold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full"></span>
                            Support
                        </h4>
                        <ul className="space-y-3 text-muted-foreground text-sm font-medium">
                            <li><FooterLink href="/contact">Feedback</FooterLink></li>
                            <li><FooterLink href="/faq">FAQ</FooterLink></li>
                            <li><FooterLink href="/contact">Contact Support</FooterLink></li>
                            <li><FooterLink href="/billing">Billing</FooterLink></li>
                            <li><FooterLink href="/trust">Trust & Safety</FooterLink></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-foreground font-extrabold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            Newsletter
                        </h4>
                        <p className="text-xs text-muted-foreground">Subscribe for weekly updates and exclusive offers.</p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                            />
                            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs py-2 rounded-lg transition-all shadow-lg shadow-primary/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Popular Searches */}
                <div className="border-t border-border pt-8 mb-8">
                    <h4 className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mb-4 opacity-70">Trending Searches</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Big Buck Bunny', 'Sintel', 'Action Movies', '4K Trailers', 'Comedy Shorts', 'Trending Now', 'Viral Videos', 'New Releases', 'Top Rated', 'Most Viewed', 'Verified Amateurs', 'Exclusive', 'VR Content', 'Live Cams'].map((tag, i) => (
                            <Link key={i} href={`/search?q=${tag}`} className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4">
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-muted-foreground/60">
                    <div className="flex flex-col gap-1 items-center md:items-start">
                        <p>&copy; {currentYear} MovieApp. All rights reserved.</p>
                        <p>Designed for premium experience.</p>
                    </div>

                    <div className="flex gap-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                    </div>

                    <p className="max-w-md text-center md:text-right leading-relaxed">
                        All models appearing on this website are 18 years or older.
                        By entering this site you swear that you are of legal age in your area to view adult material.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="hover:text-primary transition-all hover:translate-x-1 inline-block">
            {children}
        </Link>
    );
}

function SocialIcon({ icon: Icon, href, label }: { icon: any, href: string, label: string }) {
    return (
        <Link href={href} aria-label={label} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-primary/50">
            <Icon className="w-4 h-4" />
        </Link>
    );
}
