'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center gradient-hero">
      <h1 className="text-4xl font-bold mb-4">Dal AI is Live! 🚀</h1>
      <p className="mb-8 text-xl text-text-secondary">If you can see this, the app is working.</p>

      <button
        onClick={() => router.push('/build')}
        className="px-6 py-4 rounded-xl gradient-primary text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        Go to Builder
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
