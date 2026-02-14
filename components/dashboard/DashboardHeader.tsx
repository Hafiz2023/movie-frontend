
'use client';

import React from 'react';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardHeader() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const displayUser = user || { name: 'Guest User', email: 'guest@example.com' };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-background shadow-md">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="text-lg">U</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{displayUser.name}</h1>
                    <p className="text-muted-foreground">{displayUser.email}</p>
                    <div className="flex gap-2 mt-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            Premium Member
                        </span>
                        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                            Member since 2024
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => {
                    logout();
                    router.push('/');
                    toast.info('Signed out successfully');
                }}>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </Button>
                <Button className="gap-2" onClick={() => toast.info('Upgrade plan feature coming soon!')}>
                    <Shield className="w-4 h-4" />
                    Upgrade Plan
                </Button>
            </div>
        </div>
    );
}

