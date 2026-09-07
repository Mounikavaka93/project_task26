import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'aureum-auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = ({ email, password }) => {
    const accounts = JSON.parse(localStorage.getItem('aureum-users') || '[]')
    const match = accounts.find(
      (account) => account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password,
    )
    if (!match) {
      return { ok: false, error: 'Those salon credentials were not found.' }
    }
    setUser({ name: match.name, email: match.email })
    return { ok: true }
  }

  const signup = ({ name, email, password }) => {
    const accounts = JSON.parse(localStorage.getItem('aureum-users') || '[]')
    if (accounts.some((account) => account.email.toLowerCase() === email.trim().toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    accounts.push({ name, email: email.trim(), password })
    localStorage.setItem('aureum-users', JSON.stringify(accounts))
    setUser({ name, email: email.trim() })
    return { ok: true }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
