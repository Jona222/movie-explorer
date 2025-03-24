import {ref} from 'vue'
import type { Auth, UserCredential, User, GoogleAuthProvider } from 'firebase/auth';
import {onAuthStateChanged} from 'firebase/auth'
export interface FirebasePlugin {
    auth: Auth
    provider: GoogleAuthProvider
    signInWithPopup: (auth: Auth, provider: GoogleAuthProvider ) => Promise<UserCredential>
    signOut: (auth: Auth) => Promise<void>
}
const user = ref<User  | null>(null)

export function useAuth() {
    const {$firebase} = useNuxtApp()
    const firebase = $firebase as FirebasePlugin
    const login = async () => {
        try {
            await firebase.signInWithPopup(firebase.auth, firebase.provider)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Login error:', error)
        }
    }
    const logout = async () => {
        try {
            await firebase.signOut(firebase.auth)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Logout error:', error)
        }
    }

    onAuthStateChanged(firebase.auth, (currentUser) => {
        user.value = currentUser
    })

    return {
        user,
        login,
        logout,
    }
}
