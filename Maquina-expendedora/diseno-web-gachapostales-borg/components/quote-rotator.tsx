'use client'

import { useEffect, useState } from 'react'
import { frasesBreves } from '@/lib/borges'

export function QuoteRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % frasesBreves.length), 7000)
    return () => clearInterval(id)
  }, [])

  const frase = frasesBreves[index]

  return (
    <figure key={index} className="quote-swap mx-auto max-w-2xl text-center" aria-live="polite">
      <blockquote className="text-balance text-xl italic leading-relaxed text-paper/85 md:text-2xl">
        {`«${frase.texto}»`}
      </blockquote>
      <figcaption className="mt-4 text-xs uppercase tracking-[0.35em] text-sepia">
        {frase.obra}
      </figcaption>
    </figure>
  )
}
