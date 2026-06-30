import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-8xl font-black text-coral/20 mb-6">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">页面未找到</h1>
        <p className="text-slate-400 mb-8">
          你要找的页面不存在，或者已被移除。
        </p>
        <Link href="/" className="btn-primary">
          返回首页
        </Link>
      </div>
    </section>
  )
}
