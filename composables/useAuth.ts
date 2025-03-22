import {ref} from 'vue'
import {onAuthStateChanged} from 'firebase/auth'

const user = ref<any | null>(null)

export function useAuth() {
    const {$firebase} = useNuxtApp()

    const login = async () => {
        try {
            await $firebase.signInWithPopup($firebase.auth, $firebase.provider)
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    const logout = async () => {
        try {
            await $firebase.signOut($firebase.auth)
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    onAuthStateChanged($firebase.auth, (currentUser) => {
        user.value = currentUser
    })


    return {
        user,
        login,
        logout,
    }
}
