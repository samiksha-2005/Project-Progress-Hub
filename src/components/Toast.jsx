function Toast({ toasts = [] }) {
  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`bg-surface-2 border ${toast.isErr ? 'border-l-[3px] border-l-coral' : 'border-l-[3px] border-l-mint'} border-line px-4 py-3 rounded-[3px] text-[12.5px] min-w-[220px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] animate-slide-in`}
        >
          {toast.msg}
        </div>
      ))}
    </div>
  )
}

export default Toast