import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center justify-between gap-5 flex-wrap">
        {/* Logo */}
        <Link href="/" className="flex items-end gap-1 flex-wrap group">
          <span className="text-2xl font-extrabold tracking-tight text-zinc-100">f-</span>
          <span className="text-2xl font-extrabold tracking-tight from-purple-500 via-pink-500 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
            resources
          </span>
          <span className="text-xs font-light text-zinc-600 mb-0.5 ml-0.5">(fjmg)</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href="https://github.com/fjmg84/f-resources"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-full px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.38 8.53c.16-.4.68-1.99-.17-4.14 0 0-1.31-.39-4.3 1.61-1.25-.33-2.58-.38-3.91-.38-1.32 0-2.66.05-3.91.38-2.99-2.03-4.3-1.61-4.3-1.61-.85 2.15-.33 3.74-.16 4.14C2.61 9.62 2 11 2 12.72c0 6.44 4.16 7.89 10 7.89 5.79 0 10-1.45 10-7.89 0-1.72-.61-3.1-1.62-4.19M12 19.38c-4.12 0-7.47-.19-7.47-4.19 0-.95.47-1.85 1.27-2.58 1.34-1.23 3.63-.58 6.2-.58 2.59 0 4.85-.65 6.2.58.8.73 1.3 1.62 1.3 2.58 0 3.99-3.37 4.19-7.5 4.19m-3.14-6.26c-.82 0-1.5 1-1.5 2.22 0 1.23.68 2.24 1.5 2.24.83 0 1.5-1 1.5-2.24 0-1.23-.67-2.22-1.5-2.22m6.28 0c-.83 0-1.5.99-1.5 2.22 0 1.24.67 2.24 1.5 2.24.82 0 1.5-1 1.5-2.24 0-1.23-.64-2.22-1.5-2.22z" />
            </svg>
            Source
          </a>

          {session?.user ? (
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-full px-3 py-2 text-sm text-zinc-300 transition-all"
              >
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt="avatar"
                    width={22}
                    height={22}
                    className="rounded-full"
                  />
                )}
                <span className="max-w-[110px] truncate">{session.user.name}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500 shrink-0">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </form>
          ) : (
            <form
              action={async () => {
                'use server'
                await signIn('google')
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-900 rounded-full px-4 py-2 text-sm font-medium transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}
