'use client'

import { useState, useRef, useCallback } from 'react'

interface GalleryCarouselProps {
  images: string[]
  name: string
}

export default function GalleryCarousel({ images, name }: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement
    if (!child) return
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: 'smooth' })
    setActiveIndex(index)
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const scrollPos = el.scrollLeft + el.clientWidth / 2
    let closest = 0
    let minDist = Infinity
    Array.from(el.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })
    setActiveIndex(closest)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0))
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const prev = () => {
    const next = activeIndex > 0 ? activeIndex - 1 : images.length - 1
    scrollTo(next)
  }

  const next = () => {
    const next = activeIndex < images.length - 1 ? activeIndex + 1 : 0
    scrollTo(next)
  }

  if (!images || images.length === 0) return null

  return (
    <div className="card mb-8 overflow-hidden p-0">
      <div className="px-6 pt-6 pb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">项目展示</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="上一张"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="w-8 h-8 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="下一张"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full snap-center">
              <img
                src={src}
                alt={`${name} - 项目展示 ${i + 1}`}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                draggable="false"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-coral w-4'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`第 ${i + 1} 张`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
