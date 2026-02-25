'use client';

import React from 'react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';

export default function AboutPage() {
    return (
        <InfoPageLayout title="About Us">
            <h3>Who We Are</h3>
            <p>
                MovieApp is a premier destination for high-quality adult entertainment. We are dedicated to providing a distinct and premium viewing experience for our global audience.
                Our platform hosts the world&apos;s largest collection of premium videos, accessible completely free of charge.
            </p>

            <h3>Our Mission</h3>
            <p>
                Our mission is to revolutionize the way adult content is consumed by offering a clean, fast, and feature-rich platform that respects user privacy and safety.
                We believe in providing a safe environment for adults to explore their interests.
            </p>

            <h3>Quality & Innovation</h3>
            <p>
                We leverage cutting-edge streaming technology to deliver 4K and VR content with minimal buffering. Our team works tirelessly to update our library daily with exclusive content from top studios and independent creators.
            </p>

            <h3>Community</h3>
            <p>
                More than just a video site, MovieApp is a community. We encourage responsible interaction and have strict guidelines to ensure a respectful environment for everyone.
            </p>

            <div className="mt-8 p-6 bg-secondary/30 rounded-lg border border-primary/20">
                <h4 className="text-primary font-bold mb-2">Contact Us</h4>
                <p className="text-sm">
                    Have questions? Reach out to our support team at <span className="text-foreground font-semibold">support@movieapp.com</span>
                </p>
            </div>
        </InfoPageLayout>
    );
}
