'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/auth/AuthProvider';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import {
    Sparkles, Calendar, Users, DollarSign, BarChart3,
    Settings, LogOut, Plus, ChevronRight, Clock, Star,
    Smartphone, Loader2
} from 'lucide-react';

// Mock data - in production, this would come from Firebase
const mockStudio = {
    id: 'demo-studio',
    name: 'Zen Flow Yoga',
    brandColor: '#4A9FD4',
    icon: '🧘',
};

const mockStats = {
    classesToday: 4,
    bookingsThisWeek: 28,
    revenueThisMonth: 2450,
    activeMembers: 67,
};

const mockClasses = [
    { id: '1', name: 'Morning Vinyasa', time: '6:30 AM', instructor: 'Sarah', spots: 12, booked: 8 },
    { id: '2', name: 'Power Yoga', time: '9:00 AM', instructor: 'Mike', spots: 15, booked: 15 },
    { id: '3', name: 'Gentle Flow', time: '11:00 AM', instructor: 'Emma', spots: 10, booked: 4 },
    { id: '4', name: 'Yin Restore', time: '7:00 PM', instructor: 'Sarah', spots: 12, booked: 10 },
];

const mockUpcomingBookings = [
    { id: '1', clientName: 'Alex Chen', className: 'Morning Vinyasa', time: '6:30 AM' },
    { id: '2', clientName: 'Jordan Smith', className: 'Morning Vinyasa', time: '6:30 AM' },
    { id: '3', clientName: 'Taylor Brown', className: 'Power Yoga', time: '9:00 AM' },
];

type TabType = 'overview' | 'classes' | 'clients' | 'payments' | 'gia' | 'settings';

