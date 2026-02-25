'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useAuthStore from '@/store/authStore';
import { User } from '@/types';

interface RegisterFormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreed: boolean;
}

interface RegisterFormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreed?: string;
}

interface UseRegisterFormReturn {
    formState: RegisterFormState;
    errors: RegisterFormErrors;
    loading: boolean;
    isFormValid: boolean;
    passwordStrength: PasswordStrength;
    setField: <K extends keyof RegisterFormState>(field: K, value: RegisterFormState[K]) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleGoogleSignup: () => Promise<void>;
    validateField: (field: keyof RegisterFormState) => void;
}

export interface PasswordStrength {
    score: number;       // 0-4
    label: string;
    color: string;
    checks: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        special: boolean;
    };
}

function calculatePasswordStrength(password: string): PasswordStrength {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;

    const levels: Record<number, { label: string; color: string }> = {
        0: { label: 'Too Weak', color: 'bg-red-500' },
        1: { label: 'Weak', color: 'bg-red-400' },
        2: { label: 'Fair', color: 'bg-orange-400' },
        3: { label: 'Good', color: 'bg-yellow-400' },
        4: { label: 'Strong', color: 'bg-emerald-400' },
        5: { label: 'Very Strong', color: 'bg-emerald-500' },
    };

    const level = levels[score] || levels[0];

    return { score, label: level.label, color: level.color, checks };
}

export default function useRegisterForm(): UseRegisterFormReturn {
    const [formState, setFormState] = useState<RegisterFormState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreed: false,
    });
    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const passwordStrength = useMemo(
        () => calculatePasswordStrength(formState.password),
        [formState.password]
    );

    const setField = useCallback(<K extends keyof RegisterFormState>(
        field: K,
        value: RegisterFormState[K]
    ) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
        // Clear error when user types
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    }, []);

    const validateField = useCallback((field: keyof RegisterFormState) => {
        setFormState((current) => {
            const { name, email, password, confirmPassword, agreed } = current;
            const newErrors: RegisterFormErrors = {};

            switch (field) {
                case 'name':
                    if (!name.trim()) newErrors.name = 'Full name is required.';
                    else if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.';
                    break;
                case 'email':
                    if (!email.trim()) newErrors.email = 'Email is required.';
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                        newErrors.email = 'Enter a valid email address.';
                    break;
                case 'password':
                    if (!password) newErrors.password = 'Password is required.';
                    else if (password.length < 6) newErrors.password = 'Must be at least 6 characters.';
                    break;
                case 'confirmPassword':
                    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
                    else if (password !== confirmPassword)
                        newErrors.confirmPassword = 'Passwords do not match.';
                    break;
                case 'agreed':
                    if (!agreed) newErrors.agreed = 'You must agree to continue.';
                    break;
            }

            setErrors((prev) => ({ ...prev, ...newErrors }));
            return current; // Don't mutate state
        });
    }, []);

    const isFormValid = useMemo(() => {
        const { name, email, password, confirmPassword, agreed } = formState;
        return (
            name.trim().length >= 2 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
            password.length >= 6 &&
            password === confirmPassword &&
            agreed
        );
    }, [formState]);

    const validateAll = useCallback((): boolean => {
        const { name, email, password, confirmPassword, agreed } = formState;
        const newErrors: RegisterFormErrors = {};

        if (!name.trim()) newErrors.name = 'Full name is required.';
        else if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.';

        if (!email.trim()) newErrors.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = 'Enter a valid email address.';

        if (!password) newErrors.password = 'Password is required.';
        else if (password.length < 6) newErrors.password = 'Must be at least 6 characters.';

        if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
        else if (password !== confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match.';

        if (!agreed) newErrors.agreed = 'You must agree to continue.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formState]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateAll()) return;

        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    password: formState.password,
                }),
            });

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server returned an invalid response.');
            }

            if (!response.ok) {
                throw new Error(data?.error || 'Registration failed');
            }

            login(data.user, data.token);
            toast.success(`Welcome, ${data.user.name}! Account created successfully.`);
            router.push('/dashboard');
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : 'Registration failed. Please try again.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [formState, login, router, validateAll]);

    const handleGoogleSignup = useCallback(async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const googleUser: User = {
                id: Math.floor(Math.random() * 10000),
                email: 'user@gmail.com',
                name: 'Google User',
                role: 'user',
                avatar: 'https://lh3.googleusercontent.com/a/default-user',
                created_at: new Date().toISOString(),
            };
            login(googleUser, 'mock-google-token');
            toast.success('Successfully signed up with Google!');
            router.push('/');
        } catch {
            toast.error('Google sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [login, router]);

    return {
        formState,
        errors,
        loading,
        isFormValid,
        passwordStrength,
        setField,
        handleSubmit,
        handleGoogleSignup,
        validateField,
    };
}
