import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Opret konto</h1>
          <p className="mt-2 text-gray-600">Kom så i gang med at anmelde din fee' gris :))</p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Navn
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Dit fulde navn"
                className="mt-1"
                required
              />
            </div>

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

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium">
                Bekræft adgangskode
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="mt-1"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Opret konto
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Har du allerede en konto? </span>
          <Link href="/log-ind" className="text-primary font-medium hover:underline">
            Log ind
          </Link>
        </div>
      </div>
    </div>
  )
}
