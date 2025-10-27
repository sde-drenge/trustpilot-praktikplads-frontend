import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='flex items-center justify-between p-8 bg-primary border-b-amber-400 border-2 '>  
     <div>Logo</div>
     <Link href="/">Links</Link>
     <div>Actions</div>
    </header>
  )
}
