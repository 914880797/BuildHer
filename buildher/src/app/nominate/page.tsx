import type { Metadata } from 'next'
import NominateForm from '@/components/NominateForm'

export const metadata: Metadata = {
  title: '提名 Builder - BuildHer',
  description: '提名你认识的 Web3 女性 Builder，帮助更多优秀的她被看见。',
}

export default function NominatePage() {
  return (
    <section className="pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="section-title">提名 Builder</h1>
          <p className="section-subtitle">
            发现身边优秀的 Web3 女性建设者？填写下方表单，让她被更多人看见。
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-slate-500">
              我们只做正向数据展示，不做黑料，不做擦边。所有提名都会经过人工审核。
            </span>
          </div>
        </div>

        <NominateForm />
      </div>
    </section>
  )
}
