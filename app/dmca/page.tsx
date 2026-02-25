'use client';

import React from 'react';
import InfoPageLayout from '@/components/layout/InfoPageLayout';

export default function DmcaPage() {
    return (
        <InfoPageLayout title="DMCA Policy">
            <p className="lead">Digital Millennium Copyright Act Notice</p>

            <h3>1. Policy</h3>
            <p>
                MovieApp respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (&quot;DMCA&quot;), we will respond expeditiously to claims of copyright infringement committed using the MovieApp website.
            </p>

            <h3>2. Reporting Copyright Infringement</h3>
            <p>
                If you are a copyright owner, or are authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the Site by completing the following DMCA Notice of Alleged Infringement and delivering it to our Designated Copyright Agent.
            </p>

            <div className="bg-secondary/30 p-6 rounded-lg border border-border my-8">
                <h4 className="font-bold mb-4">DMCA Notice of Alleged Infringement (&quot;Notice&quot;)</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Identify the copyrighted work that you claim has been infringed.</li>
                    <li>Identify the material that you claim is infringing (or to be the subject of infringing activity) and that is to be removed or access to which is to be disabled.</li>
                    <li>Provide your mailing address, telephone number, and, if available, email address.</li>
                    <li>Include both of the following statements in the body of the Notice:
                        <ul className="list-disc list-inside ml-4 mt-1 text-muted-foreground">
                            <li>&quot;I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use).&quot;</li>
                            <li>&quot;I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed.&quot;</li>
                        </ul>
                    </li>
                    <li>Provide your full legal name and your electronic or physical signature.</li>
                </ol>
            </div>

            <h3>3. Counter-Notice</h3>
            <p>
                If you believe that your content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner&apos;s agent, or pursuant to the law, to post and use the material in your content, you may send a counter-notice containing the following information to the Copyright Agent.
            </p>

            <h3>4. Designated Copyright Agent</h3>
            <p>
                MovieApp Copyright Agent<br />
                Email: <a href="mailto:dmca@movieapp.com" className="text-primary hover:underline">dmca@movieapp.com</a>
            </p>
        </InfoPageLayout>
    );
}
