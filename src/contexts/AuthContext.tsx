import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, authAPI } from '../api/authAPI'

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  register: (username: string, email: string, password: string, passwordConfirm: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await authAPI.getCurrentUser()
        setUser(currentUser)
      } catch {
        // Not logged in
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const register = async (username: string, email: string, password: string, passwordConfirm: string) => {
    try {
      setError(null)
      const response = await authAPI.register(username, email, password, passwordConfirm)
      setUser(response.user)
      localStorage.setItem('token', response.token)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
      throw err
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      const response = await authAPI.login(email, password)
      setUser(response.user)
      localStorage.setItem('token', response.token)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
      throw err
    }
  }

  const logout = async () => {
    try {
      setError(null)
      await authAPI.logout()
      setUser(null)
      localStorage.removeItem('token')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Logout failed')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
