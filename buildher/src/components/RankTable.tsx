'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Builder } from '@/lib/types'
import { getBuildersByTrack, getTracks } from '@/lib/data'
import RankBadge from '@/components/RankBadge'

const trackColors: Record<string, string> = {
  Founder: 'bg-purple-500/20 text-purple-400',
  Builder: 'bg-blue-500/20 text-blue-400',
  KOL: 'bg-green-500/20 text-green-400',
  Investor: 'bg-amber-500/20 text-amber-400',
}

export default function RankTable() {
  const [activeTrack, setActiveTrack] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const tracks = getTracks()

  const filtered = getBuildersByTrack(activeTrack).filter((b) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      b.name.toLowerCase().includes(q) ||
      b.bio.toLowerCase().includes(q) ||
      b.region.toLowerCase().includes(q) ||
      b.track.toLowerCase().includes(q) ||
      b.projects.some((p) => p.toLowerCase().includes(q))
    )
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {tracks.map((track) => (
            <button
              key={track.value}
              onClick={() => setActiveTrack(track.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTrack === track.value
                  ? 'bg-coral text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {track.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="搜索名称、地区、项目..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-coral/50 transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="text-lg">没有找到匹配的 Builder</p>
          <p className="text-sm mt-2">尝试调整筛选条件或搜索关键词</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((builder) => (
            <RankRow key={builder.id} builder={builder} trackColors={trackColors} />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="mt-6 text-center text-sm text-slate-500">
          共 {filtered.length} 位 Builder
        </div>
      )}
    </div>
  )
}

function RankRow({ builder, trackColors }: { builder: Builder; trackColors: Record<string, string> }) {
  return (
    <Link
      href={`/profile/${builder.slug}`}
      className="flex items-center gap-3 sm:gap-4 p-4 rounded-xl bg-slate-800/20 border border-slate-800/50 hover:border-coral/30 transition-all duration-200 group"
    >
      <img
        src={builder.avatar_url}
        alt={builder.name}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-coral/20 flex-shrink-0"
      />
      <RankBadge rank={builder.rank} size="sm" showNumber={false} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-coral transition-colors truncate">
            {builder.name}
          </h3>
          <span className={`tag text-[10px] hidden sm:inline-flex ${trackColors[builder.track] || ''}`}>
            {builder.track}
          </span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{builder.bio}</p>
      </div>

      <div className="hidden sm:flex flex-wrap gap-1 max-w-[180px]">
        {builder.projects.slice(0, 2).map((p) => (
          <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 truncate max-w-[80px]">
            {p}
          </span>
        ))}
      </div>

      <div className="flex-shrink-0 text-center min-w-[44px]">
        <div className="text-sm font-bold text-coral">{builder.score}</div>
        <div className="text-[10px] text-slate-500">{builder.region}</div>
      </div>
    </Link>
  )
}
