"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [schoolId, setSchoolId] = useState("")
  const [schools, setSchools] = useState<Array<{ id: string; name: string }>>([])
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function loadSchools() {
      const res = await fetch('/api/schools')
      if (res.ok) {
        const data = await res.json()
        setSchools(data.schools || [])
      }
    }
    loadSchools()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password !== confirmPassword) {
      setError("Adgangskoderne matcher ikke")
      return
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, schoolId })
    })
    if (!res.ok) {
      setError("Bruger findes allerede")
      return
    }
    await signIn("credentials", { email, password, redirect: false })
    router.push("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Opret konto</h1>
          <p className="mt-2 text-gray-600">Kom i gang med at anmelde</p>
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

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium">
                Bekræft adgangskode
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="mt-1"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="school" className="block text-sm font-medium">
                Hvilken skole går du på?
              </label>
              <select
                id="school"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={schoolId}
                onChange={e => setSchoolId(e.target.value)}
                required
              >
                <option value="">Vælg din skole</option>
                {schools.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
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
