import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '方法论 - BuildHer',
  description: 'BuildHer 榜单评分算法说明：链上活跃度、项目影响力、社区贡献等多维度综合评估模型。',
}

export default function MethodologyPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="section-title">评分方法论</h1>
          <p className="section-subtitle">
            BuildHer 榜单采用多维度综合评估模型，确保排名的客观性与公信力。
          </p>
        </div>

        <div className="space-y-8">
          <MethodologyCard
            title="维度一：链上活跃度（35%）"
            items={[
              '合约部署数量与质量',
              '链上交易频率与规模',
              '协议交互复杂度',
              'Gas 消耗总量（反映真实使用）',
            ]}
          />
          <MethodologyCard
            title="维度二：项目影响力（30%）"
            items={[
              '项目 TVL / 市值 / 用户量',
              '行业认可度（融资、媒体报道、奖项）',
              '开源贡献（GitHub Star、PR 合并量）',
              '项目生命周期与持续运营能力',
            ]}
          />
          <MethodologyCard
            title="维度三：社区贡献（20%）"
            items={[
              '社交媒体影响力（X、小红书粉丝与互动）',
              '社区治理参与度（DAO 投票、提案）',
              '知识输出（博客、教程、演讲）',
              'Mentorship 与新人支持',
            ]}
          />
          <MethodologyCard
            title="维度四：创新与技术深度（15%）"
            items={[
              '技术原创性与创新性',
              '代码复杂度与安全性',
              '跨赛道/跨生态协作能力',
              '专利、学术论文等技术成果',
            ]}
          />
        </div>

        <div className="mt-12 card p-8">
          <h2 className="text-lg font-bold text-white mb-4">数据来源与更新频率</h2>
          <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
            <p>评分所需数据来自以下公开可验证来源：</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Ethereum/Solana 等主流公链的链上数据</li>
              <li>GitHub 代码仓库与 Pull Request 记录</li>
              <li>X (Twitter) 与小书书等社交平台公开数据</li>
              <li>主流加密媒体报道与行业数据库</li>
              <li>社区提名与专家评审反馈</li>
            </ul>
            <p className="mt-4">
              榜单按季度发布（Q1/Q2/Q3/Q4），每期上榜 50 人。数据在每季度末进行全量更新。
              评分算法会定期迭代优化，以确保评估模型与时俱进。
            </p>
          </div>
        </div>

        <div className="mt-8 card p-8 border-coral/10 bg-coral/5">
          <h2 className="text-lg font-bold text-coral mb-4">我们的原则</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-400 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center text-coral text-xs font-bold">1</span>
              <span>只做正向数据展示，不做黑料，不做擦边</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center text-coral text-xs font-bold">2</span>
              <span>数据来源公开可验证，拒绝主观臆断</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center text-coral text-xs font-bold">3</span>
              <span>多维度综合评估，避免单一指标偏差</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center text-coral text-xs font-bold">4</span>
              <span>算法公开透明，接受社区监督与反馈</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MethodologyCard({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div className="card">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-coral mt-1.5" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
