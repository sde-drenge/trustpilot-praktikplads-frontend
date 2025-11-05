import { users } from '@/lib/users'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const backendLoginUrl = process.env.BACKEND_LOGIN_URL

        if (backendLoginUrl && credentials?.email && credentials?.password) {
          try {
            const resp = await fetch(backendLoginUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            })

            if (!resp.ok) return null

            let data: unknown = null
            try {
              data = await resp.json()
            } catch {
              data = null
            }

            const safe: Record<string, unknown> =
              data && typeof data === 'object' ? (data as Record<string, unknown>) : {}
            const nestedUser =
              typeof safe.user === 'object' && safe.user !== null
                ? (safe.user as Record<string, unknown>)
                : undefined
            const id = String(
              (safe.id as string | number | undefined) ??
                (nestedUser?.id as string | number | undefined) ??
                credentials.email,
            )
            const email = String(
              (safe.email as string | undefined) ??
                (nestedUser?.email as string | undefined) ??
                credentials.email,
            )
            const name = String(
              (safe.name as string | undefined) ?? (nestedUser?.name as string | undefined) ?? '',
            )
            return { id, email, name }
          } catch {}
        }

        const user = users.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password,
        )
        if (user) {
          return { id: user.id, email: user.email, name: user.name }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/log-ind',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }
