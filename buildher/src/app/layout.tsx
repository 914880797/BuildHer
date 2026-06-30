import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'BuildHer (筑她) - Web3 女性 Builder 榜单',
  description: '华语 Web3 女性建设者数据库与多维度榜单。She builds Web3. We keep the record.',
  keywords: ['Web3', '女性', 'Builder', '榜单', 'Crypto', '区块链'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-primary text-white flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
