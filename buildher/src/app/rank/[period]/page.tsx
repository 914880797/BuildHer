import type { Metadata } from 'next'
import RankTable from '@/components/RankTable'

interface RankPageProps {
  params: { period: string }
}

export function generateStaticParams() {
  return [
    { period: '2026-q3' },
    { period: '2026-q2' },
    { period: '2026-q1' },
  ]
}

const periodNames: Record<string, string> = {
  '2026-q3': '2026 年第三季度',
  '2026-q2': '2026 年第二季度',
  '2026-q1': '2026 年第一季度',
}

export function generateMetadata({ params }: RankPageProps): Metadata {
  const name = periodNames[params.period] || params.period
  return {
    title: `${name}榜单 - BuildHer`,
    description: `BuildHer ${name} Web3 女性 Builder 榜单，涵盖 Founder、Builder、KOL、Investor 四大赛道。`,
  }
}

export default function RankPage({ params }: RankPageProps) {
  const periodName = periodNames[params.period] || params.period

  return (
    <section className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="section-title">
            {periodName} 榜单
          </h1>
          <p className="section-subtitle">
            华语 Web3 女性 Builder 综合实力排名，数据基于链上活跃度、项目影响力、社区贡献等维度综合评估。
          </p>
        </div>

        <RankTable />
      </div>
    </section>
  )
}
