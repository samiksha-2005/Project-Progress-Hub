import { useState } from 'react'

function MemberModal({ onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !role.trim()) return
    
    onSubmit({
      name: name.trim(),
      role: role.trim(),
    })
  }

  return (
    <div 
      className="member-modal-overlay" 
      onClick={onClose}
      role="presentation"
    >
      <div 
        className="member-modal-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-modal-title"
      >
        {/* Corner details */}
        <div className="member-modal-corner-tl" />
        <div className="member-modal-corner-br" />

        <form onSubmit={handleSubmit}>
          <div className="member-modal-content">
            {/* Header */}
            <div className="member-modal-header">
              <h2 id="member-modal-title" className="member-modal-title">
                Add team member
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="member-modal-close"
                aria-label="Close add member modal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Full name */}
            <div className="member-field">
              <label htmlFor="member-name" className="member-field-label">
                Full name
              </label>

              <input
                id="member-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Nair"
                className="member-field-input"
                autoFocus
                required
              />
            </div>

            {/* Role */}
            <div className="member-field">
              <label htmlFor="member-role" className="member-field-label">
                Role
              </label>

              <input
                id="member-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Backend Engineer"
                className="member-field-input"
                required
              />
            </div>

            {/* Buttons */}
            <div className="member-modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="member-modal-btn member-modal-btn-cancel"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!name.trim() || !role.trim()}
                className="member-modal-btn member-modal-btn-submit"
              >
                Add member
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MemberModal