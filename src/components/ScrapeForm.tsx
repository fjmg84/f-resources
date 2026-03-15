'use client'

import { useState } from 'react'
import type { Category } from '@/lib/types'
import { useToast } from '@/components/Toast'

interface Props {
  categories: Category[]
}

export default function ScrapeForm({ categories }: Props) {
  const { showToast } = useToast()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const addCategory = (name: string) => {
    if (name === '-1' || selectedCategories.includes(name)) return
    setSelectedCategories((prev) => [...prev, name])
  }

  const removeCategory = (name: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== name))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, categories: selectedCategories }),
      })
      const data = await res.json()

      if (data.error) {
        showToast(data.message, 'error')
      } else {
        showToast(data.message, 'success')
        setUrl('')
        setSelectedCategories([])
      }
    } catch {
      showToast('Unexpected error. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 w-full max-w-xl">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-purple-900/50 rounded-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-zinc-100">Add Resource</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            required
            className="bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Category selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Categories</label>
          <select
            onChange={(e) => {
              addCategory(e.target.value)
              e.target.value = '-1'
            }}
            defaultValue="-1"
            className="bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-purple-500/70 transition-all"
          >
            <option value="-1">Select a category…</option>
            {categories.map(({ name }) => (
              <option key={name} value={name} className="capitalize bg-zinc-800">
                {name}
              </option>
            ))}
          </select>

          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedCategories.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-1.5 bg-purple-900/40 border border-purple-700/40 text-purple-300 text-xs rounded-full px-3 py-1"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() => removeCategory(name)}
                    className="hover:text-white transition-colors ml-0.5"
                    aria-label={`Remove ${name}`}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !url}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all mt-1"
        >
          {loading ? (
            <>
              <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Add Resource
            </>
          )}
        </button>
      </form>
    </div>
  )
}
