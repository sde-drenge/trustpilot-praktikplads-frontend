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
