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
    const { user, isAuthenticated, _hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!_hasHydrated) return;

        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        if (requiredRole && user?.role !== requiredRole) {
            router.push('/');
        }
    }, [_hasHydrated, isAuthenticated, user, requiredRole, router]);

    if (!_hasHydrated) {
        return <Loader />;
    }

    // While redirecting, show loader or nothing
    if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
        return <Loader />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
