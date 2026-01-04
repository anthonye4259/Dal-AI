'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowLeft, Shield, Zap, Users, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface BuilderState {
    studioName: string;
    studioType: string;
    brandColor: string;
    icon: string;
    classes: Array<{ name: string; time: string; instructor: string }>;
}

export default function CheckoutPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [builderState, setBuilderState] = useState<BuilderState | null>(null);
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
    const [includeGiaPro, setIncludeGiaPro] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Auth State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        // Retrieve builder state from sessionStorage
        const stored = sessionStorage.getItem('builderState');
        if (stored) {
            setBuilderState(JSON.parse(stored));
        }
    }, []);

    const pricing = {
        dalAi: {
            monthly: 49,
            annual: 490, // 2 months free
        },
        giaPro: {
            monthly: 19,
            annual: 190, // 2 months free
        },
    };

    const getTotal = () => {
        let total = billingPeriod === 'monthly' ? pricing.dalAi.monthly : pricing.dalAi.annual;
        if (includeGiaPro) {
            total += billingPeriod === 'monthly' ? pricing.giaPro.monthly : pricing.giaPro.annual;
        }
        return total;
    };

    const getSavings = () => {
        if (billingPeriod === 'annual') {
            const monthlyTotal = pricing.dalAi.monthly + (includeGiaPro ? pricing.giaPro.monthly : 0);
            const annualTotal = pricing.dalAi.annual + (includeGiaPro ? pricing.giaPro.annual : 0);
            return (monthlyTotal * 12) - annualTotal;
        }
        return 0;
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        setAuthError('');

        try {
            let currentUser = user;

            // 1. Create Account or Sign In if not logged in
            if (!currentUser) {
                if (!email || !password) {
                    setAuthError('Please enter email and password');
                    setIsLoading(false);
                    return;
                }

                try {
                    if (isLoginMode) {
                        if (!auth) throw new Error("Authentication not initialized");
                        const credential = await signInWithEmailAndPassword(auth, email, password);
                        currentUser = credential.user;
                    } else {
                        if (!auth) throw new Error("Authentication not initialized");
                        const credential = await createUserWithEmailAndPassword(auth, email, password);
                        currentUser = credential.user;
                    }
                } catch (err: any) {
                    console.error(err);
                    if (err.code === 'auth/email-already-in-use') {
                        setAuthError('Email already exists. Please log in.');
                        setIsLoginMode(true);
                    } else {
                        setAuthError('Authentication failed. Please check credentials.');
                    }
                    setIsLoading(false);
                    return;
                }
            }

            // 2. Create Stripe Checkout Session
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: currentUser?.email || email,
                    studioName: builderState?.studioName || 'My Studio',
                    billingPeriod,
                    includeGiaPro,
                    studioData: builderState,
                }),
            });

            const { url, error } = await response.json();

            if (error) {
                throw new Error(error);
            }

            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setAuthError('Something went wrong. Please try again.');
            setIsLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const dalAiFeatures = [
        'Your branded client app',
        'Unlimited classes',
        'Online booking',
        'Payment processing',
        'Class packages & memberships',
        'Email notifications',
    ];

    const giaProFeatures = [
        'AI scheduling assistant',
        'Smart pricing suggestions',
        'Client retention alerts',
        'Advanced analytics',
        'Automated follow-ups',
        'Priority support',
    ];

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => router.push('/build')}
                        className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to builder
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-foreground">Dal AI</span>
                    </div>
                </div>

                {/* Studio Preview */}
                {builderState && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-surface border border-border rounded-2xl p-6 mb-8"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                                style={{ backgroundColor: builderState.brandColor }}
                            >
                                {builderState.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{builderState.studioName}</h3>
                                <p className="text-sm text-text-secondary capitalize">
                                    {builderState.studioType} • {builderState.classes.length} classes
                                </p>
                            </div>
                            <div className="ml-auto px-3 py-1 rounded-full bg-success/20 text-success text-sm font-medium">
                                Ready to launch
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Pricing Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Launch your app today
                    </h1>
                    <p className="text-text-secondary">
                        Simple pricing. Cancel anytime.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <button
                        onClick={() => setBillingPeriod('monthly')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${billingPeriod === 'monthly'
                            ? 'bg-primary text-white'
                            : 'bg-surface text-text-secondary hover:text-foreground'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingPeriod('annual')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all relative ${billingPeriod === 'annual'
                            ? 'bg-primary text-white'
                            : 'bg-surface text-text-secondary hover:text-foreground'
                            }`}
                    >
                        Annual
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-success text-white text-xs rounded-full">
                            2 mo free
                        </span>
                    </button>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Dal AI Card */}
                    <div className="bg-surface border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Dal AI</h3>
                                <p className="text-sm text-text-secondary">Core Platform</p>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl font-bold text-foreground">
                                ${billingPeriod === 'monthly' ? pricing.dalAi.monthly : pricing.dalAi.annual}
                            </span>
                            <span className="text-text-secondary">
                                /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                            </span>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {dalAiFeatures.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-text-secondary">
                                    <Check className="w-4 h-4 text-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium text-center">
                            Included in your plan
                        </div>
                    </div>

                    {/* GIA Pro Card */}
                    <div
                        className={`rounded-2xl p-6 transition-all cursor-pointer ${includeGiaPro
                            ? 'bg-surface border-2 border-accent'
                            : 'bg-surface border border-border opacity-70'
                            }`}
                        onClick={() => setIncludeGiaPro(!includeGiaPro)}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">GIA Pro</h3>
                                    <p className="text-sm text-text-secondary">AI Add-on</p>
                                </div>
                            </div>
                            <div
                                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${includeGiaPro
                                    ? 'bg-accent border-accent'
                                    : 'border-border'
                                    }`}
                            >
                                {includeGiaPro && <Check className="w-4 h-4 text-white" />}
                            </div>
                        </div>

                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-3xl font-bold text-foreground">
                                +${billingPeriod === 'monthly' ? pricing.giaPro.monthly : pricing.giaPro.annual}
                            </span>
                            <span className="text-text-secondary">
                                /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                            </span>
                        </div>
                        <p className="text-sm text-accent mb-4">Let GIA run your business for you</p>

                        <ul className="space-y-3">
                            {giaProFeatures.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-text-secondary">
                                    <Check className="w-4 h-4 text-accent" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Total & Checkout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface border border-border rounded-2xl p-6"
                >
                    {/* Account Creation Section - Only if not logged in */}
                    {!user && (
                        <div className="mb-8 p-6 bg-background rounded-xl border border-border">
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                {isLoginMode ? 'Log in to your account' : 'Create your admin account'}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-surface border border-border text-foreground focus:border-primary focus:outline-none"
                                        placeholder="you@studio.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-surface border border-border text-foreground focus:border-primary focus:outline-none"
                                        placeholder="********"
                                    />
                                </div>
                                {authError && (
                                    <p className="text-destructive text-sm">{authError}</p>
                                )}
                                <button
                                    onClick={() => setIsLoginMode(!isLoginMode)}
                                    className="text-sm text-primary hover:underline"
                                >
                                    {isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-text-secondary">Dal AI</span>
                        <span className="text-foreground">
                            ${billingPeriod === 'monthly' ? pricing.dalAi.monthly : pricing.dalAi.annual}
                        </span>
                    </div>
                    {includeGiaPro && (
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-text-secondary">GIA Pro Add-on</span>
                            <span className="text-foreground">
                                ${billingPeriod === 'monthly' ? pricing.giaPro.monthly : pricing.giaPro.annual}
                            </span>
                        </div>
                    )}
                    {getSavings() > 0 && (
                        <div className="flex items-center justify-between mb-4 text-success">
                            <span>Annual savings</span>
                            <span>-${getSavings()}</span>
                        </div>
                    )}
                    <div className="border-t border-border pt-4 flex items-center justify-between mb-6">
                        <span className="text-lg font-semibold text-foreground">Total</span>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-foreground">${getTotal()}</span>
                            <span className="text-text-secondary">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className="w-full py-4 rounded-xl gradient-primary text-white font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Shield className="w-5 h-5" />
                                Subscribe & Launch
                            </>
                        )}
                    </button>

                    <p className="text-center text-text-muted text-sm mt-4">
                        Instant access • Cancel anytime • Secure checkout
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
