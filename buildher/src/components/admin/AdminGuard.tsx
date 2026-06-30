'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, getSession, onAuthChange } from '@/lib/auth'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const check = async () => {
      const session = await getSession()
      if (session) {
        setAuthed(true)
      } else {
        router.push('/admin')
      }
      setChecking(false)
    }
    check()

    const sub = onAuthChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/admin')
      }
    })

    return () => {
      sub?.unsubscribe()
    }
  }, [router])

  function handleSignOut() {
    signOut().then(() => router.push('/admin'))
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-coral border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!authed) return null

  return (
    <div className="min-h-screen bg-primary">
      <header className="sticky top-0 z-40 bg-primary/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <span className="text-lg font-black text-coral tracking-tight">BuildHer</span>
            <span className="text-xs px-2 py-0.5 rounded bg-coral/10 text-coral font-medium">Admin</span>
          </div>
          <button
            onClick={handleSignOut}
            className="text-xs text-slate-400 hover:text-coral transition-colors"
          >
            退出登录
          </button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
