'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Sparkles, CheckCircle2, Play, Users, Star, Smartphone, Globe, Zap, CreditCard, ShieldCheck } from 'lucide-react';
import BuilderFlow from '@/components/BuilderFlow';
import IPhoneMockup from '@/components/builder/IPhoneMockup';

export default function SplitLandingPage() {
  const router = useRouter();
  const [previewProps, setPreviewProps] = useState<any>({
    studioName: '',
    brandColor: '#4A9FD4',
    icon: '🧘',
    classes: []
  });

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col md:flex-row">

      {/* LEFT SIDE: Marketing Pitch (45%) */}
      <div className="hidden md:flex flex-col w-[45%] h-full bg-surface border-r border-border relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-8 pb-4 flex items-center gap-2 relative z-10">
          <Image src="/logo.png" alt="Dal AI" width={32} height={32} className="rounded-lg bg-white" />
          <span className="font-bold text-xl tracking-tight">Dal AI</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-12 relative z-10">


          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
            Launch your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              branded booking app
            </span>
          </h1>

          <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-md">
            Your studio lives inside the Dal AI app—giving clients a personal, branded booking experience.
          </p>

          {/* Feature Pills */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold">Native Mobile App</p>
                <p className="text-xs text-text-secondary">Clients download 'Dal AI' & find you instantly.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold">Global Payments</p>
                <p className="text-xs text-text-secondary">Credit cards, memberships, and packages.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-medium text-text-secondary">Now available for all studios</span>
                </div>
                <p className="font-bold">Real-time Booking</p>
                <p className="text-xs text-text-secondary">Waitlists, calendars, and instant notifications.</p>
              </div>
            </div>
          </div>

          {/* Phone Preview (Small) */}
          <div className="mt-auto flex justify-center scale-90 origin-bottom opacity-80 hover:opacity-100 transition-opacity duration-500">
            <IPhoneMockup
              studioName={previewProps.studioName || 'Your Studio'}
              brandColor={previewProps.brandColor}
              icon={previewProps.icon}
              classes={previewProps.classes}
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Builder (55%) */}
      <div className="flex-1 h-full bg-background flex flex-col">
        {/* Mobile Header */}
        {/* Navbar */}
        <nav className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Dal AI Logo" width={32} height={32} className="" />
            <span className="text-xl font-bold tracking-tight text-foreground">Dal AI</span>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
          >
            Sign In
          </button>
        </nav>
        <div className="flex-1 relative">
          <div className="absolute inset-0 p-8 md:p-12">
            <div className="max-w-xl mx-auto h-full flex flex-col justify-center">
              <Suspense fallback={
                <div className="h-full w-full flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <BuilderFlow onPreviewUpdate={setPreviewProps} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
