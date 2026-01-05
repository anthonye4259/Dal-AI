'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Sparkles, Plus, Trash2, Clock, DollarSign, Users, Home, Calendar, MessageCircle, ShoppingBag, User, PlayCircle, Settings, Palette, Smartphone, Trophy, Utensils, TrendingUp, Bell, Gift, Star, Ticket, Play, Globe } from 'lucide-react';
import { ClassCategory } from '@/lib/types';

// Theme Presets (Mobile Parity)
const THEME_PRESETS = [
    {
        id: 'zen',
        name: 'Zen Studio',
        description: 'Calm, minimal, and grounding',
        vibe: 'Yoga • Meditation • Wellness',
        colors: { primary: '#9DB4A0', background: '#0A0A0A', accent: '#C9D4C6', text: '#FFFFFF' },
        gradient: 'from-[#0A0A0A] to-[#1a1f1a]',
        font: 'Sans-Serif'
    },
    {
        id: 'energy',
        name: 'High Energy',
        description: 'Bold, intense, and powerful',
        vibe: 'HIIT • Boxing • CrossFit',
        colors: { primary: '#FF3B30', background: '#0A0A0A', accent: '#FF6B5B', text: '#FFFFFF' },
        gradient: 'from-[#0A0A0A] to-[#1a0a0a]',
        font: 'Oswald'
    },
    {
        id: 'luxe',
        name: 'Luxe Boutique',
        description: 'Premium, elegant, exclusive',
        vibe: 'Boutique • Pilates • Private',
        colors: { primary: '#D4AF37', background: '#0A0A0A', accent: '#E8D5A3', text: '#FFFFFF' },
        gradient: 'from-[#0A0A0A] to-[#1a1508]',
        font: 'Playfair Display'
    },
    {
        id: 'ocean',
        name: 'Ocean Breeze',
        description: 'Cool, refreshing, serene',
        vibe: 'Swim • Recovery • Flow',
        colors: { primary: '#5AC8FA', background: '#0A0A0A', accent: '#8EDAFF', text: '#FFFFFF' },
        gradient: 'from-[#0A0A0A] to-[#0a1a1f]',
        font: 'Inter'
    },
    {
        id: 'night',
        name: 'Night Mode',
        description: 'Dark, sleek, modern',
        vibe: 'Evening • Cycle • Strength',
        colors: { primary: '#BF5AF2', background: '#0A0A0A', accent: '#DA8FFF', text: '#FFFFFF' },
        gradient: 'from-[#0A0A0A] to-[#150a1a]',
        font: 'Inter'
    },
    {
        id: 'earth',
        name: 'Grounded',
        description: 'Natural, warm, organic',
        vibe: 'Outdoor • Hiking • Nature',
        colors: { primary: '#8B7355', background: '#0A0A0A', accent: '#BFA98A', text: '#FFFFFF' },
        gradient: 'from-[#0A0A0A] to-[#1a1510]',
        font: 'Merriweather'
    }
];

// Font Options (Mobile Parity)
const FONT_OPTIONS = [
    { id: 'modern', name: 'Modern', family: 'Inter', desc: 'Clean & contemporary' },
    { id: 'elegant', name: 'Elegant', family: 'Playfair Display', desc: 'Sophisticated serif' },
    { id: 'bold', name: 'Bold', family: 'Oswald', desc: 'Strong & impactful' },
    { id: 'soft', name: 'Soft', family: 'Poppins', desc: 'Friendly & rounded' },
    { id: 'minimal', name: 'Minimal', family: 'Space Grotesk', desc: 'Light & airy' },
];

// Feature Categories (Mobile Parity)
// Mobile Parity Features List
const FEATURES = [
    { id: 'classes', label: 'Class Booking', icon: <Calendar className="w-5 h-5" />, desc: 'Book group classes' },
    { id: 'video', label: 'Video Library', icon: <PlayCircle className="w-5 h-5" />, desc: 'On-demand workouts' },
    { id: 'community', label: 'Community', icon: <Users className="w-5 h-5" />, desc: 'Member chat & feed' },
    { id: 'shop', label: 'Merch Store', icon: <ShoppingBag className="w-5 h-5" />, desc: 'Sell merchandise' },
    { id: 'appointments', label: '1:1 Sessions', icon: <Clock className="w-5 h-5" />, desc: 'Private bookings' },
    { id: 'packs', label: 'Credit Packs', icon: <Ticket className="w-5 h-5" />, desc: 'Class pack sales' },
    { id: 'challenges', label: 'Challenges', icon: <Trophy className="w-5 h-5" />, desc: '30-day programs' },
    { id: 'nutrition', label: 'Nutrition', icon: <Utensils className="w-5 h-5" />, desc: 'Meal plans' },
    { id: 'progress', label: 'Progress Tracking', icon: <TrendingUp className="w-5 h-5" />, desc: 'Member progress' },
    { id: 'notifications', label: 'Push Notifications', icon: <Bell className="w-5 h-5" />, desc: 'Broadcasts' },
    { id: 'referrals', label: 'Referral Program', icon: <Gift className="w-5 h-5" />, desc: 'Member rewards' },
    { id: 'reviews', label: 'Reviews', icon: <Star className="w-5 h-5" />, desc: 'Class ratings' },
    { id: 'ai_coach', label: 'AI Wellness Coach', icon: <Sparkles className="w-5 h-5" />, desc: '24/7 Member Assistant' },
];

