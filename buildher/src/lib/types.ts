export type Track = 'Founder' | 'Builder' | 'KOL' | 'Investor'

export type Region = '中国大陆' | '中国香港' | '中国台湾' | '新加坡' | '北美' | '欧洲' | '日本' | '韩国' | '其他'

export interface Builder {
  id: string
  name: string
  slug: string
  avatar_url: string
  track: Track
  region: Region
  bio: string
  twitter: string
  xiaohongshu: string
  projects: string[]
  gallery: string[]
  score: number
  rank: number
}

export interface Nomination {
  id?: string
  name: string
  track: Track
  region: Region
  bio: string
  reason: string
  twitter: string
  xiaohongshu: string
  projects: string
  avatar_url: string
  gallery_urls: string[]
  status: 'pending' | 'approved' | 'rejected'
  created_at?: string
}
