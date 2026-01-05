'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Sparkles, CheckCircle2, Play, Users, Star, Smartphone, Globe, Zap, CreditCard, ShieldCheck, Home, Calendar, User } from 'lucide-react';
import BuilderFlow from '@/components/BuilderFlow';
import IPhoneMockup from '@/components/builder/IPhoneMockup';
import { BuilderProvider, useBuilder } from '@/context/BuilderContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/context/I18nContext';

// Screen Toggle Button Component
function ScreenToggleButton({ icon: Icon, label, tabId }: { icon: any; label: string; tabId: string }) {
  const { activeTab, setActiveTab } = useBuilder();
  const isActive = activeTab === tabId;

  return (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isActive
          ? 'bg-primary text-white'
          : 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
        }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

export default function SplitLandingPage() {
  return (
    <BuilderProvider>
      <SplitLandingPageContent />
    </BuilderProvider>
  );
}

function SplitLandingPageContent() {
  const router = useRouter();
  const { step } = useBuilder();
  const { t } = useTranslation();

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col md:flex-row">

      {/* LEFT SIDE: Marketing Pitch (45%) */}
      <div className="hidden md:flex flex-col w-[45%] h-full bg-surface border-r border-border relative overflow-hidden transition-all duration-700">

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header - Only visible on Step 0 */}
        <div className={`p-8 pb-4 flex items-center justify-between relative z-10 transition-all duration-500 ${step > 0 ? 'opacity-0 -translate-y-4 font-bold scale-90 pointer-events-none absolute' : 'opacity-100 translate-y-0'}`}>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Dal AI" width={32} height={32} className="rounded-lg bg-white" />
            <span className="font-bold text-xl tracking-tight">Dal AI</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => router.push('/login')}
              className="text-sm text-primary font-medium hover:underline"
            >
              {t('common.login')}
            </button>
          </div>
        </div>

        {/* Main Content - Only visible on Step 0 */}
        <div className={`flex-1 flex flex-col justify-center px-12 relative z-10 transition-all duration-500 ${step > 0 ? 'opacity-0 translate-x-[-20px] absolute pointer-events-none' : 'opacity-100 translate-x-0'}`}>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {t('home.hero.title1')} <br />
            <span className="text-transparent bg-clip-text gradient-primary">
              {t('home.hero.title2')}
            </span>
          </h1>

          <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-md">
            {t('home.hero.subtitle')}
          </p>

          {/* Process Timeline */}
          <div className="space-y-8 mb-10 relative">
            {/* Connecting Line */}
            <div className="absolute left-[15px] top-2 bottom-10 w-0.5 bg-border -z-10" />

            {/* Step 1: Build */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-primary/25 ring-4 ring-surface">
                1
              </div>
              <div>
                <h3 className="font-bold text-foreground">{t('home.timeline.step1Title')}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t('home.timeline.step1Desc')}
                </p>
              </div>
            </div>

            {/* Step 2: Publish */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-surface border-2 border-primary text-primary flex items-center justify-center font-bold text-sm shrink-0 ring-4 ring-surface">
                2
              </div>
              <div>
                <h3 className="font-bold text-foreground">{t('home.timeline.step2Title')}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t('home.timeline.step2Desc')}
                </p>
              </div>
            </div>

            {/* Step 3: Access */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-surface border-2 border-text-secondary text-text-secondary flex items-center justify-center font-bold text-sm shrink-0 ring-4 ring-surface">
                3
              </div>
              <div>
                <h3 className="font-bold text-foreground">{t('home.timeline.step3Title')}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t('home.timeline.step3Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Preview (Animated Position) */}
        <div className={`transition-all duration-700 ease-in-out flex flex-col items-center ${step > 0
          ? 'absolute inset-0 justify-center scale-100 z-20 top-0 pt-8'
          : 'mt-auto scale-90 origin-bottom opacity-80 hover:opacity-100 pb-8 relative z-10'
          }`}>

          {/* Live Preview Badge */}
          {step > 0 && (
            <div className="mb-4 flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-primary">Live Preview</span>
            </div>
          )}

          <IPhoneMockup />

          {/* Screen Toggle Buttons - Only show when building */}
          {step > 0 && (
            <div className="mt-6 flex items-center gap-2 bg-surface border border-border rounded-full p-1">
              <ScreenToggleButton icon={Home} label="Home" tabId="home" />
              <ScreenToggleButton icon={Calendar} label="Schedule" tabId="schedule" />
              <ScreenToggleButton icon={User} label="Profile" tabId="profile" />
            </div>
          )}

          {/* Step hint */}
          {step > 0 && (
            <p className="mt-4 text-xs text-text-muted text-center max-w-[200px]">
              Changes you make will appear here in real-time
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Builder (55%) */}
      <div className="flex-1 h-full bg-background flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden p-6 border-b border-border flex items-center justify-between bg-surface">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Dal AI" width={24} height={24} className="rounded-md bg-white" />
            <span className="font-bold text-lg">Dal AI</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => router.push('/login')}
              className="text-sm text-primary font-medium hover:underline"
            >
              {t('common.login')}
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-0 p-8 md:p-12">
            <div className="max-w-xl mx-auto h-full flex flex-col justify-center">
              <Suspense fallback={
                <div className="h-full w-full flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <BuilderFlow />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
