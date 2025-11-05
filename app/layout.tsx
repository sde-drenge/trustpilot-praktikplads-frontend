'use client'

import { SessionProvider } from 'next-auth/react'
import { Geist, Geist_Mono } from 'next/font/google'

import { Toaster } from '../components/ui/sonner'
import Header from './components/header'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}>
        <SessionProvider>
          <Header />
          <Toaster position="top-right" richColors theme="light" />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
