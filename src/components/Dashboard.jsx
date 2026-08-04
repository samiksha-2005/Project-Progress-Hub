import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Overview from './views/Overview'
import Board from './views/Board'
import Team from './views/Team'
import Analytics from './views/Analytics'
import TaskModal from './TaskModal'
import MemberModal from './MemberModal'
import { useAppState } from '../hooks/useAppState'

function Dashboard({ onLogout, showToast }) {
  const [currentView, setCurrentView] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const { state, addTask, addMember, moveTask, apiStatus, refreshTeam } = useAppState(showToast)

  const handleTaskAdd = (task) => {
    addTask(task)
    setShowTaskModal(false)
    showToast('Task added to To do')
    setCurrentView('board')
  }

  const handleMemberAdd = (member) => {
    addMember(member)
    setShowMemberModal(false)
    showToast(`${member.name} added to the team`)
    setCurrentView('team')
  }

  const handleTaskMove = (taskId, newStatus) => {
    const task = state.tasks.find(t => t.id === taskId)
    if (task) {
      moveTask(taskId, newStatus)
      showToast(`Moved "${task.title}" to ${newStatus}`)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query) setCurrentView('board')
  }

  return (
    <div className="min-h-screen">
      <div className="app grid grid-cols-1 lg:grid-cols-[236px_1fr] min-h-screen">
      <Sidebar
        projects={state.projects}
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />

      <div className="flex flex-col min-w-0">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          onSearch={handleSearch}
          onLogout={onLogout}
          onRefresh={refreshTeam}
          apiStatus={apiStatus}
        />

        <main className="main content">
          <div className="flex items-center gap-2 font-mono text-[10.5px] text-muted px-3 py-2 border border-dashed border-line-soft rounded-[3px] mb-4">
            <span className={`w-1.5 h-1.5 rounded-full ${apiStatus.loading ? 'bg-amber' : apiStatus.error ? 'bg-coral' : 'bg-mint'} relative`}>
              <span className={`absolute -inset-1 rounded-full border ${apiStatus.loading ? 'border-amber' : apiStatus.error ? 'border-coral' : 'border-mint'} animate-ping`} />
            </span>
            <span>{apiStatus.message}</span>
          </div>

          {currentView === 'overview' && (
            <Overview
              state={state}
              onNewTask={() => setShowTaskModal(true)}
            />
          )}
          {currentView === 'board' && (
            <Board
              tasks={state.tasks}
              projects={state.projects}
              team={state.team}
              onTaskMove={handleTaskMove}
              onNewTask={() => setShowTaskModal(true)}
              searchQuery={searchQuery}
            />
          )}
          {currentView === 'team' && (
            <Team
              team={state.team}
              tasks={state.tasks}
              projects={state.projects}
              onAddMember={() => setShowMemberModal(true)}
            />
          )}
          {currentView === 'analytics' && (
            <Analytics
              tasks={state.tasks}
              team={state.team}
            />
          )}
        </main>
      </div>

      {showTaskModal && (
        <TaskModal
          projects={state.projects}
          team={state.team}
          onClose={() => setShowTaskModal(false)}
          onSubmit={handleTaskAdd}
        />
      )}

      {showMemberModal && (
        <MemberModal
          onClose={() => setShowMemberModal(false)}
          onSubmit={handleMemberAdd}
        />
      )}
      </div>
    </div>
  )
}

export default Dashboard