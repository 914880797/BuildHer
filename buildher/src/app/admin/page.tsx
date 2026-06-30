import type { Metadata } from 'next'
import AdminLogin from '@/components/admin/AdminLogin'

export const metadata: Metadata = {
  title: '管理员登录 - BuildHer',
  robots: 'noindex',
}

export default function AdminPage() {
  return <AdminLogin />
}
