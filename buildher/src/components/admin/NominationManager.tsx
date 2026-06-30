'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Nomination } from '@/lib/types'

export default function NominationManager() {
  const [nominations, setNominations] = useState<Nomination[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadNominations()
  }, [activeTab])

  async function loadNominations() {
    setLoading(true)
    const { data } = await supabase
      .from('nominations')
      .select('*')
      .eq('status', activeTab)
      .order('created_at', { ascending: false })

    if (data) setNominations(data)
    setLoading(false)
  }

  async function handleApprove(id: string) {
    const { error } = await supabase.from('nominations').update({ status: 'approved' }).eq('id', id)
    if (error) { setMessage('操作失败'); return }
    setMessage('已通过')
    setNominations((prev) => prev.filter((n) => n.id !== id))
  }

  async function handleReject(id: string) {
    const { error } = await supabase.from('nominations').update({ status: 'rejected' }).eq('id', id)
    if (error) { setMessage('操作失败'); return }
    setMessage('已驳回')
    setNominations((prev) => prev.filter((n) => n.id !== id))
  }

  const tabs = [
    { key: 'pending' as const, label: '待审核' },
    { key: 'approved' as const, label: '已通过' },
    { key: 'rejected' as const, label: '已驳回' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">提名审核</h2>
        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-coral text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-lg bg-coral/10 border border-coral/20 text-xs text-coral">{message}</div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">加载中...</div>
      ) : nominations.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          暂无{activeTab === 'pending' ? '待审核' : activeTab === 'approved' ? '已通过' : '已驳回'}的提名
        </div>
      ) : (
        <div className="space-y-4">
          {nominations.map((n) => (
            <div key={n.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{n.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">{n.track}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{n.region}</p>
                </div>
                {activeTab === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(n.id!)}
                      className="text-xs px-3 py-1.5 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                    >
                      通过
                    </button>
                    <button
                      onClick={() => handleReject(n.id!)}
                      className="text-xs px-3 py-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      驳回
                    </button>
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-400 mb-3">{n.bio}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500">
                <div>
                  <span className="text-slate-600">提名理由：</span>
                  {n.reason}
                </div>
                {n.twitter && <div>X: {n.twitter}</div>}
                {n.xiaohongshu && <div>小红书: {n.xiaohongshu}</div>}
                {n.projects && <div>项目: {n.projects}</div>}
              </div>

              {n.avatar_url && (
                <div className="mt-3">
                  <img src={n.avatar_url} alt={n.name} className="w-12 h-12 rounded-lg object-cover" />
                </div>
              )}

              {n.gallery_urls && n.gallery_urls.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {n.gallery_urls.map((url, i) => (
                    <img key={i} src={url} alt={`${n.name} ${i + 1}`} className="w-20 h-14 rounded object-cover" />
                  ))}
                </div>
              )}

              {n.created_at && (
                <div className="mt-3 text-[10px] text-slate-600">
                  {new Date(n.created_at).toLocaleString('zh-CN')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
