declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
  interface User {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
