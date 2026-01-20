import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Firebase configuration - Replace with your actual config from Firebase Console
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'your-api-key',
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id',
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
	appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef'
};

let app: FirebaseApp;
let db: Firestore;

// Initialize Firebase (prevent multiple initializations)
function initializeFirebase() {
	if (getApps().length === 0) {
		app = initializeApp(firebaseConfig);
	} else {
		app = getApps()[0];
	}
	db = getFirestore(app);
	return { app, db };
}

// Export initialized instances
export function getFirebaseApp() {
	if (!app) {
		initializeFirebase();
	}
	return app;
}

export function getDb() {
	if (!db) {
		initializeFirebase();
	}
	return db;
}

export { initializeFirebase };
