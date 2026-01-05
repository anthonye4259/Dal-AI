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
        setStep
    } = useBuilder();

    // Local state for "fake" interactions within the phone (like scrolling/tabs)
    // But tabs are also controlled by context for the Tour
    const activeTab = contextActiveTab;

    // Toggle Logic
    const toggleTheme = () => {
        const next = backgroundMode === 'light' ? 'black' : 'light';
        setBackgroundMode(next);
    };

    // Derived styles based on background mode
    const isDark = backgroundMode !== 'light';
    const bgClass = backgroundMode === 'black' ? 'bg-black' : (backgroundMode === 'dark' ? 'bg-[#121212]' : 'bg-[#F9F9F9]');
    const textClass = isDark ? 'text-white' : 'text-black';
    const textMuted = isDark ? 'text-white/60' : 'text-black/60';
    const cardBg = isDark ? 'bg-[#1C1C1E]' : 'bg-white shadow-sm border border-gray-100';

    // Luxe Theme Specifics
    const isLuxe = themeId === 'luxe';
    const radius = isLuxe ? 'rounded-none' : 'rounded-2xl';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* Theme Toggle Control - Floating outside top right */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleTheme();
                }}
                className="absolute -right-16 top-10 w-12 h-12 rounded-full bg-surface border border-border shadow-md flex items-center justify-center hover:scale-110 transition-transform z-50 bg-white dark:bg-black text-black dark:text-white"
                title="Toggle Light/Dark Mode"
                style={{ backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF', color: isDark ? '#FFFFFF' : '#000000', borderColor: isDark ? '#333' : '#E5E5E5' }}
            >
                {backgroundMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* iPhone Frame */}
            <div className="relative w-[300px] h-[620px] bg-[#1C1C1E] rounded-[48px] p-[10px] shadow-2xl border-[6px] border-[#2C2C2E] ring-1 ring-white/10">
                {/* Dynamic Island */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-full z-50 pointer-events-none" />

                {/* Screen Content */}
                <div className={`relative w-full h-full ${bgClass} rounded-[38px] overflow-hidden flex flex-col font-sans transition-colors duration-300`} style={{ fontFamily }}>

                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 pt-12 pb-2 z-40 select-none pointer-events-none">
                        <span className={`text-[10px] font-semibold ${textClass}`}>9:41</span>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-4 h-2.5 ${isDark ? 'bg-white' : 'bg-black'} rounded-[2px]`} />
                        </div>
                    </div>

                    {/* APP CONTENT AREA */}
                    <div className="flex-1 overflow-y-auto hide-scrollbar relative">

                        {/* HEADER SECTION (Interactive -> Step 0/3) */}
                        <div
                            onClick={() => setStep(0)}
                            className="relative px-5 pt-2 pb-6 cursor-pointer group"
                        >
                            {/* Hover Hint */}
                            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors rounded-b-3xl -mx-4 z-0 pointer-events-none" />

                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg transform transition-transform group-hover:scale-110"
                                        style={{ backgroundColor: brandColor, color: isDark || isLuxe ? '#fff' : '#000' }}
                                    >
                                        {icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className={`text-[10px] uppercase tracking-wider font-bold opacity-70 ${textClass}`}>Welcome Back</p>
                                        <h1 className={`text-lg font-bold leading-tight ${textClass}`}>{studioName || 'Studio Name'}</h1>
                                    </div>
                                </div>
                                <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center`}>
                                    <Bell className={`w-4 h-4 ${textClass}`} />
                                </div>
                            </div>

                            {/* Hero Card or Banner */}
                            <div className={`w-full aspect-[2/1] rounded-2xl overflow-hidden relative shadow-lg mb-6 group-hover:ring-2 ring-primary transition-all`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img
                                    src={
                                        themeId === 'yoga' ? "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80" :
                                            themeId === 'energy' ? "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" :
                                                themeId === 'luxe' ? "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80" :
                                                    "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80"
                                    }
                                    className="w-full h-full object-cover"
                                    alt="Studio"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <h2 className="text-white text-lg font-bold">Find your flow</h2>
                                    <button
                                        className="mt-2 text-[10px] font-bold bg-white text-black px-3 py-1.5 rounded-full"
                                        style={{ color: brandColor }}
                                    >
                                        Book a Class
                                    </button>
                                </div>
                            </div>

                            {/* Stats Row (Luxe style) */}
                            <div className="flex gap-3 mb-2">
                                <div className={`flex-1 p-3 ${cardBg} rounded-xl`}>
                                    <p className={`text-[10px] ${textMuted} uppercase`}>Credits</p>
                                    <p className={`text-lg font-bold ${textClass}`}>5</p>
                                </div>
                                <div className={`flex-1 p-3 ${cardBg} rounded-xl`}>
                                    <p className={`text-[10px] ${textMuted} uppercase`}>Streak</p>
                                    <p className={`text-lg font-bold ${textClass}`}>12 <span className="text-[10px]">days</span></p>
                                </div>
                            </div>
                        </div>

                        {/* CLASSES SECTION (Interactive -> Step 5) */}
                        <div
                            onClick={() => setStep(5)}
                            className="px-5 cursor-pointer group pb-20"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className={`font-bold ${textClass}`}>Today's Classes</h2>
                                <span className={`text-xs ${textClass} opacity-60`}>View All</span>
                            </div>

                            <div className="space-y-3 relative">
                                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 -mx-2 -my-2 rounded-xl transition-colors z-0" />

                                {classes.map((cls, idx) => (
                                    <div key={idx} className={`relative z-10 ${cardBg} p-3 rounded-2xl flex items-center gap-3 active:scale-95 transition-transform`}>
                                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                                            <span className={`text-[10px] font-bold ${textClass} opacity-60`}>{cls.time.split(' ')[0]}</span>
                                            <span className={`text-[8px] font-bold uppercase ${textClass} opacity-40`}>{cls.time.split(' ')[1]}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-bold text-sm ${textClass}`}>{cls.name}</h3>
                                            <p className={`text-xs ${textMuted}`}>{cls.instructor} • {cls.duration}m</p>
                                        </div>
                                        <button
                                            className="px-3 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                                            style={{ backgroundColor: brandColor }}
                                        >
                                            Book
                                        </button>
                                    </div>
                                ))}

                                {classes.length === 0 && (
                                    <div className="text-center py-8 opacity-40">
                                        <p className={`text-xs ${textClass}`}>No classes yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM NAV (Interactive -> Step 4) */}
                    <div
                        onClick={() => setStep(4)}
                        className={`absolute bottom-0 left-0 right-0 pt-2 pb-6 px-6 glass-nav cursor-pointer group`}
                        style={{
                            background: isDark ? 'rgba(28,28,30,0.85)' : 'rgba(255,255,255,0.85)',
                            backdropFilter: 'blur(20px)',
                            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
                        }}
                    >
                        {/* Hover Hint Overlay */}
                        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 pointer-events-none transition-colors" />

                        <div className="flex justify-between items-center relative z-10 w-full px-2">
                            {selectedTabs.map((tabId) => {
                                const Icon = TAB_ICONS[tabId] || Home;
                                const isActive = tabId === activeTab;
                                return (
                                    <div key={tabId} className="flex flex-col items-center gap-1 min-w-[40px]">
                                        <div className={`relative transition-all duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                                            <Icon
                                                className={`w-5 h-5 transition-colors ${isActive ? '' : textMuted}`}
                                                style={{ color: isActive ? brandColor : undefined }}
                                                strokeWidth={isActive ? 2.5 : 2}
                                            />
                                            {isActive && (
                                                <div
                                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                                    style={{ backgroundColor: brandColor }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Home Indicator */}
                        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
                    </div>
                </div>
            </div>

            {/* Ambient Glow */}
            <div
                className="absolute inset-0 rounded-[60px] blur-[60px] opacity-20 -z-10 transition-colors duration-1000"
                style={{ backgroundColor: brandColor }}
            />
        </motion.div>
    );
}
