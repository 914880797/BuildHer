'use client'

import { useState } from 'react'
import AdminGuard from '@/components/admin/AdminGuard'
import StatsCards from '@/components/admin/StatsCards'
import BuilderManager from '@/components/admin/BuilderManager'
import NominationManager from '@/components/admin/NominationManager'

export default function DashboardPage() {
  const [tab, setTab] = useState<'builders' | 'nominations'>('builders')

  return (
    <AdminGuard>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-xl font-bold text-white mb-2">管理面板</h1>
        <p className="text-sm text-slate-500 mb-6">管理 Builder 数据与审核提名</p>

        <StatsCards />

        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1 mb-6 w-fit">
          <button
            onClick={() => setTab('builders')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === 'builders' ? 'bg-coral text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Builder 管理
          </button>
          <button
            onClick={() => setTab('nominations')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === 'nominations' ? 'bg-coral text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            提名审核
          </button>
        </div>

        {tab === 'builders' ? <BuilderManager /> : <NominationManager />}
      </div>
    </AdminGuard>
  )
}
