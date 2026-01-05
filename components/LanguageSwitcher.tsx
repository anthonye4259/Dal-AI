'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useI18n, localeData, locales, Locale } from '@/context/I18nContext';

export default function LanguageSwitcher() {
    const { locale, setLocale } = useI18n();
    const [isOpen, setIsOpen] = useState(false);

    const currentLocale = localeData[locale];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border hover:bg-surface-hover transition-colors"
            >
                <Globe className="w-4 h-4 text-text-secondary" />
                <span className="text-lg">{currentLocale.flag}</span>
                <span className="text-sm font-medium text-foreground hidden sm:inline">{currentLocale.name}</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                        {locales.map((loc) => (
                            <button
                                key={loc}
                                onClick={() => {
                                    setLocale(loc);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-hover transition-colors ${locale === loc ? 'bg-primary/10 text-primary' : 'text-foreground'
                                    }`}
                            >
                                <span className="text-xl">{localeData[loc].flag}</span>
                                <span className="font-medium">{localeData[loc].name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