// Expanded 50+ Color Presets
const COLOR_PRESETS = [
    // Blues & Cyans (Cool)
    { name: 'Ocean', color: '#4A9FD4', icon: '🌊' },
    { name: 'Sky', color: '#0EA5E9', icon: '☁️' },
    { name: 'Navy', color: '#1E3A8A', icon: '⚓' },
    { name: 'Teal', color: '#14B8A6', icon: '🦈' },
    { name: 'Cyan', color: '#06B6D4', icon: '💎' },
    { name: 'Azure', color: '#3B82F6', icon: '🌀' },
    { name: 'Indigo', color: '#6366F1', icon: '🌌' },
    { name: 'Midnight', color: '#1E1B4B', icon: '🌙' },
    { name: 'Slate', color: '#64748B', icon: '🌫️' },
    { name: 'Ice', color: '#BAE6FD', icon: '🧊' },

    // Greens (Natural)
    { name: 'Forest', color: '#6B9B5A', icon: '🌿' },
    { name: 'Emerald', color: '#10B981', icon: '🥬' },
    { name: 'Lime', color: '#84CC16', icon: '🍋' },
    { name: 'Sage', color: '#78716C', icon: '🪴' },
    { name: 'Pine', color: '#064E3B', icon: '🌲' },
    { name: 'Mint', color: '#6EE7B7', icon: '🍵' },
    { name: 'Olive', color: '#65A30D', icon: '🫒' },
    { name: 'Moss', color: '#3F6212', icon: '🌵' },
    { name: 'Fern', color: '#15803D', icon: '🎍' },
    { name: 'Jungle', color: '#14532D', icon: '🌴' },

    // Pinks & Purples (Vibrant)
    { name: 'Rose', color: '#EC4899', icon: '🌸' },
    { name: 'Lavender', color: '#8B5CF6', icon: '💜' },
    { name: 'Magenta', color: '#D946EF', icon: '🔮' },
    { name: 'Fuchsia', color: '#C026D3', icon: '💅' },
    { name: 'Plum', color: '#701A75', icon: '🍑' },
    { name: 'Violet', color: '#7C3AED', icon: '🍆' },
    { name: 'Orchid', color: '#A21CAF', icon: '🌺' },
    { name: 'Blush', color: '#FBCFE8', icon: '😊' },
    { name: 'Berry', color: '#831843', icon: '🍓' },
    { name: 'Wine', color: '#881337', icon: '🍷' },

    // Reds & Oranges (Warm)
    { name: 'Sunset', color: '#E67E22', icon: '🌅' },
    { name: 'Coral', color: '#F97316', icon: '🪸' },
    { name: 'Peach', color: '#FDBA74', icon: '🍑' },
    { name: 'Fire', color: '#EF4444', icon: '🔥' },
    { name: 'Rust', color: '#9A3412', icon: '🍂' },
    { name: 'Amber', color: '#F59E0B', icon: '🍯' },
    { name: 'Gold', color: '#EAB308', icon: '🏆' },
    { name: 'Orange', color: '#EA580C', icon: '🍊' },
    { name: 'Ruby', color: '#9F1239', icon: '💎' },
    { name: 'Crimson', color: '#BE123C', icon: '🧣' },

    // Neutrals & Others
    { name: 'Charcoal', color: '#334155', icon: '🌑' },
    { name: 'Stone', color: '#57534E', icon: '🗿' },
    { name: 'Sand', color: '#D6D3D1', icon: '🏜️' },
    { name: 'Cream', color: '#FEF3C7', icon: '🍦' },
    { name: 'Espresso', color: '#451A03', icon: '☕' },
    { name: 'Chocolate', color: '#713F12', icon: '🍫' },
    { name: 'Bronze', color: '#78350F', icon: '🥉' },
    { name: 'Silver', color: '#94A3B8', icon: '🥈' },
    { name: 'Graphite', color: '#1E293B', icon: '✏️' },
    { name: 'Black', color: '#000000', icon: '🕶️' },
];

// Feature Toggle Options (Legacy, keeping for compatibility reference if needed)
const FEATURE_OPTIONS_LEGACY = [
    { id: 'booking', name: 'Class Booking', icon: '📅', desc: 'Allow clients to book classes' },
    { id: 'waitlist', name: 'Waitlists', icon: '⏳', desc: 'Auto-fill spots from waitlist' },
    { id: 'payments', name: 'Payments', icon: '💳', desc: 'Accept credit cards via Stripe' },
    { id: 'memberships', name: 'Memberships', icon: '🎖️', desc: 'Recurring subscription plans' },
    { id: 'push', name: 'Push Notifications', icon: '🔔', desc: 'Send alerts to clients' },
    { id: 'chat', name: 'In-App Chat', icon: '💬', desc: 'Message clients directly' },
    { id: 'videos', name: 'Video Library', icon: '🎬', desc: 'On-demand workout videos' },
    { id: 'shop', name: 'Shop', icon: '🛍️', desc: 'Sell merchandise and gear' },
];

