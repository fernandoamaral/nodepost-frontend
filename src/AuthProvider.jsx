import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
      } catch (error) {
        console.error('Token inválido:', error)
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    const decoded = jwtDecode(token)
    setUser(decoded)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  if(user && user.exp * 1000 < Date.now()){
    logout()
  }

  return (
    <AuthContext value={{ user, login, logout, loading }}>
      {children}
    </AuthContext>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}
