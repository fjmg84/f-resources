import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { ToastProvider } from '@/components/Toast'

export const metadata: Metadata = {
  title: 'f-resources',
  description: 'A curated collection of dev resources by fjmg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-zinc-100 min-h-screen antialiased">
        <ToastProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-5 lg:px-10 py-10 flex flex-col gap-10">
            {children}
          </main>
          <footer className="border-t border-zinc-900 mt-10">
            <div className="max-w-7xl mx-auto px-5 lg:px-10 py-8 flex items-center justify-center">
              <a
                href="https://portafolio-fjmg84.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                developed and designed by{' '}
                <span className="font-semibold text-zinc-400">fjmg84</span>
              </a>
            </div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  )
}
