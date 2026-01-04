'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Sparkles,
  Zap,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle2,
  Play,
  Star
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Dal AI" width={32} height={32} className="rounded-lg bg-white" />
            <span className="font-bold text-xl tracking-tight">Dal AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#demo" className="hover:text-foreground transition-colors">Demo</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/login')}
              className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => router.push('/build')}
              className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 gradient-hero relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in-up">
            <Star className="w-4 h-4 fill-primary" />
            <span>The #1 AI App Builder for Wellness</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Launch your studio app <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              in seconds, not months.
            </span>
          </h1>

          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            No code. No designers. Just you and your brand.
            Dal AI builds a premium mobile app for your studio instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push('/build')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl gradient-primary text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-primary/25"
            >
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface border border-border text-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:bg-background transition-colors"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to grow</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Powerful tools to manage your studio, delight clients, and scale your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant Deployment",
                description: "Your app is live on iOS and Android immediately. No waiting for app store approvals."
              },
              {
                icon: Smartphone,
                title: "Native Mobile Experience",
                description: "Butter-smooth 60fps performance with a premium design that feels right at home on any device."
              },
              {
                icon: Globe,
                title: "Global Payments",
                description: "Accept payments from anywhere with built-in Stripe integration. Subscriptions made easy."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl gradient-primary p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to launch your empire?</h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of wellness creators building their future with Dal AI.
            </p>
            <button
              onClick={() => router.push('/build')}
              className="px-10 py-4 rounded-xl bg-white text-primary font-bold text-lg hover:bg-white/90 transition-colors shadow-xl"
            >
              Build Your App Now
            </button>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-surface/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-lg">Dal AI</span>
          </div>
          <div className="text-text-secondary text-sm">
            © 2024 Dal AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
