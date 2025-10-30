import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { schools } from '@/app/data/mock'

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <section className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Anmeldelser</h1>
          <p className="text-sm">Vælg en virksomhed for at se anmeldelser.</p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {schools.map((s) => (
            <Link
              key={s.id}
              href={`/anmeldelser/${s.slug}`}
              className="block rounded border p-4 hover:shadow"
            >
              <div className="flex items-center gap-4">
                {s.logoUrl ? (
                  <Image src={s.logoUrl} alt={s.name} width={56} height={56} className="rounded" />
                ) : (
                  <div className="bg-muted h-14 w-14 rounded" />
                )}

                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-muted-foreground text-sm">{s.description}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
