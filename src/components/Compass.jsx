function Compass() {
  return (
    <svg className="w-[280px] h-[280px]" viewBox="0 0 280 280">
      <circle className="fill-none stroke-line" cx="140" cy="140" r="118" strokeWidth="1" />
      <circle className="fill-none stroke-amber-dim animate-spin-slow origin-center" cx="140" cy="140" r="96" strokeWidth="1" strokeDasharray="2 6" style={{ animationDuration: '60s' }} />
      <circle className="fill-none stroke-line animate-spin-reverse origin-center" cx="140" cy="140" r="70" strokeWidth="1" strokeDasharray="1 4" style={{ animationDuration: '90s' }} />
      <line className="stroke-line" x1="140" y1="14" x2="140" y2="266" strokeWidth="1" />
      <line className="stroke-line" x1="14" y1="140" x2="266" y2="140" strokeWidth="1" />
      <g className="origin-[140px_140px] animate-needle-sweep">
        <line x1="140" y1="140" x2="140" y2="46" stroke="#FFB454" strokeWidth="2" />
        <line x1="140" y1="140" x2="140" y2="234" stroke="#2A4066" strokeWidth="2" />
      </g>
      <circle cx="140" cy="140" r="5" fill="#FFB454" />
      <circle cx="140" cy="140" r="9" fill="none" stroke="#FFB454" strokeWidth="1.2" />
    </svg>
  )
}

export default Compass