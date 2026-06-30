import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-black text-coral tracking-tight">BuildHer</span>
              <span className="text-sm text-slate-500 font-medium">筑她</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              华语 Web3 女性建设者数据库与多维度榜单。
              <br />
              记录每一位正在改变 Web3 的她。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">导航</h3>
            <div className="space-y-2">
              <Link href="/rank/2026-q3" className="block text-sm text-slate-400 hover:text-coral transition-colors">
                榜单
              </Link>
              <Link href="/methodology" className="block text-sm text-slate-400 hover:text-coral transition-colors">
                方法论
              </Link>
              <Link href="/nominate" className="block text-sm text-slate-400 hover:text-coral transition-colors">
                提名 Builder
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">关于</h3>
            <div className="space-y-2">
              <a href="https://buildher.xyz" className="block text-sm text-slate-400 hover:text-coral transition-colors">
                buildher.xyz
              </a>
              <p className="text-sm text-slate-500">
                2026 BuildHer. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            Built with love for the Web3 community. 正向数据展示，不做黑料，不做擦边。
          </p>
        </div>
      </div>
    </footer>
  )
}
