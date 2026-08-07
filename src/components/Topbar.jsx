function Topbar({ onMenuClick, onSearch, onLogout, onRefresh, apiStatus }) {
  return (
    <header className="topbar blueprint">
      <button
        onClick={onMenuClick}
        className="hamburger lg:hidden"
      >
        <span />
      </button>

      <div className="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"     className="w-3.5 h-3.5 text-muted">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks, projects, people…"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="topbar-right">
        <button className="icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 01-3.4 0" />
          </svg>
          <span className="badge-dot" />
        </button>

        <button
          onClick={onRefresh}
          className="icon-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M21 12a9 9 0 11-3-6.7" />
            <path d="M21 3v6h-6" />
          </svg>
        </button>

        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onLogout(); }}
          className="user-chip"
        >
          <div className="avatar bg-amber">
            YO
          </div>
          <span className="user-chip-name hidden sm:block">You · Intern</span>
        </a>
      </div>
    </header>
  )
}

export default Topbar