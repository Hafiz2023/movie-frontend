'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Loader from './Loader';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        // Check if hydration is complete and state is restored
        // Since zustand persist is async somewhat (sync in localstorage but hydration happens after mount)
        // We wait a bit or just assume hydration.
        // The persist middleware usually restores state synchronously if using localStorage before mount? No.
        // Zustand persist restores asynchronously in some versions.
        // But since we use `create(persist(...))`, the state might be ready on mount?
        // Let's assume standard behavior.

        const checkAuth = () => {
            // Simple check
            if (!isAuthenticated) {
                router.push('/login');
                return;
            }

            if (requiredRole && user?.role !== requiredRole) {
                router.push('/'); // Unauthorized
                return;
            }

            setLoading(false);
        };

        // Small timeout to allow zustand to hydrate if needed
        const timeout = setTimeout(checkAuth, 100);
        return () => clearTimeout(timeout);

    }, [isAuthenticated, user, requiredRole, router]);

    if (loading) {
        return <Loader />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
