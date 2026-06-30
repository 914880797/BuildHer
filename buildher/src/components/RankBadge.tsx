const rankStyles: Record<number, { bg: string; text: string; glow: string; icon: React.ReactNode }> = {
  1: {
    bg: 'bg-amber-400/20',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_12px_rgba(251,191,36,0.3)]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z" fill="currentColor" opacity="0.3" />
        <path d="M5 16l-2-11 5.5 5L12 4l3.5 6L21 5l-2 11H5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="19" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  2: {
    bg: 'bg-slate-300/20',
    text: 'text-slate-300',
    glow: 'shadow-[0_0_10px_rgba(203,213,225,0.25)]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="19" width="6" height="2" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  3: {
    bg: 'bg-orange-400/20',
    text: 'text-orange-400',
    glow: 'shadow-[0_0_8px_rgba(251,146,60,0.2)]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 8h6M9 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 17l2 2 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  4: {
    bg: 'bg-blue-400/20',
    text: 'text-blue-400',
    glow: 'shadow-[0_0_6px_rgba(96,165,250,0.2)]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  5: {
    bg: 'bg-emerald-400/20',
    text: 'text-emerald-400',
    glow: '',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
}

interface RankBadgeProps {
  rank: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
}

export default function RankBadge({ rank, size = 'md', showNumber = true }: RankBadgeProps) {
  const style = rankStyles[rank]

  const sizeClasses = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
  }

  if (!style) {
    return (
      <span className={`inline-flex items-center justify-center rounded-full bg-slate-700/50 text-slate-400 font-bold ${sizeClasses[size]}`}>
        {rank}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold ${style.bg} ${style.text} ${style.glow} ${sizeClasses[size]}`}
      title={`排名第 ${rank}`}
    >
      {style.icon}
      {showNumber && <span className="ml-0.5">{rank}</span>}
    </span>
  )
}
