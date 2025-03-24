import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import { initializeApp, type FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: config.public.firebaseApiKey,
        authDomain: config.public.firebaseAuthDomain,
        projectId: config.public.firebaseProjectId,
        storageBucket: config.public.firebaseStorageBucket,
        messagingSenderId: config.public.firebaseMessagingSenderId,
        appId: config.public.firebaseAppId,
        measurementId: config.public.firebaseMeasurementId
    }

    const app: FirebaseApp = initializeApp(firebaseConfig)
    const auth: Auth = getAuth(app)
    const provider: GoogleAuthProvider = new GoogleAuthProvider()

    return {
        provide: {
            firebase: {
                auth,
                provider,
                signInWithPopup,
                signOut
            }
        }
    }
})
