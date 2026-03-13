'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

import Sidebar from '@/components/layout/Sidebar/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-[calc(100vh-4rem)] bg-background text-foreground relative">
                <Sidebar />
                <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden pt-6 lg:ml-64 transition-all">
                    <div className="max-w-[1800px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
