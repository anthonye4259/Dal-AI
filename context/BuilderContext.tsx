'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { ClassCategory } from '@/lib/types';

// Types (Mirrors BuilderFlow state)
export interface BuilderState {
    step: number;
    studioName: string;
    tagline: string;
    studioType: ClassCategory;
    brandColor: string;
    themeId: string;
    fontFamily: string;
    icon: string;
    classes: any[];
    features: string[];
    selectedTabs: string[];
    backgroundMode: 'light' | 'dark' | 'black';

    // Advanced Branding
    logo: string | null;
    accentColor: string;
    surfaceColor: string;

    // Ultimate Customization (Phase 11)
    heroImage: string | null;
    widgets: Array<{ id: string; label: string; enabled: boolean; order: number }>;
    splashSettings: { tagline: string; animation: 'fade' | 'slide' | 'zoom' };

    // Actions
    setStep: (step: number) => void;
    setStudioName: (name: string) => void;
    setTagline: (tag: string) => void;
    setStudioType: (type: ClassCategory) => void;
    setBrandColor: (color: string) => void;
    setThemeId: (id: string) => void;
    setFontFamily: (font: string) => void;
    setIcon: (icon: string) => void;
    setClasses: (classes: any[]) => void;
    setFeatures: (features: string[]) => void;
    setSelectedTabs: (tabs: string[]) => void;
    setBackgroundMode: (mode: 'light' | 'dark' | 'black') => void;

    setLogo: (logo: string | null) => void;
    setAccentColor: (color: string) => void;
    setSurfaceColor: (color: string) => void;

    setHeroImage: (image: string | null) => void;
    setWidgets: (widgets: Array<{ id: string; label: string; enabled: boolean; order: number }>) => void;
    setSplashSettings: (settings: { tagline: string; animation: 'fade' | 'slide' | 'zoom' }) => void;

    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const BuilderContext = createContext<BuilderState | undefined>(undefined);

export function BuilderProvider({ children }: { children: ReactNode }) {
    // Default State
    const [step, setStep] = useState(0);
    const [studioName, setStudioName] = useState('');
    const [tagline, setTagline] = useState('');
    const [studioType, setStudioType] = useState<ClassCategory>('yoga');
    const [brandColor, setBrandColor] = useState('#4A9FD4');
    const [themeId, setThemeId] = useState('zen');
    const [fontFamily, setFontFamily] = useState('Inter');
    const [icon, setIcon] = useState('🧘');
    const [classes, setClasses] = useState<any[]>([]);
    const [features, setFeatures] = useState<string[]>(['classes', 'notifications']);
    const [selectedTabs, setSelectedTabs] = useState<string[]>(['home', 'schedule', 'profile']);
    const [backgroundMode, setBackgroundMode] = useState<'light' | 'dark' | 'black'>('black');
    const [activeTab, setActiveTab] = useState('home');

    // Advanced Branding Defaults
    const [logo, setLogo] = useState<string | null>(null);
    const [accentColor, setAccentColor] = useState('#4A9FD4'); // Default matches brand
    const [surfaceColor, setSurfaceColor] = useState('#ffffff');

    // Ultimate Customization Defaults
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [widgets, setWidgets] = useState([
        { id: 'stats', label: 'Stats & Streak', enabled: true, order: 0 },
        { id: 'featured', label: 'Featured Challenge', enabled: false, order: 1 },
        { id: 'trainers', label: 'Meet the Team', enabled: true, order: 2 },
        { id: 'classes', label: "Today's Classes", enabled: true, order: 3 }
    ]);
    const [splashSettings, setSplashSettings] = useState<{ tagline: string; animation: 'fade' | 'slide' | 'zoom' }>({
        tagline: 'Find your flow',
        animation: 'fade'
    });

    return (
        <BuilderContext.Provider value={{
            step, setStep,
            studioName, setStudioName,
            tagline, setTagline,
            studioType, setStudioType,
            brandColor, setBrandColor,
            themeId, setThemeId,
            fontFamily, setFontFamily,
            icon, setIcon,
            classes, setClasses,
            features, setFeatures,
            selectedTabs, setSelectedTabs,
            backgroundMode, setBackgroundMode,
            activeTab, setActiveTab,
            logo, setLogo,
            accentColor, setAccentColor,
            surfaceColor, setSurfaceColor,
            heroImage, setHeroImage,
            widgets, setWidgets,
            splashSettings, setSplashSettings
        }}>
            {children}
        </BuilderContext.Provider>
    );
}

export function useBuilder() {
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error('useBuilder must be used within a BuilderProvider');
    }
    return context;
}
