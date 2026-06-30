'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } = await signIn(email, password)
    if (signInError) {
      setError('登录失败，请检查邮箱和密码。')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-coral tracking-tight">BuildHer</h1>
          <p className="text-sm text-slate-500 mt-2">管理员登录</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@buildher.xyz"
              className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-coral/50 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="输入密码"
              className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-coral/50 transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-sm disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-6">
          使用 Supabase 认证账户登录
        </p>
      </div>
    </div>
  )
}
