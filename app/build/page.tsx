'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, Plus, Trash2, Clock, DollarSign, Users } from 'lucide-react';
import IPhoneMockup from '@/components/builder/IPhoneMockup';
import { ClassCategory } from '@/lib/types';

// Color presets
const COLOR_PRESETS = [
    { name: 'Ocean', color: '#4A9FD4', icon: '🌊' },
    { name: 'Forest', color: '#6B9B5A', icon: '🌿' },
    { name: 'Sunset', color: '#E67E22', icon: '🌅' },
    { name: 'Lavender', color: '#8B5CF6', icon: '💜' },
    { name: 'Rose', color: '#EC4899', icon: '🌸' },
    { name: 'Midnight', color: '#1E3A5F', icon: '🌙' },
];

// Studio type options
const STUDIO_TYPES: { value: ClassCategory; label: string; icon: string }[] = [
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

const STEPS = ['Studio', 'Style', 'Classes', 'Settings', 'Launch'];

function BuilderContent() {
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
    const [isLoading, setIsLoading] = useState(false);

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
            case 3: return true;
            case 4: return true;
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
                settings,
            }));
            router.push('/checkout');
        } catch (error) {
            console.error("Error launching checkout:", error);
            setIsLoading(false);
            // Optionally set an error state to show to user
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
        <div className="min-h-screen flex">
            {/* Left Panel - Form */}
            <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <div className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Dal AI" width={32} height={32} className="rounded-lg bg-white" />
                        <span className="font-semibold text-foreground">Dal AI</span>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mb-12">
                    {STEPS.map((step, index) => (
                        <div key={step} className="flex items-center">
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
                                className={`ml-2 text-sm hidden sm:block ${index <= currentStep ? 'text-foreground' : 'text-text-muted'
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
                <div key={currentStep}>
                    {/* Step 0: Studio Name & Type */}
                    {currentStep === 0 && (
                        <div className="space-y-8">
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
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {STUDIO_TYPES.map((type) => (
                                            <button
                                                key={type.value}
                                                onClick={() => setStudioType(type.value)}
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
                        <div className="space-y-8">
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
                                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                        {COLOR_PRESETS.map((preset) => (
                                            <button
                                                key={preset.color}
                                                onClick={() => setBrandColor(preset.color)}
                                                className={`p-4 rounded-xl border text-center transition-all ${brandColor === preset.color
                                                    ? 'border-2 border-foreground'
                                                    : 'border-border hover:border-foreground/50'
                                                    }`}
                                                style={{ backgroundColor: preset.color + '20' }}
                                            >
                                                <div
                                                    className="w-8 h-8 rounded-full mx-auto mb-2"
                                                    style={{ backgroundColor: preset.color }}
                                                />
                                                <span className="text-xs text-foreground">{preset.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Custom Color
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={brandColor}
                                            onChange={(e) => setBrandColor(e.target.value)}
                                            className="w-12 h-12 rounded-lg cursor-pointer border-0"
                                        />
                                        <input
                                            type="text"
                                            value={brandColor}
                                            onChange={(e) => setBrandColor(e.target.value)}
                                            className="px-4 py-3 rounded-xl bg-surface border border-border text-foreground font-mono text-sm w-32"
                                        />
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

                    {/* Step 2: Classes - Enhanced with duration, price, spots */}
                    {currentStep === 2 && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Your classes
                                </h1>
                                <p className="text-text-secondary">
                                    Set up your class schedule with pricing and capacity.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {classes.map((cls, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-xl bg-surface border border-border space-y-3"
                                    >
                                        {/* Row 1: Name and Time */}
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

                                        {/* Row 2: Instructor */}
                                        <input
                                            type="text"
                                            value={cls.instructor}
                                            onChange={(e) => updateClass(index, 'instructor', e.target.value)}
                                            placeholder="Instructor name"
                                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                        />

                                        {/* Row 3: Duration, Price, Max Spots */}
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                                <input
                                                    type="number"
                                                    value={cls.duration}
                                                    onChange={(e) => updateClass(index, 'duration', parseInt(e.target.value) || 0)}
                                                    placeholder="60"
                                                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">min</span>
                                            </div>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                                <input
                                                    type="number"
                                                    value={cls.price}
                                                    onChange={(e) => updateClass(index, 'price', parseInt(e.target.value) || 0)}
                                                    placeholder="25"
                                                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                                <input
                                                    type="number"
                                                    value={cls.maxSpots}
                                                    onChange={(e) => updateClass(index, 'maxSpots', parseInt(e.target.value) || 0)}
                                                    placeholder="15"
                                                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">spots</span>
                                            </div>
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => removeClass(index)}
                                            className="text-destructive text-sm flex items-center gap-1 hover:underline"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            Remove
                                        </button>
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

                    {/* Step 3: Studio Settings */}
                    {currentStep === 3 && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Studio policies
                                </h1>
                                <p className="text-text-secondary">
                                    Set your cancellation and waitlist rules.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Cancellation Window */}
                                <div className="p-5 rounded-xl bg-surface border border-border">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Cancellation Window
                                    </label>
                                    <p className="text-sm text-text-secondary mb-3">
                                        How many hours before class can clients cancel?
                                    </p>
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
                                        <input
                                            type="number"
                                            value={settings.cancellationWindow}
                                            onChange={(e) => setSettings({ ...settings, cancellationWindow: parseInt(e.target.value) || 0 })}
                                            className="w-20 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                            placeholder="Custom"
                                        />
                                        <span className="text-text-muted text-sm">hours</span>
                                    </div>
                                </div>

                                {/* Late Cancellation Fee */}
                                <div className="p-5 rounded-xl bg-surface border border-border">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Late Cancellation Fee
                                    </label>
                                    <p className="text-sm text-text-secondary mb-3">
                                        Fee charged if client cancels after the window.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="w-5 h-5 text-text-muted" />
                                        <input
                                            type="number"
                                            value={settings.lateFee}
                                            onChange={(e) => setSettings({ ...settings, lateFee: parseInt(e.target.value) || 0 })}
                                            className="w-24 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                        />
                                        <span className="text-text-muted text-sm">or set to $0 for no fee</span>
                                    </div>
                                </div>

                                {/* Waitlist Size */}
                                <div className="p-5 rounded-xl bg-surface border border-border">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Waitlist Size
                                    </label>
                                    <p className="text-sm text-text-secondary mb-3">
                                        How many clients can join the waitlist per class?
                                    </p>
                                    <div className="flex items-center gap-3">
                                        {[3, 5, 10].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSettings({ ...settings, waitlistSize: size })}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all ${settings.waitlistSize === size
                                                    ? 'bg-primary text-white'
                                                    : 'bg-background border border-border text-foreground hover:border-primary'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                        <input
                                            type="number"
                                            value={settings.waitlistSize}
                                            onChange={(e) => setSettings({ ...settings, waitlistSize: parseInt(e.target.value) || 0 })}
                                            className="w-20 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                                            placeholder="Custom"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Launch */}
                    {currentStep === 4 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Your app is ready! 🎉
                                </h1>
                                <p className="text-text-secondary">
                                    Just one more step — select your plan to go live.
                                </p>
                            </div>

                            {/* Summary Card */}
                            <div className="p-6 rounded-2xl bg-surface border border-border">
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                                        style={{ backgroundColor: brandColor }}
                                    >
                                        {icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground">{studioName}</h3>
                                        <p className="text-text-secondary capitalize">{studioType} Studio</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-3 rounded-xl bg-background">
                                        <p className="text-2xl font-bold text-foreground">{classes.length}</p>
                                        <p className="text-sm text-text-secondary">Classes</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-background">
                                        <p className="text-2xl font-bold text-foreground">{settings.cancellationWindow}h</p>
                                        <p className="text-sm text-text-secondary">Cancel Window</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-background">
                                        <p className="text-2xl font-bold text-foreground">${settings.lateFee}</p>
                                        <p className="text-sm text-text-secondary">Late Fee</p>
                                    </div>
                                </div>
                            </div>

                            {/* Instant Activation Banner */}
                            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-6 h-6 text-accent flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Instant Activation</h4>
                                        <p className="text-text-secondary text-sm">
                                            Your app will be ready for clients as soon as you subscribe.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* </motion.div> */}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 0
                            ? 'text-text-muted cursor-not-allowed'
                            : 'text-foreground hover:bg-surface'
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${canProceed()
                            ? 'gradient-primary text-white hover:opacity-90'
                            : 'bg-surface text-text-muted cursor-not-allowed'
                            }`}
                    >
                        {currentStep === STEPS.length - 1 ? 'Continue to Checkout' : 'Next'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-surface to-background items-center justify-center p-12">
                <IPhoneMockup
                    studioName={studioName || 'Your Studio'}
                    brandColor={brandColor}
                    icon={icon}
                    classes={classes.map(c => ({ name: c.name, time: c.time, instructor: c.instructor }))}
                />
            </div>
        </div >
    );
}

export default function BuilderPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">Loading builder...</div>
            </div>
        }>
            <BuilderContent />
        </Suspense>
    );
}
