import Link from 'next/link'
import type { Builder } from '@/lib/types'

const trackColors: Record<string, string> = {
  Founder: 'bg-purple-500/20 text-purple-400',
  Builder: 'bg-blue-500/20 text-blue-400',
  KOL: 'bg-green-500/20 text-green-400',
  Investor: 'bg-amber-500/20 text-amber-400',
}

export default function BuilderCard({ builder }: { builder: Builder }) {
  return (
    <Link
      href={`/profile/${builder.slug}`}
      className="card group hover:border-coral/30 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <img
          src={builder.avatar_url}
          alt={builder.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-coral/20 flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-white group-hover:text-coral transition-colors">
              {builder.name}
            </h3>
            <span className={`tag text-[10px] ${trackColors[builder.track] || ''}`}>
              {builder.track}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">{builder.region}</p>
          <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {builder.bio}
          </p>
          {builder.projects.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {builder.projects.slice(0, 2).map((project) => (
                <span
                  key={project}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400"
                >
                  {project}
                </span>
              ))}
              {builder.projects.length > 2 && (
                <span className="text-[10px] text-slate-500">+{builder.projects.length - 2}</span>
              )}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="text-lg font-bold text-coral">{builder.score}</div>
          <div className="text-[10px] text-slate-500">分</div>
        </div>
      </div>
    </Link>
  )
}
