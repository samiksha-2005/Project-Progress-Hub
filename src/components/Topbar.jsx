import { useState, useRef, useEffect } from 'react'

const DEFAULT_NOTIFICATIONS = [
  { id: 1, color: 'var(--amber)',     text: '<b>Aarav</b> moved <b>Website Redesign</b> task to Review', time: '2m ago',    unread: true },
  { id: 2, color: 'var(--violet)',    text: '<b>Meera</b> mentioned you in <b>Mobile App</b>',           time: '18m ago',   unread: true },
  { id: 3, color: 'var(--coral)',     text: '<b>API Integration</b> milestone is overdue by 1 day',      time: '1h ago',    unread: true },
  { id: 4, color: 'var(--mint)',      text: '<b>Kabir</b> completed <b>Brand Guidelines</b> task',       time: '4h ago',    unread: false },
  { id: 5, color: 'var(--paper-dim)', text: '<b>Nisha</b> joined the <b>Dashboard Refactor</b> project', time: 'Yesterday', unread: false },
]

function Topbar({ onMenuClick, onSearch, onLogout, onRefresh, apiStatus, notifications }) {
  const [open, setOpen] = useState(false)
  const [entered, setEntered] = useState(false)
  const [items, setItems] = useState(notifications || DEFAULT_NOTIFICATIONS)
  const [spinning, setSpinning] = useState(false)
  const wrapRef = useRef(null)

  const unreadCount = items.filter((n) => n.unread).length
  const isRefreshing = spinning || apiStatus?.loading

  useEffect(() => {
    if (notifications) setItems(notifications)
  }, [notifications])

  useEffect(() => {
    if (open) {
      const t = requestAnimationFrame(() => setEntered(true))
      return () => cancelAnimationFrame(t)
    }
    setEntered(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onEsc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
  const markOneRead = (id) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))

  const handleRefresh = async () => {
    if (isRefreshing) return
    setSpinning(true)
    try {
      if (typeof onRefresh === 'function') {
        await onRefresh()
      }
    } finally {
      // keep the spin visible long enough to feel like a refresh
      setTimeout(() => setSpinning(false), 700)
    }
  }

  return (
    <header className="topbar blueprint">
      <button onClick={onMenuClick} className="hamburger lg:hidden">
        <span />
      </button>

      <div className="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-muted">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks, projects, people…"
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>

      <div className="topbar-right">
        <div className="relative inline-flex" ref={wrapRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="Notifications"
            className={`icon-btn ${
              open ? '!text-[var(--amber)] !border-[var(--amber-dim)] !bg-[var(--surface-3)]' : ''
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 01-3.4 0" />
            </svg>
            {unreadCount > 0 && <span className="badge-dot" />}
          </button>

          {open && (
            <div
              className={`
                absolute right-0 top-[calc(100%+10px)] z-[80]
                w-[min(330px,calc(100vw-32px))]
                origin-top-right overflow-hidden rounded-[3px]
                border border-[var(--line)] bg-[var(--surface)]
                shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]
                transition-all duration-150 ease-out
                ${entered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1.5 scale-[0.98]'}
              `}
            >
              <span className="pointer-events-none absolute -left-px -top-px h-2.5 w-2.5 border-l-[1.5px] border-t-[1.5px] border-[var(--amber-dim)] opacity-60" />
              <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b-[1.5px] border-r-[1.5px] border-[var(--amber-dim)] opacity-60" />

              <div className="flex items-start justify-between gap-2.5 border-b border-[var(--line)] bg-[var(--surface-2)] px-3.5 pb-3 pt-3.5">
                <div>
                  <div className="font-display text-sm font-semibold text-[var(--paper)]">Notifications</div>
                  <div className="mt-[3px] font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">
                    {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
                  </div>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="whitespace-nowrap rounded-[3px] border border-transparent px-1.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-[var(--amber)] transition-all duration-150 hover:border-[var(--amber-dim)] hover:bg-[var(--surface-3)]"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-[320px] overflow-y-auto overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 px-3.5 py-8 font-mono text-[11px] text-[var(--muted)]">
                    <span>No notifications yet</span>
                  </div>
                ) : (
                  items.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markOneRead(n.id)}
                      className={`
                        flex w-full items-start gap-2.5 border-b border-[var(--line-soft)] px-3.5 py-[11px]
                        text-left transition-colors duration-150 last:border-b-0
                        ${n.unread
                          ? 'bg-[rgba(255,180,84,0.045)] hover:bg-[rgba(255,180,84,0.09)]'
                          : 'hover:bg-[var(--surface-2)]'}
                      `}
                    >
                      <span
                        className="mt-[5px] h-[7px] w-[7px] flex-none rounded-full"
                        style={{ background: n.color }}
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className="block text-[12.5px] leading-[1.5] text-[var(--paper-dim)] [&>b]:font-semibold [&>b]:text-[var(--paper)]"
                          dangerouslySetInnerHTML={{ __html: n.text }}
                        />
                        <span className="mt-[3px] block font-mono text-[10px] text-[var(--muted)]">{n.time}</span>
                      </span>
                      {n.unread && <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />}
                    </button>
                  ))
                )}
              </div>

              <div className="border-t border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-2.5 text-center">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setOpen(false) }}
                  className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-[var(--muted)] hover:text-[var(--amber)]"
                >
                  View all activity
                </a>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="Refresh roster"
          className={`icon-btn ${isRefreshing ? '!text-[var(--amber)] !border-[var(--amber-dim)]' : ''}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <path d="M21 12a9 9 0 11-3-6.7" />
            <path d="M21 3v6h-6" />
          </svg>
        </button>

        <div className="user-chip">
          <div className="avatar bg-amber">YO</div>
          <span className="user-chip-name hidden sm:block">You · Intern</span>
        </div>
      </div>
    </header>
  )
}

export default Topbar