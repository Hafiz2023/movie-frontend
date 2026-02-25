'use client';

import React from 'react';
import Image from 'next/image';

const FooterBottom = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-muted-foreground/60">
            <div className="flex flex-col gap-1 items-center md:items-start">
                <p>&copy; {currentYear} MovieApp. All rights reserved.</p>
                <p>Designed for premium experience.</p>
            </div>

            <div className="flex gap-4">
                <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="Mastercard" />
                <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" />
                <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" />
            </div>

            <p className="max-w-md text-center md:text-right leading-relaxed">
                All models appearing on this website are 18 years or older.
                By entering this site you swear that you are of legal age in your area to view adult material.
            </p>
        </div>
    );
};

function PaymentIcon({ src, alt }: { src: string; alt: string }) {
    return (
        <Image
            src={src}
            alt={alt}
            width={60}
            height={16}
            className="h-4 w-auto opacity-50 grayscale hover:grayscale-0 transition-all pointer-events-none"
            unoptimized
        />
    );
}

export default FooterBottom;

