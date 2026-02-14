'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '@/store/authStore';
import { toast } from 'react-toastify';
import { Loader2, Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react'; // Added icons
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreed) {
            toast.error('You must agree to the terms and conditions');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error("Non-JSON response:", text);
                throw new Error("Server returned an invalid response (not JSON). See console for details.");
            }

            if (!response.ok) {
                throw new Error(data?.error || 'Registration failed');
            }

            login(data.user, data.token);
            toast.success('Account created successfully! Redirecting...');
            router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // Simulate Google API popup and auth flow
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Mock Google User Data
            const googleUser = {
                id: Math.floor(Math.random() * 10000),
                email: 'user@gmail.com',
                name: 'Google User',
                role: 'user' as const,
                avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIq8dD9...=s96-c', // Mock generic google avatar url
                created_at: new Date().toISOString()
            };

            login(googleUser, 'mock-google-token');
            toast.success('Successfully signed up with Google!');
            router.push('/');
        } catch (error) {
            toast.error('Google sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background text-foreground overflow-hidden">

            {/* Left Side - Hero / Visuals (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/40 to-black/80 mix-blend-multiply" />
                <Image
                    src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2625&auto=format&fit=crop"
                    alt="Cinema Experience"
                    fill
                    className="object-cover opacity-60"
                    priority
                />

                <div className="relative z-20 max-w-lg px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
                            Unlimited Movies, <br />
                            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">
                                TV Shows, & More.
                            </span>
                        </h1>
                        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                            Join millions of users and start your journey into the world of premium entertainment. Watch anywhere. Cancel anytime.
                        </p>
                    </motion.div>

                    {/* Floating Cards Animation Effect */}
                    <div className="relative h-64 w-full mt-10 perspective-[1000px]">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 + (i * 0.2) }}
                                className={`absolute left-1/2 top-0 w-40 h-56 rounded-xl shadow-2xl border-2 border-white/10 overflow-hidden transform -translate-x-1/2 ${i === 1 ? '-translate-x-[120%] rotate-[-12deg] z-10 mt-8' :
                                    i === 2 ? '-translate-x-1/2 z-20' :
                                        'translate-x-[20%] rotate-[12deg] z-10 mt-8'
                                    }`}
                            >
                                <div className="w-full h-full bg-slate-800/80 backdrop-blur-md flex items-center justify-center">
                                    <span className="text-white/20 font-bold text-4xl">HD</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-30">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-block text-2xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-8">
                            MovieApp
                        </Link>
                        <h2 className="text-4xl font-bold tracking-tight text-foreground mb-2">Create Account</h2>
                        <p className="text-muted-foreground text-base">
                            Enter your details below to create your account and get started.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            {/* Name Field */}
                            <div className="relative group">
                                <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1.5 ml-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full rounded-lg border border-input bg-secondary/30 pl-10 pr-3 py-3 text-foreground placeholder-muted-foreground/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="relative group">
                                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1.5 ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-lg border border-input bg-secondary/30 pl-10 pr-3 py-3 text-foreground placeholder-muted-foreground/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="relative group">
                                <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-1.5 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-lg border border-input bg-secondary/30 pl-10 pr-10 py-3 text-foreground placeholder-muted-foreground/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                                {/* Simple Password Strength Bar placeholder */}
                                {password && (
                                    <div className="w-full h-1 bg-secondary mt-2 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${password.length < 6 ? 'bg-red-500 w-1/3' :
                                                password.length < 10 ? 'bg-yellow-500 w-2/3' :
                                                    'bg-green-500 w-full'
                                                }`}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="h-4 w-4 rounded border-input bg-secondary/50 text-primary focus:ring-primary/20 focus:ring-2 cursor-pointer transition-all"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-medium text-muted-foreground cursor-pointer select-none">
                                    I agree to the <Link href="/terms" className="text-primary hover:underline hover:text-primary/80">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline hover:text-primary/80">Privacy Policy</Link>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3.5 px-4 text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-primary/30"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/50"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-background text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                                    Or verify with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-input rounded-lg bg-card hover:bg-secondary/50 transition-colors text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                disabled={loading}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-input rounded-lg bg-card hover:bg-secondary/50 transition-colors text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Github className="h-5 w-5" />
                                GitHub
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-muted-foreground pt-4">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="font-semibold text-primary hover:text-primary/80 hover:underline transition-all">
                            Sign in here
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
