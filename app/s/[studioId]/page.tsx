'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, ChevronRight, Smartphone, Download } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface StudioConfig {
    studioName: string;
    brandColor: string;
    icon: string;
    logo?: string;
    tagline?: string;
    classes?: Array<{ name: string; instructor: string; time: string; day: string }>;
    backgroundMode?: 'light' | 'dark' | 'black';
}

export default function StudioLandingPage() {
    const params = useParams();
    const studioId = params.studioId as string;

    const [studio, setStudio] = useState<StudioConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStudio() {
            try {
                const firestore = db();
                const docRef = doc(firestore, 'studios', studioId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setStudio(docSnap.data() as StudioConfig);
                }
            } catch (error) {
                console.error('Error loading studio:', error);
            } finally {
                setLoading(false);
            }
        }

        if (studioId) {
            loadStudio();
        }
    }, [studioId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!studio) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Studio Not Found</h1>
                    <p className="text-text-secondary">This studio link may be invalid or expired.</p>
                </div>
            </div>
        );
    }

    const isDark = studio.backgroundMode !== 'light';
    const bgColor = isDark ? '#0A0A0A' : '#F9F9F9';

    return (
        <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
            {/* Hero Section */}
            <div
                className="relative h-[40vh] flex items-end"
                style={{ background: `linear-gradient(135deg, ${studio.brandColor}22 0%, ${bgColor} 100%)` }}
            >
                {/* Decorative elements */}
                <div
                    className="absolute top-10 right-10 w-32 h-32 rounded-full blur-3xl opacity-30"
                    style={{ backgroundColor: studio.brandColor }}
                />
                <div
                    className="absolute bottom-20 left-10 w-24 h-24 rounded-full blur-2xl opacity-20"
                    style={{ backgroundColor: studio.brandColor }}
                />

                <div className="relative z-10 p-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        {studio.logo ? (
                            <img src={studio.logo} alt={studio.studioName} className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                        ) : (
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                                style={{ backgroundColor: studio.brandColor }}
                            >
                                {studio.icon}
                            </div>
                        )}
                        <div>
                            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                                {studio.studioName}
                            </h1>
                            {studio.tagline && (
                                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                                    {studio.tagline}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 max-w-2xl mx-auto space-y-8">

                {/* CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`p-6 rounded-2xl ${isDark ? 'bg-[#1C1C1E]' : 'bg-white shadow-lg'}`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${studio.brandColor}20` }}
                        >
                            <Smartphone className="w-6 h-6" style={{ color: studio.brandColor }} />
                        </div>
                        <div>
                            <h2 className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                                Get the {studio.studioName} App
                            </h2>
                            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                                Book classes, track progress, and more
                            </p>
                        </div>
                    </div>

                    <button
                        className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2"
                        style={{ backgroundColor: studio.brandColor }}
                    >
                        <Download className="w-5 h-5" />
                        Download App
                    </button>
                </motion.div>

                {/* Classes Preview */}
                {studio.classes && studio.classes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                            Upcoming Classes
                        </h3>

                        {studio.classes.slice(0, 3).map((cls, idx) => (
                            <div
                                key={idx}
                                className={`p-4 rounded-xl ${isDark ? 'bg-[#1C1C1E]' : 'bg-white shadow-sm'} flex items-center gap-4`}
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex flex-col items-center justify-center"
                                    style={{ backgroundColor: `${studio.brandColor}15` }}
                                >
                                    <span className={`text-xs font-bold ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                                        {cls.day}
                                    </span>
                                    <span className={`text-sm font-bold`} style={{ color: studio.brandColor }}>
                                        {cls.time}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                                        {cls.name}
                                    </h4>
                                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                                        with {cls.instructor}
                                    </p>
                                </div>
                                <button
                                    className="px-4 py-2 rounded-lg text-sm font-bold text-white"
                                    style={{ backgroundColor: studio.brandColor }}
                                >
                                    Book
                                </button>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Share Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`p-4 rounded-xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'} text-center`}
                >
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                        Powered by <span className="font-bold" style={{ color: studio.brandColor }}>Dal AI</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
