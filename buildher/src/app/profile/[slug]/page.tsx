import type { Metadata } from 'next'
import Link from 'next/link'
import { getBuilderBySlug, getBuilders } from '@/lib/data'
import { notFound } from 'next/navigation'
import GalleryCarousel from '@/components/GalleryCarousel'
import RankBadge from '@/components/RankBadge'

interface ProfilePageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getBuilders().map((b) => ({ slug: b.slug }))
}

export function generateMetadata({ params }: ProfilePageProps): Metadata {
  const builder = getBuilderBySlug(params.slug)
  if (!builder) return { title: '未找到 - BuildHer' }
  return {
    title: `${builder.name} - BuildHer`,
    description: `${builder.name}，${builder.track}，${builder.region} — ${builder.bio}`,
  }
}

const trackLabels: Record<string, { label: string; color: string }> = {
  Founder:  { label: 'Founder',  color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  Builder:  { label: 'Builder',  color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  KOL:      { label: 'KOL',      color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  Investor: { label: 'Investor', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const builder = getBuilderBySlug(params.slug)
  if (!builder) notFound()

  const trackInfo = trackLabels[builder.track]

  return (
    <section className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/rank/2026-q3"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-coral transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回榜单
        </Link>

        <div className="card mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <img
              src={builder.avatar_url}
              alt={builder.name}
              className="flex-shrink-0 w-24 h-24 rounded-2xl object-cover ring-2 ring-coral/30"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {builder.name}
                </h1>
                {trackInfo && (
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${trackInfo.color}`}>
                    {trackInfo.label}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{builder.bio}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {builder.region}
                </div>
                <div className="flex items-center gap-4">
                  {builder.twitter && (
                    <a
                      href={`https://x.com/${builder.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-coral transition-colors"
                    >
                      X: {builder.twitter}
                    </a>
                  )}
                  {builder.xiaohongshu && (
                    <span className="text-slate-500">
                      小红书: {builder.xiaohongshu}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-black text-coral">{builder.score}</div>
            <div className="text-xs text-slate-500 mt-1">综合评分</div>
          </div>
          <div className="card text-center flex flex-col items-center justify-center gap-2">
            <RankBadge rank={builder.rank} size="lg" showNumber />
            <span className="text-xs text-slate-500">本期排名</span>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-black text-coral">{builder.projects.length}</div>
            <div className="text-xs text-slate-500 mt-1">代表项目</div>
          </div>
        </div>

        <GalleryCarousel images={builder.gallery} name={builder.name} />

        <div className="card mb-8">
          <h2 className="text-lg font-bold text-white mb-4">代表项目</h2>
          {builder.projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {builder.projects.map((project) => (
                <div
                  key={project}
                  className="px-4 py-3 rounded-lg bg-slate-800/40 border border-slate-700/30 text-sm text-slate-300"
                >
                  {project}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">暂无项目信息</p>
          )}
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-white mb-4">个人介绍</h2>
          <p className="text-sm text-slate-400 leading-relaxed">{builder.bio}</p>
        </div>
      </div>
    </section>
  )
}
