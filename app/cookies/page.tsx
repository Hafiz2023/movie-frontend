'use client';

import React from 'react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';

export default function CookiePolicyPage() {
    return (
        <InfoPageLayout title="Cookie Policy">
            <p className="lead">
                This Cookie Policy explains how MovieApp uses cookies and similar technologies to recognize you when you visit our website.
            </p>

            <h3>What are cookies?</h3>
            <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h3>Why do we use cookies?</h3>
            <p>
                We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
            </p>

            <h3>Types of Cookies We Use</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Strictly Necessary Cookies:</strong> These are cookies that are required for the operation of our website.</li>
                <li><strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
                <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website.</li>
                <li><strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed.</li>
            </ul>

            <h3>Controlling Cookies</h3>
            <p>
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website although your access to some functionality and areas of our website may be restricted.
            </p>
        </InfoPageLayout>
    );
}
