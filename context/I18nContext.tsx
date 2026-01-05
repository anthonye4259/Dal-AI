'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Supported locales
export const locales = ['en', 'es', 'fr', 'hi', 'zh', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const localeData: Record<Locale, { name: string; flag: string; dir: 'ltr' | 'rtl' }> = {
    en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
    es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    hi: { name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    zh: { name: '中文', flag: '🇨🇳', dir: 'ltr' },
    ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
};

type Messages = Record<string, any>;

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | null>(null);

// Translation cache
const messageCache: Partial<Record<Locale, Messages>> = {};

async function loadMessages(locale: Locale): Promise<Messages> {
    if (messageCache[locale]) {
        return messageCache[locale]!;
    }

    try {
        const messages = await import(`@/messages/${locale}.json`);
        messageCache[locale] = messages.default;
        return messages.default;
    } catch (error) {
        console.error(`Failed to load messages for ${locale}`, error);
        // Fallback to English
        if (locale !== 'en') {
            return loadMessages('en');
        }
        return {};
    }
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [messages, setMessages] = useState<Messages>({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved preference on mount
    useEffect(() => {
        const savedLocale = localStorage.getItem('preferred-locale') as Locale;
        if (savedLocale && locales.includes(savedLocale)) {
            setLocaleState(savedLocale);
        } else {
            // Try to detect from browser
            const browserLang = navigator.language.split('-')[0] as Locale;
            if (locales.includes(browserLang)) {
                setLocaleState(browserLang);
            }
        }
    }, []);

    // Load messages when locale changes
    useEffect(() => {
        loadMessages(locale).then((msgs) => {
            setMessages(msgs);
            setIsLoaded(true);

            // Update document direction for RTL languages
            document.documentElement.dir = localeData[locale].dir;
            document.documentElement.lang = locale;
        });
    }, [locale]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('preferred-locale', newLocale);
    };

    // Translation function - supports nested keys like "home.hero.title"
    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = messages;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Key not found, return the key itself
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    // Don't render until initial locale is loaded
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <I18nContext.Provider value={{ locale, setLocale, t, dir: localeData[locale].dir }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}

export function useTranslation() {
    const { t, locale, dir } = useI18n();
    return { t, locale, dir };
}
