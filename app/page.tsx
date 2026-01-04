'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Sparkles,
  Calendar,
  Smartphone,
  CreditCard,
  BarChart3,
  Bell,
  ArrowRight,
  Check,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [studioName, setStudioName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studioName.trim()) {
      router.push(`/build?name=${encodeURIComponent(studioName.trim())}`);
    }
  };

  const features = [
    {
      icon: Calendar,
      title: 'Class Scheduling',
      description: 'Drop-in classes, series, and private sessions. Clients book in seconds.',
    },
    {
      icon: Smartphone,
      title: 'Your Branded App',
      description: 'Clients download YOUR app. Your logo, your colors, your brand.',
    },
    {
      icon: CreditCard,
      title: 'Packages & Payments',
      description: 'Sell class packs, memberships, and accept payments seamlessly.',
    },
    {
      icon: Sparkles,
      title: 'GIA Runs Your Business',
      description: 'AI handles scheduling, reminders, and client communication.',
    },
    {
      icon: BarChart3,
      title: 'Client Insights',
      description: 'Track attendance, retention, and revenue. Know your business.',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Automated class reminders and follow-ups. Never lose a client.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Dal AI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-text-secondary hover:text-foreground transition-colors hidden sm:block">
              Features
            </a>
            <button
              onClick={() => router.push('/build')}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-8">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-text-secondary">Launch your studio app today</span>
            </div>


            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Build your studio&apos;s app
              <span className="block gradient-primary bg-clip-text text-transparent">in 60 seconds</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              Your clients download <span className="text-foreground font-medium">YOUR</span> app.
              GIA runs your business while you teach.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  placeholder="Enter your studio name"
                  className="flex-1 px-5 py-4 rounded-xl bg-surface border border-border text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-4 rounded-xl gradient-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Build My App
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* App Store Badge */}
            <div className="flex items-center justify-center gap-4 text-text-muted text-sm">
              <span>Available on the App Store</span>
              <div className="w-24 h-8 bg-surface rounded-lg flex items-center justify-center border border-border">
                <span className="text-xs">App Store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Types */}
      <section className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-text-secondary">
            <span className="text-sm uppercase tracking-wider">Perfect for:</span>
            {['Yoga Studios', 'Pilates Instructors', 'Barre Classes', 'Meditation Centers', 'Wellness Coaches'].map((type) => (
              <span key={type} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to run your studio
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              From booking to payments, Dal AI handles it all so you can focus on teaching.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-surface border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-text-secondary text-lg mb-12">
            Cancel anytime. No long-term contracts.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Dal AI */}
            <div className="p-8 rounded-2xl bg-background border border-border text-left">
              <h3 className="text-xl font-semibold text-foreground mb-2">Dal AI</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-foreground">$49</span>
                <span className="text-text-secondary">/month</span>
              </div>
              <p className="text-text-secondary mb-6">Your branded studio app + class booking</p>
              <ul className="space-y-3">
                {['Branded client app', 'Unlimited classes', 'Online booking', 'Payment processing', 'Class packages'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-text-secondary">
                    <Check className="w-4 h-4 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* GIA Pro */}
            <div className="p-8 rounded-2xl bg-background border-2 border-accent text-left relative">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Dal AI + GIA Pro</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-foreground">$68</span>
                <span className="text-text-secondary">/month</span>
              </div>
              <p className="text-text-secondary mb-6">Let GIA run your business for you</p>
              <ul className="space-y-3">
                {['Everything in Dal AI', 'AI scheduling assistant', 'Smart pricing suggestions', 'Client retention alerts', 'Advanced analytics', 'Priority support'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-text-secondary">
                    <Check className="w-4 h-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => router.push('/build')}
            className="mt-12 px-8 py-4 rounded-xl gradient-primary text-white font-semibold text-lg flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to build your app?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Create your branded studio app in 60 seconds. No coding required.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                placeholder="Your studio name"
                className="flex-1 px-5 py-4 rounded-xl bg-surface border border-border text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-xl gradient-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Build My App
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-foreground">Dal AI</span>
            </div>
            <div className="flex items-center gap-6 text-text-secondary text-sm">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-text-muted text-sm">© 2025 Dal AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
