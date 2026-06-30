import Link from 'next/link'
import { getTopBuilders } from '@/lib/data'
import RankBadge from '@/components/RankBadge'

export default function Hero() {
  const topBuilders = getTopBuilders(5)

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-coral/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 border border-coral/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-xs font-medium text-coral">2026 Q3 榜单已发布</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            She builds{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-coral-light">
              Web3
            </span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-slate-400 font-light">
            We keep the record.
          </p>
          <p className="mt-6 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            华语 Web3 女性建设者数据库 —— 记录每一位正在改变加密世界的她。
            涵盖 Founder、Builder、KOL、Investor 四大赛道，多维度呈现女性力量。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/rank/2026-q3" className="btn-primary text-base px-8 py-4">
              查看完整榜单
            </Link>
            <Link href="/nominate" className="btn-outline text-base px-8 py-4">
              提名 Builder
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="section-subtitle text-center">本期 TOP 5</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {topBuilders.map((builder) => (
              <Link
                key={builder.id}
                href={`/profile/${builder.slug}`}
                className="card group hover:border-coral/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={builder.avatar_url}
                    alt={builder.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-coral/30 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-coral transition-colors">
                      {builder.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className={`tag text-[10px] ${
                        builder.track === 'Founder' ? 'bg-purple-500/20 text-purple-400' :
                        builder.track === 'Builder' ? 'bg-blue-500/20 text-blue-400' :
                        builder.track === 'KOL' ? 'bg-green-500/20 text-green-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {builder.track}
                      </span>
                      <RankBadge rank={builder.rank} size="sm" showNumber={false} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {builder.bio}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{builder.region}</span>
                  <span className="text-xs font-bold text-coral">{builder.score}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '500+', label: '收录 Builder' },
            { value: '50', label: '每期上榜' },
            { value: '4', label: '核心赛道' },
            { value: '15+', label: '覆盖地区' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-xl bg-slate-800/20 border border-slate-800/50">
              <div className="text-2xl md:text-3xl font-black text-coral">{stat.value}</div>
              <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
