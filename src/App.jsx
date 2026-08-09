import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import Dashboard from './components/Dashboard'
import Toast from './components/Toast'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', isError: false })

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError })
    setTimeout(() => setToast({ show: false, message: '', isError: false }), 3000)
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleRegister = (formData) => {
    // In a real app, you'd send this to your backend
    console.log('Registration data:', formData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowRegister(false)
  }

  if (isAuthenticated) {
    return (
      <>
        <Dashboard onLogout={handleLogout} showToast={showToast} />
        {toast.show && <Toast message={toast.message} isError={toast.isError} />}
      </>
    )
  }

  if (showRegister) {
    return (
      <>
        <RegisterScreen 
          onRegister={handleRegister}
          onBackToLogin={() => setShowRegister(false)}
          showToast={showToast}
        />
        {toast.show && <Toast message={toast.message} isError={toast.isError} />}
      </>
    )
  }

  return (
    <>
      <LoginScreen 
        onLogin={handleLogin}
        onShowRegister={() => setShowRegister(true)}
        showToast={showToast}
      />
      {toast.show && <Toast message={toast.message} isError={toast.isError} />}
    </>
  )
}

export default App