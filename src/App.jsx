import { useState, useEffect } from 'react'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import Toast from './components/Toast'

function App() {
  // Initialize from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn')
    return saved === 'true'
  })
  
  const [toasts, setToasts] = useState([])

  // Persist login state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn)
  }, [isLoggedIn])

  const showToast = (msg, isErr = false) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg, isErr }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  return (
    <>
      {!isLoggedIn ? (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} showToast={showToast} />
      ) : (
        <Dashboard onLogout={() => setIsLoggedIn(false)} showToast={showToast} />
      )}
      <Toast toasts={toasts} />
    </>
  )
}

export default App