export default function DashboardPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    // Protect route
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        try {
            if (!auth) throw new Error("Authentication not initialized");
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Define tabs...
    const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'classes', label: 'Classes', icon: Calendar },
        { id: 'clients', label: 'Clients', icon: Users },
        { id: 'payments', label: 'Payments', icon: DollarSign },
        { id: 'gia', label: 'GIA', icon: Sparkles },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-border p-6 hidden lg:block">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ backgroundColor: mockStudio.brandColor }}
                    >
                        {mockStudio.icon}
                    </div>
                    <div>
                        <h1 className="font-semibold text-foreground">{mockStudio.name}</h1>
                        <p className="text-xs text-text-secondary">Studio Dashboard</p>
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
                <div className="mt-auto pt-8 border-t border-border mt-8">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-surface-hover hover:text-foreground transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Log out</span>
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
                            style={{ backgroundColor: mockStudio.brandColor }}
                        >
                            {mockStudio.icon}
                        </div>
                        <h1 className="font-semibold text-foreground">{mockStudio.name}</h1>
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
                                    <span className="text-sm text-text-secondary">Classes Today</span>
                                </div>
                                <span className="text-3xl font-bold text-foreground">{mockStats.classesToday}</span>
                            </div>
                            <div className="p-6 rounded-2xl bg-surface border border-border">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users className="w-5 h-5 text-accent" />
                                    <span className="text-sm text-text-secondary">Bookings This Week</span>
                                </div>
                                <span className="text-3xl font-bold text-foreground">{mockStats.bookingsThisWeek}</span>
                            </div>
                            <div className="p-6 rounded-2xl bg-surface border border-border">
                                <div className="flex items-center gap-3 mb-2">
                                    <DollarSign className="w-5 h-5 text-success" />
                                    <span className="text-sm text-text-secondary">Revenue This Month</span>
                                </div>
                                <span className="text-3xl font-bold text-foreground">${mockStats.revenueThisMonth}</span>
                            </div>
                            <div className="p-6 rounded-2xl bg-surface border border-border">
                                <div className="flex items-center gap-3 mb-2">
                                    <Star className="w-5 h-5 text-warning" />
                                    <span className="text-sm text-text-secondary">Active Members</span>
                                </div>
                                <span className="text-3xl font-bold text-foreground">{mockStats.activeMembers}</span>
                            </div>
                        </div>

                        {/* Today's Classes */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-foreground">Today&apos;s Classes</h2>
                                <button className="text-primary text-sm font-medium flex items-center gap-1">
                                    View All <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {mockClasses.map((cls) => (
                                    <div
                                        key={cls.id}
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
                                            <p className="font-medium text-foreground">{cls.booked}/{cls.spots}</p>
                                            <p className="text-sm text-text-secondary">spots filled</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Bookings */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-foreground">Upcoming Bookings</h2>
                            </div>
                            <div className="space-y-3">
                                {mockUpcomingBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="p-4 rounded-xl bg-surface border border-border flex items-center gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-medium">
                                            {booking.clientName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-foreground">{booking.clientName}</h3>
                                            <p className="text-sm text-text-secondary">{booking.className} • {booking.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile App CTA */}
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-border">
                            <div className="flex items-center gap-4">
                                <Smartphone className="w-10 h-10 text-primary" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground">Manage on the go</h3>
                                    <p className="text-sm text-text-secondary">Download Dal AI to manage your studio from your phone.</p>
                                </div>
                                <button className="px-4 py-2 rounded-lg bg-surface border border-border text-foreground font-medium">
                                    Download
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Classes Tab */}
                {activeTab === 'classes' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-foreground">Classes</h2>
                            <button className="px-4 py-2 rounded-xl gradient-primary text-white font-medium flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Add Class
                            </button>
                        </div>
                        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-elevated">
                                    <tr>
                                        <th className="text-left p-4 text-text-secondary font-medium">Class</th>
                                        <th className="text-left p-4 text-text-secondary font-medium">Time</th>
                                        <th className="text-left p-4 text-text-secondary font-medium">Instructor</th>
                                        <th className="text-left p-4 text-text-secondary font-medium">Spots</th>
                                        <th className="text-right p-4 text-text-secondary font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockClasses.map((cls) => (
                                        <tr key={cls.id} className="border-t border-border">
                                            <td className="p-4 text-foreground font-medium">{cls.name}</td>
                                            <td className="p-4 text-text-secondary">{cls.time}</td>
                                            <td className="p-4 text-text-secondary">{cls.instructor}</td>
                                            <td className="p-4 text-text-secondary">{cls.booked}/{cls.spots}</td>
                                            <td className="p-4 text-right">
                                                <button className="text-primary text-sm font-medium">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Other tabs - placeholder */}
                {['clients', 'payments', 'settings'].includes(activeTab) && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto mb-4">
                            {activeTab === 'clients' && <Users className="w-8 h-8 text-text-muted" />}
                            {activeTab === 'payments' && <DollarSign className="w-8 h-8 text-text-muted" />}
                            {activeTab === 'settings' && <Settings className="w-8 h-8 text-text-muted" />}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h3>
                        <p className="text-text-secondary">This section is coming soon.</p>
                    </motion.div>
                )}

                {/* GIA Tab */}
                {activeTab === 'gia' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="p-8 rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 text-center">
                            <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-foreground mb-2">GIA Pro</h2>
                            <p className="text-text-secondary mb-6 max-w-md mx-auto">
                                Let GIA run your business for you. AI-powered scheduling, smart pricing,
                                and client retention - all on autopilot.
                            </p>
                            <button className="px-6 py-3 rounded-xl bg-accent text-white font-semibold">
                                Upgrade to GIA Pro - $19/mo
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: 'AI Scheduling', desc: 'Optimize your class schedule based on demand' },
                                { title: 'Smart Pricing', desc: 'Dynamic pricing suggestions to maximize revenue' },
                                { title: 'Client Retention', desc: 'Alerts when clients are at risk of churning' },
                                { title: 'Automated Follow-ups', desc: 'Personalized messages to bring clients back' },
                            ].map((feature) => (
                                <div key={feature.title} className="p-4 rounded-xl bg-surface border border-border">
                                    <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                                    <p className="text-sm text-text-secondary">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
