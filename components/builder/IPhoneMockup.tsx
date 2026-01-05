'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBuilder } from '@/context/BuilderContext';
import { Home, Calendar, ShoppingBag, User, MessageCircle, PlayCircle, MapPin, ChevronRight, Bell, Search, Star, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

// Map tab IDs to Lucide Icons
const TAB_ICONS: Record<string, any> = {
    home: Home,
    schedule: Calendar,
    inbox: MessageCircle,
    shop: ShoppingBag,
    content: PlayCircle,
    profile: User
};

export default function IPhoneMockup() {
    const {
        studioName,
        brandColor,
        icon,
        classes,
        selectedTabs,
        themeId,
        fontFamily,
        backgroundMode,
        setBackgroundMode,
        activeTab: contextActiveTab,
        setStep,
        logo,
        accentColor,
        surfaceColor,
        heroImage,
        widgets,
        splashSettings
    } = useBuilder();

    // Local state for interactive preview
    const [activeTab, setActiveTab] = useState('home');
    const [showSplash, setShowSplash] = useState(true);
    const [toast, setToast] = useState<{ visible: boolean; message: string } | null>(null);

    // Sync with tour/context if needed, but allow local override
    useEffect(() => {
        if (contextActiveTab) setActiveTab(contextActiveTab);
    }, [contextActiveTab]);

    // Reset splash when brand changes
    useEffect(() => {
        setShowSplash(true);
        const timer = setTimeout(() => setShowSplash(false), 2500);
        return () => clearTimeout(timer);
    }, [studioName, brandColor, themeId, splashSettings?.animation]);

    // Toast Helper
    const showToast = (msg: string) => {
        setToast({ visible: true, message: msg });
        setTimeout(() => setToast(null), 2000);
    };

    // Toggle Logic
    const toggleTheme = () => {
        const next = backgroundMode === 'light' ? 'black' : 'light';
        setBackgroundMode(next);
    };

    // Derived styles
    const isDark = backgroundMode !== 'light';
    const finalBgColor = backgroundMode === 'light' ? (surfaceColor || '#F9F9F9') : (backgroundMode === 'black' ? '#000000' : '#121212');
    const textClass = isDark ? 'text-white' : 'text-black';
    const textMuted = isDark ? 'text-white/60' : 'text-black/60';
    const cardBg = isDark ? 'bg-[#1C1C1E]' : 'bg-white shadow-sm border border-gray-100';

    // --- VIEWS ---

    const HomeView = () => (
        <div className="px-5 pb-24 space-y-6 pt-2">
            {/* Header */}
            <div onClick={() => setStep(0)} className="cursor-pointer group">
                <div className="flex items-center justify-between mb-4 relative z-10">
                    {logo ? (
                        <div className="h-10">
                            <img src={logo} alt="Studio Logo" className="h-full object-contain" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg"
                                style={{ backgroundColor: brandColor, color: '#fff' }}>
                                {icon}
                            </div>
                            <div className="flex flex-col">
                                <p className={`text-[10px] uppercase tracking-wider font-bold opacity-70 ${textClass}`}>Welcome Back</p>
                                <h1 className={`text-lg font-bold leading-tight ${textClass}`}>{studioName || 'Studio'}</h1>
                            </div>
                        </div>
                    )}
                    <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center`}>
                        <Bell className={`w-4 h-4 ${textClass}`} />
                    </div>
                </div>
            </div>

            {/* Custom Hero */}
            <div onClick={() => setStep(4)} className="w-full aspect-[2/1] rounded-2xl overflow-hidden relative shadow-lg cursor-pointer group hover:ring-2 ring-primary transition-all">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img
                    src={heroImage || (themeId === 'yoga' ? "https://images.unsplash.com/photo-1545205597-3d9d02c29597" : "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0")}
                    className="w-full h-full object-cover" alt="Hero"
                />
                <div className="absolute bottom-4 left-4 z-20">
                    <h2 className="text-white text-lg font-bold">Find your flow</h2>
                    <button className="mt-2 text-[10px] font-bold bg-white text-black px-3 py-1.5 rounded-full" style={{ color: brandColor }}>
                        Book Now
                    </button>
                </div>
            </div>

            {/* Widgets */}
            <div className="space-y-4">
                {(widgets || []).filter(w => w.enabled).sort((a, b) => a.order - b.order).map((widget) => {
                    switch (widget.id) {
                        case 'stats':
                            return (
                                <div key="stats" className="flex gap-3">
                                    <div className={`flex-1 p-3 ${cardBg} rounded-xl`}>
                                        <p className={`text-[10px] ${textMuted} uppercase`}>Credits</p>
                                        <p className={`text-lg font-bold ${textClass}`}>5</p>
                                    </div>
                                    <div className={`flex-1 p-3 ${cardBg} rounded-xl`}>
                                        <p className={`text-[10px] ${textMuted} uppercase`}>Streak</p>
                                        <p className={`text-lg font-bold ${textClass}`}>12 <span className="text-[10px]">days</span></p>
                                    </div>
                                </div>
                            );
                        case 'classes': return (
                            <div key="classes">
                                <div className="flex items-center justify-between mb-3"><h2 className={`font-bold ${textClass}`}>Today's Classes</h2></div>
                                {classes.slice(0, 3).map((cls, idx) => (
                                    <div key={idx} className={`${cardBg} p-3 rounded-2xl flex items-center gap-3 mb-2`}>
                                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                                            <span className={`text-[10px] font-bold ${textClass}`}>{cls.time.split(' ')[0]}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-bold text-sm ${textClass}`}>{cls.name}</h3>
                                            <p className={`text-xs ${textMuted}`}>{cls.instructor}</p>
                                        </div>
                                        <button onClick={(e) => { e.stopPropagation(); showToast('Class Booked!'); }} className="px-3 py-1.5 rounded-full text-[10px] text-white font-bold" style={{ backgroundColor: brandColor }}>Book</button>
                                    </div>
                                ))}
                            </div>
                        );
                        default: return null;
                    }
                })}
            </div>
        </div>
    );

    const ScheduleView = () => (
        <div className="px-5 pb-24 space-y-6 pt-6">
            <h2 className={`text-2xl font-bold ${textClass}`}>Schedule</h2>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                    <div key={day} className={`min-w-[50px] h-[70px] rounded-2xl flex flex-col items-center justify-center ${i === 2 ? 'bg-primary text-white' : cardBg}`}
                        style={{ backgroundColor: i === 2 ? brandColor : undefined }}>
                        <span className={`text-xs ${i === 2 ? 'opacity-100' : textMuted}`}>{day}</span>
                        <span className={`text-lg font-bold ${i === 2 ? 'text-white' : textClass}`}>{12 + i}</span>
                    </div>
                ))}
            </div>
            <div className="space-y-3">
                {classes.map((cls, idx) => (
                    <div key={idx} className={`${cardBg} p-4 rounded-2xl flex items-center gap-4`}>
                        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                            <span className={`text-xs font-bold ${textClass}`}>{cls.time}</span>
                        </div>
                        <div className="flex-1">
                            <h3 className={`font-bold ${textClass}`}>{cls.name}</h3>
                            <p className={`text-sm ${textMuted}`}>{cls.instructor} • 45m</p>
                        </div>
                        <button onClick={() => showToast('Class Booked!')} className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: brandColor }}>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const ProfileView = () => (
        <div className="px-5 pb-24 space-y-6 pt-6 text-center">
            <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 border-4 border-surface shadow-xl mb-4" />
            <h2 className={`text-2xl font-bold ${textClass}`}>Sarah Jenkins</h2>
            <p className={`${textMuted}`}>Member since 2024</p>

            <div className={`grid grid-cols-2 gap-4 mt-6`}>
                <div className={`p-4 ${cardBg} rounded-2xl`}>
                    <p className={`text-2xl font-bold ${textClass}`}>24</p>
                    <p className={`text-xs uppercase font-bold ${textMuted}`}>Classes</p>
                </div>
                <div className={`p-4 ${cardBg} rounded-2xl`}>
                    <p className={`text-2xl font-bold ${textClass}`}>12</p>
                    <p className={`text-xs uppercase font-bold ${textMuted}`}>Streak</p>
                </div>
            </div>

            <div className={`${cardBg} rounded-2xl p-4 text-left space-y-4 mt-6`}>
                <div className="flex justify-between items-center">
                    <span className={textClass}>Edit Profile</span>
                    <ChevronRight size={16} className={textMuted} />
                </div>
                <div className="flex justify-between items-center">
                    <span className={textClass}>Membership</span>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded" style={{ color: brandColor }}>Active</span>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative">
            {/* Theme Toggle */}
            <button onClick={(e) => { e.stopPropagation(); toggleTheme(); }} className="absolute -right-16 top-10 w-12 h-12 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform z-50 bg-white dark:bg-black text-black dark:text-white"
                style={{ backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF', color: isDark ? '#FFFFFF' : '#000000' }}>
                {backgroundMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="relative w-[300px] h-[620px] bg-[#1C1C1E] rounded-[48px] p-[10px] shadow-2xl border-[6px] border-[#2C2C2E] ring-1 ring-white/10">
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-full z-50 pointer-events-none" />

                <div className={`relative w-full h-full rounded-[38px] overflow-hidden flex flex-col font-sans transition-colors duration-300`} style={{ fontFamily, backgroundColor: finalBgColor }}>

                    {/* Splash Overlay */}
                    <AnimatePresence>
                        {showSplash && (
                            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[60] flex flex-col items-center justify-center" style={{ backgroundColor: brandColor }}>
                                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4">
                                    {logo ? <img src={logo} className="w-24 h-24 object-contain" /> : <div className="text-6xl text-white">{icon}</div>}
                                    <h1 className="text-white text-2xl font-bold">{studioName || 'Studio'}</h1>
                                    {splashSettings?.tagline && <p className="text-white/80 text-sm">{splashSettings.tagline}</p>}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Toast */}
                    <AnimatePresence>
                        {toast && (
                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl z-50 flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">✓</span>
                                {toast.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 pt-12 pb-2 z-40 select-none pointer-events-none">
                        <span className={`text-[10px] font-semibold ${textClass}`}>9:41</span>
                        <div className="flex gap-1.5"><div className={`w-4 h-2.5 ${isDark ? 'bg-white' : 'bg-black'} rounded-[2px]`} /></div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto hide-scrollbar relative">
                        {activeTab === 'home' && <HomeView />}
                        {activeTab === 'schedule' && <ScheduleView />}
                        {activeTab === 'profile' && <ProfileView />}
                        {/* Fallback for other tabs */}
                        {!['home', 'schedule', 'profile'].includes(activeTab) && (
                            <div className="h-full flex items-center justify-center p-8 text-center opacity-40">
                                <div>
                                    <h3 className={`font-bold ${textClass}`}>Coming Soon</h3>
                                    <p className={`text-xs ${textClass}`}>This tab is under construction.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Nav */}
                    <div className={`absolute bottom-0 left-0 right-0 pt-2 pb-6 px-6 glass-nav cursor-pointer z-40`}
                        style={{ background: isDark ? 'rgba(28,28,30,0.85)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
                        <div className="flex justify-between items-center relative z-10 w-full px-2">
                            {selectedTabs.map((tabId) => {
                                const Icon = TAB_ICONS[tabId] || Home;
                                const isActive = tabId === activeTab;
                                return (
                                    <div key={tabId} onClick={(e) => { e.stopPropagation(); setActiveTab(tabId); }} className="flex flex-col items-center gap-1 min-w-[40px] hover:opacity-80 transition-opacity">
                                        <div className={`relative transition-all duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                                            <Icon className={`w-5 h-5`} style={{ color: isActive ? brandColor : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)') }} strokeWidth={isActive ? 2.5 : 2} />
                                            {isActive && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: brandColor }} />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
                    </div>
                </div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute inset-0 rounded-[60px] blur-[60px] opacity-20 -z-10 transition-colors duration-1000" style={{ backgroundColor: brandColor }} />
        </motion.div>
    );
}
