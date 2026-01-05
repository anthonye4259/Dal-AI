'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
// import { motion } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const authInstance = auth();
            if (!authInstance) throw new Error("Authentication not initialized");
            await signInWithEmailAndPassword(authInstance, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else if (err.code === 'auth/user-not-found') {
                setError('No account found with this email.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-hero">
            <div
                className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4">
                        <Image src="/logo.png" alt="Dal AI" width={48} height={48} className="rounded-xl bg-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
                    <p className="text-text-secondary">
                        Log in to manage your studio
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                            placeholder="you@studio.com"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-medium text-text-secondary">Password</label>
                            <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl gradient-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Log In
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center pt-6 border-t border-border">
                    <p className="text-sm text-text-secondary">
                        Don&apos;t have an account?{' '}
                        <button
                            onClick={() => router.push('/build')}
                            className="text-primary hover:underline font-medium"
                        >
                            Build your app
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
