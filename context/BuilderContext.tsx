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

    // Visual Customization (NEW)
    buttonStyle: 'pill' | 'rounded' | 'square';
    cornerRadius: 'sharp' | 'soft' | 'rounded';
    cardStyle: 'shadow' | 'flat' | 'glass' | 'gradient';
    spacing: 'compact' | 'comfortable' | 'spacious';

    // Screen Customization (NEW)
    homeLayout: 'default' | 'grid' | 'cardStack' | 'heroFocus';
    scheduleView: 'list' | 'calendar' | 'week';
    profileLayout: 'stats' | 'social' | 'minimal';
    customLinks: Array<{ label: string; url: string; icon: string }>;

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

    // Visual Customization Actions (NEW)
    setButtonStyle: (style: 'pill' | 'rounded' | 'square') => void;
    setCornerRadius: (radius: 'sharp' | 'soft' | 'rounded') => void;
    setCardStyle: (style: 'shadow' | 'flat' | 'glass' | 'gradient') => void;
    setSpacing: (spacing: 'compact' | 'comfortable' | 'spacious') => void;

    // Screen Customization Actions (NEW)
    setHomeLayout: (layout: 'default' | 'grid' | 'cardStack' | 'heroFocus') => void;
    setScheduleView: (view: 'list' | 'calendar' | 'week') => void;
    setProfileLayout: (layout: 'stats' | 'social' | 'minimal') => void;
    setCustomLinks: (links: Array<{ label: string; url: string; icon: string }>) => void;

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
    const [accentColor, setAccentColor] = useState('#4A9FD4');
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

    // Visual Customization Defaults (NEW)
    const [buttonStyle, setButtonStyle] = useState<'pill' | 'rounded' | 'square'>('rounded');
    const [cornerRadius, setCornerRadius] = useState<'sharp' | 'soft' | 'rounded'>('rounded');
    const [cardStyle, setCardStyle] = useState<'shadow' | 'flat' | 'glass' | 'gradient'>('shadow');
    const [spacing, setSpacing] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');

    // Screen Customization Defaults (NEW)
    const [homeLayout, setHomeLayout] = useState<'default' | 'grid' | 'cardStack' | 'heroFocus'>('default');
    const [scheduleView, setScheduleView] = useState<'list' | 'calendar' | 'week'>('list');
    const [profileLayout, setProfileLayout] = useState<'stats' | 'social' | 'minimal'>('stats');
    const [customLinks, setCustomLinks] = useState<Array<{ label: string; url: string; icon: string }>>([]);

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
            splashSettings, setSplashSettings,
            // Visual Customization (NEW)
            buttonStyle, setButtonStyle,
            cornerRadius, setCornerRadius,
            cardStyle, setCardStyle,
            spacing, setSpacing,
            // Screen Customization (NEW)
            homeLayout, setHomeLayout,
            scheduleView, setScheduleView,
            profileLayout, setProfileLayout,
            customLinks, setCustomLinks
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
