'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/auth/AuthProvider';
import { auth, db, COLLECTIONS } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import {
    Sparkles, Calendar, Users, DollarSign, BarChart3,
    Settings, LogOut, Plus, ChevronRight, Clock, Star,
    Smartphone, Loader2, Share2, QrCode, Copy
} from 'lucide-react';
import { useTranslation } from '@/context/I18nContext';

type TabType = 'overview' | 'classes' | 'clients' | 'payments' | 'gia' | 'settings';

export default function DashboardPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    // Real Data State
    const [studio, setStudio] = useState<any>(null);
    const [isFetching, setIsFetching] = useState(true);

    // Fetch Studio Data
    useEffect(() => {
        const fetchStudio = async () => {
            const firestore = db();
            if (!user || !firestore) return; // FIX: Ensure db is initialized 
            try {
                const q = query(collection(firestore, COLLECTIONS.STUDIOS), where("ownerId", "==", user.uid));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setStudio({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
                }
            } catch (error) {
                console.error("Error fetching studio:", error);
            } finally {
                setIsFetching(false);
            }
        };

        if (!loading && user) {
            fetchStudio();
        } else if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        try {
            const authInstance = auth();
            if (!authInstance) throw new Error("Authentication not initialized");
            await signOut(authInstance);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading || isFetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!studio) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-xl font-bold mb-2">No Studio Found</h2>
                <p className="text-text-secondary mb-4">We couldn't find a studio associated with this account.</p>
                <button onClick={() => router.push('/build')} className="text-primary hover:underline">Create a Studio</button>
            </div>
        );
    }

    // Tabs Config
    const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
        { id: 'overview', label: t('dashboard.tabs.overview'), icon: BarChart3 },
        { id: 'classes', label: t('dashboard.tabs.classes'), icon: Calendar },
        { id: 'clients', label: t('dashboard.tabs.clients'), icon: Users },
        { id: 'payments', label: t('dashboard.tabs.payments'), icon: DollarSign },
        { id: 'gia', label: t('dashboard.tabs.gia'), icon: Sparkles },
        { id: 'settings', label: t('dashboard.tabs.settings'), icon: Settings },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-border p-6 hidden lg:block">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
                        style={{ backgroundColor: studio.brandColor || '#4A9FD4' }}
                    >
                        {studio.icon || '🧘'}
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="font-semibold text-foreground truncate">{studio.name}</h1>
                        <p className="text-xs text-text-secondary">{t('dashboard.title')}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                ? 'bg-primary/10 text-primary'
                                : 'text-text-secondary hover:bg-surface-hover hover:text-foreground'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="font-medium">{tab.label}</span>
                            {tab.id === 'gia' && (
                                <span className="ml-auto px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">
                                    PRO
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto pt-8 border-t border-border mt-8 space-y-2">
                    <button
                        onClick={() => router.push('/build')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">{t('dashboard.editApp')}</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-surface-hover hover:text-foreground transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>{t('common.logout')}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                            style={{ backgroundColor: studio.brandColor }}
                        >
                            {studio.icon}
                        </div>
                        <h1 className="font-semibold text-foreground">{studio.name}</h1>
                    </div>
                    <button className="p-2 rounded-lg bg-surface border border-border">
                        <Settings className="w-5 h-5 text-text-secondary" />
                    </button>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-6 rounded-2xl bg-surface border border-border">
                                <div className="flex items-center gap-3 mb-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <span className="text-sm text-text-secondary">Classes Initialized</span>
                                </div>
                                <span className="text-3xl font-bold text-foreground">{studio.classes?.length || 0}</span>
                            </div>
                            <div className="p-6 rounded-2xl bg-surface border border-border">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users className="w-5 h-5 text-accent" />
                                    <span className="text-sm text-text-secondary">Total Clients</span>
                                </div>
                                <span className="text-3xl font-bold text-foreground">0</span>
                            </div>
                            <div className="p-6 rounded-2xl bg-surface border border-border">
                                <div className="flex items-center gap-3 mb-2">
                                    <DollarSign className="w-5 h-5 text-success" />
                                    <span className="text-sm text-text-secondary">Revenue</span>
                                </div>
                                <span className="text-3xl font-bold text-foreground">$0</span>
                            </div>
                            <div className="p-6 rounded-2xl bg-surface border border-border">
                                <div className="flex items-center gap-3 mb-2">
                                    <Star className="w-5 h-5 text-warning" />
                                    <span className="text-sm text-text-secondary">Rating</span>
                                </div>
                                <span className="text-3xl font-bold text-foreground">5.0</span>
                            </div>
                        </div>

                        {/* CLIENT APP DOWNLOAD (New, Prominent) */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full -mr-32 -mt-32"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="bg-white p-2 rounded-xl border border-white/10 shadow-lg shrink-0">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://dal.ai/s/${studio.id}&color=000000`}
                                        alt="Scan to preview"
                                        className="w-32 h-32 rounded-lg"
                                    />
                                </div>

                                <div className="flex-1 text-center md:text-left space-y-4">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                                            <Smartphone className="w-3 h-3" />
                                            Client Access
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Get your clients on the app</h2>
                                        <p className="text-gray-400 max-w-lg">
                                            Your clients <strong>must download the Dal AI app</strong> to book your classes.
                                            Share this link or QR code with them to get them started instantly.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(`https://dal.ai/s/${studio.id}`);
                                                alert('Link copied!');
                                            }}
                                            className="px-5 py-3 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Copy Studio Link
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(studio.code || studio.id);
                                                alert('Code copied!');
                                            }}
                                            className="px-5 py-3 rounded-xl bg-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-colors border border-white/10"
                                        >
                                            <Copy className="w-4 h-4" />
                                            Copy Code: {studio.code || studio.id?.substring(0, 6).toUpperCase()}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* REFERRAL PROGRAM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Referral Card */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full -mr-16 -mt-16"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                            <Users className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">Referral Program</h3>
                                            <p className="text-sm text-text-secondary">Earn $10 for each referral</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-xs text-text-muted uppercase font-bold mb-2">Your Referral Link</p>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                readOnly
                                                value={`dal.ai/ref/${studio.id?.substring(0, 6).toUpperCase()}`}
                                                className="flex-1 px-4 py-2.5 bg-surface border border-border rounded-lg text-sm font-mono"
                                            />
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`https://dal.ai/ref/${studio.id?.substring(0, 6).toUpperCase()}`);
                                                    alert('Referral link copied!');
                                                }}
                                                className="px-4 py-2.5 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="text-center p-3 bg-surface/50 rounded-lg">
                                            <p className="text-xl font-bold text-foreground">0</p>
                                            <p className="text-xs text-text-muted">Invited</p>
                                        </div>
                                        <div className="text-center p-3 bg-surface/50 rounded-lg">
                                            <p className="text-xl font-bold text-foreground">0</p>
                                            <p className="text-xs text-text-muted">Signed Up</p>
                                        </div>
                                        <div className="text-center p-3 bg-surface/50 rounded-lg">
                                            <p className="text-xl font-bold text-purple-400">$0</p>
                                            <p className="text-xs text-text-muted">Earned</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Share Class Links Card */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full -mr-16 -mt-16"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                            <Share2 className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">Shareable Class Links</h3>
                                            <p className="text-sm text-text-secondary">Direct book links for Instagram</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-text-muted mb-4">
                                        Generate beautiful share links for each class. Perfect for Instagram stories and posts!
                                    </p>

                                    <div className="space-y-2">
                                        {studio.classes?.slice(0, 2).map((cls: any, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-foreground text-sm">{cls.name}</p>
                                                    <p className="text-xs text-text-muted">{cls.time}</p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(`https://dal.ai/s/${studio.id}/class/${idx}`);
                                                        alert('Class link copied!');
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors"
                                                >
                                                    Copy Link
                                                </button>
                                            </div>
                                        ))}
                                        {(!studio.classes || studio.classes.length === 0) && (
                                            <p className="text-sm text-text-muted text-center py-4">
                                                Add classes to generate share links
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Initialized Classes (Real Data) */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-foreground">Your Class Schedule</h2>
                                <button className="text-primary text-sm font-medium flex items-center gap-1">
                                    Manage Schedule <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {studio.classes?.length > 0 ? (
                                    studio.classes.map((cls: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <Clock className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-foreground">{cls.name}</h3>
                                                    <p className="text-sm text-text-secondary">{cls.time} • {cls.instructor}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="px-3 py-1 rounded-full bg-surface-hover text-xs font-medium text-text-secondary border border-border">
                                                    {cls.duration} min
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 bg-surface border border-border rounded-xl">
                                        <p className="text-text-muted">No classes scheduled yet.</p>
                                        <button className="mt-2 text-primary font-medium">Add your first class</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Other Tabs - Placeholder */}
                {activeTab !== 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto mb-4">
                            <Settings className="w-8 h-8 text-text-muted" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h3>
                        <p className="text-text-secondary">This section is under construction.</p>
                        <button onClick={() => setActiveTab('overview')} className="mt-4 text-primary hover:underline">
                            Back to Overview
                        </button>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
