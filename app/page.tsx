'use client'

import { SearchBox } from '@/app/components/SearchDropdown'
import Image from 'next/image'

interface Category {
  title: string
  description: string
}

const categories: Category[] = [
  {
    title: 'Teknologi, byggeri og transport',
    description:
      'Uddannelser inden for teknologi, byggeri og transport dækker områder som håndværk, byggeri, mekanik og transportsektoren. Du kan blive fx tømrer, elektriker, mekaniker, vagt eller chauffør.',
  },
  {
    title: 'Fødevarer, jordbrug & oplevelser',
    description:
      'Uddannelser inden for fødevarer, jordbrug og oplevelser dækker områder som madproduktion, landbrug, naturpleje og serviceerhverv. Du kan blive fx bager, kok, gartner, dyrepasser eller landmand.',
  },
  {
    title: 'Kontor, forretning og forretningservice',
    description:
      'Uddannelser inden for kontor, handel og forretningsservice omfatter økonomi, salg, kommunikation, kundeservice, administration og planlægning. Du kan blive fx kontormedarbejder, salgsmedarbejder eller handelsassistent.',
  },
  {
    title: 'Omsorg, sundhed & pædagogik',
    description:
      'Uddannelser inden for omsorg, sundhed og pædagogik forbereder dig til at arbejde med mennesker i sundhedssektoren, socialt arbejde og pædagogiske institutioner. Du kan blive fx sosu-assistent, pædagogisk assistent eller tandklinikassistent.',
  },
]

export default function page() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative h-[500px] bg-center bg-no-repeat">
        <Image
          src="/images/hero-bg.jpeg"
          alt="Hero background"
          fill
          className="-z-10 object-cover"
          priority
        />
        <div className="from-primary/70 via-secondary/40 absolute inset-0 z-0 bg-linear-to-b to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-8 py-32 text-center">
          <h1 className="mx-auto max-w-3xl text-5xl leading-tight font-extrabold tracking-tight text-white">
            Find en virksomhed, du kan stole på
          </h1>
          <p className="mt-4 text-lg text-white/90">Find, læs og skriv anmeldelser</p>
        </div>

        <SearchBox />

      </section>

      <section>
        <div className="mx-auto max-w-5xl px-8 py-8 text-center">
          <h2 className="text-primary mb-6 text-2xl font-semibold">Læreplads kategorier</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.title}
                className="rounded-lg border border-gray-200 bg-white p-5 text-left transition hover:shadow-md"
              >
                <div className="bg-accent mb-3 h-1 w-10 rounded-full" />
                <h3 className="mb-1 text-lg font-semibold text-gray-900">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
