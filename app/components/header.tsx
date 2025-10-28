import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export default function Header() {
  return (
    <header className='flex items-center justify-between p-2.75 bg-gray-950 text-white '>  

      <div className="pl-36 gap-2 pb-1.5 cursor-pointer">
        <span className="text-4xl font-bold text-[#00B67A]">★</span>
        <span className="text-2xl font-semibold text-white">Trustpilot</span>
      </div>

     <nav className="flex gap-8 font-medium items-center pr-34">
     <Link href="/">Skriv en anmeldelse</Link>
     <Link href="/">Kategorier</Link>
     <Link href="/">Blog</Link>
     <Link href="/notifications" className="">
     <Bell size={24} />
     </Link>
     <Link href="/">Log ind</Link>
     <Button className="bg-[#799dfa] hover:bg-[#9ab4ff] text-black px-4 py-6 rounded-full">
      For virksomheder
     </Button>
      </nav>
     
     
   
    </header>
  )
}
