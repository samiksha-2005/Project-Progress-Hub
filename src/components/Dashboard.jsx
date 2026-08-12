import { useState, useEffect } from 'react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import Overview from './views/Overview.jsx'
import Board from './views/Board.jsx'
import Team from './views/Team.jsx'
import Analytics from './views/Analytics.jsx'
import TaskModal from './TaskModal.jsx'
import MemberModal from './MemberModal.jsx'
import { useAppState } from '../hooks/useAppState.js'

function Dashboard({ onLogout, showToast }) {
  const [currentView, setCurrentView] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  
  const { state, addTask, addMember, moveTask, deleteTask, deleteMember, apiStatus, refreshTeam } = useAppState(showToast)

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

  const handleTaskDelete = (taskId) => {
  console.log('Deleting task with ID:', taskId)
  console.log('Current tasks:', state.tasks.map(t => t.id))
  deleteTask(taskId)
}

  const handleMemberDelete = (memberId) => {
    deleteMember(memberId)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    
    if (!query.trim()) {
      setSearchResults(null)
      return
    }

    const lowerQuery = query.toLowerCase()
    
    // Search in tasks
    const taskResults = state.tasks.filter(task => 
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description?.toLowerCase().includes(lowerQuery) ||
      task.status.toLowerCase().includes(lowerQuery)
    )

    // Search in team members
    const teamResults = state.team.filter(member =>
      member.name.toLowerCase().includes(lowerQuery) ||
      member.role.toLowerCase().includes(lowerQuery) ||
      member.email?.toLowerCase().includes(lowerQuery)
    )

    // Search in projects
    const projectResults = state.projects.filter(project =>
      project.name.toLowerCase().includes(lowerQuery)
    )

    const results = {
      tasks: taskResults,
      team: teamResults,
      projects: projectResults,
      total: taskResults.length + teamResults.length + projectResults.length
    }

    setSearchResults(results)

    // Auto-switch to the view with most results
    if (results.total === 0) {
      // Stay on current view, will show "no results"
      return
    }

    if (taskResults.length > 0 && taskResults.length >= teamResults.length && taskResults.length >= projectResults.length) {
      setCurrentView('board')
    } else if (teamResults.length > 0 && teamResults.length >= taskResults.length && teamResults.length >= projectResults.length) {
      setCurrentView('team')
    } else if (projectResults.length > 0) {
      setCurrentView('overview')
    }
  }

  // Clear search when view changes manually
  const handleViewChange = (view) => {
    setCurrentView(view)
    setSearchQuery('')
    setSearchResults(null)
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
        onLogout={onLogout}
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

          {/* Show search results summary */}
          {searchQuery && searchResults && (
            <div className="mb-4 p-3 border border-line-soft rounded-[3px] bg-bg-soft">
              <div className="text-sm text-text-primary mb-2">
                Search results for "<span className="font-medium">{searchQuery}</span>"
              </div>
              {searchResults.total === 0 ? (
                <div className="text-sm text-muted">No results found</div>
              ) : (
                <div className="flex gap-4 text-xs text-muted">
                  {searchResults.tasks.length > 0 && <span>{searchResults.tasks.length} task(s)</span>}
                  {searchResults.team.length > 0 && <span>{searchResults.team.length} team member(s)</span>}
                  {searchResults.projects.length > 0 && <span>{searchResults.projects.length} project(s)</span>}
                </div>
              )}
            </div>
          )}

          {currentView === 'overview' && (
            <Overview
              state={state}
              onNewTask={() => setShowTaskModal(true)}
              searchQuery={searchQuery}
              searchResults={searchResults}
            />
          )}
          {currentView === 'board' && (
            <Board
              tasks={state.tasks}
              projects={state.projects}
              team={state.team}
              onTaskMove={handleTaskMove}
              onTaskDelete={handleTaskDelete}
              onNewTask={() => setShowTaskModal(true)}
              searchQuery={searchQuery}
              searchResults={searchResults}
            />
          )}
          {currentView === 'team' && (
            <Team
              team={state.team}
              tasks={state.tasks}
              projects={state.projects}
              onAddMember={() => setShowMemberModal(true)}
              onMemberDelete={handleMemberDelete}
              searchQuery={searchQuery}
              searchResults={searchResults}
            />
          )}
          {currentView === 'analytics' && (
            <Analytics
              tasks={state.tasks}
              team={state.team}
              searchQuery={searchQuery}
              searchResults={searchResults}
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