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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="w-full max-w-[420px] bg-surface border border-line rounded-[3px] p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-base font-semibold">Add team member</div>
          <button
            onClick={onClose}
            className="w-6 h-6 border border-line rounded-[3px] grid place-items-center text-muted bg-surface-2 hover:text-amber transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3.5">
            <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Nair"
              className="w-full bg-surface-2 border border-line text-paper px-2.5 py-2 rounded-[3px] text-[13px] focus:border-amber-dim focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="mb-3.5">
            <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Backend Engineer"
              className="w-full bg-surface-2 border border-line text-paper px-2.5 py-2 rounded-[3px] text-[13px] focus:border-amber-dim focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="flex justify-end gap-2.5 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="font-semibold text-[13px] px-4 py-2.5 rounded-[3px] border border-line bg-surface-2 text-paper hover:border-amber-dim transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber text-ink font-semibold text-[13px] px-4 py-2.5 rounded-[3px] border border-amber hover:bg-[#ffc372] transition-all"
            >
              Add member
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MemberModal