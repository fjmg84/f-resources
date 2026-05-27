import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.SECRET_ID

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  basePath: '/api/auth',
  providers: [
    Google({
      clientId,
      clientSecret,
    }),
  ],
})
