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
            activeTab, setActiveTab
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
