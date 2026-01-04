'use client';

import { motion } from 'framer-motion';
import { ClassCategory } from '@/lib/types';

interface IPhoneMockupProps {
    studioName: string;
    brandColor: string;
    icon: string;
    classes: Array<{
        name: string;
        time: string;
        instructor: string;
        category?: ClassCategory;
    }>;
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function IPhoneMockup({ studioName, brandColor, icon, classes }: IPhoneMockupProps) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* iPhone Frame */}
            <div className="relative w-[280px] h-[580px] bg-[#1C1C1E] rounded-[40px] p-2 shadow-2xl border-4 border-[#2C2C2E]">
                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />

                {/* Screen */}
                <div className="relative w-full h-full bg-[#0A0A0A] rounded-[32px] overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 pt-12 pb-2">
                        <span className="text-xs text-white/60">9:41</span>
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-2 bg-white/60 rounded-sm" />
                            <div className="w-6 h-3 border border-white/60 rounded-sm">
                                <div className="w-4 h-full bg-white/60 rounded-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Header with brand */}
                    <div
                        className="px-5 py-4"
                        style={{ background: `linear-gradient(135deg, ${brandColor}20, transparent)` }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                style={{ backgroundColor: brandColor }}
                            >
                                {icon}
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-white">
                                    {studioName || 'Your Studio'}
                                </h1>
                                <p className="text-xs text-white/60">{formattedDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Day Selector */}
                    <div className="flex gap-2 px-5 py-3 overflow-x-auto">
                        {DAY_NAMES.map((day, index) => {
                            const isToday = index === (today.getDay() === 0 ? 6 : today.getDay() - 1);
                            return (
                                <div
                                    key={day}
                                    className={`flex flex-col items-center px-3 py-2 rounded-xl min-w-[44px] ${isToday
                                        ? 'text-white'
                                        : 'bg-[#1C1C1E] text-white/60'
                                        }`}
                                    style={isToday ? { backgroundColor: brandColor } : {}}
                                >
                                    <span className="text-xs">{day}</span>
                                    <span className="text-sm font-medium">{today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1) + index}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Classes List */}
                    <div className="px-5 py-3">
                        <h2 className="text-sm font-medium text-white/60 mb-3">Today's Classes</h2>
                        <div className="space-y-3">
                            {classes.length > 0 ? (
                                classes.slice(0, 3).map((cls, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[#1C1C1E] rounded-2xl p-4"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-white font-medium">{cls.name || 'Class Name'}</h3>
                                                <p className="text-white/60 text-sm">{cls.instructor || 'Instructor'}</p>
                                            </div>
                                            <div
                                                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                                style={{ backgroundColor: brandColor }}
                                            >
                                                {cls.time || '9:00 AM'}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-3">
                                            <span className="text-white/40 text-xs">60 min</span>
                                            <span className="text-white/40 text-xs">•</span>
                                            <span className="text-white/40 text-xs">8 spots left</span>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                // Placeholder classes
                                [...Array(3)].map((_, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[#1C1C1E] rounded-2xl p-4"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="w-24 h-4 bg-white/10 rounded animate-pulse" />
                                                <div className="w-16 h-3 bg-white/5 rounded mt-2 animate-pulse" />
                                            </div>
                                            <div
                                                className="px-3 py-1 rounded-full text-xs font-medium text-white/20"
                                                style={{ backgroundColor: `${brandColor}40` }}
                                            >
                                                --:--
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-white/10 px-8 py-4">
                        <div className="flex justify-between items-center">
                            {['🏠', '📅', '📊', '👤'].map((emoji, index) => (
                                <div
                                    key={index}
                                    className={`text-lg ${index === 0 ? 'opacity-100' : 'opacity-40'}`}
                                >
                                    {emoji}
                                </div>
                            ))}
                        </div>
                        {/* Home Indicator */}
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Glow Effect */}
            <div
                className="absolute -inset-4 rounded-[50px] blur-2xl opacity-20 -z-10"
                style={{ backgroundColor: brandColor }}
            />
        </motion.div>
    );
}