// Studio type options
const STUDIO_TYPES = [
    { value: 'yoga', label: 'Yoga Studio', icon: '🧘' },
    { value: 'pilates', label: 'Pilates', icon: '🤸' },
    { value: 'barre', label: 'Barre', icon: '🩰' },
    { value: 'meditation', label: 'Meditation', icon: '🧠' },
    { value: 'other', label: 'Other Wellness', icon: '✨' },
];

// Enhanced class type with all mobile fields
interface BuilderClass {
    name: string;
    time: string;
    instructor: string;
    category: ClassCategory;
    duration: number; // minutes
    price: number;
    maxSpots: number;
}

// Studio settings
interface StudioSettings {
    cancellationWindow: number; // hours
    lateFee: number;
    waitlistSize: number;
}

// Suggested classes by category
const SUGGESTED_CLASSES: Record<ClassCategory, BuilderClass[]> = {
    yoga: [
        { name: 'Morning Vinyasa Flow', time: '6:30 AM', instructor: 'Sarah', category: 'yoga', duration: 60, price: 25, maxSpots: 20 },
        { name: 'Power Yoga', time: '9:00 AM', instructor: 'Mike', category: 'yoga', duration: 75, price: 30, maxSpots: 18 },
        { name: 'Yin Restore', time: '7:00 PM', instructor: 'Emma', category: 'yoga', duration: 60, price: 25, maxSpots: 15 },
    ],
    pilates: [
        { name: 'Mat Pilates', time: '7:00 AM', instructor: 'Anna', category: 'pilates', duration: 55, price: 28, maxSpots: 12 },
        { name: 'Core Sculpt', time: '12:00 PM', instructor: 'Chris', category: 'pilates', duration: 45, price: 25, maxSpots: 10 },
        { name: 'Pilates Fusion', time: '5:30 PM', instructor: 'Lisa', category: 'pilates', duration: 60, price: 30, maxSpots: 12 },
    ],
    barre: [
        { name: 'Classic Barre', time: '8:00 AM', instructor: 'Rachel', category: 'barre', duration: 55, price: 28, maxSpots: 15 },
        { name: 'Cardio Barre', time: '10:00 AM', instructor: 'Jessica', category: 'barre', duration: 45, price: 25, maxSpots: 18 },
        { name: 'Barre Sculpt', time: '6:00 PM', instructor: 'Nicole', category: 'barre', duration: 55, price: 28, maxSpots: 15 },
    ],
    meditation: [
        { name: 'Morning Meditation', time: '6:00 AM', instructor: 'David', category: 'meditation', duration: 30, price: 15, maxSpots: 25 },
        { name: 'Mindful Breathwork', time: '12:00 PM', instructor: 'Zen', category: 'meditation', duration: 45, price: 20, maxSpots: 20 },
        { name: 'Evening Calm', time: '8:00 PM', instructor: 'Maya', category: 'meditation', duration: 30, price: 15, maxSpots: 25 },
    ],
    other: [
        { name: 'Stretch & Release', time: '9:00 AM', instructor: 'Jordan', category: 'other', duration: 45, price: 20, maxSpots: 15 },
        { name: 'Movement Flow', time: '11:00 AM', instructor: 'Alex', category: 'other', duration: 60, price: 25, maxSpots: 18 },
        { name: 'Recovery Session', time: '4:00 PM', instructor: 'Sam', category: 'other', duration: 45, price: 20, maxSpots: 12 },
    ],
};

// Available Tabs (Mobile Parity)
const AVAILABLE_TABS = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" />, desc: 'Dashboard & highlights' },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-5 h-5" />, desc: 'Class booking calendar' },
    { id: 'inbox', label: 'Inbox', icon: <MessageCircle className="w-5 h-5" />, desc: 'Messages & notifications' },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag className="w-5 h-5" />, desc: 'Merch & packages' },
    { id: 'content', label: 'Content', icon: <PlayCircle className="w-5 h-5" />, desc: 'On-demand videos' },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" />, desc: 'Account settings' },
];

const STEPS = ['Studio', 'Magic Build', 'Theme', 'Brand', 'Navigation', 'Classes', 'Features', 'Preview', 'Launch'];


