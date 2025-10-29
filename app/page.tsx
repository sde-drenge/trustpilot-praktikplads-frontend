'use client'

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'


interface Category {
  title: string;
  description: string;
}

const categories: Category[] = [
  {
    title: 'Teknologi, byggeri og transport',
    description: 'Uddannelser inden for teknologi, byggeri og transport dækker områder som håndværk, byggeri, mekanik og transportsektoren. Du kan blive fx tømrer, elektriker, mekaniker, vagt eller chauffør.'
  },
  {
    title: 'Fødevarer, jordbrug & oplevelser',
    description: 'Uddannelser inden for fødevarer, jordbrug og oplevelser dækker områder som madproduktion, landbrug, naturpleje og serviceerhverv. Du kan blive fx bager, kok, gartner, dyrepasser eller landmand.'
  },
  {
    title: 'Kontor, forretning og forretningservice',
    description: 'Uddannelser inden for kontor, handel og forretningsservice omfatter økonomi, salg, kommunikation, kundeservice, administration og planlægning. Du kan blive fx kontormedarbejder, salgsmedarbejder eller handelsassistent.'
  },
  {
    title: 'Omsorg, sundhed & pædagogik',
    description: 'Uddannelser inden for omsorg, sundhed og pædagogik forbereder dig til at arbejde med mennesker i sundhedssektoren, socialt arbejde og pædagogiske institutioner. Du kan blive fx sosu-assistent, pædagogisk assistent eller tandklinikassistent.'
  },
  
]

export default function page() {
  return (
<div className='min-h-screen flex flex-col'>
<section className="relative bg-center bg-no-repeat h-[500px]">
  <Image
    src="/images/hero-bg.jpeg"
    alt="Hero background"
    fill
    className="object-cover -z-10"
    priority
  />
  <div className="absolute inset-0 bg-linear-to-b from-primary/70 via-secondary/40 to-transparent z-0" />

  <div className="relative z-10 mx-auto max-w-5xl px-8 py-32 text-center">
    <h1 className="mx-auto max-w-3xl text-5xl font-extrabold tracking-tight text-white leading-tight">
      Find en virksomhed, du kan stole på
    </h1>
    <p className="mt-4 text-white/90 text-lg">
      Find, læs og skriv anmeldelser
    </p>
  </div>

  <div className="mt-6 flex justify-center px-8">
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-2xl"
      role="search"
    >
      <Input
        type="search"
        placeholder="Søg efter en virksomhed eller kategori"
        className="w-full h-16 rounded-full px-8 text-lg bg-white text-gray-900 placeholder:text-gray-500 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary"
      />
    </form>
  </div>
</section>

<section>
  <div className='mx-auto max-w-5xl px-8 py-8 text-center'>
    <h2 className='text-2xl font-semibold mb-6 text-primary'>Læreplads kategorier</h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      { categories.map((category) => (
        <div key={category.title} className='p-5 border border-gray-200 rounded-lg bg-white hover:shadow-md transition text-left'>
          <div className='h-1 w-10 bg-accent rounded-full mb-3' />
          <h3 className='text-lg font-semibold mb-1 text-gray-900'>{category.title}</h3>
          <p className='text-gray-600 text-sm'>{category.description}</p>

        </div>
      ))}
    </div>
  </div>
  </section>
</div>

  )
}
