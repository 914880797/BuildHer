'use client'

import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'

export default function NominateForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    const url = URL.createObjectURL(file)
    setAvatarPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
  }

  function handleGalleryChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    const newFiles = [...galleryFiles, ...files].slice(0, 3)
    setGalleryFiles(newFiles)
    galleryPreviews.forEach((url) => URL.revokeObjectURL(url))
    setGalleryPreviews(newFiles.map((f) => URL.createObjectURL(f)))
  }

  function removeGalleryImage(index: number) {
    const newFiles = galleryFiles.filter((_, i) => i !== index)
    setGalleryFiles(newFiles)
    URL.revokeObjectURL(galleryPreviews[index])
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index))
  }

  function removeAvatar() {
    setAvatarFile(null)
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview)
      setAvatarPreview('')
    }
  }

  async function uploadFile(file: File, path: string): Promise<string> {
    const { supabase } = await import('@/lib/supabase')
    const { data, error: uploadError } = await supabase.storage
      .from('nominations')
      .upload(path, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('nominations')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      let avatarUrl = ''
      const galleryUrls: string[] = []

      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop() || 'png'
        const path = `avatars/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
        avatarUrl = await uploadFile(avatarFile, path)
      }

      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const ext = file.name.split('.').pop() || 'png'
          const path = `gallery/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
          const url = await uploadFile(file, path)
          galleryUrls.push(url)
        }
      }

      const { supabase } = await import('@/lib/supabase')

      const { error: insertError } = await supabase.from('nominations').insert({
        name: formData.get('name') as string,
        track: formData.get('track') as string,
        region: formData.get('region') as string,
        bio: formData.get('bio') as string,
        reason: formData.get('reason') as string,
        twitter: formData.get('twitter') as string,
        xiaohongshu: formData.get('xiaohongshu') as string,
        projects: formData.get('projects') as string,
        avatar_url: avatarUrl,
        gallery_urls: galleryUrls,
        status: 'pending',
        created_at: new Date().toISOString(),
      })

      if (insertError) throw insertError

      setSubmitted(true)
      form.reset()
      setAvatarFile(null)
      setAvatarPreview('')
      setGalleryFiles([])
      setGalleryPreviews([])
    } catch (err) {
      console.error('Submission error:', err)
      setError(
        '提交失败。如果你的 Supabase 尚未配置、Storage 桶未创建或 RLS 策略未设置，这属于预期行为。'
      )
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="card text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-coral/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">提名已提交</h3>
        <p className="text-slate-400 text-sm">
          感谢你的提名！我们的团队将在 3-5 个工作日内审核。
        </p>
        <p className="text-slate-500 text-xs mt-4">
          想继续提名？点击下方按钮重新填写。
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-outline text-sm mt-4"
        >
          继续提名
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          姓名 <span className="text-coral">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="她叫什么名字？"
          className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-coral/50 transition-colors text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            赛道 <span className="text-coral">*</span>
          </label>
          <select
            name="track"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-coral/50 transition-colors text-sm appearance-none"
          >
            <option value="">选择赛道</option>
            <option value="Founder">Founder</option>
            <option value="Builder">Builder</option>
            <option value="KOL">KOL</option>
            <option value="Investor">Investor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            地区 <span className="text-coral">*</span>
          </label>
          <select
            name="region"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-coral/50 transition-colors text-sm appearance-none"
          >
            <option value="">选择地区</option>
            <option value="中国大陆">中国大陆</option>
            <option value="中国香港">中国香港</option>
            <option value="中国台湾">中国台湾</option>
            <option value="新加坡">新加坡</option>
            <option value="北美">北美</option>
            <option value="欧洲">欧洲</option>
            <option value="日本">日本</option>
            <option value="韩国">韩国</option>
            <option value="其他">其他</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          简介 <span className="text-coral">*</span>
        </label>
        <textarea
          name="bio"
          required
          rows={3}
          placeholder="简要介绍她的背景和成就"
          className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-coral/50 transition-colors text-sm resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          提名理由 <span className="text-coral">*</span>
        </label>
        <textarea
          name="reason"
          required
          rows={3}
          placeholder="为什么她值得上榜？"
          className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-coral/50 transition-colors text-sm resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            X (Twitter)
          </label>
          <input
            type="text"
            name="twitter"
            placeholder="@username"
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-coral/50 transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            小红书
          </label>
          <input
            type="text"
            name="xiaohongshu"
            placeholder="小红书账号 ID"
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-coral/50 transition-colors text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          代表项目
        </label>
        <input
          type="text"
          name="projects"
          placeholder="多个项目用逗号分隔"
          className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-coral/50 transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          头像上传
        </label>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
        {avatarPreview ? (
          <div className="relative inline-block">
            <img
              src={avatarPreview}
              alt="头像预览"
              className="w-24 h-24 rounded-2xl object-cover ring-2 ring-coral/30"
            />
            <button
              type="button"
              onClick={removeAvatar}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-coral text-xs flex items-center justify-center transition-colors"
            >
              x
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-600 hover:border-coral/50 text-slate-500 hover:text-coral transition-colors flex flex-col items-center justify-center gap-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-[10px]">头像</span>
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          项目滚动图 <span className="text-slate-500 font-normal">(最多 3 张)</span>
        </label>
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
          className="hidden"
        />
        <div className="flex flex-wrap gap-3">
          {galleryPreviews.map((preview, i) => (
            <div key={i} className="relative">
              <img
                src={preview}
                alt={`项目图 ${i + 1}`}
                className="w-32 h-20 rounded-lg object-cover ring-1 ring-slate-700"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-coral text-xs flex items-center justify-center transition-colors"
              >
                x
              </button>
            </div>
          ))}
          {galleryFiles.length < 3 && (
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="w-32 h-20 rounded-lg border-2 border-dashed border-slate-600 hover:border-coral/50 text-slate-500 hover:text-coral transition-colors flex flex-col items-center justify-center gap-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-[10px]">添加图片</span>
            </button>
          )}
        </div>
        {galleryFiles.length === 0 && (
          <p className="mt-2 text-xs text-slate-500">点击上传她的项目截图或代表性图片</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '提交中...' : '提交提名'}
      </button>
    </form>
  )
}
