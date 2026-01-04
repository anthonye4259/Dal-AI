'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Sparkles, Plus, Trash2, Clock, DollarSign, Users } from 'lucide-react';
import { ClassCategory } from '@/lib/types';

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

// Feature Toggle Options
const FEATURE_OPTIONS = [
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

const STEPS = ['Studio', 'Style', 'Classes', 'Features', 'Settings', 'Launch'];

export default function BuilderFlow({ onPreviewUpdate }: { onPreviewUpdate?: (props: any) => void }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentStep, setCurrentStep] = useState(0);
    // Studio basics
    const [studioName, setStudioName] = useState('');
    const [studioType, setStudioType] = useState<ClassCategory>('yoga');
    const [brandColor, setBrandColor] = useState('#4A9FD4');
    const [icon, setIcon] = useState('🧘');
    // Classes with full details
    const [classes, setClasses] = useState<BuilderClass[]>([]);
    // Studio settings
    const [settings, setSettings] = useState<StudioSettings>({
        cancellationWindow: 24,
        lateFee: 10,
        waitlistSize: 5,
    });
    // Features
    const [features, setFeatures] = useState<Record<string, boolean>>(
        FEATURE_OPTIONS.reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {})
    );
    const [isLoading, setIsLoading] = useState(false);

    // Update preview whenever state changes
    useEffect(() => {
        if (onPreviewUpdate) {
            onPreviewUpdate({ studioName, brandColor, icon, classes });
        }
    }, [studioName, brandColor, icon, classes, onPreviewUpdate]);

    // Pre-fill studio name from URL
    useEffect(() => {
        const name = searchParams.get('name');
        if (name) {
            setStudioName(name);
        }
    }, [searchParams]);

    // Update suggested classes when studio type changes
    useEffect(() => {
        const suggestions = SUGGESTED_CLASSES[studioType];
        setClasses(suggestions);
        setIcon(STUDIO_TYPES.find(t => t.value === studioType)?.icon || '🧘');
    }, [studioType]);

    const canProceed = () => {
        switch (currentStep) {
            case 0: return studioName.trim().length > 0;
            case 1: return true;
            case 2: return classes.length > 0;
            case 3: return true; // Features always valid
            case 4: return true;
            case 5: return true;
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
                studioType,
                brandColor,
                icon,
                classes,
                features,
                settings,
            }));
            router.push('/checkout');
        } catch (error) {
            console.error("Error launching checkout:", error);
            setIsLoading(false);
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

                {/* Step Content */}
                <div key={currentStep} className="pb-24">
                    {/* Content for steps (Same as before) */}

                    {/* Step 0: Studio Name & Type */}
                    {currentStep === 0 && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Let&apos;s name your studio
                                </h1>
                                <p className="text-text-secondary">
                                    This is how clients will see your app on their phone.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Studio Name
                                    </label>
                                    <input
                                        type="text"
                                        value={studioName}
                                        onChange={(e) => setStudioName(e.target.value)}
                                        placeholder="e.g., Zen Flow Yoga"
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-3">
                                        What type of studio?
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {STUDIO_TYPES.map((type) => (
                                            <button
                                                key={type.value}
                                                onClick={() => setStudioType(type.value as ClassCategory)}
                                                className={`p-4 rounded-xl border text-left transition-all ${studioType === type.value
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border bg-surface hover:border-primary/50'
                                                    }`}
                                            >
                                                <span className="text-2xl mb-2 block">{type.icon}</span>
                                                <span className="text-sm font-medium text-foreground">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Style & Colors */}
                    {currentStep === 1 && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Pick your style
                                </h1>
                                <p className="text-text-secondary">
                                    Choose colors that match your brand.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-3">
                                        Brand Color
                                    </label>
                                    <div className="grid grid-cols-5 gap-3">
                                        {COLOR_PRESETS.map((preset) => (
                                            <button
                                                key={preset.name}
                                                onClick={() => setBrandColor(preset.color)}
                                                className={`p-2 rounded-xl border text-center transition-all ${brandColor === preset.color
                                                    ? 'border-2 border-foreground'
                                                    : 'border-border hover:border-foreground/50'
                                                    }`}
                                                style={{ backgroundColor: preset.color + '20' }}
                                            >
                                                <div
                                                    className="w-6 h-6 rounded-full mx-auto mb-1"
                                                    style={{ backgroundColor: preset.color }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-3">
                                        App Icon
                                    </label>
                                    <div className="flex gap-2 flex-wrap">
                                        {['🧘', '🧘‍♀️', '🧘‍♂️', '🌿', '🌸', '🌊', '✨', '💫', '🌙', '☀️', '🦋', '🍃'].map((emoji) => (
                                            <button
                                                key={emoji}
                                                onClick={() => setIcon(emoji)}
                                                className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${icon === emoji
                                                    ? 'bg-primary/20 border-2 border-primary'
                                                    : 'bg-surface border border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Classes */}
                    {currentStep === 2 && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Your classes
                                </h1>
                                <p className="text-text-secondary">
                                    Set up your class schedule with pricing.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {classes.map((cls, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-xl bg-surface border border-border space-y-3"
                                    >
                                        <div className="grid grid-cols-3 gap-3">
                                            <input
                                                type="text"
                                                value={cls.name}
                                                onChange={(e) => updateClass(index, 'name', e.target.value)}
                                                placeholder="Class name"
                                                className="col-span-2 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                            />
                                            <input
                                                type="text"
                                                value={cls.time}
                                                onChange={(e) => updateClass(index, 'time', e.target.value)}
                                                placeholder="Time"
                                                className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted" />
                                                <input
                                                    type="number"
                                                    value={cls.price}
                                                    onChange={(e) => updateClass(index, 'price', parseInt(e.target.value) || 0)}
                                                    className="w-full pl-8 pr-2 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted" />
                                                <input
                                                    type="number"
                                                    value={cls.maxSpots}
                                                    onChange={(e) => updateClass(index, 'maxSpots', parseInt(e.target.value) || 0)}
                                                    className="w-full pl-8 pr-2 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeClass(index)}
                                                className="text-destructive text-sm flex items-center justify-center hover:bg-destructive/10 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addClass}
                                    className="w-full p-4 rounded-xl border-2 border-dashed border-border text-text-secondary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Class
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Features */}
                    {currentStep === 3 && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Choose features
                                </h1>
                                <p className="text-text-secondary">
                                    Turn on the tools you need for your studio.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {FEATURE_OPTIONS.map((feature) => (
                                    <button
                                        key={feature.id}
                                        onClick={() => setFeatures(prev => ({ ...prev, [feature.id]: !prev[feature.id] }))}
                                        className={`p-4 rounded-xl border text-left transition-all flex items-start gap-4 ${features[feature.id]
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border bg-surface opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${features[feature.id] ? 'bg-primary/20' : 'bg-background'}`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-semibold text-foreground text-sm">{feature.name}</span>
                                                {features[feature.id] && <Check className="w-4 h-4 text-primary" />}
                                            </div>
                                            <p className="text-xs text-text-secondary">{feature.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Settings */}
                    {currentStep === 4 && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Studio policies
                                </h1>
                                <p className="text-text-secondary">
                                    Set your cancellation rules.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-5 rounded-xl bg-surface border border-border">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Cancellation Window
                                    </label>
                                    <div className="flex items-center gap-3">
                                        {[12, 24, 48].map((hours) => (
                                            <button
                                                key={hours}
                                                onClick={() => setSettings({ ...settings, cancellationWindow: hours })}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all ${settings.cancellationWindow === hours
                                                    ? 'bg-primary text-white'
                                                    : 'bg-background border border-border text-foreground hover:border-primary'
                                                    }`}
                                            >
                                                {hours}h
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Launch */}
                    {currentStep === 5 && (
                        <div className="space-y-8 animate-fade-in text-center pt-8">
                            <div>
                                <h1 className="text-4xl font-bold text-foreground mb-4">
                                    You&apos;re ready! 🎉
                                </h1>
                                <p className="text-text-secondary text-lg">
                                    Your branded app is fully configured.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-surface border border-border max-w-sm mx-auto">
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                                        style={{ backgroundColor: brandColor }}
                                    >
                                        {icon}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-foreground">{studioName}</h3>
                                        <p className="text-text-secondary capitalize">{studioType} Studio</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-3 rounded-xl bg-background">
                                        <p className="text-2xl font-bold text-foreground">{classes.length}</p>
                                        <p className="text-xs text-text-secondary">Classes</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-background">
                                        <p className="text-2xl font-bold text-foreground">{Object.values(features).filter(Boolean).length}</p>
                                        <p className="text-xs text-text-secondary">Features</p>
                                    </div>
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
