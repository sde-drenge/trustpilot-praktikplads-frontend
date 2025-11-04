import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-primary fixed inset-x-0 top-0 z-50 border-b border-white/10 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-4">
       
        <Link href="/" className="flex min-w-32 items-center gap-2.5 transition hover:opacity-90">
          <div className="bg-accent flex h-11 w-11 items-center justify-center rounded-lg shadow-md">
            <span className="text-3xl font-bold text-white">★</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold tracking-tight">Lærepladser</span>
            <span className="text-accent text-xs font-medium">Find ud af mere om en/din læreplads</span>
          </div>
        </Link>

        
        <nav className="ml-auto flex items-center gap-8 text-sm font-medium">
          <Link href="/anmeldelser" className="hover:text-accent transition-colors">
            Skriv en anmeldelse
          </Link>
          <Link href="/" className="hover:text-accent transition-colors">
            Kategorier
          </Link>
          <Button asChild className="hover:text-accent transition-colors">
            <Link href="/log-ind">Log ind</Link>
          </Button>
          
        </nav>
      </div>
    </header>
  )
}
