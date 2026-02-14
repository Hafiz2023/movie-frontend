'use client';

import React from 'react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';

export default function PrivacyPage() {
    return (
        <InfoPageLayout title="Privacy Policy">
            <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.</p>

            <h3>1. Information We Collect</h3>
            <p>
                We gather information about how visitors use our website to improve their experience. This includes data such as IP addresses, browser types, and viewing history (if logged in).
            </p>

            <h3>2. Use of Information</h3>
            <p>
                We use the collected information to:
            </p>
            <ul>
                <li>Provide and maintain our services</li>
                <li>Analyze usage patterns and trends</li>
                <li>Personalize content recommendations</li>
                <li>Detect and prevent fraud</li>
            </ul>

            <h3>3. Cookies</h3>
            <p>
                We use cookies to improve your user experience. Cookies help us remember your preferences and keep you logged in. You can control cookie settings through your browser.
            </p>

            <h3>4. Third-Party Services</h3>
            <p>
                We may use third-party analytics and advertising services. These third parties may collect information about your use of the site.
            </p>

            <h3>5. Security</h3>
            <p>
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h3>6. Contact Us</h3>
            <p>
                If you have questions about this Privacy Policy, please contact us.
            </p>
        </InfoPageLayout>
    );
}
