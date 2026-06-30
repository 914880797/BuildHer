'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Stat {
  label: string
  value: number
  color: string
}

export default function StatsCards() {
  const [stats, setStats] = useState<Stat[]>([
    { label: '总 Builder 数', value: 0, color: 'text-coral' },
    { label: '待审核提名', value: 0, color: 'text-amber-400' },
    { label: '已通过提名', value: 0, color: 'text-emerald-400' },
    { label: '已驳回提名', value: 0, color: 'text-red-400' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [{ count: builderCount }, { count: pendingCount }, { count: approvedCount }, { count: rejectedCount }] =
          await Promise.all([
            supabase.from('builders').select('*', { count: 'exact', head: true }),
            supabase.from('nominations').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
            supabase.from('nominations').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
            supabase.from('nominations').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
          ])

        setStats([
          { label: '总 Builder 数', value: builderCount ?? 0, color: 'text-coral' },
          { label: '待审核提名', value: pendingCount ?? 0, color: 'text-amber-400' },
          { label: '已通过提名', value: approvedCount ?? 0, color: 'text-emerald-400' },
          { label: '已驳回提名', value: rejectedCount ?? 0, color: 'text-red-400' },
        ])
      } catch (e) {
        console.error('Failed to load stats:', e)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="card text-center">
          <div className={`text-2xl font-black ${stat.color}`}>
            {loading ? '-' : stat.value}
          </div>
          <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
