"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      setError("Login fejlede. Tjek dine oplysninger.")
    } else {
      router.push("/")
    }
  }

  

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Log ind</h1>
          <p className="mt-2 text-gray-600">Velkommen tilbage</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>
          )}
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
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link href="/glemt-adgangskode" className="text-primary hover:underline">
              Glemt kode?
            </Link>
          </div>

        
          <Button
        variant="outline"
        className="w-full bg-primary" size="lg"
        onClick={() => toast.success("Dit login var en succes!")}
      >
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
