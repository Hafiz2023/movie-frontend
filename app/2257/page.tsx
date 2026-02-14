'use client';

import React from 'react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';

export default function ExemptionPage() {
    return (
        <InfoPageLayout title="18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement">
            <p className="lead">
                Compliance with 18 U.S.C. § 2257
            </p>

            <p>
                All models, actors, actresses and other persons that appear in any visual depiction of actual or simulated sexually explicit conduct appearing on or otherwise contained in this website were over the age of eighteen (18) years at the time the visual depiction was produced.
            </p>

            <p>
                With respect to all visual depictions of actual or simulated sexually explicit conduct appearing on this website, the records required by 18 U.S.C. § 2257 and 28 C.F.R. § 75 are kept by the custodian of records for each respective content producer.
            </p>

            <h3>Custodian of Records</h3>
            <p>
                The primary custodian of records for content not produced by third parties is:
            </p>
            <div className="bg-secondary/30 p-6 rounded-lg border border-border my-4">
                <strong>MovieApp Records Dept.</strong><br />
                123 Compliance Way<br />
                Los Angeles, CA 90028<br />
                United States
            </div>

            <p>
                For content produced by third parties, please refer to the individual 2257 exemption statement on the producer's website, or contact us for assistance in locating the custodian of records for a specific video.
            </p>
        </InfoPageLayout>
    );
}
