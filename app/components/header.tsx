import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-primary fixed inset-x-0 top-0 z-50 text-white">
      <div className="flex items-center gap-6 px-6 py-2.75">
        <div className="flex min-w-24 cursor-pointer items-center gap-2">
          <span className="text-accent text-3xl font-bold">★</span>
          <span className="text-3xl font-semibold">TP</span>
        </div>

        <nav className="ml-auto flex items-center gap-6 font-medium">
          <Link href="/anmeldelser" className="hover:text-accent transition">
            Skriv en anmeldelse
          </Link>
          <Link href="/" className="hover:text-accent transition">
            Kategorier
          </Link>
          <Link href="/log-ind" className="hover:text-accent transition">
            Log ind
          </Link>
          <Button className="bg-accent hover:bg-accent/90 rounded-full px-4 py-3 text-white">
            For virksomheder
          </Button>
        </nav>
      </div>
    </header>
  )
}
