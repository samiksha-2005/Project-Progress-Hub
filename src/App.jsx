import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import Toast from './components/Toast'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [toasts, setToasts] = useState([])

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