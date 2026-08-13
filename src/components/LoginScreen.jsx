import { useState } from 'react'
import Compass from './Compass'

function LoginScreen({ onLogin, onShowRegister, showToast }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [shake, setShake] = useState(false)

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailOk = isValidEmail(email.trim())
    const pwOk = password.trim().length >= 4

    setEmailError(!emailOk)
    setPasswordError(!pwOk)

    if (!emailOk || !pwOk) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      showToast('Check the highlighted fields', true)
      return
    }

    setTimeout(() => {
      // Pass credentials object to onLogin
      onLogin({ 
        email: email.trim(), 
        password: password.trim(),
        rememberMe: false 
      })
      showToast(`Welcome back, ${email.split('@')[0]}`)
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
                <span className="-rotate-45">P</span>
              </div>
              <div>
                <div className="font-display font-semibold text-base">Project</div>
                <div className="font-mono text-[10px] text-muted uppercase tracking-wider">Progress Hub</div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative z-10 login-art-mid">
              <Compass />
            </div>

            <div className="relative z-10 max-w-[420px] login-art-bottom">
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-amber mb-2.5 page-eyebrow">// Project Console</div>
              <h2 className="font-display text-[26px] font-semibold leading-[1.3] mb-2.5">Plan the work. Track the build. Ship on schedule.</h2>
              <p className="text-muted text-[13px] leading-relaxed">Every project, task and teammate laid out on one board — drag tasks between stages, watch progress rings fill, and keep the whole team in view.</p>
              <div className="flex gap-5 mt-5 login-stat-row">
                <div className="font-mono login-stat">
                  <b className="block font-display text-xl text-amber font-semibold">128</b>
                  <span className="text-[10px] text-muted uppercase tracking-wider">Projects shipped</span>
                </div>
                <div className="font-mono login-stat">
                  <b className="block font-display text-xl text-amber font-semibold">4.2k</b>
                  <span className="text-[10px] text-muted uppercase tracking-wider">Tasks closed</span>
                </div>
                <div className="font-mono login-stat">
                  <b className="block font-display text-xl text-amber font-semibold">99.2%</b>
                  <span className="text-[10px] text-muted uppercase tracking-wider">On-time rate</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right side - login form */}
          <section className="flex flex-1 items-center justify-center p-6 sm:p-8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] login-panel">
            <div className={`w-full max-w-[340px] p-6 sm:p-7 rounded-[3px] bg-surface/95 border border-line shadow-[0_18px_45px_-20px_rgba(0,0,0,0.65)] relative login-card ${shake ? 'animate-shake' : ''}`}>
              {/* Corner brackets */}
              <div className="absolute top-[-1px] left-[-1px] w-[9px] h-[9px] border-[1.5px] border-amber-dim opacity-55 border-r-0 border-b-0" />
              <div className="absolute bottom-[-1px] right-[-1px] w-[9px] h-[9px] border-[1.5px] border-amber-dim opacity-55 border-l-0 border-t-0" />

              <div className="mb-6 login-card-head">
                <div className="flex items-center gap-2.5 mb-5 lg:hidden brand">
                  <div className="w-[30px] h-[30px] border-[1.5px] border-amber grid place-items-center font-mono text-[13px] text-amber rotate-45">
                    <span className="-rotate-45">P</span>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-base">Project</div>
                    <div className="font-mono text-[10px] text-muted uppercase tracking-wider">Progress Hub</div>
                  </div>
                </div>
                <h1 className="font-display text-[21px] font-semibold mb-1.5">Welcome back</h1>
                <p className="text-[12.5px] text-muted">Sign in to open your dashboard.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className={`field ${emailError ? 'has-error' : ''}`}>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-surface-2 border ${emailError ? 'border-coral' : 'border-line'} text-paper px-5 py-2.5 rounded-[3px] text-[12px] font-sans focus:border-amber-dim focus:outline-none transition-colors`}
                    placeholder="you@company.com"
                  />
                  {emailError && <div className="field-error mt-1.5">Enter a valid email address.</div>}
                </div>

                <div className={`field pw-field ${passwordError ? 'has-error' : ''}`}>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full bg-surface-2 border ${passwordError ? 'border-coral' : 'border-line'} text-paper px-5 py-2.5 pr-10 rounded-[3px] text-[12px] font-sans focus:border-amber-dim focus:outline-none transition-colors`}
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
                  {passwordError && <div className="field-error mt-1.5">Password must be at least 4 characters.</div>}
                </div>

                <div className="flex items-center justify-between text-xs login-row-between">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <a href="#" className="link-muted">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber text-ink font-semibold text-[13px] px-4 py-2.5 rounded-[3px] border border-amber hover:bg-[#ffc372] transition-all flex items-center justify-center gap-2 btn btn-block"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                    <path d="M10 17l5-5-5-5" />
                    <path d="M15 12H3" />
                  </svg>
                  Sign in
                </button>
              </form>

              <p className="text-center mt-5 text-[12.5px] text-muted signup-hint">
                New here? <a href="#" onClick={(e) => { e.preventDefault(); onShowRegister(); }}>Register →</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen