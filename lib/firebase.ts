/**
 * Firebase Configuration for Dal AI Web
 * Uses Firebase v10+ modular SDK
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Initialize Firebase (safe for SSR)
function getFirebaseApp(): FirebaseApp | null {
    if (typeof window === 'undefined') return null;
    if (!firebaseConfig.apiKey) {
        console.warn('Firebase API key not configured');
        return null;
    }
    return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
}

function getFirebaseAuth(): Auth | null {
    const app = getFirebaseApp();
    return app ? getAuth(app) : null;
}

function getFirebaseDb(): Firestore | null {
    const app = getFirebaseApp();
    return app ? getFirestore(app) : null;
}

// Lazy initialization
export const app = getFirebaseApp();
export const auth = getFirebaseAuth();
export const db = getFirebaseDb();

// Collection names (imprint_ prefix)
export const COLLECTIONS = {
    STUDIOS: 'imprint_studios',
    USERS: 'imprint_users',
    CLASSES: 'imprint_classes',
    BOOKINGS: 'imprint_bookings',
    MEMBERSHIPS: 'imprint_memberships',
} as const;
