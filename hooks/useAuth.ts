import useAuthStore from '@/store/authStore';
import { useCallback } from 'react';

export const useAuth = () => {
    const { user, token, isAuthenticated, login, logout, _hasHydrated } = useAuthStore();

    const isAdmin = useCallback(() => {
        return user?.role === 'admin';
    }, [user]);

    const isPremium = useCallback(() => {
        return user?.role === 'admin' || user?.role === 'creator';
    }, [user]);

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        isAdmin: isAdmin(),
        isPremium: isPremium(),
        isLoaded: _hasHydrated,
    };
};