export default function BuilderFlow({ onPreviewUpdate }: { onPreviewUpdate?: (props: any) => void }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentStep, setCurrentStep] = useState(0);

    // Core Identity
    const [studioName, setStudioName] = useState('');
    const [tagline, setTagline] = useState('');
    const [studioType, setStudioType] = useState<ClassCategory>('yoga');

    // Magic Build State
    const [magicPrompt, setMagicPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Visual Brand
    const [brandColor, setBrandColor] = useState('#4A9FD4');
    const [themeId, setThemeId] = useState('zen');
    const [fontFamily, setFontFamily] = useState('Inter');

    // Advanced Customization State
    const [useCustomColor, setUseCustomColor] = useState(false);
    const [customColor, setCustomColor] = useState('#00E5FF');
    const [backgroundMode, setBackgroundMode] = useState<'light' | 'dark' | 'black'>('black');

    // Navigation State
    const [selectedTabs, setSelectedTabs] = useState<string[]>(['home', 'schedule', 'profile']);

    const [icon, setIcon] = useState('🧘');

    // Classes & Features
    const [classes, setClasses] = useState<BuilderClass[]>([]);
    const [features, setFeatures] = useState<string[]>(['classes', 'packs', 'notifications']);

    // Settings
    const [settings, setSettings] = useState<StudioSettings>({
        cancellationWindow: 24,
        lateFee: 10,
        waitlistSize: 5,
    });

    const [isLoading, setIsLoading] = useState(false);

    // Tour State
    const [isTourActive, setIsTourActive] = useState(false);
    const [tourStep, setTourStep] = useState(0);
    const [tourTabOverride, setTourTabOverride] = useState<string | null>(null);

    // Update preview
    useEffect(() => {
        if (onPreviewUpdate) {
            const currentBrandColor = useCustomColor ? customColor : brandColor;

            onPreviewUpdate({
                studioName: studioName || 'Your Studio',
                brandColor: currentBrandColor,
                theme: themeId,
                studioType,
                icon,
                tagline,
                fontFamily,
                backgroundMode: backgroundMode,
                tabs: selectedTabs,
                classes: classes || [],
                activeTabOverride: tourTabOverride // Pass the override for the tour
            });
        }
    }, [studioName, brandColor, customColor, useCustomColor, studioType, icon, themeId, tagline, fontFamily, backgroundMode, selectedTabs, classes, onPreviewUpdate, tourTabOverride]);

    // Apply Theme Presets
    const applyTheme = (id: string) => {
        const theme = THEME_PRESETS.find(t => t.id === id);
        if (theme) {
            setThemeId(id);
            setBrandColor(theme.colors.primary);
            setFontFamily(theme.font);
        }
    };

    // Pre-fill studio name from URL
    useEffect(() => {
        const name = searchParams.get('name');
        if (name) {
            setStudioName(name);
        }
    }, [searchParams]);

    // Tour Logic
    useEffect(() => {
        if (!isTourActive) return;

        const tourSequence = [
            { step: 0, tab: 'home', duration: 4000 },
            { step: 1, tab: 'schedule', duration: 4000 },
            { step: 2, tab: features.includes('shop') ? 'shop' : 'home', duration: 4000 }, // Fallback if no shop
            { step: 3, tab: 'home', duration: 0 } // End
        ];

        const currentSeq = tourSequence[tourStep];

        if (tourStep >= tourSequence.length - 1) {
            setIsTourActive(false);
            setTourTabOverride(null);
            setCurrentStep(8); // Go to Launch
            return;
        }

        setTourTabOverride(currentSeq.tab);

        const timer = setTimeout(() => {
            setTourStep(prev => prev + 1);
        }, currentSeq.duration);

        return () => clearTimeout(timer);
    }, [isTourActive, tourStep, features]);

    const startTour = () => {
        setIsTourActive(true);
        setTourStep(0);
    };

    // Magic Build Logic (Mock AI)
    const handleMagicBuild = () => {
        setIsGenerating(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const prompt = magicPrompt.toLowerCase();
            let predictedType: ClassCategory = 'other';
            let predictedThemeId = 'zen';
            let predictedFeatures = ['classes', 'notifications'];

            // 1. Predict Studio Type
            if (prompt.match(/yoga|flow|stretch|mindful/)) predictedType = 'yoga';
            else if (prompt.match(/pilates|reformer|core/)) predictedType = 'pilates';
            else if (prompt.match(/barre|ballet|tone/)) predictedType = 'barre';
            else if (prompt.match(/medit|calm|zen|breath/)) predictedType = 'meditation';
            else if (prompt.match(/box|fight|gym|lift|strength|hiit|crossfit/)) {
                // Approximate mapping for types not in strict enum
                predictedType = 'other';
            }

            // 2. Predict Theme/Vibe
            if (prompt.match(/energy|power|intense|hard|box|hiit/)) predictedThemeId = 'energy';
            else if (prompt.match(/luxury|premium|exclusive|private/)) predictedThemeId = 'luxe';
            else if (prompt.match(/calm|peace|restore|slow/)) predictedThemeId = 'zen';
            else if (prompt.match(/swim|water|pool|recovery/)) predictedThemeId = 'ocean';
            else if (prompt.match(/nature|out|ground|earth/)) predictedThemeId = 'earth';
            else if (prompt.match(/dark|night|cycle|spin/)) predictedThemeId = 'night';

            // 3. Predict Features
            if (prompt.match(/video|content|demand/)) predictedFeatures.push('video');
            if (prompt.match(/community|chat|social/)) predictedFeatures.push('community');
            if (prompt.match(/product|merch|gear|shop|sell/)) predictedFeatures.push('shop');
            if (prompt.match(/private|1:1|appoint|personal/)) predictedFeatures.push('appointments');
            if (prompt.match(/challenge|compete|leader/)) predictedFeatures.push('challenges');
            if (prompt.match(/food|diet|meal|nutrition/)) predictedFeatures.push('nutrition');
            if (prompt.match(/ai|coach|smart/)) predictedFeatures.push('ai_coach');

            // Apply Predictions
            setStudioType(predictedType);
            applyTheme(predictedThemeId);
            setFeatures([...new Set(predictedFeatures)]); // Dedup

            // Auto-fill tagline if empty
            if (!tagline) {
                if (predictedType === 'yoga') setTagline('Find your flow.');
                else if (predictedType === 'pilates') setTagline('Strengthen your core.');
                else if (predictedThemeId === 'energy') setTagline('Unleash your potential.');
                else setTagline('Welcome to your studio.');
            }

            setIsGenerating(false);
            setCurrentStep(2); // Move to next step (Theme used to be 1, now 2)
        }, 1500);
    };

    // Update suggested classes when studio type changes (Modified to run only if not empty)
    useEffect(() => {
        if (!studioType) return;
        const suggestions = SUGGESTED_CLASSES[studioType];

        // Only override if classes are empty (don't overwrite manual edits if coming back)
        if (classes.length === 0) {
            setClasses(suggestions);
        }

        setIcon(STUDIO_TYPES.find(t => t.value === studioType)?.icon || '🧘');

        // Only auto-select theme if user hasn't magically generated or manually picked (simple check)
        // For now, we trust the magic build or manual selection
    }, [studioType]);

    const canProceed = () => {
        switch (currentStep) {
            case 0: return studioName.trim().length > 0;
            case 1: return true; // Magic Build (Input optional, can skip)
            case 2: return true; // Theme
            case 3: return true; // Brand
            case 4: return selectedTabs.length >= 3 && selectedTabs.length <= 5; // Navigation
            case 5: return classes.length > 0; // Classes
            case 6: return true; // Features
            case 7: return true; // Preview
            case 8: return true; // Launch
            default: return false;
        }
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleLaunch();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleLaunch = () => {
        try {
            setIsLoading(true);
            sessionStorage.setItem('builderState', JSON.stringify({
                studioName,
                tagline,
                studioType,
                brandColor: useCustomColor ? customColor : brandColor,
                themeId,
                fontFamily,
                icon,
                classes,
                features,
                settings,
                backgroundMode,
                tabs: JSON.stringify(selectedTabs), // Store selected tabs
                launchedAt: new Date().toISOString()
            }));

            // If we have a user, ensure we don't clear their auth state
            // but we can clear the builder state if we want
            // For now, let's keep it simple and just redirect
            // router.push('/onboarding/signup'); // Changed from /checkout to /onboarding/signup for mobile parity flow if needed, but sticking to checkout for web
            router.push('/checkout'); // Revert to checkout for now
        } catch (error) {
            console.error('Error saving builder state:', error);
            // Fallback navigation
            router.push('/checkout');
        }
    };

    const addClass = () => {
        setClasses([...classes, {
            name: '',
            time: '9:00 AM',
            instructor: '',
            category: studioType,
            duration: 60,
            price: 25,
            maxSpots: 15,
        }]);
    };

    const removeClass = (index: number) => {
        setClasses(classes.filter((_, i) => i !== index));
    };

    const updateClass = (index: number, field: keyof BuilderClass, value: string | number) => {
        const newClasses = [...classes];
        (newClasses[index] as any)[field] = value;
        setClasses(newClasses);
    };

    return (
        <div className="h-full w-full">
            {/* Form Content */}
            <div className="h-full overflow-y-auto hide-scrollbar">
                {/* Header for Mobile */}
                <div className="flex items-center justify-between mb-8 md:hidden">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 text-text-secondary hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 hide-scrollbar">
                    {STEPS.map((step, index) => (
                        <div key={step} className="flex items-center flex-shrink-0">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${index < currentStep
                                    ? 'bg-primary text-white'
                                    : index === currentStep
                                        ? 'bg-primary text-white'
                                        : 'bg-surface border border-border text-text-muted'
                                    }`}
                            >
                                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                            </div>
                            <span
                                className={`ml-2 text-sm ${index <= currentStep ? 'text-foreground font-medium' : 'text-text-muted'
                                    }`}
                            >
                                {step}
                            </span>
                            {index < STEPS.length - 1 && (
                                <div
                                    className={`w-8 h-0.5 mx-2 ${index < currentStep ? 'bg-primary' : 'bg-border'
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Tour Overlay */}
                {isTourActive && (
                    <div className="absolute inset-0 z-50 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                        <div className="max-w-md space-y-6">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                            </div>

                            {tourStep === 0 && (
                                <div className="space-y-2 animate-in slide-in-from-bottom-4 fade-in">
                                    <h3 className="text-3xl font-bold">Welcome to {studioName || 'Your Studio'}</h3>
                                    <p className="text-xl text-text-secondary">Your app is fully branded with your {themeId} theme and custom colors.</p>
                                </div>
                            )}
                            {tourStep === 1 && (
                                <div className="space-y-2 animate-in slide-in-from-bottom-4 fade-in">
                                    <h3 className="text-3xl font-bold">Seamless Booking</h3>
                                    <p className="text-xl text-text-secondary">Clients can browse your {studioType} schedule and book instantly.</p>
                                </div>
                            )}
                            {tourStep === 2 && (
                                <div className="space-y-2 animate-in slide-in-from-bottom-4 fade-in">
                                    <h3 className="text-3xl font-bold">More than just booking</h3>
                                    <p className="text-xl text-text-secondary">Engage users with features like {features.includes('shop') ? 'Merch Store' : 'Community'} and Member Profiles.</p>
                                </div>
                            )}

                            <div className="w-full h-1 bg-border rounded-full overflow-hidden mt-8">
                                <div
                                    className="h-full bg-primary transition-all duration-[4000ms] ease-linear"
                                    style={{ width: '100%' }}
                                    key={tourStep} // Reset animation on step change
                                />
                            </div>

                            <button
                                onClick={() => {
                                    setIsTourActive(false);
                                    setTourTabOverride(null);
                                    setCurrentStep(8);
                                }}
                                className="text-sm text-text-muted hover:text-foreground mt-4"
                            >
                                Skip Tour
                            </button>
                        </div>
                    </div>
                )}

                {/* Step Content */}
                <div key={currentStep} className="pb-24">

                    {/* Content for steps (Same as before) */}

                    {/* Step 0: Studio Name & Type */}
                    {/* Step 0: Studio Name & Type */}
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">First, tell us about your studio.</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary">Studio Name</label>
                                <input
                                    type="text"
                                    value={studioName}
                                    onChange={(e) => setStudioName(e.target.value)}
                                    placeholder="e.g. Zen Yoga Studio"
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-lg font-medium placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary">Tagline</label>
                                <input
                                    type="text"
                                    value={tagline}
                                    onChange={(e) => setTagline(e.target.value)}
                                    placeholder="e.g. Find your flow."
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary">Studio Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {STUDIO_TYPES.map((type) => (
                                        <button
                                            key={type.value}
                                            onClick={() => setStudioType(type.value as ClassCategory)}
                                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${studioType === type.value
                                                ? 'bg-primary/10 border-primary text-foreground'
                                                : 'bg-surface border-border text-text-secondary hover:border-primary/50'
                                                }`}
                                        >
                                            <span className="text-2xl">{type.icon}</span>
                                            <span className="font-medium">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Magic Build (New) */}
                    {currentStep === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold">Build your app with words.</h2>
                                <p className="text-lg text-text-secondary">
                                    Describe your vision, and our AI will generate a starting point for you.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <textarea
                                    value={magicPrompt}
                                    onChange={(e) => setMagicPrompt(e.target.value)}
                                    placeholder="e.g. A high-energy boxing gym in New York with a focus on community challenges and heavy metal music."
                                    className="w-full h-40 bg-surface border border-border rounded-2xl p-6 text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-text-muted/50"
                                    autoFocus
                                />

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleMagicBuild}
                                        disabled={!magicPrompt.trim() || isGenerating}
                                        className="flex-1 py-4 bg-foreground text-background rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Sparkles className="w-5 h-5 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Generate Base
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        className="px-6 rounded-xl font-medium text-text-secondary hover:text-foreground hover:bg-surface border border-transparent hover:border-border transition-all"
                                    >
                                        Skip
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-surface/50 border border-border/50 text-sm text-text-muted">
                                <p><strong>Tip:</strong> Try describing your vibe ("calm", "intense"), colors ("green", "neon"), or features ("video library", "shop").</p>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Themes (Shifted from 1) */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Choose a starting vibe.</h2>
                            <p className="text-text-secondary">These presets set your colors and fonts. You can tweak them next.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {THEME_PRESETS.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => applyTheme(theme.id)}
                                        className={`group relative p-6 rounded-2xl border text-left transition-all overflow-hidden ${themeId === theme.id
                                            ? 'border-primary ring-1 ring-primary'
                                            : 'bg-surface border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50`} />
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-lg font-bold text-white">{theme.name}</span>
                                                {themeId === theme.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                            </div>
                                            <p className="text-sm text-white/60 mb-3">{theme.description}</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
                                                <span className="text-xs text-white/40">{theme.vibe}</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Brand Identity (Shifted from 2) */}
                    {currentStep === 3 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Fine tune your brand.</h2>

                                <div className="space-y-6">
                                    {/* Icon */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-text-secondary">App Icon</label>
                                        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                                            {['🧘', '🏃', '💪', '🤸', '🩰', '🏋️', '🥊', '🏊', '🚴'].map((emoji) => (
                                                <button
                                                    key={emoji}
                                                    onClick={() => setIcon(emoji)}
                                                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border transition-all flex-shrink-0 ${icon === emoji
                                                        ? 'bg-primary/20 border-primary'
                                                        : 'bg-surface border-border hover:bg-surface-hover'
                                                        }`}
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Fonts */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-text-secondary">Typography</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {FONT_OPTIONS.map((font) => (
                                                <button
                                                    key={font.id}
                                                    onClick={() => setFontFamily(font.family)}
                                                    className={`p-3 rounded-xl border text-left transition-all ${fontFamily === font.family
                                                        ? 'bg-primary/10 border-primary'
                                                        : 'bg-surface border-border hover:border-border-highlight'
                                                        }`}
                                                >
                                                    <span className="block font-medium text-foreground mb-0.5" style={{ fontFamily: font.family }}>{font.name}</span>
                                                    <span className="text-xs text-text-secondary">{font.desc}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Colors */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-text-secondary">Brand Color</label>
                                            <button
                                                onClick={() => setUseCustomColor(!useCustomColor)}
                                                className="text-xs text-primary hover:text-primary-hover flex items-center gap-1"
                                            >
                                                <Palette className="w-3 h-3" />
                                                {useCustomColor ? 'Use Presets' : 'Custom Hex'}
                                            </button>
                                        </div>

                                        {useCustomColor ? (
                                            <div className="flex gap-4 items-center animate-fade-in">
                                                <div
                                                    className="w-12 h-12 rounded-xl border border-border shadow-inner"
                                                    style={{ backgroundColor: customColor }}
                                                />
                                                <input
                                                    type="text"
                                                    value={customColor}
                                                    onChange={(e) => setCustomColor(e.target.value)}
                                                    placeholder="#000000"
                                                    className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 font-mono uppercase focus:border-primary focus:outline-none"
                                                    maxLength={7}
                                                />
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-5 md:grid-cols-8 gap-2 animate-fade-in">
                                                {COLOR_PRESETS.map((preset) => (
                                                    <button
                                                        key={preset.name}
                                                        onClick={() => setBrandColor(preset.color)}
                                                        className={`w-full aspect-square rounded-full flex items-center justify-center transition-transform hover:scale-110 ${brandColor === preset.color ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''
                                                            }`}
                                                        style={{ backgroundColor: preset.color }}
                                                        title={preset.name}
                                                    >
                                                        {brandColor === preset.color && <Check className="w-4 h-4 text-white" />}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Background Mode */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-text-secondary">App Theme</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: 'light', label: 'Light', bg: '#ffffff', text: '#000000' },
                                                { id: 'dark', label: 'Dark', bg: '#1a1a1a', text: '#ffffff' },
                                                { id: 'black', label: 'OLED Black', bg: '#000000', text: '#ffffff' },
                                            ].map((mode) => (
                                                <button
                                                    key={mode.id}
                                                    onClick={() => setBackgroundMode(mode.id as 'light' | 'dark' | 'black')}
                                                    className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${backgroundMode === mode.id
                                                        ? 'border-primary ring-1 ring-primary'
                                                        : 'border-border opacity-70 hover:opacity-100'
                                                        }`}
                                                    style={{ backgroundColor: mode.bg }}
                                                >
                                                    <span className="text-sm font-medium" style={{ color: mode.text }}>{mode.label}</span>
                                                    {backgroundMode === mode.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Navigation (Shifted from 3) */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Build your bottom bar.</h2>
                                <p className="text-text-secondary">Select 3 to 5 tabs for your app's main navigation.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {AVAILABLE_TABS.map((tab) => {
                                    const isSelected = selectedTabs.includes(tab.id);
                                    const isDisabled = !isSelected && selectedTabs.length >= 5;

                                    return (
                                        <button
                                            key={tab.id}
                                            disabled={isDisabled}
                                            onClick={() => {
                                                if (isSelected) {
                                                    if (selectedTabs.length > 3) {
                                                        setSelectedTabs(prev => prev.filter(t => t !== tab.id));
                                                    }
                                                } else {
                                                    if (selectedTabs.length < 5) {
                                                        setSelectedTabs(prev => [...prev, tab.id]);
                                                    }
                                                }
                                            }}
                                            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${isSelected
                                                ? 'border-primary bg-primary/10'
                                                : isDisabled
                                                    ? 'border-border bg-surface/50 opacity-50 cursor-not-allowed'
                                                    : 'border-border bg-surface hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-white' : 'bg-background text-text-secondary'}`}>
                                                    {tab.icon}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-foreground">{tab.label}</h3>
                                                    <p className="text-xs text-text-secondary">{tab.desc}</p>
                                                </div>
                                            </div>
                                            {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-3">
                                <Smartphone className="w-5 h-5 text-text-secondary" />
                                <span className={`text-sm font-medium ${selectedTabs.length < 3 || selectedTabs.length > 5 ? 'text-amber-500' : 'text-green-500'}`}>
                                    {selectedTabs.length} tabs selected (Min 3, Max 5)
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Classes (Shifted from 4) */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Your Schedule</h2>
                                <button onClick={addClass} className="text-primary text-sm font-medium flex items-center gap-1 hover:text-primary-hover">
                                    <Plus className="w-4 h-4" /> Add Class
                                </button>
                            </div>

                            <div className="space-y-4">
                                {classes.map((cls, index) => (
                                    <div key={index} className="bg-surface border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="space-y-3 flex-1 mr-4">
                                                <input
                                                    type="text"
                                                    value={cls.name}
                                                    onChange={(e) => updateClass(index, 'name', e.target.value)}
                                                    placeholder="Class Name"
                                                    className="w-full bg-transparent text-lg font-medium placeholder:text-text-muted focus:outline-none"
                                                />
                                                <div className="flex gap-3">
                                                    <div className="flex items-center gap-2 bg-background rounded-lg px-2 py-1 border border-border">
                                                        <Clock className="w-3 h-3 text-text-secondary" />
                                                        <input
                                                            type="text"
                                                            value={cls.time}
                                                            onChange={(e) => updateClass(index, 'time', e.target.value)}
                                                            className="bg-transparent w-16 text-sm focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-background rounded-lg px-2 py-1 border border-border">
                                                        <Users className="w-3 h-3 text-text-secondary" />
                                                        <input
                                                            type="text"
                                                            value={cls.instructor}
                                                            onChange={(e) => updateClass(index, 'instructor', e.target.value)}
                                                            placeholder="Instructor"
                                                            className="bg-transparent w-24 text-sm focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => removeClass(index)} className="text-text-muted hover:text-red-500">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 6: Features (Shifted from 5) */}
                    {currentStep === 6 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">App Features</h2>
                            <p className="text-text-secondary">Toggle the features you want in your app.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {FEATURES.map((feature) => {
                                    const isSelected = features.includes(feature.id);
                                    return (
                                        <button
                                            key={feature.id}
                                            onClick={() => {
                                                if (isSelected) {
                                                    setFeatures(prev => prev.filter(f => f !== feature.id));
                                                } else {
                                                    setFeatures(prev => [...prev, feature.id]);
                                                }
                                            }}
                                            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-4 ${isSelected
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border bg-surface hover:border-primary/50'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-white' : 'bg-surface-hover text-text-secondary'}`}>
                                                {feature.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className={`font-semibold ${isSelected ? 'text-foreground' : 'text-text-secondary'}`}>{feature.label}</h3>
                                                    {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                                </div>
                                                <p className="text-xs text-text-muted mt-1">{feature.desc}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 7: Preview (New) */}
                    {currentStep === 7 && (
                        <div className="space-y-8 py-8 text-center">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">Let's review your app.</h2>
                                <p className="text-xl text-text-secondary max-w-md mx-auto">
                                    Take a guided tour of the app you just built to see how your clients will experience it.
                                </p>
                            </div>

                            <div className="bg-surface border border-border rounded-2xl p-6 max-w-sm mx-auto text-left space-y-4">
                                <div className="flex items-center gap-4 border-b border-border pb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl">
                                        {icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{studioName}</h3>
                                        <p className="text-sm text-text-secondary capitalize">{studioType} Studio</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-text-muted">Classes</p>
                                        <p className="font-medium">{classes.length} setup</p>
                                    </div>
                                    <div>
                                        <p className="text-text-muted">Features</p>
                                        <p className="font-medium">{features.length} enabled</p>
                                    </div>
                                    <div>
                                        <p className="text-text-muted">Theme</p>
                                        <p className="font-medium capitalize">{themeId}</p>
                                    </div>
                                    <div>
                                        <p className="text-text-muted">Tabs</p>
                                        <p className="font-medium">{selectedTabs.length}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={startTour}
                                className="w-full max-w-sm mx-auto py-4 bg-foreground text-background rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl"
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Start Interactive Tour
                            </button>

                            {/* QR Preview (Instant Verification) */}
                            <div className="pt-6 border-t border-border max-w-sm mx-auto">
                                <p className="text-sm text-text-muted mb-4 uppercase tracking-wider font-bold">Or see it on your phone</p>
                                <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-white/10 w-fit mx-auto shadow-lg">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://dal.ai/preview/${studioName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'demo'}&color=000000`}
                                        alt="Scan to preview"
                                        className="w-20 h-20 rounded-lg"
                                    />
                                    <div className="text-left">
                                        <p className="text-black font-bold text-sm">Scan Camera</p>
                                        <p className="text-black/60 text-xs text-balance">Instant real-device preview.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 8: Launch (Shifted from 7) */}
                    {currentStep === 8 && (
                        <div className="text-center space-y-8 py-8">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                                <Sparkles className="w-10 h-10 text-primary" />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold">Ready to launch?</h2>
                                <p className="text-xl text-text-secondary max-w-md mx-auto">
                                    Your app is ready. Publish now, and remember: <span className="text-foreground font-semibold">you can change anything, anytime</span> even after going live.
                                </p>
                            </div>

                            <div className="bg-surface border border-border rounded-2xl p-6 max-w-sm mx-auto text-left space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-secondary">Monthly Plan</span>
                                    <span className="font-bold">$49/mo</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-secondary">Setup Fee</span>
                                    <span className="text-green-500 font-bold">Waived</span>
                                </div>
                                <div className="h-px bg-border" />
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">Total due today</span>
                                    <span className="font-bold text-xl">$49</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-border mt-auto bg-background/95 backdrop-blur z-10 absolute bottom-0 left-0 right-0 p-8">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 0
                            ? 'text-text-muted cursor-not-allowed hidden'
                            : 'text-foreground hover:bg-surface'
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ml-auto ${canProceed()
                            ? 'gradient-primary text-white hover:opacity-90 hover:scale-105'
                            : 'bg-surface text-text-muted cursor-not-allowed'
                            }`}
                    >
                        {currentStep === STEPS.length - 1 ? 'Go Live Now ($49)' : 'Next'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
