'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Download, Smartphone, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { db, COLLECTIONS } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const [studioData, setStudioData] = useState<{
        studioName: string;
        icon: string;
        brandColor: string;
    } | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const saveStudio = async () => {
            // Get studio data from sessionStorage
            const stored = sessionStorage.getItem('builderState');
            if (!stored || !user) return;

            const data = JSON.parse(stored);
            setStudioData({
                studioName: data.studioName,
                icon: data.icon,
                brandColor: data.brandColor,
            });

            // Prevent duplicate saves - check if studio already exists for this user
            if (isSaving) return;
            setIsSaving(true);

            try {
                if (!db) throw new Error("Firestore not initialized");
                const studiosRef = collection(db, COLLECTIONS.STUDIOS);
                const q = query(studiosRef, where("ownerId", "==", user.uid));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    // BRIDGE: Map Web Builder data to Mobile App "Studio" Schema

                    // 1. Map Studio Type -> Modalities
                    const modalityMap: Record<string, string[]> = {
                        'yoga': ['yoga'],
                        'pilates': ['pilates_reformer', 'pilates_mat'],
                        'barre': ['barre'],
                        'meditation': ['meditation', 'breathwork'],
                        'other': ['hiit', 'strength']
                    };

                    // 2. Map Theme -> Vibe/Music/Ambiance
                    const themeMap: Record<string, any> = {
                        'zen': { vibe: 'calm_meditative', music: ['lo_fi_chill', 'classical_instrumental'], ambiance: 'natural_light' },
                        'energy': { vibe: 'energetic_upbeat', music: ['pop_top40', 'edm_house'], ambiance: 'bright_energizing' },
                        'luxe': { vibe: 'boutique_luxe', music: ['indie_alternative'], ambiance: 'dim_candlelit' },
                        'night': { vibe: 'intense_challenging', music: ['hip_hop_rnb', 'edm_house'], ambiance: 'club_vibes' },
                        'earth': { vibe: 'calm_meditative', music: ['indie_alternative'], ambiance: 'natural_light' },
                        'ocean': { vibe: 'calm_meditative', music: ['lo_fi_chill'], ambiance: 'natural_light' }
                    };

                    const selectedTheme = themeMap[data.themeId] || themeMap['zen'];

                    // 3. Default Hours (9AM - 8PM Daily)
                    const mkHours = (isOpen: boolean) => ({ isOpen, openTime: isOpen ? "09:00" : undefined, closeTime: isOpen ? "20:00" : undefined });
                    const defaultHours = {
                        monday: mkHours(true), tuesday: mkHours(true), wednesday: mkHours(true),
                        thursday: mkHours(true), friday: mkHours(true), saturday: mkHours(true), sunday: mkHours(false)
                    };

                    await addDoc(studiosRef, {
                        ownerId: user.uid,
                        name: data.studioName,
                        fullName: data.studioName, // Mobile expects fullName
                        description: data.tagline || 'Welcome to our studio.',

                        // Critical Mobile Fields
                        vibe: selectedTheme.vibe,
                        musicStyle: selectedTheme.music,
                        ambiance: selectedTheme.ambiance,
                        modalities: modalityMap[data.studioType] || ['yoga'],
                        amenities: ['water_station', 'lockers', ...(data.features?.includes('shop') ? ['retail_shop'] : [])],

                        // Branding (Even if mobile ignores it for now, save it)
                        brandColor: data.brandColor,
                        icon: data.icon,
                        logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.studioName)}&background=${data.brandColor.replace('#', '')}&color=fff`,
                        coverPhotoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80',

                        // Location Defaults (Required by Mobile Maps)
                        address: 'Digital Studio',
                        city: 'New York',
                        state: 'NY',
                        zipCode: '10001',
                        lat: 40.7128,
                        lon: -74.0060,

                        // Operational
                        hours: defaultHours,
                        rating: 5.0,
                        reviewCount: 0,
                        dropInPrice: 2500, // $25.00
                        membershipStartsAt: 9900,

                        // Settings & Type
                        type: data.studioType, // Keep original web type too
                        settings: data.settings || {
                            cancellationWindow: 24,
                            lateFee: 10,
                            waitlistSize: 5,
                        },

                        // Meta
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                        subscriptionStatus: 'active',
                        stripeSessionId: searchParams.get('session_id'),
                        code: data.studioName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 8),
                    });
                    // Clear builder state after successful save
                    sessionStorage.removeItem('builderState');
                }
            } catch (error) {
                console.error("Error saving studio:", error);
            } finally {
                setIsSaving(false);
            }
        };

        saveStudio();
    }, [user, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg w-full text-center"
            >
                {/* Success Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-8"
                >
                    <Check className="w-10 h-10 text-success" />
                </motion.div>

                {/* Headline */}
                <h1 className="text-3xl font-bold text-foreground mb-4">
                    Your app is live! 🎉
                </h1>
                <p className="text-text-secondary mb-8">
                    {studioData?.studioName || 'Your studio'} is ready for your first booking.
                </p>

                {/* Studio Card */}
                {studioData && (
                    <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
                        <div className="flex items-center justify-center gap-4">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                                style={{ backgroundColor: studioData.brandColor }}
                            >
                                {studioData.icon}
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-foreground text-lg">{studioData.studioName}</h3>
                                <p className="text-sm text-text-secondary">Ready for launch</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Next Steps */}
                <div className="bg-surface border border-border rounded-2xl p-6 mb-8 text-left">
                    <h3 className="font-semibold text-foreground mb-4">What's next?</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">1</span>
                            </div>
                            <div>
                                <p className="text-foreground font-medium">Download the app</p>
                                <p className="text-sm text-text-secondary">Manage your studio on the go</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">2</span>
                            </div>
                            <div>
                                <p className="text-foreground font-medium">Add your classes</p>
                                <p className="text-sm text-text-secondary">Set your schedule and pricing</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">3</span>
                            </div>
                            <div>
                                <p className="text-foreground font-medium">Share with clients</p>
                                <p className="text-sm text-text-secondary">They download YOUR app and start booking</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                    <button
                        className="w-full px-6 py-4 rounded-xl gradient-primary text-white font-semibold flex items-center justify-center gap-2"
                    >
                        <Smartphone className="w-5 h-5" />
                        Download Dal AI App
                    </button>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="w-full px-6 py-4 rounded-xl bg-surface border border-border text-foreground font-medium flex items-center justify-center gap-2 hover:bg-surface-hover transition-colors"
                    >
                        Go to Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Support */}
                <p className="text-text-muted text-sm mt-8">
                    Need help? <a href="#" className="text-primary hover:underline">Contact support</a>
                </p>
            </motion.div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
