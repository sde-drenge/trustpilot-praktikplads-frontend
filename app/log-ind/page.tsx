import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Log ind</h1>
          <p className="mt-2 text-gray-600">Velkommen tilbage</p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="din@email.dk"
                className="mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Adgangskode
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link href="/glemt-adgangskode" className="text-primary hover:underline">
              Glemt adgangskode?
            </Link>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Log ind
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Har du ikke en konto? </span>
          <Link href="/opret-konto" className="text-primary font-medium hover:underline">
            Opret konto
          </Link>
        </div>
      </div>
    </div>
  )
}
