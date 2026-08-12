import { useState, useEffect } from 'react'
import Login from './components/LoginScreen.jsx'
import Dashboard from './components/Dashboard.jsx'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated')
    return savedAuth === 'true'
  })

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated)
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [isAuthenticated, user])

  const handleLogin = (credentials) => {
    // Add safety check
    if (!credentials || !credentials.email || !credentials.password) {
      console.error('Invalid credentials provided')
      return
    }

    // Simple demo authentication - accepts any email/password
    const userData = {
      email: credentials.email,
      name: credentials.email.split('@')[0],
    }
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  return (
    <>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} user={user} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  )
}

export default App