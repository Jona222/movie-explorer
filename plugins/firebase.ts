import { defineNuxtPlugin } from '#app'
import { initializeApp, type FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth'


export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyCb4ClLo8piwWjJdtHMf-EcFeR8T-Aj0Vg",
        authDomain: "movie-explorer-b3fca.firebaseapp.com",
        projectId: "movie-explorer-b3fca",
        storageBucket: "movie-explorer-b3fca.firebasestorage.app",
        messagingSenderId: "173428736729",
        appId: "1:173428736729:web:e321026954466fb940b4c8",
        measurementId: "G-04G5DF53QW"
    };

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
