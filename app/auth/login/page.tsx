'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '@/store/authStore';
import { toast } from 'react-toastify';
import { Loader2, Mail, Lock, LogIn, ArrowRight, Github, Chrome, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    React.useEffect(() => {
        fetch('/api/health')
            .then(res => res.text())
            .then(text => console.log("Health check:", text))
            .catch(err => console.error("Health check failed:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
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
                throw new Error(data?.error || 'Login failed');
            }

            login(data.user, data.token);
            toast.success(`Welcome back, ${data.user.name}!`);

            if (data.user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
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
                avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIq8dD9...=s96-c',
                created_at: new Date().toISOString()
            };

            login(googleUser, 'mock-google-token');
            toast.success('Successfully returned with Google!');
            router.push('/');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Google sign in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background text-foreground overflow-hidden">

            {/* Left Side - Hero / Visuals (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-10  from-primary/40 to-black/80 mix-blend-multiply" />
                <Image
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop"
                    alt="Movie Theater"
                    fill
                    className="object-cover opacity-60"
                    priority
                />

                <div className="relative z-20 max-w-lg px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                            <LogIn className="w-10 h-10 text-white ml-1" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                            Welcome Back
                        </h1>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            Pick up where you left off. Your personal cinema awaits.
                        </p>
                    </motion.div>
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
                        <Link href="/" className="inline-block text-2xl font-bold from-primary to-orange-500 bg-clip-text text-transparent mb-8">
                            MovieApp
                        </Link>
                        <h2 className="text-4xl font-bold tracking-tight text-foreground mb-2">Sign In</h2>
                        <p className="text-muted-foreground text-base">
                            Access your account and manage your playlist.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            {/* Email Field */}
                            <div className="relative group space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="relative group space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10"
                                        placeholder="••••••••"
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
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-input bg-secondary/50 text-primary focus:ring-primary/20 focus:ring-2 cursor-pointer transition-all"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground cursor-pointer select-none">
                                Remember me for 30 days
                            </label>
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
                                    Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/50"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-background text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                                    Or continue with
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
                                <Chrome className="h-5 w-5" />
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
                        Dont have an account?{' '}
                        <Link href="/auth/register" className="font-semibold text-primary hover:text-primary/80 hover:underline transition-all">
                            Sign up for free
                        </Link>
                    </p>

                    <div className="mt-4 text-center text-[10px] text-muted-foreground/60 border-t border-border/30 pt-4">
                        <p>Demo Admin: admin@example.com / admin</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
