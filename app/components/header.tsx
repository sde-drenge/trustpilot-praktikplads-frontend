import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-primary text-white'>  
      <div className='flex items-center gap-6 px-6 py-2.75'>
        <div className="min-w-24 flex items-center gap-2 cursor-pointer">
          <span className="text-3xl font-bold text-accent">★</span>
          <span className="text-3xl font-semibold">TP</span>
        </div>

        <nav className="flex gap-6 font-medium items-center ml-auto">
          <Link href="/" className="hover:text-accent transition">Skriv en anmeldelse</Link>
          <Link href="/" className="hover:text-accent transition">Kategorier</Link>
          <Link href="/notifications" className="hover:text-accent transition">
            <Bell size={24} />
          </Link>
          <Link href="/" className="hover:text-accent transition">Log ind</Link>
          <Button className="bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-full">
            For virksomheder
          </Button>
        </nav>
      </div>
    </header>
  )
}
