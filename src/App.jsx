import { useState, useEffect } from 'react'
import LoginScreen from './components/LoginScreen.jsx'
import RegisterScreen from './components/RegisterScreen.jsx'
import Dashboard from './components/Dashboard.jsx'
import './App.css'

function App() {
  const [screen, setScreen] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true' ? 'app' : 'login'
  })

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [toast, setToast] = useState(null)

  useEffect(() => {
    const authed = screen === 'app'
    localStorage.setItem('isAuthenticated', authed)
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [screen, user])

  const showToast = (message, isError = false) => {
    setToast({ message, isError })
    setTimeout(() => setToast(null), 2400)
  }

  const handleLogin = (credentials) => {
    if (!credentials || !credentials.email || !credentials.password) return

    const userData = {
      email: credentials.email,
      name: credentials.email.split('@')[0],
    }
    setUser(userData)
    setScreen('app')
  }

  const handleRegister = (payload) => {
    const userData = {
      email: payload?.email || '',
      name: payload?.name || payload?.email?.split('@')[0] || 'User',
    }
    setUser(userData)
    setScreen('app')
    showToast(`Account created. Welcome, ${userData.name}`)
  }

  const handleLogout = () => {
    setUser(null)
    setScreen('login')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  return (
    <>
      {screen === 'app' && (
        <Dashboard onLogout={handleLogout} user={user} showToast={showToast} />
      )}

      {screen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onShowRegister={() => setScreen('register')}
          showToast={showToast}
        />
      )}

      {screen === 'register' && (
        <RegisterScreen
          onRegister={handleRegister}
          onBackToLogin={() => setScreen('login')}
          showToast={showToast}
        />
      )}

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-[90] border px-3.5 py-2.5 text-[12.5px] ${
            toast.isError
              ? 'border-[var(--coral)] bg-[rgba(255,107,107,0.12)] text-[var(--coral)]'
              : 'border-[var(--line)] bg-[var(--surface-2)] text-[var(--paper)]'
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  )
}

export default App