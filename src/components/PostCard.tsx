'use client'

import { useState } from 'react'
import type { Post } from '@/lib/types'

interface Props {
  post: Post
  onCategoryClick: (category: string) => void
}

export default function PostCard({ post, onCategoryClick }: Props) {
  const { title, image, description, link, categories } = post
  const [imgError, setImgError] = useState(false)

  return (
    <li className="group relative flex flex-col bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden bg-zinc-800 shrink-0">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 flex-1">{description}</p>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 rounded-full px-4 py-2 transition-all self-start"
        >
          <span className="truncate max-w-[180px]">{title}</span>
          <svg className="shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z" />
          </svg>
        </a>

        {/* Category tags */}
        <ul className="flex flex-wrap gap-1.5">
          {categories.map(({ name }) => (
            <li key={name}>
              <button
                onClick={() => onCategoryClick(name)}
                className="capitalize text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60 rounded-full px-3 py-1 transition-all"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
