/**
 * TypeScript Types for Dal AI
 * Matches the imprint_ collections in Firebase
 */

// imprint_studios
export interface Studio {
    id: string;
    name: string;           // "Zen Yoga"
    fullName: string;
    brandColor: string;     // "#4A9FD4"
    logoUrl?: string;
    icon: string;
    ownerId: string;        // Firebase Auth UID
    code: string;           // Invite code "ZENYOGA"
    createdAt: Date;
    settings: {
        cancellationWindow: number;  // hours
        lateFee: number;
        waitlistSize: number;
    };
}

// imprint_users
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}

// imprint_classes
export interface StudioClass {
    id: string;
    studioId: string;
    name: string;           // "Morning Flow"
    instructor: string;
    time: string;           // "09:00"
    duration: number;       // minutes
    price: number;
    maxSpots: number;
    bookedSpots: number;
    dayOfWeek: number;      // 0-6
    category: ClassCategory;
}

export type ClassCategory = 'yoga' | 'pilates' | 'barre' | 'meditation' | 'other';

// imprint_bookings
export interface Booking {
    id: string;
    classId: string;
    studioId: string;
    userId: string;
    userName: string;
    bookedAt: Date;
    status: 'confirmed' | 'cancelled' | 'completed';
}

// imprint_memberships
export interface Membership {
    id: string;
    userId: string;
    studioId: string;
    credits: number;
    memberSince: Date;
    packType: 'starter' | 'flow' | 'unlimited';
}

// Builder state (client-side only)
export interface BuilderState {
    step: number;
    studioName: string;
    studioType: ClassCategory;
    brandColor: string;
    icon: string;
    classes: Partial<StudioClass>[];
    settings: {
        cancellationWindow: number;
        lateFee: number;
        waitlistSize: number;
    };
}

// Stripe pricing
export const PRICING = {
    dalAiLaunch: {
        monthly: 49,
        annual: 490,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_DAL_AI || 'price_1SlO1406I3eFkRUmn06MwZ7e',
    },
    giaPro: {
        monthly: 19,
        annual: 190,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GIA_PRO || 'price_1SlO1U06I3eFkRUm0B2LOnIk',
    },
} as const;

// Day names for class scheduling
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
