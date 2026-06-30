'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Builder } from '@/lib/types'

const trackOptions = ['Founder', 'Builder', 'KOL', 'Investor']
const regionOptions = ['中国大陆', '中国香港', '中国台湾', '新加坡', '北美', '欧洲', '日本', '韩国', '其他']

export default function BuilderManager() {
  const [builders, setBuilders] = useState<Builder[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Builder | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')

  const emptyForm: Partial<Builder> = {
    name: '',
    track: 'Founder',
    region: '中国大陆',
    bio: '',
    twitter: '',
    xiaohongshu: '',
    projects: [],
    avatar_url: '',
    gallery: [],
    score: 0,
    rank: 0,
  }
  const [form, setForm] = useState<Partial<Builder>>(emptyForm)

  useEffect(() => {
    loadBuilders()
  }, [])

  async function loadBuilders() {
    setLoading(true)
    const { data } = await supabase.from('builders').select('*').order('rank', { ascending: true })
    if (data) setBuilders(data)
    setLoading(false)
  }

  function openNew() {
    setForm({ ...emptyForm, rank: builders.length + 1 })
    setEditing(null)
    setShowForm(true)
  }

  function openEdit(b: Builder) {
    setForm({ ...b })
    setEditing(b)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setForm(emptyForm)
    setEditing(null)
  }

  async function handleSave() {
    if (!form.name || !form.track) return
    setMessage('')

    const slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '') || `builder-${Date.now()}`

    const builderData = {
      name: form.name!,
      slug: editing?.slug || slug,
      track: form.track!,
      region: form.region!,
      bio: form.bio || '',
      twitter: form.twitter || '',
      xiaohongshu: form.xiaohongshu || '',
      projects: form.projects || [],
      avatar_url: form.avatar_url || '',
      gallery: form.gallery || [],
      score: form.score || 0,
      rank: form.rank || 0,
    }

    if (editing) {
      const { error } = await supabase.from('builders').update(builderData).eq('id', editing.id)
      if (error) { setMessage('更新失败: ' + error.message); return }
      setMessage('已更新')
    } else {
      const { error } = await supabase.from('builders').insert(builderData)
      if (error) { setMessage('创建失败: ' + error.message); return }
      setMessage('已创建')
    }

    await loadBuilders()
    closeForm()
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`确定删除 ${name}？此操作不可撤销。`)) return
    const { error } = await supabase.from('builders').delete().eq('id', id)
    if (error) { setMessage('删除失败: ' + error.message); return }
    await loadBuilders()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Builder 管理</h2>
        <button onClick={openNew} className="btn-primary text-xs py-2 px-4">
          + 新建 Builder
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-lg bg-coral/10 border border-coral/20 text-xs text-coral">{message}</div>
      )}

      {showForm && (
        <div className="card mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              {editing ? `编辑: ${editing.name}` : '新建 Builder'}
            </h3>
            <button onClick={closeForm} className="text-xs text-slate-400 hover:text-white">关闭</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">姓名 *</label>
              <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">赛道 *</label>
              <select value={form.track || ''} onChange={(e) => setForm({ ...form, track: e.target.value as Builder['track'] })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none">
                {trackOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">地区 *</label>
              <select value={form.region || ''} onChange={(e) => setForm({ ...form, region: e.target.value as Builder['region'] })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none">
                {regionOptions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">排名</label>
              <input type="number" value={form.rank || 0} onChange={(e) => setForm({ ...form, rank: +e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">评分</label>
              <input type="number" step="0.1" value={form.score || 0} onChange={(e) => setForm({ ...form, score: +e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Twitter</label>
              <input value={form.twitter || ''} onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">小红书</label>
              <input value={form.xiaohongshu || ''} onChange={(e) => setForm({ ...form, xiaohongshu: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">头像 URL</label>
            <input value={form.avatar_url || ''} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none" />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">简介</label>
            <textarea rows={2} value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none resize-none" />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">代表项目（逗号分隔）</label>
            <input
              value={(form.projects || []).join(', ')}
              onChange={(e) => setForm({ ...form, projects: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none"
              placeholder="Project A, Project B"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">滚动图 URL（逗号分隔，最多 3 张）</label>
            <input
              value={(form.gallery || []).join(', ')}
              onChange={(e) => setForm({ ...form, gallery: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:border-coral/50 focus:outline-none"
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="btn-primary text-xs py-2 px-6">
              {editing ? '保存更新' : '创建'}
            </button>
            <button onClick={closeForm} className="text-xs text-slate-400 hover:text-white py-2 px-4">
              取消
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">加载中...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="py-3 px-3 text-xs text-slate-500 font-medium w-12">#</th>
                <th className="py-3 px-3 text-xs text-slate-500 font-medium">姓名</th>
                <th className="py-3 px-3 text-xs text-slate-500 font-medium hidden sm:table-cell">赛道</th>
                <th className="py-3 px-3 text-xs text-slate-500 font-medium hidden md:table-cell">地区</th>
                <th className="py-3 px-3 text-xs text-slate-500 font-medium">评分</th>
                <th className="py-3 px-3 text-xs text-slate-500 font-medium w-24">操作</th>
              </tr>
            </thead>
            <tbody>
              {builders.map((b) => (
                <tr key={b.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                  <td className="py-3 px-3 text-slate-500">{b.rank}</td>
                  <td className="py-3 px-3 text-white font-medium">{b.name}</td>
                  <td className="py-3 px-3 text-slate-400 hidden sm:table-cell">{b.track}</td>
                  <td className="py-3 px-3 text-slate-500 hidden md:table-cell">{b.region}</td>
                  <td className="py-3 px-3 text-coral font-semibold">{b.score}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(b)} className="text-xs text-blue-400 hover:text-blue-300">编辑</button>
                      <button onClick={() => handleDelete(b.id, b.name)} className="text-xs text-red-400 hover:text-red-300">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
