'use client'

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
<div className='h-screen pt-17.5 flex flex-col'>
<section className="relative bg-center bg-no-repeat h-[500px]">
  <Image
    src="/images/hero-bg.jpeg"
    alt="Hero background"
    fill
    className="object-cover -z-10"
    priority
  />

  <div className="mx-auto max-w-5xl px-8 py-24 text-center">
    <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
      Find en virksomhed, du kan stole
    </h1>
  </div>

  <p className="text-center text-black text-lg">
    Find læs og skriv anmeldelseser
  </p>

  <div className="mt-8 flex justify-center">
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full max-w-3xl"
      role="search"
    >
      <Input
        type="search"
        placeholder="Søg efter en virksomhed eller kategori"
        className="w-full rounded-full border border-gray-200 px-5 py-4 mb-10 text-lg"
      />
    </form>
  </div>
</section>

<section className='flex-1'>
  </section>
</div>



  )
}
