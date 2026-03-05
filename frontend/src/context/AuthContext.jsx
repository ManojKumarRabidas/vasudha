import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = (email, password) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Find user from mock data
      const userData = {
        email,
        role: email.includes('donor') ? 'donor' : 
              email.includes('ngo') ? 'ngo' :
              email.includes('volunteer') ? 'volunteer' :
              email.includes('admin') ? 'admin' : 'donor',
        name: email.split('@')[0],
        id: Math.random().toString(36).substr(2, 9)
      }
      setUser(userData)
      setLoading(false)
    }, 500)
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
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
