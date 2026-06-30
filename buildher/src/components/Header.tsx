'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black text-coral tracking-tight">
              BuildHer
            </span>
            <span className="text-lg text-slate-500 font-medium hidden sm:inline">
              筑她
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/rank/2026-q3"
              className="text-sm text-slate-300 hover:text-coral transition-colors font-medium"
            >
              榜单
            </Link>
            <Link
              href="/methodology"
              className="text-sm text-slate-300 hover:text-coral transition-colors font-medium"
            >
              方法论
            </Link>
            <Link
              href="/nominate"
              className="btn-primary text-sm py-2 px-5"
            >
              提名 Builder
            </Link>
            <Link
              href="/admin"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              title="管理后台"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </nav>

          <button
            className="md:hidden text-slate-300 hover:text-coral transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-primary border-t border-slate-800">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/rank/2026-q3"
              className="block text-sm text-slate-300 hover:text-coral transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              榜单
            </Link>
            <Link
              href="/methodology"
              className="block text-sm text-slate-300 hover:text-coral transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              方法论
            </Link>
            <Link
              href="/nominate"
              className="block btn-primary text-sm text-center py-2"
              onClick={() => setMenuOpen(false)}
            >
              提名 Builder
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
