'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Share2, MessageCircle } from 'lucide-react';
import IPhoneMockup from '@/components/builder/IPhoneMockup';
import { BuilderProvider, useBuilder } from '@/context/BuilderContext';
import { useEffect } from 'react';

interface StudioData {
    id: string;
    name: string;
    fullName: string;
    brandColor: string;
    icon: string;
    category: string;
    classes: Array<{ name: string; time: string; instructor: string }>;
}

export default function PreviewClient({ studio }: { studio: StudioData }) {
    return (
        <BuilderProvider>
            <PreviewContent studio={studio} />
        </BuilderProvider>
    );
}

function PreviewContent({ studio }: { studio: StudioData }) {
    const router = useRouter();
    const { setStudioName, setBrandColor, setIcon, setClasses, setStudioType } = useBuilder();

    // Hydrate Context with Studio Data
    useEffect(() => {
        if (studio) {
            setStudioName(studio.name);
            setBrandColor(studio.brandColor);
            setIcon(studio.icon);
            setStudioType(studio.category as any);
            // Map simple classes to builder classes format
            setClasses(studio.classes.map(c => ({
                ...c,
                category: studio.category,
                duration: 60,
                price: 25,
                maxSpots: 20
            })) as any);
        }
    }, [studio, setStudioName, setBrandColor, setIcon, setClasses, setStudioType]);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${studio.name}'s App Preview`,
                    text: 'Check out this wellness studio app!',
                    url,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen gradient-hero">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-semibold text-foreground">Dal AI</span>
                    </div>
                    <button
                        onClick={() => router.push('/build')}
                        className="px-4 py-2 rounded-lg gradient-primary text-white font-medium flex items-center gap-2"
                    >
                        Build Your App
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-6">
                                <div
                                    className="w-6 h-6 rounded-lg flex items-center justify-center text-sm"
                                    style={{ backgroundColor: studio.brandColor }}
                                >
                                    {studio.icon}
                                </div>
                                <span className="text-sm text-text-secondary">{studio.name}&apos;s App Preview</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                                This could be
                                <span
                                    className="block"
                                    style={{ color: studio.brandColor }}
                                >
                                    YOUR studio&apos;s app
                                </span>
                            </h1>

                            <p className="text-lg text-text-secondary mb-8">
                                {studio.name} built their custom booking app in 60 seconds.
                                Your clients can book classes, buy packages, and manage their wellness journey -
                                all from YOUR branded app.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <button
                                    onClick={() => router.push('/build')}
                                    className="px-6 py-4 rounded-xl gradient-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                >
                                    Build Yours in 60 Seconds
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="px-6 py-4 rounded-xl bg-surface border border-border text-foreground font-medium flex items-center justify-center gap-2 hover:bg-surface-hover transition-colors"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Share
                                </button>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-surface border border-border text-center">
                                    <div className="text-2xl font-bold text-foreground">60s</div>
                                    <div className="text-sm text-text-secondary">to build</div>
                                </div>
                                <div className="p-4 rounded-xl bg-surface border border-border text-center">
                                    <div className="text-2xl font-bold text-foreground">$49</div>
                                    <div className="text-sm text-text-secondary">/month</div>
                                </div>
                                <div className="p-4 rounded-xl bg-surface border border-border text-center">
                                    <div className="text-2xl font-bold text-foreground">500+</div>
                                    <div className="text-sm text-text-secondary">studios</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - Phone Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex justify-center"
                        >
                            <div className="relative">
                                {/* Now consuming context, no props details needed */}
                                <IPhoneMockup />

                                {/* Powered by Badge */}
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-surface border border-border flex items-center gap-2">
                                    <span className="text-xs text-text-muted">Powered by</span>
                                    <span className="text-xs font-semibold text-foreground">Dal AI</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* CTA Banner */}
            <section className="py-12 px-6 border-t border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Ready to build your studio&apos;s app?
                    </h2>
                    <p className="text-text-secondary mb-6">
                        Join 500+ yoga, pilates, and barre studios already using Dal AI.
                    </p>
                    <button
                        onClick={() => router.push('/build')}
                        className="px-8 py-4 rounded-xl gradient-primary text-white font-semibold text-lg flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity"
                    >
                        Build My App
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-border">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-foreground text-sm">Dal AI</span>
                    </div>
                    <p className="text-text-muted text-sm">© 2024 Dal AI</p>
                </div>
            </footer>
        </div>
    );
}
