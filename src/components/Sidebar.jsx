function Sidebar({ projects, currentView, onViewChange, isOpen, onClose }) {
  return (
    <aside className={`
      sidebar blueprint
      fixed lg:static inset-y-0 left-0 w-[236px] z-50 
      transition-transform duration-300 lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="brand">
        <div className="brand-mark">
          <span>D</span>
        </div>
        <div>
          <div className="brand-name">Drafting</div>
          <div className="brand-sub">Project Console</div>
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
        <div className="storage-note">
          SESSION-ONLY STATE<br />Data resets on reload — this demo keeps state in memory, no local storage used.
        </div>
      </div>
    </aside>
  )
}

export default Sidebar