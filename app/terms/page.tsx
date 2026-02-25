'use client';

import React from 'react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';

export default function TermsPage() {
    return (
        <InfoPageLayout title="Terms & Conditions">
            <p className="lead">Please read these Terms and Conditions (&quot;Terms&quot;) carefully before using the MovieApp website.</p>

            <h3>1. Age Restriction</h3>
            <p>
                You must be at least 18 years of age (or the age of majority in your jurisdiction) to access this website. By accessing this website, you certify that you are of legal age to view adult content.
                If you are under the age of 18, you are strictly prohibited from accessing this site.
            </p>

            <h3>2. User Content</h3>
            <p>
                Users may be able to upload content. You agree that any content you upload does not violate any laws or third-party rights. We reserve the right to remove any content at our sole discretion.
            </p>

            <h3>3. Intellectual Property</h3>
            <p>
                The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary rights.
            </p>

            <h3>4. Disclaimer of Warranties</h3>
            <p>
                The website is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no representations or warranties of any kind, express or implied, regarding the operation of the site or the information, content, or materials included.
            </p>

            <h3>5. Limitation of Liability</h3>
            <p>
                To the full extent permissible by applicable law, MovieApp shall not be liable for any damages of any kind arising from the use of this site.
            </p>

            <h3>6. Changes to Terms</h3>
            <p>
                We reserve the right to modify these Terms at any time. Your continued use of the site after any changes indicates your acceptance of the new Terms.
            </p>

            <p className="text-sm text-muted-foreground mt-8">Last Updated: February 2026</p>
        </InfoPageLayout>
    );
}
