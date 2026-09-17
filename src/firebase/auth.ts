import { ref, readonly } from 'vue'
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from './config'

const currentUser = ref<User | null>(auth.currentUser)
const isAuthLoading = ref<boolean>(true)
const authError = ref<string | null>(null)

let unsubscribe: (() => void) | null = null

export function useAuth() {
  if (!unsubscribe) {
    unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        currentUser.value = user
        isAuthLoading.value = false
        authError.value = null
      },
      (error) => {
        authError.value = error.message
        isAuthLoading.value = false
      }
    )
  }

  const loginWithGoogle = async () => {
    authError.value = null
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (err: any) {
      authError.value = err.message || 'Google sign-in failed'
      throw err
    }
  }

  const loginWithEmail = async (email: string, pass: string) => {
    authError.value = null
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass)
      return result.user
    } catch (err: any) {
      authError.value = err.message || 'Sign-in failed'
      throw err
    }
  }

  const registerWithEmail = async (email: string, pass: string) => {
    authError.value = null
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass)
      return result.user
    } catch (err: any) {
      authError.value = err.message || 'Registration failed'
      throw err
    }
  }

  const logout = async () => {
    authError.value = null
    try {
      await signOut(auth)
      currentUser.value = null
    } catch (err: any) {
      authError.value = err.message || 'Sign-out failed'
      throw err
    }
  }

  return {
    user: readonly(currentUser),
    loading: readonly(isAuthLoading),
    error: readonly(authError),
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  }
}
