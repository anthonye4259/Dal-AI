import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dal AI | Build Your Studio's App in 60 Seconds",
  description: "Your clients download YOUR app. GIA runs your business while you teach. Perfect for yoga, pilates, barre, and wellness studios.",
  keywords: ["yoga app", "pilates booking", "studio management", "wellness app", "fitness booking"],
  openGraph: {
    title: "Dal AI | Build Your Studio's App in 60 Seconds",
    description: "Your clients download YOUR app. GIA runs your business while you teach.",
    type: "website",
    siteName: "Dal AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dal AI | Build Your Studio's App",
    description: "Build your branded wellness studio app in 60 seconds",
  },
};

import { AuthProvider } from "@/components/auth/AuthProvider";
import { I18nProvider } from "@/context/I18nContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        <I18nProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

