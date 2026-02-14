
'use client';

import React from 'react';
import { User, ListVideo, Video, CreditCard, Settings, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import OverviewTab from '@/components/dashboard/OverviewTab';
import LibraryTab from '@/components/dashboard/LibraryTab';
import StudioTab from '@/components/dashboard/StudioTab';
import BillingTab from '@/components/dashboard/BillingTab';
import SettingsTab from '@/components/dashboard/SettingsTab';
import ContactTab from '@/components/dashboard/ContactTab';

export default function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8 ">
            {/* Header Profile Section */}
            <DashboardHeader />

            <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="bg-card w-full justify-start h-auto p-2 gap-2 border border-border overflow-x-auto">
                    <TabsTrigger value="overview" className="gap-2 px-4 py-2">
                        <User className="w-4 h-4" /> Overview
                    </TabsTrigger>
                    <TabsTrigger value="library" className="gap-2 px-4 py-2">
                        <ListVideo className="w-4 h-4" /> My Library
                    </TabsTrigger>
                    <TabsTrigger value="studio" className="gap-2 px-4 py-2">
                        <Video className="w-4 h-4" /> My Studio
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="gap-2 px-4 py-2">
                        <CreditCard className="w-4 h-4" /> Billing & Plan
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2 px-4 py-2">
                        <Settings className="w-4 h-4" /> Settings
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="gap-2 px-4 py-2">
                        <MessageSquare className="w-4 h-4" /> Contact
                    </TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview">
                    <OverviewTab />
                </TabsContent>

                {/* LIBRARY TAB */}
                <TabsContent value="library">
                    <LibraryTab />
                </TabsContent>

                {/* STUDIO TAB */}
                <TabsContent value="studio">
                    <StudioTab />
                </TabsContent>

                {/* BILLING TAB */}
                <TabsContent value="billing">
                    <BillingTab />
                </TabsContent>

                {/* SETTINGS TAB */}
                <TabsContent value="settings">
                    <SettingsTab />
                </TabsContent>

                {/* CONTACT TAB */}
                <TabsContent value="contact">
                    <ContactTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
