import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lazy initialization to avoid SSR build errors
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

function getFirebaseApp(): FirebaseApp {
    if (!app) {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    }
    return app;
}

function getFirebaseDb(): Firestore {
    if (!db) {
        db = getFirestore(getFirebaseApp());
    }
    return db;
}

function getFirebaseAuth(): Auth {
    if (!auth) {
        auth = getAuth(getFirebaseApp());
    }
    return auth;
}

export const saveAppConfig = async (config: any) => {
    try {
        const firestore = getFirebaseDb();
        const docRef = await addDoc(collection(firestore, "builder_leads"), {
            ...config,
            createdAt: new Date().toISOString(),
            status: 'pending'
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

export const COLLECTIONS = {
    STUDIOS: "studios",
    BUILDER_LEADS: "builder_leads"
};

// Export getters instead of instances to avoid SSR issues
export { getFirebaseDb as db, getFirebaseAuth as auth };

