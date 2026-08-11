function Sidebar({ projects, currentView, onViewChange, isOpen, onClose, onLogout }) {
  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div 
          className="scrim show"
          onClick={onClose}
        />
      )}
      
      <aside className={`sidebar blueprint ${isOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">
            <span>P</span>
          </div>
          <div>
            <div className="brand-name">Project</div>
            <div className="brand-sub">Progress Hub</div>
          </div>
        </div>

        <nav>
          <div className="nav-group-label">Workspace</div>
          <div className="nav">
            {[
              { id: 'overview', icon: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z', label: 'Overview' },
              { id: 'board', icon: 'M3 3h18v18H3zM9 3v18M15 3v18', label: 'Task Board' },
              { id: 'team', icon: 'M9 8a3.2 3.2 0 110-6.4A3.2 3.2 0 019 8zM2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6M18 8.5a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8zM15.5 14.2c2.9.3 5 2.5 5 5.8', label: 'Team' },
              { id: 'analytics', icon: 'M3 21V9M10 21V3M17 21v-7', label: 'Analytics' },
            ].map(item => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => { e.preventDefault(); onViewChange(item.id); onClose(); }}
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`w-4 h-4 ${currentView === item.id ? 'opacity-100' : 'opacity-80'}`}>
                  <path d={item.icon} />
                </svg>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <nav className="flex-1 flex flex-col min-h-0">
          <div className="nav-group-label">Projects</div>
          <div className="projects-list">
            {projects.map(p => (
              <div key={p.id} className="mini-project">
                <span className="mini-dot" style={{ background: p.color }} />
                <span className="mini-project-name">{p.name}</span>
                <span className="mini-project-pct">{p.progress}%</span>
              </div>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onLogout && onLogout(); }}
            className="nav-item logout-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Log out
          </a>
        </div>
      </aside>
    </>
  )
}

export default Sidebar