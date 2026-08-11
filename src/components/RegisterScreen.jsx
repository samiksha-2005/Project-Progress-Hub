import { useState } from 'react'
import Compass from './Compass'

function RegisterScreen({ onRegister, onBackToLogin, showToast }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [shake, setShake] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    // Validation
    if (formData.fullName.trim().length < 2) {
      newErrors.fullName = true
    }
    if (!isValidEmail(formData.email.trim())) {
      newErrors.email = true
    }
    if (formData.company.trim().length < 2) {
      newErrors.company = true
    }
    if (!formData.role) {
      newErrors.role = true
    }
    if (formData.password.trim().length < 6) {
      newErrors.password = true
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true
    }
    if (!agreeTerms) {
      newErrors.terms = true
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      showToast('Please check the highlighted fields', true)
      return
    }

    setTimeout(() => {
      onRegister(formData)
      showToast(`Welcome to Drafting, ${formData.fullName.split(' ')[0]}!`)
    }, 700)
  }

  return (
    <div className="min-h-screen w-full flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex flex-1 w-full overflow-hidden rounded-[28px] border border-line/80 bg-surface/85 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="flex w-full flex-col lg:flex-row">
          {/* Left side - brand panel */}
          <section className="hidden lg:flex flex-1 relative overflow-hidden border-r border-line/70 flex-col justify-between p-10 bg-surface/90 login-art">
            <div className="flex items-center gap-2.5 relative z-10 login-art-top">
              <div className="w-[30px] h-[30px] border-[1.5px] border-amber grid place-items-center font-mono text-[13px] text-amber rotate-45">
                <span className="-rotate-45">D</span>
              </div>
              <div>
                <div className="font-display font-semibold text-base">Drafting</div>
                <div className="font-mono text-[10px] text-muted uppercase tracking-wider">Project Console</div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative z-10 login-art-mid">
              <Compass />
            </div>

            <div className="relative z-10 max-w-[420px] login-art-bottom">
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-amber mb-2.5 page-eyebrow">// Join the platform</div>
              <h2 className="font-display text-[26px] font-semibold leading-[1.3] mb-2.5">Start managing projects like a pro.</h2>
              <p className="text-muted text-[13px] leading-relaxed">Create your account and get instant access to project boards, team collaboration tools, and real-time progress tracking.</p>
              <div className="flex gap-5 mt-5 login-stat-row">
                <div className="font-mono login-stat">
                  <b className="block font-display text-xl text-amber font-semibold">5k+</b>
                  <span className="text-[10px] text-muted uppercase tracking-wider">Active teams</span>
                </div>
                <div className="font-mono login-stat">
                  <b className="block font-display text-xl text-amber font-semibold">Free</b>
                  <span className="text-[10px] text-muted uppercase tracking-wider">Forever plan</span>
                </div>
                <div className="font-mono login-stat">
                  <b className="block font-display text-xl text-amber font-semibold">2min</b>
                  <span className="text-[10px] text-muted uppercase tracking-wider">Setup time</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right side - register form */}
          <section className="flex flex-1 items-center justify-center p-6 sm:p-8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] login-panel">
            <div className={`w-full max-w-[400px] p-6 sm:p-7 rounded-[3px] bg-surface/95 border border-line shadow-[0_18px_45px_-20px_rgba(0,0,0,0.65)] relative login-card ${shake ? 'animate-shake' : ''}`}>
              {/* Corner brackets */}
              <div className="absolute top-[-1px] left-[-1px] w-[9px] h-[9px] border-[1.5px] border-amber-dim opacity-55 border-r-0 border-b-0" />
              <div className="absolute bottom-[-1px] right-[-1px] w-[9px] h-[9px] border-[1.5px] border-amber-dim opacity-55 border-l-0 border-t-0" />

              <div className="mb-5 login-card-head">
                <div className="flex items-center gap-2.5 mb-5 lg:hidden brand">
                  <div className="w-[30px] h-[30px] border-[1.5px] border-amber grid place-items-center font-mono text-[13px] text-amber rotate-45">
                    <span className="-rotate-45">D</span>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-base">Drafting</div>
                    <div className="font-mono text-[10px] text-muted uppercase tracking-wider">Project Console</div>
                  </div>
                </div>
                <h1 className="font-display text-[21px] font-semibold mb-1.5">Create your account</h1>
                <p className="text-[12.5px] text-muted">Get started with your free workspace.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className={`field ${errors.fullName ? 'has-error' : ''}`}>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className={`w-full bg-surface-2 border ${errors.fullName ? 'border-coral' : 'border-line'} text-paper px-5 py-2.5 rounded-[3px] text-[16px] sm:text-[12px] font-sans focus:border-amber-dim focus:outline-none transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <div className="field-error mt-1.5">Enter your full name (min. 2 characters).</div>}
                </div>

                <div className={`field ${errors.email ? 'has-error' : ''}`}>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full bg-surface-2 border ${errors.email ? 'border-coral' : 'border-line'} text-paper px-5 py-2.5 rounded-[3px] text-[16px] sm:text-[12px] font-sans focus:border-amber-dim focus:outline-none transition-colors`}
                    placeholder="you@company.com"
                  />
                  {errors.email && <div className="field-error mt-1.5">Enter a valid email address.</div>}
                </div>

                <div className={`field ${errors.company ? 'has-error' : ''}`}>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className={`w-full bg-surface-2 border ${errors.company ? 'border-coral' : 'border-line'} text-paper px-5 py-2.5 rounded-[3px] text-[16px] sm:text-[12px] font-sans focus:border-amber-dim focus:outline-none transition-colors`}
                    placeholder="Acme Inc."
                  />
                  {errors.company && <div className="field-error mt-1.5">Enter your company name.</div>}
                </div>

                <div className={`field ${errors.role ? 'has-error' : ''}`}>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Your Role</label>
                  <div className="relative">
                    <select
                      value={formData.role}
                      onChange={(e) => handleChange('role', e.target.value)}
                      className={`w-full appearance-none bg-surface-2 border ${errors.role ? 'border-coral' : 'border-line'} ${formData.role ? 'text-paper' : 'text-muted'} px-5 py-2.5 pr-10 rounded-[3px] text-[16px] sm:text-[12px] font-sans focus:border-amber-dim focus:outline-none transition-colors cursor-pointer hover:border-line-soft`}
                    >
                      <option value="" className="text-muted">Select your role</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Team Lead">Team Lead</option>
                      <option value="Developer">Developer</option>
                      <option value="Designer">Designer</option>
                      <option value="QA Engineer">QA Engineer</option>
                      <option value="Other">Other</option>
                    </select>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-dim"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                  {errors.role && <div className="field-error mt-1.5">Select your role.</div>}
                </div>

                <div className={`field pw-field ${errors.password ? 'has-error' : ''}`}>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className={`w-full bg-surface-2 border ${errors.password ? 'border-coral' : 'border-line'} text-paper px-5 py-2.5 pr-10 rounded-[3px] text-[16px] sm:text-[12px] font-sans focus:border-amber-dim focus:outline-none transition-colors`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-paper transition-colors w-4 h-4"
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-full h-full">
                          <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.6 21.6 0 015.06-6.06M9.9 4.24A10.4 10.4 0 0112 4c7 0 11 7 11 7a21.6 21.6 0 01-2.68 3.68M14.12 14.12a3 3 0 11-4.24-4.24" />
                          <path d="M1 1l22 22" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-full h-full">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <div className="field-error mt-1.5">Password must be at least 6 characters.</div>}
                </div>

                <div className={`field pw-field ${errors.confirmPassword ? 'has-error' : ''}`}>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className={`w-full bg-surface-2 border ${errors.confirmPassword ? 'border-coral' : 'border-line'} text-paper px-5 py-2.5 pr-10 rounded-[3px] text-[16px] sm:text-[12px] font-sans focus:border-amber-dim focus:outline-none transition-colors`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-paper transition-colors w-4 h-4"
                    >
                      {showConfirmPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-full h-full">
                          <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.6 21.6 0 015.06-6.06M9.9 4.24A10.4 10.4 0 0112 4c7 0 11 7 11 7a21.6 21.6 0 01-2.68 3.68M14.12 14.12a3 3 0 11-4.24-4.24" />
                          <path d="M1 1l22 22" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-full h-full">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="field-error mt-1.5">Passwords do not match.</div>}
                </div>

                <div className={`flex flex-col items-center justify-center ${errors.terms ? 'has-error' : ''}`}>
                  <label className="flex items-center justify-center gap-2 text-[10.5px] text-muted whitespace-nowrap cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked)
                        if (errors.terms) {
                          setErrors(prev => ({ ...prev, terms: false }))
                        }
                      }}
                      className="m-0 cursor-pointer"
                    />
                    <span>
                      I agree to the <a href="#" className="text-paper hover:text-amber transition-colors underline decoration-line/50 underline-offset-2">Terms of Service</a> and <a href="#" className="text-paper hover:text-amber transition-colors underline decoration-line/50 underline-offset-2">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.terms && <div className="field-error mt-1.5 text-center">You must agree to continue.</div>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber text-ink font-semibold text-[13px] px-4 py-2.5 rounded-[3px] border border-amber hover:bg-[#ffc372] transition-all flex items-center justify-center gap-2 btn btn-block"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  Create account
                </button>
              </form>

              <p className="text-center mt-5 text-[12.5px] text-muted signup-hint">
                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onBackToLogin(); }}>Sign in →</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen