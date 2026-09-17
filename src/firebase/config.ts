import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator, type Functions } from 'firebase/functions'

export interface FirebaseClientConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
  measurementId?: string
}

export const firebaseConfig: FirebaseClientConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abcdef123456',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-ABCDEFGHIJ',
}

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key'
  )
}

// Initialize Firebase App singleton
export const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Services
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const functions: Functions = getFunctions(app, 'asia-south1')

// Connect to Local Emulators if enabled
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  const host = import.meta.env.VITE_FIREBASE_EMULATOR_HOST || '127.0.0.1'
  try {
    connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true })
    connectFirestoreEmulator(db, host, 8088)
    connectFunctionsEmulator(functions, host, 5001)
    console.info('Connected to Firebase local emulators')
  } catch (error) {
    console.warn('Firebase emulator connection note:', error)
  }
}
