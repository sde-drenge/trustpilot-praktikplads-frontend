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
        try {
          // Her implementerer du din egen login-logik
          // Dette er kun et eksempel - erstat med din egen API/database-kald
          if (credentials?.email === 'test@test.dk' && credentials?.password === 'Arn52bvk!') {
            return {
              id: '1',
              email: credentials.email,
              name: 'Test Bruger',
            }
          }
          return null
        } catch (error) {
          return null
        }
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
