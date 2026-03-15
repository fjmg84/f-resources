'use client'

import { useState } from 'react'
import type { Post, Category } from '@/lib/types'
import { FILTER_ALL_POSTS } from '@/lib/constants'
import PostCard from './PostCard'
import ScrapeForm from './ScrapeForm'

interface Props {
  initialPosts: Post[]
  categories: Category[]
  counterPost: number
  initialHasNextPage: boolean
  initialPageSize: number
  isLoggedIn: boolean
}

function SkeletonCard() {
  return (
    <li className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="w-full h-48 skeleton-pulse" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 skeleton-pulse rounded-full w-full" />
        <div className="h-3 skeleton-pulse rounded-full w-4/5" />
        <div className="h-3 skeleton-pulse rounded-full w-2/3" />
        <div className="h-8 skeleton-pulse rounded-full w-32 mt-2" />
      </div>
    </li>
  )
}

export default function ResourcesClient({
  initialPosts,
  categories,
  counterPost,
  initialHasNextPage,
  initialPageSize,
  isLoggedIn,
}: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [selectedCategory, setSelectedCategory] = useState(FILTER_ALL_POSTS)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [loading, setLoading] = useState(false)

  const fetchPosts = async (category: string, page: number) => {
    const params = new URLSearchParams({
      category: category === FILTER_ALL_POSTS ? '' : category,
      page: String(page),
    })
    const res = await fetch(`/api/posts?${params}`)
    return res.json()
  }

  const filterByCategory = async (category: string) => {
    if (category === selectedCategory || loading) return
    setLoading(true)
    try {
      const data = await fetchPosts(category, 10)
      if (!data.error) {
        setPosts(data.posts)
        setPageSize(10)
        setSelectedCategory(category)
        setHasNextPage(data.infoPage?.hasNextPage ?? false)
      }
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    const newPage = pageSize + 10
    setLoading(true)
    try {
      const data = await fetchPosts(selectedCategory, newPage)
      if (!data.error) {
        setPosts(data.posts)
        setPageSize(newPage)
        setHasNextPage(data.infoPage?.hasNextPage ?? false)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Add resource form — only for authenticated users */}
      {isLoggedIn && <ScrapeForm categories={categories} />}

      {/* Category filter bar */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => filterByCategory(FILTER_ALL_POSTS)}
          className={`capitalize flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all text-nowrap border
            ${selectedCategory === FILTER_ALL_POSTS
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/20'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border-zinc-700'
            }`}
        >
          <span className="ml-1">{FILTER_ALL_POSTS}</span>
          <span className="bg-zinc-700/80 text-xs font-bold text-zinc-300 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
            {counterPost >= 100 ? '+99' : counterPost}
          </span>
        </button>

        {categories.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => filterByCategory(name)}
            className={`capitalize flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all text-nowrap border
              ${selectedCategory === name
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border-zinc-700'
              }`}
          >
            <span className="ml-1">{name}</span>
            <span className="bg-zinc-700/80 text-xs font-bold text-zinc-300 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
              {count && count >= 100 ? '+99' : count}
            </span>
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {loading ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </ul>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <p className="text-zinc-300 text-lg font-medium">No resources found</p>
          <p className="text-zinc-600 text-sm">Nothing in this category yet. Try another one.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <PostCard key={post.id ?? i} post={post} onCategoryClick={filterByCategory} />
          ))}
        </ul>
      )}

      {/* Load more */}
      {hasNextPage && !loading && (
        <div className="flex justify-center pt-2 pb-6">
          <button
            onClick={loadMore}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-full px-6 py-2.5 text-sm font-medium transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
