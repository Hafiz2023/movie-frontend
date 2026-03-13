
'use client';

import React from 'react';
import { User, ListVideo, Video, CreditCard, Settings, MessageSquare, DollarSign, Mail, Users, LineChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import OverviewTab from '@/components/dashboard/OverviewTab';
import LibraryTab from '@/components/dashboard/LibraryTab';
import StudioTab from '@/components/dashboard/StudioTab';
import BillingTab from '@/components/dashboard/BillingTab';
import SettingsTab from '@/components/dashboard/SettingsTab';
import ContactTab from '@/components/dashboard/ContactTab';
import EarningsTab from '@/components/dashboard/EarningsTab';
import MessagesTab from '@/components/dashboard/MessagesTab';
import FansTab from '@/components/dashboard/FansTab';
import AnalyticsTab from '@/components/dashboard/AnalyticsTab';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header Profile Section */}
            <DashboardHeader />

            <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="bg-card/40 backdrop-blur-md w-full justify-start h-auto p-2 gap-2 border border-white/10 rounded-xl overflow-x-auto no-scrollbar shadow-xl">
                    <TabsTrigger value="overview" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <User className="w-4 h-4" /> <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger value="library" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <ListVideo className="w-4 h-4" /> <span className="hidden sm:inline">My Library</span>
                    </TabsTrigger>
                    <TabsTrigger value="studio" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <Video className="w-4 h-4" /> <span className="hidden sm:inline">My Studio</span>
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <CreditCard className="w-4 h-4" /> <span className="hidden sm:inline">Billing & Plan</span>
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <Settings className="w-4 h-4" /> <span className="hidden sm:inline">Settings</span>
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <MessageSquare className="w-4 h-4" /> <span className="hidden sm:inline">Contact</span>
                    </TabsTrigger>

                    {/* New Tabs */}
                    <TabsTrigger value="earnings" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <DollarSign className="w-4 h-4" /> <span className="hidden sm:inline">Earnings</span>
                    </TabsTrigger>
                    <TabsTrigger value="messages" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <Mail className="w-4 h-4" /> <span className="hidden sm:inline">Messages</span>
                    </TabsTrigger>
                    <TabsTrigger value="fans" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <Users className="w-4 h-4" /> <span className="hidden sm:inline">Fans</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="gap-2 px-5 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-white/5">
                        <LineChart className="w-4 h-4" /> <span className="hidden sm:inline">Analytics</span>
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

                {/* EARNINGS TAB */}
                <TabsContent value="earnings">
                    <EarningsTab />
                </TabsContent>

                {/* MESSAGES TAB */}
                <TabsContent value="messages">
                    <MessagesTab />
                </TabsContent>

                {/* FANS TAB */}
                <TabsContent value="fans">
                    <FansTab />
                </TabsContent>

                {/* ANALYTICS TAB */}
                <TabsContent value="analytics">
                    <AnalyticsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
